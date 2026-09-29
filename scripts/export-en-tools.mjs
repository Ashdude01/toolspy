import fs from 'node:fs'
import { createRequire } from 'node:module'

// Load messages via dynamic import
const mod = await import('../lib/i18n/messages.ts')
const en = mod.en
if (!en?.tools) {
  console.error('en.tools missing', Object.keys(mod))
  process.exit(1)
}
const tools = en.tools
const keys = Object.keys(tools)
let stringCount = 0
function walk(o) {
  for (const v of Object.values(o)) {
    if (typeof v === 'string') stringCount++
    else if (v && typeof v === 'object') walk(v)
  }
}
walk(tools)
fs.writeFileSync('tmp-en-tools.json', JSON.stringify(tools, null, 2))
fs.writeFileSync(
  'tmp-en-tools-meta.json',
  JSON.stringify({ count: keys.length, stringCount, keys }, null, 2),
)
console.log(JSON.stringify({ count: keys.length, stringCount, wrote: true }))
