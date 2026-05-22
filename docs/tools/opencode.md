---
title: OpenCode
description: 开源 AI 编程助手——支持多模型接入，终端 + IDE 插件双形态，可自部署
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# OpenCode

## 一句话定位

**开源 AI 编程助手**——不绑死任何模型，终端和 IDE 都能用，可以完全在自己掌控下运行。

## 基本信息

| 项目 | 详情 |
|------|------|
| 公司 | 开源社区 |
| 价格 | 免费（开源） |
| 支持模型 | 任何兼容 OpenAI API 的模型 |
| 平台 | macOS / Windows / Linux |
| 形态 | 终端 CLI + VS Code 插件 |

## 核心功能

### 🖥️ 终端模式
在终端中直接使用 AI 编程助手：
- 交互式对话
- 文件创建和编辑
- 代码生成和修改
- 命令执行

### 🔌 VS Code 插件
侧边栏集成，提供类似 Copilot Chat 的体验。

### 🧩 多模型接入
不绑定特定模型，你可以接入：
- OpenAI (GPT-4o / o1)
- Anthropic (Claude 3.5 Sonnet)
- DeepSeek
- 本地模型 (Ollama / LM Studio)
- 任何兼容 OpenAI API 格式的服务

### 🔒 可自部署
完全在你本地或自己的服务器上运行，代码安全有保障。不需要把代码发送到你不信任的第三方。

### 📁 项目感知
能读取项目文件结构，理解代码上下文。

## 优势

- **完全免费**：开源项目，不需要付费
- **模型自由**：想用什么模型就用什么模型
- **数据安全**：代码不出你的机器，适合敏感项目
- **可定制**：开源意味着你可以修改任何行为
- **多形态**：终端和 IDE 都能用，适合不同工作流

## 不足

- 需要自己配置 API Key
- 自己花 API 费用（虽然通常很低）
- 功能不如 Cursor/Windsurf 丰富
- 需要一定的技术基础（配置模型、环境等）
- 社区相对较小，教程较少

## 适合谁？

- ✅ 开源爱好者
- ✅ 对数据安全有高要求的团队
- ✅ 已经买了 API 额度、不想再付工具订阅费的开发者
- ✅ 喜欢终端操作的极客
- ✅ 需要使用本地模型的场景
- ⚠️ 追求开箱即用体验的用户建议选 Cursor 或 Copilot

## 快速上手

```bash
# 安装 OpenCode
npm install -g @opencode-ai/cli

# 配置 API Key
export OPENAI_API_KEY="your-api-key"

# 开始使用
opencode "帮我写一个 Express 服务器"
```

也可以通过 VS Code 插件商店搜索 "OpenCode" 安装 IDE 版本。

## 模型配置示例

```yaml
# opencode.config.yml
providers:
  openai:
    api_key: ${OPENAI_API_KEY}
    model: gpt-4o
  anthropic:
    api_key: ${ANTHROPIC_API_KEY}
    model: claude-3-5-sonnet-latest
  deepseek:
    api_key: ${DEEPSEEK_API_KEY}
    base_url: https://api.deepseek.com
    model: deepseek-chat
```

## 关联阅读

- [Cursor](/tools/cursor) —— 商业 AI IDE 对比
- [GitHub Copilot](/tools/copilot) —— 最流行的 AI 编程插件对比
- [DeepSeek](/tools/deepseek) —— 性价比最高的模型搭配
