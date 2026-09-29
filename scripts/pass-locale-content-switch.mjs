import fs from 'fs'
import path from 'path'

const ROOT = 'app/(frontend)/(tools)'
let n = 0
const changed = []
for (const slug of fs.readdirSync(ROOT)) {
  const f = path.join(ROOT, slug, 'layout.tsx')
  if (!fs.existsSync(f)) continue
  let s = fs.readFileSync(f, 'utf8')
  if (!s.includes('ToolContentSwitch')) continue
  // Only inject when ToolContentSwitch itself is missing locale=
  const next = s.replace(
    /<ToolContentSwitch slug="([^"]+)"(?!\s+locale=)/g,
    '<ToolContentSwitch slug="$1" locale={locale}',
  )
  if (next !== s) {
    fs.writeFileSync(f, next)
    n++
    changed.push(slug)
  }
}
console.log('updated', n)
console.log(changed.join('\n'))
