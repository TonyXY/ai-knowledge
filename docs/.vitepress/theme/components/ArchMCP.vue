<template>
  <div class="arch-wrap">
    <svg :viewBox="`0 0 ${w} ${h}`" class="arch-svg">

      <!-- 左侧：Host → Client → Server 层级架构 -->
      <g transform="translate(60,15)">

        <!-- Host -->
        <rect x="0" y="0" width="200" height="44" rx="10" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5"/>
        <text x="100" y="19" text-anchor="middle" font-size="12" fill="#4338ca" font-weight="700">🏠 Host 宿主应用</text>
        <text x="100" y="34" text-anchor="middle" font-size="9" fill="#6366f1">Claude Desktop / Cursor / IDE</text>

        <!-- 箭头连接 Host → Client -->
        <line x1="100" y1="44" x2="100" y2="68" stroke="#6366f1" stroke-width="2"/>
        <polygon points="95,66 100,76 105,66" fill="#6366f1"/>

        <!-- MCP Client（在 Host 内部） -->
        <rect x="10" y="76" width="180" height="36" rx="8" fill="#6366f1" opacity="0.1" stroke="#6366f1" stroke-width="1.5" stroke-dasharray="5,3"/>
        <text x="100" y="98" text-anchor="middle" font-size="11" fill="#4338ca" font-weight="600">🔌 MCP Client（嵌入 Host）</text>

        <!-- 箭头 Client → Server -->
        <line x1="100" y1="112" x2="100" y2="136" stroke="#6366f1" stroke-width="2"/>
        <polygon points="95,134 100,144 105,134" fill="#6366f1"/>

        <!-- MCP 协议层 -->
        <rect x="20" y="144" width="160" height="24" rx="12" fill="#fef9c3" stroke="#eab308" stroke-width="1.2"/>
        <text x="100" y="160" text-anchor="middle" font-size="10" fill="#854d0e" font-weight="600">📋 MCP 协议（JSON-RPC）</text>

        <!-- 箭头到 Server -->
        <line x1="100" y1="168" x2="100" y2="192" stroke="#6366f1" stroke-width="2"/>
        <polygon points="95,190 100,200 105,190" fill="#6366f1"/>

        <!-- MCP Server -->
        <rect x="10" y="200" width="180" height="36" rx="8" fill="#f0fdf4" stroke="#10b981" stroke-width="1.5"/>
        <text x="100" y="222" text-anchor="middle" font-size="11" fill="#166534" font-weight="600">🗄️ MCP Server</text>
      </g>

      <!-- 右侧：Server 连接的数据源 -->
      <g transform="translate(320,50)">
        <text x="65" y="10" text-anchor="middle" font-size="11" font-weight="600" fill="#475569">连接的数据源</text>

        <!-- 文件系统 -->
        <rect x="0" y="22" width="130" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="65" y="36" text-anchor="middle" font-size="11" fill="#475569">📁 文件系统</text>
        <text x="65" y="50" text-anchor="middle" font-size="8" fill="#94a3b8">读/写本地文件</text>

        <rect x="0" y="62" width="130" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="65" y="76" text-anchor="middle" font-size="11" fill="#475569">🗃️ 数据库</text>
        <text x="65" y="90" text-anchor="middle" font-size="8" fill="#94a3b8">PostgreSQL / SQLite</text>

        <rect x="0" y="102" width="130" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="65" y="116" text-anchor="middle" font-size="11" fill="#475569">🔗 GitHub / Slack</text>
        <text x="65" y="130" text-anchor="middle" font-size="8" fill="#94a3b8">远程 API 集成</text>

        <rect x="0" y="142" width="130" height="34" rx="8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.2"/>
        <text x="65" y="156" text-anchor="middle" font-size="11" fill="#475569">🌐 浏览器 / 搜索</text>
        <text x="65" y="170" text-anchor="middle" font-size="8" fill="#94a3b8">网页内容获取</text>
      </g>

      <!-- 连线：Server → 数据源 -->
      <g stroke="#94a3b8" stroke-width="1.2" fill="none">
        <path d="M270 218 L310 55" marker-end=""/>
        <path d="M270 218 L310 95" marker-end=""/>
        <path d="M270 218 L310 135" marker-end=""/>
        <path d="M270 218 L310 175" marker-end=""/>
      </g>

      <text x="340" y="260" text-anchor="middle" font-size="11" fill="#94a3b8">Host 嵌入 Client → 通过协议连接 Server → 统一访问各种数据源</text>
    </svg>
  </div>
</template>

<script setup>
const w = 500, h = 280
</script>

<style scoped>
.arch-wrap { margin: 20px 0; overflow-x: auto; }
.arch-svg { width: 100%; max-width: 500px; display: block; margin: 0 auto; }
</style>
