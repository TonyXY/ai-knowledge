---
title: 搭建 RAG 知识库
description: Python + LangChain + Chroma + OpenAI API——从零搭建一个能回答私有文档问题的 AI 知识库
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# 搭建 RAG 知识库

本篇带你从零搭建一个 RAG（检索增强生成）知识库——上传你的文档，用自然语言提问，AI 基于你的文档内容给出准确回答。

## 什么是 RAG？

RAG（Retrieval-Augmented Generation）是一种让 AI 回答私有知识的技术方案：

```
用户提问 → 从文档中检索相关内容 → 将检索结果 + 问题一起发给 LLM → 生成答案
```

优势：
- **不需要微调**模型（省钱省时间）
- **答案有来源**（可以追溯到具体文档段落）
- **数据实时更新**（改文档就行，不用重新训练）

## 准备工作

### 环境要求

- Python 3.10+
- OpenAI API Key（[获取地址](https://platform.openai.com/api-keys)）
- 一些文档文件（PDF、TXT、Markdown 等）

### 安装依赖

```bash
pip install langchain langchain-openai langchain-chroma chromadb pypdf unstructured tiktoken
```

---

## 第 1 步：加载文档

把你要"喂"给 AI 的文档放在一个文件夹里，比如 `./docs/`。

```python
# 1_document_loader.py
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader

# 加载 docs 文件夹下的所有文件
loader = DirectoryLoader(
    "./docs",
    glob="**/*.pdf",
    loader_cls=PyPDFLoader,
)

# 同时也加载文本文件
txt_loader = DirectoryLoader(
    "./docs",
    glob="**/*.txt",
    loader_cls=TextLoader,
)

documents = loader.load() + txt_loader.load()

print(f"加载了 {len(documents)} 个文档")
for doc in documents[:3]:
    print(f"  - {doc.metadata.get('source', 'unknown')}: {len(doc.page_content)} 字符")
```

### 支持的文档格式

| 格式 | 加载器 | 说明 |
|------|--------|------|
| PDF | `PyPDFLoader` | 支持文字型 PDF |
| TXT | `TextLoader` | 纯文本 |
| Markdown | `UnstructuredMarkdownLoader` | 保留标题层级 |
| CSV | `CSVLoader` | 表格数据 |
| Word | `Docx2txtLoader` | .docx 文件 |

---

## 第 2 步：文本切片

文档太长，LLM 一次处理不了，而且精确度会下降。所以需要把文档切分成小块。

```python
# 2_text_splitter.py
from langchain_text_splitters import RecursiveCharacterTextSplitter

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,        # 每块 500 字符
    chunk_overlap=50,      # 块与块之间重叠 50 字符（防止语义断裂）
    separators=["\n\n", "\n", "。", ".", " ", ""],  # 优先按段落切
)

chunks = text_splitter.split_documents(documents)

print(f"切分成了 {len(chunks)} 个文本块")
print(f"示例块 ({len(chunks[0].page_content)} 字符):")
print(chunks[0].page_content[:200] + "...")
```

### 切片参数调优

| 参数 | 建议值 | 说明 |
|------|--------|------|
| `chunk_size` | 300-1000 | 太大检索不准，太小丢失上下文 |
| `chunk_overlap` | 10-20% of chunk_size | 防止关键信息被切断 |
| 中文场景 | `chunk_size=500` | 中文信息密度高，可以稍小一点 |

---

## 第 3 步：文本向量化（Embedding）

把文本块转成向量，这样计算机才能"理解"语义并进行相似度搜索。

```python
# 3_embedding.py
import os
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

os.environ["OPENAI_API_KEY"] = "your-api-key"  # 替换成你的 API Key

# 创建 Embedding 模型
embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small",  # 性价比最高的 Embedding 模型
)

# 存储到 Chroma（向量数据库）
vector_store = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory="./chroma_db",  # 持久化存储
)

print(f"向量数据库已创建，存储了 {len(chunks)} 个文本块")
```

::: warning 注意
Embedding 和存储这一步比较耗时（取决于文档量），但**只需要做一次**。之后可以直接加载已有的向量数据库。
:::

### 关于 Chroma

Chroma 是轻量级的开源向量数据库，适合学习和中小规模项目。如果数据量大（百万级文档），可以考虑：
- [Pinecone](https://www.pinecone.io)（云服务）
- [Weaviate](https://weaviate.io)（开源，功能更全）
- [Milvus](https://milvus.io)（国产，大规模场景）

---

## 第 4 步：语义检索

根据用户提问，在向量数据库中检索最相关的文档片段。

```python
# 4_retrieval.py
# 加载已有的向量数据库（不需要重新创建）
vector_store = Chroma(
    persist_directory="./chroma_db",
    embedding_function=embeddings,
)

# 创建检索器
retriever = vector_store.as_retriever(
    search_type="similarity",  # 相似度搜索
    search_kwargs={"k": 4},    # 返回最相关的 4 个片段
)

# 测试检索
query = "Python 中如何处理异常？"
relevant_docs = retriever.invoke(query)

for i, doc in enumerate(relevant_docs):
    print(f"\n--- 片段 {i+1} ---")
    print(doc.page_content[:300])
    print(f"来源: {doc.metadata.get('source', 'unknown')}")
```

---

## 第 5 步：生成答案

将检索到的相关内容 + 用户问题，一起发送给 LLM 生成最终答案。

```python
# 5_qa_chain.py
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

# 初始化 LLM
llm = ChatOpenAI(
    model="gpt-4o-mini",  # 日常使用推荐，性价比高
    temperature=0.3,       # 低温度 = 更稳定、更准确
)

# 定义 Prompt 模板
prompt = ChatPromptTemplate.from_template("""
你是一个知识库助手。请**仅基于**以下上下文回答问题。
如果上下文中找不到答案，请直接说"根据已有资料无法回答"。
不要编造信息。

## 上下文

{context}

## 问题

{question}

## 回答
""")

# 构建 RAG 链
def format_docs(docs):
    """将检索到的文档格式化为一整段文本"""
    return "\n\n".join(doc.page_content for doc in docs)

rag_chain = (
    {
        "context": retriever | format_docs,  # 检索 + 格式化
        "question": RunnablePassthrough(),    # 直接传递用户问题
    }
    | prompt
    | llm
    | StrOutputParser()
)

# 测试问答
answer = rag_chain.invoke("Python 中 try-except 语句怎么用？")
print("回答：", answer)
```

---

## 完整代码

把上述代码整合成一个脚本：

```python
# rag_app.py —— 完整的 RAG 问答系统
import os
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser

os.environ["OPENAI_API_KEY"] = "your-api-key"

# ====== 1. 文档加载 ======
def load_documents(directory="./docs"):
    pdf_loader = DirectoryLoader(directory, glob="**/*.pdf", loader_cls=PyPDFLoader)
    txt_loader = DirectoryLoader(directory, glob="**/*.txt", loader_cls=TextLoader)
    return pdf_loader.load() + txt_loader.load()

# ====== 2. 文本切片 ======
def split_documents(docs):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500, chunk_overlap=50,
        separators=["\n\n", "\n", "。", ".", " ", ""],
    )
    return splitter.split_documents(docs)

# ====== 3. 创建/加载向量库 ======
def get_vector_store(chunks, persist_dir="./chroma_db"):
    embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
    if os.path.exists(persist_dir) and os.listdir(persist_dir):
        print("加载已有向量数据库...")
        return Chroma(persist_directory=persist_dir, embedding_function=embeddings)
    print("创建向量数据库...")
    return Chroma.from_documents(chunks, embeddings, persist_directory=persist_dir)

# ====== 4. 构建 RAG 链 ======
def build_rag_chain(vector_store):
    retriever = vector_store.as_retriever(search_kwargs={"k": 4})
    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

    prompt = ChatPromptTemplate.from_template("""
你是一个知识库助手。请**仅基于**以下上下文回答问题。
如果上下文中找不到答案，请直接说"根据已有资料无法回答"。

## 上下文
{context}

## 问题
{question}

## 回答
""")

    def format_docs(docs):
        return "\n\n".join(d.page_content for d in docs)

    return (
        {"context": retriever | format_docs, "question": RunnablePassthrough()}
        | prompt | llm | StrOutputParser()
    )

# ====== 主流程 ======
if __name__ == "__main__":
    docs = load_documents("./docs")
    chunks = split_documents(docs)
    vector_store = get_vector_store(chunks)
    rag_chain = build_rag_chain(vector_store)

    print("\nRAG 知识库已就绪！输入问题开始提问，输入 'quit' 退出。\n")

    while True:
        query = input("你：")
        if query.lower() in ("quit", "exit", "q"):
            break
        answer = rag_chain.invoke(query)
        print(f"\nAI：{answer}\n")
```

### 运行

```bash
# 1. 把文档放到 ./docs 文件夹
mkdir docs
cp /path/to/your/docs/*.pdf ./docs/

# 2. 运行程序
python rag_app.py

# 3. 开始提问
# 你：这份文档的核心内容是什么？
# AI：根据文档内容，核心内容包括...
```

---

## 进阶优化

### 1. 混合检索（Hybrid Search）

结合关键词搜索和语义搜索，提高准确率：

```python
from langchain.retrievers import BM25Retriever, EnsembleRetriever

# 关键词检索
bm25_retriever = BM25Retriever.from_documents(chunks)
bm25_retriever.k = 3

# 语义检索
semantic_retriever = vector_store.as_retriever(search_kwargs={"k": 3})

# 混合检索
ensemble_retriever = EnsembleRetriever(
    retrievers=[bm25_retriever, semantic_retriever],
    weights=[0.3, 0.7],  # 语义权重更高
)
```

### 2. 添加来源引用

```python
prompt = ChatPromptTemplate.from_template("""
...（同上）...

## 回答格式要求

请在回答末尾标注信息来源：
---
**参考来源**：
- 来源1：{source_1}
- 来源2：{source_2}
""")
```

---

## 总结

| 步骤 | 做什么 | 核心技术 |
|------|--------|----------|
| 1 | 加载文档 | LangChain Document Loaders |
| 2 | 文本切片 | RecursiveCharacterTextSplitter |
| 3 | 向量化存储 | OpenAI Embedding + Chroma |
| 4 | 语义检索 | Vector Similarity Search |
| 5 | 生成答案 | GPT-4o-mini + Prompt 约束 |

## 关联阅读

- [RAG 详解](/terms/rag)
- [Embedding](/terms/embedding)
- [向量数据库](/terms/vector-db)
- [用 Claude 分析文档](/practices/claude-analysis) —— 单次文档分析的更简单方案
