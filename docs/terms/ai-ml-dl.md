---
title: AI / ML / DL
description: 人工智能、机器学习、深度学习——从大到小的三层包含关系
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# AI / ML / DL

这三个词经常被混用，但它们之间是**包含与被包含**的关系——就像俄罗斯套娃，AI 最大，DL 最小在最里面。

## 一句话解释

**AI（人工智能）** 是让机器模拟人类智能的大目标；**ML（机器学习）** 是 AI 的子集，让机器从数据中自动学习规律而无需手动编程；**DL（深度学习）** 是 ML 的子集，用深层神经网络处理复杂数据。

```
AI（人工智能）
 └── ML（机器学习）
      └── DL（深度学习）
```

## 通俗类比

想象你在教小孩认识动物：

- **AI** = "让小孩学会认识动物"这个大目标——你甚至可以用 if-else 规则：四条腿 + 汪汪叫 = 狗。
- **ML** = 你不再写死规则，而是给他看 1000 张动物照片并告诉他答案，让他自己在看的过程中总结规律。
- **DL** = 你用一个多层神经网络（类似人脑的深度结构），给他看 100 万张照片，他不仅能认出猫狗，还能区分哈士奇和阿拉斯加。

## 技术定义

| 层级 | 定义 | 典型方法 |
|------|------|----------|
| AI | 模拟人类智能的任何系统 | 规则系统、搜索算法、ML |
| ML | 从数据中学习模式而无需显式编程 | 决策树、SVM、随机森林 |
| DL | 使用多层神经网络进行表征学习 | CNN、RNN、Transformer |

## 关联术语

- [大语言模型 (LLM)](/terms/llm) —— DL 的一个重要应用方向
- [训练 / 推理](/terms/training-inference) —— ML/DL 的两个核心阶段
- [参数](/terms/parameters) —— DL 模型学到的"知识"

## 延伸阅读

- [AI vs ML vs DL — Google Cloud 官方解释](https://cloud.google.com/learn/artificial-intelligence-vs-machine-learning)
- 吴恩达《Machine Learning》课程 —— Coursera 上最经典的 ML 入门课
