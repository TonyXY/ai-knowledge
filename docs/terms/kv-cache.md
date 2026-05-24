---
title: "KV Cache"
description: "自注意力机制的关键推理优化——缓存已计算的 Key 和 Value 矩阵，避免重复计算，大幅提升 LLM 生成速度"
difficulty: advanced
---

# KV Cache

<DifficultyBadge level="advanced" />

## 一句话解释

KV Cache（Key-Value Cache）是 LLM 推理加速的**核心优化技术**。在自回归生成过程中，它将每个已生成 Token 在 [自注意力机制](/terms/self-attention) 中计算出的 Key 和 Value 矩阵缓存下来，这样生成下一个 Token 时只需计算新 Token 的 Query、Key、Value，而**复用之前所有 Token 的 Key 和 Value**，从而将每步计算的复杂度从 O(n²) 降到 O(n)，大幅度提升推理速度。

## 通俗类比

假设你在一家餐厅当厨师，正在做一道需要 20 种食材的菜。传统 RNN 的做法是：做完一道放一道，每次都要从头准备。Transformer 的做法是：一次性准备好所有 20 种食材。KV Cache 则更进一步——你已经准备好了前 19 种食材并切好放在案板上，现在只需要切第 20 种食材，配料直接拿来用，不用重新准备。每次新生成一个词时，之前所有词的计算结果（Key 和 Value）都"热着"放在那里，直接取用即可。

## 技术定义

在标准的自注意力计算中，每个 Token 需要和序列中所有其他 Token 计算注意力分数。对于长度为 n 的序列，计算量是 O(n²)。在自回归生成模式下（逐 Token 生成）：

- **无 KV Cache**：生成第 n 个 Token 时，需要重新计算所有 n 个 Token 的 Q、K、V 矩阵并做完整的注意力计算。每生成一个新 Token，之前所有 Token 的计算都被浪费了
- **有 KV Cache**：生成第一个 Token 后，将其 K 和 V 矩阵存入缓存。生成第二个 Token 时，只计算新 Token 的 Q、K、V，其中新 K、V 追加到缓存中；注意力计算时，新 Token 的 Q 直接查询缓存中所有 Token 的 K 和 V。之后的每一步都是 O(n) 而非 O(n²)

**内存开销**是 KV Cache 的主要代价。对于层数为 L、注意力头数为 h、每个头的维度为 d 的模型，生成长度为 n 的序列时，缓存占用约为 `2 × L × n × h × d` 个数值。对于大模型和长序列，这可能消耗数十 GB 显存。因此出现了多种 KV Cache 压缩技术：

- **GQA / MQA（Grouped / Multi-Query Attention）**：多个注意力头共享同一组 K、V，减少缓存大小
- **PagedAttention**：将缓存分页管理（类似操作系统的虚拟内存），避免碎片化，vLLM 的核心技术
- **Sliding Window**：只保留最近 N 个 Token 的缓存，旧内容丢弃
- **KV Cache 量化**：用低精度数值存储缓存（如 INT8 替代 FP16）

## 关联术语

- [自注意力机制](/terms/self-attention) —— KV Cache 缓存的就是自注意力中的 K 和 V 矩阵
- [Transformer](/terms/transformer) —— KV Cache 适用于 Decoder-only Transformer 的自回归推理
- [上下文窗口](/terms/context-window) —— KV Cache 的内存占用随上下文长度线性增长
- [训练 / 推理](/terms/training-inference) —— KV Cache 是推理阶段的专属优化，训练时不需要

## 快速记忆

聊天时 AI 每说一个词，都要回头看前面说过什么。KV Cache 就是把这些"前面说过什么"存下来，避免每次都重新算一遍。缓存的力量。

## 延伸阅读

- vLLM 论文：[Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180) —— PagedAttention 原理
- MQA/GQA 论文：[GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](https://arxiv.org/abs/2305.13245)
- UvA 图解：[The Transformer Family](https://lilianweng.github.io/posts/2023-01-27-the-transformer-family-v2/) —— 包含 KV Cache 的内存分析
- 实践建议：使用 vLLM 或 SGLang 部署模型时，KV Cache 优化是默认开启的，无需手动操作。
