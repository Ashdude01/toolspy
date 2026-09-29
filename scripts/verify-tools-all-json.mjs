/**
 * Verify lib/i18n/tools-locales/<locale>/all.json against tmp-en-tools.json.
 *
 * Usage:
 *   node scripts/verify-tools-all-json.mjs nl sv it
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const enPath = path.join(ROOT, 'tmp-en-tools.json')
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'))
const enToolKeys = Object.keys(en)

const LOCALES = process.argv.slice(2).length ? process.argv.slice(2) : ['nl', 'sv', 'it']

function collectPlaceholders(obj, out = new Set()) {
  if (typeof obj === 'string') {
    const m = obj.match(/\{[a-zA-Z0-9_]+\}/g)
    if (m) for (const p of m) out.add(p)
    return out
  }
  if (!obj || typeof obj !== 'object') return out
  for (const v of Object.values(obj)) collectPlaceholders(v, out)
  return out
}

function diffKeys(enObj, locObj, basePath = '') {
  const missing = []
  const extra = []

  if (!locObj || typeof locObj !== 'object') {
    return { missing: [basePath || '(root)'], extra: [] }
  }

  for (const [k, v] of Object.entries(enObj)) {
    const p = basePath ? `${basePath}.${k}` : k
    if (!(k in locObj)) {
      missing.push(p)
      continue
    }
    const lv = locObj[k]
    if (typeof v === 'string') {
      if (typeof lv !== 'string') missing.push(p)
    } else if (v && typeof v === 'object') {
      if (!lv || typeof lv !== 'object') missing.push(p)
      else {
        const d = diffKeys(v, lv, p)
        missing.push(...d.missing)
        extra.push(...d.extra)
      }
    }
  }
  for (const k of Object.keys(locObj)) {
    if (!(k in enObj)) {
      const p = basePath ? `${basePath}.${k}` : k
      extra.push(p)
    }
  }
  return { missing, extra }
}

const report = {}

for (const locale of LOCALES) {
  const allPath = path.join(ROOT, 'lib', 'i18n', 'tools-locales', locale, 'all.json')
  if (!fs.existsSync(allPath)) {
    report[locale] = { error: `missing file: ${allPath}` }
    continue
  }
  const loc = JSON.parse(fs.readFileSync(allPath, 'utf8'))
  const locToolKeys = Object.keys(loc)
  const missingTools = enToolKeys.filter((k) => !locToolKeys.includes(k))

  // Deep missing/extra keys per tool (only for tools present)
  const perToolMissing = {}
  const perToolExtra = {}
  let missingStringKeys = 0
  let extraStringKeys = 0
  for (const toolKey of enToolKeys) {
    if (!loc[toolKey]) continue
    const { missing, extra } = diffKeys(en[toolKey], loc[toolKey], toolKey)
    if (missing.length) {
      perToolMissing[toolKey] = missing
      missingStringKeys += missing.length
    }
    if (extra.length) {
      perToolExtra[toolKey] = extra
      extraStringKeys += extra.length
    }
  }

  const enPH = [...collectPlaceholders(en)].sort()
  const locPH = [...collectPlaceholders(loc)].sort()
  const missingPH = enPH.filter((p) => !locPH.includes(p))

  report[locale] = {
    tools: locToolKeys.length,
    missingTools,
    missingStringKeys,
    extraStringKeys,
    missingPlaceholders: missingPH,
    perToolMissing,
    perToolExtra,
  }
}

console.log(JSON.stringify(report, null, 2))

