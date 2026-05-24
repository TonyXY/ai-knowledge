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

---

## DeepSeek-R1 实战

R1 最大的特点是会暴露内部的「思维链」（chain-of-thought）。返回结果中有一个额外的 `reasoning_content` 字段，包含模型的完整推理过程。

```python
from openai import OpenAI

client = OpenAI(
    api_key="sk-your-key",
    base_url="https://api.deepseek.com"
)

response = client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[
        {"role": "user", "content": "甲、乙从相距 120km 的 A、B 两地同时出发相向而行，甲速 15km/h，乙速 25km/h。一只狗从甲身边以 40km/h 出发跑向乙，遇到乙后折返跑向甲，如此反复。问甲乙相遇时狗跑了多少公里？"}
    ]
)

# 获取推理过程和最终答案
reasoning = response.choices[0].message.reasoning_content
answer = response.choices[0].message.content

print("=== 推理过程（前 500 字） ===")
print(reasoning[:500])
print("\n=== 最终答案 ===")
print(answer)
```

**R1 推理过程输出示例：**

```text
首先分析相遇问题。甲乙相向而行，总路程 120km。
相对速度 = 15 + 25 = 40 km/h。
相遇时间 = 120 ÷ 40 = 3 小时。
狗一直以 40 km/h 的速度在跑，持续 3 小时。
所以狗跑的距离 = 40 × 3 = 120 公里。
无论狗怎么折返，只要知道时间 × 速度就能算出距离，不需要考虑折返的复杂路径。
验证：假设狗第 1 次遇到乙用时 t1，算出距离 = 40 × t1，结果与上述简单算法一致。
```

**最终答案：** 甲、乙相遇时狗跑了 **120 公里**。

> **关键差异**：OpenAI o1/o3 **不暴露**内部推理过程，只返回最终答案。DeepSeek-R1 的 `reasoning_content` 是开源生态的优势，便于调试和教学。

### R1 使用避坑

| 坑 | 说明 |
|----|------|
| 不要传入历史 reasoning | 推理内容自包含，`messages` 里只需 user/assistant 的 `content`，不要附带历史 `reasoning_content` |
| 不要加 CoT prompt | 模型自带推理，「请一步步思考」反而干扰内部思维链 |
| 不要用 stream | 推理过程长，流式会导致推理内容和最终答案混在一起难以解析 |
| R1 不支持 Function Calling | 需要工具调用的场景用普通模型（DeepSeek-V3 / GPT-4o） |
| reasoning_content 不可见时设为 None | 调用第三方代理时，该字段可能被过滤，需要做防御性检查 |

## Prompt 技巧

| 做法 | 推理模型 | 普通模型 |
|------|---------|---------|
| Few-Shot | ❌ 少用（自带推理） | ✅ 有用 |
| 思维链提示 | ❌ 不需要 | ✅ Let's think step by step |
| 约束条件 | ✅ 给明确边界 | ✅ 一样 |
| 输出格式 | ✅ 最后指定格式 | ✅ 一样 |

**最佳实践**：给一个清晰的目标，不要教它怎么推理；在最后指定输出格式。

---

## o1 vs o3 vs R1 对比

| | o1 | o3-mini | DeepSeek-R1 |
|---|-----|---------|-------------|
| 推理能力 | ⭐⭐⭐⭐ 很强 | ⭐⭐⭐ 较强 | ⭐⭐⭐⭐ 很强 |
| 速度 | 慢（30-60s） | 较快（5-15s） | 中等（10-30s） |
| 输入价格 | $15/M tokens | $1.10/M tokens | $0.55/M tokens |
| 输出价格 | $60/M tokens | $4.40/M tokens | $2.19/M tokens |
| 推理价格 | 包含在输出中 | 包含在输出中 | 含 reasoning_tokens $0.14/M |
| 暴露推理过程 | ❌ | ❌ | ✅ `reasoning_content` |
| 开源 | ❌ | ❌ | ✅ MIT 协议 |
| 多模态 | 有限支持 | ❌ | ❌（纯文本） |
| Function Calling | 支持但慢 | 不推荐 | ❌ 不支持 |
| 上下文窗口 | 200K | 200K | 128K |

**选型建议：**

- 追求绝对准确度且预算充足 → o1
- 日常复杂推理，看重性价比 → DeepSeek-R1
- 需要较快响应速度 → o3-mini
- 需要内部推理过程用于调试或教学 → DeepSeek-R1
- 需要多模态推理 → o1（目前唯一支持图片输入的推理模型）

---

## 何时不使用推理模型（具体场景）

以下场景用推理模型纯属浪费。不仅慢还贵，效果和普通模型没区别。

### 翻译

翻译是语言映射，不涉及多步推理。R1 会比 DeepSeek-V3 慢 10 倍、贵 3 倍，结果却一样：

```python
# ❌ 浪费：慢 + 贵，毫无收益
client.chat.completions.create(
    model="deepseek-reasoner",
    messages=[{"role": "user", "content": "把以下内容翻译成英文：今天天气真好，我们出去走走吧。"}]
)

# ✅ 用 DeepSeek-V3 或 GPT-4o
client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "把以下内容翻译成英文：今天天气真好，我们出去走走吧。"}]
)
```

### 创意写作

写故事、写文案、起标题——这些依赖发散思维和风格把控，不是逻辑收敛。推理模型倾向于「过度分析」，产出结构严谨但缺乏灵气的文字。用 Claude 3.5 Sonnet 或 GPT-4o 效果更好。

### 信息提取与结构化输出

```python
# ❌ 从合同里提取「甲方」「金额」「日期」——杀鸡用牛刀
# 推理模型的 JSON 输出不稳定（可能被包在推理过程中）

# ✅ 普通模型 + JSON mode 更快更准
response = client.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},
    messages=[{"role": "user", "content": "提取以下合同的关键信息，返回 JSON：甲方名称、金额、签署日期..."}]
)
```

### 分类与情感分析

判断情绪是正面还是负面——典型的模式匹配，不需要多步推理。用任何低延迟模型即可。

### 代码补全

IDE 内联补全需要毫秒级响应，推理模型动辄几十秒，完全不可用。用 Copilot / Cursor 的内联模型。

| 任务类型 | 为什么不需要推理 | 推荐模型 |
|---------|-----------------|---------|
| 翻译 | 语言映射，不需多步推理 | GPT-4o / DeepSeek-V3 |
| 创意写作 | 依赖发散思维，不是逻辑收敛 | Claude 3.5 Sonnet |
| 信息提取 | 模式匹配 + 格式化 | GPT-4o + JSON mode |
| 情感分析 | 单步分类任务 | 任何低延迟模型 |
| 代码补全 | 需要毫秒级速度 | Copilot / Cursor 内联 |

---

## 推理模型的 Prompt 示例对比

同一个问题，普通模型和推理模型的回答方式完全不同。

### 案例：一道中学几何证明题

> 已知：△ABC 中，AD 是 BC 边上的中线，且 AD = BC/2。求证：∠BAC = 90°。

**GPT-4o 的回答：**

```text
这道题可以用向量法。设 D 为 BC 中点，则：
BD = DC。
由中线长公式，AD² = (AB² + AC²)/2 - BC²/4。
将 AD = BC/2 代入...得出 AB² + AC² = BC²。
由勾股定理逆定理得 ∠BAC = 90°。
```

GPT-4o 直接给出答案，但在复杂题目上可能出现「跳步」或「偷换条件」——它是一次性生成，没有自我验证机制。

**DeepSeek-R1 的回答：**

```text
=== 推理过程 ===
第一步，理解题意：AD 是 BC 的中线，所以 D 是 BC 的中点。
第二步，已知 AD = BC/2，即中线长度等于底边的一半。
第三步，回忆定理：直角三角形斜边上的中线 = 斜边的一半。
逆命题：如果三角形一边上的中线等于该边的一半，则该三角形是直角三角形。
第四步，应用逆命题，直接得出结论 ∠BAC = 90°。
验证 1：用中线长公式再算一遍，AD² = (AB²+AC²)/2 - BC²/4，
代入 AD=BC/2，得 AB²+AC²=BC²，一致。
验证 2：构造外接圆，D 为圆心，BC 为直径，A 在圆上，∠BAC 为直径所对圆周角 = 90°。

=== 最终答案 ===
根据「直角三角形斜边中线逆定理」：若 △ABC 中 BC 边上的中线 AD = BC/2，则 ∠BAC = 90°。
用两种方法（公式法 + 外接圆法）交叉验证，结论确凿。
```

### Prompt 设计原则

| 场景 | 普通模型 Prompt | 推理模型 Prompt |
|------|---------------|---------------|
| 数学证明 | 「请一步步推理，验证每一步...」 | 「证明以下命题」— 直接给题目 |
| 代码调试 | 「分析这个 bug，可能的原因为：1. 2. 3. ...」 | 「这段代码有 bug，现象是 X，代码见下」 |
| 策略分析 | 「从多角度分析，列出 pros 和 cons」 | 「分析 A 方案和 B 方案的优劣」 |

**核心原则：给推理模型设定「做什么」，不要教它「怎么做」。**

## 关联阅读

- [思维链 (CoT)](/terms/cot)
- [OpenAI API 入门](/dev/openai-api)
- [大模型对比](/tools/model-comparison)
