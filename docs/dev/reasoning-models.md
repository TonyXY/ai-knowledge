---
title: 推理模型使用
description: o1、DeepSeek-R1 等推理模型的正确使用方式——什么时候用、怎么用、避坑指南
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# 推理模型使用

## 一句话理解

**推理模型**（o1、DeepSeek-R1）在回答之前会先进行内部"思考"，擅长解决复杂问题，但简单任务反而慢还贵。

## 推理模型 vs 普通模型

| | 普通模型 (GPT-4o, Claude 3.5) | 推理模型 (o1, DeepSeek-R1) |
|--|-------------------------------|---------------------------|
| 回答方式 | 直接生成 | 内部"思考"后再回答 |
| 推理能力 | 一般 | 强（数学/逻辑/编程竞赛） |
| 速度 | 快（秒级） | 慢（数十秒） |
| 价格 | 低 | 高（3-5 倍） |
| 适合任务 | 通用场景 | 复杂推理 |

## 什么时候用推理模型

### ✅ 适合

- **复杂数学**：高等数学证明、概率统计
- **代码 Debug**：深层的逻辑错误、竞态条件、内存泄漏
- **逻辑推理**：法律条文分析、策略规划
- **竞赛题**：编程竞赛、数学竞赛

### ❌ 不适合

- **简单问答**："今天天气怎么样？"
- **内容生成**：写文案、翻译、润色
- **创意写作**：写故事、头脑风暴
- **结构化输出**：提取信息、JSON 输出

## API 调用

### DeepSeek-R1

调用方式和普通模型完全一样：

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[
        {"role": "user", "content": "一个三位数，各位数字之和为 18，百位比十位大 2，个位是十位的 2 倍，求这个三位数。"}
    ]
)

print(response.choices[0].message.content)
```

### OpenAI o1

```python
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="o1-mini",
    messages=[
        {"role": "user", "content": "用数学归纳法证明 1+2+...+n = n(n+1)/2"}
    ]
)
```

注意 o1 的参数差异：
- ❌ 不支持 `temperature`、`top_p`
- ❌ 不支持 `stream`
- ⚠️ 用 `max_completion_tokens` 而非 `max_tokens`

## Prompt 技巧

| 做法 | 推理模型 | 普通模型 |
|------|---------|---------|
| Few-Shot | ❌ 少用（自带推理） | ✅ 有用 |
| 思维链提示 | ❌ 不需要 | ✅ Let's think step by step |
| 约束条件 | ✅ 给明确边界 | ✅ 一样 |
| 输出格式 | ✅ 最后指定格式 | ✅ 一样 |

**最佳实践**：给一个清晰的目标，不要教它怎么推理；在最后指定输出格式。

## 关联阅读

- [思维链 (CoT)](/terms/cot)
- [OpenAI API 入门](/dev/openai-api)
- [大模型对比](/tools/model-comparison)
