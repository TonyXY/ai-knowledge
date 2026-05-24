---
title: "Transformer"
description: "2017 年 Google 提出的革命性神经网络架构，基于自注意力机制，取代 RNN 成为 NLP 主流"
difficulty: intermediate
---

# Transformer

<DifficultyBadge level="intermediate" />

## 一句话解释

Transformer 是 2017 年 Google 在论文《Attention Is All You Need》中提出的神经网络架构，用**自注意力机制**替代了传统的循环结构，让模型可以并行处理整个序列，成为 GPT、BERT、Claude 等所有现代大语言模型的基石。

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;overflow-x:auto;text-align:center">
  <svg viewBox="0 0 620 340" style="max-width:620px;width:100%">
    <!-- Encoder -->
    <rect x="60" y="15" width="160" height="290" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
    <text x="140" y="40" text-anchor="middle" font-size="13" font-weight="bold" fill="#4338ca">编码器 Encoder ×6</text>
    <!-- Self-Attention -->
    <rect x="80" y="55" width="120" height="32" rx="6" fill="#6366f1" opacity="0.12"/>
    <text x="140" y="75" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">多头自注意力</text>
    <rect x="85" y="91" width="110" height="18" rx="4" fill="#fff" stroke="#cbd5e1"/>
    <text x="140" y="104" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
    <line x1="140" y1="109" x2="140" y2="115" stroke="#cbd5e1"/>
    <!-- FFN -->
    <rect x="80" y="115" width="120" height="32" rx="6" fill="#6366f1" opacity="0.12"/>
    <text x="140" y="135" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">前馈网络 FFN</text>
    <rect x="85" y="151" width="110" height="18" rx="4" fill="#fff" stroke="#cbd5e1"/>
    <text x="140" y="164" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
    <!-- Input -->
    <rect x="100" y="190" width="80" height="28" rx="6" fill="#6366f1"/>
    <text x="140" y="209" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">输入</text>
    <polygon points="136,190 140,182 144,190" fill="#6366f1"/>
    <text x="140" y="248" text-anchor="middle" font-size="10" fill="#94a3b8">词嵌入 + 位置编码</text>
    <text x="220" y="160" text-anchor="middle" font-size="14" fill="#cbd5e1">→</text>

    <!-- Decoder -->
    <rect x="300" y="15" width="180" height="310" rx="10" fill="#fdf4ff" stroke="#a855f7" stroke-width="1.5"/>
    <text x="390" y="40" text-anchor="middle" font-size="13" font-weight="bold" fill="#7e22ce">解码器 Decoder ×6</text>
    <!-- Masked Self-Attention -->
    <rect x="315" y="55" width="150" height="32" rx="6" fill="#a855f7" opacity="0.12"/>
    <text x="390" y="75" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">掩码自注意力</text>
    <rect x="320" y="91" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1"/>
    <text x="390" y="104" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
    <line x1="390" y1="109" x2="390" y2="115" stroke="#cbd5e1"/>
    <!-- Cross-Attention -->
    <rect x="315" y="115" width="150" height="32" rx="6" fill="#fbcfe8" opacity="0.4" stroke="#ec4899" stroke-width="1.2"/>
    <text x="390" y="135" text-anchor="middle" font-size="11" fill="#be185d" font-weight="600">交叉注意力</text>
    <rect x="320" y="151" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1"/>
    <text x="390" y="164" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
    <line x1="390" y1="169" x2="390" y2="175" stroke="#cbd5e1"/>
    <!-- FFN -->
    <rect x="315" y="175" width="150" height="32" rx="6" fill="#a855f7" opacity="0.12"/>
    <text x="390" y="195" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">前馈网络 FFN</text>
    <rect x="320" y="211" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1"/>
    <text x="390" y="224" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
    <!-- Output -->
    <polygon points="386,255 390,263 394,255" fill="#ec4899"/>
    <rect x="340" y="263" width="100" height="24" rx="6" fill="#ec4899"/>
    <text x="390" y="280" text-anchor="middle" font-size="11" fill="#fff" font-weight="600">Linear → Softmax</text>
    <text x="390" y="310" text-anchor="middle" font-size="10" fill="#94a3b8">输出概率分布</text>

    <!-- Encoder → Decoder cross-attention connection -->
    <path d="M220 150 L260 150 L260 131 L300 131" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="6,3"/>
    <polygon points="298,127 306,131 298,135" fill="#6366f1"/>

    <!-- 说明 -->
    <text x="310" y="335" text-anchor="middle" font-size="11" fill="#94a3b8">Transformer：自注意力替代循环，编码器读取输入，解码器生成输出</text>
  </svg>
</div>

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
