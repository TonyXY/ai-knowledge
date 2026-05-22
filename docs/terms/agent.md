---
title: "Agent"
description: "能自主理解目标、分解任务、选择工具、执行并反思的 AI 智能体——LLM + 工具调用 + 规划循环"
difficulty: intermediate
---

# Agent

<DifficultyBadge level="intermediate" />

## 一句话解释

Agent（智能体）是一种能够**自主理解目标、规划步骤、调用工具、执行任务并根据结果进行反思调整**的 AI 系统。它的核心公式是 **Agent = LLM + 工具调用 + 规划 + 记忆**，它让 LLM 从"被动回答"升级为"主动做事"。

## 通俗类比

LLM 像一个知识渊博的图书管理员——你问什么它答什么，但不会主动站起来去找书。Agent 则像一个能干的私人助理——你只需要说"帮我订下周五去上海的机票，要靠过道的座位，再给酒店发邮件确认入住"，它会自己拆解成"查航班→比较价格→订票→选座→写邮件→发送"等一系列步骤，每一步调用合适的工具（订票 API、邮件客户端），中间遇到问题（比如过道座没了）还会自己调整方案（改靠窗？换航班？），最后向你汇报结果。

## 技术定义

Agent 系统的经典架构包含四个核心组件：

1. **大语言模型（LLM）**：作为 Agent 的"大脑"，负责任务理解、推理和决策
2. **规划（Planning）**：将复杂目标分解为可执行的子任务序列。常用技术包括 ReAct（Reasoning + Acting）、Plan-and-Solve、Tree of Thoughts 等
3. **工具（Tools）**：Agent 可以调用的外部能力，通过 [Function Calling](/terms/function-calling) 实现。常见工具有搜索 API、代码执行器、数据库查询、文件操作等
4. **记忆（Memory）**：存储中间结果和历史经验。分为短期记忆（当前会话上下文）和长期记忆（持久化的知识库/经验）

Agent 的执行模式通常遵循 **观察-思考-行动（Observe-Think-Act）循环**：

```
用户目标 → Agent 分析 → 制定步骤 → 调用工具 → 观察结果 → 反思调整 → 继续执行 → 完成任务
```

常见的 Agent 框架包括 LangChain Agent、AutoGPT、CrewAI、MetaGPT 等。多 Agent 协作（Multi-Agent）也是当前研究热点，让多个专业 Agent 像团队一样协作完成复杂任务。

## 关联术语

- [Function Calling](/terms/function-calling) —— Agent 调用外部工具的原子能力
- [思维链 (CoT)](/terms/cot) —— Agent 进行任务规划和推理的关键技术
- [大语言模型 (LLM)](/terms/llm) —— Agent 的核心决策引擎
- [RAG](/terms/rag) —— Agent 获取外部知识进行决策的重要途径

## 延伸阅读

- Lilian Weng 的经典博客：[LLM Powered Autonomous Agents](https://lilianweng.github.io/posts/2023-06-23-agent/)
- ReAct 论文：[ReAct: Synergizing Reasoning and Acting in Language Models](https://arxiv.org/abs/2210.03629)
- 实践建议：从单 Agent + 2~3 个工具的简单场景开始，逐步引入多步骤规划、记忆系统和多 Agent 协作。
