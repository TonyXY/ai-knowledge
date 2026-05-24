<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">

      <!-- 编码器 Encoder -->
      <g transform="translate(60,60)">
        <rect x="0" y="0" width="160" height="220" rx="10" fill="#eef2ff" stroke="#6366f1" stroke-width="1.5"/>
        <text x="80" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#4338ca">编码器 Encoder</text>
        <text x="80" y="34" text-anchor="middle" font-size="9" fill="#6366f1">× N（通常 6-12 层）</text>
        <!-- 层内组件 -->
        <rect x="15" y="44" width="130" height="32" rx="6" fill="#6366f1" opacity="0.12"/>
        <text x="80" y="64" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">多头自注意力</text>
        <rect x="20" y="80" width="120" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="80" y="93" text-anchor="middle" font-size="8" fill="#64748b">Add &amp; Norm</text>
        <line x1="80" y1="98" x2="80" y2="104" stroke="#cbd5e1" stroke-width="1"/>
        <rect x="15" y="104" width="130" height="32" rx="6" fill="#6366f1" opacity="0.12"/>
        <text x="80" y="124" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">前馈网络 FFN</text>
        <rect x="20" y="140" width="120" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="80" y="153" text-anchor="middle" font-size="8" fill="#64748b">Add &amp; Norm</text>
        <!-- 输入 -->
        <rect x="-30" y="176" width="60" height="24" rx="6" fill="#6366f1"/>
        <text x="0" y="193" text-anchor="middle" font-size="10" fill="#fff" font-weight="600">输入</text>
        <line x1="0" y1="176" x2="0" y2="168" stroke="#6366f1" stroke-width="1.5"/>
        <polygon points="-4,170 0,162 4,170" fill="#6366f1"/>
        <!-- 位置编码 -->
        <text x="80" y="212" text-anchor="middle" font-size="9" fill="#94a3b8">+ 位置编码</text>
      </g>

      <!-- 解码器 Decoder -->
      <g transform="translate(340,30)">
        <rect x="0" y="0" width="180" height="280" rx="10" fill="#fdf4ff" stroke="#a855f7" stroke-width="1.5"/>
        <text x="90" y="20" text-anchor="middle" font-size="12" font-weight="700" fill="#7e22ce">解码器 Decoder</text>
        <text x="90" y="34" text-anchor="middle" font-size="9" fill="#a855f7">× N（通常 6-12 层）</text>
        <!-- 掩码自注意力 -->
        <rect x="15" y="44" width="150" height="32" rx="6" fill="#a855f7" opacity="0.12"/>
        <text x="90" y="64" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">掩码多头自注意力</text>
        <rect x="20" y="80" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="93" text-anchor="middle" font-size="8" fill="#64748b">Add &amp; Norm</text>
        <line x1="90" y1="98" x2="90" y2="104" stroke="#cbd5e1" stroke-width="1"/>
        <!-- 交叉注意力 -->
        <rect x="15" y="104" width="150" height="32" rx="6" fill="#fbcfe8" opacity="0.3" stroke="#ec4899" stroke-width="1.2"/>
        <text x="90" y="124" text-anchor="middle" font-size="11" fill="#be185d" font-weight="600">交叉注意力</text>
        <rect x="20" y="140" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="153" text-anchor="middle" font-size="8" fill="#64748b">Add &amp; Norm</text>
        <line x1="90" y1="158" x2="90" y2="164" stroke="#cbd5e1" stroke-width="1"/>
        <!-- 前馈 -->
        <rect x="15" y="164" width="150" height="32" rx="6" fill="#a855f7" opacity="0.12"/>
        <text x="90" y="184" text-anchor="middle" font-size="11" fill="#7e22ce" font-weight="600">前馈网络 FFN</text>
        <rect x="20" y="200" width="140" height="18" rx="4" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <text x="90" y="213" text-anchor="middle" font-size="8" fill="#64748b">Add &amp; Norm</text>
        <!-- 输出 -->
        <rect x="-25" y="238" width="50" height="22" rx="6" fill="#ec4899"/>
        <text x="0" y="253" text-anchor="middle" font-size="9" fill="#fff" font-weight="600">Softmax</text>
        <rect x="-30" y="260" width="60" height="18" rx="4" fill="#fdf2f8" stroke="#ec4899" stroke-width="1"/>
        <text x="0" y="273" text-anchor="middle" font-size="9" fill="#be185d" font-weight="600">输出</text>
      </g>

      <!-- 编码器→解码器 交叉注意力连线 -->
      <path d="M220 170 L280 170 L280 136 L340 136" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="6,3"/>
      <polygon points="336,140 346,136 336,132" fill="#6366f1"/>

      <!-- 底部说明 -->
      <text x="300" y="340" text-anchor="middle" font-size="11" fill="#94a3b8">Transformer 核心：自注意力代替循环，并行处理整个序列</text>
    </svg>
  </div>
</template>

<script setup>
const w = 580, h = 360
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 580px; display: block; margin: 0 auto; }
</style>
