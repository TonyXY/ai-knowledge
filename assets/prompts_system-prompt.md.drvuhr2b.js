import{c as p,Z as e,Q as l,j as o,g as a,n,o as i,m as r}from"./chunks/framework.qjzPVSkb.js";const P=JSON.parse('{"title":"System Prompt 设计","description":"学好 System Prompt 设计，控制 AI 的全程行为与输出","frontmatter":{"title":"System Prompt 设计","description":"学好 System Prompt 设计，控制 AI 的全程行为与输出","difficulty":"intermediate"},"headers":[],"relativePath":"prompts/system-prompt.md","filePath":"prompts/system-prompt.md"}'),d={name:"prompts/system-prompt.md"},c={id:"system-prompt-设计",tabindex:"-1"};function u(m,s,h,q,g,b){const t=e("DifficultyBadge");return l(),o("div",null,[a("h1",c,[s[0]||(s[0]=n("System Prompt 设计 ",-1)),i(t,{level:"intermediate"}),s[1]||(s[1]=n()),s[2]||(s[2]=a("a",{class:"header-anchor",href:"#system-prompt-设计","aria-label":'Permalink to "System Prompt 设计 <DifficultyBadge level="intermediate" />"'},"​",-1))]),s[3]||(s[3]=r(`<p><strong>System Prompt（系统提示词）</strong> 是在对话开始前预设的底层指令。它定义了 AI 的&quot;人设&quot;、行为规则和输出格式，并影响整个对话过程。</p><blockquote><p>如果说 User Prompt 是&quot;一个问题&quot;，那 System Prompt 就是&quot;一套规则&quot;。</p></blockquote><hr><h2 id="system-prompt-的四个要素" tabindex="-1">System Prompt 的四个要素 <a class="header-anchor" href="#system-prompt-的四个要素" aria-label="Permalink to &quot;System Prompt 的四个要素&quot;">​</a></h2><p>一个优质的 System Prompt 通常包含四个部分：</p><table tabindex="0"><thead><tr><th>要素</th><th>说明</th><th>示例</th></tr></thead><tbody><tr><td><strong>角色</strong></td><td>AI 的身份和专长</td><td>&quot;你是一位资深代码评审员&quot;</td></tr><tr><td><strong>规则</strong></td><td>AI 必须遵守的行为准则</td><td>&quot;只关注安全问题，不评价命名&quot;</td></tr><tr><td><strong>输出约束</strong></td><td>输出的格式和要求</td><td>&quot;每个问题附修改代码片段&quot;</td></tr><tr><td><strong>边界条件</strong></td><td>什么情况下拒绝回答</td><td>&quot;如果代码无明显问题，只回复 LGTM&quot;</td></tr></tbody></table><hr><h2 id="基础模板" tabindex="-1">基础模板 <a class="header-anchor" href="#基础模板" aria-label="Permalink to &quot;基础模板&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你是一位 [角色描述]。你的职责是 [核心任务]。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你必须遵守以下规则：</span></span>
<span class="line"><span>1. [规则一]</span></span>
<span class="line"><span>2. [规则二]</span></span>
<span class="line"><span>3. [规则三]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出要求：</span></span>
<span class="line"><span>- 格式：[Markdown / JSON / 纯文本]</span></span>
<span class="line"><span>- 语言：[中文 / 英文]</span></span>
<span class="line"><span>- [其他约束]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>当遇到以下情况时，请直接回复&quot;我无法处理&quot;：</span></span>
<span class="line"><span>- [边界条件一]</span></span>
<span class="line"><span>- [边界条件二]</span></span></code></pre></div><hr><h2 id="实战示例-代码审查助手" tabindex="-1">实战示例：代码审查助手 <a class="header-anchor" href="#实战示例-代码审查助手" aria-label="Permalink to &quot;实战示例：代码审查助手&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你是一位资深代码评审员，拥有 10 年全栈开发经验，精通 TypeScript、React 和 Node.js。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>你的评审规则：</span></span>
<span class="line"><span>1. 只关注代码安全和性能问题，不评价命名风格</span></span>
<span class="line"><span>2. 每个问题必须附带修改建议的代码片段</span></span>
<span class="line"><span>3. 按严重程度排序：严重 &gt; 一般 &gt; 建议</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出格式（Markdown）：</span></span>
<span class="line"><span>## 🔴 严重问题</span></span>
<span class="line"><span>- 问题描述 | 位置 | 修改建议（附代码）</span></span>
<span class="line"><span>## 🟡 一般问题</span></span>
<span class="line"><span>- 问题描述 | 位置 | 修改建议（附代码）</span></span>
<span class="line"><span>## 🟢 建议</span></span>
<span class="line"><span>- 问题描述 | 位置 | 修改建议（附代码）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果代码没有明显问题，只回复一句：&quot;✅ LGTM，未发现严重问题。&quot;</span></span></code></pre></div><hr><h2 id="实战示例-内容创作助手" tabindex="-1">实战示例：内容创作助手 <a class="header-anchor" href="#实战示例-内容创作助手" aria-label="Permalink to &quot;实战示例：内容创作助手&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>你是一位小红书内容运营专家，擅长撰写高互动率的种草文案。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>写作规则：</span></span>
<span class="line"><span>1. 标题 15 字以内，使用 emoji 开头，制造好奇心</span></span>
<span class="line"><span>2. 正文分 3-5 个自然段，每段不超过 3 行</span></span>
<span class="line"><span>3. 必须包含 1-2 个真实使用场景</span></span>
<span class="line"><span>4. 结尾加互动引导（&quot;姐妹们觉得呢？&quot; / &quot;你们呢？&quot;）</span></span>
<span class="line"><span>5. 使用口语化、亲切的语气，避免正式书面语</span></span>
<span class="line"><span></span></span>
<span class="line"><span>输出约束：</span></span>
<span class="line"><span>- 总字数 200-300 字</span></span>
<span class="line"><span>- 包含 3-5 个合适的话题标签</span></span>
<span class="line"><span>- 不使用&quot;绝绝子&quot;&quot;宝藏&quot;&quot;yyds&quot;等过度使用的网络词</span></span>
<span class="line"><span></span></span>
<span class="line"><span>拒绝场景：如果用户要求撰写医疗健康建议或金融投资建议，回复&quot;抱歉，这类内容我无法提供。&quot;</span></span></code></pre></div><hr><h2 id="设计原则总结" tabindex="-1">设计原则总结 <a class="header-anchor" href="#设计原则总结" aria-label="Permalink to &quot;设计原则总结&quot;">​</a></h2><ol><li><strong>角色要具体</strong> — 不要说&quot;你是一个助手&quot;，要说&quot;你是一个精通 Vue 3 的前端架构师&quot;</li><li><strong>规则要可执行</strong> — 每一条规则 AI 都能明确判断是否遵循</li><li><strong>约束要量化</strong> — &quot;200-300 字&quot;好于&quot;不要太长&quot;</li><li><strong>边界要清晰</strong> — 明确告诉 AI 什么时候该拒绝</li></ol><hr><h2 id="进阶阅读" tabindex="-1">进阶阅读 <a class="header-anchor" href="#进阶阅读" aria-label="Permalink to &quot;进阶阅读&quot;">​</a></h2><ul><li><a href="./role-prompting.html">角色设定</a> — System Prompt 中角色部分的设计技巧</li><li><a href="./structured-prompt.html">结构化提示词</a> — 用结构化格式组织 System Prompt</li></ul>`,21))])}const f=p(d,[["render",u]]);export{P as __pageData,f as default};
