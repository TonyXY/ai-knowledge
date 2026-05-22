---
title: 用 Cursor 搭建网页
description: 10 分钟从零到上线——用 Cursor 的 AI 能力快速搭建一个完整网页
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 用 Cursor 搭建网页

本篇带你用 Cursor 从零开始搭建一个完整的网页，感受 AI 原生 IDE 的编程效率。

## 准备工作

- 安装 [Cursor](https://cursor.sh)（免费版即可）
- 确保网络畅通（AI 功能需要联网）

---

## 第 1 步：新建项目

打开 Cursor，创建一个新文件夹作为项目目录。

```
File → Open Folder → 选一个空文件夹（或新建一个）
```

或者用快捷键 `Ctrl+O`（Mac: `Cmd+O`）打开文件夹。

---

## 第 2 步：用 Ctrl+K 描述你要做的页面

在 Cursor 的文件浏览器中，点击"新建文件"按钮，创建 `index.html`。

打开这个空文件，按 `Ctrl+K`（Mac: `Cmd+K`），输入你的需求：

```
创建一个精美的个人名片网页：
1. 居中卡片布局，圆角阴影
2. 头像占位、姓名、职位、简介
3. 三个社交按钮：GitHub、Twitter、邮箱
4. 背景渐变，深色主题
5. 现代设计风格，略带玻璃拟态
```

::: tip 提示
`Ctrl+K` 是 Cursor 最常用的快捷键之一——选中代码（或空文件）后按它，就可以用自然语言让 AI 帮你写代码。
:::

Cursor 会在原位置生成代码。如果结果不满意，可以再次 `Ctrl+K` 修改：

```
把卡片宽度改小一点，加一个技能标签列表（HTML、CSS、JavaScript、React）
```

### Ctrl+K 使用技巧

| 操作 | 快捷键 | 场景 |
|------|--------|------|
| 生成代码 | `Ctrl+K`（在空文件中） | 从零开始写新功能 |
| 修改代码 | `Ctrl+K`（选中代码后） | 修改现有逻辑 |
| 重构 | `Ctrl+K` 然后描述 | "把这个函数改成 async/await" |
| 添加注释 | `Ctrl+K` 然后说 | "给这个函数加上 JSDoc 注释" |

---

## 第 3 步：Tab 补全加速编写

Cursor 会在你编码时自动给出灰色建议。比如你开始写 CSS：

```css
.card {
```

Cursor 可能会自动补全：

```css
.card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 40px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

按 `Tab` 接受建议，继续写下一行，Cursor 会继续预测。

### Composer 多文件操作

如果页面比较复杂（比如需要 CSS 文件 + JS 文件），可以打开 Composer：

`Ctrl+Shift+I`（Mac: `Cmd+Shift+I`）→ 输入：

```
帮我创建一个个人博客主页：
- index.html：HTML 结构
- style.css：所有样式
- main.js：暗色模式切换功能

设计风格：极简主义，黑白配色，衬线字体
```

Composer 会同时创建多个文件，并自动处理好文件间的引用关系。

---

## 第 4 步：迭代调整

网页初步成型后，用 Chat（`Ctrl+L` / Mac: `Cmd+L`）继续优化。

### 示例对话

```
你：我看到头像位置是空的，怎么给它加上默认头像？

AI：你可以添加一个带有首字母的圆形占位符，或者让我帮你集成 Gravatar
头像服务。你想用哪种方案？
```

```
你：帮我加一个暗色/亮色模式切换按钮，状态保存在 localStorage 里
```

```
你：移动端适配不太好，帮我加上响应式设计
```

每次对话，AI 都会基于你当前的项目代码给出修改方案。

### 预览效果

在 Cursor 中右键 `index.html` → "Open with Live Server"（需安装 Live Server 插件），或者直接用浏览器打开文件查看效果。

---

## 第 5 步：发布上线

### 方案 1：GitHub Pages（免费，推荐新手）

```bash
# 在 Cursor 的终端中执行
git init
git add .
git commit -m "创建个人主页"
# 推送到 GitHub 后，在仓库 Settings → Pages 中启用
```

### 方案 2：Vercel（更灵活）

```bash
# 安装 Vercel CLI
npm i -g vercel
# 部署
vercel
```

---

## 完整示例：最终效果

经过几轮迭代，你的页面大致会是这样：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人名片</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .card {
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 48px;
            max-width: 400px;
            width: 90%;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            margin: 0 auto 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
            color: white;
            font-weight: bold;
        }
        .name { font-size: 28px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .title { font-size: 16px; color: #a78bfa; margin-bottom: 16px; }
        .bio { font-size: 14px; color: #9ca3af; line-height: 1.6; margin-bottom: 24px; }
        .skills {
            display: flex;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 24px;
        }
        .skill-tag {
            padding: 6px 14px;
            border-radius: 20px;
            background: rgba(99, 102, 241, 0.2);
            color: #a78bfa;
            font-size: 13px;
            border: 1px solid rgba(99, 102, 241, 0.3);
        }
        .links {
            display: flex;
            justify-content: center;
            gap: 16px;
        }
        .links a {
            padding: 10px 24px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.1);
            color: #fff;
            text-decoration: none;
            font-size: 14px;
            transition: background 0.2s;
        }
        .links a:hover { background: rgba(255, 255, 255, 0.2); }
    </style>
</head>
<body>
    <div class="card">
        <div class="avatar">X</div>
        <h1 class="name">张三</h1>
        <p class="title">前端开发工程师</p>
        <p class="bio">热爱 Web 技术和开源，专注于构建优雅的用户体验</p>
        <div class="skills">
            <span class="skill-tag">HTML</span>
            <span class="skill-tag">CSS</span>
            <span class="skill-tag">JavaScript</span>
            <span class="skill-tag">React</span>
        </div>
        <div class="links">
            <a href="#">GitHub</a>
            <a href="#">Twitter</a>
            <a href="#">Email</a>
        </div>
    </div>
</body>
</html>
```

---

## 总结

| 步骤 | 操作 | 工具 |
|------|------|------|
| 1 | 新建项目 | Cursor 打开空文件夹 |
| 2 | 描述需求 | `Ctrl+K` 输入自然语言 |
| 3 | 加速编码 | Tab 补全 + Composer |
| 4 | 迭代调整 | `Ctrl+L` Chat 对话 |
| 5 | 发布上线 | GitHub Pages / Vercel |

用 Cursor，一个完整的个人网页从想法到上线，10 分钟就能搞定。

## 关联阅读

- [Cursor 工具详解](/tools/cursor)
- [用 ChatGPT 辅助编程](/practices/chatgpt-coding) —— 另一种 AI 编程方式
- [GitHub Copilot](/tools/copilot) —— 如果你更喜欢留在 VS Code
