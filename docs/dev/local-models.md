---
title: 本地模型部署
description: 用 Ollama 一键跑起本地大模型——从安装到 API 调用，掌握隐私优先的 AI 开发方案
difficulty: intermediate
---

<DifficultyBadge level="beginner" />

# 本地模型部署

不是所有场景都需要云端 API。当你处理敏感数据、想在飞机上写代码、或者只是不想每个月付 API 账单时，把模型跑在本地是更好的选择。本篇用 Ollama 带你从零到一。

## 为什么跑本地模型

| 优势 | 说明 |
|------|------|
| **数据隐私** | 所有数据不出本机，医疗、金融、涉密场景的刚需 |
| **零费用** | 没有 API 调用费，一台机器跑一天也就几度电 |
| **离线可用** | 飞机上、地铁里、网络差的地方照样跑 |
| **低延迟** | 省去网络往返，从 500ms 降到 50ms 以内 |

代价是：
- 需要一定的硬件（至少 8GB 内存/显存）
- 模型能力弱于 GPT-4o/Claude 等云端旗舰
- 自己维护模型版本和更新

对大多数开发场景（代码生成、文本分类、本地 RAG），7B-13B 的本地模型已经够用了。

## Ollama 快速入门

[Ollama](https://ollama.com) 是目前最简单的本地模型运行工具，一条命令就能下载并启动模型。

### 安装

**macOS**

```bash
brew install ollama
```

**Linux**

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Windows**

从 [ollama.com](https://ollama.com/download/windows) 下载安装包，一路 Next 即可。

安装完成后终端输入 `ollama` 看到帮助信息就成功了。

### 常用命令

```bash
# 拉取并运行模型（自动下载）
ollama run llama3.2

# 查看已下载的模型
ollama list

# 下载模型但不运行
ollama pull qwen2.5:7b

# 删除模型
ollama rm llama3.2

# 查看模型详细信息（参数量、量化方式、架构）
ollama show llama3.2
```

### 推荐模型

| 模型 | 大小 | 特点 | 适合场景 |
|------|------|------|----------|
| **llama3.2** | 3B | Meta 最新轻量模型，英文极强 | 通用对话、代码补全 |
| **qwen2.5** | 7B | 阿里出品，中文最强开源模型 | 中文写作、翻译、总结 |
| **deepseek-r1** | 7B | 推理型模型，内置思维链 | 数学推理、逻辑分析 |
| **codestral** | 22B | Mistral 专为编程优化 | 代码生成、重构 |

初次使用建议从 `llama3.2`（3B）或 `qwen2.5:7b` 开始，下载快、占用少。

### 通过 API 调用

Ollama 启动后会在本地 `127.0.0.1:11434` 开启 HTTP 服务，接口兼容 OpenAI 格式：

```python
import requests

def ollama_chat(model: str, prompt: str) -> str:
    """调用 Ollama 本地 API 进行对话。"""
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={
            "model": model,
            "messages": [
                {"role": "system", "content": "你是一个有帮助的助手。"},
                {"role": "user", "content": prompt},
            ],
            "stream": False,
        },
        timeout=60,
    )
    response.raise_for_status()
    return response.json()["message"]["content"]

# 使用示例
result = ollama_chat("qwen2.5:7b", "用一句话解释什么是大语言模型")
print(result)
```

也可以直接用 OpenAI Python SDK，把 `base_url` 指向 Ollama：

```python
from openai import OpenAI

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

response = client.chat.completions.create(
    model="qwen2.5:7b",
    messages=[{"role": "user", "content": "你好，介绍一下你自己"}],
)
print(response.choices[0].message.content)
```

这意味着所有已有的 OpenAI 代码只需改两行就能切到本地模型。

## 模型选择指南

### 参数规模 vs 硬件要求

| 参数规模 | 最低内存/显存 | 推荐硬件 | 速度 |
|----------|--------------|----------|------|
| **3B** | 4 GB | M1 MacBook Air, GTX 1060 | 流畅 |
| **7B** | 8 GB | M2 MacBook Air, RTX 3060 | 流畅 |
| **13B** | 16 GB | M1 Pro MacBook, RTX 4070 | 较快 |
| **70B** | 48 GB | M2 Ultra, 双 RTX 4090 | 可接受 |

Mac 用户优势很大——统一内存架构让 CPU 和 GPU 共用内存，M2 16GB 跑 13B 模型完全没问题。

### 量化：速度与质量的平衡

Ollama 默认使用 Q4_K_M 量化（4-bit），文件小、速度快，质量损失很小。如果你需要更高精度：

| 量化格式 | 文件大小（7B 模型） | 质量 | 速度 |
|----------|---------------------|------|------|
| **Q4_K_M** | ~4 GB | 较好 | 快 |
| **Q8_0** | ~7 GB | 接近无损 | 中等 |
| **FP16** | ~14 GB | 无损 | 慢 |

绝大多数场景 Q4_K_M 就够了。只有做数学推理（如 deepseek-r1）才建议上 Q8_0。

## 进阶方案

### llama.cpp：更底层的选择

[llama.cpp](https://github.com/ggerganov/llama.cpp) 是 Ollama 的底层引擎。如果你需要：
- 自定义编译参数（Metal/CUDA/Vulkan 加速）
- 直接运行 .gguf 格式模型文件
- 更灵活的量化参数控制

可以用它替代 Ollama。但日常开发中 Ollama 封装得够好了，没必要重复造轮子。

### Open WebUI：本地 ChatGPT 界面

```bash
docker run -d -p 3000:8080 \
  --add-host=host.docker.internal:host-gateway \
  -v open-webui:/app/backend/data \
  --name open-webui \
  ghcr.io/open-webui/open-webui:main
```

启动后在浏览器打开 `http://localhost:3000`，你就有了一套带对话历史、文件上传、多模型切换的本地 ChatGPT 体验。

## 完整示例：从 OpenAI 切换到 Ollama

```python
from openai import OpenAI
import os


def create_client(use_local: bool = True) -> OpenAI:
    """根据配置返回 OpenAI 或 Ollama 客户端。"""
    if use_local:
        return OpenAI(
            base_url="http://localhost:11434/v1",
            api_key="ollama",  # Ollama 不需要真实 key，但不能为空
        )
    else:
        return OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def chat(client: OpenAI, model: str, prompt: str) -> str:
    """统一对话接口，屏蔽云端/本地的差异。"""
    response = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": "你是一个有帮助的助手。"},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    return response.choices[0].message.content


# 使用示例
client = create_client(use_local=True)
reply = chat(client, "qwen2.5:7b", "用 Python 写一个斐波那契数列生成器")
print(reply)
```

切换云端和本地只需要改 `use_local` 一个参数，剩下的代码完全不变。这才是本地模型的最佳用法——不作为替代，而是作为选项。

## 总结

| 要点 | 一句话 |
|------|--------|
| 核心价值 | 隐私不出机、零费用、离线可用 |
| 入门工具 | Ollama —— 一条命令跑模型 |
| 推荐模型 | qwen2.5:7b（中文）、llama3.2:3b（轻量） |
| API 兼容 | 完全兼容 OpenAI 格式，改 URL 即可 |
| 进阶选型 | llama.cpp 底层控制、Open WebUI 界面管理 |

## 关联阅读

- [AI 安全](/dev/ai-security) —— 数据隐私的最佳实践
- [OpenAI API 入门](/dev/openai-api) —— 对比云端调用和本地调用的区别
- [Ollama 官方文档](https://github.com/ollama/ollama/tree/main/docs) —— 更多模型和配置选项
