---
title: RAG 深度实践
description: 分块策略、Embedding 选型、Re-ranking——从"能用"到"好用"
difficulty: advanced
---

<DifficultyBadge level="advanced" />

# RAG 深度实践

如果你已经掌握了[基础 RAG 搭建](/practices/rag-knowledge-base)，这篇带你深入优化——从"跑通"到"效果好"。

---

## 分块策略 (Chunking)

分块是 RAG 最基础也最关键的环节。

### 三种方式

| 方式 | 做法 | 优点 | 缺点 |
|------|------|------|------|
| 固定大小 | 按 N tokens 切 | 简单快速 | 切断语义 |
| 语义分块 | 按句号/段落切 | 语义完整 | 大小不均 |
| 递归分块 | 按层级分割 | 兼顾两者 | 需调参 |

推荐使用 LangChain 的 `RecursiveCharacterTextSplitter`：

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=100,
    separators=["\n\n", "\n", "。", " ", ""]
)
chunks = splitter.split_text(long_document)
```

参数建议：`chunk_size` 256-1024，`overlap` 10-20%。

---

## Embedding 选型

| 模型 | 维度 | 中文 | 价格 |
|------|------|------|------|
| OpenAI text-embedding-3-small | 512/1536 | 良好 | $0.02/M |
| OpenAI text-embedding-3-large | 256/3072 | 好 | $0.13/M |
| **BGE-large-zh** | 1024 | **优秀** | 开源免费 |
| GTE-Qwen2 | 1024 | 优秀 | 开源免费 |

**中文场景首选 BGE-large-zh**，开源且效果好：

```python
from sentence_transformers import SentenceTransformer
model = SentenceTransformer('BAAI/bge-large-zh-v1.5')
embeddings = model.encode(chunks)
```

---

## Re-ranking（重排序）

### 为什么需要

向量检索的 Top-K 不一定最相关。Re-ranker 是交叉编码器，对问题和候选文本逐一打分，精度更高。

### 二阶段流程

```
用户提问 → 向量检索 Top-50 → Re-ranker 重排 → Top-5 作为上下文
```

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('BAAI/bge-reranker-large')
pairs = [[query, doc] for doc in top_50_docs]
scores = reranker.predict(pairs)

ranked = sorted(zip(top_50_docs, scores), key=lambda x: x[1], reverse=True)
final_context = [doc for doc, score in ranked[:5]]
```

### Re-ranker 推荐

| 模型 | 中文 | 类型 |
|------|------|------|
| BGE-reranker-large | ✅ 优秀 | 本地 |
| Cohere Rerank v3 | ✅ 好 | API |

---

## 优化收益

- 分块优化：提升 10-20%
- Embedding 选型：提升 5-15%
- Re-ranking：**提升 15-30%** ← 效果最显著

## 关联阅读

- [搭建 RAG 知识库](/practices/rag-knowledge-base) — 基础教程
- [Embedding](/terms/embedding)
- [向量数据库](/terms/vector-db)
- [AI 应用架构](/dev/app-architecture) — 缓存策略优化
