---
title: AI 工具知识测验
description: 测测你对主流 AI 工具的了解程度——模型上下文窗口、IDE 对比、AI 搜索、开源模型
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# AI 工具知识测验

检验你对 AI 工具的认知水平。每题点击"查看答案"查看解析。

---

## 选择题

### Q1：以下哪个模型的上下文窗口最大？

A. GPT-4o（128K）

B. Claude 3.5 Sonnet（200K）

C. Gemini 2.0 Pro（2M）

D. DeepSeek-V3（128K）

<details>
<summary>查看答案</summary>

**正确答案：C**

Gemini 2.0 Pro 的上下文窗口为 **2M tokens**，远超其他选项：

- GPT-4o：128K
- Claude 3.5 Sonnet：200K
- DeepSeek-V3：128K

2M 的上下文窗口意味着你可以一次性输入约 **150 万英文单词**，相当于几本小说的体量，在处理超长文档、大型代码库等场景时优势巨大。

</details>

### Q2：Cursor 和 VS Code 的关系是？

A. Cursor 是 VS Code 的插件

B. Cursor 是基于 VS Code 的独立 IDE

C. Cursor 和 VS Code 无关

D. Cursor 是 VS Code 的替代品且不兼容

<details>
<summary>查看答案</summary>

**正确答案：B**

Cursor 是基于 VS Code 开源内核（Code - OSS）构建的独立 IDE，因此：

- ✅ 继承了 VS Code 的所有功能（扩展生态、快捷键、界面布局）
- ✅ 可以无缝迁移 VS Code 的配置和插件
- ✅ 叠加了深度 AI 集成（Tab 补全、Composer、Chat、Agent）

它不是插件，不需要先装 VS Code，而是一个**独立的应用程序**。

</details>

### Q3：Perplexity 相比普通搜索引擎的核心优势是？

A. 搜索速度更快

B. 用 AI 总结搜索结果并标注来源

C. 完全免费

D. 只搜索学术论文

<details>
<summary>查看答案</summary>

**正确答案：B**

Perplexity 的核心创新在于**「AI 搜索引擎」**：

1. 它对搜索结果进行 AI 摘要和整合，用自然语言回答你的问题
2. 每个回答都会**标注信息来源**，方便你验证和深入阅读
3. 支持追问和深入探索，像对话一样持续检索

相比之下，传统搜索引擎只返回链接列表，需要你自己点开、阅读、总结。

</details>

---

## 判断题

### Q4：DeepSeek-V3 是完全开源的大模型。

<details>
<summary>查看答案</summary>

**✅ 正确**

DeepSeek-V3 确实是完全开源的模型。DeepSeek 团队公开了模型权重和技术报告，开发者可以自由下载、部署、商用。这是国产大模型中开源程度最高的之一，在开源社区（如 HuggingFace）中广受欢迎。

</details>

### Q5：Midjourney 是 OpenAI 旗下的产品。

<details>
<summary>查看答案</summary>

**❌ 错误**

Midjourney 是一家**独立公司**，由 David Holz 创立，与 OpenAI 没有隶属关系。

快速辨别：
- **Midjourney**：独立公司，专注 AI 图像生成，以艺术风格和美学质量著称
- **DALL·E**：这才是 OpenAI 旗下的图像生成产品
- **Stable Diffusion**：Stability AI 的产品，完全开源

三者是 **AI 图像生成领域的三巨头**，彼此是竞争关系，而非同一公司。

</details>

---

→ 🛠️ [返回 AI 工具总览](/tools/)
