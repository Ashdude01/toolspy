import fs from 'node:fs'

const en = Object.keys(JSON.parse(fs.readFileSync('tmp-en-tool-catalog.json', 'utf8')))
const locs = ['de', 'fr', 'es', 'ja', 'nl', 'sv', 'it', 'ru', 'id', 'ko', 'tr', 'ar']
for (const l of locs) {
  const p = `lib/i18n/tool-catalog-locales/${l}/all.json`
  if (!fs.existsSync(p)) {
    console.log(l + ': MISSING')
    continue
  }
  const j = JSON.parse(fs.readFileSync(p, 'utf8'))
  const keys = Object.keys(j)
  const missing = en.filter((k) => !keys.includes(k))
  const sample = j['image-optimizer']
  console.log(
    l + ':',
    keys.length + '/91',
    missing.length ? 'missing=' + missing.join(',') : 'ok',
    sample ? `| ${sample.name}` : '',
  )
}
