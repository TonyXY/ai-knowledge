<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">
      <!-- 背景 -->
      <rect x="0" y="0" :width="w" :height="h" rx="12" fill="#f8fafc"/>

      <!-- 左侧：编码器 Encoder -->
      <g transform="translate(60,20)">
        <text x="70" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">编码器 Encoder × N</text>
        <rect x="0" y="30" width="140" height="36" rx="8" fill="#6366f1" opacity="0.1" stroke="#6366f1" stroke-width="1.5"/>
        <text x="70" y="53" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">多头自注意力</text>
        <line x1="70" y1="66" x2="70" y2="72" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="72" width="140" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="70" y="86" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
        <line x1="70" y1="92" x2="70" y2="98" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="98" width="140" height="36" rx="8" fill="#6366f1" opacity="0.1" stroke="#6366f1" stroke-width="1.5"/>
        <text x="70" y="121" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">前馈网络 FFN</text>
        <line x1="70" y1="134" x2="70" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="140" width="140" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="70" y="154" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
      </g>

      <!-- 右侧：解码器 Decoder -->
      <g transform="translate(320,20)">
        <text x="90" y="20" text-anchor="middle" font-size="13" font-weight="700" fill="#1e293b">解码器 Decoder × N</text>
        <rect x="0" y="30" width="180" height="36" rx="8" fill="#a855f7" opacity="0.1" stroke="#a855f7" stroke-width="1.5"/>
        <text x="90" y="53" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">掩码多头自注意力</text>
        <line x1="90" y1="66" x2="90" y2="72" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="72" width="180" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="86" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
        <line x1="90" y1="92" x2="90" y2="98" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="98" width="180" height="36" rx="8" fill="#ec4899" opacity="0.1" stroke="#ec4899" stroke-width="1.5"/>
        <text x="90" y="121" text-anchor="middle" font-size="11" fill="#be185d" font-weight="600">交叉注意力</text>
        <line x1="90" y1="134" x2="90" y2="140" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="140" width="180" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="154" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
        <line x1="90" y1="160" x2="90" y2="166" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="166" width="180" height="36" rx="8" fill="#a855f7" opacity="0.1" stroke="#a855f7" stroke-width="1.5"/>
        <text x="90" y="189" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">前馈网络 FFN</text>
        <line x1="90" y1="202" x2="90" y2="208" stroke="#94a3b8" stroke-width="1.5"/>
        <rect x="0" y="208" width="180" height="20" rx="4" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="222" text-anchor="middle" font-size="9" fill="#64748b">Add &amp; Norm</text>
      </g>

      <!-- 编码器→解码器连线 -->
      <g stroke="#6366f1" stroke-width="1.5" stroke-dasharray="4,3" fill="none">
        <line x1="200" y1="48" x2="320" y2="116"/>
        <line x1="200" y1="48" x2="320" y2="116"/>
      </g>
      <!-- 正确连线 -->
      <line x1="200" y1="50" x2="270" y2="50" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="270" y1="50" x2="270" y2="182" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="270" y1="182" x2="320" y2="182" stroke="#6366f1" stroke-width="1.5"/>

      <!-- 输入/输出 -->
      <g transform="translate(60,185)">
        <rect x="-30" y="0" width="60" height="24" rx="6" fill="#6366f1"/>
        <text x="0" y="16" text-anchor="middle" font-size="10" fill="#fff" font-weight="600">输入</text>
        <line x1="0" y1="24" x2="0" y2="35" stroke="#6366f1" stroke-width="1.5"/>
        <polygon points="-4,35 0,42 4,35" fill="#6366f1"/>
      </g>

      <g transform="translate(500,225)">
        <polygon points="-4,-7 0,0 4,-7" fill="#ec4899"/>
        <line x1="0" y1="0" x2="0" y2="-15" stroke="#ec4899" stroke-width="1.5"/>
        <rect x="-30" y="-40" width="60" height="24" rx="6" fill="#ec4899"/>
        <text x="0" y="-24" text-anchor="middle" font-size="10" fill="#fff" font-weight="600">输出</text>
        <rect x="-35" y="-10" width="70" height="36" rx="6" fill="#fdf2f8" stroke="#ec4899" stroke-width="1"/>
        <text x="0" y="8" text-anchor="middle" font-size="9" fill="#be185d">Linear + Softmax</text>
      </g>

      <!-- 标签 -->
      <text x="250" y="310" text-anchor="middle" font-size="11" fill="#94a3b8">编码器处理输入序列，解码器生成输出序列——核心是自注意力机制</text>
    </svg>
  </div>
</template>

<script setup>
const w = 580, h = 330
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 580px; display: block; margin: 0 auto; }
</style>
