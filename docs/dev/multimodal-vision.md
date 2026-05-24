---
title: "多模态编程 (Vision API)"
description: 让模型「看见」图片——Vision API 实战：URL 输入 vs Base64 编码、截图生成代码、OCR 文字提取
difficulty: intermediate
---

<DifficultyBadge level="intermediate" />

# 多模态编程 (Vision API)

AI 不再只是一个"文字盒子"了。从 GPT-4o、Claude 3.5 到 Gemini，主流大模型都具备**视觉理解能力**——你给它一张图片，它能看懂里面有什么。这就是**多模态 API**（Multimodal Vision API）。

本篇带你掌握 Vision API 的调用方式、典型场景、各模型选型对比，以及生产环境中的实践要点。

## 什么是多模态 API

传统 LLM 的输入只有文本。多模态 API 允许你在对话中**插入图片**，模型会像人一样"看"图片内容，然后给出文字回复。

能做什么？举个例子：

> "这是一张网页 UI 设计稿，请根据它生成对应的 HTML + Tailwind CSS 代码。"

模型会先理解截图中的布局、颜色、按钮位置，再写出与设计稿高度一致的代码。

## 两种图片输入方式

Vision API 支持两种图片传递方式，各有适用场景：

### 方式一：URL 传入

适合可公开访问的图片，最简单直接：

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "这张图里有什么？"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": "https://example.com/photo.jpg",
                        "detail": "auto"  # auto / low / high
                    },
                },
            ],
        }
    ],
    max_tokens=500,
)

print(response.choices[0].message.content)
```

### 方式二：Base64 编码

适合本地文件、不暴露 URL 的场景（更安全）：

```python
import base64

def encode_image(image_path: str) -> str:
    """将本地图片编码为 Base64 字符串"""
    with open(image_path, "rb") as f:
        return base64.b64encode(f.read()).decode("utf-8")

image_path = "screenshot.png"
base64_image = encode_image(image_path)

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "这张截图里有哪些 UI 元素？请用 JSON 列出。"},
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{base64_image}",
                        "detail": "high"
                    },
                },
            ],
        }
    ],
)
```

**选择建议：**

| 场景 | 推荐方式 | 原因 |
|------|----------|------|
| 公网图片（CDN、图床） | URL 输入 | 简单、无编码开销 |
| 本地文件 / 涉密图片 | Base64 | 不暴露外网 URL |
| 高精度需求（OCR） | Base64 + `detail: "high"` | 避免压缩损失 |

### detail 参数说明

`detail` 控制模型的"看的仔细程度"：

- `auto`（默认）：模型自行判断
- `low`：512×512 低分辨率，**不消耗额外 token**，适合快速分类
- `high`：先看低分辨率全局，再切 512 方块逐块高分辨率分析，**token 消耗更大**，适合 OCR、细节识别

## 实战场景

### 场景一：截图转代码

把设计稿截图发给模型，让它生成前端代码——这是多模态 API 最火爆的开发场景。

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": (
                        "仔细观察这张 UI 截图，生成对应的 HTML + Tailwind CSS 代码。"
                        "要求：1) 复用 Tailwind 默认颜色 2) 响应式布局 3) 暗色模式支持"
                    ),
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/png;base64,{encode_image('design.png')}",
                        "detail": "high"
                    },
                },
            ],
        }
    ],
    max_tokens=2048,
)

code = response.choices[0].message.content
```

> **实践提示**：模型对 UI 的理解有上限，复杂页面建议**切片传入**，逐个组件生成代码，再手动组合。

### 场景二：图表数据分析

把统计图表发给模型，让它提取数据并输出为结构化格式：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {"type": "text", "text": "提取这张柱状图中的所有数据，输出为 JSON 格式。"},
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{base64_chart}"},
                },
            ],
        }
    ],
    response_format={"type": "json_object"},  # 强制返回 JSON
)

import json
data = json.loads(response.choices[0].message.content)
print(data)
```

### 场景三：文档 OCR

扫描的 PDF 或手机拍的文件，提取其中的文字：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "用 Markdown 格式输出这张文档中的所有文字，保留标题层级和列表结构。",
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{base64_doc}",
                        "detail": "high"
                    },
                },
            ],
        }
    ],
)

markdown_text = response.choices[0].message.content
```

## 多图输入：让模型对比图片

一次请求可以发送**多张图片**，模型会综合理解并进行比较：

```python
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "比较下面两张 UI 设计稿，列出所有布局差异和改进建议。"
                },
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{img_a}"},
                },
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:image/png;base64,{img_b}"},
                },
            ],
        }
    ],
    max_tokens=1000,
)

diff_report = response.choices[0].message.content
```

## 各模型视觉能力对比

| 能力维度 | GPT-4o | Claude 3.5 Sonnet | Gemini 2.0 Flash |
|----------|--------|-------------------|------------------|
| 图片分析 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 视频帧理解 | ✅ 多帧支持 | ❌ 不支持 | ✅ 原生多模态 |
| OCR 精度 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 多图输入 | ✅ 单次最多 ~10 张 | ✅ 单次最多 ~20 张 | ✅ 无明确限制 |
| 图表/表格提取 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 代码生成精度 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| 费用 | 中等 | 中等 | 极低 |

**选型建议：**

- **截图转代码** → Claude 3.5 Sonnet（UI 还原度最高）或 GPT-4o
- **文档 OCR / 表格提取** → Claude 3.5 Sonnet（精度最强）
- **视频分析 / 高频调用** → Gemini 2.0 Flash（原生视频帧 + 最便宜）
- **通用场景 / 成本敏感** → GPT-4o-mini（支持图片，性价比极高）

## 成本与优化

Vision API 按 token 计费，图片也会被 token 化。以 GPT-4o 为例：

- `detail: "low"` 每张图固定 `85` token
- `detail: "high"` 按 512px 方块计，一块 = 170 token，通常一张高清图 500–1500 token

**省钱策略：**
1. 无关紧要的图用 `detail: "low"`
2. 发送前用 Pillow 压缩图片分辨率到 1024px 以内
3. 批量处理时控制图片数量

## 总结

多模态 API 的核心要点：

- ✅ 两种传入方式：URL（简单） vs Base64（安全）
- ✅ 三大经典场景：截图转代码、图表数据提取、文档 OCR
- ✅ 多图输入一次完成对比分析
- ✅ 不同模型各有所长，按场景选型
- ✅ 注意 `detail` 参数控制 token 成本

## 下一步

- [构建第一个 Agent](/dev/build-agent) — 把你的 Vision 调用集成到 Agent 中
- [结构化输出](/dev/structured-output) — 结合 JSON Mode 让模型返回结构化的图片分析结果
