import fs from 'node:fs'

const tools = JSON.parse(fs.readFileSync('tmp-en-tools.json', 'utf8'))
const keys = Object.keys(tools)
const size = 8
fs.mkdirSync('tmp-tool-batches', { recursive: true })
fs.mkdirSync('lib/i18n/tools-locales', { recursive: true })
for (const locale of ['fr', 'es', 'ja', 'nl', 'sv', 'it', 'ru', 'id', 'ko', 'tr', 'ar']) {
  fs.mkdirSync(`lib/i18n/tools-locales/${locale}`, { recursive: true })
}

let bi = 0
for (let i = 0; i < keys.length; i += size) {
  const slice = keys.slice(i, i + size)
  const obj = {}
  for (const k of slice) obj[k] = tools[k]
  const name = `batch-${String(bi).padStart(2, '0')}.json`
  fs.writeFileSync(`tmp-tool-batches/${name}`, JSON.stringify(obj, null, 2))
  bi++
}
console.log(`batches=${bi} keys=${keys.length}`)
