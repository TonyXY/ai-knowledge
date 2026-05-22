---
title: Prompt 批量生成
description: Python 脚本批量调用 AI API——自动化文案生成、翻译、分类等重复性任务
difficulty: intermediate

---

<DifficultyBadge level="intermediate" />

# Prompt 批量生成

当你需要 AI 处理成百上千条数据时（比如批量翻译、文案生成、文本分类），手动操作太慢了。本篇教你用 Python 脚本批量调用 API，一次搞定。

## 适用场景

| 场景 | 输入 | 输出 |
|------|------|------|
| 批量翻译 | 100 条中文句子 | 对应的英文翻译 |
| 文案生成 | 100 个商品名称 | 商品描述文案 |
| 文本分类 | 1000 条用户评论 | 情感标签（正面/负面） |
| 摘要生成 | 50 篇长文章 | 各 100 字摘要 |
| 格式转换 | CSV 数据 | 结构化 Markdown |

---

## 准备

### 安装依赖

```bash
pip install openai pandas tqdm python-dotenv
```

### 设置 API Key

```bash
# .env 文件
OPENAI_API_KEY=sk-your-api-key
```

---

## 基础版本：逐条处理

先从最简单的流程开始——读取数据、逐条调用 API、保存结果。

```python
# batch_basic.py —— 基础批量处理
import os
import csv
import time
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

def translate_text(text, target_lang="英文"):
    """翻译单条文本"""
    response = client.chat.completions.create(
        model="gpt-4o-mini",  # 批量场景推荐用便宜模型
        messages=[
            {"role": "system", "content": f"你是一个专业翻译。将用户输入翻译成{target_lang}。只返回译文，不要加任何解释。"},
            {"role": "user", "content": text},
        ],
        temperature=0.3,  # 翻译任务用低温度，结果更稳定
        max_tokens=500,
    )
    return response.choices[0].message.content.strip()


# 读取待翻译的数据
texts = [
    "人工智能正在改变世界",
    "今天的天气真不错",
    "我们公司正在招聘前端工程师",
    "深度学习是机器学习的一个子集",
    "请把这份文件签名后发回给我",
]

# 逐条翻译并收集结果
results = []
for i, text in enumerate(texts):
    try:
        translation = translate_text(text)
        results.append({"原文": text, "译文": translation})
        print(f"[{i+1}/{len(texts)}] ✅ {text[:20]}... → {translation[:30]}...")
    except Exception as e:
        print(f"[{i+1}/{len(texts)}] ❌ 失败: {e}")
        results.append({"原文": text, "译文": "ERROR"})

    time.sleep(0.1)  # 控制频率，避免触发限速

# 保存结果
with open("translations.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["原文", "译文"])
    writer.writeheader()
    writer.writerows(results)

print(f"\n完成！共处理 {len(results)} 条，结果保存在 translations.csv")
```

---

## 进阶版本：并发 + 错误重试

逐条处理太慢了？加上并发和错误处理：

```python
# batch_advanced.py —— 并发批量处理
import os
import json
import csv
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from openai import OpenAI
from tqdm import tqdm
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

MAX_RETRIES = 3          # 最大重试次数
MAX_WORKERS = 10         # 并发数（根据你的 API 限速调整）
RATE_LIMIT_DELAY = 0.05  # 每次请求最小间隔（秒）

def call_ai(prompt, system_prompt="", model="gpt-4o-mini", temperature=0.3):
    """调用 AI API，带自动重试"""
    for attempt in range(MAX_RETRIES):
        try:
            time.sleep(RATE_LIMIT_DELAY)
            response = client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt},
                ],
                temperature=temperature,
                max_tokens=500,
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            if attempt < MAX_RETRIES - 1:
                wait = 2 ** attempt  # 指数退避：1s, 2s, 4s
                print(f"    重试 {attempt+1}/{MAX_RETRIES}，等待 {wait}s... ({e})")
                time.sleep(wait)
            else:
                raise e


def process_item(item):
    """处理单条数据——根据场景自定义这个函数"""
    text = item["text"]  # 假设每条数据有 "text" 字段
    
    # 翻译场景
    result = call_ai(
        prompt=text,
        system_prompt="你是一个专业翻译。将用户输入翻译成英文。只返回译文，不要加任何解释。",
    )
    return {"原文": text, "译文": result}


# 准备数据
items = [
    {"text": "人工智能正在改变世界"},
    {"text": "今天的天气真不错"},
    {"text": "我们公司正在招聘前端工程师"},
    {"text": "深度学习是机器学习的一个子集"},
    # ... 更多数据
]

# 并发处理
results = []
with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
    # 提交所有任务
    future_to_item = {executor.submit(process_item, item): item for item in items}

    # 用 tqdm 显示进度条
    for future in tqdm(as_completed(future_to_item), total=len(items), desc="处理中"):
        item = future_to_item[future]
        try:
            result = future.result()
            results.append(result)
        except Exception as e:
            print(f"❌ 处理失败: {item['text'][:30]}... - {e}")
            results.append({"原文": item["text"], "译文": "ERROR"})

# 保存结果
with open("translations_batch.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n完成！成功 {sum(1 for r in results if r.get('译文') != 'ERROR')}/{len(results)} 条")
```

### 并发数调优建议

| 模型 | 建议并发数 | 原因 |
|------|-----------|------|
| GPT-4o-mini | 10-20 | 轻量模型，限速较宽松 |
| GPT-4o | 3-5 | 较贵，限速严格 |
| DeepSeek | 10-20 | 性价比高，限速宽松 |

---

## 场景模板

### 场景 1：批量分类

```python
def classify_sentiment(comment):
    """情感分类"""
    result = call_ai(
        prompt=comment,
        system_prompt="""你是一个情感分析工具。分析用户评论的情感：
- 正面 → 返回 "positive"
- 负面 → 返回 "negative"
- 中性 → 返回 "neutral"
只返回一个英文单词，不要加任何解释。""",
    )
    return result.strip().lower()


comments = [
    "这个产品太好用了，强烈推荐！",
    "一般般吧，没什么特别的",
    "质量太差了，用了两天就坏了",
]

for comment in comments:
    sentiment = classify_sentiment(comment)
    print(f"{comment[:30]}... → {sentiment}")
```

### 场景 2：批量生成结构化数据

```python
def extract_info(text):
    """从非结构化文本中提取字段"""
    result = call_ai(
        prompt=text,
        system_prompt="""从以下文本中提取关键信息，以 JSON 格式返回：
{"name": "姓名", "company": "公司", "position": "职位", "email": "邮箱", "phone": "电话"}
只返回 JSON，不要加其他内容。""",
    )
    return json.loads(result)


text = "你好，我是张三，在字节跳动担任后端开发工程师，我的邮箱是 zhangsan@bytedance.com，手机号是 13800138000。"
info = extract_info(text)
print(info)
# {"name": "张三", "company": "字节跳动", "position": "后端开发工程师", "email": "zhangsan@bytedance.com", "phone": "13800138000"}
```

### 场景 3：批量文案生成

```python
def generate_description(product_name, features):
    """为商品生成描述文案"""
    result = call_ai(
        prompt=f"商品名称：{product_name}\n特点：{features}",
        system_prompt="你是一个电商文案专家。为商品写一段 50-80 字的吸引人的描述，突出卖点。",
        temperature=0.7,  # 文案创作可以用稍高的 temperature
        model="gpt-4o-mini",
    )
    return result


products = [
    {"name": "无线蓝牙耳机", "features": "续航 40 小时、主动降噪、IPX5 防水"},
    {"name": "便携充电宝", "features": "20000mAh、支持快充、超薄设计"},
    {"name": "机械键盘", "features": "Cherry 轴体、RGB 背光、热插拔"},
]

for p in products:
    desc = generate_description(p["name"], p["features"])
    print(f"\n【{p['name']}】\n{desc}")
```

---

## 省钱技巧

| 技巧 | 说明 |
|------|------|
| 用便宜模型 | 分类/翻译用 `gpt-4o-mini`，不需要 `gpt-4o` |
| 缓存结果 | 频繁重复的请求先查缓存，命中就不再调 API |
| 精简 Prompt | System Prompt 越长越贵（按 token 计费） |
| 控制 max_tokens | 输出限制比预期长一点点就行，别设太大 |
| 用 DeepSeek | 成本是 OpenAI 的 1/10，适合大批量场景 |

### 添加缓存

```python
import hashlib

cache = {}

def call_ai_with_cache(prompt, system_prompt="", model="gpt-4o-mini"):
    """带缓存的 API 调用"""
    key = hashlib.md5((prompt + system_prompt).encode()).hexdigest()
    if key in cache:
        return cache[key]
    
    result = call_ai(prompt, system_prompt, model)
    cache[key] = result
    return result
```

---

## 总结

本篇的核心思想很简单：**用 Python 脚本自动化重复的 AI 调用**。掌握这个模式后：

- 分类 1000 条评论 → 5 分钟
- 翻译 500 条文本 → 3 分钟
- 生成 200 条文案 → 10 分钟

比手动一条条操作快了 N 倍。

## 完整代码下载

将上述代码保存为 `.py` 文件，修改 `process_item` 函数适配你的任务，配置好 API Key 即可运行。

## 关联阅读

- [DeepSeek](/tools/deepseek) —— 大批量场景首选，成本极低
- [ChatGPT 工具详解](/tools/chatgpt)
- [什么是 Prompt](/prompts/what-is-prompt) —— API 调用的核心
