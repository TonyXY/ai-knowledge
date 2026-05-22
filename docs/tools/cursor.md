---
title: Cursor
description: AI 原生 IDE——基于 VS Code，内置 AI 补全、对话、多文件编辑，让编程效率倍增
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# Cursor

## 一句话定位

**AI 原生 IDE**——基于 VS Code 深度改造，将 AI 融入编程的每一个环节，是目前最受欢迎的 AI 编程工具。

## 基本信息

| 项目 | 详情 |
|------|------|
| 公司 | Anysphere |
| 价格 | 免费版 / Pro $20/月 / Business $40/人/月 |
| 支持模型 | GPT-4o / Claude 3.5 Sonnet / 自定义 API |
| 平台 | macOS / Windows / Linux |
| 基于 | VS Code（开源分支） |

## 核心功能

### ⌨️ Tab 补全
在编码时，Cursor 会自动预测你的下一行代码。按 Tab 接受，继续写继续预测。补全质量极高，能理解上下文意图。

### ✨ Ctrl+K 内联编辑
选中一段代码 → 按 `Ctrl+K`（Mac: `Cmd+K`）→ 输入你的需求（如"添加错误处理""改成 async/await 写法"），Cursor 直接原地修改。

### 💬 Chat 对话
侧边栏内嵌 AI 对话，可以：
- 选中代码提问"这段代码在做什么？"
- 让 AI 解释报错信息
- 讨论技术方案

### 🎼 Composer 多文件编辑
Composer 是 Cursor 的杀手级功能——可以一次性修改多个文件，自动创建新文件，完成跨文件的复杂重构。

### 📋 上下文感知
Cursor 会分析整个项目结构，自动将相关文件加入 AI 的上下文中。你也可以用 `@` 标记手动指定文件、文件夹、文档等作为上下文。

### 🏷️ Rules 规则
可以在项目根目录创建 `.cursorrules` 文件，定义项目规范、代码风格等偏好，Cursor 会在所有 AI 交互中遵守这些规则。

## 优势

- **AI 融入最深**：不止是代码补全，而是整个开发流程的 AI 化
- **基于 VS Code**：熟悉的界面，所有 VS Code 插件都能用
- **Composer**：多文件编辑能力远超同类产品
- **模型选择自由**：可以用 GPT-4o、Claude、甚至自己的 API Key
- **上下文管理**：@ 标记系统让上下文控制非常精准

## 不足

- Pro 版有月度请求限额（500 次 fast requests / 月）
- 对网络要求较高（所有 AI 功能都需联网）
- 偶尔会过度 AI 化（Tab 补全太多可能干扰思路）
- 不是完全开源

## 适合谁？

- ✅ 日常编程开发的开发者
- ✅ 需要频繁重构、跨文件修改的场景
- ✅ 从 VS Code 迁移过来的用户
- ✅ 中高级开发者（能判断 AI 代码质量）
- ⚠️ 完全新手建议先学基础，再借助 AI 加速

## 快速上手

1. [下载 Cursor](https://cursor.sh) 并安装
2. 登录账号（支持 GitHub 登录）
3. 打开任意项目文件夹
4. 开始编码，Tab 补全会自动触发
5. 按 `Ctrl+K` 试试内联编辑
6. 按 `Ctrl+L` 打开 Chat 面板

## 关联阅读

- [用 Cursor 搭建网页](/practices/cursor-website) —— 实战教程
- [GitHub Copilot](/tools/copilot) —— 另一款主流 AI 编程工具对比
- [Function Calling](/terms/function-calling)、[Agent](/terms/agent)
