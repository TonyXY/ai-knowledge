---
title: Agent 核心概念
description: 理解 AI Agent 的本质——LLM + Tool + 循环，掌握 ReAct 模式与主流框架对比
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# Agent 核心概念

2025-2026 年最重要的 AI 范式——让大模型从"会说话的鹦鹉"变成"能办事的助手"。本篇带你理解 Agent 是什么、怎么运作、和普通 Chat 有什么区别。

## 什么是 AI Agent？

一句话定义：

```text
Agent = LLM + Tools + 循环 = 一个有手有脑、能自主完成任务的 AI
```

拆开来看：

| 组件 | 角色 | 类比 |
|------|------|------|
| **LLM** | 大脑 | 思考、推理、决策 |
| **Tools** | 手 | 执行具体操作（搜索、计算、调用 API） |
| **循环** | 行动模式 | "观察→思考→行动→再观察"，直到任务完成 |

一个简单的应用场景：用户说"帮我查一下今天杭州的天气，然后发邮件告诉张三"。普通 Chat 只能回复"对不起，我无法获取实时信息"。Agent 则会**自主调用天气 API → 获取结果 → 调用邮件 API → 完成任务**。

## Agent 核心循环：ReAct 模式

ReAct（Reasoning + Acting）是当前最主流的 Agent 循环模式，由 Google 在 2022 年提出。它把 Agent 的每一步拆成三个动作：

```text
┌─────────────────────────────────────────────────────┐
│                                                     │
│  1. Thought ──→ 2. Action ──→ 3. Observation       │
│      ↑                                  │           │
│      └──────── 回到第 1 步 ─────────────┘           │
│                                                     │
│  当 Thought = "任务已解决" → 输出最终答案 (Answer)   │
└─────────────────────────────────────────────────────┘
```

### 四个步骤详解

**Step 1 — Thought（思考）**

LLM 分析当前状态，决定下一步要做什么。这一步是 Agent 区别于"死板脚本"的核心——它需要根据已获取的信息**动态调整计划**。

**Step 2 — Action（行动）**

调用具体的工具。比如：

- `search(query="杭州天气")` —— 搜索信息
- `calculate(expression="23*47")` —— 执行计算
- `send_email(to="zhangsan@example.com", body="...")` —— 发送邮件
- `Answer("最终结果")` —— 任务完成，返回最终答案

**Step 3 — Observation（观察）**

获取工具返回的结果，把它作为"新的信息"加入上下文。

**Step 4 → 循环**

带着新的观察回到 Step 1，继续思考下一步，直到 LLM 判断任务已经完成。

### 为什么这个循环很重要？

因为它给了 LLM **"自主纠错"的能力**。如果第一次搜索没找到结果，Agent 可以换关键词再搜；如果计算器返回了奇怪的结果，它可以重新验证。这和人类做事的方式一模一样。

## Agent vs 普通 Chat

很多人把 ChatGPT 当成 Agent，其实不是。来看对比：

| 维度 | 普通 Chat | Agent |
|------|-----------|-------|
| **能力边界** | 只能"说"，不能"做" | 能调用工具、执行操作 |
| **信息来源** | 仅靠训练数据 | 可实时搜索、访问数据库 |
| **任务复杂度** | 单轮问答 | 多步骤自主完成 |
| **决策能力** | 被动响应 | 自主规划、动态调整 |
| **错误处理** | 答错了就错了 | 可以重试、换方法 |

一个直观类比：

- 普通 Chat = 一位知识渊博但被困在房间里的顾问——只能凭记忆回答
- Agent = 这位顾问拿到了手机和电脑——能查资料、发邮件、操作软件

## Agent 的关键组成部分

### 1. LLM（大脑）

负责理解任务、推理、规划步骤。你需要一个**支持 Tool Calling（Function Calling）的模型**。目前主流选择：

- **闭源**：GPT-4o、Claude 3.5 Sonnet、Gemini 2.0
- **开源**：DeepSeek-V3、Qwen、Llama 3

### 2. Tools（手）

Agent 能执行的"外部动作"。每个 Tool 包含三要素：

- **名称**（如 `search_web`）
- **描述**（告诉 LLM 什么时候该用这个工具）
- **参数 schema**（定义输入格式）

具体实现见 [Tool 定义与实现](/dev/tool-definition)。

### 3. Memory（记忆）

Agent 需要"记住"事情。分为两种：

- **短期记忆**：对话历史（放在 context 里，随 token 上限自动裁剪）
- **长期记忆**：持久化存储（存到数据库，下次会话仍可访问）

### 4. Planning（规划）

面对复杂任务，Agent 需要**分解目标**。例如：

```text
用户："帮我做一份竞品分析报告"
Agent 内部规划：
  1. 搜索目标公司的基本信息
  2. 收集竞品的产品功能列表
  3. 对比市场份额数据
  4. 整理成结构化报告
  5. 输出最终结果
```

这通常是高级 Agent（如 AutoGPT、CrewAI）的核心能力。

## 主流框架对比

写 Agent 不一定需要框架，但框架能帮你少写很多样板代码。

| 框架 | 复杂度 | 适用场景 | 特点 |
|------|--------|----------|------|
| **手写** | 最低 | 简单 Agent、学习原理 | 零依赖，完全可控，但重复代码多 |
| **LangChain** | 中 | 通用 Agent 开发 | 生态完善，工具链丰富，学习曲线陡 |
| **CrewAI** | 中 | 多 Agent 协作 | 角色分工清晰，适合复杂工作流 |
| **AutoGen** | 高 | 高级多 Agent 对话 | 灵活但复杂，适合研究性项目 |
| **Vercel AI SDK** | 低 | Web 应用 | 前端友好，流式响应开箱即用 |

建议学习路径：

1. **手写一个 Agent**（理解原理）→ 见 [构建第一个 Agent](/dev/build-agent)
2. **用框架快速开发**（提高效率）→ 选 LangChain 或 Vercel AI SDK

## 代码示例：Agent 循环伪代码

```python
def agent_loop(user_query: str, system_prompt: str, tools: list[dict]) -> str:
    """
    Agent 核心循环——ReAct 模式的实现。
    这不是真实可运行的代码，而是帮你理解 Agent 的运行逻辑。
    """
    # 初始化消息列表，包含系统提示词和用户问题
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query},
    ]

    max_steps = 10  # 安全阀，防止无限循环

    for step in range(max_steps):
        # Step 1: Thought + Action —— LLM 思考并决定下一步
        response = llm_chat(messages, tools=tools)
        message = response.choices[0].message

        # 如果是普通文本，就是最终答案
        if message.content and not message.tool_calls:
            return message.content  # ✅ 任务完成

        # 如果 LLM 决定调用工具
        if message.tool_calls:
            for tool_call in message.tool_calls:
                tool_name = tool_call.function.name
                tool_args = json.loads(tool_call.function.arguments)

                # Step 2: Action —— 真正执行工具
                try:
                    result = execute_tool(tool_name, tool_args)
                except Exception as e:
                    result = f"工具调用失败: {e}"

                # Step 3: Observation —— 把结果反馈给 LLM
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": str(result),
                })

            # Step 4 → 回到 Step 1，LLM 看到 Observation 后再次思考

    return "达到最大步数限制，任务未完成"  # ❌ 兜底处理
```

这个循环的优雅之处在于：**LLM 自己决定什么时候停**。当它觉得信息够了，就会输出 `content`（而不是 `tool_calls`），循环自然结束。

## 总结

| 概念 | 一句话 |
|------|--------|
| Agent 公式 | LLM + Tools + 循环 |
| ReAct 循环 | Thought → Action → Observation → 回到 Thought |
| vs 普通 Chat | Agent 能"做"，Chat 只能"说" |
| 四大组件 | LLM（脑）、Tools（手）、Memory（记）、Planning（规划） |
| 框架 | 手写学原理 → LangChain 提效 |

## 关联阅读

- [构建第一个 Agent](/dev/build-agent) —— 手写一个能查天气、做计算的 Agent
- [Tool 定义与实现](/dev/tool-definition) —— 写好 Tool Schema 和错误处理
- [Function Calling](/terms/function-calling) —— 理解模型的 Tool Calling 机制
