---
title: 构建第一个 Agent
description: 从零手写一个 ReAct Agent——不依赖任何框架，只用 OpenAI API + Python
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# 构建第一个 Agent

本篇带你从零开始，**不依赖任何框架**，只用 OpenAI API 和 Python 标准库，手写一个能搜索信息、做数学计算的 ReAct Agent。

## 目标

写一个 Agent，当收到这样的问题时：

> "上海今天天气怎么样？顺便帮我算一下 23 × 47"

它能自主地：

1. 调用搜索工具获取天气信息
2. 调用计算器工具计算 23 × 47
3. 把两个结果整合成最终答案

## 为什么不用框架？

用 LangChain 几行代码就能搭一个 Agent。但**先手写，再上框架**，你才能真正理解：

- 模型是怎么决定"下一步该做什么"的
- Tool Calling 的完整流程（定义 → 调用 → 执行 → 返回结果）
- 循环的终止条件是怎么触发的

这些是调试 Agent 时的必备知识。

## 准备工作

- Python 3.10+
- OpenAI API Key（设置环境变量 `OPENAI_API_KEY`）
- 安装依赖：`pip install openai`

```bash
pip install openai
export OPENAI_API_KEY="sk-your-key-here"
```

---

## 第 1 步：定义 Tools

工具是 Agent 的"手"。在这里我们定义两个最简单的工具：

```python
import json
from datetime import datetime

# ── 工具 1：模拟天气查询 ──
def get_weather(city: str, date: str = "today") -> dict:
    """
    查询指定城市的天气。
    注意：这是模拟实现，真实场景应调用天气 API。
    """
    # 模拟返回数据（真实场景替换为 API 调用）
    weather_data = {
        "上海": {"temperature": "22°C", "condition": "多云转晴", "humidity": "65%"},
        "北京": {"temperature": "18°C", "condition": "阴有小雨", "humidity": "78%"},
        "深圳": {"temperature": "28°C", "condition": "晴", "humidity": "55%"},
    }

    city_info = weather_data.get(city, {
        "temperature": "未知", "condition": "暂无数据", "humidity": "暂无数据"
    })

    return {
        "city": city,
        "date": date,
        **city_info,
        "source": "模拟数据（仅供演示）"
    }


# ── 工具 2：计算器 ──
def calculate(expression: str) -> dict:
    """
    执行数学计算，返回结果。
    使用 Python 内置 eval，生产环境需用更安全的方式。
    """
    try:
        # 只允许数字和基本运算符，防止代码注入
        allowed_chars = set("0123456789+-*/(). ")
        if not all(c in allowed_chars for c in expression):
            return {"error": "表达式包含非法字符，仅支持数字和 +-*/()"}

        result = eval(expression, {"__builtins__": {}}, {})
        return {"expression": expression, "result": result}
    except ZeroDivisionError:
        return {"error": "除数不能为零"}
    except Exception as e:
        return {"error": f"计算错误: {str(e)}"}
```

---

## 第 2 步：编写 Tool Schema

模型需要知道**有哪些工具、每个工具是干什么的、需要什么参数**。这是通过 JSON Schema 来描述的：

```python
# Tool 定义（符合 OpenAI Function Calling 规范）
TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询指定城市的天气。参数 city 是城市名称（如'上海'），参数 date 是日期（默认 today）。",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如：上海、北京、深圳"
                    },
                    "date": {
                        "type": "string",
                        "description": "查询日期，默认为 'today'"
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "执行数学表达式计算。支持加减乘除和括号。",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {
                        "type": "string",
                        "description": "数学表达式，例如 '23 * 47' 或 '(100 + 200) / 3'"
                    }
                },
                "required": ["expression"]
            }
        }
    }
]
```

---

## 第 3 步：System Prompt

System Prompt 告诉模型"你是一个 Agent，你应该如何使用工具，什么时候停止"。

```python
SYSTEM_PROMPT = """你是一个能使用工具的 AI Agent。

## 你的能力
你可以调用以下工具来完成用户的任务：
- get_weather: 查询天气
- calculate: 计算数学表达式

## 行为规则
1. 仔细分析用户的问题，判断需要使用哪些工具
2. 一次可以调用多个工具（如果它们之间没有依赖关系）
3. 每次工具调用后，你会收到返回结果，请根据结果决定下一步
4. 当你已经收集到回答用户所需的全部信息时，直接输出最终答案
5. 如果工具返回了错误，告知用户发生了什么
6. 用中文回答用户
"""
```

---

## 第 4 步：主循环

这是整个 Agent 的心脏——ReAct 循环的实现：

```python
from openai import OpenAI

client = OpenAI()

# 工具名称 → 实际函数 的映射
TOOL_MAP = {
    "get_weather": get_weather,
    "calculate": calculate,
}


def agent_loop(user_query: str, max_steps: int = 10) -> str:
    """
    Agent 主循环——ReAct 模式的完整实现。
    """
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": user_query},
    ]

    for step in range(max_steps):
        print(f"\n{'='*50}")
        print(f"🔄 Step {step + 1}")

        # 调用 LLM
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # 经济实惠，也可换成 gpt-4o
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",  # 让模型自己决定要不要调工具
        )

        msg = response.choices[0].message

        # ── 情况 A：LLM 直接输出答案（没有 tool_calls）──
        if msg.content and not msg.tool_calls:
            print(f"✅ Agent 输出最终答案")
            return msg.content

        # ── 情况 B：LLM 返回了 tool_calls ──
        if msg.tool_calls:
            # 先把模型的消息（含 tool_calls）加入历史
            messages.append(msg.model_dump())

            for tool_call in msg.tool_calls:
                tool_name = tool_call.function.name
                tool_args = json.loads(tool_call.function.arguments)

                print(f"🔧 调用工具: {tool_name}({tool_args})")

                # 执行工具
                try:
                    func = TOOL_MAP[tool_name]
                    result = func(**tool_args)
                except Exception as e:
                    result = {"error": f"工具执行异常: {str(e)}"}

                print(f"📋 工具结果: {result}")

                # 把工具执行结果以 "tool" 角色添加到消息历史
                messages.append({
                    "role": "tool",
                    "tool_call_id": tool_call.id,
                    "content": json.dumps(result, ensure_ascii=False),
                })

            # 循环回到顶部，LLM 会看到工具结果并继续思考

    return "⚠️ 达到最大步数限制，Agent 未能完成任务。"


# ── 运行测试 ──
if __name__ == "__main__":
    question = "上海今天天气怎么样？顺便帮我算一下 23 × 47"
    print(f"📝 用户问题: {question}")
    answer = agent_loop(question)
    print(f"\n{'='*50}")
    print(f"🎯 最终答案:\n{answer}")
```

---

## 第 5 步：执行结果分析

运行上面的代码，你会看到类似这样的输出：

```text
📝 用户问题: 上海今天天气怎么样？顺便帮我算一下 23 × 47

==================================================
🔄 Step 1
🔧 调用工具: get_weather({'city': '上海'})
📋 工具结果: {'city': '上海', 'temperature': '22°C', ...}
🔧 调用工具: calculate({'expression': '23 * 47'})
📋 工具结果: {'expression': '23 * 47', 'result': 1081}

==================================================
🔄 Step 2
✅ Agent 输出最终答案

==================================================
🎯 最终答案:
上海今天的天气多云转晴，气温 22°C，湿度 65%。
另外，23 × 47 = 1,081。
```

### 关键观察

1. **Step 1**：Agent 同时调用了两个工具（`get_weather` 和 `calculate`），因为它们互不依赖——这是一个好的并行优化
2. **Step 2**：LLM 收到了两个工具的结果，判断信息已经足够，直接输出最终答案
3. **自动停止**：当 LLM 返回 `content` 而没有 `tool_calls` 时，循环自然终止

---

## 完整代码（含异常处理）

```python
"""
从零构建 ReAct Agent —— 完整版（含错误处理、日志、安全限制）
依赖: pip install openai
运行前设置: export OPENAI_API_KEY="sk-..."
"""
import json
from openai import OpenAI

client = OpenAI()

# ═══════════════════════════════════════
# 工具实现
# ═══════════════════════════════════════

def get_weather(city: str, date: str = "today") -> dict:
    weather_data = {
        "上海": {"temperature": "22°C", "condition": "多云转晴", "humidity": "65%"},
        "北京": {"temperature": "18°C", "condition": "阴有小雨", "humidity": "78%"},
        "深圳": {"temperature": "28°C", "condition": "晴", "humidity": "55%"},
    }
    info = weather_data.get(city, {"temperature": "未知", "condition": "暂无数据", "humidity": "未知"})
    return {"city": city, "date": date, **info}


def calculate(expression: str) -> dict:
    allowed = set("0123456789+-*/(). ")
    if not all(c in allowed for c in expression):
        return {"error": "表达式包含非法字符"}
    try:
        result = eval(expression, {"__builtins__": {}}, {})
        return {"expression": expression, "result": result}
    except ZeroDivisionError:
        return {"error": "除数不能为零"}
    except Exception as e:
        return {"error": str(e)}


# ═══════════════════════════════════════
# 配置
# ═══════════════════════════════════════

TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "查询指定城市的天气",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {"type": "string", "description": "城市名称"},
                    "date": {"type": "string", "description": "日期，默认 today"},
                },
                "required": ["city"],
            },
        },
    },
    {
        "type": "function",
        "function": {
            "name": "calculate",
            "description": "计算数学表达式，支持 +-*/()",
            "parameters": {
                "type": "object",
                "properties": {
                    "expression": {"type": "string", "description": "数学表达式"},
                },
                "required": ["expression"],
            },
        },
    },
]

TOOL_MAP = {"get_weather": get_weather, "calculate": calculate}

SYSTEM_PROMPT = """你是一个能使用工具的 AI Agent。
规则:
1. 分析用户问题，调用合适的工具
2. 互不依赖的工具可同时调用
3. 收集齐信息后直接输出最终答案
4. 用中文回答
"""

# ═══════════════════════════════════════
# 主循环
# ═══════════════════════════════════════

def agent_loop(query: str, max_steps: int = 10) -> str:
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": query},
    ]

    for step in range(max_steps):
        print(f"[Step {step + 1}]")

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            tools=TOOLS,
            tool_choice="auto",
        )
        msg = response.choices[0].message

        if msg.content and not msg.tool_calls:
            return msg.content

        if msg.tool_calls:
            messages.append(msg.model_dump())
            for tc in msg.tool_calls:
                name = tc.function.name
                args = json.loads(tc.function.arguments)
                print(f"  → {name}({args})")

                try:
                    result = TOOL_MAP[name](**args)
                except Exception as e:
                    result = {"error": str(e)}

                messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": json.dumps(result, ensure_ascii=False),
                })

    return "达到最大步数限制"


if __name__ == "__main__":
    q = "上海今天天气怎么样？顺便算一下 23 × 47"
    print(f"问题: {q}\n")
    answer = agent_loop(q)
    print(f"\n答案: {answer}")
```

---

## 关键设计要点

| 要点 | 做法 | 为什么 |
|------|------|--------|
| **工具映射** | `TOOL_MAP` 字典 | 隔离定义和实现，易于扩展 |
| **安全计算** | `eval` 前验证字符集 | 防止任意代码执行 |
| **最大步数** | `max_steps` 参数 | 防止死循环耗尽 token |
| **异常捕获** | `try/except` 包裹工具调用 | 工具失败不炸掉整个 Agent |
| **结果回传** | `role: "tool"` 消息 | 让 LLM 看到工具执行结果 |

## 总结

你刚刚完成了一个 60 行核心代码的 ReAct Agent。它虽然简单，但包含了所有 Agent 的核心要素：

- ✅ 工具定义（Schema）
- ✅ 工具实现（实际函数）
- ✅ System Prompt（行为规则）
- ✅ ReAct 循环（Thought → Action → Observation）
- ✅ 自动终止（LLM 自主决定何时 Answer）

## 下一步

- 给 Agent 添加真实工具（调用搜索引擎 API、数据库查询）
- 加上 Memory（让 Agent 记住之前的内容）
- 学习 [Tool 定义与实现](/dev/tool-definition)，写出更专业的 Tool

## 关联阅读

- [Agent 核心概念](/dev/agent-intro) —— 理解 ReAct 模式和 Agent 四组件
- [Tool 定义与实现](/dev/tool-definition) —— 深入 Tool 的最佳实践
- [OpenAI API 入门](/dev/openai-api) —— API 调用基础
