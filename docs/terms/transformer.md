---
title: "Transformer"
description: "2017 年 Google 提出的革命性神经网络架构，基于自注意力机制，取代 RNN 成为 NLP 主流"
difficulty: intermediate
---

# Transformer

<DifficultyBadge level="intermediate" />

## 一句话解释

Transformer 是 2017 年 Google 在论文《Attention Is All You Need》中提出的神经网络架构，用**自注意力机制**替代了传统的循环结构，让模型可以并行处理整个序列，成为 GPT、BERT、Claude 等所有现代大语言模型的基石。

<ArchTransformer />

## 通俗类比

想象你在读一本书，传统的 RNN 像逐字逐句地阅读，每次只能看到当前这个词和前面读过的内容。而 Transformer 像是把整页内容同时摊开在桌上，一眼就能看到所有句子，并且能用荧光笔快速标注出哪些词和哪个词关系最紧密——这种"同时看到所有词"的能力，让它在理解和生成文本时又快又准。

## 技术定义

Transformer 由**编码器（Encoder）** 和 **解码器（Decoder）** 两部分组成，每部分都由多层相同的结构堆叠而成。核心组件包括：

1. **多头自注意力（Multi-Head Self-Attention）**：让模型在多个表示子空间中同时捕捉词语间的依赖关系
2. **前馈神经网络（Feed-Forward Network）**：对注意力输出进行非线性变换
3. **位置编码（Positional Encoding）**：由于没有循环结构，需要额外注入位置信息，让模型知道词的顺序
4. **残差连接 + 层归一化（Add & Norm）**：确保深层网络稳定训练

现代大模型大多只使用 Transformer 的解码器部分（Decoder-only），如 GPT 系列。BERT 则只用了编码器部分（Encoder-only）。

## 关联术语

- [自注意力机制](/terms/self-attention) —— Transformer 的核心计算单元
- [大语言模型 (LLM)](/terms/llm) —— 基于 Transformer 构建的大规模语言模型
- [参数](/terms/parameters) —— Transformer 模型的规模衡量标准
- [KV Cache](/terms/kv-cache) —— Transformer 推理加速的关键优化

## 快速记忆

以前读句子像念经——一个字一个字挨着读（RNN）。Transformer 像扫一眼整页——同时看所有字，找出谁和谁最相关。

## 延伸阅读

- 原论文：[Attention Is All You Need](https://arxiv.org/abs/1706.03762)（Vaswani et al., 2017）
- Jay Alammar 的图解 Transformer：[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- 推荐学习顺序：先理解 [自注意力机制](/terms/self-attention)，再看 Transformer 整体结构，最后了解 [KV Cache](/terms/kv-cache) 优化。
