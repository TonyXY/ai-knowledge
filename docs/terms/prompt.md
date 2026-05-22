---
title: Prompt
description: 用户给 AI 的输入指令，是决定输出质量的最关键因素
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# Prompt

Prompt 是你与 AI 对话的**"遥控器"**。你给它什么指令，它就往什么方向走。同一个模型，好的 Prompt 和差的 Prompt 产出的结果天差地别。

## 一句话解释

Prompt（提示词）是用户输入给 LLM 的文字指令，模型根据它来生成回应。Prompt 的质量直接决定输出的质量。包括角色设定、任务描述、输出格式等要素。

## 通俗类比

想象你面前有一个**极度聪明但缺乏常识的新同事**：

- 你说"写个报告"→ 他会不知所措，产出质量随机
- 你说"你是一个数据分析师，请根据以下销售数据，用 3 个段落总结关键趋势，每段不超过 100 字"→ 他立刻明白该做什么、以什么身份做、产出什么格式

好的 Prompt 就像**给新同事一份清晰的工作说明书**——告诉他角色、任务、约束和期望产出。

## 技术定义

Prompt 通常分为两层：

**System Prompt（系统提示词）**
：设定模型的角色、行为边界和输出风格，在整个对话中持续生效。例如："你是一个专业的中文翻译助手，只做中英互译，不回答其他问题。"

**User Prompt（用户提示词）**
：每次对话中你输入的具体问题或任务。模型将 System Prompt + 历史对话 + 当前 User Prompt 一起送入上下文窗口，然后逐 Token 预测输出。

进阶的 Prompt 技巧包括思维链（Chain of Thought）、少样本提示（Few-shot）和结构化输出要求等。

## 关联术语

- [上下文窗口](/terms/context-window) —— Prompt 消耗上下文容量
- [Token](/terms/token) —— Prompt 被切分成 Token 后送入模型
- [微调 (Fine-tuning)](/terms/fine-tuning) —— 另一种定制模型行为的方式

## 延伸阅读

- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering)
- [Anthropic Prompt 设计指南](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering)
