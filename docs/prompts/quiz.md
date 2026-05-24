---
title: 提示词知识测验
description: 检验你对 Prompt 工程核心技巧的掌握——System Prompt、Few-Shot、CoT、JSON Mode
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 📝 提示词知识测验

学完提示词工程模块后，来测测你的掌握情况！共 5 题，每题后附答案和解析。

---

## 一、选择题

### Q1：System Prompt 的主要作用是什么？

A. 控制模型输出的字数

B. 设定模型的行为、角色和规则

C. 决定模型使用什么语言

D. 设置模型的运行温度

<details>
<summary>查看答案</summary>

**正确答案：B**

System Prompt 用于在对话开始前定义模型的整体行为——你是谁、你的职责、你的限制、你的输出风格等。它像是一份"员工手册"，决定了 AI 如何回应所有后续的用户输入。

💡 关联阅读：[System Prompt 设计](/prompts/system-prompt) · [角色设定](/prompts/role-prompting)
</details>

---

### Q2：Few-Shot 提示是什么意思？

A. 只用一个词提问

B. 给模型 2-3 个示例后再提问

C. 让模型自己举例子

D. 限制模型的输出长度

<details>
<summary>查看答案</summary>

**正确答案：B**

Few-Shot 提示是在提问前给模型展示几个示例（通常 2-5 个），让模型通过示例理解你期望的格式、风格和逻辑。与之对应的是 Zero-Shot（不给示例直接提问）。

💡 关联阅读：[Few-Shot / Zero-Shot](/prompts/few-shot)
</details>

---

### Q3：思维链（CoT）最适合什么场景？

A. 简单问答

B. 数学推理和逻辑分析

C. 文本翻译

D. 内容摘要

<details>
<summary>查看答案</summary>

**正确答案：B**

思维链（Chain of Thought）通过引导模型"一步一步思考"，显著提升在数学推理、逻辑推演、多步骤问题解决等复杂任务上的准确率。简单问答不需要 CoT，用了反而是浪费 Token。

💡 关联阅读：[思维链 (CoT)](/terms/cot) · [结构化提示词](/prompts/structured-prompt)
</details>

---

### Q4：JSON Mode 的主要用途是？

A. 让模型输出更快的 JSON 格式

B. 强制模型输出可解析的 JSON

C. 把模型内部状态转为 JSON

D. 优化模型的 JSON 训练数据

<details>
<summary>查看答案</summary>

**正确答案：B**

JSON Mode 确保模型输出的是合法 JSON 格式，可以直接被程序解析使用。这对于 AI 开发至关重要——当 LLM 的输出需要被下游代码消费时（如 Tool Calling、API 响应），必须保证格式正确。

💡 关联阅读：[结构化输出 (JSON Mode)](/dev/structured-output) · [Tool Calling](/dev/tool-calling)
</details>

---

## 二、判断题

### Q5：写 Prompt 时，越详细的指令通常会得到更好的结果。

<details>
<summary>查看答案</summary>

**✅ 正确**

AI 不是人，它无法"揣摩"你的意图。指令越具体、约束越明确、上下文越丰富，模型的输出就越符合预期。这也是「清晰指令五原则」的核心思想——好的 Prompt 是精确的蓝图，不是模糊的愿望。

💡 关联阅读：[清晰指令五原则](/prompts/principles) · [写好 Prompt 的核心原则](/terms/prompt)
</details>

---

## 📊 评分

| 正确数 | 等级 |
|--------|------|
| 5 | 🏆 满分！提示词高手 |
| 3-4 | 👍 掌握良好 |
| 1-2 | 📖 仍需加强 |
| 0 | 🔄 建议重读提示词模块 |

<details>
<summary>你对了几题？来对答案吧！</summary>

| 题号 | 答案 | 类型 |
|------|------|------|
| Q1 | B | 选择题 |
| Q2 | B | 选择题 |
| Q3 | B | 选择题 |
| Q4 | B | 选择题 |
| Q5 | ✅ | 判断题 |

</details>
