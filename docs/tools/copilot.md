---
title: GitHub Copilot
description: Microsoft 出品——VS Code 最强 AI 代码补全插件，免费版开放
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# GitHub Copilot

## 一句话定位

**最流行的 AI 编程插件**——深度集成 VS Code 和 JetBrains，代码补全流畅自然，是 AI 编程的"默认选项"。

## 基本信息

| 项目 | 详情 |
|------|------|
| 公司 | GitHub (Microsoft) |
| 价格 | 免费版 / Individual $10/月 / Business $19/人/月 |
| 支持模型 | GPT-5 / Claude 4 / GPT-4o / o1 等 |
| 平台 | VS Code / JetBrains / Visual Studio / Neovim 等 |
| 首发时间 | 2021 年 6 月 |

## 核心功能

### ⌨️ 代码补全
Copilot 最经典的功能。在你敲代码时，它会：
- 给出灰色的补全建议
- 按 Tab 接受，按 Esc 忽略
- 理解上下文（函数名、变量、注释）给出准确建议

补全范围从一行到整个函数，准确率很高。

### 💬 Copilot Chat
侧边栏对话，功能类似 Cursor Chat：
- 选中代码提问
- 生成单元测试
- 解释代码逻辑
- 修复 Bug

### ✏️ 内联编辑（Inline Chat）
在代码中直接输入指令，Copilot 在原地修改代码。类似 Cursor 的 `Ctrl+K`。

### 🗣️ 语音编程
支持语音输入（VS Code 插件），说出你要实现的功能，Copilot 帮你写代码。

### 📚 代码审查
通过 `/review` 命令，让 Copilot 帮你审查代码，发现潜在问题。

## 优势

- **有免费版**：对于轻度用户来说完全够用
- **IDE 兼容性广**：支持 VS Code、JetBrains、Visual Studio、Neovim 等
- **模型选择多**：可以切换 GPT-4o、Claude 3.5 Sonnet、o1 等模型
- **与 GitHub 深度集成**：与 GitHub Issues、PR、Actions 等联动
- **成熟稳定**：最早上线的 AI 编程工具之一，可靠性高

## 不足

- 插件形式，不如 Cursor/Windsurf 那种原生 IDE 体验深入
- 多文件编辑能力不如 Composer/Cascade
- 免费版有使用限制（2000 次补全 + 50 次 Chat / 月）
- 没有项目级上下文管理（不能像 Cursor 那样 @ 标记文件）

## 适合谁？

- ✅ VS Code / JetBrains 用户，不想换 IDE
- ✅ 轻度使用者（免费版够用）
- ✅ 已有成熟开发环境的团队
- ✅ 需要多 IDE 支持的用户
- ⚠️ 需要深度 AI 辅助（多文件重构等）建议选 Cursor 或 Windsurf

## 快速上手

1. 在 VS Code 扩展商店搜索 "GitHub Copilot"
2. 安装并登录 GitHub 账号
3. 打开任意代码文件，开始编码
4. 灰色建议出现后按 Tab 接受
5. 按 `Ctrl+I`（Mac: `Cmd+I`）打开内联编辑
6. 按 `Ctrl+Shift+I`（Mac: `Cmd+Shift+I`）打开 Chat

## 关联阅读

- [Cursor](/tools/cursor) —— AI IDE 版本，AI 体验更深
- [Windsurf](/tools/windsurf) —— 另一款 AI IDE
- [OpenCode](/tools/opencode) —— 开源替代方案

---

> 最后更新：2026.05
