---
title: "RAG"
description: "检索增强生成——从外部知识库检索信息后整合给 LLM，解决知识过时和幻觉问题"
difficulty: intermediate
---

# RAG

<DifficultyBadge level="intermediate" />

## 一句话解释

RAG（Retrieval-Augmented Generation，检索增强生成）是一种让 LLM 在回答问题时**先从外部知识库检索相关信息**，再将检索到的内容作为上下文拼接给模型的技术方案。它解决了 LLM 知识截止日期过时和"一本正经胡说八道"（幻觉）的两大痛点。

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;overflow-x:auto">
  <svg viewBox="0 0 580 380" style="max-width:580px;width:100%">
    <!-- 在线流程 -->
    <text x="15" y="22" font-size="12" font-weight="bold" fill="#1e293b">在线检索流程</text>
    <rect x="30" y="30" width="540" height="220" rx="8" fill="#fff" stroke="#e2e8f0" stroke-width="1"/>

    <!-- 1. 用户提问 -->
    <rect x="200" y="40" width="120" height="30" rx="15" fill="#6366f1"/>
    <text x="260" y="60" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">🙋 用户提问</text>
    <polygon points="256,70 260,78 264,70" fill="#6366f1"/>
    <line x1="260" y1="70" x2="260" y2="78" stroke="#6366f1" stroke-width="1.5"/>

    <!-- 2. Embedding -->
    <rect x="190" y="82" width="140" height="28" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="1"/>
    <text x="260" y="101" text-anchor="middle" font-size="10" fill="#4338ca" font-weight="600">① 向量化 Embedding</text>
    <polygon points="256,110 260,118 264,110" fill="#6366f1"/>
    <line x1="260" y1="110" x2="260" y2="118" stroke="#6366f1" stroke-width="1.5"/>

    <!-- 3. 检索 Top-K -->
    <rect x="140" y="120" width="140" height="28" rx="6" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>
    <text x="210" y="139" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">② 向量检索 Top-K</text>

    <!-- 向量库 -->
    <rect x="340" y="118" width="130" height="32" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>
    <text x="405" y="132" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">向量数据库</text>
    <text x="405" y="144" text-anchor="middle" font-size="8" fill="#a16207">存储文档向量</text>

    <!-- 双向箭头：检索 ↔ 向量库 -->
    <line x1="280" y1="128" x2="340" y2="134" stroke="#eab308" stroke-width="1.5"/>
    <polygon points="278,124 288,128 278,132" fill="#eab308"/>
    <polygon points="338,130 328,134 338,138" fill="#eab308"/>

    <polygon points="206,148 210,156 214,148" fill="#eab308"/>
    <line x1="210" y1="148" x2="210" y2="162" stroke="#eab308" stroke-width="1.5"/>

    <!-- 4. 拼接上下文 -->
    <rect x="160" y="164" width="200" height="28" rx="6" fill="#e0e7ff" stroke="#6366f1" stroke-width="1"/>
    <text x="260" y="183" text-anchor="middle" font-size="10" fill="#4338ca" font-weight="600">③ 拼接 (问题 + 检索结果)</text>
    <polygon points="256,192 260,200 264,192" fill="#6366f1"/>
    <line x1="260" y1="192" x2="260" y2="200" stroke="#6366f1" stroke-width="1.5"/>

    <!-- 5. LLM -->
    <rect x="180" y="204" width="160" height="32" rx="8" fill="#a855f7" opacity="0.15" stroke="#a855f7" stroke-width="1.5"/>
    <text x="260" y="225" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="700">🤖 ④ LLM 生成回答</text>
    <polygon points="256,236 260,244 264,236" fill="#10b981"/>
    <line x1="260" y1="236" x2="260" y2="244" stroke="#10b981" stroke-width="1.5"/>

    <!-- 6. 回答 -->
    <rect x="200" y="248" width="120" height="28" rx="14" fill="#10b981"/>
    <text x="260" y="267" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">✅ 最终回答</text>

    <!-- 离线索引 -->
    <rect x="40" y="262" width="160" height="100" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="5,3"/>
    <text x="120" y="280" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">离线索引流程</text>
    <g transform="translate(50,286)">
      <rect x="0" y="0" width="140" height="20" rx="4" fill="#f1f5f9" stroke="#e2e8f0"/>
      <text x="70" y="14" text-anchor="middle" font-size="9" fill="#64748b">文档 → 分块</text>
      <line x1="70" y1="20" x2="70" y2="24" stroke="#cbd5e1"/>
      <polygon points="67,24 70,28 73,24" fill="#cbd5e1"/>
      <rect x="0" y="28" width="140" height="20" rx="4" fill="#f1f5f9" stroke="#e2e8f0"/>
      <text x="70" y="42" text-anchor="middle" font-size="9" fill="#64748b">Embedding 编码</text>
      <line x1="70" y1="48" x2="70" y2="52" stroke="#cbd5e1"/>
      <polygon points="67,52 70,56 73,52" fill="#cbd5e1"/>
      <rect x="0" y="56" width="140" height="20" rx="4" fill="#f1f5f9" stroke="#e2e8f0"/>
      <text x="70" y="70" text-anchor="middle" font-size="9" fill="#64748b">存入向量数据库</text>
    </g>

    <!-- 离线→在线 -->
    <path d="M200 320 L405 150" fill="none" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
    <polygon points="403,146 408,154 400,152" fill="#94a3b8"/>

    <text x="290" y="370" text-anchor="middle" font-size="11" fill="#94a3b8">先离线索引，再在线检索——用外部知识解决幻觉问题</text>
  </svg>
</div>

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
