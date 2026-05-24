---
title: Stable Diffusion
description: 开源 AI 图像生成模型——本地运行，高度定制，ControlNet + LoRA 生态丰富
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# Stable Diffusion

## 一句话定位

**开源图像生成模型**——免费、本地运行、高度可定制。如果说 Midjourney 是法拉利，Stable Diffusion 就是可以自己改装的超级跑车。

## 基本信息

| 项目 | 详情 |
|------|------|
| 公司 | Stability AI + 开源社区 |
| 价格 | 免费（开源） |
| 主要模型 | SD 3.5 / SDXL / Flux |
| 平台 | Windows / macOS / Linux |
| 首发时间 | 2022 年 8 月 |

## 核心功能

### 🖥️ 本地运行
在自己的电脑上直接运行（需要独立显卡，推荐 6GB+ VRAM）。不需要联网，不需要付费，图像完全私有。

### 🔧 ControlNet
这是 SD 生态中最强大的工具之一——可以精确控制图像生成的方向：
- **Canny（边缘检测）**：上传草图，按轮廓生成
- **Pose（姿态）**：指定人物的姿势和动作
- **Depth（深度）**：控制空间深度关系
- **Scribble（涂鸦）**：随手画画变成完整图像
- **IP-Adapter**：参考另一张图的风格

### 🎨 LoRA 模型
社区训练的大量风格化小模型：
- 特定人物 LoRA（某个明星或角色）
- 特定风格 LoRA（水墨画、像素风、赛博朋克）
- 特定物品 LoRA（某种建筑、某种服装）

只需下载几百 MB 的 LoRA 文件，就能让 SD 学会新风格。

### 🌐 WebUI
最流行的使用界面是 [Automatic1111 WebUI](https://github.com/AUTOMATIC1111/stable-diffusion-webui) 和 [ComfyUI](https://github.com/comfyanonymous/ComfyUI)（节点式工作流）。

## 优势

- **完全免费**：开源，不需要付费订阅
- **可本地运行**：数据不出你的电脑，隐私有保障
- **高度可定制**：ControlNet、LoRA、插件生态极其丰富
- **社区庞大**：全球最大的 AI 图像生成开源社区
- **图生图强**：可以上传参考图进行精确控制

## 不足

- 上手门槛高：需要安装 Python、CUDA、下载模型等
- 依赖硬件：需要独立显卡，显存不够可能无法运行
- 默认效果不如 Midjourney（需要自己调参数和模型）
- 需要学习成本：WebUI 功能多但复杂
- 对非法内容的过滤不如商业产品严格（需要自律）

## 适合谁？

- ✅ 预算有限的创作者
- ✅ 喜欢 DIY、愿意折腾的技术爱好者
- ✅ 需要精确控制图像生成的场景（ControlNet）
- ✅ 对数据隐私有要求的用户
- ✅ 想学习 AI 图像生成原理的开发者
- ⚠️ 追求开箱即用的用户 → 选 Midjourney 或 DALL·E

## 快速上手

```bash
# 使用 ComfyUI（推荐新手用 Stability Matrix 一键安装）
git clone https://github.com/comfyanonymous/ComfyUI.git
cd ComfyUI
pip install -r requirements.txt
python main.py
```

或者使用 [Stability Matrix](https://github.com/LykosAI/StabilityMatrix)（图形化启动器），一键管理 SD WebUI、ComfyUI 和模型。

## 常用资源

- **模型下载**：[CivitAI](https://civitai.com) —— 最大的 SD 模型社区
- **LoRA 下载**：CivitAI 上有海量 LoRA
- **教程**：B 站搜索 "Stable Diffusion 教程"
- **提示词参考**：CivitAI 上每张图片都附带完整 Prompt

## 关联阅读

- [Midjourney](/tools/midjourney) —— 商业图像生成对比
- [DALL·E](/tools/dalle) —— OpenAI 的图像生成方案
- [什么是 Prompt](/prompts/what-is-prompt) —— 好的 Prompt 对图像生成至关重要

---

> 最后更新：2026.05
