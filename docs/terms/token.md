---
title: Token
description: AI 模型处理文本的最小单位，同时是计费和上下文窗口的计数标准
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# Token

Token 是使用 AI 模型时最基础但也最容易混淆的概念。它同时扮演**输入单位、计费单位、容量单位**三个角色。

## 一句话解释

Token 是 LLM 处理文本的最小粒度。一句话先被切分成 Token，模型再逐个处理和生成。中文大约 1 个字 = 1~2 个 Token，英文大约 1 个单词 = 1~2 个 Token。

## 通俗类比

把一段文字想象成一幅乐高积木作品。Token 就是**被拆开后的每一块乐高**：

- "我爱 AI" → 拆成 3~4 个 Token（`我` `爱` `AI` 或 `AI`拆分）
- "I love AI" → 拆成 3~4 个 Token（`I` `love` `AI`）

模型读你的提示词时，是把 Token 一块块"吃"进去的；输出回答时，也是一块块"吐"出来的。

## 技术定义

Tokenization 是文本预处理的第一步。不同模型使用不同的分词器（Tokenizer）：

- **GPT 系列**：使用 BPE（Byte Pair Encoding），将常见词作为整体，罕见词拆为子词
- **中文模型**：通常以字或词为粒度，配合 BPE 处理英文混合文本

一个实用经验：**1000 Token ≈ 750 个英文单词 ≈ 400~500 个汉字**。

Token 的三个关键用途：

| 用途 | 说明 |
|------|------|
| 输入计数 | 模型能处理的 Token 上限由上下文窗口决定 |
| 输出计数 | 模型生成回答消耗 Token，每次 API 调用都有输出限制 |
| 计费基础 | API 按输入/输出 Token 数分别计费，输出通常更贵 |

## 关联术语

- [上下文窗口](/terms/context-window) —— 单次对话能容纳的 Token 总量
- [Prompt](/terms/prompt) —— 你给模型的 Token 输入

## 延伸阅读

- [OpenAI Tokenizer 在线工具](https://platform.openai.com/tokenizer) —— 亲自试试文字是怎么被切成 Token 的
- [Hugging Face Tokenizers 文档](https://huggingface.co/docs/tokenizers/index)
