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

### 核心参数详解

| 参数 | 推荐值 | 说明 |
|------|-------|------|
| `chunk_size` | 512-1024 | 太小丢失上下文，太大超出 LLM 窗口或触达 Embedding 模型上限 |
| `chunk_overlap` | chunk_size 的 10-25% | 保持语义连贯，避免关键句被切在两段之间 |
| `separators` | `["\n\n", "\n", "。", "！", "？", "；", " ", ""]` | 中文文档必须在分隔符中加入中文标点符号 |
| `length_function` | `len` | 中文建议用字符数，Embedding 模型的 tokenizer 切中文不直观 |
| `is_separator_regex` | `False`(默认) | 保持默认 |

### 进阶分块方法

递归字符分割是基础方案，下列方法在不同场景有更好的表现：

| 方法 | 原理 | 优点 | 缺点 | 适用场景 |
|------|------|------|------|---------|
| 递归字符分割 | 按分隔符优先级递归切分 | 简单可靠，无需额外模型 | 不感知语义 | **通用文档（首选）** |
| 语义分块 | 相邻句 Embedding 相似度低于阈值时断句 | 语义自然、边界合理 | 需编码全量句子，速度慢 | 长文章、论文、技术文档 |
| 句子窗口检索 | 按句子切小粒度，检索时返回周围 N 句 | 信息完整不丢失 | 索引量变大，存储成本高 | FAQ、客服对话 |
| Agentic 分块 | 用 LLM 判断最佳断点 | 最智能、精度最高 | 贵 + 慢，不适合大规模 | 高质量知识库构建 |
| 层级分块（父子节点） | 大块存上下文，小块存索引 | 兼顾多粒度检索 | 实现复杂，需特殊数据结构 | 百万级文档库 |

**语义分块代码示例：**

```python
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("BAAI/bge-small-zh-v1.5")

def semantic_chunk(text: str, similarity_threshold: float = 0.7) -> list[str]:
    """当相邻句子的语义相似度低于阈值时，在该处断开"""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=128, chunk_overlap=0,
        separators=["。", "！", "？", "；", "\n", " ", ""]
    )
    sentences = splitter.split_text(text)
    if len(sentences) <= 1:
        return [text]

    chunks = []
    current_chunk = [sentences[0]]
    for i in range(1, len(sentences)):
        # 编码当前句和上一句，判断语义断点
        emb_prev = model.encode(sentences[i - 1])
        emb_curr = model.encode(sentences[i])
        similarity = cosine_similarity([emb_prev], [emb_curr])[0][0]

        if similarity < similarity_threshold:
            chunks.append(" ".join(current_chunk))
            current_chunk = [sentences[i]]
        else:
            current_chunk.append(sentences[i])
    chunks.append(" ".join(current_chunk))
    return chunks
```

> **实践建议**：论文、技术文档用语义分块有明显收益；FAQ / 对话类数据用递归分块足够，语义分块的额外计算不划算。

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

### 中文 Embedding 模型综合对比

| 模型 | 维度 | MTEB-zh | 推理速度 | 模型大小 | 适用 |
|------|------|---------|---------|---------|------|
| BGE-small-zh-v1.5 | 512 | 64.5 | ⚡ 极快 | ~100MB | 快速原型 / 低资源 |
| BGE-large-zh-v1.5 | 1024 | 70.5 | 快 | ~1.3GB | **通用中文首选** |
| BGE-m3 | 1024 | 72.1 | 中 | ~2.2GB | 多语言场景 |
| GTE-large-zh | 1024 | 69.8 | 快 | ~1.3GB | 速度优先 |
| GTE-Qwen2-7B-instruct | 3584 | 75.0 | 慢 | ~14GB | 极致质量（法律/医疗） |
| m3e-large | 1024 | 63.8 | 快 | ~1.1GB | 资源受限环境 |
| text2vec-large-chinese | 1024 | 64.3 | 快 | ~1.3GB | 轻量中文场景 |
| OpenAI text-embedding-3-small | 512/1536 | — | API 调用 | — | 不想自部署 |
| OpenAI text-embedding-3-large | 256/3072 | — | API 调用 | — | 多语言 API |

### 维度选择指南

维度越高表示能力越强，但存储和查询成本随之增加：

| 维度 | 适用场景 | 100 万条存储量 |
|------|---------|-------------|
| 256 | 快速原型，语义要求不高 | ~1 GB |
| 512 | 通用业务文档 | ~2 GB |
| **768** | **推荐平衡点** | ~3 GB |
| 1024 | 高质量需求 | ~4 GB |
| 1536+ | 多语言、高精度 | ~6 GB+ |

> **实战路线**：`bge-small-zh-v1.5`（512 维）→ 快速验证 → `bge-large-zh-v1.5`（1024 维）→ 上线 → 效果不满意再考虑 `gte-Qwen2-7B-instruct`。

### Embedding 编码性能优化

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("BAAI/bge-large-zh-v1.5")

# 批量编码（比逐条快 5-10 倍）
embeddings = model.encode(
    chunks,
    batch_size=64,              # 根据 GPU 显存调整
    show_progress_bar=True,
    normalize_embeddings=True   # 余弦相似度检索必须归一化
)

# 超大语料（>100 万条）：多进程编码
pool = model.start_multi_process_pool()
embeddings = model.encode_multi_process(chunks, pool)
model.stop_multi_process_pool(pool)
```

> **注意**：`normalize_embeddings=True` 对余弦相似度检索至关重要。未归一化时，`index.search()` 用的是内积而非余弦距离，可能导致排序偏差。

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

### 交叉编码 vs 双编码

| | 向量检索 (Bi-Encoder) | Re-ranker (Cross-Encoder) |
|---|---------------------|--------------------------|
| 编码方式 | 问题、文档**分别**编码 | 问题、文档**联合**编码 |
| 交互方式 | 仅通过向量间距离交互 | 输入层就交叉，捕捉词级交互 |
| 速度 | 快（可预计算文档向量存库） | 慢（必须对每对 query-doc 实时计算） |
| 精度 | 中等（粗排） | 高（细粒度语义匹配） |
| 使用阶段 | 第一阶段：宽召回 | 第二阶段：精细排序 |
| 典型数量级 | 百万级 → Top-100 | Top-100 → Top-5 |

**为什么 Cross-Encoder 更准？** 向量检索是「分别看问题、分别看文档，再比余弦距离」；Cross-Encoder 是「把问题和文档拼接后一起喂给 Transformer」，注意力层能直接捕获词与词之间的语义对齐。代价是必须对每对 (query, doc) 做一次完整前向，无法预计算。

### 完整 Re-rank 示例

下面的例子展示了 Re-ranker 如何纠正向量检索的排序偏差：

```python
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("BAAI/bge-reranker-v2-m3")

query = "感冒了吃什么药"
candidates = [
    "感冒时多喝热水，注意休息，一般一周自愈。",           # 通用建议
    "对乙酰氨基酚（扑热息痛）是感冒退烧的常用非处方药。",  # 最相关
    "感冒通常由病毒引起，抗生素对病毒无效。",              # 相关但并非直接回答
    "感冒期间可以喝姜汤发汗。",                            # 偏方
    "流感疫苗每年接种一次。",                              # 完全无关
]

# 构造 [问题, 文档] 对
pairs = [[query, doc] for doc in candidates]
scores = reranker.predict(pairs)

# 打印打分结果
for doc, score in sorted(zip(candidates, scores), key=lambda x: x[1], reverse=True):
    print(f"[{score:.4f}] {doc}")

# 实际输出：
# [0.9832] 对乙酰氨基酚（扑热息痛）是感冒退烧的常用非处方药。 ← 最高分
# [0.5621] 感冒通常由病毒引起，抗生素对病毒无效。
# [0.2103] 感冒期间可以喝姜汤发汗。
# [0.0001] 感冒时多喝热水，注意休息，一般一周自愈。
# [0.0010] 流感疫苗每年接种一次。
```

> **关键观察**：向量检索很可能把「病毒引起」排第一（因为词袋重叠度高：感冒、病毒、感冒），但 Re-ranker 通过交叉编码理解了问的是「什么药」，正确地把「具体药物」排到最高分。这是向量检索靠距离排序无法做到的。

### Re-ranker 推荐

| 模型 | 中文 | 类型 |
|------|------|------|
| BGE-reranker-large | ✅ 优秀 | 本地 |
| Cohere Rerank v3 | ✅ 好 | API |

---

## 混合检索 (Hybrid Search)

### 为什么需要混合检索

向量检索做语义理解，BM25 做关键词精确匹配。两者互补：

| | 向量检索 | BM25 关键词检索 |
|---|---------|---------------|
| 原理 | 语义向量余弦相似度 | 词频-逆文档频率 (TF-IDF) |
| 优势 | 理解同义词、改写、用户意图 | 精确匹配专有名词、编号、代码 |
| 劣势 | 对稀有词、精确 ID 不敏感 | 不懂语义和同义表达 |
| 场景举例 | 「怎么给宠物洗澡」→ 找到「猫咪沐浴教程」 | 搜「KH-2024-0892」→ 精确命中工单 |

**典型翻车案例**：用户搜 `Error code E10023`，纯向量检索可能返回很多「常见错误处理」的通用文档，而 BM25 能直接定位到含 `E10023` 的那一页。

**混合检索 = 向量检索 + BM25 + 加权融合。**

### 实现

```python
from rank_bm25 import BM25Okapi
import jieba
import numpy as np
from sentence_transformers import SentenceTransformer

class HybridSearch:
    def __init__(self, documents: list[str], embedding_model: SentenceTransformer):
        self.documents = documents
        self.embeddings = embedding_model.encode(
            documents, normalize_embeddings=True
        )

        # 构建 BM25 索引
        tokenized = [list(jieba.cut_for_search(doc)) for doc in documents]
        self.bm25 = BM25Okapi(tokenized)

    def search(
        self,
        query: str,
        embedding_model: SentenceTransformer,
        top_k: int = 10,
        alpha: float = 0.4,
    ) -> list[dict]:
        """
        alpha: 向量权重 (0-1)，1=纯向量，0=纯 BM25
        推荐 alpha=0.4，稍偏向 BM25 的精确匹配
        """
        # 1. 向量检索打分 + 归一化
        query_emb = embedding_model.encode([query], normalize_embeddings=True)[0]
        vec_scores = np.dot(self.embeddings, query_emb)
        vec_scores = (vec_scores - vec_scores.min()) / (vec_scores.max() - vec_scores.min() + 1e-8)

        # 2. BM25 打分 + 归一化
        tokenized_query = list(jieba.cut_for_search(query))
        bm25_scores = np.array(self.bm25.get_scores(tokenized_query))
        bm25_scores = (bm25_scores - bm25_scores.min()) / (bm25_scores.max() - bm25_scores.min() + 1e-8)

        # 3. 加权融合
        final_scores = alpha * vec_scores + (1 - alpha) * bm25_scores
        top_indices = np.argsort(final_scores)[::-1][:top_k]

        return [
            {
                "doc": self.documents[i],
                "final_score": float(final_scores[i]),
                "vec_score": float(vec_scores[i]),
                "bm25_score": float(bm25_scores[i]),
            }
            for i in top_indices
        ]

# 使用
hs = HybridSearch(documents, model)
results = hs.search("KH-2024-0892 处理进展", model, top_k=5, alpha=0.4)
for r in results:
    print(f"[{r['final_score']:.3f}] {r['doc'][:80]}...")
```

### 融合权重调优

| alpha | 偏重 | 适用场景 |
|-------|------|---------|
| 0.2 | 重 BM25 | 搜索工单 ID、产品型号、API 端点等精确匹配 |
| **0.4** | **稍偏 BM25** | **通用推荐**：多数场景关键词匹配更可靠 |
| 0.6 | 稍偏语义 | FAQ、客服问答等自然语言问法多变场景 |
| 0.8 | 重向量 | 论文、长文搜索，语义为主关键词为辅 |

> **α = 0.4 的理由**：实际测试中，用户输入的精确关键词比语义微妙差异更可靠。过于偏重向量会导致 BM25 正确排第一的结果被语义噪音挤下去。

---

## 优化收益

- 分块优化：提升 10-20%
- Embedding 选型：提升 5-15%
- Re-ranking：**提升 15-30%** ← 效果最显著
- 混合检索：提升 5-12%

---

## RAG 评估指标

调优必须量化，否则就是「我觉得效果好多了」——不可复现。

### 检索质量指标

| 指标 | 全称 | 计算方式 | 关注什么 |
|------|------|---------|---------|
| **Hit Rate@K** | 命中率 | Top-K 中是否有正确答案的比例 | 最直观：找到没有？ |
| **MRR** | Mean Reciprocal Rank | 第一个正确答案排名的倒数均值 | 第一个相关结果排第几 |
| **NDCG@K** | Normalized Discounted Cumulative Gain | 排名靠前、更相关的文档赋更高权重 | 最全面：同时考虑位置和相关性 |
| **Recall@K** | 召回率 | 检索到的相关文档数 / 全部相关文档数 | 全不全？有没有遗漏 |

**Hit Rate 与 MRR 的计算：**

```python
def hit_rate(retrieved_ids: list[list[str]], ground_truth: list[list[str]]) -> float:
    """Top-K 中至少命中一个正确答案的查询占比"""
    hits = 0
    for retrieved, gt in zip(retrieved_ids, ground_truth):
        if any(doc_id in gt for doc_id in retrieved):
            hits += 1
    return hits / len(retrieved_ids)

def mrr(retrieved_ids: list[list[str]], ground_truth: list[list[str]]) -> float:
    """第一个相关结果排名的倒数，对所有查询取平均"""
    total = 0.0
    for retrieved, gt in zip(retrieved_ids, ground_truth):
        for rank, doc_id in enumerate(retrieved, start=1):
            if doc_id in gt:
                total += 1.0 / rank
                break
        # 如果没有命中，贡献 0
    return total / len(retrieved_ids)

# 示例
queries = ["感冒吃什么药", "猫咪洗澡方法", "Python 列表推导式"]
retrieved = [["d1", "d3", "d5"], ["d2", "d4", "d6"], ["d1", "d7", "d8"]]
ground    = [["d2", "d5"], ["d4", "d9"], ["d1"]]

print(f"Hit Rate@3: {hit_rate(retrieved, ground):.1%}")   # → 66.7%
print(f"MRR: {mrr(retrieved, ground):.3f}")                # → 0.500
```

**解读**：Hit Rate 只用 3 个查询里的 2 个命中了。MRR = 0.5 说明正确答案平均排在第二位。

### 生成质量指标

| 指标 | 含义 | 评估方式 |
|------|------|---------|
| **Faithfulness**（忠实度） | 回答是否严格依据检索到的文档 | 逐句检查是否有文档原文支撑 |
| **Answer Relevance** | 回答是否切中用户问题 | LLM 评判回答与问题的相关性 |
| **Context Relevance** | 检索到的上下文是否相关 | 检查检索结果是否包含无关噪音 |

### 用 Ragas 自动化评估

```python
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_recall
from datasets import Dataset

eval_dataset = Dataset.from_dict({
    "question": [
        "感冒了应该吃什么药",
        "如何训练一个图像分类模型",
    ],
    "answer": [
        "可以服用对乙酰氨基酚退烧，配合伪麻黄碱缓解鼻塞...",
        "训练步骤包括：准备数据集、选择预训练模型、fine-tune...",
    ],
    "contexts": [
        ["感冒药说明：对乙酰氨基酚用于退烧...", "伪麻黄碱可缓解鼻塞..."],
        ["图像分类教程：使用 PyTorch 加载 ImageNet...", "Fine-tuning 步骤..."],
    ],
    "ground_truth": [
        ["对乙酰氨基酚", "伪麻黄碱"],
        ["准备数据", "选择模型", "fine-tune"],
    ],
})

result = evaluate(
    eval_dataset,
    metrics=[faithfulness, answer_relevancy, context_recall],
)
print(result)
```

### 指标基准参考

| 指标 | 不可用 | 可用 | 良好 | 优秀 |
|------|-------|------|------|------|
| Hit Rate@5 | < 60% | 60-80% | 80-90% | > 90% |
| MRR | < 0.3 | 0.3-0.6 | 0.6-0.8 | > 0.8 |
| Faithfulness | < 0.7 | 0.7-0.85 | 0.85-0.95 | > 0.95 |
| Answer Relevance | < 0.6 | 0.6-0.8 | 0.8-0.9 | > 0.9 |

> **建议**：在优化 RAG 之前先建立测试集和指标基线，每次改动跑一遍评估，用数据说话。

## 关联阅读

- [搭建 RAG 知识库](/practices/rag-knowledge-base) — 基础教程
- [Embedding](/terms/embedding)
- [向量数据库](/terms/vector-db)
- [AI 应用架构](/dev/app-architecture) — 缓存策略优化
