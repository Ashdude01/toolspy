import fs from 'fs'
import path from 'path'

const ROOT = 'app/(frontend)/(tools)'
let n = 0
for (const slug of fs.readdirSync(ROOT)) {
  const f = path.join(ROOT, slug, 'layout.tsx')
  if (!fs.existsSync(f)) continue
  let s = fs.readFileSync(f, 'utf8')
  if (!s.includes('ToolContentSwitch')) continue
  if (s.includes('locale={locale} codeFallback') || s.includes('locale={locale}  codeFallback')) continue
  const next = s.replace(
    /<ToolContentSwitch slug="([^"]+)" codeFallback=/g,
    '<ToolContentSwitch slug="$1" locale={locale} codeFallback='
  )
  if (next !== s) {
    fs.writeFileSync(f, next)
    n++
  }
}
console.log('fixed', n)
