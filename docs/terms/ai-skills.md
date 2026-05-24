---
title: AI Skills（技能）
description: AI Agent 的可复用模块化能力，让 LLM 具备特定领域的专业技能
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# AI Skills（技能）

## 一句话解释

**AI Skills** 是赋予 AI Agent 的**模块化可复用能力**——就像给一个全能助手装上"专业技能包"，让它不需要从零摸索就能完成特定领域的任务。

## 通俗类比

假设你请了一个万能助理（LLM），他什么都会一点但什么都不精。**Skills** 就是给他装的"专业模块"：

- 装一个「Excel 处理 Skill」→ 他立刻能处理复杂表格
- 装一个「代码审查 Skill」→ 他立刻能按团队规范审查代码
- 装一个「数据分析 Skill」→ 他立刻能输出专业分析报告

每个 Skill 就像手机上的 App——即装即用，按需组合。

## 技术定义

AI Skills 是一组**预设的指令、工具、知识库和约束条件的集合**，通常包含：

```
Skill = System Prompt（角色定义）
      + Tools（可用工具/API）
      + Knowledge（知识库/RAG 上下文）
      + Constraints（输出约束/规则）
```

当一个 Agent 被赋予某个 Skill 时，它会自动加载对应的系统提示词、工具集和行为规范，从而在特定任务上表现出专业水准。

### 与 Function Calling 的区别

| | Function Calling | AI Skills |
|--|----------------|-----------|
| 粒度 | 单个函数调用 | 一整套能力 |
| 范围 | 执行具体操作 | 定义角色+工具+行为 |
| 组合 | 独立 | 可叠加组合 |
| 复用 | 需重复声明 | 一次定义随处使用 |

## 常见应用场景

- **编程助手 Skill**：携带代码规范、项目上下文、调试工具链
- **写作 Skill**：预设风格指南、术语库、审核规则
- **数据分析 Skill**：绑定 SQL 查询、可视化工具、报表模板
- **客服 Skill**：配置知识库、话术模板、升级流程

## 代表实践

- **OpenCode / Cline**：通过 `.clinerules` 或 Skill 文件定义 Agent 行为
- **GPTs**（OpenAI）：通过指令+知识+动作自定义 ChatGPT 行为
- **Custom Instructions**（Claude）：项目级自定义指令
- **Agent 框架**：LangChain、CrewAI 中的 Tool + Prompt 组合模式

## 关联术语

- [Agent](/terms/agent) — Skills 是 Agent 的能力来源
- [Function Calling](/terms/function-calling) — Skills 底层的工具调用机制
- [System Prompt](/prompts/system-prompt) — Skills 的一部分
- [RAG](/terms/rag) — Skills 的知识来源方式
- [MCP](/terms/mcp) — Skills 的标准协议层

## 快速记忆

Skills = 给 Agent 安装专业技能包。好比你的手机装 App——装一个「修图 App」它就会修图，装一个「写代码 App」它就会写代码。

## 延伸阅读

- [OpenCode Skills](https://github.com/opencode-ai) 开源 Agent 技能框架
- [OpenAI GPTs](https://chatgpt.com/gpts) 官方自定义 GPT
- Anthropic Claude 项目自定义指令
