---
title: Tool 定义与实现
description: 掌握 Tool Schema 的写法、实现的最佳实践、错误处理、缓存——写出生产级 Agent 工具
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# Tool 定义与实现

Tool（工具）是 Agent 的"手"。一个好的 Agent 体验，**70% 取决于 Tool 写得怎么样**。本篇聚焦 Tool 的定义规范、实现模式、错误处理和实际案例。

## Tool = Schema + 实现

一个完整的 Tool 由两部分组成：

```
┌──────────────────────────────────────────┐
│              Tool 定义                    │
│                                          │
│  ┌────────────┐      ┌────────────────┐  │
│  │   Schema   │      │    实现         │  │
│  │            │      │                │  │
│  │ name       │──────│  def get_      │  │
│  │ description│      │  weather():    │  │
│  │ parameters │      │    # 实际逻辑  │  │
│  └────────────┘      └────────────────┘  │
│                                          │
│  给 LLM 看的          真正执行的代码     │
└──────────────────────────────────────────┘
```

- **Schema**：告诉 LLM "有什么工具、什么时候用、需要什么参数"
- **实现**：真正的代码逻辑，由 Agent 循环调用

---

## Tool Schema 标准格式

OpenAI 定义的 Function Calling Schema 已经成为事实标准，Claude、Gemini 也都兼容这个格式。

```python
{
    "type": "function",
    "function": {
        "name": "search_web",              # ① 唯一标识
        "description": "搜索互联网获取最新信息。当需要实时数据或用户问当前事件时使用。",  # ② 用途说明
        "parameters": {                    # ③ 参数定义
            "type": "object",
            "properties": {
                "query": {
                    "type": "string",
                    "description": "搜索关键词，越具体越好"
                },
                "num_results": {
                    "type": "integer",
                    "description": "返回结果数量，默认 5，最大 10",
                    "default": 5
                }
            },
            "required": ["query"]          # ④ 必填参数
        }
    }
}
```

### 写好 Tool Schema 的 5 条原则

**① name —— 简短、描述性**

```python
# ✅ 好
"name": "search_web"
"name": "send_email"
"name": "query_database"

# ❌ 差：太模糊或太啰嗦
"name": "search"
"name": "send_an_email_to_the_user"
```

**② description —— 教 LLM 何时调用**

这是最重要的字段。LLM 通过 description 来判断"现在该不该用这个工具"。

```python
# ✅ 好：明确了使用场景
"description": "搜索互联网获取最新信息。当用户询问实时数据（天气、新闻、股价）或需要最新资料时使用。"

# ❌ 差：没说清什么时候用
"description": "搜索功能"
```

**③ parameters —— 字段的 description 也要认真写**

```python
# ✅ 好：每个参数都有清晰的描述
"amount": {
    "type": "number",
    "description": "转账金额，单位为人民币（元），必须大于 0"
}

# ❌ 差：参数描述太简略
"amount": {
    "type": "number",
    "description": "金额"
}
```

**④ required —— 只标记真正必须的参数**

`required` 数组里的参数如果没有提供，LLM 会主动追问用户。非必填的东西别放进去。

**⑤ 给枚举值加限制**

```python
"priority": {
    "type": "string",
    "description": "邮件优先级",
    "enum": ["low", "normal", "high"]  # 限制可选值
}
```

加上 `enum` 后，LLM 不会填 `urgent`、`super_important` 这种无效值。

---

## Tool 实现的最佳实践

### 1. 输入验证

**永远不要信任 LLM 传过来的参数。** LLM 可能会幻觉参数值。

```python
def send_email(to: str, subject: str, body: str) -> dict:
    """发送电子邮件"""
    import re

    # 验证邮箱格式
    if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", to):
        return {"error": f"无效的邮箱地址: {to}"}

    # 限制长度
    if len(body) > 10000:
        return {"error": "邮件正文不能超过 10000 字符"}

    # 实际发送逻辑
    try:
        # ... 调用邮件服务
        return {"success": True, "message": f"邮件已发送至 {to}"}
    except Exception as e:
        return {"error": f"发送失败: {str(e)}"}
```

### 2. 错误处理

工具执行失败的三种常见情况，以及如何处理：

```python
import requests
from typing import Any

def call_external_api(url: str, timeout: int = 10) -> dict[str, Any]:
    """
    调用外部 API，包含完整的错误处理。
    Agent 看到错误信息后会告知用户或重试。
    """
    try:
        response = requests.get(url, timeout=timeout)

        # HTTP 错误
        if response.status_code == 404:
            return {"error": f"资源不存在: {url}"}
        elif response.status_code == 401:
            return {"error": "认证失败，请检查 API Key"}
        elif response.status_code == 429:
            return {"error": "请求过于频繁，请稍后再试"}
        elif response.status_code >= 500:
            return {"error": f"服务端错误 ({response.status_code})，请稍后重试"}

        response.raise_for_status()
        return {"success": True, "data": response.json()}

    except requests.Timeout:
        return {"error": f"请求超时（{timeout}秒），请检查网络或增加超时时间"}

    except requests.ConnectionError:
        return {"error": "网络连接失败，请检查网络"}

    except requests.RequestException as e:
        return {"error": f"API 请求异常: {str(e)}"}
```

关键点：**返回结构化错误而不是抛异常**——这样 Agent 能理解发生了什么，进而告知用户或采取备选方案。

### 3. 超时控制

```python
import signal

def with_timeout(func, args=(), kwargs=None, timeout: int = 30):
    """
    给工具函数加超时限制。
    适用于可能卡住的工具（网络请求、数据库查询等）。
    """
    if kwargs is None:
        kwargs = {}

    def handler(signum, frame):
        raise TimeoutError(f"工具执行超时（{timeout}秒）")

    old_handler = signal.signal(signal.SIGALRM, handler)
    signal.alarm(timeout)

    try:
        result = func(*args, **kwargs)
        signal.alarm(0)  # 取消闹钟
        return result
    except TimeoutError as e:
        return {"error": str(e)}
    finally:
        signal.alarm(0)
        signal.signal(signal.SIGALRM, old_handler)
```

Windows 不支持 `signal`，跨平台方案用 `concurrent.futures`：

```python
from concurrent.futures import ThreadPoolExecutor, TimeoutError

def call_with_timeout(func, *args, timeout: int = 30, **kwargs):
    """跨平台的超时控制方案"""
    with ThreadPoolExecutor(max_workers=1) as executor:
        future = executor.submit(func, *args, **kwargs)
        try:
            return future.result(timeout=timeout)
        except TimeoutError:
            future.cancel()
            return {"error": f"工具执行超时（{timeout}秒）"}
```

---

## 组合多个 Tool 的真实场景

下面是一个更完整的例子——实现三个工具并组合使用：

```python
"""
三个生产级工具：
1. search_web   —— 搜索互联网
2. send_email   —— 发送邮件
3. read_file    —— 读取本地文件
"""

# ── 工具 Schema ──
TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "search_web",
            "description": "搜索互联网获取最新信息。用于查找实时数据、新闻、文档。结果返回标题和 URL。",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词"},
                    "max_results": {"type": "integer", "description": "最大结果数", "default": 5}
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "send_email",
            "description": "发送电子邮件。用户明确要求发邮件时才使用。",
            "parameters": {
                "type": "object",
                "properties": {
                    "to": {"type": "string", "description": "收件人邮箱"},
                    "subject": {"type": "string", "description": "邮件主题"},
                    "body": {"type": "string", "description": "邮件正文，支持 Markdown"}
                },
                "required": ["to", "subject", "body"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "读取本地文件内容。当用户要求查看某个文件时使用。只读操作，不会修改文件。",
            "parameters": {
                "type": "object",
                "properties": {
                    "filepath": {"type": "string", "description": "文件的绝对路径"},
                    "encoding": {"type": "string", "description": "文件编码，默认 utf-8", "default": "utf-8"}
                },
                "required": ["filepath"]
            }
        }
    }
]

# ── 工具实现（含错误处理和输入验证）──
import os, re, json
from pathlib import Path

def search_web(query: str, max_results: int = 5) -> dict:
    """搜索互联网"""
    if not query.strip():
        return {"error": "搜索关键词不能为空"}
    if max_results > 10:
        return {"error": "最多返回 10 条结果"}

    # 这里用一个免费的搜索 API（演示用）
    try:
        import requests
        resp = requests.get(
            "https://api.duckduckgo.com/",
            params={"q": query, "format": "json"},
            timeout=10
        )
        resp.raise_for_status()
        data = resp.json()
        results = data.get("RelatedTopics", [])[:max_results]
        return {
            "query": query,
            "results": [
                {"title": r.get("Text", ""), "url": r.get("FirstURL", "")}
                for r in results if r.get("Text")
            ]
        }
    except Exception as e:
        return {"error": f"搜索失败: {str(e)}"}


def send_email(to: str, subject: str, body: str) -> dict:
    """发送邮件"""
    if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", to):
        return {"error": f"无效的邮箱地址: {to}"}
    if len(subject) > 200:
        return {"error": "邮件主题不能超过 200 字符"}

    # 生产环境：接入 SendGrid、Resend 等邮件服务
    return {
        "success": True,
        "message": f"邮件已发送至 {to}",
        "preview": {"subject": subject, "body": body[:200]}
    }


def read_file(filepath: str, encoding: str = "utf-8") -> dict:
    """读取文件"""
    path = Path(filepath).resolve()

    if not path.exists():
        return {"error": f"文件不存在: {filepath}"}
    if path.is_dir():
        return {"error": f"路径是一个目录，不是文件: {filepath}"}
    if path.stat().st_size > 10 * 1024 * 1024:  # 10MB
        return {"error": "文件超过 10MB，不能直接读取"}

    try:
        content = path.read_text(encoding=encoding)
        return {
            "filepath": str(path),
            "size": len(content),
            "lines": content.count("\n") + 1,
            "content": content[:5000]  # 只返回前 5000 字符
        }
    except UnicodeDecodeError:
        return {"error": f"文件编码不是 {encoding}，无法读取"}
    except Exception as e:
        return {"error": f"读取失败: {str(e)}"}


# 工具映射
TOOL_MAP = {
    "search_web": search_web,
    "send_email": send_email,
    "read_file": read_file,
}
```

---

## 给 Tool 加缓存

如果同一个工具被频繁调用且结果稳定（如地理位置查询），加缓存能显著降低成本：

```python
from functools import lru_cache
import hashlib

# 方案 1：简单的内存缓存
@lru_cache(maxsize=128)
def geocode(address: str) -> dict:
    """地理编码——查询地址的经纬度。结果稳定，适合缓存。"""
    # ... API 调用
    pass

# 方案 2：基于参数的缓存（适用于字典参数）
_cache: dict[str, dict] = {}

def cached_tool(tool_name: str, **kwargs) -> dict:
    """带缓存的工具调用包装器"""
    cache_key = f"{tool_name}:{hashlib.md5(json.dumps(kwargs, sort_keys=True).encode()).hexdigest()}"

    if cache_key in _cache:
        return {"cached": True, **_cache[cache_key]}

    result = TOOL_MAP[tool_name](**kwargs)
    if "error" not in result:  # 只缓存成功的结果
        _cache[cache_key] = result

    return result
```

## 总结

| 内容 | 要点 |
|------|------|
| **Schema 核心** | name（唯一）+ description（何时用）+ parameters（长什么样子） |
| **Schema 技巧** | 认真写 description，用 enum 限制选项，非必填参数别放 required |
| **输入验证** | 永远不信任 LLM 传的参数，格式、长度、范围都要校验 |
| **错误处理** | 返回结构化错误，不抛异常。分类处理 HTTP 错误、超时、连接失败 |
| **超时控制** | 每个可能卡住的工具都要加超时，推荐 `concurrent.futures` |
| **缓存** | 结果稳定的工具加 lru_cache，省钱又提速 |

好 Tool 决定 Agent 的下限。Tool 写得越稳，Agent 的表现越可靠。

## 关联阅读

- [构建第一个 Agent](/dev/build-agent) —— 把这三个工具放进 Agent 循环中
- [Agent 核心概念](/dev/agent-intro) —— 理解 Tool 在 Agent 架构中的位置
- [Function Calling](/terms/function-calling) —— OpenAI 的 Tool Calling 协议细节
