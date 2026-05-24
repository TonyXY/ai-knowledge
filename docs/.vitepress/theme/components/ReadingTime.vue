<template>
  <div v-if="time > 0" class="reading-time">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
    <span>{{ time }} 分钟</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const time = ref(0)
const WPM = 300 // 中文阅读速度：300 字/分钟

onMounted(() => {
  // 等待 DOM 渲染完成
  setTimeout(() => {
    const content = document.querySelector('.vp-doc')
    if (!content) return

    // 排除代码块、表格、代码行号等非正文元素
    const clone = content.cloneNode(true)
    clone.querySelectorAll('pre, code, .line-numbers, .copy, .header-anchor').forEach(el => el.remove())
    
    const text = (clone.textContent || '').trim()
    // 计中文字符（一个汉字算一字）和其他单词
    const chineseChars = (text.match(/[\u4e00-\u9fff]/g) || []).length
    const otherWords = text.replace(/[\u4e00-\u9fff]/g, '').split(/\s+/).filter(Boolean).length
    const totalWords = chineseChars + otherWords * 0.5 // 英文单词半个算
    
    const minutes = Math.ceil(totalWords / WPM)
    time.value = Math.max(1, minutes)
  }, 100)
})
</script>

<style scoped>
.reading-time {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: #94a3b8;
  margin: 0 0 12px 0;
}
.reading-time svg {
  width: 14px;
  height: 14px;
}
</style>
