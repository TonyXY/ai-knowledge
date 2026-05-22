---
title: "Embedding"
description: "将文本、图像等数据转化为向量（数字数组）的技术——语义相近的内容向量距离更近"
difficulty: intermediate
---

# Embedding

<DifficultyBadge level="intermediate" />

## 一句话解释

Embedding（嵌入）是将文本、图像、音频等非结构化数据**映射为固定长度的数值向量**的技术。核心特性是：**语义相近的内容，其向量在高维空间中的距离也相近**。它是 RAG、语义搜索、推荐系统等技术的基础。

## 通俗类比

想象你有 1000 本书，你想按主题把它们摆到书架上。一种方式是手工一本本分类。更好的方式是为每本书生成一个"坐标"（比如 [0.3, 0.8, -0.1, …]），让内容相似的书自动靠在一起——科幻挨着科幻，历史挨着历史。Embedding 做的事就是把任意的文本/图片变成一个 300 到 4096 维空间里的点，语义越接近，两个点之间的距离就越小。

## 技术定义

Embedding 模型通常基于 Transformer 架构训练，核心训练目标是让语义相近的文本产生相近的向量。常见的训练范式包括：

- **对比学习（Contrastive Learning）**：拉近正样本对（如查询和对应文档）的距离，推远负样本对
- **掩码语言建模（MLM）**：BERT 风格的训练，从上下文预测被遮盖的词

常用的 Embedding 模型：OpenAI `text-embedding-3` 系列、BGE（BAAI）、Cohere Embed、Sentence-BERT。维度越高通常表达能力越强，但存储和计算成本也越大。

两个向量之间的相似度常用**余弦相似度（Cosine Similarity）** 衡量：值越接近 1，两个向量的方向越一致，语义越相近。

Embedding 的典型应用场景包括：语义搜索、文本聚类、文本分类、异常检测、推荐系统。它也是 [RAG](/terms/rag) 和 [向量数据库](/terms/vector-db) 的底层基础。

## 关联术语

- [向量数据库](/terms/vector-db) —— 专门存储和检索 Embedding 向量的数据库
- [RAG](/terms/rag) —— Embedding 是实现 RAG 检索环节的关键
- [大语言模型 (LLM)](/terms/llm) —— LLM 内部也使用 Embedding 表示词和位置
- [Transformer](/terms/transformer) —— 主流的 Embedding 模型基于 Transformer 架构

## 延伸阅读

- OpenAI Embeddings 文档：[Embeddings Guide](https://platform.openai.com/docs/guides/embeddings)
- MTEB Leaderboard：[Massive Text Embedding Benchmark](https://huggingface.co/spaces/mteb/leaderboard) —— 查看当前最好的 Embedding 模型
- 动手实验：用 BGE 模型对一段中文文本生成 Embedding，然后用余弦相似度比较不同句子的语义距离。
