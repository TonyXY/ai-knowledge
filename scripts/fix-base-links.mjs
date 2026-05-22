/**
 * 构建后处理脚本：给所有内部链接添加 base path 前缀
 * VitePress 的 createStaticVNode 不会自动处理 base path，
 * 导致 card grid 等原始 HTML 中的绝对路径链接丢失 base 前缀。
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, extname, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../docs/.vitepress/dist')
const base = '/ai-knowledge/'

let fixedCount = 0

function walk(dir) {
  const entries = readdirSync(dir)
  for (const entry of entries) {
    const fullPath = join(dir, entry)
    if (statSync(fullPath).isDirectory()) {
      walk(fullPath)
    } else if (extname(fullPath) === '.html' || extname(fullPath) === '.js') {
      let content = readFileSync(fullPath, 'utf-8')
      const original = content

      // 修复 <a href="/xxx"> → <a href="/ai-knowledge/xxx">
      // 排除: 外部链接(http/https)、锚点(#)、已有 base 前缀、mailto 等
      content = content.replace(
        /href="\/(?!ai-knowledge\/)([a-z][a-z0-9._-]*(\/[^"]*)?)"/g,
        `href="${base}$1"`
      )

      if (content !== original) {
        writeFileSync(fullPath, content, 'utf-8')
        fixedCount++
      }
    }
  }
}

walk(distDir)
console.log(`Fixed base path links in ${fixedCount} files.`)
