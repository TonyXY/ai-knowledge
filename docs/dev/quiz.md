---
title: AI 开发知识测验
description: 测试你对 API 编程、Agent 开发、工程实践的掌握程度
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# AI 开发知识测验

测一测你对 AI 开发核心知识的掌握程度。覆盖 API 编程、Agent 流程和工程实践，共 6 道题。

---

## 一、API 编程

### Q1：OpenAI API 中设置 `stream=True` 的作用是？（单选）

<div class="quiz-options">

- **A.** 提高回答质量
- **B.** 以流式方式逐块返回结果，实现打字机效果
- **C.** 自动重试失败的请求
- **D.** 压缩传输数据量

</div>

<details>
<summary>查看答案</summary>

**正确答案：B**

`stream=True` 启用 SSE（Server-Sent Events）流式传输，模型边生成内容边返回，不必等全部生成完才响应。最直观的体验就是"打字机效果"——用户能逐字看到模型的输出，大幅降低感知等待时间。

A：stream 不改变模型推理质量。  
C：重试和 stream 无关，需自行实现重试逻辑。  
D：SSE 流式传输并不压缩数据量，反而因为逐块传输会有轻微协议开销。

→ 📖 延伸阅读：[流式响应](./streaming)

</details>

---

### Q2：Tool Calling（函数调用）的正确流程是？（单选）

<div class="quiz-options">

- **A.** 模型直接调用函数 → 返回结果
- **B.** 定义 Tool → 模型返回 Tool 调用请求 → 执行函数 → 返回结果给模型
- **C.** 用户指定调哪个 Tool → 模型执行
- **D.** 模型自己写函数代码 → 编译运行

</div>

<details>
<summary>查看答案</summary>

**正确答案：B**

Tool Calling 的完整流程是一个**循环**：

1. 开发者在请求中**定义 Tool**（名称、描述、参数 Schema）
2. 模型判断需要调用工具后，**返回一个 Tool Call 请求**（JSON 格式，含函数名和参数）
3. 开发者在自己的环境中**执行该函数**，获取结果
4. 将执行结果**追加到对话中**，再次发送给模型
5. 模型根据工具返回的结果**生成最终回答**

模型本身**不会执行代码**，它只输出调用指令。执行权始终在开发者手中，这也是安全设计的一部分。

→ 📖 延伸阅读：[Tool Calling](./tool-calling) · [Tool 定义与实现](./tool-definition)

</details>

---

## 二、Agent 开发

### Q3：Agent 的 ReAct 循环中，Observation（观察）步骤的作用是什么？（单选）

<div class="quiz-options">

- **A.** 观察用户的反应
- **B.** 观察工具执行的结果，决定下一步做什么
- **C.** 观察其他 Agent 的行为
- **D.** 观察训练数据的分布

</div>

<details>
<summary>查看答案</summary>

**正确答案：B**

ReAct（Reasoning + Acting）循环是 Agent 的核心运行机制：

```text
Thought（思考）→ Action（行动）→ Observation（观察）→ Thought → …… → Answer
```

Observation 步骤接收工具执行后的返回值，作为新一轮 Thought 的输入。Agent 基于这个观察结果判断：

- 任务是否完成？如果完成，输出最终答案
- 是否需要继续调用工具？如果需要，决定下一步 Action
- 结果是否异常？如果异常，调整策略重试

这就是 Agent 区别于普通 LLM 调用的关键——具备**基于反馈的自适应决策能力**。

→ 📖 延伸阅读：[Agent 核心概念](./agent-intro) · [构建第一个 Agent](./build-agent)

</details>

---

## 三、工程实践

### Q4：以下哪项是防御 Prompt 注入的有效手段？（单选）

<div class="quiz-options">

- **A.** 用更贵的模型
- **B.** 用定界符包裹用户输入，限制模型行为
- **C.** 增加模型的参数量
- **D.** 关闭模型的联网功能

</div>

<details>
<summary>查看答案</summary>

**正确答案：B**

Prompt 注入的核心问题是**用户输入和系统指令的边界混淆**。防御的首要策略就是明确区分两者：

- **定界符隔离**：用 `"""` 或 XML 标签等标记包裹用户输入，让模型识别哪些是"不可信的数据"，哪些是"系统规则"
- **分层 Prompt**：System Prompt 声明规则且不可被覆盖，User Prompt 携带实际任务
- **输入过滤**：检测并拦截已知注入模式（如"忽略上述指令"等关键词）
- **输出校验**：检查模型输出是否企图执行非预期的操作

A：更贵的模型不会天然免疫注入，反而因为指令跟随能力更强，可能更容易被诱导。  
C：参数量和安全无关。  
D：联网功能和注入是两个维度的问题。

→ 📖 延伸阅读：[AI 安全](./ai-security)

</details>

---

### Q5：推理模型（如 o1、DeepSeek-R1）适合所有类型的任务，简单问答也应该用它们。（判断）

<div class="quiz-options">

- **○ 正确**
- **○ 错误**

</div>

<details>
<summary>查看答案</summary>

**错误（False）**

推理模型虽然推理能力更强，但代价也很大：

| 维度 | 推理模型 | 通用模型（如 GPT-4o） |
|------|---------|----------------------|
| 延迟 | 高（需内部思考链） | 低 |
| 成本 | 贵（思考 Token 也计费） | 便宜 |
| 适用场景 | 数学证明、复杂逻辑、代码调试 | 日常问答、翻译、摘要 |

**决策原则**：任务需要多步推理 → 用推理模型；任务只需知识检索或简单转换 → 用通用模型。简单问答用推理模型是"杀鸡用牛刀"，既慢又贵，收益极低。

→ 📖 延伸阅读：[推理模型使用](./reasoning-models)

</details>

---

### Q6：Prompt Caching 可以降低 API 调用成本并减少响应延迟。（判断）

<div class="quiz-options">

- **○ 正确**
- **○ 错误**

</div>

<details>
<summary>查看答案</summary>

**正确（True）**

Prompt Caching 的工作原理：

- 当多次请求**共享相同的前缀内容**时（如固定的 System Prompt、RAG 检索到的文档上下文），服务端缓存在首次计算后的 KV Cache
- 后续相同前缀的请求**跳过重复计算**，直接从缓存读取

带来的收益：

- **降低成本**：缓存命中部分按缓存 Token 价格计费，远低于完整推理价格（如 Claude 缓存写入贵 25%，但缓存读取便宜 90%；OpenAI 缓存读取便宜 50%）
- **减少延迟**：省去重复的 Prefill 阶段，首字延迟（TTFT）显著下降
- **典型场景**：固定 System Prompt 的多轮对话、批量处理相同上下文的请求、RAG 应用中的长文档检索

→ 📖 延伸阅读：[术语：Prompt Caching](/terms/prompt-caching) · [术语：KV Cache](/terms/kv-cache)

</details>

---

→ 🔧 [返回 AI 开发总览](/dev/)
