---
title: 用 ChatGPT 辅助编程
description: 学会用 ChatGPT 辅助编程的正确姿势——从描述需求到理解代码，再到 Debug
difficulty: beginner
---

<DifficultyBadge level="beginner" />

# 用 ChatGPT 辅助编程

本篇教你用 ChatGPT 辅助编程的完整流程，不只是"让 AI 写代码"，而是学会和 AI 协作写出好代码。

## 准备工作

- 注册 [ChatGPT](https://chat.openai.com) 账号（免费版即可）
- 准备好一个编程任务（跟着本篇做也行）

---

## 第 1 步：描述需求

AI 不是读心术，你描述得越清楚，它给出的代码越好。好的描述包含三个要素：

**❌ 差的描述：**

> "帮我写一个爬虫"

**✅ 好的描述：**

> "用 Python 写一个网页爬虫，爬取豆瓣电影 Top 250 的电影名称、评分和简介，保存为 CSV 文件。使用 requests 和 BeautifulSoup 库。"

### 示例对话

你可以这样开始和 ChatGPT 对话：

```
你：我需要在网页上做一个倒计时组件。请用 HTML + CSS + JavaScript 实现，
要求：
1. 倒计时到 2027 年 1 月 1 日 0 点
2. 显示天、时、分、秒四个数字
3. 数字用大字体居中显示
4. 背景是深色，数字是白色
```

### 技巧

- 指定技术栈（Python / JavaScript / HTML 等）
- 明确输入和输出
- 描述格式要求
- 如果有特殊约束，一开始就说清楚

---

## 第 2 步：生成代码

ChatGPT 会给出完整代码。以倒计时为例，它会返回类似：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <title>新年倒计时</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #1a1a2e;
            color: #fff;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .countdown {
            text-align: center;
        }
        .countdown h1 {
            font-size: 24px;
            margin-bottom: 30px;
            color: #aaa;
        }
        .timer {
            display: flex;
            gap: 20px;
        }
        .time-block {
            text-align: center;
        }
        .time-block span:first-child {
            display: block;
            font-size: 60px;
            font-weight: bold;
            background: #16213e;
            padding: 20px;
            border-radius: 10px;
            min-width: 100px;
        }
        .time-block .label {
            display: block;
            margin-top: 10px;
            font-size: 14px;
            color: #aaa;
        }
    </style>
</head>
<body>
    <div class="countdown">
        <h1>距离 2027 年还有</h1>
        <div class="timer">
            <div class="time-block">
                <span id="days">00</span>
                <span class="label">天</span>
            </div>
            <div class="time-block">
                <span id="hours">00</span>
                <span class="label">时</span>
            </div>
            <div class="time-block">
                <span id="minutes">00</span>
                <span class="label">分</span>
            </div>
            <div class="time-block">
                <span id="seconds">00</span>
                <span class="label">秒</span>
            </div>
        </div>
    </div>

    <script>
        function updateCountdown() {
            const target = new Date('2027-01-01T00:00:00');
            const now = new Date();
            const diff = target - now;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    </script>
</body>
</html>
```

把代码保存为 `countdown.html`，用浏览器打开就能看到效果。

---

## 第 3 步：理解代码

拿到代码后，不要直接粘贴就跑。**让 ChatGPT 解释给你听**——这是学习编程最快的方式。

```
你：请解释一下这段 JavaScript 代码的核心逻辑，每行在做什么
```

ChatGPT 会逐行解释，比如：

- `new Date('2027-01-01T00:00:00')` 创建目标时间对象
- `target - now` 得到毫秒差
- `Math.floor(diff / (1000 * 60 * 60 * 24))` 毫秒转天数
- `String(days).padStart(2, '0')` 确保始终显示两位数字（01, 02...）
- `setInterval(updateCountdown, 1000)` 每秒更新一次

### 进阶提问

理解基础逻辑后，可以问更深的问题：

```
你：为什么 diff 的单位是毫秒？JavaScript 中时间计算有什么需要注意的坑？
```

```
你：如果我想在倒计时结束后显示"新年快乐"而不是负数，这个逻辑应该怎么加？
```

---

## 第 4 步：Debug

代码跑不通？把**完整的错误信息**贴给 ChatGPT。

### 示例

```
你：我在浏览器里打开这个 HTML 文件，倒计时显示的是负数。
我检查了一下，目标日期是 2026 年 1 月 1 日，现在是 2026 年 5 月，所以已经过了。
请帮我改成倒计时到 2027 年 1 月 1 日，并且在倒计时结束后显示"已过期"而不是负数。
```

ChatGPT 会帮你找到问题并给出修改方案：

```javascript
function updateCountdown() {
    const target = new Date('2027-01-01T00:00:00');
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        document.querySelector('.countdown h1').textContent = '已过期';
        document.querySelector('.timer').style.display = 'none';
        return;
    }

    // ... 原有的计算逻辑
}
```

### Debug 技巧

| 情况 | 怎么做 |
|------|--------|
| 报错了 | 贴完整错误信息 + 相关代码 |
| 结果不对 | 贴预期结果 + 实际结果 |
| 不知道哪里错了 | 贴代码 + "这段代码在做什么？预期是什么？" |
| 性能问题 | 贴代码 + "哪里可能比较慢？怎么优化？" |

---

## 总结：ChatGPT 编程四步法

1. **描述需求** → 越具体越好，指定技术栈、输入输出、格式要求
2. **生成代码** → 拿到代码，保存并运行
3. **理解代码** → 让 ChatGPT 逐行解释，这是学习的关键
4. **Debug** → 出问题贴错误信息，迭代调整

这四步走下来，你不仅得到了能用的代码，还真正学到了东西。

## 关联阅读

- [ChatGPT 工具详解](/tools/chatgpt)
- [清晰的 Prompt 怎么写](/prompts/principles)
- [用 Cursor 搭建网页](/practices/cursor-website) —— 在 IDE 中更高效地 AI 编程
