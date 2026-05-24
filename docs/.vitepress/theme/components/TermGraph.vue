<template>
  <div class="term-graph-wrapper">
    <svg :width="svgWidth" :height="svgHeight" class="term-graph-svg">
      <!-- 连边 -->
      <line
        v-for="(edge, i) in edges"
        :key="'e' + i"
        :x1="edge.source.x"
        :y1="edge.source.y"
        :x2="edge.target.x"
        :y2="edge.target.y"
        stroke="#cbd5e1"
        stroke-width="1.5"
        stroke-dasharray="4,3"
      />
      <!-- 节点 -->
      <g
        v-for="node in nodes"
        :key="node.id"
        :transform="`translate(${node.x}, ${node.y})`"
        class="term-node"
        @click="go(node.slug)"
      >
        <circle
          r="22"
          :fill="colorMap[node.level]"
          stroke="#fff"
          stroke-width="2"
          class="node-circle"
        />
        <text
          text-anchor="middle"
          dy="5"
          fill="#fff"
          font-size="11"
          font-weight="600"
        >{{ node.label }}</text>
        <text
          y="34"
          text-anchor="middle"
          fill="#64748b"
          font-size="10"
        >{{ node.cn }}</text>
      </g>
    </svg>
    <div class="graph-legend">
      <span><span class="dot" style="background:#6366f1"></span> 入门</span>
      <span><span class="dot" style="background:#eab308"></span> 进阶</span>
      <span><span class="dot" style="background:#ef4444"></span> 高级</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const svgWidth = 800
const svgHeight = 560
const colorMap = { beginner: '#6366f1', intermediate: '#eab308', advanced: '#ef4444' }

const go = (slug) => { if (slug) router.go(slug) }

const rawNodes = [
  { id: 'llm', label: 'LLM', cn: '大语言模型', slug: '/terms/llm', level: 'beginner', x: 400, y: 60 },
  // 入门-左
  { id: 'token', label: 'Token', cn: '词元', slug: '/terms/token', level: 'beginner', x: 180, y: 160 },
  { id: 'ctx', label: 'Context', cn: '上下文窗口', slug: '/terms/context-window', level: 'beginner', x: 300, y: 160 },
  { id: 'prompt', label: 'Prompt', cn: '提示词', slug: '/terms/prompt', level: 'beginner', x: 500, y: 160 },
  { id: 'param', label: 'Params', cn: '参数', slug: '/terms/parameters', level: 'beginner', x: 620, y: 160 },
  // 入门-右
  { id: 'mm', label: 'Multi', cn: '多模态', slug: '/terms/multimodal', level: 'beginner', x: 130, y: 260 },
  { id: 'train', label: 'Train', cn: '训练/推理', slug: '/terms/training-inference', level: 'beginner', x: 420, y: 260 },
  { id: 'ft', label: 'FT', cn: '微调', slug: '/terms/fine-tuning', level: 'beginner', x: 660, y: 260 },
  // 进阶
  { id: 'trans', label: 'TF', cn: 'Transformer', slug: '/terms/transformer', level: 'intermediate', x: 200, y: 360 },
  { id: 'sa', label: 'Attn', cn: '自注意力', slug: '/terms/self-attention', level: 'intermediate', x: 330, y: 360 },
  { id: 'rag', label: 'RAG', cn: '检索增强', slug: '/terms/rag', level: 'intermediate', x: 530, y: 360 },
  { id: 'fc', label: 'FC', cn: 'Function Calling', slug: '/terms/function-calling', level: 'intermediate', x: 680, y: 360 },
  { id: 'emb', label: 'Emb', cn: 'Embedding', slug: '/terms/embedding', level: 'intermediate', x: 150, y: 460 },
  { id: 'vdb', label: 'VecDB', cn: '向量数据库', slug: '/terms/vector-db', level: 'intermediate', x: 280, y: 460 },
  { id: 'agent', label: 'Agent', cn: '智能体', slug: '/terms/agent', level: 'intermediate', x: 530, y: 460 },
  { id: 'mcp', label: 'MCP', cn: '模型协议', slug: '/terms/mcp', level: 'intermediate', x: 660, y: 460 },
  // 高级
  { id: 'moe', label: 'MoE', cn: '混合专家', slug: '/terms/moe', level: 'advanced', x: 330, y: 520 },
  { id: 'cot', label: 'CoT', cn: '思维链', slug: '/terms/cot', level: 'advanced', x: 430, y: 520 },
  { id: 'rlhf', label: 'RLHF', cn: '人类反馈', slug: '/terms/rlhf', level: 'advanced', x: 530, y: 520 },
  { id: 'dpo', label: 'DPO', cn: '直接优化', slug: '/terms/dpo', level: 'advanced', x: 630, y: 520 },
]

const edges = [
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'token') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'ctx') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'prompt') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'param') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'mm') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'train') },
  { source: rawNodes.find(n => n.id === 'llm'), target: rawNodes.find(n => n.id === 'trans') },
  { source: rawNodes.find(n => n.id === 'trans'), target: rawNodes.find(n => n.id === 'sa') },
  { source: rawNodes.find(n => n.id === 'train'), target: rawNodes.find(n => n.id === 'ft') },
  { source: rawNodes.find(n => n.id === 'ft'), target: rawNodes.find(n => n.id === 'rlhf') },
  { source: rawNodes.find(n => n.id === 'ft'), target: rawNodes.find(n => n.id === 'dpo') },
  { source: rawNodes.find(n => n.id === 'param'), target: rawNodes.find(n => n.id === 'moe') },
  { source: rawNodes.find(n => n.id === 'trans'), target: rawNodes.find(n => n.id === 'rag') },
  { source: rawNodes.find(n => n.id === 'rag'), target: rawNodes.find(n => n.id === 'emb') },
  { source: rawNodes.find(n => n.id === 'rag'), target: rawNodes.find(n => n.id === 'vdb') },
  { source: rawNodes.find(n => n.id === 'fc'), target: rawNodes.find(n => n.id === 'agent') },
  { source: rawNodes.find(n => n.id === 'agent'), target: rawNodes.find(n => n.id === 'mcp') },
  { source: rawNodes.find(n => n.id === 'prompt'), target: rawNodes.find(n => n.id === 'cot') },
  { source: rawNodes.find(n => n.id === 'cot'), target: rawNodes.find(n => n.id === 'agent') },
  { source: rawNodes.find(n => n.id === 'rag'), target: rawNodes.find(n => n.id === 'fc') },
  { source: rawNodes.find(n => n.id === 'agent'), target: rawNodes.find(n => n.id === 'llm') },
]

const nodes = ref(rawNodes)
</script>

<style scoped>
.term-graph-wrapper {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  overflow-x: auto;
  margin: 20px 0;
}
.term-graph-svg {
  display: block;
  margin: 0 auto;
}
.term-node {
  cursor: pointer;
  transition: transform 0.15s;
}
.term-node:hover {
  transform: scale(1.1);
}
.term-node:hover .node-circle {
  filter: brightness(1.15);
}
.node-circle {
  transition: filter 0.15s;
}
.graph-legend {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 12px;
  font-size: 13px;
  color: #64748b;
}
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
  vertical-align: middle;
}
</style>
