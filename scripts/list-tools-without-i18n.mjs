import fs from 'fs'
import path from 'path'

const ROOT = 'app/(frontend)/(tools)'
const re = /@\/lib\/i18n\/use-t|useT\s*\(/
const withI18n = []
const without = []

for (const slug of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  if (!fs.existsSync(path.join(dir, 'page.tsx'))) continue
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'))
  const hit = files.some((f) => re.test(fs.readFileSync(path.join(dir, f), 'utf8')))
  if (hit) withI18n.push(slug)
  else without.push(slug)
}

console.log('with', withI18n.length, 'without', without.length)
console.log(without.sort().join('\n'))
