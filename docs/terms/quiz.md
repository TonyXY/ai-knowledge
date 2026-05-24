---
title: 术语知识测验
description: 检测你对 AI 核心术语的掌握程度，涵盖 LLM、Transformer、RAG、Agent 等核心概念
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 📝 术语知识测验

学完 AI 术语后，来测试一下你的掌握程度吧！共 7 题，每题后附答案和解析。

---

## 一、选择题

### Q1：大语言模型（LLM）的"上下文窗口"指的是什么？

    A. 模型运行的硬件环境

    B. 模型单次能处理的最大 Token 数

    C. 模型训练数据的时间范围

    D. 模型能输出的最大字数

<details>
<summary>查看答案</summary>

**正确答案：B**

上下文窗口（Context Window）决定了模型一次能"看到"多少内容。窗口越大，能输入的文本越长，多轮对话的记忆也越久。

💡 关联阅读：[上下文窗口](/terms/context-window) · [Token](/terms/token)
</details>

---

### Q2：Transformer 架构的核心创新是什么？

    A. 循环神经网络

    B. 卷积计算

    C. 自注意力机制

    D. 长短期记忆

<details>
<summary>查看答案</summary>

**正确答案：C**

自注意力机制（Self-Attention）让模型能够并行处理序列中的每个位置，同时捕捉全局依赖关系。这是 Transformer 区别于 RNN 和 CNN 的关键所在。

💡 关联阅读：[Transformer](/terms/transformer) · [自注意力机制](/terms/self-attention)
</details>

---

### Q3：RAG 的中文全称是什么？

    A. 随机访问生成

    B. 检索增强生成

    C. 实时分析生成

    D. 递归自动生成

<details>
<summary>查看答案</summary>

**正确答案：B**

RAG（Retrieval-Augmented Generation，检索增强生成）先从外部知识库中检索相关信息，再让模型基于检索结果生成回答。这种"先查后答"的模式有效减少了幻觉。

💡 关联阅读：[RAG](/terms/rag) · [Embedding](/terms/embedding) · [向量数据库](/terms/vector-db)
</details>

---

### Q4：Agent 和普通 LLM 最主要的区别是什么？

    A. 参数量更大

    B. 能自主调用工具和执行任务

    C. 训练数据更多

    D. 回答速度更快

<details>
<summary>查看答案</summary>

**正确答案：B**

普通 LLM 只能根据输入生成文本，而 Agent 能自主规划、调用工具（搜索、计算、API 等）、观察结果并循环迭代，完成复杂任务。

💡 关联阅读：[Agent](/terms/agent) · [Function Calling](/terms/function-calling) · [MCP](/terms/mcp)
</details>

---

## 二、判断题

### Q5：Fine-tuning 是让模型学习全新的知识，和 Training 没有区别。

<details>
<summary>查看答案</summary>

**❌ 错误**

Fine-tuning（微调）是在预训练模型的基础上，用特定领域的数据进行小幅度调整，让它适应特定任务或风格。它和从零开始的 Training 有本质区别——Fine-tuning 更像是"进修"，而不是"从头学起"。

💡 关联阅读：[微调 (Fine-tuning)](/terms/fine-tuning) · [训练 / 推理](/terms/training-inference)
</details>

---

### Q6：MCP 是 Anthropic 提出的开放协议，不是 OpenAI 的私有协议。

<details>
<summary>查看答案</summary>

**✅ 正确**

MCP（Model Context Protocol）由 Anthropic 于 2024 年提出并开源，是一个开放的标准化协议，旨在统一 AI 模型与外部工具、数据源之间的交互方式。它不是某个厂商的私有协议。

💡 关联阅读：[MCP](/terms/mcp) · [AI Skills](/terms/ai-skills)
</details>

---

### Q7：Embedding 可以把文本转化为向量，语义相近的内容向量距离更近。

<details>
<summary>查看答案</summary>

**✅ 正确**

Embedding（嵌入）将文本映射到高维向量空间。语义上相似的内容（如"猫"和"喵星人"）在这个空间中距离更近，而不相关的内容距离更远。这是语义搜索和 RAG 的数学基础。

💡 关联阅读：[Embedding](/terms/embedding) · [向量数据库](/terms/vector-db)
</details>

---

## 📊 评分

| 正确数 | 等级 |
|--------|------|
| 7 | 🏆 满分！术语达人 |
| 5-6 | 👍 掌握良好 |
| 3-4 | 📖 仍需加强 |
| 0-2 | 🔄 建议重读术语篇 |

<details>
<summary>你对了几题？来对答案吧！</summary>

| 题号 | 答案 | 类型 |
|------|------|------|
| Q1 | B | 选择题 |
| Q2 | C | 选择题 |
| Q3 | B | 选择题 |
| Q4 | B | 选择题 |
| Q5 | ❌ | 判断题 |
| Q6 | ✅ | 判断题 |
| Q7 | ✅ | 判断题 |

</details>
