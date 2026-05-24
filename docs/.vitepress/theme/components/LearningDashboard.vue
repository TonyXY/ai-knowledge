<template>
  <div class="dashboard" v-if="ready">
    <!-- 总体进度 -->
    <div class="summary-card">
      <div class="summary-ring-wrap">
        <svg viewBox="0 0 120 120" class="summary-ring">
          <path class="sr-bg" d="M60 10a50 50 0 1 1 0 100a50 50 0 0 1 0-100"/>
          <path class="sr-fg" :d="ringPath" :style="ringStyle"/>
        </svg>
        <div class="sr-text">
          <span class="sr-pct">{{ pct }}%</span>
          <span class="sr-label">已完成</span>
        </div>
      </div>
      <div class="summary-stats">
        <div class="stat-item"><span class="stat-num">{{ done }}</span><span class="stat-lbl">已学页面</span></div>
        <div class="stat-divider"/>
        <div class="stat-item"><span class="stat-num">{{ total }}</span><span class="stat-lbl">核心页面</span></div>
      </div>
    </div>

    <!-- 各模块进度 -->
    <div v-for="mod in modules" :key="mod.key" class="mod-card">
      <div class="mod-head">
        <span class="mod-icon">{{ mod.icon }}</span>
        <span class="mod-name">{{ mod.label }}</span>
        <span class="mod-pct">{{ mod.done }}/{{ mod.pages.length }}</span>
      </div>
      <div class="mod-bar-wrap"><div class="mod-bar-fill" :style="{ width: (mod.done / mod.pages.length * 100) + '%' }"/></div>
      <div class="mod-pages">
        <span v-for="p in mod.pages" :key="p.slug"
          class="page-chip"
          :class="{ visited: p.done, unvisited: !p.done }"
          @click="go(`/${mod.key}/${p.slug}`)">
          {{ p.done ? '✅' : '⭕' }} {{ p.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

const router = useRouter()
const go = (path) => { window.location.href = withBase(path) }

const STORAGE_KEY = 'ai-knowledge-progress'
const ready = ref(false)

const PAGE_DEFS = {
  terms: { icon: '📖', label: 'AI 术语',
    pages: [
      { slug: 'ai-ml-dl', label: 'AI/ML/DL' }, { slug: 'llm', label: 'LLM' },
      { slug: 'token', label: 'Token' }, { slug: 'context-window', label: '上下文窗口' },
      { slug: 'prompt', label: 'Prompt' }, { slug: 'multimodal', label: '多模态' },
      { slug: 'parameters', label: '参数' }, { slug: 'training-inference', label: '训练/推理' },
      { slug: 'fine-tuning', label: '微调' }, { slug: 'transformer', label: 'Transformer' },
      { slug: 'self-attention', label: '自注意力' }, { slug: 'rag', label: 'RAG' },
      { slug: 'embedding', label: 'Embedding' }, { slug: 'vector-db', label: '向量数据库' },
      { slug: 'function-calling', label: 'Function Calling' }, { slug: 'agent', label: 'Agent' },
      { slug: 'moe', label: 'MoE' }, { slug: 'cot', label: '思维链' },
      { slug: 'rlhf', label: 'RLHF' }, { slug: 'kv-cache', label: 'KV Cache' }
    ]
  },
  prompts: { icon: '💬', label: '提示词',
    pages: [
      { slug: 'what-is-prompt', label: '什么是 Prompt' }, { slug: 'principles', label: '清晰指令五原则' },
      { slug: 'role-prompting', label: '角色设定' }, { slug: 'few-shot', label: 'Few-Shot' },
      { slug: 'system-prompt', label: 'System Prompt' }, { slug: 'structured-prompt', label: '结构化提示词' },
      { slug: 'writing', label: '写作模板' }, { slug: 'coding', label: '编程模板' },
      { slug: 'analysis', label: '分析模板' }, { slug: 'translation', label: '翻译模板' },
      { slug: 'learning', label: '学习模板' }, { slug: 'roleplay', label: '角色扮演模板' }
    ]
  },
  tools: { icon: '🛠️', label: 'AI 工具',
    pages: [
      { slug: 'chatgpt', label: 'ChatGPT' }, { slug: 'claude', label: 'Claude' },
      { slug: 'deepseek', label: 'DeepSeek' }, { slug: 'kimi', label: 'Kimi' },
      { slug: 'gemini', label: 'Gemini' }, { slug: 'cursor', label: 'Cursor' },
      { slug: 'windsurf', label: 'Windsurf' }, { slug: 'copilot', label: 'Copilot' },
      { slug: 'opencode', label: 'OpenCode' }, { slug: 'midjourney', label: 'Midjourney' },
      { slug: 'dalle', label: 'DALL·E' }, { slug: 'stable-diffusion', label: 'Stable Diffusion' }
    ]
  },
  practices: { icon: '🧪', label: '实操',
    pages: [
      { slug: 'chatgpt-coding', label: 'ChatGPT 辅助编程' }, { slug: 'cursor-website', label: 'Cursor 搭建网页' },
      { slug: 'claude-analysis', label: 'Claude 分析文档' }, { slug: 'rag-knowledge-base', label: '搭建 RAG 知识库' },
      { slug: 'ai-chatbot', label: '构建 AI 聊天机器人' }, { slug: 'prompt-batch', label: 'Prompt 批量生成' },
      { slug: 'ai-translation', label: '用 AI 做翻译' }, { slug: 'ai-ppt', label: '用 AI 做 PPT' },
      { slug: 'ai-data-analysis', label: '用 AI 做数据整理' }
    ]
  },
  dev: { icon: '🔧', label: 'AI 开发',
    pages: [
      { slug: 'openai-api', label: 'OpenAI API 入门' }, { slug: 'streaming', label: '流式响应' },
      { slug: 'tool-calling', label: 'Tool Calling' }, { slug: 'structured-output', label: '结构化输出' },
      { slug: 'multimodal-vision', label: '多模态编程' }, { slug: 'reasoning-models', label: '推理模型使用' },
      { slug: 'agent-intro', label: 'Agent 核心概念' }, { slug: 'build-agent', label: '构建 Agent' },
      { slug: 'tool-definition', label: 'Tool 定义' }, { slug: 'app-architecture', label: 'AI 应用架构' },
      { slug: 'model-evaluation', label: '模型评估' }, { slug: 'ai-security', label: 'AI 安全' },
      { slug: 'local-models', label: '本地模型部署' }, { slug: 'mcp-practice', label: 'MCP 实践' },
      { slug: 'rag-deep', label: 'RAG 深度' }, { slug: 'observability', label: 'LLM 可观测性' }
    ]
  }
}

const modules = ref([])
const total = ref(0)
const done = ref(0)

const pct = computed(() => total.value ? Math.round(done.value / total.value * 100) : 0)
const ringPath = 'M60 10a50 50 0 1 1 0 100a50 50 0 0 1 0-100'
const circ = 2 * Math.PI * 50
const ringStyle = computed(() => ({
  strokeDasharray: `${circ} ${circ}`,
  strokeDashoffset: circ - pct.value / 100 * circ
}))

onMounted(() => {
  let visited = new Set()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) visited = new Set(JSON.parse(raw).visited)
  } catch {}

  const mods = Object.entries(PAGE_DEFS).map(([key, def]) => {
    const pages = def.pages.map(p => ({
      ...p,
      done: visited.has(`${key}/${p.slug}`)
    }))
    const d = pages.filter(p => p.done).length
    return { key, icon: def.icon, label: def.label, pages, done: d }
  })

  modules.value = mods
  done.value = mods.reduce((s, m) => s + m.done, 0)
  total.value = mods.reduce((s, m) => s + m.pages.length, 0)
  ready.value = true
})
</script>

<style scoped>
.dashboard { max-width: 720px; margin: 24px auto; }
.summary-card {
  display: flex; align-items: center; gap: 32px;
  padding: 24px; background: #f8fafc;
  border: 1px solid #e2e8f0; border-radius: 16px;
  margin-bottom: 20px;
}
.summary-ring-wrap { position: relative; width: 120px; height: 120px; flex-shrink: 0; }
.summary-ring { width: 120px; height: 120px; transform: rotate(-90deg); }
.sr-bg { fill: none; stroke: #e2e8f0; stroke-width: 8; }
.sr-fg { fill: none; stroke: #6366f1; stroke-width: 8; stroke-linecap: round; transition: stroke-dashoffset .6s; }
.sr-text {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.sr-pct { font-size: 28px; font-weight: 800; color: #6366f1; line-height: 1; }
.sr-label { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.summary-stats { display: flex; align-items: center; gap: 24px; }
.stat-item { display: flex; flex-direction: column; }
.stat-num { font-size: 24px; font-weight: 700; color: #1e293b; }
.stat-lbl { font-size: 12px; color: #94a3b8; }
.stat-divider { width: 1px; height: 40px; background: #e2e8f0; }
.mod-card {
  background: #fff; border: 1px solid #e2e8f0;
  border-radius: 12px; padding: 16px; margin-bottom: 12px;
}
.mod-head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.mod-icon { font-size: 18px; }
.mod-name { flex: 1; font-weight: 600; color: #1e293b; }
.mod-pct { font-size: 13px; color: #64748b; font-weight: 600; }
.mod-bar-wrap { height: 5px; background: #e2e8f0; border-radius: 3px; margin-bottom: 10px; }
.mod-bar-fill { height: 100%; background: linear-gradient(90deg,#6366f1,#a855f7); border-radius: 3px; transition: width .4s; }
.mod-pages { display: flex; flex-wrap: wrap; gap: 6px; }
.page-chip {
  font-size: 12px; padding: 3px 8px; border-radius: 999px;
  cursor: pointer; transition: background .15s;
}
.page-chip.visited { background: #f0fdf4; color: #166534; }
.page-chip.unvisited { background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; }
.page-chip:hover { filter: brightness(0.95); }
</style>
