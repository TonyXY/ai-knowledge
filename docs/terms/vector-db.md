---
title: "向量数据库"
description: "专门存储和检索高维向量的数据库，支持近似最近邻搜索，是 RAG 系统的核心基础设施"
difficulty: intermediate
---

# 向量数据库

<DifficultyBadge level="intermediate" />

## 一句话解释

向量数据库（Vector Database）是专门为**存储和检索高维向量**而设计的数据库，支持高效的**近似最近邻搜索（ANN）**。它让 AI 应用能在海量数据中快速找到与查询语义最相似的内容，是 RAG 系统的核心基础设施。

## 通俗类比

传统数据库像电话簿——你按姓名找到号码。向量数据库则像"以图搜图"——你上传一张照片，它找到所有类似的图片。传统搜索是精确匹配，向量搜索是"模糊的相似性匹配"。比如你搜索"便宜的智能手机"，即使数据库里没有完全匹配的词，它也能找到"高性价比手机""千元旗舰"等相关内容——因为它理解的是语义，而不只是关键词。

## 技术定义

向量数据库的核心技术是**近似最近邻搜索（ANN, Approximate Nearest Neighbor）**——在全量遍历逐一比对（精确但慢）和牺牲少量精度换取极快速度之间取得平衡。主流 ANN 算法包括：

- **HNSW（Hierarchical Navigable Small World）**：构建分层图结构，逐层缩小搜索范围，查询速度快且精度高
- **IVF（Inverted File Index）**：用聚类将向量分组，搜索时只查附近几个组
- **PQ（Product Quantization）**：压缩向量以降低存储和计算开销

当前主流的向量数据库：

| 数据库 | 特点 | 适用场景 |
|--------|------|---------|
| **Pinecone** | 全托管 SaaS，开箱即用 | 快速上线，不想管运维 |
| **Milvus** | 开源，功能全面，支持分布式 | 大规模生产环境 |
| **Chroma** | 轻量级，上手极简，Python 友好 | 原型开发、小型项目 |
| **Qdrant** | Rust 编写，性能优秀，支持过滤 | 需要复杂过滤条件的场景 |
| **Weaviate** | GraphQL 接口，内置向量化模块 | 需要多功能集成的场景 |

选择向量数据库时，需要权衡：部署方式（自托管 vs 云服务）、索引性能、过滤能力、生态集成、成本。

## 关联术语

- [Embedding](/terms/embedding) —— 向量数据库存储的就是 Embedding 生成的向量
- [RAG](/terms/rag) —— 向量数据库是 RAG 检索环节的默认选择
- [大语言模型 (LLM)](/terms/llm) —— 向量数据库为 LLM 提供外部知识检索能力

## 快速记忆

普通数据库查关键词，向量数据库查语义。搜『四腿动物』能出来『狗』——因为它们的向量离得近。

## 延伸阅读

- [Milvus 文档：向量索引原理](https://milvus.io/docs/index.md)
- [Pinecone：What is a Vector Database?](https://www.pinecone.io/learn/vector-database/)
- 实践建议：入门先用 Chroma 快速验证想法，上线用 Milvus 或 Pinecone 保证性能。
