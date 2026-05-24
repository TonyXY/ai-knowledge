---
title: 结构化提示词
description: 用 Markdown/XML/JSON 组织 Prompt，让 AI 更精确地理解你的意图
difficulty: intermediate
---

# 结构化提示词 <DifficultyBadge level="intermediate" />

当 Prompt 变得复杂时，纯文本段落会让 AI 难以分辨"指令"和"内容"。**结构化提示词** 就是用 Markdown、XML 或 JSON 等格式来组织 Prompt，让结构清晰、意图明确。

---

## 为什么需要结构化？

比较以下两种写法：

### ❌ 纯文本（混乱）

```text
帮我分析一下这段代码有什么问题，然后给个优化方案，输出的时候用表格格式。
另外记得考虑一下安全问题，性能也要看，不用太关注代码风格。
```

### ✅ 结构化（清晰）

```markdown
# 任务
分析以下代码，输出问题报告和优化方案。

## 分析范围
- 安全问题（优先）
- 性能瓶颈
- 不关注：代码风格、命名规范

## 输出格式
| 问题类型 | 严重程度 | 位置 | 问题描述 | 修改建议 |
|----------|---------|------|---------|---------|

## 代码
```python
def process(data):
    ...
```
```

AI 能清晰地知道：要分析什么、关注什么、不关注什么、输出什么格式。

---

## 三种结构化格式

### Markdown 格式（推荐）

最通用、最易读，适合大多数场景。

```markdown
# 角色
你是一位前端性能优化专家。

# 任务
对以下 React 组件进行性能审查。

# 审查清单
1. 不必要的 re-render
2. useEffect 依赖问题
3. 大列表渲染性能
4. 内存泄漏风险

# 输出格式
每个问题用以下格式输出：
- **问题**：一句话描述
- **位置**：文件名 + 行号
- **影响**：性能影响程度（高/中/低）
- **修复**：代码片段

# 代码
```jsx
// 待审查的代码...
```
```

### XML 格式

适合与 [RAG](/terms/rag) 系统配合，XML 标签天然适合做语义分段。

```xml
<System>
  <Role>数据分析师</Role>
  <Task>分析以下销售数据</Task>
  <OutputFormat>JSON</OutputFormat>
</System>

<Context>
  <Industry>电商</Industry>
  <Period>2025 Q1</Period>
</Context>

<Data>
  <sales>
    <month>1月</month>
    <revenue>120000</revenue>
  </sales>
</Data>

<Instructions>
  <step>1. 计算环比增长率</step>
  <step>2. 识别异常数据点</step>
  <step>3. 给出 3 条优化建议</step>
</Instructions>
```

### JSON 格式

适合程序化生成 Prompt 的场景。

```json
{
  "role": "代码审查员",
  "task": "审查代码质量",
  "criteria": ["安全性", "性能", "可维护性"],
  "ignore": ["命名风格", "注释格式"],
  "output_format": {
    "type": "array",
    "items": {
      "severity": "string",
      "location": "string",
      "description": "string",
      "suggestion": "string"
    }
  }
}
```

---

## 结构化模板：万能任务框架

```markdown
# 角色
[你是什么角色，有什么专业背景]

# 背景
[当前的任务背景和上下文]

# 任务
[具体的任务描述，用 1-2 句话]

# 约束
- [约束 1]
- [约束 2]
- [约束 3]

# 输出格式
[说明你想要的输出格式：表格 / 列表 / 代码 / JSON]

# 示例（可选）
输入：[示例输入]
输出：[示例输出]

# 内容
[你的实际输入内容放在最后]
```

---

## 进阶阅读

- [System Prompt 设计](./system-prompt) — 把结构化模板融入 System Prompt
- [清晰指令五原则](./principles) — 五原则在结构化模板中的体现
