---
title: "自注意力机制"
description: "Transformer 的核心创新——让每个词能直接关注序列中所有其他词，通过 Query/Key/Value 计算动态权重"
difficulty: intermediate
---

# 自注意力机制

<DifficultyBadge level="intermediate" />

## 一句话解释

自注意力机制（Self-Attention）是 Transformer 架构的核心，它让输入序列中的**每个词都能直接关注到所有其他词**，并通过 Query/Key/Value 三个矩阵动态计算每个词对其他词的重要性权重。

## 通俗类比

阅读一段长文章时，你会自然地对关键词划线、标记重点——看到"因此"就知道前面有原因，看到"但是"就知道后面有转折。自注意力机制做的就是类似的事：对于句子中的每个词，模型自动计算它和其他所有词之间的"关联度"，然后把注意力集中在最相关的词上。如果句子是"猫坐在垫子上因为它很舒服"，自注意力会让"它"和"垫子"之间的关联权重很高，从而正确理解"它"指的是垫子而不是猫。

## 技术定义

自注意力的计算过程分为三步：

1. **构造 Q、K、V 矩阵**：每个词的词向量分别乘以三个可训练的权重矩阵，得到 Query（查询）、Key（键）、Value（值）向量
2. **计算注意力分数**：用当前词的 Q 向量去和所有词的 K 向量做点积，得到一个分数，表示当前词与每个其他词的相关程度。分数经过缩放（除以 √dₖ）和 Softmax 归一化，得到注意力权重
3. **加权求和**：用注意力权重对所有词的 V 向量做加权求和，得到当前词的最终输出表示

**多头自注意力（Multi-Head Self-Attention）** 是这一机制的扩展——同时运行多组独立的 Q/K/V 计算（每个称为一个"头"），每个头可以关注不同的语义关系（如语法结构、指代关系、语义相似性等），最后拼接所有头的输出。

## 关联术语

- [Transformer](/terms/transformer) —— 自注意力是 Transformer 的核心组件
- [KV Cache](/terms/kv-cache) —— 自注意力中 K、V 矩阵的缓存优化
- [大语言模型 (LLM)](/terms/llm) —— 所有 LLM 都依赖自注意力理解上下文
- [Embedding](/terms/embedding) —— 自注意力的输入是从词嵌入开始计算的

## 快速记忆

一句话里，每个词都在问其他词："咱俩关系怎么样？" 关系近的权重高，关系远的权重低——这就是自注意力。

## 延伸阅读

- 原论文中的 Self-Attention 章节：[Attention Is All You Need](https://arxiv.org/abs/1706.03762) §3.2
- Jay Alammar 图解：[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) —— 非常直观的注意力可视化
- 动手理解：用 🤗 Transformers 库的 `bertviz` 工具可视化 BERT 的注意力权重
