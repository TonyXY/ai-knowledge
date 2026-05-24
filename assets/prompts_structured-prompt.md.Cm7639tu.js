import{c as p,Z as t,Q as l,j as e,g as a,n,o as h,m as k}from"./chunks/framework.qjzPVSkb.js";const C=JSON.parse('{"title":"结构化提示词","description":"用 Markdown/XML/JSON 组织 Prompt，让 AI 更精确地理解你的意图","frontmatter":{"title":"结构化提示词","description":"用 Markdown/XML/JSON 组织 Prompt，让 AI 更精确地理解你的意图","difficulty":"intermediate"},"headers":[],"relativePath":"prompts/structured-prompt.md","filePath":"prompts/structured-prompt.md"}'),r={name:"prompts/structured-prompt.md"},d={id:"结构化提示词",tabindex:"-1"};function o(E,s,c,g,u,y){const i=t("DifficultyBadge");return l(),e("div",null,[a("h1",d,[s[0]||(s[0]=n("结构化提示词 ",-1)),h(i,{level:"intermediate"}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#结构化提示词","aria-label":'Permalink to "结构化提示词 <DifficultyBadge level="intermediate" />"'},"​",-1))]),s[3]||(s[3]=k(`<p>当 Prompt 变得复杂时，纯文本段落会让 AI 难以分辨&quot;指令&quot;和&quot;内容&quot;。<strong>结构化提示词</strong> 就是用 Markdown、XML 或 JSON 等格式来组织 Prompt，让结构清晰、意图明确。</p><hr><h2 id="为什么需要结构化" tabindex="-1">为什么需要结构化？ <a class="header-anchor" href="#为什么需要结构化" aria-label="Permalink to &quot;为什么需要结构化？&quot;">​</a></h2><p>比较以下两种写法：</p><h3 id="❌-纯文本-混乱" tabindex="-1">❌ 纯文本（混乱） <a class="header-anchor" href="#❌-纯文本-混乱" aria-label="Permalink to &quot;❌ 纯文本（混乱）&quot;">​</a></h3><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>帮我分析一下这段代码有什么问题，然后给个优化方案，输出的时候用表格格式。</span></span>
<span class="line"><span>另外记得考虑一下安全问题，性能也要看，不用太关注代码风格。</span></span></code></pre></div><h3 id="✅-结构化-清晰" tabindex="-1">✅ 结构化（清晰） <a class="header-anchor" href="#✅-结构化-清晰" aria-label="Permalink to &quot;✅ 结构化（清晰）&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">分析以下代码，输出问题报告和优化方案。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 分析范围</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 安全问题（优先）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 性能瓶颈</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 不关注：代码风格、命名规范</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 输出格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">| 问题类型 | 严重程度 | 位置 | 问题描述 | 修改建议 |</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">|----------|---------|------|---------|---------|</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 代码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`python</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> process</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(data):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ...</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>AI 能清晰地知道：要分析什么、关注什么、不关注什么、输出什么格式。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 三种结构化格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Markdown 格式（推荐）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最通用、最易读，适合大多数场景。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`markdown</span></span>
<span class="line"><span># 角色</span></span>
<span class="line"><span>你是一位前端性能优化专家。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 任务</span></span>
<span class="line"><span>对以下 React 组件进行性能审查。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 审查清单</span></span>
<span class="line"><span>1. 不必要的 re-render</span></span>
<span class="line"><span>2. useEffect 依赖问题</span></span>
<span class="line"><span>3. 大列表渲染性能</span></span>
<span class="line"><span>4. 内存泄漏风险</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输出格式</span></span>
<span class="line"><span>每个问题用以下格式输出：</span></span>
<span class="line"><span>- **问题**：一句话描述</span></span>
<span class="line"><span>- **位置**：文件名 + 行号</span></span>
<span class="line"><span>- **影响**：性能影响程度（高/中/低）</span></span>
<span class="line"><span>- **修复**：代码片段</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 代码</span></span>
<span class="line"><span>\`\`\`jsx</span></span>
<span class="line"><span>// 待审查的代码...</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>### XML 格式</span></span>
<span class="line"><span></span></span>
<span class="line"><span>适合与 [RAG](/terms/rag) 系统配合，XML 标签天然适合做语义分段。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`xml</span></span>
<span class="line"><span>&lt;System&gt;</span></span>
<span class="line"><span>  &lt;Role&gt;数据分析师&lt;/Role&gt;</span></span>
<span class="line"><span>  &lt;Task&gt;分析以下销售数据&lt;/Task&gt;</span></span>
<span class="line"><span>  &lt;OutputFormat&gt;JSON&lt;/OutputFormat&gt;</span></span>
<span class="line"><span>&lt;/System&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Context&gt;</span></span>
<span class="line"><span>  &lt;Industry&gt;电商&lt;/Industry&gt;</span></span>
<span class="line"><span>  &lt;Period&gt;2025 Q1&lt;/Period&gt;</span></span>
<span class="line"><span>&lt;/Context&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Data&gt;</span></span>
<span class="line"><span>  &lt;sales&gt;</span></span>
<span class="line"><span>    &lt;month&gt;1月&lt;/month&gt;</span></span>
<span class="line"><span>    &lt;revenue&gt;120000&lt;/revenue&gt;</span></span>
<span class="line"><span>  &lt;/sales&gt;</span></span>
<span class="line"><span>&lt;/Data&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;Instructions&gt;</span></span>
<span class="line"><span>  &lt;step&gt;1. 计算环比增长率&lt;/step&gt;</span></span>
<span class="line"><span>  &lt;step&gt;2. 识别异常数据点&lt;/step&gt;</span></span>
<span class="line"><span>  &lt;step&gt;3. 给出 3 条优化建议&lt;/step&gt;</span></span>
<span class="line"><span>&lt;/Instructions&gt;</span></span></code></pre></div><h3 id="json-格式" tabindex="-1">JSON 格式 <a class="header-anchor" href="#json-格式" aria-label="Permalink to &quot;JSON 格式&quot;">​</a></h3><p>适合程序化生成 Prompt 的场景。</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;role&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;代码审查员&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;task&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;审查代码质量&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;criteria&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;安全性&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;性能&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;可维护性&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;ignore&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;命名风格&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;注释格式&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">],</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;output_format&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;array&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;items&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;severity&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;location&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;description&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;suggestion&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;string&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><hr><h2 id="结构化模板-万能任务框架" tabindex="-1">结构化模板：万能任务框架 <a class="header-anchor" href="#结构化模板-万能任务框架" aria-label="Permalink to &quot;结构化模板：万能任务框架&quot;">​</a></h2><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 角色</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">你是什么角色，有什么专业背景</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 背景</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">当前的任务背景和上下文</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 任务</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[具体的任务描述，用 1-2 句话]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 约束</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [约束 1]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [约束 2]</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [约束 3]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 输出格式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[说明你想要的输出格式：表格 / 列表 / 代码 / JSON]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 示例（可选）</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">输入：[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">示例输入</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">输出：[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">示例输出</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># 内容</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">你的实际输入内容放在最后</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><hr><h2 id="进阶阅读" tabindex="-1">进阶阅读 <a class="header-anchor" href="#进阶阅读" aria-label="Permalink to &quot;进阶阅读&quot;">​</a></h2><ul><li><a href="./system-prompt.html">System Prompt 设计</a> — 把结构化模板融入 System Prompt</li><li><a href="./principles.html">清晰指令五原则</a> — 五原则在结构化模板中的体现</li></ul>`,19))])}const m=p(r,[["render",o]]);export{C as __pageData,m as default};
