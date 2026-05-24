---
title: MCP 生态与流行技能
description: 当前流行的 MCP Server 和 AI Agent Skills 全景一览
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# MCP 生态与流行技能

截至 2026 年中，MCP 生态已发展到 **19,000+ Server**、月 SDK 下载量 **9,700 万**。以下按类别梳理最流行、最可靠的 Server 和 Skills。

---

## 官方参考 Server（Anthropic 出品）

最基础、最稳定的起点。

| Server | 用途 | 安装 |
|--------|------|------|
| **Filesystem** | 安全的文件读写操作 | `npx -y @modelcontextprotocol/server-filesystem` |
| **Git** | Git 仓库管理（status/diff/commit/branch） | `npx -y @modelcontextprotocol/server-git` |
| **GitHub** | GitHub API 全功能（Issues/PR/Code Search） | `npx -y @modelcontextprotocol/server-github` |
| **PostgreSQL** | 只读数据库访问 + Schema 检查 | `npx -y @modelcontextprotocol/server-postgres` |
| **Memory** | 知识图谱持久化记忆（JSON 文件后端） | `npx -y @modelcontextprotocol/server-memory` |
| **Fetch** | Web 内容抓取和转换 | `npx -y @modelcontextprotocol/server-fetch` |
| **Brave Search** | 网页和本地搜索 | `npx -y @modelcontextprotocol/server-brave-search` |
| **Puppeteer** | 浏览器自动化与网页抓取 | `npx -y @modelcontextprotocol/server-puppeteer` |
| **Sequential Thinking** | 分步推理与动态思维过程 | `npx -y @modelcontextprotocol/server-sequential-thinking` |

---

## 开发者工具

| Server | 维护方 | 用途 | 说明 |
|--------|--------|------|------|
| **Playwright** | Microsoft ⭐ 11K+ | 浏览器自动化（E2E 测试） | 工业级，比 Puppeteer 更稳定 |
| **GitHub（官方）** | GitHub ⭐ 15K+ | 完整 GitHub 操作 | OAuth + 远程 MCP 支持 |
| **GitLab** | 官方 | GitLab MR/CI/CD 管理 | 和 GitHub Server 对应 |
| **Docker** | 社区 | 容器/镜像/网络管理 | 管理 Docker 环境 |
| **Kubernetes** | 社区 ⭐ 800+ | 多集群 K8s 管理（50+ 工具） | 生产级编排 |
| **Terraform** | HashiCorp ⭐ 2K+ | IaC 资源管理 | 官方维护 |
| **AWS Labs** | AWS ⭐ 4K+ | 20+ AWS 服务（S3/Lambda/DynamoDB） | 云基础设施 |
| **Cloudflare** | Cloudflare ⭐ 1K+ | Workers/KV/R2/D1 | Edge 基础设施 |
| **Vercel** | 社区 | 部署和环境管理 | 前端/Serverless 部署 |
| **JetBrains** | JetBrains ⭐ 2K+ | 连接 IntelliJ/PyCharm/WebStorm | IDE 集成 |

---

## 数据库

| Server | 用途 | 特点 |
|--------|------|------|
| **PostgreSQL** | 关系型数据库 | Schema 检查 + 安全查询 |
| **Supabase** | BaaS 平台 | 全功能后端服务 |
| **MongoDB** | 文档数据库 | 官方维护 |
| **Redis** | KV + Pub/Sub | Agent 协调 |
| **SQLite** | 嵌入式数据库 | BI 能力 |
| **BigQuery** | 数据仓库 | Google Cloud |
| **Snowflake** | 云数据仓库 | 企业级 |
| **DuckDB** | 嵌入式 OLAP | 轻量分析 |

---

## 搜索与浏览器

| Server | 维护方 | 用途 | 特点 |
|--------|--------|------|------|
| **Brave Search** | Brave | 网页+本地搜索 | 隐私优先，免费 2000 次/月 |
| **Tavily** | Tavily | AI 原生搜索 | 结果预格式化给 LLM |
| **Exa** | Exa | 神经语义搜索 | 语义+相似度搜索 |
| **Firecrawl** | Firecrawl | 网站爬取+结构化数据 | 支持 JS 渲染 |
| **Context7** | Context7 | 技术文档查询 | 库/框架文档直接查 |
| **DuckDuckGo** | 社区 | 轻量搜索 | 无需 API Key |

---

## 通信与协作

| Server | 用途 | 说明 |
|--------|------|------|
| **Slack** | 消息/频道/搜索 | Zencoder 维护版，比官方版更稳定 |
| **Notion** | 数据库/页面/内容管理 | 官方维护 |
| **Linear** | Issue 跟踪/项目管理 | 官方维护 |
| **Google Workspace** | Calendar/Drive/Gmail/Sheets | 全 Google 套件 |
| **Jira + Confluence** | 问题跟踪/知识库 | Atlassian 套件 |
| **Obsidian** | Vault 访问/笔记管理 | 本地知识库连接 |
| **Todoist** | 任务管理 | 社区维护 |
| **Discord** | 社区通信 | 社区维护 |

---

## AI 与知识管理

| Server | 用途 | 说明 |
|--------|------|------|
| **Memory** | 知识图谱持久记忆 | Anthropic 官方 |
| **Mem0** | 语义记忆层 | SaaS 记忆服务 |
| **Letta** | Agent 状态管理 | 框架级记忆 |
| **Pinecone** | 向量数据库 | 语义搜索 |
| **Qdrant** | 向量数据库 | 自托管友好 |
| **Sequential Thinking** | 分步推理 | OpenAI o1/DeepSeek-R1 的 MCP 版 |

---

## 云平台

| Server | 用途 | 说明 |
|--------|------|------|
| **AWS** | 20+ 服务 | S3/Lambda/DynamoDB/CloudWatch |
| **Azure** | Storage/Cosmos DB/DevOps | 官方维护 |
| **GCP** | BigQuery/Compute/GKE | Google 官方 |
| **Cloudflare** | Workers/KV/R2/D1 | Edge 基础设施 |
| **Vercel** | 前端部署 | 社区维护 |
| **Sentry** | 错误追踪 | 官方 MCP Server |

---

## AI Skills（Agent 技能包）

Skills 分为两类：**🛠️ 内置配置型**（在项目目录下写配置文件即可）和 **📦 社区安装包**（通过安装命令下载他人开发的技能包）。

---

### 🛠️ 内置配置型（Profile / Rules）

写在项目目录的配置文件中，AI 助手自动读取。

| 类型 | 所属平台 | 推荐理由 | 使用方法 |
|------|---------|---------|---------|
| **Project Context** | Claude Code | 让 AI 理解项目结构，回答更精准 | 根目录创建 `CLAUDE.md`，写入架构说明和编码规范 |
| **Code Review** | Claude Code | 自动化审查规则，减少人工 | `.claude/rules/` 下添加 `.md` 定义审查标准 |
| **Rules** | Cursor | 框架/风格/架构约定 | 项目根目录写 `.cursorrules` 文件 |
| **Rules** | Windsurf | 同上，格式兼容 | 项目根目录写 `.windsurfrules` 文件 |
| **Workflow** | OpenCode | 定义 Agent 任务拆解流程 | 编写 `.opencode/` 或 `.clinerules` 文件 |
| **Tool Config** | OpenCode | 白名单机制控制 Agent 工具范围 | 配置文件中声明允许的命令和 API |

---

### 📦 社区安装包（可下载技能包）

通过 `npx skills add`、`git clone` 或专用安装脚本安装，兼容 Claude Code / Cursor / OpenCode / Codex 等主流 AI 编程助手。

| 仓库 | ⭐ Stars | 技能数 | 推荐理由 | 安装方式 | GitHub |
|------|---------|--------|---------|---------|--------|
| **obra/superpowers** | 161K | 14+ 个 | 完整的软件开发方法论，含 TDD、系统调试、代码审查、并行 Agent 开发等工作流 | `curl -fsSL https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/scripts/install.sh \| bash` | [链接](https://github.com/obra/superpowers) |
| **affaan-m/everything-claude-code** | 182K | 183 个 | 最全的技能库——48 个 Agent、183 个技能、79 个命令、跨 Claude Code/Cursor/OpenCode/Codex | `git clone && ./install.sh` | [链接](https://github.com/affaan-m/everything-claude-code) |
| **addyosmani/agent-skills** | 44K | 23 个 | Google 工程文化沉淀——生产级工程技能，含架构设计、安全审查、性能优化、API 规范 | `gemini skills install ./agent-skills/skills/` | [链接](https://github.com/addyosmani/agent-skills) |
| **davila7/claude-code-templates** | 27K | 100+ 个 | 即装即用的 Agent/命令/MCP 合集，支持按需选择 | `npx claude-code-templates@latest --agent <name>` | [链接](https://github.com/davila7/claude-code-templates) |
| **alirezarezvani/claude-skills** | 15K | 313+ 个 | 跨 12 个 AI 编程工具的技能库，覆盖工程/营销/产品/合规/金融等领域 | `git clone && ./scripts/install.sh --tool <tool>` | [链接](https://github.com/AlirezaRezvani/claude-skills) |

### 🚀 Composio（跨平台工具集成平台）

不只是技能包——是一个完整的工具集成平台，安装后在 AI 编程助手中自动可用。

| 功能 | 说明 |
|------|------|
| **接入应用** | 500+ 应用（Slack/GitHub/Notion/Google Workspace/Figma/X/TikTok） |
| **可用工具** | 20,000+ 工具，覆盖搜索、执行、触发 |
| **认证管理** | 一次 OAuth 连接，所有命令自动携带凭据 |
| **安装方式** | `composio login` → `composio add github` → 在 AI 助手中直接使用 |
| **兼容助手** | Claude Code / Codex / OpenCode / Cursor / VS Code Copilot |

### 官方示例

| 仓库 | ⭐ Stars | 说明 |
|------|---------|------|
| **anthropics/claude-code** | 125K | Claude Code 官方仓库，内置 CLI、GitHub Action 和参考插件实现 |

---

### 🔧 安装命令说明

`npx skills add` 是跨 AI 助手的标准命令，用于安装社区开发的技能包：

```bash
# 安装 Composio 技能包
npx skills add composiohq/skills

# 安装 Cline SDK 参考技能
npx skills add cline/sdk-skill

# 查看已安装技能
npx skills list
```

安装后，AI 助手会自动发现并加载对应技能文件，无需额外配置。

---

## 快速选择指南

| 你要做什么 | 推荐 Server |
|-----------|------------|
| 文件操作 | Filesystem |
| 代码管理 | GitHub / Git |
| 数据库查询 | PostgreSQL / Supabase |
| 网页搜索 | Brave Search / Tavily |
| 浏览器自动化 | Playwright |
| 部署管理 | Vercel / Cloudflare |
| 项目管理 | Linear / Notion |
| 知识记忆 | Memory / Mem0 |
| 云基础设施 | AWS / Terraform |
| 错误监控 | Sentry |

---

## 关联阅读

- [MCP 详解](/terms/mcp) — 协议概念与架构
- [MCP 协议实践](/dev/mcp-practice) — 构建自己的 MCP Server
- [Agent 核心概念](/dev/agent-intro) — Agent 的底层原理
