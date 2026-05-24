---
title: "流式响应 (Streaming)"
description: "实现打字机效果——SSE 原理、Python 和 JavaScript 流式调用、中断恢复与超时处理"
difficulty: intermediate
---

# 流式响应 (Streaming)

<DifficultyBadge level="intermediate" />

标准 API 调用是**一次性返回**全部结果。如果你问模型"写一篇 1000 字的文章"，用户可能要等 10-20 秒才能看到任何内容。流式响应解决了这个问题——**模型边生成，程序边输出**，实现"打字机效果"。

## 为什么需要流式

- **用户体验**：0.5 秒内看到第一个字，不用盯着白屏等待
- **首字延迟（TTFT）**：从发送请求到收到第一个 token 的时间，流式可以降到几百毫秒
- **长文本场景**：报告生成、代码补全、文章续写，流式是刚需

## SSE（Server-Sent Events）原理

LLM API 的流式响应基于 SSE 协议。客户端发起一个 HTTP 请求后，**连接保持打开**，服务端不断推送数据块：

```
HTTP Response
Content-Type: text/event-stream

data: {"choices":[{"delta":{"content":"你好"}}]}

data: {"choices":[{"delta":{"content":"，我"}}]}

data: {"choices":[{"delta":{"content":"是"}}]}

...

data: [DONE]
```

每个 `data:` 行是一个独立的 JSON 块，`[DONE]` 表示流结束。

## Python 实现

```python
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "你是一个有帮助的助手。"},
        {"role": "user", "content": "用 300 字介绍量子计算"},
    ],
    stream=True,  # 关键参数
)

# 逐块读取
for chunk in stream:
    # delta.content 是当前块的文本增量（可能为 None）
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)

print()  # 换行
```

### 获取完整响应（收集所有块）

有时候你需要完整文本用于后续处理：

```python
full_response = ""

stream = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "写一首五言绝句"}],
    stream=True,
)

for chunk in stream:
    content = chunk.choices[0].delta.content
    if content:
        full_response += content
        print(content, end="", flush=True)

print(f"\n\n完整响应共 {len(full_response)} 字符")
```

## JavaScript / TypeScript 实现

```typescript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function streamChat() {
  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "user", content: "解释什么是闭包" },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      process.stdout.write(content);  // 实时输出
    }
  }
}

streamChat();
```

### 浏览器端实现（Fetch API + ReadableStream）

```javascript
async function streamInBrowser() {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "写一个网页标题" }],
      stream: true,
    }),
  });

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";  // 最后一个不完整行留在 buffer

    for (const line of lines) {
      if (line.startsWith("data: ") && line !== "data: [DONE]") {
        const json = JSON.parse(line.slice(6));
        const content = json.choices?.[0]?.delta?.content;
        if (content) {
          document.getElementById("output").textContent += content;
        }
      }
    }
  }
}
```

## 常见问题与处理

### 中断流

用户点"停止生成"时，需要关闭连接：

```python
# Python：用 break 跳出循环即可
for chunk in stream:
    if stop_flag.is_set():
        stream.close()  # 释放连接
        break
    # 处理 chunk...
```

```typescript
// JS：使用 AbortController
const controller = new AbortController();
const response = await fetch(url, {
  signal: controller.signal,
  // ...
});

// 用户点击停止
controller.abort();
```

### 超时处理

```python
from openai import OpenAI
import httpx

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"],
    timeout=httpx.Timeout(60.0, connect=10.0),  # 总超时 60s, 连接超时 10s
)
```

### 断流重连

长文本生成时连接可能中断，建议加上重试逻辑：

```python
import time

def stream_with_retry(client, messages, max_retries=3):
    for attempt in range(max_retries):
        try:
            stream = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                stream=True,
            )
            for chunk in stream:
                yield chunk
            return  # 成功完成
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"连接中断，第 {attempt + 1} 次重试...")
                time.sleep(2 ** attempt)  # 指数退避
            else:
                raise e
```

## 与服务端框架集成

### FastAPI 示例

```python
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from openai import OpenAI

app = FastAPI()
client = OpenAI()

@app.post("/chat/stream")
async def chat_stream():
    def generate():
        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": "你好"}],
            stream=True,
        )
        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield f"data: {chunk.choices[0].delta.content}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
```

## 下一步

- [Tool Calling](/dev/tool-calling) —— 让模型在流式输出中调用函数
- [结构化输出](/dev/structured-output) —— 流式 + JSON Mode 的权衡
