---
title: "结构化输出 (JSON Mode)"
description: "强制模型返回合法 JSON——OpenAI JSON Mode、Response Format Schema 约束、从非结构化文本提取结构化信息实战"
difficulty: intermediate
---

# 结构化输出 (JSON Mode)

<DifficultyBadge level="intermediate" />

调用 AI API 时，默认返回的是自由文本。但在工程场景中，你需要**可解析的结构化数据**——比如提取联系人信息、分类标签、生成配置文件。JSON Mode 就是为此而生。

## 为什么需要结构化输出

| 场景 | 自由文本 | JSON Mode |
|------|----------|-----------|
| 提取用户信息 | "姓名张三，电话 13800138000" | `{"name":"张三","phone":"13800138000"}` |
| 情感分类 | "这篇评论是正面的" | `{"sentiment":"positive","score":0.92}` |
| 代码生成 | 可能夹带解释文字 | `{"code":"...","language":"python","explanation":"..."}` |
| 批量处理 | 需要正则解析，不稳定 | 直接用 `json.loads()`，100% 准确 |

## OpenAI JSON Mode

最简单的用法——告诉模型"你必须输出 JSON"：

```python
import os
import json
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system",
            "content": "你是一个数据提取助手，始终以 JSON 格式返回结果。",
        },
        {
            "role": "user",
            "content": "从以下简历中提取姓名、职位和技能：\n张三，5年Python后端开发，擅长Django、FastAPI、MySQL",
        },
    ],
    response_format={"type": "json_object"},  # 关键参数
)

result = json.loads(response.choices[0].message.content)
print(result)
# 输出: {"name": "张三", "position": "Python后端开发", "skills": ["Django", "FastAPI", "MySQL"]}
```

::: warning 注意
必须在 system prompt 或 user prompt 中**明确提到 JSON**，否则 API 会报错。最简单的方式是在 system prompt 里写"以 JSON 格式返回"。
:::

## Response Format：用 JSON Schema 约束结构

`response_format={"type": "json_object"}` 只保证输出是合法 JSON，不保证字段名和类型。如果你需要精确的结构，用 **JSON Schema** 约束：

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-2024-08-06",  # 仅 GPT-4o 及以上支持 JSON Schema
    messages=[
        {"role": "system", "content": "你从文本中提取联系人信息。"},
        {"role": "user", "content": "我叫李明，电话 13912345678，邮箱 liming@example.com"},
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "contact_info",
            "strict": True,  # 严格模式，确保 100% 符合 Schema
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "phone": {"type": "string"},
                    "email": {"type": "string", "format": "email"},
                    "company": {
                        "type": "string",
                        "description": "公司名称，如果没有则返回 null",
                    },
                },
                "required": ["name", "phone", "email", "company"],
                "additionalProperties": False,  # 不允许额外字段
            },
        },
    },
)

result = json.loads(response.choices[0].message.content)
print(result)
# {"name":"李明", "phone":"13912345678", "email":"liming@example.com", "company":null}
```

### 枚举约束

```python
"schema": {
    "type": "object",
    "properties": {
        "sentiment": {
            "type": "string",
            "enum": ["positive", "negative", "neutral"],
        },
        "category": {
            "type": "string",
            "enum": ["bug_report", "feature_request", "question", "praise", "other"],
        },
        "confidence": {
            "type": "number",
            "minimum": 0,
            "maximum": 1,
        },
    },
    "required": ["sentiment", "category", "confidence"],
    "additionalProperties": False,
}
```

### 嵌套对象和数组

```python
"schema": {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "author": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "email": {"type": "string", "format": "email"},
            },
            "required": ["name"],
            "additionalProperties": False,
        },
        "tags": {
            "type": "array",
            "items": {"type": "string"},
            "maxItems": 10,
        },
        "publish_date": {
            "type": "string",
            "description": "ISO 8601 格式日期，如 2025-01-15",
        },
    },
    "required": ["title", "author", "tags"],
    "additionalProperties": False,
}
```

## Tool Calling vs JSON Mode：怎样选择

| 特性 | Tool Calling | JSON Mode |
|------|-------------|-----------|
| 用途 | 调用外部函数 | 提取/生成结构化数据 |
| 模型兼容性 | 几乎所有模型都支持 | OpenAI 专用（部分模型支持 JSON Schema） |
| 输出的严谨性 | tool_calls 字段保证符合 Schema | `response_format` 约束保证，但不绝对 |
| 适用场景 | 查天气、发邮件、搜网页 | 信息提取、分类、格式化 |
| 并行调用 | 原生支持多个 tool_calls | 需要自己设计 |

**选择规则：**

- 需要**执行外部操作**（查数据库、调 API、发请求） → **Tool Calling**
- 需要**从文本中提取结构化信息**（NLP 信息抽取） → **JSON Mode**
- 两者有时可以互用，但选对方案会让代码更简洁

## 实战：从非结构化文本提取联系人信息

这是一个完整的可运行例子——从一段自然语言中提取结构化数据：

```python
import json
from openai import OpenAI

client = OpenAI()

def extract_contacts(text: str) -> list[dict]:
    """从一段文本中提取所有联系人信息"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": (
                    "你是一个信息提取助手。从用户提供的文本中，提取所有人的联系信息。\n"
                    "以 JSON 格式返回，结构为 {'contacts': [...]}。\n"
                    "每个联系人包含：name（姓名）、phone（手机号）、email（邮箱）、organization（单位/公司）。\n"
                    "如果某个字段没有找到，值设为 null。"
                ),
            },
            {"role": "user", "content": text},
        ],
        response_format={"type": "json_object"},
        temperature=0,  # 信息提取用最低温度，保证一致性
    )

    result = json.loads(response.choices[0].message.content)
    return result.get("contacts", [])


# 测试
sample_text = """
会议参会名单：
1. 张三，腾讯云架构师，电话 13800138000，邮箱 zhangsan@tencent.com
2. 李四，字节跳动产品经理，手机 13912345678
3. 王五 wangwu@alibaba.com，负责技术支持
"""

contacts = extract_contacts(sample_text)
for c in contacts:
    print(f"姓名: {c['name']}, 电话: {c['phone']}, 邮箱: {c['email']}, 单位: {c['organization']}")
```

**输出：**

```
姓名: 张三, 电话: 13800138000, 邮箱: zhangsan@tencent.com, 单位: 腾讯云
姓名: 李四, 电话: 13912345678, 邮箱: None, 单位: 字节跳动
姓名: 王五, 电话: None, 邮箱: wangwu@alibaba.com, 单位: None
```

## 常见问题

### 模型输出不是合法 JSON

加 `response_format={"type":"json_object"}` 可以基本避免。如果还是有概率出错，加一层 `try-except`：

```python
try:
    result = json.loads(response.choices[0].message.content)
except json.JSONDecodeError:
    print("模型输出不是合法 JSON，原始内容：")
    print(response.choices[0].message.content)
```

### 字段缺失

JSON Mode 不保证每个字段都存在。在代码中做防御：

```python
name = contact.get("name", "未知")
phone = contact.get("phone", None)
```

### DeepSeek 兼容性

DeepSeek 也支持 `response_format={"type":"json_object"}`，用法完全一致。但 JSON Schema 约束（`json_schema` 类型）目前仅 OpenAI 支持。

## 下一步

- [Tool Calling](/dev/tool-calling) —— JSON Mode 的兄弟方案，知道何时用哪个
- [流式响应](/dev/streaming) —— JSON Mode + 流式输出的权衡
