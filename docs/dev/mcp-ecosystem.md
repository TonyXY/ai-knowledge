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

## AI Skills（可安装技能包）

Skills 是社区开发者编写的可安装技能包，通过 `npx skills add` 标准命令安装，兼容 Claude Code、Cursor、OpenCode、Codex 等主流 AI 编程助手。

### 📦 技能仓库

| 仓库 | 技能数 | 推荐理由 | 安装命令 |
|------|--------|---------|---------|
| **farmage/opencode-skills** | 66 个 | 覆盖 12 个领域（Vue/React/Spring Boot/Flutter 等框架 + 安全/监控/Embedded），含 9 个工作流命令和 365 份按需加载的参考文档 | `git clone https://github.com/farmage/opencode-skills.git && cd opencode-skills && ./install.sh` |
| **amitdmore/opencode-power-pack** | 11 个 | 代码审查、安全审计、功能开发、前端设计四大类，含多 Agent 协作的 code-review（置信度过滤+交叉复核）和 OWASP 分桶的 security-review | `make install`（全局）或 `make install-local`（项目级） |
| **composiohq/skills** | 14+ 条规则 | Composio 官方技能包——Tool Router 最佳实践、实时 Webhook/Event 处理、1000+ SaaS 认证集成 | `npx skills add composiohq/skills` |
| **cline/sdk-skill** | 1 个（深度参考） | Cline Agent SDK 完整参考——API 面选择、自定义工具、插件系统、多 Agent 团队编排、生产部署 | `npx skills add cline/sdk-skill` |

### 🚀 Composio（跨平台工具集成平台）

不只是技能包——是一个完整的工具集成平台，安装后在 AI 编程助手中自动可用。

| 功能 | 说明 |
|------|------|
| **接入应用** | 500+ 应用（Slack/GitHub/Notion/Google Workspace/Figma/X/TikTok） |
| **可用工具** | 20,000+ 工具，覆盖搜索、执行、触发 |
| **认证管理** | 一次 OAuth 连接，所有命令自动携带凭据 |
| **安装方式** | `composio login` → `composio add github` → 在 AI 助手中直接使用 |
| **兼容助手** | Claude Code / Codex / OpenCode / Cursor / VS Code Copilot |

### 🔧 标准安装命令说明

`npx skills add` 是跨 AI 助手的标准技能安装命令：

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
