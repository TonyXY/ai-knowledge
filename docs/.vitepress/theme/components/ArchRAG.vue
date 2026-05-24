<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">

      <!-- ============ 在线流程（上半部分） ============ -->
      <text x="20" y="25" font-size="12" font-weight="700" fill="#1e293b">在线检索流程</text>

      <!-- 1. 用户提问 -->
      <g transform="translate(120,35)">
        <rect x="-55" y="0" width="110" height="32" rx="16" fill="#6366f1"/>
        <text x="0" y="21" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">🙋 用户提问</text>
      </g>

      <!-- 箭头向下 -->
      <line x1="120" y1="67" x2="120" y2="90" stroke="#6366f1" stroke-width="1.5"/>
      <polygon points="115,88 120,98 125,88" fill="#6366f1"/>

      <!-- 2. 向量化 -->
      <g transform="translate(30,100)">
        <rect x="0" y="0" width="180" height="36" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="90" y="23" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">① 向量化 Embedding</text>
      </g>

      <!-- 横线分割 -->
      <line x1="120" y1="136" x2="120" y2="150" stroke="#cbd5e1" stroke-width="1"/>

      <!-- 3. 向量检索 + 向量数据库 -->
      <g transform="translate(30,152)">
        <rect x="0" y="0" width="180" height="36" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="1.2"/>
        <text x="90" y="23" text-anchor="middle" font-size="11" fill="#854d0e" font-weight="600">② 向量检索 Top-K</text>
      </g>

      <g transform="translate(250,148)">
        <rect x="0" y="0" width="130" height="44" rx="8" fill="#fef9c3" stroke="#eab308" stroke-width="1.2"/>
        <text x="65" y="18" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">向量数据库</text>
        <text x="65" y="33" text-anchor="middle" font-size="9" fill="#a16207">存储文档向量</text>
      </g>

      <!-- 箭头：向量检索 ←→ 向量库 -->
      <line x1="210" y1="170" x2="250" y2="170" stroke="#eab308" stroke-width="1.5"/>
      <polygon points="208,165 218,170 208,175" fill="#eab308"/>
      <polygon points="248,165 238,170 248,175" fill="#eab308"/>

      <!-- Top-K 结果往回 -->
      <line x1="120" y1="188" x2="120" y2="202" stroke="#eab308" stroke-width="1.5"/>
      <polygon points="115,200 120,210 125,200" fill="#eab308"/>

      <!-- 4. 拼接上下文 -->
      <g transform="translate(30,212)">
        <rect x="0" y="0" width="200" height="36" rx="8" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2"/>
        <text x="100" y="23" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">③ 拼接：问题 + 检索文档</text>
      </g>

      <line x1="130" y1="248" x2="130" y2="262" stroke="#6366f1" stroke-width="1.5"/>
      <polygon points="125,260 130,270 135,260" fill="#6366f1"/>

      <!-- 5. LLM -->
      <g transform="translate(30,270)">
        <rect x="0" y="0" width="200" height="36" rx="10" fill="#a855f7" opacity="0.15" stroke="#a855f7" stroke-width="1.5"/>
        <text x="100" y="23" text-anchor="middle" font-size="12" fill="#7e22ce" font-weight="700">🤖 ④ LLM 生成回答</text>
      </g>

      <line x1="130" y1="306" x2="130" y2="316" stroke="#10b981" stroke-width="1.5"/>
      <polygon points="125,314 130,324 135,314" fill="#10b981"/>

      <!-- 6. 回答 -->
      <g transform="translate(120,326)">
        <rect x="-55" y="0" width="110" height="30" rx="15" fill="#10b981"/>
        <text x="0" y="20" text-anchor="middle" font-size="12" fill="#fff" font-weight="600">✅ 最终回答</text>
      </g>

      <!-- ============ 离线索引（虚线框） ============ -->
      <rect x="280" y="240" width="180" height="120" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="6,4"/>
      <text x="370" y="260" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">离线索引流程</text>

      <g transform="translate(290,268)">
        <rect x="0" y="0" width="160" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="80" y="15" text-anchor="middle" font-size="9" fill="#475569">文档分块 (Chunking)</text>
        <line x1="80" y1="22" x2="80" y2="27" stroke="#94a3b8" stroke-width="1"/>
        <polygon points="77,27 80,32 83,27" fill="#94a3b8"/>
        <rect x="0" y="32" width="160" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="80" y="47" text-anchor="middle" font-size="9" fill="#475569">Embedding 编码</text>
        <line x1="80" y1="54" x2="80" y2="59" stroke="#94a3b8" stroke-width="1"/>
        <polygon points="77,59 80,64 83,59" fill="#94a3b8"/>
        <rect x="0" y="64" width="160" height="22" rx="5" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="80" y="79" text-anchor="middle" font-size="9" fill="#475569">存入向量数据库</text>
      </g>

      <!-- 离线→在线 入库箭头 -->
      <line x1="310" y1="270" x2="270" y2="192" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
      <line x1="270" y1="192" x2="250" y2="192" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4,3"/>
      <polygon points="252,188 242,192 252,196" fill="#94a3b8"/>

      <text x="370" y="380" text-anchor="middle" font-size="11" fill="#94a3b8">文档先离线索引，用户提问时在线检索——用数据对抗幻觉</text>
    </svg>
  </div>
</template>

<script setup>
const w = 500, h = 398
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 500px; display: block; margin: 0 auto; }
</style>
