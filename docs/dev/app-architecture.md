---
title: AI 应用架构
description: 面向生产的 AI 应用工程模式——缓存策略、错误处理、成本控制与 AI Client 封装实践
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# AI 应用架构

当你从"调用一次 API 做个 Demo"过渡到"构建一个每天处理上万次请求的 AI 产品"时，需要面对一系列工程问题：**响应太慢怎么办？API 挂了怎么办？成本失控怎么办？** 本篇系统梳理 AI 应用的核心工程模式。

## 缓存策略

### 为什么要缓存 LLM 响应？

每次调用 LLM API 都要付费，而且相同输入往往得到相似输出。缓存的收益很直接：

| 收益 | 说明 |
|------|------|
| **降低延迟** | 命中缓存的话 0 API 网络耗时的毫秒级返回 |
| **节省成本** | 避免对相同/相似问题重复调用 LLM |
| **保护额度** | Rate Limit 消耗降低，应对突发流量更从容 |

### 语义缓存（Semantic Cache）

简单的 **KV 缓存**（Key-Value）只对**完全一致**的输入命中。但用户问"今天北京天气"和"北京今天天气怎么样"本质上相同，KV 缓存却无法命中。

**语义缓存**通过 Embedding 向量计算输入之间的相似度，在语义层面做匹配：

```text
用户输入 → 生成 Embedding → 向量搜索已有缓存 → 相似度 > 阈值 → 命中
```

### KV 缓存实现

不过在多数场景下，如果 Prompt 是结构化生成的（比如模板填充），KV 缓存就足够。缓存 Key 的设计是关键：

```python
cache_key = f"{prompt_hash}:{model}:{temperature}:{max_tokens}"
```

| 维度 | 说明 |
|------|------|
| `prompt` 哈希 | 输入内容的指纹，相同输入命中 |
| `model` | 不同模型输出不同，必须区分 |
| `temperature` | 0 和 0.7 的输出天差地别 |
| `max_tokens` | 影响回复长度，也算入区分维度 |

**缓存失效策略**：

- **TTL（Time-To-Live）**：事实性问题的答案可能随时间过时，设置 1 小时或 1 天的过期时间
- **手动失效**：Prompt 模板升级后批量清空相关缓存
- **LRU 淘汰**：内存有限时淘汰最久未使用的条目

```python
from hashlib import sha256
from functools import lru_cache
import time

# 简单内存缓存（生产环境用 Redis）
class SimpleCache:
    def __init__(self, ttl: int = 3600):
        self._store = {}
        self._ttl = ttl

    def _make_key(self, prompt: str, model: str, temperature: float, max_tokens: int) -> str:
        prompt_hash = sha256(prompt.encode()).hexdigest()[:16]
        return f"{prompt_hash}:{model}:{temperature}:{max_tokens}"

    def get(self, prompt: str, model: str, temperature: float, max_tokens: int):
        key = self._make_key(prompt, model, temperature, max_tokens)
        entry = self._store.get(key)
        if entry and time.time() - entry["ts"] < self._ttl:
            return entry["value"]
        # 过期则清除
        if entry:
            del self._store[key]
        return None

    def set(self, prompt: str, model: str, temperature: float, max_tokens: int, value: str):
        key = self._make_key(prompt, model, temperature, max_tokens)
        self._store[key] = {"value": value, "ts": time.time()}
```

## 错误处理

### 常见错误分类

LLM API 调用不是什么都能成。下面是最常见的几类错误：

| 错误类型 | HTTP 状态码 | 典型场景 |
|----------|-------------|----------|
| 认证错误 | 401 | API Key 过期或无效 |
| 速率限制 | 429 | 请求太快超过了 TPM/RPM 配额 |
| 服务端错误 | 500/502/503 | 服务商故障或过载 |
| 超时 | — | 模型响应太慢，客户端主动断开 |
| 上下文超限 | 400 | Prompt + 历史消息超过最大 token |
| 内容过滤 | 400 | 输入/输出触发了安全策略 |

### 重试策略：指数退避 + 抖动

直接重试可能把服务端打得更惨。**指数退避**让重试间隔越来越长，**随机抖动**防止多个客户端同时重试：

```python
import time
import random

def retry_with_backoff(func, max_retries: int = 3, base_delay: float = 1.0):
    """
    指数退避重试，含随机抖动。
    delay = base_delay * 2^attempt + random(0, 1)
    """
    for attempt in range(max_retries + 1):
        try:
            return func()
        except RateLimitError:
            if attempt == max_retries:
                raise
            delay = base_delay * (2 ** attempt) + random.random()
            print(f"[重试 {attempt + 1}/{max_retries}] 等待 {delay:.1f}s ...")
            time.sleep(delay)
        except (AuthError, ContentFilterError):
            raise  # 不可重试的错误，直接抛

    return None  # 理论上不会到这里
```

### 熔断机制

连续失败时，**不要再发了**——短暂"休息"一下：

```text
连续失败 N 次 → 熔断器打开 → 后续请求直接失败
                                    ↓
                            等待冷却时间(30s)
                                    ↓
                            放行少量请求试探 ← 成功了 → 关闭熔断器
                                    ↓ 又失败了
                            重新计时冷却
```

```python
class CircuitBreaker:
    def __init__(self, failure_threshold: int = 5, cooldown: float = 30):
        self._failures = 0
        self._threshold = failure_threshold
        self._cooldown = cooldown
        self._last_failure_time = 0

    @property
    def is_open(self) -> bool:
        if self._failures >= self._threshold:
            if time.time() - self._last_failure_time > self._cooldown:
                self._failures = 0  # 冷却结束，重置
                return False
            return True
        return False

    def success(self):
        self._failures = 0

    def failure(self):
        self._failures += 1
        self._last_failure_time = time.time()
```

### 降级策略

主力模型不可用时，**自动切换到备选方案**：

| 场景 | 降级方案 |
|------|----------|
| GPT-4o 超时 | 自动切到 GPT-4o-mini |
| OpenAI API 整体不可用 | 切换到 Azure OpenAI 或 DeepSeek |
| 某地区服务故障 | 切到其他 Region 的部署 |

关键原则：**让用户感知不到服务中断**，即使回复质量略有下降，也比完全失败好。

## 成本控制

### Token 用量追踪

如果不知道钱花在哪了，就没办法省钱。每个请求都应该记录 token 用量：

```python
import dataclasses

@dataclasses.dataclass
class UsageRecord:
    prompt_tokens: int
    completion_tokens: int
    model: str
    timestamp: float
    request_id: str
```

对 `chat.completion` 的返回做一层包装就自动记录了——后面完整代码会演示。

### 按任务复杂度自动选择模型

一个通用原则：**简单任务用小模型，复杂任务用大模型**。

| 任务类型 | 推荐模型 | 价格（每百万 token） |
|----------|----------|---------------------|
| 分类、实体提取、简单问答 | GPT-4o-mini / DeepSeek-V3 | ≈ $0.15-0.60 |
| 代码生成、长文总结 | GPT-4o / Claude 3.5 Sonnet | ≈ $2.50-3.00 |
| 复杂推理、数学证明 | o1 / o3-mini | ≈ $4.00-15.00 |

```python
def select_model(task_complexity: str) -> str:
    mapping = {
        "simple": "gpt-4o-mini",
        "moderate": "gpt-4o",
        "complex": "o3-mini",
    }
    return mapping.get(task_complexity, "gpt-4o-mini")
```

### 预算告警

- 设置每日/每月预算上限，到达阈值发通知
- 记录 `总成本 = prompt_tokens * price + completion_tokens * price`
- 集成到监控系统（Prometheus + Grafana 或简单的日志告警）

### 请求合并（Batch）

批量处理可以将 50% 的请求合并到批量 API 中，节省一半成本（Batch API 通常 50% 折扣，24 小时内返回）：

- 适合：非实时报告生成、离线数据标注、批量内容审核
- 不适合：聊天、实时生成等需要即时响应的场景

## AI Client 包装类（完整实现）

用一个 Python 类封装上面提到的所有模式——**缓存 + 重试 + 熔断 + Token 追踪**：

```python
import time
from hashlib import sha256
from openai import OpenAI
from dataclasses import dataclass, field
from collections import defaultdict

@dataclass
class UsageRecord:
    prompt_tokens: int
    completion_tokens: int
    model: str
    cost: float = 0.0


class AIClient:
    """
    生产级 AI 客户端包装类：
    - KV 缓存（TTL 过期）
    - 指数退避重试
    - 熔断保护
    - Token 用量追踪
    """

    # 模型定价（美元/百万 token）
    PRICING = {
        "gpt-4o":       {"input": 2.50, "output": 10.00},
        "gpt-4o-mini":  {"input": 0.15, "output": 0.60},
        "o3-mini":      {"input": 1.10, "output": 4.40},
    }

    def __init__(self, api_key: str = None, cache_ttl: int = 3600, circuit_threshold: int = 5):
        self._client = OpenAI(api_key=api_key)
        self._cache = SimpleCache(ttl=cache_ttl)
        self._breaker = CircuitBreaker(failure_threshold=circuit_threshold)
        self._usage_log: list[UsageRecord] = []

    def chat(
        self,
        messages: list[dict],
        model: str = "gpt-4o-mini",
        temperature: float = 0.7,
        max_tokens: int = 1024,
        max_retries: int = 3,
    ) -> str:
        """带缓存、重试、熔断的 chat completion 调用。"""

        # 提取 system + user + latest user message 做缓存 key
        prompt_text = self._extract_cacheable_prompt(messages)

        # ── 缓存检查 ──
        cached = self._cache.get(prompt_text, model, temperature, max_tokens)
        if cached:
            return cached

        # ── 熔断检查 ──
        if self._breaker.is_open:
            raise CircuitBreakerOpenError("熔断器已打开，暂停 LLM 调用")

        response = self._call_with_retries(
            messages, model, temperature, max_tokens, max_retries
        )

        # ── 写入缓存 ──
        self._cache.set(prompt_text, model, temperature, max_tokens, response)

        return response

    def _call_with_retries(self, messages, model, temperature, max_tokens, max_retries):
        """带指数退避重试的核心调用。"""
        for attempt in range(max_retries + 1):
            try:
                resp = self._client.chat.completions.create(
                    messages=messages,
                    model=model,
                    temperature=temperature,
                    max_tokens=max_tokens,
                )
                self._breaker.success()  # 成功后重置熔断器

                # 记录用量
                usage = resp.usage
                record = UsageRecord(
                    prompt_tokens=usage.prompt_tokens,
                    completion_tokens=usage.completion_tokens,
                    model=model,
                    cost=self._calc_cost(model, usage.prompt_tokens, usage.completion_tokens),
                )
                self._usage_log.append(record)

                return resp.choices[0].message.content

            except Exception as e:
                self._breaker.failure()
                if attempt == max_retries or self._is_non_retryable(e):
                    raise
                delay = min(2 ** attempt + 0.5, 30)
                time.sleep(delay)

        return ""

    # ── 辅助方法 ──
    def _extract_cacheable_prompt(self, messages: list[dict]) -> str:
        """提取可用于缓存的 prompt 指纹。"""
        parts = []
        for m in messages:
            if m["role"] in ("system", "user"):
                parts.append(m.get("content", ""))
        return "\n".join(parts)

    @staticmethod
    def _is_non_retryable(error: Exception) -> bool:
        msg = str(error).lower()
        return any(kw in msg for kw in ("invalid api key", "auth", "content filter"))

    def _calc_cost(self, model: str, prompt_tokens: int, completion_tokens: int) -> float:
        pricing = self.PRICING.get(model, {"input": 0, "output": 0})
        return (
            prompt_tokens / 1_000_000 * pricing["input"]
            + completion_tokens / 1_000_000 * pricing["output"]
        )

    # ── 用量查询 ──
    @property
    def total_usage(self) -> dict:
        total_cost = sum(r.cost for r in self._usage_log)
        total_prompt = sum(r.prompt_tokens for r in self._usage_log)
        total_completion = sum(r.completion_tokens for r in self._usage_log)
        return {
            "total_calls": len(self._usage_log),
            "total_prompt_tokens": total_prompt,
            "total_completion_tokens": total_completion_tokens,
            "total_cost_usd": round(total_cost, 4),
        }


class CircuitBreakerOpenError(Exception):
    """熔断器打开时抛出的异常。"""
    pass


# ── 使用示例（省略前面定义的 SimpleCache、CircuitBreaker） ──
if __name__ == "__main__":
    client = AIClient(cache_ttl=600, circuit_threshold=3)

    # 第一次调用（命中 API）
    answer = client.chat(
        messages=[{"role": "user", "content": "什么是语义缓存？用一句话回答。"}],
        model="gpt-4o-mini",
    )
    print("回答:", answer)

    # 第二次调用（命中缓存）
    answer2 = client.chat(
        messages=[{"role": "user", "content": "什么是语义缓存？用一句话回答。"}],
        model="gpt-4o-mini",
    )
    print("回答(缓存):", answer2)

    # 查看用量
    print("\n用量统计:", client.total_usage)
```

## 总结

| 维度 | 核心要点 |
|------|----------|
| **缓存** | KV 缓存用 prompt+model+temperature 做 key，语义缓存处理相似输入 |
| **错误处理** | 区分可重试和不可重试错误，指数退避 + 抖动，熔断防止雪崩 |
| **成本控制** | 记录每次调用花费，按任务难度选模型，预算告警，Batch 降本 |
| **工程化** | 用一个 `AIClient` 包装类统一管理，零散逻辑写多了就是技术债 |

把这些模式落地到你的 AI 应用中，你就能从一个"调 API 的脚本"进化成一个"可靠的生产级服务"。

## 关联阅读

- [OpenAI API 入门](/dev/openai-api) —— 从基础调用开始
- [流式响应](/dev/streaming) —— 结合流式输出优化用户体验
- [结构化输出](/dev/structured-output) —— 确保 LLM 返回格式化的数据
