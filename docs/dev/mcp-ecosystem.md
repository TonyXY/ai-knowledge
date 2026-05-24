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

## AI Skills（Agent 技能）

Skills 是赋予 Agent 特定领域能力的模块化配置，分为三大生态。

### Claude Code Skills

| Skill | 推荐理由 | 使用方法 |
|-------|---------|---------|
| **Project Context** | 让 Claude 理解项目结构和规范，回答更精准 | 在项目根目录创建 `CLAUDE.md` 或 `.claude/` 文件夹，写入架构说明和编码规范 |
| **Code Review** | 自动化 Code Review 规则，减少人工审核时间 | 在 `.claude/rules/` 下添加 `.md` 文件，定义 Review 标准和检查清单 |
| **Test Generation** | 统一测试风格，自动生成符合规范的测试用例 | 在 `CLAUDE.md` 中指定测试框架、Mock 策略、覆盖率目标 |
| **Documentation** | 保持文档与代码同步，减少文档债务 | 配置文档模板和生成规则，每次提交时自动建议更新关联文档 |

### Cursor / Windsurf Rules

| Skill | 推荐理由 | 使用方法 |
|-------|---------|---------|
| **Framework Rules** | 确保 AI 生成的代码框架一致，减少重构 | 在 `.cursorrules` 或 `.windsurfrules` 中写明框架版本、目录结构、命名约定 |
| **Style Rules** | 让 AI 输出自动匹配项目风格，无需手动调整 | 在规则文件中指定 CSS 方案、组件库、代码风格（如 "使用 Tailwind 而非 CSS Modules"） |
| **Architecture Rules** | 防止 AI 写出不符合架构设计的代码 | 描述项目的分层结构（如 "API 层 → Service 层 → Repository 层"），设定边界 |
| **Testing Rules** | 保证每次生成的代码都有对应测试 | 配置测试文件命名规范、Mock 策略和覆盖率要求 |

### OpenCode Skills

| Skill | 推荐理由 | 使用方法 |
|-------|---------|---------|
| **Agent Workflow** | 定义 Agent 如何处理复杂任务 | 编写 `.clinerules` 文件，描述任务拆解步骤和决策流程 |
| **Tool Config** | 限制 Agent 可用工具范围，防止误操作 | 在配置文件中声明 Agent 可调用的命令和 API，白名单机制 |
| **Memory Instructions** | 控制 Agent 如何记忆和引用历史信息 | 设置记忆持久化策略（文件/数据库/向量库），定义记忆回收规则 |
| **Safety Rules** | 关键安全边界，防止破坏性操作 | 限制文件写入范围、禁止执行的命令、需要人工确认的操作列表 |

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
