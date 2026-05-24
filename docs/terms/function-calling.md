---
title: "Function Calling"
description: "让 LLM 输出结构化 JSON 来调用外部函数或 API，实现 AI 与外部系统的交互能力"
difficulty: intermediate
---

# Function Calling

<DifficultyBadge level="intermediate" />

## 一句话解释

Function Calling（函数调用）是一种让 LLM **输出结构化 JSON 参数来调用外部工具或 API** 的能力。它不是 LLM 真的执行了函数，而是模型根据用户意图决定"该调用哪个函数、传什么参数"，由你的程序负责实际执行并将结果返回给模型。

## 通俗类比

假设你让 AI 助手"查一下北京明天天气"。模型本身不知道天气，但它知道自己有个"查天气"的工具可用。于是它输出："好，我现在需要一个工具——查天气（城市=北京，日期=明天）"。你的程序收到这个指令后，真的去调天气 API 拿到数据（"北京明天 25°C，晴"），把结果塞回给模型。模型再给你一个自然的回答："北京明天晴天，气温 25°C，适合出行。" 整个过程中，模型扮演的是"翻译官+决策者"的角色，把自然语言请求翻译为 API 调用。

## 技术定义

Function Calling 的标准流程：

1. **定义函数列表**：开发者将可用的函数列表（函数名、描述、参数 schema）作为 Prompt 的一部分传给模型
2. **模型决策**：当用户输入匹配某个函数的用途时，模型返回一个包含函数名和 JSON 参数的响应，而不是普通的文本回答
3. **程序执行**：开发者的代码解析模型输出的 JSON，实际调用对应的函数/API
4. **结果回传**：将函数返回结果再次发给模型，模型基于结果生成最终的自然语言回答

目前主流 LLM（GPT-4、Claude、DeepSeek 等）都原生支持 Function Calling，且通常以 **OpenAI 兼容格式** 提供接口。参数 Schema 一般使用 JSON Schema 定义。

与 [Agent](/terms/agent) 的关系：Function Calling 是 Agent 的**原子能力**——Agent 通过多次 Function Calling 的循环（观察→决策→调用→观察→…）来实现复杂任务的自主完成。

## 关联术语

- [Agent](/terms/agent) —— Agent 依赖 Function Calling 与外部世界交互
- [Prompt](/terms/prompt) —— Function Calling 的本质是让 Prompt 包含工具定义并引导模型输出结构化 JSON
- [大语言模型 (LLM)](/terms/llm) —— 支持 Function Calling 是现代 LLM 的标配能力

## 快速记忆

让 LLM 学会用工具。你定义工具（查天气/发邮件），模型决定什么时候用。好比给 AI 配了一把瑞士军刀，它自己决定用哪一把。

## 延伸阅读

- OpenAI Function Calling 文档：[Function calling guide](https://platform.openai.com/docs/guides/function-calling)
- Anthropic Tool Use 文档：[Tool use with Claude](https://docs.anthropic.com/en/docs/build-with-claude/tool-use)
- [Tool Calling 实战](/dev/tool-calling) — API 调用完整示例
