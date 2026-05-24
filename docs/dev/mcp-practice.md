---
title: "MCP 协议实践"
description: "手写一个 MCP Server——从协议原理到环境搭建、工具定义、客户端连接、接入 AI Agent 的完整实操指南"
difficulty: advanced
---

<DifficultyBadge level="advanced" />

# MCP 协议实践

MCP（Model Context Protocol）是 Anthropic 提出的**大模型与外部工具之间的标准通信协议**。它的核心价值在于：让任何 AI 客户端（Claude Desktop、Cursor、VS Code 插件）用**同一种方式**连接任何工具服务器。

本篇从协议原理出发，带你一步步用 Python 构建一个**可被 AI Agent 调用的 MCP Server**。

## 为什么需要 MCP

在 MCP 出现之前，每个 AI 应用都要自己实现工具对接——Claude 有自己的 Tool 格式，Cursor 有另一套，LangChain 又不同。结果是：

- 工具开发者要为每个平台写一遍适配代码
- 用户换一个 AI 工具就得重新配置一遍工具链
- 生态碎片化，优质工具难以跨平台复用

MCP 解决了这个问题。它定义了统一的标准：

```
你的工具  →  MCP Server  →  AI 客户端（Claude / Cursor / VS Code / ...）
```

一个 MCP Server 写好后，**所有兼容 MCP 的客户端都能直接使用**。

## MCP 协议架构

MCP 采用三层架构：

| 层 | 角色 | 示例 |
|---|------|------|
| **Host** | 发起请求的 AI 应用 | Claude Desktop, Cursor, VS Code 插件 |
| **Client** | 协议层，与 Host 1:1 绑定 | 管理连接、发送请求 |
| **Server** | 提供具体能力的服务端 | 文件搜索、数据库查询、天气预报 |

通信采用 **JSON-RPC 2.0** 格式，支持两种传输方式：

- **stdio**（标准输入输出）：适合本地工具，Server 作为子进程运行
- **SSE**（Server-Sent Events）：适合远程工具，HTTP 长连接

本篇聚焦 **stdio 模式**——最常用、最简单的部署方式。

## 构建一个 MCP Server（文件搜索工具）

### Step 1：环境准备

```bash
pip install mcp
```

`mcp` 是官方 Python SDK，内置了 Server / Client 实现和类型定义。

验证安装：

```bash
python -c "import mcp; print(mcp.__version__)"
```

### Step 2：定义工具能力

我们要实现一个文件搜索 Server，提供**模糊搜索文件名**的能力：

```python
import os
import fnmatch
from pathlib import Path

def search_files(query: str, root_dir: str, max_results: int = 20) -> list[dict]:
    """
    在指定目录下模糊搜索文件。
    
    参数:
        query: 搜索关键词（支持通配符，如 '*.py' 或 'test*'）
        root_dir: 搜索根目录（绝对路径）
        max_results: 最多返回条数
    返回:
        匹配文件列表，每项包含 path、size、modified_time
    """
    results = []
    root_path = Path(root_dir).expanduser().resolve()

    if not root_path.exists():
        return [{"error": f"目录不存在: {root_path}"}]

    for dirpath, dirnames, filenames in os.walk(root_path):
        # 跳过隐藏目录和常见忽略目录
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ('node_modules', '__pycache__', 'venv')]
        
        for filename in filenames:
            if fnmatch.fnmatch(filename, query):
                full_path = Path(dirpath) / filename
                stat = full_path.stat()
                results.append({
                    "path": str(full_path),
                    "size": stat.st_size,
                    "modified": stat.st_mtime,
                })
                if len(results) >= max_results:
                    return results

    return results
```

### Step 3：注册为 MCP Tool

用 `mcp` SDK 将函数注册为工具，定义其名称、描述和参数 Schema：

```python
from mcp.server import Server
from mcp.types import Tool, TextContent
import mcp.server.stdio

# 创建 MCP Server 实例
server = Server("file-searcher")

@server.list_tools()
async def list_tools() -> list[Tool]:
    """向客户端注册可用工具列表"""
    return [
        Tool(
            name="search_files",
            description="在指定目录下模糊搜索文件。支持通配符模式匹配（如 '*.py'、'test*.ts'）。",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "搜索关键词，支持通配符（如 '*.py'、'report*'）",
                    },
                    "root_dir": {
                        "type": "string",
                        "description": "搜索根目录的绝对路径（如 '/home/user/projects'）",
                    },
                    "max_results": {
                        "type": "integer",
                        "description": "最多返回条数，默认 20",
                        "default": 20,
                    },
                },
                "required": ["query", "root_dir"],
            },
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """执行客户端请求的工具调用"""
    if name == "search_files":
        query = arguments.get("query", "*")
        root_dir = arguments.get("root_dir", ".")
        max_results = arguments.get("max_results", 20)

        files = search_files(query, root_dir, max_results)

        if not files:
            return [TextContent(type="text", text="未找到匹配的文件。")]

        # 格式化输出
        lines = [f"找到 {len(files)} 个匹配文件:"]
        for f in files:
            if "error" in f:
                lines.append(f"  ❌ {f['error']}")
            else:
                size_kb = f["size"] / 1024
                lines.append(f"  📄 {f['path']} ({size_kb:.1f} KB)")
        
        return [TextContent(type="text", text="\n".join(lines))]

    raise ValueError(f"未知工具: {name}")
```

### Step 4：启动 Server

使用 stdio 传输层启动 Server，使其作为子进程运行：

```python
import asyncio

async def main():
    """以 stdio 模式启动 MCP Server"""
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options(),
        )

if __name__ == "__main__":
    asyncio.run(main())
```

## 错误处理与日志

MCP Server 的错误处理很关键——Agent 依赖你的工具输出做决策，输出要清晰、可操作：

```python
import logging
import sys

# MCP 通过 stdio 通信，日志必须输出到 stderr
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stderr,
)

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    try:
        if name == "search_files":
            # ... 搜索逻辑 ...
            pass
    except PermissionError:
        logging.error(f"无权限访问: {arguments.get('root_dir')}")
        return [TextContent(type="text", text="错误: 无权限访问该目录")]
    except Exception as e:
        logging.exception("工具执行失败")
        return [TextContent(type="text", text=f"错误: {str(e)}")]

    raise ValueError(f"未知工具: {name}")
```

**关键点：** 日志走 `stderr`（不会干扰 stdio 通道上的 JSON-RPC 通信），返回结果走标准 `TextContent` 类型。

## 客户端连接测试

写好 Server 后，用 MCP Client 验证它是否正常工作：

```python
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def test():
    # 启动 Server 进程
    server_params = StdioServerParameters(
        command="python",
        args=["file_searcher_server.py"],
    )

    async with stdio_client(server_params) as (read, write):
        async with ClientSession(read, write) as session:
            await session.initialize()

            # 获取工具列表
            tools = await session.list_tools()
            print("可用工具:", [t.name for t in tools.tools])

            # 调用工具
            result = await session.call_tool(
                "search_files",
                arguments={
                    "query": "*.md",
                    "root_dir": "/home/user/projects",
                },
            )
            print("搜索结果:", result.content[0].text)

asyncio.run(test())
```

## 接入 AI Agent

MCP Server 开发好之后，可以让 Claude Desktop 或 Cursor 直接使用。以 Claude Desktop 为例，在配置文件中注册你的 Server：

编辑 `~/.config/claude/claude_desktop_config.json`（macOS）：

```json
{
  "mcpServers": {
    "file-searcher": {
      "command": "python",
      "args": ["/path/to/file_searcher_server.py"]
    }
  }
}
```

重启 Claude Desktop 后，问它："在我的 projects 目录下找所有 `.yaml` 配置文件"，Claude 会自动调用你写的 `search_files` 工具。

Cursor 的配置方式类似，在 `.cursor/mcp.json` 中添加同样的条目即可。

## 完整的 MCP Server 骨架

```python
"""
file_searcher_server.py
MCP 文件搜索 Server —— 完整版
依赖: pip install mcp
"""
import os
import sys
import fnmatch
import asyncio
import logging
from pathlib import Path

from mcp.server import Server
from mcp.types import Tool, TextContent
import mcp.server.stdio

# ── 日志（输出到 stderr，避免干扰 stdio 通信）──
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    stream=sys.stderr,
)

# ── Server 配置 ──
server = Server("file-searcher")

# ── 工具实现 ──
def search_files(query: str, root_dir: str, max_results: int = 20) -> list[dict]:
    results = []
    root_path = Path(root_dir).expanduser().resolve()
    if not root_path.exists():
        return [{"error": f"目录不存在: {root_path}"}]
    for dirpath, dirnames, filenames in os.walk(root_path):
        dirnames[:] = [d for d in dirnames if not d.startswith('.') and d not in ('node_modules', '__pycache__', '.git')]
        for filename in filenames:
            if fnmatch.fnmatch(filename, query):
                full_path = Path(dirpath) / filename
                results.append({"path": str(full_path), "size": full_path.stat().st_size})
                if len(results) >= max_results:
                    return results
    return results

# ── Tool 注册 ──
@server.list_tools()
async def list_tools() -> list[Tool]:
    return [
        Tool(
            name="search_files",
            description="在指定目录下模糊搜索文件",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string", "description": "搜索关键词，支持通配符"},
                    "root_dir": {"type": "string", "description": "搜索根目录绝对路径"},
                    "max_results": {"type": "integer", "description": "最大返回数", "default": 20},
                },
                "required": ["query", "root_dir"],
            },
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    try:
        if name == "search_files":
            files = search_files(**arguments)
            if not files:
                return [TextContent(type="text", text="未找到匹配文件")]
            return [TextContent(type="text", text="\n".join(f["path"] for f in files))]
        raise ValueError(f"未知工具: {name}")
    except Exception as e:
        logging.exception("工具调用失败")
        return [TextContent(type="text", text=f"错误: {str(e)}")]

# ── 启动 ──
async def main():
    async with mcp.server.stdio.stdio_server() as (read, write):
        await server.run(read, write, server.create_initialization_options())

if __name__ == "__main__":
    asyncio.run(main())
```

## 推荐资源

- **官方 Python SDK**：[github.com/modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) — 官方模板和示例
- **awesome-mcp-servers**：[github.com/punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — 社区收集的 MCP Server 合集，涵盖数据库、搜索、开发工具等
- **MCP 官方文档**：[modelcontextprotocol.io](https://modelcontextprotocol.io/) — 协议规范和最佳实践

## 总结

MCP 的核心价值在于**标准化**——一次开发，处处使用。你构建的 MCP Server 能被 Claude Desktop、Cursor、VS Code 插件、甚至未来的任何 MCP 兼容应用直接调用。

本篇你学到的：

- ✅ MCP 的三层架构（Host → Client → Server）
- ✅ 用 `mcp` Python SDK 构建 Tool Server
- ✅ 工具注册、调用执行、错误处理
- ✅ stdio 传输模式与日志分离
- ✅ 接入 AI Agent 的配置方法

## 下一步

- [Tool 定义与实现](/dev/tool-definition) — 写出更专业的 Tool Schema
- [构建第一个 Agent](/dev/build-agent) — 把自己写的 MCP Server 接入你的 Agent
