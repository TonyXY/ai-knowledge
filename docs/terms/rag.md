---
title: "RAG"
description: "检索增强生成——从外部知识库检索信息后整合给 LLM，解决知识过时和幻觉问题"
difficulty: intermediate
---

# RAG

<DifficultyBadge level="intermediate" />

## 一句话解释

RAG（Retrieval-Augmented Generation，检索增强生成）是一种让 LLM 在回答问题时**先从外部知识库检索相关信息**，再将检索到的内容作为上下文拼接给模型的技术方案。它解决了 LLM 知识截止日期过时和"一本正经胡说八道"（幻觉）的两大痛点。

## 通俗类比

想象你是一个记者，要写一篇关于"某公司最新财报"的报道。你有两种方式：一是凭记忆写（= 纯 LLM），如果记忆停留在三个月前，写出来的内容就是过时的；二是先去公司的资料库查最新财报，拿在手里边看边写（= RAG），这样写出来的报道就准确且时效性强。RAG 就是给 LLM 配了一个"实时翻书助手"。

## 技术定义

RAG 系统的典型工作流程：

1. **离线索引阶段**：将知识文档（PDF、网页、数据库等）切分成文本块，通过 [Embedding](/terms/embedding) 模型转化为向量，存入 [向量数据库](/terms/vector-db)
2. **在线检索阶段**：用户提问后，将问题同样转化为向量，在向量数据库中执行相似度搜索，召回 Top-K 最相关的文本块
3. **增强生成阶段**：将召回的文本块作为上下文，与用户问题一起构造 Prompt，发送给 LLM 生成最终回答

RAG 的核心优势：知识可热更新（不需要重新训练模型）、回答可溯源（能指出信息来自哪个文档）、幻觉可控（有真实文档作为约束）。

进阶变体包括 **Graph RAG**（用知识图谱组织信息）和 **Agentic RAG**（让 Agent 自主决定检索策略和多轮检索）。

## 关联术语

- [Embedding](/terms/embedding) —— 将文本转为向量的关键技术
- [向量数据库](/terms/vector-db) —— 存储和检索向量的基础设施
- [大语言模型 (LLM)](/terms/llm) —— RAG 中负责生成回答的模型
- [Agent](/terms/agent) —— 更自主的 RAG 变体（Agentic RAG）
- [上下文窗口](/terms/context-window) —— RAG 检索结果受限于窗口大小

## 快速记忆

RAG = 开卷考试——模型不用死记硬背知识，而是先查资料再回答。所以它永远能拿到最新信息。

## 延伸阅读

- Lewis et al., 2020：[Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) —— RAG 原始论文
- LangChain RAG 教程：[Build a RAG application](https://python.langchain.com/docs/tutorials/rag/)
- [搭建 RAG 知识库](/practices/rag-knowledge-base) — 动手教程
- [RAG 深度实践](/dev/rag-deep) — 分块策略、Embedding 选型、Re-ranking
