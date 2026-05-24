import { defineConfig } from 'vitepress'

const base = '/ai-knowledge/'

export default defineConfig({
  base,
  title: 'AI 知识学习',
  description: '系统学习 AI 知识 — 术语·提示词·工具·实操',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
    ['meta', { name: 'theme-color', content: '#6366f1' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap', rel: 'stylesheet' }]
  ],

  themeConfig: {
    logo: '/logo.svg',

    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '📖 AI 术语', link: '/terms/' },
      { text: '💬 提示词', link: '/prompts/' },
      { text: '🛠️ AI 工具', link: '/tools/' },
      { text: '🧪 实操', link: '/practices/' },
      { text: '🔧 AI 开发', link: '/dev/' },
      { text: '🧭 学习路线', link: '/roadmap/' }
    ],

    // 侧边栏
    sidebar: {
      '/terms/': [
        {
          text: '📜 发展历程',
          link: '/terms/history'
        },
        {
          text: '按难度',
          items: [
            { text: '🟢 入门术语', link: '/terms/beginner' },
            { text: '🟡 进阶术语', link: '/terms/intermediate' },
            { text: '🔴 高级术语', link: '/terms/advanced' }
          ]
        },
        {
          text: '全部术语',
          link: '/terms/',
          items: [
            { text: 'AI / ML / DL', link: '/terms/ai-ml-dl' },
            { text: '大语言模型 (LLM)', link: '/terms/llm' },
            { text: 'Token', link: '/terms/token' },
            { text: '上下文窗口', link: '/terms/context-window' },
            { text: 'Prompt', link: '/terms/prompt' },
            { text: '多模态', link: '/terms/multimodal' },
            { text: '参数 (Parameters)', link: '/terms/parameters' },
            { text: '训练 / 推理', link: '/terms/training-inference' },
            { text: '微调 (Fine-tuning)', link: '/terms/fine-tuning' },
            { text: 'Transformer', link: '/terms/transformer' },
            { text: '自注意力机制', link: '/terms/self-attention' },
            { text: 'RAG', link: '/terms/rag' },
            { text: 'Embedding', link: '/terms/embedding' },
            { text: '向量数据库', link: '/terms/vector-db' },
            { text: 'Function Calling', link: '/terms/function-calling' },
            { text: 'Agent', link: '/terms/agent' },
            { text: 'MoE', link: '/terms/moe' },
            { text: '思维链 (CoT)', link: '/terms/cot' },
            { text: 'RLHF', link: '/terms/rlhf' },
            { text: 'KV Cache', link: '/terms/kv-cache' },
            { text: 'Prompt Caching', link: '/terms/prompt-caching' },
            { text: 'DPO', link: '/terms/dpo' },
            { text: 'AI Skills', link: '/terms/ai-skills' },
            { text: 'MCP', link: '/terms/mcp' },
            { text: 'AI 伦理与法规', link: '/terms/ai-ethics' }
          ]
        }
      ],

      '/roadmap/': [
        {
          text: '学习路线',
          items: [
            { text: '第 0 周：AI 发展历程', link: '/terms/history' },
            { text: '第 1 周：AI 术语', link: '/terms/' },
            { text: '第 2 周：提示词', link: '/prompts/' },
            { text: '第 3 周：AI 工具', link: '/tools/' },
            { text: '第 4 周：实操', link: '/practices/' },
            { text: '第 5 周：AI 编程', link: '/dev/openai-api' },
            { text: '第 6 周：工程化', link: '/dev/app-architecture' },
            { text: '第 7 周：深入拓展', link: '/dev/multimodal-vision' }
          ]
        }
      ],

      '/prompts/': [
        { text: '📋 总览', link: '/prompts/' },
        {
          text: '基础篇',
          items: [
            { text: '什么是 Prompt', link: '/prompts/what-is-prompt' },
            { text: '清晰指令五原则', link: '/prompts/principles' },
            { text: '角色设定', link: '/prompts/role-prompting' },
            { text: 'Few-Shot / Zero-Shot', link: '/prompts/few-shot' }
          ]
        },
        {
          text: '进阶技巧',
          items: [
            { text: '思维链 (CoT)', link: '/terms/cot' },
            { text: 'System Prompt 设计', link: '/prompts/system-prompt' },
            { text: '结构化提示词', link: '/prompts/structured-prompt' }
          ]
        },
        {
          text: '场景模板',
          items: [
            { text: '翻译类', link: '/prompts/translation' },
            { text: '学习类', link: '/prompts/learning' },
            { text: '角色扮演类', link: '/prompts/roleplay' },
            { text: '写作类', link: '/prompts/writing' },
            { text: '编程类', link: '/prompts/coding' },
            { text: '分析类', link: '/prompts/analysis' }
          ]
        },
        {
          text: 'Prompt 优化',
          items: [
            { text: '优化前后对比', link: '/prompts/prompt-comparison' }
          ]
        }
      ],

      '/tools/': [
        { text: '📋 总览', link: '/tools/' },
        {
          text: '📊 大模型对比',
          link: '/tools/model-comparison'
        },
        {
          text: '对话助手',
          items: [
            { text: 'ChatGPT', link: '/tools/chatgpt' },
            { text: 'Claude', link: '/tools/claude' },
            { text: 'DeepSeek', link: '/tools/deepseek' },
            { text: 'Kimi', link: '/tools/kimi' },
            { text: 'Gemini', link: '/tools/gemini' }
          ]
        },
        {
          text: '编程助手',
          items: [
            { text: 'Cursor', link: '/tools/cursor' },
            { text: 'Windsurf', link: '/tools/windsurf' },
            { text: 'GitHub Copilot', link: '/tools/copilot' },
            { text: 'OpenCode', link: '/tools/opencode' }
          ]
        },
        {
          text: '图像工具',
          items: [
            { text: 'Midjourney', link: '/tools/midjourney' },
            { text: 'DALL·E', link: '/tools/dalle' },
            { text: 'Stable Diffusion', link: '/tools/stable-diffusion' }
          ]
        },
        {
          text: '视频与音频',
          items: [
            { text: 'Sora', link: '/tools/sora' },
            { text: 'Runway', link: '/tools/runway' },
            { text: 'ElevenLabs', link: '/tools/elevenlabs' },
            { text: 'Suno', link: '/tools/suno' }
          ]
        },
        {
          text: '搜索工具',
          items: [
            { text: 'Perplexity', link: '/tools/perplexity' }
          ]
        }
      ],

      '/dev/': [
        { text: '📋 总览', link: '/dev/' },
        {
          text: 'API 编程',
          items: [
            { text: 'OpenAI API 入门', link: '/dev/openai-api' },
            { text: '流式响应 (Streaming)', link: '/dev/streaming' },
            { text: '多模态编程 (Vision API)', link: '/dev/multimodal-vision' },
            { text: 'Tool Calling', link: '/dev/tool-calling' },
            { text: '结构化输出 (JSON Mode)', link: '/dev/structured-output' },
            { text: '推理模型使用', link: '/dev/reasoning-models' }
          ]
        },
        {
          text: 'Agent 开发',
          items: [
            { text: 'Agent 核心概念', link: '/dev/agent-intro' },
            { text: '构建第一个 Agent', link: '/dev/build-agent' },
            { text: 'Tool 定义与实现', link: '/dev/tool-definition' }
          ]
        },
        {
          text: '工程实践',
          items: [
            { text: 'AI 应用架构', link: '/dev/app-architecture' },
            { text: 'MCP 协议实践', link: '/dev/mcp-practice' },
            { text: '模型评估与测试', link: '/dev/model-evaluation' },
            { text: 'AI 安全', link: '/dev/ai-security' },
            { text: '本地模型部署', link: '/dev/local-models' },
            { text: 'RAG 深度实践', link: '/dev/rag-deep' },
            { text: 'LLM 可观测性', link: '/dev/observability' }
          ]
        },
        {
          text: '面试准备',
          items: [
            { text: 'AI 面试题汇总', link: '/dev/interview-questions' }
          ]
        }
      ],

      '/practices/': [
        { text: '📋 总览', link: '/practices/' },
        {
          text: '新手教程',
          items: [
            { text: '用 ChatGPT 辅助编程', link: '/practices/chatgpt-coding' },
            { text: '用 Cursor 搭建网页', link: '/practices/cursor-website' },
            { text: '用 Claude 分析文档', link: '/practices/claude-analysis' }
          ]
        },
        {
          text: '进阶教程',
          items: [
            { text: '搭建 RAG 知识库', link: '/practices/rag-knowledge-base' },
            { text: '构建 AI 聊天机器人', link: '/practices/ai-chatbot' },
            { text: 'Prompt 批量生成', link: '/practices/prompt-batch' }
          ]
        }
      ]
    },

    // 内置搜索
    search: {
      provider: 'local'
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TonyXY/ai-knowledge' }
    ],

    // 页脚
    footer: {
      message: '系统学习 AI，循序渐进',
      copyright: '仅供学习参考'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/TonyXY/ai-knowledge/edit/main/docs/:path'
    }
  }
})
