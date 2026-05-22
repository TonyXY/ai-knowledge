# AI 知识学习

> 面向开发者的 AI 知识学习网站 — 术语·提示词·工具·实操
>
> **在线地址：** https://tonyxy.github.io/ai-knowledge/

## 内容架构

四模块递进学习，每模块内分 🟢入门 / 🟡进阶 / 🔴高级 三级难度：

```
📖 AI 术语 →  💬 提示词 →  🛠️ AI 工具 →  🧪 实操
（知道是什么） （学会怎么用） （选对工具）   （动手做出来）
```

| 模块 | 页面数 | 说明 |
|------|--------|------|
| [📖 AI 术语](https://tonyxy.github.io/ai-knowledge/terms/) | 24 | 核心概念，含发展历程 |
| [💬 提示词](https://tonyxy.github.io/ai-knowledge/prompts/) | 10 | Prompt 工程，含场景模板 |
| [🛠️ AI 工具](https://tonyxy.github.io/ai-knowledge/tools/) | 14 | 主流 AI 工具评测 + 大模型对比 |
| [🧪 实操](https://tonyxy.github.io/ai-knowledge/practices/) | 7 | 动手教程，从新手到进阶 |
| [🧭 学习路线](https://tonyxy.github.io/ai-knowledge/roadmap/) | 1 | 4 周学习计划 |

总计 **57 页**，全中文，约 30,000+ 字。

## 本地开发

```bash
# 确保使用 Node 20+
nvm use

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建静态站点
npm run build

# 预览构建结果
npm run preview
```

开发服务器默认运行在 http://localhost:3000。

## 技术栈

| 层面 | 选择 |
|------|------|
| 框架 | [VitePress](https://vitepress.dev/) 1.6 |
| 内容 | Markdown + YAML frontmatter |
| 搜索 | 内置全文搜索 |
| 部署 | GitHub Pages + GitHub Actions |
| 字体 | Inter + Noto Sans SC |

## 部署

每次推送 `main` 分支，GitHub Actions 自动构建并部署到 `gh-pages` 分支。

```bash
git push origin main
```

## 项目结构

```
ai-knowledge/
├── DESIGN.md              # 设计文档与后续计划
├── README.md
├── package.json
├── .nvmrc                 # Node 版本管理
├── .github/workflows/
│   └── deploy.yml         # 自动部署工作流
├── docs/
│   ├── .vitepress/
│   │   ├── config.js      # 导航、侧边栏、主题配置
│   │   └── theme/
│   │       ├── index.js   # 注册 DifficultyBadge 组件
│   │       ├── custom.css # 品牌色、卡片、路径样式
│   │       └── components/
│   │           └── DifficultyBadge.vue
│   ├── public/            # SVG 图标
│   ├── index.md           # 首页
│   ├── roadmap/index.md   # 学习路线图
│   ├── terms/             # 术语模块（24 页）
│   ├── prompts/           # 提示词模块（10 页）
│   ├── tools/             # 工具模块（14 页）
│   └── practices/         # 实操模块（7 页）
```

## 贡献

欢迎通过 [Issues](https://github.com/TonyXY/ai-knowledge/issues) 提交反馈或建议。

## 许可

仅供学习参考。
