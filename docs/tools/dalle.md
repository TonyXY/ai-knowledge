---
title: DALL·E
description: OpenAI 出品——集成 ChatGPT 中，擅长理解复杂 Prompt，所见即所得
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# DALL·E

## 一句话定位

**OpenAI 出品的图像生成工具**——深度集成在 ChatGPT 中，擅长理解复杂、精确的文字描述，所见即所得。

## 基本信息

| 项目 | 详情 |
|------|------|
| 公司 | OpenAI |
| 价格 | $0.04/张（API）/ ChatGPT Plus 内包含 |
| 主要模型 | DALL·E 4 |
| 平台 | ChatGPT / API |
| 首发时间 | 2021 年 1 月（DALL·E 1） |

## 核心功能

### 🖼️ 文生图（ChatGPT 内）
直接在 ChatGPT 对话中描述你想要的图像：

> "画一幅插画：一只橘猫坐在窗台上看雨，窗外是霓虹灯闪烁的城市夜景，宫崎骏动画风格"

ChatGPT 会自动润色你的 Prompt，然后生成图像。

### ✏️ 迭代修改
生成后可以继续对话微调：
- "把猫的颜色改成黑色"
- "把背景换成雪景"
- "加上一个月亮"

不用重新写 Prompt，像聊天一样自然修改。

### 📐 文字渲染
DALL·E 4 在图像中渲染文字的能力有进一步提升——图像质量、指令遵循和文字渲染都得到显著增强。

### 🔌 API 接入
通过 OpenAI API 调用，适合批量生成场景。

```python
from openai import OpenAI
client = OpenAI()

response = client.images.generate(
    model="dall-e-4",
    prompt="一幅水墨画风格的竹子，有中国书法题字",
    size="1024x1024",
    quality="standard",
    n=1,
)
```

## 优势

- **理解力强**：对复杂 Prompt 的理解能力优于 Midjourney
- **ChatGPT 集成**：无需额外工具，在聊天中就能生成
- **编辑迭代**：自然语言修改图像，对话式调整
- **安全合规**：有较强的版权和安全过滤机制
- **API 可用**：适合程序化批量生成

## 不足

- 画面美学不如 Midjourney
- 缺乏 Midjourney 那样的精细参数控制（stylize、chaos 等）
- 安全过滤有时过于保守，可能误拒正常 Prompt
- 不支持图生图（没有 ControlNet 那样的精确控制）
- 生成速度比 Midjourney 慢

## 适合谁？

- ✅ ChatGPT 用户，希望一站式完成对话 + 画图
- ✅ 需要精确理解复杂描述的场景
- ✅ 需要频繁修改图像的用户（对话式迭代）
- ✅ 需要 API 批量生成的开发者
- ⚠️ 追求极致画面美感的用户 → 选 Midjourney
- ⚠️ 需要完全免费 → 选 Stable Diffusion

## 关联阅读

- [Midjourney](/tools/midjourney) —— 追求画面美感的图像生成
- [Stable Diffusion](/tools/stable-diffusion) —— 开源可控方案
- [多模态](/terms/multimodal) —— DALL·E 是典型的多模态应用

---

> 最后更新：2026.05
