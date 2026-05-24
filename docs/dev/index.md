---
title: AI 开发
description: 面向程序员的 AI 编程实战——API 调用、Agent 开发、工程实践
---

# 🔧 AI 开发

面向**程序员**的内容模块。不再是"学概念"或"用工具"，而是**真正用代码驱动 AI**。

<DifficultyBadge level="beginner" /> 有基础编程能力即可 · <DifficultyBadge level="intermediate" /> 需了解 API 基础

---

## API 编程

把 AI 集成到你的代码里——从最基础的 API 调用到高级的 Tool Calling 和结构化输出。

<div class="card-grid">
  <a href="./openai-api" class="card">
    <h3>OpenAI API 入门</h3>
    <p>Chat Completion API 基础调用、参数详解、多轮对话</p>
  </a>
  <a href="./streaming" class="card">
    <h3>流式响应 (Streaming)</h3>
    <p>SSE 流式输出实现打字机效果，Python/JS 两种语言</p>
  </a>
  <a href="./tool-calling" class="card">
    <h3>Tool Calling</h3>
    <p>让模型调用外部函数，完整流程：定义→调用→执行→返回</p>
  </a>
  <a href="./structured-output" class="card">
    <h3>结构化输出 (JSON Mode)</h3>
    <p>强制模型输出 JSON，Response Format、枚举约束、Schema 校验</p>
  </a>
  <a href="./multimodal-vision" class="card">
    <h3>多模态编程 (Vision API)</h3>
    <p>图片理解、截图转代码、OCR 提取，让模型看懂图像</p>
  </a>
  <a href="./reasoning-models" class="card">
    <h3>推理模型使用</h3>
    <p>o1/DeepSeek-R1 的使用时机、API 调用、Prompt 技巧</p>
  </a>
</div>

---

## Agent 开发

2025-2026 最热的 AI 方向——让模型不仅能"说"，还能"做"。

<div class="card-grid">
  <a href="./agent-intro" class="card">
    <h3>Agent 核心概念</h3>
    <p>感知→规划→执行→观察→反思，理解 Agent 的运作循环</p>
  </a>
  <a href="./build-agent" class="card">
    <h3>构建第一个 Agent</h3>
    <p>手写一个能查天气、搜网页的 Agent，附完整代码</p>
  </a>
  <a href="./tool-definition" class="card">
    <h3>Tool 定义与实现</h3>
    <p>写 Schema、实现函数、错误处理、组合多个 Tool</p>
  </a>
</div>

---

## 工程实践

从 Demo 到生产——缓存、错误处理、成本控制与模型质量保障。

<div class="card-grid">
  <a href="./app-architecture" class="card">
    <h3>AI 应用架构</h3>
    <p>缓存策略、熔断重试、Token 成本追踪、AIClient 包装类实战</p>
  </a>
  <a href="./model-evaluation" class="card">
    <h3>模型评估与测试</h3>
    <p>LLM-as-Judge、pytest 自动化评估管道、持续回归测试</p>
  </a>
  <a href="./ai-security" class="card">
    <h3>AI 安全</h3>
    <p>Prompt 注入防御、数据脱敏、输出校验、SecureAgent 实现</p>
  </a>
  <a href="./local-models" class="card">
    <h3>本地模型部署</h3>
    <p>Ollama 入门、模型选择、本地 API 调用、llama.cpp 进阶</p>
  </a>
  <a href="./mcp-practice" class="card">
    <h3>MCP 协议实践</h3>
    <p>构建 MCP Server，让 Agent 通过标准协议连接你的工具</p>
  </a>
  <a href="./mcp-ecosystem" class="card">
    <h3>MCP 生态一览</h3>
    <p>19,000+ Server 全景——数据库/搜索/云平台/AI Skills 分类速查</p>
  </a>
  <a href="./rag-deep" class="card">
    <h3>RAG 深度实践</h3>
    <p>分块策略、Embedding 选型、Re-ranking，从能用到好用</p>
  </a>
  <a href="./observability" class="card">
    <h3>LLM 可观测性</h3>
    <p>Trace、Token 监控、质量评估——生产级 LLM 应用的监控方案</p>
  </a>
</div>

---

## 面试准备

冲刺 AI 岗位面试，覆盖概念、原理、工程实践到开放问题。

<div class="card-grid">
  <a href="./interview-questions" class="card">
    <h3>AI 面试题汇总</h3>
    <p>LLM 基础、Prompt 工程、RAG、Agent、安全、20 道高频题</p>
  </a>
</div>

---

## 前置知识

建议先掌握这些再进入本模块：

- Python 基础（推荐）或 JavaScript/TypeScript
- 了解 [Function Calling](/terms/function-calling) 和 [Agent](/terms/agent) 的基本概念
- 有 API 调用经验（REST、JSON）
