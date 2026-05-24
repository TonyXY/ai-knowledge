import{_ as l,O as e,H as t,f as i,b as n,j as a,k as o,i as c}from"./chunks/framework.Pt2pSV98.js";const f=JSON.parse('{"title":"学习类模板","description":"概念解释、错题分析、知识梳理、出题练习——把 AI 变成你的私人教师","frontmatter":{"title":"学习类模板","description":"概念解释、错题分析、知识梳理、出题练习——把 AI 变成你的私人教师","difficulty":"beginner"},"headers":[],"relativePath":"prompts/learning.md","filePath":"prompts/learning.md"}'),r={name:"prompts/learning.md"},d={id:"学习类模板",tabindex:"-1"};function u(g,s,h,q,b,m){const p=e("DifficultyBadge");return t(),i("div",null,[n("h1",d,[s[0]||(s[0]=a("学习类模板 ",-1)),o(p,{level:"beginner"}),s[1]||(s[1]=a()),s[2]||(s[2]=n("a",{class:"header-anchor",href:"#学习类模板","aria-label":'Permalink to "学习类模板 <DifficultyBadge level="beginner" />"'},"​",-1))]),s[3]||(s[3]=c(`<p>AI 是最好的私人教师——全年无休、知识广博、无限耐心。但关键是怎样提问。敷衍地问等于敷衍地答，结构化地引导才能获得高质量的教学。以下四个模板帮你把 AI 变成真正的学习伙伴。</p><hr><h2 id="模板一-概念解释-费曼学习法" tabindex="-1">模板一：概念解释（费曼学习法） <a class="header-anchor" href="#模板一-概念解释-费曼学习法" aria-label="Permalink to &quot;模板一：概念解释（费曼学习法）&quot;">​</a></h2><p><strong>场景说明</strong>：用最简单的方式理解一个复杂概念。核心思路是「如果你不能向一个小学生解释清楚，说明你还没真正理解」。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>请用费曼学习法的方式解释 [概念名称]：</span></span>
<span class="line"><span>1. 先用一句话给出最简单的定义</span></span>
<span class="line"><span>2. 然后用一个小学生能听懂的比喻或故事来解释</span></span>
<span class="line"><span>3. 举一个生活中的例子</span></span>
<span class="line"><span>4. 最后说明&quot;如果不理解这个概念，你会搞错什么&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>概念：[填入你想理解的概念，如&quot;反向传播&quot;、&quot;区块链&quot;、&quot;向量数据库&quot;]</span></span></code></pre></div><p><strong>使用技巧</strong>：</p><ul><li>如果第一次解释还不够简单，追加：<code>把这个解释再降一个年级</code></li><li>适合学完一个概念后，用这个模板验证自己是否真懂了</li><li>可以要求 AI 以特定角色讲解，如&quot;假设你是小学科学老师&quot;</li></ul><hr><h2 id="模板二-错题分析" tabindex="-1">模板二：错题分析 <a class="header-anchor" href="#模板二-错题分析" aria-label="Permalink to &quot;模板二：错题分析&quot;">​</a></h2><p><strong>场景说明</strong>：把自己做错的题目、写错的代码、答错的问题交给 AI，让它分析原因并纠正。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 我的错误答案/代码</span></span>
<span class="line"><span>[粘贴你的错误答案或代码]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 正确参考答案（如果有）</span></span>
<span class="line"><span>[粘贴正确答案或代码]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 请帮我分析</span></span>
<span class="line"><span>1. 我错在哪里：指出错误的具体位置和原因</span></span>
<span class="line"><span>2. 我为什么会犯这个错：分析常见的错误思维模式（是概念不清、还是粗心、还是方法不对）</span></span>
<span class="line"><span>3. 正确的思路是什么：从第一步开始，重新推导正确的解题/编程思路</span></span>
<span class="line"><span>4. 举一反三：出一个同类型的题目让我练习</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 我的知识水平</span></span>
<span class="line"><span>[说明你目前的学习阶段，如&quot;刚学完 Python 基础，正在做练习&quot;]</span></span></code></pre></div><p><strong>使用技巧</strong>：</p><ul><li>错误分析的质量取决于你提供的「错误上下文」——除了错误本身，告诉 AI 你是怎么思考的</li><li>不要把正确答案直接给 AI（除非真的有），让它自己推理正确解法</li><li>如果 AI 分析得不准，追加你的真实思考过程：<code>我当时的想法是这样的……</code></li></ul><hr><h2 id="模板三-知识梳理" tabindex="-1">模板三：知识梳理 <a class="header-anchor" href="#模板三-知识梳理" aria-label="Permalink to &quot;模板三：知识梳理&quot;">​</a></h2><p><strong>场景说明</strong>：让 AI 帮你把零散的知识点串成一个结构化体系，生成文字版思维导图或知识图谱。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>我最近在学习 [学科/主题]，请帮我梳理知识体系。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 我的学习目标</span></span>
<span class="line"><span>[说明你的目标，如&quot;备考计算机二级&quot;、&quot;转行学前端&quot;、&quot;入门机器学习&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 我已经学过的内容</span></span>
<span class="line"><span>[列出你已经掌握的零散知识点]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 请生成</span></span>
<span class="line"><span>1. 知识框架（用缩进文本表示层级结构，类似思维导图）</span></span>
<span class="line"><span>2. 标注重点和难点（用 ⭐ 表示重要，用 ⚠️ 表示容易混淆）</span></span>
<span class="line"><span>3. 推荐学习顺序（先学什么、再学什么、为什么）</span></span>
<span class="line"><span>4. 知识关联图（用文字描述：A 是 B 的基础，B 和 C 互相依赖等）</span></span></code></pre></div><p><strong>使用技巧</strong>：</p><ul><li>知识框架生成后，可以逐个点追问：<code>请详细解释第 2 部分的第 3 个知识点</code></li><li>适合每学完一个阶段做一次梳理，建立全局认知</li><li>如果不满意结构，追加：<code>请换个角度重新组织，比如从应用场景出发</code></li></ul><hr><h2 id="模板四-出题练习" tabindex="-1">模板四：出题练习 <a class="header-anchor" href="#模板四-出题练习" aria-label="Permalink to &quot;模板四：出题练习&quot;">​</a></h2><p><strong>场景说明</strong>：让 AI 根据你指定的知识点出题，做完后 AI 帮你批改并讲解。</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 出题要求</span></span>
<span class="line"><span>- 知识点：[填入你要练习的知识点，如&quot;Python 列表推导式&quot;]</span></span>
<span class="line"><span>- 难度：[初级/中级/高级]</span></span>
<span class="line"><span>- 题型：[选择题/填空题/编程题/简答题]</span></span>
<span class="line"><span>- 数量：5 题</span></span>
<span class="line"><span>- 附加要求：题目要有代表性，覆盖这个知识点的不同用法</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 使用流程</span></span>
<span class="line"><span>1. 你一次出一道题，等我回答后再出下一题</span></span>
<span class="line"><span>2. 如果我答对了，简要确认并说明为什么对</span></span>
<span class="line"><span>3. 如果我答错了，不要直接给答案，先给我一个提示</span></span>
<span class="line"><span>4. 全部完成后，给出总结：我掌握得好的地方 + 需要加强的地方</span></span>
<span class="line"><span></span></span>
<span class="line"><span>开始出第 1 题。</span></span></code></pre></div><p><strong>使用技巧</strong>：</p><ul><li>这种方式模拟了苏格拉底式教学——引导你自己找到答案，而非直接告知</li><li>可以在&quot;附加要求&quot;中指定陷阱题的比例（如&quot;2 道陷阱题，考察常见误区&quot;）</li><li>做完一轮后，可以追加：<code>根据我的错题，再出一组针对性的强化练习</code></li></ul><hr><h2 id="学习类-prompt-通用原则" tabindex="-1">学习类 Prompt 通用原则 <a class="header-anchor" href="#学习类-prompt-通用原则" aria-label="Permalink to &quot;学习类 Prompt 通用原则&quot;">​</a></h2><ol><li><strong>告诉 AI 你的知识水平</strong>——对初中生和对研究生的解释应该完全不同</li><li><strong>分步交互</strong>——不要让 AI 一次性输出所有内容，而是要一问一答、逐步深入</li><li><strong>要求举例</strong>——一个生动的例子胜过十句抽象描述</li><li><strong>主动暴露你的困惑</strong>——&quot;我对这里还不理解&quot;比&quot;我懂了&quot;更能换来好答案</li><li><strong>用输出倒逼输入</strong>——试着用自己的话向 AI 解释一个概念，让 AI 帮你纠正</li></ol>`,28))])}const x=l(r,[["render",u]]);export{f as __pageData,x as default};
