---
title: 学习路线图
description: 循序渐进学习 AI 的完整路径
---

# 🧭 AI 学习路线图

按 **周** 为单位规划，每周聚焦一个主题。你可以按自己的节奏调整，建议顺序如下：

---

## 第 0 周：了解历史 — AI 发展历程

在开始学习具体知识之前，先花 5 分钟了解 AI 如何走到今天——这能帮你理解**为什么这些概念重要**。

| 时间 | 里程碑 | 意义 |
|------|--------|------|
| **1956** | Dartmouth 夏季研讨会 | AI 作为学科正式诞生 |
| **1997** | 深蓝 (DeepBlue) 击败卡斯帕罗夫 | AI 首次在智力博弈中战胜人类世界冠军 |
| **2012** | AlexNet 赢得 ImageNet 竞赛 | 深度学习时代开启，计算机视觉迎来质变 |
| **2017** | Google 发表《Attention Is All You Need》 | Transformer 架构诞生，为所有大模型奠定基础 |
| **2022** | OpenAI 发布 ChatGPT | AI 进入大众视野，月活 2 个月破亿 |
| **2024** | GPT-4o / Claude 3 / 多模态爆发 | AI 从纯文本走向多模态，能力全面跃升 |
| **2025** | DeepSeek / Agent 框架成熟 | 开源模型逼近闭源、AI 自主执行任务成为现实 |

::: tip 为什么要先了解历史？
每一个术语背后都有一段故事。知道了 Transformer 为什么在 2017 年取代 RNN，你就能真正理解它"解决了什么问题"，而不仅仅是背一个定义。
:::

→ [📜 查看完整 AI 发展历程](/terms/history)

---

## 第 1 周：打好基础 — AI 术语

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | AI / ML / DL 是什么 | 🟢 |
| Day 2 | 大语言模型 (LLM) 与 Token | 🟢 |
| Day 3 | Prompt / 上下文窗口 / 多模态 | 🟢 |
| Day 4 | 参数 / 训练 / 推理 / 微调 | 🟢 |
| Day 5 | Transformer 与自注意力 | 🟡 |
| Day 6 | RAG / Embedding / 向量数据库 | 🟡 |
| Day 7 | 复习 + 小测验 | — |

::: tip 目标
学完能听懂 AI 领域的日常对话，知道这些概念大致在说什么。
:::

## 第 2 周：学会对话 — 提示词

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | 什么是 Prompt + 清晰指令五原则 | 🟢 |
| Day 2 | 角色设定 / Few-Shot / Zero-Shot | 🟢 |
| Day 3 | 思维链 (Chain-of-Thought) | 🟡 |
| Day 4 | System Prompt 设计 | 🟡 |
| Day 5 | 结构化提示词 | 🟡 |
| Day 6 | 场景模板实战（写作/编程/分析） | 🟡 |
| Day 7 | 综合练习：优化一个 Prompt 链 | 🔴 |

::: tip 目标
学会写出高质量的提示词，能稳定地从 AI 获得好结果。
:::

## 第 3 周：了解武器 — AI 工具

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | ChatGPT vs Claude vs DeepSeek | 🟢 |
| Day 2 | Kimi / Gemini / 其他对话助手 | 🟢 |
| Day 3 | Cursor / Windsurf / Copilot | 🟡 |
| Day 4 | OpenCode / Cline / Aider | 🟡 |
| Day 5 | Midjourney / DALL·E / Stable Diffusion | 🟢 |
| Day 6 | 工具组合与工作流 | 🟡 |
| Day 7 | 选型总结：什么场景用什么工具 | 🔴 |

::: tip 目标
了解各个工具的能力边界，能根据场景快速选择合适工具。
:::

## 第 4 周：动手实践 — 实操

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | 用 ChatGPT 辅助编程 | 🟢 |
| Day 2 | 用 Cursor 10 分钟搭建网页 | 🟢 |
| Day 3 | 用 Claude 分析文档 | 🟢 |
| Day 4 | 搭建 RAG 知识库 | 🟡 |
| Day 5 | 用 Vercel AI SDK 构建聊天机器人 | 🟡 |
| Day 6 | Prompt 批量生成工作流 | 🟡 |
| Day 7 | 综合挑战：用 AI 完成一个完整需求 | 🔴 |

::: tip 目标
能独立用 AI 工具完成实际工作，把知识转化为生产力。
:::

## 第 5 周：进阶开发 — AI 编程

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | OpenAI API 入门 | 🟢 |
| Day 2 | 流式响应 (Streaming) | 🟡 |
| Day 3 | Tool Calling | 🟡 |
| Day 4 | 结构化输出 (JSON Mode) | 🟡 |
| Day 5 | Agent 核心概念 | 🟡 |
| Day 6 | 构建第一个 Agent | 🔴 |
| Day 7 | 综合项目：用 AI 构建一个实用工具 | 🔴 |

::: tip 目标
能通过 API 调用 AI 模型，构建简单的 Agent 应用，把 AI 集成到自己的项目里。
:::

## 第 6 周：工程化落地 — 架构·安全·部署

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | AI 应用架构：缓存策略 | 🟡 |
| Day 2 | AI 应用架构：错误处理与成本控制 | 🟡 |
| Day 3 | 模型评估与自动化测试 | 🟡 |
| Day 4 | AI 安全：Prompt 注入防御 | 🟡 |
| Day 5 | 本地模型部署：Ollama 入门 | 🟢 |
| Day 6 | 综合项目：带缓存的本地 AI 助手 | 🔴 |
| Day 7 | 整体回顾与知识体系梳理 | — |

::: tip 目标
能设计可靠的 AI 应用架构，理解安全风险，会部署本地模型，具备把 AI 项目落地的工程能力。
:::

## 第 7 周：深入拓展 — 多模态·MCP·RAG

| 天数 | 学习内容 | 难度 |
|------|---------|------|
| Day 1 | 多模态编程：Vision API 实战 | 🟡 |
| Day 2 | 推理模型：o1 / DeepSeek-R1 使用 | 🟡 |
| Day 3 | MCP 协议：构建自己的 MCP Server | 🔴 |
| Day 4 | RAG 深度：分块与 Embedding 选型 | 🔴 |
| Day 5 | RAG 深度：Re-ranking 精排 | 🔴 |
| Day 6 | 综合项目：带 MCP 的多模态 Agent | 🔴 |
| Day 7 | 自由探索 + 查看学习报告 | — |

::: tip 目标
掌握多模态编程和推理模型的使用，能构建 MCP Server 扩展 Agent 能力，让 RAG 从能用变好用。
:::

---

| 模式 | 适合谁 | 怎么做 |
|------|--------|--------|
| 🧭 **跟着路线走** | 零基础 / 系统性学习者 | 按周推进，完成前一周再进下一周 |
| 🔍 **自由探索** | 有基础 / 目标明确者 | 直接跳到感兴趣的模块，按需学习 |
| ⚡ **快速查漏** | 有一定经验者 | 搜索关键词，只看自己不熟悉的部分 |

难度标识：<DifficultyBadge level="beginner" /> 无前置要求 · <DifficultyBadge level="intermediate" /> 需入门基础 · <DifficultyBadge level="advanced" /> 需实践经验

<div style="margin-top: 32px; display: flex; gap: 12px; flex-wrap: wrap;">
  <a href="../terms/" class="btn">开始第 1 周 → 📖 术语</a>
  <a href="../prompts/" class="btn btn-alt">跳转到第 2 周 → 💬 提示词</a>
</div>

<style>
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  background: var(--vp-c-brand-1);
  color: #fff;
  transition: all 0.2s;
}
.btn:hover {
  opacity: 0.9;
  text-decoration: none;
}
.btn-alt {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}
.btn-alt:hover {
  border-color: var(--vp-c-brand-1);
}
</style>
