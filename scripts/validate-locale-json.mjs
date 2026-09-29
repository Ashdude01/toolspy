import fs from 'node:fs'
import path from 'node:path'

const root = 'lib/i18n/tools-locales'
for (const loc of fs.readdirSync(root)) {
  const dir = path.join(root, loc)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const p = path.join(dir, f)
    try {
      JSON.parse(fs.readFileSync(p, 'utf8'))
    } catch (e) {
      console.log('BAD', p, e.message)
      const raw = fs.readFileSync(p, 'utf8')
      console.log('len', raw.length, 'around176:', raw.split(/\n/).slice(170, 185).join('\n---\n'))
    }
  }
}
for (const loc of ['ja', 'ko', 'fr', 'es']) {
  const p = path.join(root, loc, 'all.json')
  console.log(
    loc,
    'exists',
    fs.existsSync(p),
    fs.existsSync(p) ? `size=${fs.statSync(p).size} tools=${Object.keys(JSON.parse(fs.readFileSync(p, 'utf8'))).length}` : '',
  )
}
