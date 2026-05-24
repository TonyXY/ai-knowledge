---
title: "LLM 可观测性"
description: "监控、追踪、调试 LLM 应用的调用链——从 Token 用量到延迟分析，构建可量化的 LLMOps 质量体系"
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# LLM 可观测性

当你从一个"调 API 的脚本"进化到一个"每天处理上万次 LLM 调用的生产服务"时，最大的挑战不是 Prompt 怎么写——而是**你知道系统在发生什么吗**？哪条链路上成本失控了？哪个 Prompt 版本反而让准确率下降了？LLM 可观测性就是回答这些问题的工程体系。

## 什么是 LLM 可观测性

LLM 可观测性（LLM Observability）是一套**监控、追踪、调试 LLM 应用调用链**的方法和工具体系。它的核心目标：让每一次 LLM 调用都**可追踪、可量化、可调试**。

传统的后端可观测性（日志、指标、链路追踪）对 LLM 应用不够用，因为 LLM 有独特的痛点：

| 传统服务 | LLM 应用 |
|----------|----------|
| 相同输入 → 确定性输出 | 相同输入 → 每次输出可能不同 |
| 延迟瓶颈在 I/O 或计算 | 延迟受模型负载、Token 长度、排队等多因素影响 |
| 成本按服务器/CPU 核算 | 成本按 Token 核算，一次调用几厘到几毛不等 |
| 错误是明确的（异常/状态码） | "错误"是模糊的——答非所问也算失败 |

## 核心维度

一个完整的 LLM 可观测体系应覆盖以下五个维度：

### 1. 调用追踪（Trace）

每一轮 LLM 调用都生成一条完整的 Trace，记录：

- **调用链**：`用户请求 → Prompt 模板渲染 → LLM API 调用 → 后处理 → 返回用户`
- **每一步的输入/输出**：Prompt 是什么？模型返回了什么？中间有没有 RAG 检索步骤？
- **关联信息**：请求 ID、用户 ID、会话 ID、使用的模型版本

为什么要 Trace？出问题时翻日志："这个用户说回答是错的——当时发给模型的 Prompt 到底是什么？中间有没有工具调用？"没有 Trace，只能靠猜测。

### 2. Token 用量统计

按**模型、用户、时间段**三个维度统计 Token 消耗：

- 哪个模型吃掉了最多的 Token？是不是可以用更便宜的替代？
- 每个用户的平均调用次数和 Token 消耗有没有异常（可能是滥用）？
- 按天/周/月的趋势——成本在涨还是在降？

### 3. 延迟监控

LLM 延迟需要拆开看：

| 指标 | 含义 | 典型基线 |
|------|------|----------|
| **首字延迟（TTFT）** | 从请求发出到收到第一个 Token 的时间 | 200ms ~ 2s |
| **每秒 Token 数（TPS）** | 模型生成速度 | 20 ~ 100 Token/s |
| **总耗时** | 从请求到完整响应的端到端时间 | 视输出长度而定 |
| **排队时间** | Rate Limit 或服务端过载导致的等待时间 | 应为 0，非零说明容量不足 |

高延迟可能让用户觉得"卡住了"，即使输出是正确的。TTFT 超过 3 秒就需要排查。

### 4. 质量评估

光看有没有报错不够——LLM 可能正常返回但内容完全不对。自动评估的方法：

- **LLM-as-Judge**：用一个更强的模型（如 GPT-4o）对输出打分（准确性、相关性、安全性）
- **规则检查**：结构化输出是否解析成功？JSON Schema 是否匹配？
- **用户反馈**：点赞/点踩、评分、人工抽检

将评分配对到每次 Trace 上，就能回答"上周优化了 Prompt，准确率到底有没有提升"。

### 5. 成本分析

把 Token 用量乘以模型定价，按维度拆分：

- **按模型**：GPT-4o 的花费是 GPT-4o-mini 的 10 倍，值得吗？
- **按用户/部门**：谁花的钱最多？有没有用超预算？
- **按功能**：翻译功能 vs 客服功能 vs 代码生成——哪个 ROI 最高？

没有成本分析，你可能下个月收到账单才发现超支了。

## 主流工具对比

| 工具 | 定位 | 特点 | 价格 |
|------|------|------|------|
| **Langfuse** | 开源全栈 LLM 可观测平台 | 功能最全：Trace、评分、成本、提示词管理；自托管或云版 | 开源免费 / 云版有免费额度 |
| **LangSmith** | LangChain 生态官方平台 | 与 LangChain/LangGraph 深度集成，适合已有 LangChain 的项目 | 免费额度后按用量 |
| **Helicone** | 轻量 Proxy 方案 | 一行代码接入，不改现有逻辑；专注成本分析和用量监控 | 有免费版 |
| **Weights & Biases (W&B)** | ML 实验追踪 + LLM 扩展 | 适合 ML 团队，追踪训练 + 推理全流程 | 免费额度后按用量 |

### 选型建议

- 个人项目 / 小团队 → **Langfuse**（开源、功能全、免费够用）
- 已经在用 LangChain → **LangSmith**（无缝集成）
- 只想看成本和延迟，不想动代码 → **Helicone**（一行代理配置）
- 希望完全自建 → **OpenTelemetry + Grafana/Prometheus**（灵活但工作量大）

## 实战：Langfuse 接入

以下示例展示如何用 Python 接入 Langfuse SDK，自动追踪每一次 LLM 调用：

```python
# 安装：pip install langfuse openai

import os
from openai import OpenAI
from langfuse import Langfuse
from langfuse.decorators import observe, langfuse_context

# ── 初始化 ──
langfuse = Langfuse(
    secret_key=os.environ["LANGFUSE_SECRET_KEY"],
    public_key=os.environ["LANGFUSE_PUBLIC_KEY"],
    host=os.environ.get("LANGFUSE_HOST", "https://cloud.langfuse.com"),
)

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


@observe()  # 自动生成 Trace
def ask_llm(question: str, model: str = "gpt-4o-mini") -> str:
    """调用 LLM 并自动上报 Trace 到 Langfuse。"""

    # 将当前 Trace 信息注入 OpenAI 调用
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "你是一个有帮助的助手。"},
            {"role": "user", "content": question},
        ],
        temperature=0.7,
        max_tokens=512,
    )

    answer = response.choices[0].message.content

    # 上报 Token 用量与成本
    langfuse_context.update_current_observation(
        usage={
            "input": response.usage.prompt_tokens,
            "output": response.usage.completion_tokens,
        },
        model=model,
    )

    return answer


@observe()
def qa_pipeline(question: str) -> dict:
    """完整的问答流水线：RAG 检索 + LLM 回答 + 质量评分。"""
    # Trace 会自动记录每一步的时间、输入/输出和嵌套关系
    answer = ask_llm(question)
    score = evaluate_answer(question, answer)  # 质量评分（LLM-as-Judge）
    return {"question": question, "answer": answer, "score": score}


@observe()
def evaluate_answer(question: str, answer: str) -> float:
    """用 LLM-as-Judge 对回答质量打分（1-5）。"""
    judge_prompt = f"""请根据以下标准对回答打分（1-5 分）：
- 准确性：回答的事实是否正确
- 完整性：是否完整回应了问题
- 简洁性：是否直接、不啰嗦

问题：{question}
回答：{answer}

只返回一个数字（1-5）："""

    judge_resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": judge_prompt}],
        temperature=0,
    )
    try:
        return float(judge_resp.choices[0].message.content.strip())
    except ValueError:
        return 0.0


# ── 使用 ──
if __name__ == "__main__":
    result = qa_pipeline("什么是 Transformer 的自注意力机制？")

    # 确保上报完成（SDK 默认异步上报）
    langfuse.flush()

    print(f"回答: {result['answer'][:100]}...")
    print(f"质量评分: {result['score']}/5")

    # Langfuse 仪表盘中可以看到：
    # - qa_pipeline → ask_llm 的完整调用链
    # - 每一步的耗时、Token 用量、成本
    # - 质量评分趋势
```

接入后，Langfuse 仪表盘会展示：

- **Trace 瀑布图**：每次调用的嵌套链路，每个 Span 的耗时一目了然
- **Token 用量仪表盘**：按模型/时间维度的 Token 消耗趋势
- **成本看板**：按模型/用户拆分的花费，预算告警
- **评分追踪**：质量评分随时间的变化，Prompt 改动前后效果对比

## 自建方案（OpenTelemetry + Grafana）

如果不想依赖第三方 SaaS，可以用 **OpenTelemetry** 手动埋点，配合 Grafana/Prometheus 展示：

```
OpenAI 调用 → OTel Span 上报 → OTel Collector → Grafana Tempo（Trace）+ Prometheus（指标）
```

需要手动实现：`token_counter`、`cost_calculator`、`evaluation_runner`。适合有成熟自建监控体系的大团队，中小项目直接用 Langfuse 更省心。

## 关联阅读

- [AI 应用架构](/dev/app-architecture) —— 缓存策略、错误处理、成本控制等生产级工程模式
- [模型评估与测试](/dev/model-evaluation) —— LLM-as-Judge、自动化测试管道的详细实现
- [OpenAI API 入门](/dev/openai-api) —— 从基础 API 调用的 Token 与延迟开始理解

## 延伸阅读

- [Langfuse 官方文档](https://langfuse.com/docs) —— 快速接入指南与最佳实践
- [OpenTelemetry 官方文档](https://opentelemetry.io/docs/) —— 自建可观测体系的基础框架
- [Anthropic: Monitoring LLM Applications](https://docs.anthropic.com/en/docs/build-with-claude/monitoring) —— Anthropic 的监控建议
- 学习建议：先用 Langfuse 免费版接入一个最小 Demo，看到 Trace 和成本仪表盘后再决定是否自建
