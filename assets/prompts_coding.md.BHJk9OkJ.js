import{c as p,Z as l,Q as e,j as t,g as n,n as a,o as h,m as o}from"./chunks/framework.qjzPVSkb.js";const F=JSON.parse('{"title":"编程类模板","description":"代码生成、Debug 排查、代码重构——三个高频编程场景的 Prompt 模板","frontmatter":{"title":"编程类模板","description":"代码生成、Debug 排查、代码重构——三个高频编程场景的 Prompt 模板","difficulty":"intermediate"},"headers":[],"relativePath":"prompts/coding.md","filePath":"prompts/coding.md"}'),k={name:"prompts/coding.md"},d={id:"编程类模板",tabindex:"-1"};function r(c,s,g,E,u,b){const i=l("DifficultyBadge");return e(),t("div",null,[n("h1",d,[s[0]||(s[0]=a("编程类模板 ",-1)),h(i,{level:"intermediate"}),s[1]||(s[1]=a()),s[2]||(s[2]=n("a",{class:"header-anchor",href:"#编程类模板","aria-label":'Permalink to "编程类模板 <DifficultyBadge level="intermediate" />"'},"​",-1))]),s[3]||(s[3]=o(`<p>以下三个编程场景的 Prompt 模板，让你的 AI 编程效率翻倍。</p><hr><h2 id="模板一-代码生成" tabindex="-1">模板一：代码生成 <a class="header-anchor" href="#模板一-代码生成" aria-label="Permalink to &quot;模板一：代码生成&quot;">​</a></h2><p><strong>场景说明</strong>：让 AI 根据需求描述生成代码，适用于快速原型、工具函数、配置脚本等。</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位精通 [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">语言/框架</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 的高级工程师。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">实现一个满足以下需求的 [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">函数/组件/模块</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 需求描述</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">用自然语言描述你要实现的功能</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 技术约束</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 语言：[Python / TypeScript / Go / etc.]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 框架：[FastAPI / React / Gin / etc.]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 依赖限制：[只能用标准库 / 可用 numpy / etc.]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 代码要求</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 包含完整的类型注解（如有类型系统）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 关键逻辑加注释说明</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 处理边界情况（空输入、异常值等）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 优先可读性，而非极致简洁</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 输出格式</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 先简要说明实现思路（2-3 行）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 然后给出完整代码</span></span></code></pre></div><p><strong>期望效果</strong>：AI 会输出可运行的代码 + 实现思路，减少你后期的调试时间。</p><p><strong>使用技巧</strong>：</p><ul><li>需求描述越具体，代码越贴近你的预期</li><li>可以要求 AI 同时写出单元测试</li><li>如果代码有问题，把错误信息贴回去让它修复</li></ul><hr><h2 id="模板二-debug-排查" tabindex="-1">模板二：Debug 排查 <a class="header-anchor" href="#模板二-debug-排查" aria-label="Permalink to &quot;模板二：Debug 排查&quot;">​</a></h2><p><strong>场景说明</strong>：遇到 Bug 时，把错误信息和相关代码给 AI，快速定位根因。</p><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">你是一位精通 [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">语言/框架</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] 的调试专家。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 问题描述</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">简要描述：你预期什么行为，实际发生了什么</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 错误信息</span></span></code></pre></div><p>[粘贴完整的错误堆栈或日志]</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span># 相关代码</span></span>
<span class="line"><span>\`\`\`[语言]</span></span>
<span class="line"><span>[粘贴出问题的代码片段，尽可能提供上下文]</span></span></code></pre></div><h1 id="环境信息-可选" tabindex="-1">环境信息（可选） <a class="header-anchor" href="#环境信息-可选" aria-label="Permalink to &quot;环境信息（可选）&quot;">​</a></h1><ul><li>语言版本：[如 Python 3.11]</li><li>框架版本：[如 React 18.2]</li><li>操作系统：[如 macOS 14]</li></ul><h1 id="输出要求" tabindex="-1">输出要求 <a class="header-anchor" href="#输出要求" aria-label="Permalink to &quot;输出要求&quot;">​</a></h1><ol><li><strong>根因分析</strong>：错误的最可能原因（1-2 句话）</li><li><strong>修复方案</strong>：给出修改后的代码</li><li><strong>预防建议</strong>：如何避免类似问题</li><li>如果信息不足无法判断，说明还需要什么信息</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>**期望效果**：AI 能快速定位 80% 的常见 Bug，并给出可用的修复代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用技巧**：</span></span>
<span class="line"><span>- **错误信息一定要完整**，不要只贴最后一行</span></span>
<span class="line"><span>- 提供触发 Bug 的输入数据</span></span>
<span class="line"><span>- 如果修复后仍有问题，可以继续追问</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 模板三：代码重构</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**场景说明**：让 AI 审查并改进已有代码的可读性、性能或架构。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`markdown</span></span>
<span class="line"><span># 角色</span></span>
<span class="line"><span>你是一位专注于代码质量的资深工程师。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 任务</span></span>
<span class="line"><span>审查并重构以下代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 重构目标</span></span>
<span class="line"><span>- [ ] 提高可读性和可维护性</span></span>
<span class="line"><span>- [ ] 优化性能瓶颈</span></span>
<span class="line"><span>- [ ] 消除重复代码（DRY 原则）</span></span>
<span class="line"><span>- [ ] 改进错误处理</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 代码</span></span>
<span class="line"><span>\`\`\`[语言]</span></span>
<span class="line"><span>[粘贴待重构的代码]</span></span></code></pre></div><h1 id="约束" tabindex="-1">约束 <a class="header-anchor" href="#约束" aria-label="Permalink to &quot;约束&quot;">​</a></h1><ul><li>不改变外部接口和返回值格式</li><li>保持现有测试通过</li><li>重构后的代码必须有类型注解</li></ul><h1 id="输出格式" tabindex="-1">输出格式 <a class="header-anchor" href="#输出格式" aria-label="Permalink to &quot;输出格式&quot;">​</a></h1><ol><li><strong>当前问题</strong>：列表形式，每条说明问题和位置</li><li><strong>重构后代码</strong>：完整代码</li><li><strong>改进说明</strong>：解释关键改动点及其好处</li></ol><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>**期望效果**：AI 会给出结构化的改进分析 + 可直接使用的新代码。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**使用技巧**：</span></span>
<span class="line"><span>- 如果只需要特定类型的重构（如只做性能优化），在&quot;重构目标&quot;中只勾选对应项</span></span>
<span class="line"><span>- 可以要求 AI 给出渐进式重构步骤（改一点、测试、再改一点）</span></span>
<span class="line"><span>- 大文件建议分模块逐步重构，每次只给 AI 一个模块</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 编程 Prompt 通用原则</span></span>
<span class="line"><span></span></span>
<span class="line"><span>| 原则 | 说明 |</span></span>
<span class="line"><span>|------|------|</span></span>
<span class="line"><span>| 代码要完整 | 让 AI 看到足够的上下文，不要只给孤立的几行 |</span></span>
<span class="line"><span>| 错误要详细 | 粘贴完整错误堆栈，不要只描述&quot;报错了&quot; |</span></span>
<span class="line"><span>| 反馈要具体 | &quot;不用 reduce，用 for 循环重写&quot; 好于 &quot;改一下&quot; |</span></span>
<span class="line"><span>| 分步处理 | 大任务拆成小步骤，逐步让 AI 实现 |</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 进阶阅读</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- [Few-Shot / Zero-Shot](./few-shot) — 给 AI 看你的代码风格示例</span></span>
<span class="line"><span>- [结构化提示词](./structured-prompt) — 把编程需求组织成结构化 Prompt</span></span></code></pre></div>`,24))])}const m=p(k,[["render",r]]);export{F as __pageData,m as default};
