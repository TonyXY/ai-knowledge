<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">
      <rect x="0" y="0" :width="w" :height="h" rx="12" fill="#f8fafc"/>

      <!-- 1. 用户提问 -->
      <g transform="translate(40,20)">
        <rect x="-50" y="0" width="100" height="32" rx="16" fill="#6366f1"/>
        <text x="0" y="21" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">用户提问</text>
        <line x1="50" y1="16" x2="110" y2="16" stroke="#6366f1" stroke-width="1.5"/>
        <polygon points="108,11 118,16 108,21" fill="#6366f1"/>
      </g>

      <!-- 2. Embedding -->
      <g transform="translate(200,10)">
        <rect x="-40" y="0" width="80" height="28" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="0" y="19" text-anchor="middle" font-size="10" fill="#4338ca" font-weight="600">Embedding</text>
        <line x1="40" y1="14" x2="80" y2="14" stroke="#6366f1" stroke-width="1.5"/>
        <polygon points="78,9 88,14 78,19" fill="#6366f1"/>
      </g>

      <!-- 3. 向量检索 -->
      <g transform="translate(330,5)">
        <rect x="-45" y="0" width="90" height="28" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="1.2"/>
        <text x="0" y="19" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">向量检索</text>
        <line x1="-45" y1="14" x2="-88" y2="14" stroke="#eab308" stroke-width="1.5"/>
        <polygon points="-90,9 -98,14 -90,19" fill="#eab308"/>
        <!-- 向量数据库图标 -->
        <rect x="-35" y="35" width="70" height="40" rx="6" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>
        <text x="0" y="49" text-anchor="middle" font-size="9" fill="#854d0e">向量数据库</text>
        <text x="0" y="63" text-anchor="middle" font-size="8" fill="#a16207">Top-K 文档</text>
      </g>

      <!-- Top-K 回来 -->
      <line x1="375" y1="45" x2="375" y2="90" stroke="#eab308" stroke-width="1.5"/>
      <line x1="375" y1="90" x2="200" y2="90" stroke="#eab308" stroke-width="1.5"/>
      <line x1="200" y1="90" x2="200" y2="68" stroke="#eab308" stroke-width="1.5"/>
      <polygon points="195,70 200,60 205,70" fill="#eab308"/>

      <!-- 4. 拼接上下文 -->
      <g transform="translate(100,70)">
        <rect x="0" y="0" width="200" height="36" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="100" y="23" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">拼接上下文：问题 + 检索结果</text>
      </g>

      <!-- 箭头到 LLM -->
      <line x1="200" y1="106" x2="200" y2="130" stroke="#6366f1" stroke-width="1.5"/>
      <polygon points="195,128 200,138 205,128" fill="#6366f1"/>

      <!-- 5. LLM 生成 -->
      <g transform="translate(100,138)">
        <rect x="0" y="0" width="200" height="36" rx="10" fill="#a855f7" opacity="0.15" stroke="#a855f7" stroke-width="1.5"/>
        <text x="100" y="23" text-anchor="middle" font-size="12" fill="#7e22ce" font-weight="700">🤖 大语言模型 LLM</text>
      </g>

      <!-- 箭头到输出 -->
      <line x1="200" y1="174" x2="200" y2="198" stroke="#a855f7" stroke-width="1.5"/>
      <polygon points="195,196 200,206 205,196" fill="#a855f7"/>

      <!-- 6. 最终回答 -->
      <g transform="translate(40,204)">
        <rect x="-50" y="0" width="100" height="32" rx="16" fill="#10b981"/>
        <text x="0" y="21" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">✅ 最终回答</text>
      </g>

      <!-- 底部：索引流程 -->
      <g transform="translate(40,260)">
        <text x="0" y="0" font-size="11" font-weight="600" fill="#1e293b">离线索引流程</text>
        <line x1="0" y1="10" x2="0" y2="20" stroke="#94a3b8" stroke-width="1"/>
        <rect x="-40" y="22" width="80" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="0" y="38" text-anchor="middle" font-size="9" fill="#475569">文档分块</text>
        <line x1="40" y1="34" x2="80" y2="34" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="78,29 88,34 78,39" fill="#94a3b8"/>
        <rect x="88" y="22" width="80" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="128" y="38" text-anchor="middle" font-size="9" fill="#475569">Embedding 编码</text>
        <line x1="168" y1="34" x2="200" y2="34" stroke="#94a3b8" stroke-width="1.5"/>
        <polygon points="198,29 208,34 198,39" fill="#94a3b8"/>
        <rect x="208" y="22" width="80" height="24" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="248" y="38" text-anchor="middle" font-size="9" fill="#475569">存入向量库</text>
      </g>

      <text x="250" y="310" text-anchor="middle" font-size="11" fill="#94a3b8">先把文档向量化存入数据库，用户提问时检索最相关的内容拼给 LLM</text>
    </svg>
  </div>
</template>

<script setup>
const w = 500, h = 330
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 500px; display: block; margin: 0 auto; }
</style>
