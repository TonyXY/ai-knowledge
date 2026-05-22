---
title: "思维链 (CoT)"
description: "Chain-of-Thought——引导模型逐步推理再给出答案，显著提升数学和逻辑推理能力"
difficulty: advanced
---

# 思维链 (CoT)

<DifficultyBadge level="advanced" />

## 一句话解释

思维链（Chain-of-Thought, CoT）是一种**引导语言模型在给出最终答案前，先输出中间推理步骤**的技术。通过"Let's think step by step"这样的提示，让模型将复杂问题拆解为一系列逻辑步骤，从而在数学、逻辑推理、多步决策等任务中显著提升准确率。

## 通俗类比

解一道复杂的数学题，如果你直接脱口而出答案，很可能出错。但如果你在草稿纸上一步步写下计算过程——先读题、找关键数据、列方程、代入、求解——正确率就大大提高。CoT 就是让模型也在"草稿纸"上写推理过程：不是直接跳到答案，而是先输出"题目给出的条件是……我需要先算……然后是……所以答案是……"。这个过程不仅提升了正确率，还让模型的思考过程变得可检查和可信任。

## 技术定义

CoT 有多种实现方式：

1. **Few-Shot CoT**：在 Prompt 中给出几个"问题 → 分步推理 → 答案"的示例，模型学习这种格式后，遇到新问题也会模仿着逐步推理。这是原始论文（Wei et al., 2022）提出的经典方式
2. **Zero-Shot CoT**：不需要任何示例，只需添加一句魔法提示词"Let's think step by step"，模型就会自发地开始分步推理。这种方式更简洁，在大多数场景下效果与 Few-Shot 相当
3. **Auto-CoT**：自动为 Few-Shot CoT 生成示例，减少人工构造示例的工作量

CoT 发挥作用的关键前提是**模型规模足够大**（通常需要 100B+ 参数），小模型使用 CoT 提升有限甚至可能下降。这也是为什么 CoT 被认为是 LLM 的一种**涌现能力（Emergent Ability）**。

CoT 的进阶变体：
- **Self-Consistency**：多次独立运行 CoT，取出现频率最高的答案，进一步提升稳定性
- **Tree of Thoughts（ToT）**：不只一条推理链，而是像下棋一样探索多条推理路径
- **Chain-of-Thought with Verification**：推理完成后，让模型自行检查验证推理过程

## 关联术语

- [Prompt](/terms/prompt) —— CoT 是一种特定形式的 Prompt 技巧
- [Agent](/terms/agent) —— Agent 的任务规划本质就是内部使用 CoT 进行思考
- [大语言模型 (LLM)](/terms/llm) —— CoT 效果与模型规模强相关

## 延伸阅读

- 原始论文：[Chain-of-Thought Prompting Elicits Reasoning in Large Language Models](https://arxiv.org/abs/2201.11903)（Wei et al., 2022）
- Zero-Shot CoT：[Large Language Models are Zero-Shot Reasoners](https://arxiv.org/abs/2205.11916)
- 实践建议：在 Prompt 中自己先写一个分步推理的示例，效果通常优于只加一句"Let's think step by step"。
