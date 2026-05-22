---
title: "RLHF"
description: "基于人类反馈的强化学习——用人类偏好数据训练奖励模型，引导 LLM 输出更符合人类期望的内容"
difficulty: advanced
---

# RLHF

<DifficultyBadge level="advanced" />

## 一句话解释

RLHF（Reinforcement Learning from Human Feedback，基于人类反馈的强化学习）是一种训练方法，它先用**人类偏好标注数据**训练一个"奖励模型"来判断回答的好坏，再用强化学习算法（通常是 PPO）**微调 LLM**，使模型输出更符合人类的价值观、偏好和安全要求。ChatGPT 的成功在很大程度上归功于 RLHF。

## 通俗类比

训练一个实习记者写新闻稿。第一阶段，让他读海量新闻稿（预训练），他学会了句子结构和常见表达。第二阶段，给他具体的任务和参考范文训练（监督微调 / SFT），他能写出基本格式正确的稿子了。但问题来了——编辑发现他有时会写偏激观点或过于啰嗦。于是第三阶段，编辑开始给每篇稿件打分（人类反馈），并且告诉他"简明扼要 +3 分""过度修饰 -1 分""客观中立 +2 分"（奖励模型）。记者根据这些反馈不断调整写作风格，最终写出让编辑满意的稿子——这就是 RLHF 的过程。

## 技术定义

RLHF 通常包含三个训练阶段：

1. **监督微调（SFT, Supervised Fine-Tuning）**：用高质量的"指令-回答"对微调预训练模型，让模型学会遵循指令。这是 RLHF 的基础
2. **训练奖励模型（RM, Reward Model）**：让人类标注员对同一问题的多个回答进行偏好排序（如 A > B > C），用这些数据训练一个奖励模型。奖励模型的责任是：给定一个回答，预测它会得到多高的人类评分
3. **强化学习微调（RL Fine-Tuning）**：使用 **PPO（Proximal Policy Optimization）** 算法，以奖励模型的输出作为奖励信号，微调 SFT 模型。同时引入 **KL 散度惩罚**，防止模型偏离 SFT 模型太远而导致语言质量崩塌

RLHF 的核心价值：
- **对齐（Alignment）**：让模型行为与人类价值观一致
- **安全性**：减少有害、偏见、误导性输出
- **有用性**：让回答更直接、更符合用户实际需求

RLHF 的替代方案也在快速发展，包括 **DPO（Direct Preference Optimization）**——直接基于偏好数据优化而无需单独训练奖励模型，更简洁高效。以及 **RLVR（Reinforcement Learning with Verifiable Rewards）**——用数学/代码等可自动验证的任务提供奖励信号，避免了昂贵的人类标注。

## 关联术语

- [微调 (Fine-tuning)](/terms/fine-tuning) —— SFT 是 RLHF 的第一阶段
- [大语言模型 (LLM)](/terms/llm) —— RLHF 是现代 LLM 对齐训练的标准方法
- [训练 / 推理](/terms/training-inference) —— RLHF 属于训练阶段的优化

## 延伸阅读

- InstructGPT 论文：[Training language models to follow instructions with human feedback](https://arxiv.org/abs/2203.02155) —— RLHF 在 ChatGPT 中的应用
- DPO 论文：[Direct Preference Optimization](https://arxiv.org/abs/2305.18290) —— RLHF 的简化替代方案
- Anthropic 的 RLHF 实践：[Training a Helpful and Harmless Assistant](https://www.anthropic.com/index/training-helpful-and-harmless-assistant)
- 学习建议：先理解监督微调的基本流程，再逐步学习奖励模型训练和 PPO 算法。
