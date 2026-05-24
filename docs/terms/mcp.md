---
title: MCP（Model Context Protocol）
description: 模型上下文协议——AI 与外部工具/数据源交互的开放标准
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# MCP（Model Context Protocol）

## 一句话解释

**MCP（Model Context Protocol）** 是由 Anthropic 提出的**开放协议**，统一了 AI 模型与外部工具、数据源之间的通信方式——相当于 AI 世界的「USB 接口」，让任何模型都能即插即用地连接各种工具和数据。

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;margin:16px 0;overflow-x:auto;text-align:center">
  <svg viewBox="0 0 560 300" style="max-width:560px;width:100%">
    <!-- Host -->
    <rect x="40" y="15" width="200" height="44" rx="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
    <text x="140" y="34" text-anchor="middle" font-size="12" fill="#4338ca" font-weight="700">🏠 Host 宿主应用</text>
    <text x="140" y="50" text-anchor="middle" font-size="9" fill="#6366f1">Claude Desktop / Cursor / IDE</text>

    <!-- Host→Client arrow -->
    <polygon points="136,72 140,80 144,72" fill="#6366f1"/>
    <line x1="140" y1="59" x2="140" y2="72" stroke="#6366f1" stroke-width="1.5"/>

    <!-- Client (inside Host) -->
    <rect x="50" y="80" width="180" height="32" rx="8" fill="#6366f1" opacity="0.1" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,3"/>
    <text x="140" y="101" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">🔌 MCP Client</text>

    <!-- Client→Protocol arrow -->
    <polygon points="136,124 140,132 144,124" fill="#6366f1"/>
    <line x1="140" y1="112" x2="140" y2="124" stroke="#6366f1" stroke-width="1.5"/>

    <!-- Protocol -->
    <rect x="50" y="132" width="180" height="24" rx="12" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>
    <text x="140" y="149" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">📋 MCP 协议 (JSON-RPC)</text>

    <!-- Protocol→Server arrow -->
    <polygon points="136,168 140,176 144,168" fill="#6366f1"/>
    <line x1="140" y1="156" x2="140" y2="168" stroke="#6366f1" stroke-width="1.5"/>

    <!-- Server -->
    <rect x="50" y="176" width="180" height="32" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
    <text x="140" y="197" text-anchor="middle" font-size="11" fill="#166534" font-weight="600">🗄️ MCP Server</text>

    <!-- Server connections to data sources -->
    <path d="M230 192 L280 192 L280 40 L300 40" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
    <polygon points="298,36 306,40 298,44" fill="#94a3b8"/>
    <path d="M230 192 L280 192 L280 80 L300 80" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
    <polygon points="298,76 306,80 298,84" fill="#94a3b8"/>
    <path d="M230 192 L280 192 L280 120 L300 120" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
    <polygon points="298,116 306,120 298,124" fill="#94a3b8"/>
    <path d="M230 192 L280 192 L280 150 L300 150" fill="none" stroke="#94a3b8" stroke-width="1.2"/>
    <polygon points="298,146 306,150 298,154" fill="#94a3b8"/>

    <!-- Data sources -->
    <text x="390" y="30" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">连接的数据源</text>
    <rect x="310" y="38" width="160" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="390" y="57" text-anchor="middle" font-size="10" fill="#475569">📁 文件系统</text>
    <rect x="310" y="70" width="160" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="390" y="89" text-anchor="middle" font-size="10" fill="#475569">🗃️ 数据库</text>
    <rect x="310" y="102" width="160" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="390" y="121" text-anchor="middle" font-size="10" fill="#475569">🔗 GitHub / Slack</text>
    <rect x="310" y="134" width="160" height="28" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
    <text x="390" y="153" text-anchor="middle" font-size="10" fill="#475569">🌐 搜索 / 浏览器</text>

    <text x="280" y="270" text-anchor="middle" font-size="11" fill="#94a3b8">Host 嵌入 Client → 通过 MCP 协议连接 Server → 统一访问各种数据源</text>
  </svg>
</div>

## 通俗类比

想象一下 USB 出现之前的世界：每个外设都需要专用接口和驱动。**MCP** 就是 AI 领域的 USB 标准：

- 不用 MCP：每个工具都要写专属集成代码。为 ChatGPT 写一套，为 Claude 再写一套，为 DeepSeek 又写一套。
- 用 MCP：一次开发，随处可用。就像 USB 设备插到任何电脑上都能工作。

MCP 让 AI 应用开发从**「点对点集成」**变为**「标准化对接」**。

## 技术定义

MCP 定义了一套**客户端-服务器架构**，包含三个核心角色：

```
Host（宿主应用）── 连接 MCP Client
  │        例如：Claude Desktop、IDE、AI 应用
  │
MCP Client ── 管理连接、发送请求
  │
  ▼
MCP Server ── 提供具体能力和资源
      例如：文件系统、数据库、Git、Slack、浏览器
```

### 核心能力

| 能力 | 说明 |
|------|------|
| **Tools** | 模型可通过 Server 调用外部函数（查询数据库、发消息等） |
| **Resources** | Server 暴露数据资源供模型读取（文件、API 响应等） |
| **Prompts** | Server 提供预设提示词模板 |
| **Sampling** | Server 请求模型生成内容（反向调用） |

### 一个 MCP 请求的生命周期

```
用户："查询昨天的销售数据"
  → Host 将请求发给模型
  → 模型识别需要调用工具，发出 MCP 请求
  → MCP Client 转发给对应的 MCP Server
  → Server 执行 SQL 查询，返回结果
  → 模型根据结果组织回答
  → 用户看到："昨天销售额是 ¥128,000..."
```

## 为什么 MCP 重要

在 MCP 出现之前，每个 AI 工具集成都是**定制开发**：

```
传统方式                    MCP 方式
─────────                  ─────────
ChatGPT + 数据库 ← 定制代码  ChatGPT ──┐
Claude  + 数据库 ← 另写代码  Claude  ──┼── MCP ── 数据库 Server
DeepSeek+ 数据库 ← 再写代码  DeepSeek──┘
```

MCP 让工具提供方**只需开发一个 Server**，所有遵守 MCP 的 AI 应用都能自动使用。

## 与 Function Calling 的关系

| | Function Calling | MCP |
|--|----------------|-----|
| 范畴 | 模型能力 | 生态协议 |
| 方向 | 模型 → 调用函数 | 双向：模型 ↔ 工具 |
| 标准化 | 厂商私有 | 开放标准 |
| 复用性 | 每次重复配置 | 一次开发多处使用 |

两者是互补关系：Function Calling 是模型**调用工具的能力**，MCP 是**工具如何被发现的协议**。

## 当前生态

截至 2025 年，MCP 已获得广泛支持：

- **客户端**：Claude Desktop、OpenCode、Cursor、Windsurf、VS Code（扩展）
- **Server 生态**：PostgreSQL、SQLite、GitHub、Git、Slack、Notion、Figma、文件系统等 1000+ 开源 Server
- **模型**：Claude、GPT、DeepSeek 等通过兼容层支持

## 关联术语

- [AI Skills](/terms/ai-skills) — MCP 是 Skills 的协议层
- [Function Calling](/terms/function-calling) — MCP 的底层调用机制
- [Agent](/terms/agent) — MCP 是 Agent 连接外部世界的管道
- [RAG](/terms/rag) — MCP 也可用于连接知识库资源

## 快速记忆

MCP = AI 世界的 USB 接口。没 USB 之前，每个外设都要专用线。有了 MCP，你写的工具模型都能直接用。一次开发，处处可用。

## 延伸阅读

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [MCP GitHub 组织](https://github.com/modelcontextprotocol)
- [Awesome MCP Servers](https://github.com/punkpeye/awesome-mcp-servers)
- [MCP 协议实践](/dev/mcp-practice) — 构建你自己的 MCP Server
