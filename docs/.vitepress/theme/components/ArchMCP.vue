<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">
      <rect x="0" y="0" :width="w" :height="h" rx="12" fill="#f8fafc"/>

      <!-- 标题 -->
      <text x="340" y="25" text-anchor="middle" font-size="14" font-weight="700" fill="#1e293b">MCP 架构</text>

      <!-- Host 层 -->
      <g transform="translate(140,40)">
        <rect x="0" y="0" width="400" height="44" rx="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
        <text x="200" y="19" text-anchor="middle" font-size="12" fill="#4338ca" font-weight="700">Host 宿主应用</text>
        <text x="200" y="34" text-anchor="middle" font-size="9" fill="#6366f1">Claude Desktop / Cursor / VS Code / OpenCode / 自定义应用</text>
      </g>

      <line x1="340" y1="84" x2="340" y2="104" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="240" y1="104" x2="440" y2="104" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="240" y1="104" x2="240" y2="114" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="440" y1="104" x2="440" y2="114" stroke="#6366f1" stroke-width="1.5"/>
      <polygon points="235,112 240,122 245,112" fill="#6366f1"/>
      <polygon points="435,112 440,122 445,112" fill="#6366f1"/>

      <!-- MCP Client 层 -->
      <g transform="translate(140,120)">
        <rect x="0" y="0" width="170" height="36" rx="8" fill="#6366f1" opacity="0.12" stroke="#6366f1" stroke-width="1.2"/>
        <text x="85" y="23" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">MCP Client</text>
      </g>
      <g transform="translate(370,120)">
        <rect x="0" y="0" width="170" height="36" rx="8" fill="#6366f1" opacity="0.12" stroke="#6366f1" stroke-width="1.2"/>
        <text x="85" y="23" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">MCP Client</text>
      </g>

      <!-- 协议标注 -->
      <g transform="translate(240,124)">
        <rect x="0" y="0" width="60" height="28" rx="14" fill="#fef9c3" stroke="#eab308" stroke-width="1"/>
        <text x="30" y="19" text-anchor="middle" font-size="9" fill="#854d0e" font-weight="600">协议</text>
      </g>

      <!-- 中间连线 -->
      <line x1="225" y1="156" x2="225" y2="180" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="455" y1="156" x2="455" y2="180" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="225" y1="180" x2="455" y2="180" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="225" y1="180" x2="225" y2="190" stroke="#6366f1" stroke-width="1.5"/>
      <line x1="455" y1="180" x2="455" y2="190" stroke="#6366f1" stroke-width="1.5"/>
      <polygon points="220,188 225,198 230,188" fill="#6366f1"/>
      <polygon points="450,188 455,198 460,188" fill="#6366f1"/>

      <!-- MCP Server 层 -->
      <g transform="translate(30,200)">
        <rect x="0" y="0" width="145" height="70" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.2"/>
        <text x="72" y="20" text-anchor="middle" font-size="10" fill="#166534" font-weight="600">MCP Server</text>
        <text x="72" y="34" text-anchor="middle" font-size="9" fill="#15803d">文件系统</text>
        <rect x="52" y="40" width="40" height="6" rx="3" fill="#bbf7d0"/>
      </g>
      <g transform="translate(195,200)">
        <rect x="0" y="0" width="145" height="70" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.2"/>
        <text x="72" y="20" text-anchor="middle" font-size="10" fill="#166534" font-weight="600">MCP Server</text>
        <text x="72" y="34" text-anchor="middle" font-size="9" fill="#15803d">数据库</text>
        <rect x="52" y="40" width="40" height="6" rx="3" fill="#bbf7d0"/>
      </g>
      <g transform="translate(360,200)">
        <rect x="0" y="0" width="145" height="70" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.2"/>
        <text x="72" y="20" text-anchor="middle" font-size="10" fill="#166534" font-weight="600">MCP Server</text>
        <text x="72" y="34" text-anchor="middle" font-size="9" fill="#15803d">GitHub / Slack</text>
        <rect x="52" y="40" width="40" height="6" rx="3" fill="#bbf7d0"/>
      </g>

      <!-- Server 远程数据 -->
      <g transform="translate(115,290)">
        <rect x="-40" y="0" width="80" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="0" y="15" text-anchor="middle" font-size="9" fill="#475569">本地文件</text>
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#94a3b8" stroke-width="1"/>
        <polygon points="-4,-8 0,-14 4,-8" fill="#94a3b8"/>
      </g>
      <g transform="translate(267,290)">
        <rect x="-40" y="0" width="80" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="0" y="15" text-anchor="middle" font-size="9" fill="#475569">本地/远程 DB</text>
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#94a3b8" stroke-width="1"/>
        <polygon points="-4,-8 0,-14 4,-8" fill="#94a3b8"/>
      </g>
      <g transform="translate(432,290)">
        <rect x="-40" y="0" width="80" height="22" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <text x="0" y="15" text-anchor="middle" font-size="9" fill="#475569">远程 API</text>
        <line x1="0" y1="0" x2="0" y2="-8" stroke="#94a3b8" stroke-width="1"/>
        <polygon points="-4,-8 0,-14 4,-8" fill="#94a3b8"/>
      </g>

      <text x="340" y="340" text-anchor="middle" font-size="11" fill="#94a3b8">MCP 统一了 AI 应用与外部工具的通信标准——一次开发，处处可用</text>
    </svg>
  </div>
</template>

<script setup>
const w = 680, h = 360
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 680px; display: block; margin: 0 auto; }
</style>
