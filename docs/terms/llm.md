---
title: 大语言模型 (LLM)
description: 用海量文本训练、能理解和生成人类语言的深度学习模型
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 大语言模型 (LLM)

LLM（Large Language Model）是当前 AI 浪潮的核心驱动力。简单说，它是一个**在海量文本上训练出来的超级语言预测器**。

## 一句话解释

LLM 是用数十亿到数万亿参数训练出来、能理解上下文并生成连贯文本的深度学习模型。ChatGPT、Claude、DeepSeek 和通义千问都是 LLM。

## 通俗类比

想象一个**读过整个互联网的超级学霸**——他几乎读过人类公开的所有书籍、文章、论坛帖子和代码。你问他任何问题，他都能基于"读过的内容"给出回答。他不会真正"思考"，但他的知识面广到惊人，并且能模仿人类的表达方式。

他的 "阅读量" 有多大？GPT-4 的训练数据大约相当于 **几百万本《三体》** 的文字量。

## 技术定义

LLM 的核心架构是 **Transformer**（2017 年 Google 提出），它通过自注意力机制理解文本中词与词之间的远距离依赖关系。训练过程分为两个阶段：

1. **预训练（Pre-training）**：在互联网规模的文本上学习语言模式和世界知识
2. **对齐（Alignment）**：通过 RLHF 等方法让模型输出符合人类偏好

训练一次顶级 LLM 的成本可达 **数千万到数亿美元**，需要数千张 GPU 运行数月。

## 关联术语

- [AI / ML / DL](/terms/ai-ml-dl) —— LLM 属于深度学习的一种
- [Token](/terms/token) —— LLM 处理文本的基本单位
- [上下文窗口](/terms/context-window) —— LLM 一次能 "记住" 多少内容
- [微调 (Fine-tuning)](/terms/fine-tuning) —— 让 LLM 适应特定任务

## 延伸阅读

- [OpenAI GPT-4 技术报告](https://arxiv.org/abs/2303.08774)
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) —— Transformer 原始论文
- [Andrej Karpathy: Intro to LLMs](https://www.youtube.com/watch?v=zjkBMFhNj_g) —— 1 小时视频全面介绍
