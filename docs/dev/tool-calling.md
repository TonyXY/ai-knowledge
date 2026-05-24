---
title: "Tool Calling"
description: "让模型调用你的函数——Tool Schema 定义、完整调用循环、get_weather 实战、并行工具调用与多模型差异"
difficulty: intermediate
---

# Tool Calling

<DifficultyBadge level="intermediate" />

Tool Calling（工具调用）是 Agent 的原子能力——模型不再是"说"，而是能"做"。它让 LLM 根据用户意图决定"该调哪个函数、传什么参数"，你的程序负责执行并将结果返回。

本篇聚焦于 **OpenAI 兼容格式**的 Tool Calling，适用于 GPT-4、DeepSeek、通义千问等主流模型。

## 完整流程

```
用户输入 → 模型判断是否需要工具 → 返回 Tool Call JSON
    → 你的程序执行函数 → 结果回传给模型 → 模型整合后自然语言回复
```

这不是模型真的执行了函数——模型只负责**决策**，你的代码负责**执行**。

## 定义 Tool Schema

Tool Schema 是一份 JSON Schema，告诉模型"我有什么工具、每个工具有什么参数"：

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如 '北京'、'上海'",
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位，默认为 celsius",
                    },
                },
                "required": ["city"],
            },
        },
    }
]
```

::: tip Schema 编写要点
- `name` 要直观——模型靠名字匹配意图
- `description` 要精确——决定模型何时调用这个工具
- `parameters` 用 JSON Schema 定义，`required` 标注必填参数
- 枚举类型用 `enum`，让模型输出受限值
:::

## 完整实现：get_weather

先实现一个模拟的天气函数，再串联整个 Tool Calling 循环。

```python
import json
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

# ---- 1. 定义工具 ----
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称",
                    },
                },
                "required": ["city"],
            },
        },
    }
]

# ---- 2. 实现实际函数 ----
def get_weather(city: str) -> dict:
    """模拟天气查询（生产环境替换为真实 API）"""
    # 模拟数据
    weather_data = {
        "北京": {"temperature": 28, "condition": "晴", "humidity": "45%"},
        "上海": {"temperature": 32, "condition": "多云", "humidity": "65%"},
        "深圳": {"temperature": 30, "condition": "雷阵雨", "humidity": "80%"},
    }
    return weather_data.get(city, {"temperature": 25, "condition": "未知", "humidity": "50%"})

# 函数名 → 函数对象的映射表
available_functions = {
    "get_weather": get_weather,
}

# ---- 3. Tool Calling 循环 ----
def run_conversation(user_input: str):
    # 初始化消息列表
    messages = [
        {"role": "user", "content": user_input},
    ]

    # 第一次调用：模型决定是否需要工具
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        tools=tools,
        tool_choice="auto",  # auto: 自动判断 | none: 不用工具 | required: 必须用
    )

    response_message = response.choices[0].message

    # 检查模型是否要调用工具
    tool_calls = response_message.tool_calls
    if not tool_calls:
        # 不需要工具，直接返回回复
        return response_message.content

    # ---- 4. 执行工具调用 ----
    messages.append(response_message)  # 把模型的 tool_calls 加入历史

    for tool_call in tool_calls:
        function_name = tool_call.function.name
        function_args = json.loads(tool_call.function.arguments)

        print(f"🔧 模型调用: {function_name}({function_args})")

        # 执行函数
        function_to_call = available_functions[function_name]
        function_result = function_to_call(**function_args)

        # 把结果追加到消息列表
        messages.append({
            "role": "tool",
            "tool_call_id": tool_call.id,
            "name": function_name,
            "content": json.dumps(function_result, ensure_ascii=False),
        })

    # ---- 5. 第二次调用：模型整合结果 ----
    second_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
    )

    return second_response.choices[0].message.content


# 测试
print(run_conversation("北京今天天气怎么样？"))
print("---")
print(run_conversation("深圳和上海的天气分别如何？"))
```

## 并行 Tool Calling

当用户说"查一下北京和上海的天气"，模型可以**一次返回多个 tool_calls**，你的代码并行执行它们，大幅提升效率：

```python
# 并行执行所有工具调用
from concurrent.futures import ThreadPoolExecutor

def execute_tool_calls_parallel(tool_calls):
    """并行执行多个 tool call"""
    results = []

    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = []
        for tool_call in tool_calls:
            fn_name = tool_call.function.name
            fn_args = json.loads(tool_call.function.arguments)
            fn = available_functions[fn_name]
            futures.append(executor.submit(fn, **fn_args))

        for tool_call, future in zip(tool_calls, futures):
            results.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "name": tool_call.function.name,
                "content": json.dumps(future.result(), ensure_ascii=False),
            })

    return results
```

## 多个工具组合

真实应用通常有多个工具。关键是给每个工具写好 `description`，让模型能准确选择：

```python
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询城市天气。当用户询问天气相关问题时使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"}
                },
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "搜索互联网获取最新信息。当用户询问新闻、实时数据时使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词"},
                    "num_results": {"type": "integer", "description": "返回条数，默认 5"},
                },
                "required": ["query"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "send_email",
            "description": "发送邮件。当用户要求发邮件、通知某人时使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "to": {"type": "string", "description": "收件人邮箱"},
                    "subject": {"type": "string", "description": "邮件主题"},
                    "body": {"type": "string", "description": "邮件正文"},
                },
                "required": ["to", "subject", "body"],
            },
        },
    },
]
```

## 不同模型的差异

虽然都宣称"兼容 OpenAI 格式"，但实际有细微差异：

| 模型 | 注意事项 |
|------|----------|
| **GPT-4** | 原生支持最好，`tool_choice="auto"` 判断准确 |
| **DeepSeek** | 完全兼容，Tool Calling 表现优秀 |
| **Claude** | 用的是 Anthropic 自己的 Tool Use API，格式不同 |
| **通义千问** | 兼容 OpenAI 格式，但 `tool_choice` 部分值不支持 |

建议：先用 OpenAI 格式写，切换模型时测试一下 Tool Calling 是否正常工作。

## 调试技巧

```python
# 打印模型的工具调用决策，方便调试
response = client.chat.completions.create(...)
msg = response.choices[0].message

if msg.tool_calls:
    for tc in msg.tool_calls:
        print(f"📞 调用工具: {tc.function.name}")
        print(f"📋 参数: {tc.function.arguments}")
else:
    print(f"💬 直接回复: {msg.content}")
```

## 下一步

- [结构化输出 (JSON Mode)](/dev/structured-output) —— Tool Calling vs JSON Mode 的选择
- [构建 Agent](/dev/build-agent) —— 把 Tool Calling 扩展为完整的 Agent 循环
