---
title: "OpenAI API 入门"
description: "从零开始用代码调用 OpenAI API——环境配置、Chat Completion、参数调优、多轮对话、同时兼容 DeepSeek"
difficulty: beginner
---

# OpenAI API 入门

<DifficultyBadge level="beginner" />

本篇带你用 Python 写出第一个 AI API 调用。不需要任何 AI 背景，只需要会写基本的 Python 代码。

## 什么是 Chat Completion API

Chat Completion API 是最核心的 LLM 接口。简单说就是：**你把消息发给模型，模型返回一段回复**。与"补全 API"（Completion API）不同的是，Chat Completion 专门为对话场景设计，支持 system、user、assistant 三种角色。

几乎所有主流模型都采用 **OpenAI 兼容格式**——这意味着你学会一种，就能调用 OpenAI、DeepSeek、通义千问、智谱等几十种模型。

## 环境准备

```bash
pip install openai
```

设置 API Key（推荐用环境变量，不要写在代码里）：

```bash
export OPENAI_API_KEY="sk-your-key-here"
export DEEPSEEK_API_KEY="sk-your-deepseek-key"
```

## 第一次调用

```python
import os
from openai import OpenAI

# 初始化客户端
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "你是一个有帮助的编程助手。"},
        {"role": "user", "content": "用 Python 写一个冒泡排序"},
    ],
)

print(response.choices[0].message.content)
```

### messages 数组结构

每次对话都是 `messages` 数组，每个元素有三个字段：

| role | 含义 | 示例 |
|------|------|------|
| `system` | 系统指令，定义 AI 的行为和角色 | "你是一个 Python 专家" |
| `user` | 用户消息 | "帮我写一个排序算法" |
| `assistant` | AI 的回复（多轮对话时用到） | "好的，冒泡排序的实现如下…" |

## 核心参数详解

```python
response = client.chat.completions.create(
    model="gpt-4o-mini",    # 模型名
    messages=[...],          # 消息数组
    temperature=0.7,         # 随机性：0=确定, 1=创意, 推荐 0.3-0.7
    max_tokens=512,          # 最大输出 token 数（1 中文 ≈ 1.5 token）
    top_p=0.9,               # 核采样：只考虑概率前 90% 的词，与 temperature 二选一
    n=1,                     # 生成几个候选回复
    stop=None,               # 遇到这些词就停止生成
)
```

**参数选择建议：**

- 写代码 / 翻译 / 事实回答 → `temperature=0` 或 `temperature=0.2`
- 创意写作 / 头脑风暴 → `temperature=0.8` 或 `temperature=1.0`
- 一般对话 → `temperature=0.5` 或 `temperature=0.7`
- `temperature` 和 `top_p` **不要同时调**，选其中一个即可

## 多轮对话

维护一个 `messages` 列表，每次把历史消息一起传进去：

```python
messages = [
    {"role": "system", "content": "你是一个 Python 编程助手，回答问题要简洁。"},
]

while True:
    user_input = input("你: ")
    if user_input.lower() in ("quit", "exit", "q"):
        break

    # 追加用户消息
    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.5,
    )

    reply = response.choices[0].message.content
    print(f"AI: {reply}")

    # 追加 AI 回复，维护对话上下文
    messages.append({"role": "assistant", "content": reply})
```

## 切换到 DeepSeek

DeepSeek 完全兼容 OpenAI 格式，只需改 `base_url` 和 `api_key`：

```python
from openai import OpenAI

# DeepSeek 客户端
client = OpenAI(
    api_key=os.environ["DEEPSEEK_API_KEY"],
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "解释一下什么是递归"},
    ],
    temperature=0.7,
)

print(response.choices[0].message.content)
```

其他国产模型的切换方式同理，只需替换 `base_url`：

| 平台 | base_url |
|------|----------|
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 智谱 GLM | `https://open.bigmodel.cn/api/paas/v4` |
| Moonshot | `https://api.moonshot.cn/v1` |
| 硅基流动 | `https://api.siliconflow.cn/v1` |

## 错误处理

```python
from openai import OpenAIError, APIError, RateLimitError

try:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": "你好"}],
    )
except RateLimitError:
    print("请求太频繁，稍等再试")
except APIError as e:
    print(f"API 错误: {e.status_code} - {e.message}")
except OpenAIError as e:
    print(f"调用失败: {e}")
```

## 下一步

掌握基础调用后，你可以继续学习：

- [流式响应 (Streaming)](/dev/streaming) —— 实现打字机效果
- [Tool Calling](/dev/tool-calling) —— 让模型调用你的函数
- [结构化输出](/dev/structured-output) —— 强制模型返回 JSON
