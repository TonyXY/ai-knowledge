---
title: 构建 AI 聊天机器人
description: Next.js + Vercel AI SDK——从项目初始化到流式响应的全栈聊天机器人
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# 构建 AI 聊天机器人

本篇从零构建一个基于 Next.js + Vercel AI SDK 的 AI 聊天机器人，支持流式响应和对话历史。

## 什么是 Vercel AI SDK？

[Vercel AI SDK](https://sdk.vercel.ai) 是 Vercel 推出的 AI 开发工具包，帮你轻松接入各种 LLM 并处理流式响应。核心特点：

- 统一 API（支持 OpenAI、Anthropic、Google 等）
- 开箱即用的流式响应（Streaming）
- React Hooks（`useChat`、`useCompletion`）
- 支持服务端渲染和边缘函数

## 准备工作

- Node.js 18+
- OpenAI API Key
- 基本的 React 和 Next.js 知识

---

## 第 1 步：项目初始化

```bash
# 创建 Next.js 项目
npx create-next-app@latest ai-chatbot --typescript --tailwind --app

# 进入项目目录
cd ai-chatbot

# 安装 AI SDK
npm install ai @ai-sdk/openai

# 创建环境变量文件
echo "OPENAI_API_KEY=your-api-key" > .env.local
```

---

## 第 2 步：创建 API Route

在 Next.js App Router 中创建 API 端点，处理 AI 请求。

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// 允许流式响应的时长（最长 30 秒）
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: '你是一个有帮助的 AI 助手。请用中文回答。回答要简洁明了。',
    messages,
  });

  return result.toDataStreamResponse();
}
```

### 关键点

- `streamText` 返回流式响应，用户能看到逐字生成的回答
- `system` 参数设定 AI 的角色和行为
- `messages` 包含完整的对话历史

---

## 第 3 步：创建前端聊天界面

AI SDK 提供了 `useChat` Hook，只需要几行代码就能搭建聊天界面。

```tsx
// app/page.tsx
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* 聊天消息区域 */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 输入区域 */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="输入你的问题..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-500 px-6 py-3 text-sm font-medium text-white hover:bg-blue-600 transition-colors"
        >
          发送
        </button>
      </form>
    </div>
  );
}
```

启动项目查看效果：

```bash
npm run dev
```

打开 `http://localhost:3000`，你就能看到一个能聊天的 AI 机器人了！

---

## 第 4 步：增强功能

### 4.1 流式响应加载效果

AI SDK 默认支持流式响应——AI 的回答会逐字显示。你可以加一个打字中的指示器：

```tsx
// 在消息列表最后添加加载指示器
{messages.length > 0 && 
  messages[messages.length - 1].role === 'user' && 
  !messages[messages.length - 1].content && (
  <div className="flex justify-start">
    <div className="bg-gray-100 rounded-2xl px-4 py-3">
      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.1s]" />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
      </div>
    </div>
  </div>
)}
```

### 4.2 错误处理

```tsx
const { messages, input, handleInputChange, handleSubmit, error, reload } = useChat();

// 显示错误信息
{error && (
  <div className="flex justify-center my-4">
    <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
      出错了：{error.message}
      <button onClick={reload} className="ml-2 underline">重试</button>
    </div>
  </div>
)}
```

### 4.3 停止生成

```tsx
const { messages, input, handleInputChange, handleSubmit, isLoading, stop } = useChat();

// 发送按钮变成停止按钮
<button
  type={isLoading ? 'button' : 'submit'}
  onClick={isLoading ? stop : undefined}
  className={`rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors ${
    isLoading
      ? 'bg-red-500 hover:bg-red-600'
      : 'bg-blue-500 hover:bg-blue-600'
  }`}
>
  {isLoading ? '停止' : '发送'}
</button>
```

### 4.4 清空对话

```tsx
const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat();

<button
  onClick={() => setMessages([])}
  className="text-sm text-gray-500 hover:text-gray-700"
>
  清空对话
</button>
```

---

## 完整代码

```tsx
// app/page.tsx —— 完整版聊天机器人
'use client';

import { useChat } from 'ai/react';
import { useRef, useEffect } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, error, reload, setMessages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      {/* 头部 */}
      <div className="flex items-center justify-between py-4 border-b mb-4">
        <h1 className="text-lg font-semibold">AI 聊天助手</h1>
        <button
          onClick={() => setMessages([])}
          className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-100"
        >
          清空对话
        </button>
      </div>

      {/* 消息列表 */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            <p className="text-2xl mb-2">👋</p>
            <p>开始和 AI 对话吧</p>
          </div>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 错误提示 */}
      {error && (
        <div className="flex justify-center mb-4">
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
            <span>出错了：{error.message}</span>
            <button onClick={() => reload()} className="underline">重试</button>
          </div>
        </div>
      )}

      {/* 输入框 */}
      <form onSubmit={handleSubmit} className="flex gap-2 pb-4">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="输入你的问题..."
          disabled={isLoading}
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <button
          type={isLoading ? 'button' : 'submit'}
          onClick={isLoading ? stop : undefined}
          className={`rounded-xl px-6 py-3 text-sm font-medium text-white transition-colors ${
            isLoading
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? '停止' : '发送'}
        </button>
      </form>
    </div>
  );
}
```

---

## 部署上线

### Vercel（推荐，免费）

```bash
npm i -g vercel
vercel
```

部署后设置环境变量 `OPENAI_API_KEY`，你的聊天机器人就上线了！

### 其他平台

也可以部署到 Netlify、Railway 等支持 Next.js 的平台。

---

## 总结

| 步骤 | 做什么 | 关键代码 |
|------|--------|----------|
| 1 | 项目初始化 | `create-next-app` + 安装 AI SDK |
| 2 | API Route | `streamText()` 处理流式响应 |
| 3 | 前端界面 | `useChat()` Hook |
| 4 | 增强功能 | 错误处理、停止生成、清空对话 |

30 行核心代码就能搭起 AI 聊天机器人，Vercel AI SDK 功不可没。

## 关联阅读

- [Function Calling](/terms/function-calling) —— 让聊天机器人调用外部工具
- [Agent](/terms/agent) —— 比聊天机器人更强大的 AI 智能体
- [搭建 RAG 知识库](/practices/rag-knowledge-base) —— 让聊天机器人回答私有文档
