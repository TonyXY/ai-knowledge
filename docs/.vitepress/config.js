import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI 知识学习',
  description: '系统学习 AI 知识 — 术语·提示词·工具·实操',
  lang: 'zh-CN',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
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
            { text: 'AI Skills', link: '/terms/ai-skills' },
            { text: 'MCP', link: '/terms/mcp' }
          ]
        }
      ],

      '/prompts/': [
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
            { text: '写作类', link: '/prompts/writing' },
            { text: '编程类', link: '/prompts/coding' },
            { text: '分析类', link: '/prompts/analysis' }
          ]
        }
      ],

      '/tools/': [
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
        }
      ],

      '/practices/': [
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
