---
title: 训练 / 推理
description: 训练是模型学习阶段，推理是模型使用阶段——二者的区别与关系
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 训练 / 推理

很多人在谈论 AI 时把"训练"和"推理"混为一谈，但它们像**上学和工作**——是完全不同的两个阶段。

## 一句话解释

**训练（Training）** 是让模型从海量数据中学习模式和规律的过程，需要大量 GPU 和时间，成本极高；**推理（Inference）** 是使用训练好的模型对新输入做出预测或生成输出，速度快、成本相对低。

## 通俗类比

**训练 = 上学读书**

- 你花 16 年上学，读了成千上万本书，做了无数道题
- 这期间需要教室（GPU 集群）、老师（优化算法）、课本（训练数据）
- 成本非常高，但一生只做一次（或几次）

**推理 = 毕业工作**

- 学成后，有人问问题，你用学到的知识回答
- 不需要大量计算资源，一台电脑（一张 GPU）就可能够用
- 每次回答成本低，但一辈子都在做这件事

GPT-4 的训练花了约 **7800 万美元**（算力成本），但我们每次用 ChatGPT 问问题只花几分钱。这就是训练和推理的区别。

## 技术定义

| 维度 | 训练 | 推理 |
|------|------|------|
| 目的 | 学习数据中的模式 | 对新输入做出预测 |
| 参数状态 | 不断更新（梯度下降） | 固定不变（只读） |
| 硬件需求 | 数千张 GPU，数月 | 1~8 张 GPU，毫秒级 |
| 数据流 | 前向计算 + 反向传播 | 仅前向计算 |
| 成本 | 千万~亿美元级 | 每次几厘到几分钱 |
| 执行者 | 大公司/研究机构 | 用户（通过 API 或本地） |

训练中还有一个重要概念：**梯度下降**。简单理解，就是每次看一批数据→计算预测和正确答案的差距→微调参数让差距变小——这个过程循环数百万次。

## 关联术语

- [参数](/terms/parameters) —— 训练更新参数，推理使用参数
- [微调 (Fine-tuning)](/terms/fine-tuning) —— 在已训练模型上的二次训练

## 快速记忆

训练是上学（花时间花钱学知识），推理是考试（根据学到的回答问题）。你用的每一个 AI 产品都只付了"考试"的钱。

## 延伸阅读

- [Google: ML Training vs Inference](https://cloud.google.com/discover/what-is-inference-in-machine-learning)
- [NVIDIA: Training vs Inference](https://blogs.nvidia.com/blog/whats-the-difference-between-single--double--multi-and-mixed-precision-computing/)
