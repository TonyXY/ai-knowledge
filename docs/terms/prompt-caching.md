---
title: "Prompt Caching（提示缓存）"
description: "缓存频繁使用的 Prompt 片段的计算状态——复用 KV Cache，减少重复计算和 Token 消耗，显著降低延迟与成本"
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# Prompt Caching（提示缓存）

## 一句话解释

Prompt Caching（提示缓存）是一种 LLM 推理优化技术——当一段 Prompt 前缀在多次调用中重复出现时，服务端缓存该前缀对应的 [KV Cache](/terms/kv-cache) 计算结果，后续调用**跳过这部分的重复计算**，直接复用已有的 Key 和 Value 矩阵。这能显著降低延迟和 Token 消耗，尤其适合 System Prompt 固定的对话场景。

## 通俗类比

你去图书馆查资料，管理员每次都要从第一页开始帮你翻书——即便你只是"接着上次的问题"再问两句。Prompt Caching 相当于管理员**在书的某个位置夹了一张书签**。"上次看到第 50 页是吧？好，直接从第 51 页继续翻。"省去了反复翻前 50 页的时间。

System Prompt 就像是每次都一样的前 50 页——文档长、不会变、每次对话都要读。Prompt Caching 就是那个让管理员不用反复翻这部分的书签。

## 原理

Prompt Caching 的核心依赖是 [Transformer](/terms/transformer) 解码器推理中的 **KV Cache 机制**：

- 当 LLM 处理一个 Token 序列时，每一层自注意力都会计算出 Key 和 Value 矩阵
- 在自回归生成中，已生成的 Token 不会变，因此它们的 K、V 矩阵是**完全确定的**
- 如果两次请求共享同一个前缀（如相同的 System Prompt），那么前缀部分的 KV Cache 计算结果完全一致——**没有必要重新算**

当服务端检测到两个请求的 Prompt 前缀相同时：
1. 第一次请求正常计算全部 Token，并将前缀部分的 KV Cache 保存下来
2. 第二次请求检测到相同前缀 → 直接加载缓存的 KV Cache → 只计算新 Token 的部分
3. 用户按新的 Token 数计费，**前缀部分不重复计费**（或大幅折扣）

## 主流实现方式

### OpenAI Prompt Caching

OpenAI 的 Prompt Caching 对符合条件的请求**自动生效**，无需手动标记：

- **缓存条件**：最近的 **1024 个 Token** 中，与历史请求完全相同的连续前缀（以 128 Token 为对齐边界）
- **缓存命中**：前缀部分的 Token 按 **50% 折扣**计费
- **自动失效**：5~10 分钟未命中后缓存过期
- **适用模型**：GPT-4o、GPT-4o-mini 等最新模型

```python
# OpenAI Prompt Caching 无额外代码——自动生效
# 只要 System Prompt + 前几条消息不变，后续调用自动命中缓存

response1 = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个专业的技术文档翻译助手……(长 System Prompt)"},
        {"role": "user", "content": "请翻译这段技术文档……"},
    ],
)
# 第一次调用：计算全部 Token，缓存前缀

response2 = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {"role": "system", "content": "你是一个专业的技术文档翻译助手……(相同 System Prompt)"},
        {"role": "user", "content": "再翻译这一段……"},
    ],
)
# 第二次调用：前缀命中缓存，只计算新用户消息部分，节省 50% 输入费用
```

### Anthropic Prompt Caching

Anthropic 采用**显式标记**方式，开发者需要手动指定缓存边界（Breakpoints）：

- **缓存标记**：在 Message 中设置 `cache_control: {"type": "ephemeral"}` 标记缓存点
- **最少缓存长度**：至少 1024 Token（Claude 3.5 Sonnet）或 2048 Token（Claude 3.5 Haiku）
- **计费方式**：缓存写入按正常价格 ×1.25，缓存读取按正常价格 ×0.1（打一折）
- **TTL**：5 分钟未命中后缓存过期

```python
import anthropic

client = anthropic.Anthropic()

system_prompt = "你是一个资深的产品经理，拥有 10 年 SaaS 行业经验……（超长 System Prompt）"

response = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=1024,
    system=[
        {
            "type": "text",
            "text": system_prompt,
            "cache_control": {"type": "ephemeral"},  # 在此处标记缓存点
        }
    ],
    messages=[{"role": "user", "content": "帮我分析这个需求的优先级……"}],
)
# 缓存命中时，System Prompt 部分的读取费用打一折
```

### DeepSeek / 其他厂商

- **DeepSeek**：支持 Prompt Caching，自动检测相同前缀，命中后缓存部分不收费
- **Google Gemini**：Context Caching 功能，需显式创建缓存对象，适合超长文档（如整个代码库）的反复提问

## 收益

| 指标 | 典型提升 |
|------|----------|
| **首 Token 延迟（TTFT）** | 降低 **2~5 倍**（跳过前缀 Encoder 计算） |
| **输入 Token 成本** | 降低 **50%~90%**（取决于厂商和命中情况） |
| **吞吐量** | 提升 **2~10 倍**（服务端计算量减少） |

## 适用场景

- **System Prompt 固定的对话**：客服机器人、角色扮演、编程助手——每次都发同样或类似的长 System Prompt
- **重复调用相同模板**：批量处理文件（相同指令 + 不同文件内容）、数据标注流水线
- **长文档多次问答**：上传一份 PDF 后反复提问——文档内容作为前缀命中缓存（Gemini Context Caching 专为此设计）
- **多轮对话**：相同对话历史的后续轮次，前轮消息自动命中

**不适用**的场景：每次 Prompt 完全不同的单次调用，没有可复用的前缀。

## 关联术语

- [KV Cache](/terms/kv-cache) —— Prompt Caching 本质上是对 KV Cache 的跨请求复用
- [上下文窗口](/terms/context-window) —— 缓存的前缀不能超过模型的上下文窗口限制
- [Token](/terms/token) —— 缓存按 Token 粒度匹配，按 Token 计费

## 延伸阅读

- [OpenAI Prompt Caching 官方指南](https://platform.openai.com/docs/guides/prompt-caching) —— 自动缓存的使用说明与最佳实践
- [Anthropic Prompt Caching 文档](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching) —— 显式缓存标记与计费详情
- [Google Gemini Context Caching](https://ai.google.dev/gemini-api/docs/caching) —— 超长上下文缓存方案
