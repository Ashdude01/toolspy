import fs from 'node:fs'
import { tools } from '../lib/tools-data.ts'

const catalog = {}
for (const t of tools) {
  catalog[t.slug] = { name: t.name, description: t.description }
}
fs.mkdirSync('lib/i18n/tool-catalog-locales', { recursive: true })
fs.writeFileSync('tmp-en-tool-catalog.json', JSON.stringify(catalog, null, 2))
console.log(JSON.stringify({ tools: Object.keys(catalog).length }))
