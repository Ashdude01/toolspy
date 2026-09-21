/**
 * Build a complete French tools locale file:
 * - Base: tmp-en-tools.json (authoritative shape + all keys)
 * - Overlay: existing curated fragments in lib/i18n/tools-locales/fr/*.json
 * - Fill: any remaining English strings are machine-translated (MyMemory)
 *
 * Output: lib/i18n/tools-locales/fr/all.json
 *
 * Run: node scripts/build-fr-tools-all.mjs
 */
import fs from 'node:fs'
import path from 'node:path'

const EN_PATH = path.join(process.cwd(), 'tmp-en-tools.json')
const FR_DIR = path.join(process.cwd(), 'lib', 'i18n', 'tools-locales', 'fr')
const OUT_PATH = path.join(FR_DIR, 'all.json')
const CACHE_PATH = path.join(process.cwd(), 'tmp-translate-cache.json')

function deepMerge(a, b) {
  const out = { ...a }
  for (const [k, v] of Object.entries(b || {})) {
    if (v && typeof v === 'object' && !Array.isArray(v) && out[k] && typeof out[k] === 'object') {
      out[k] = deepMerge(out[k], v)
    } else {
      out[k] = v
    }
  }
  return out
}

function collectStrings(obj, out = []) {
  if (typeof obj === 'string') out.push(obj)
  else if (obj && typeof obj === 'object') {
    for (const v of Object.values(obj)) collectStrings(v, out)
  }
  return out
}

function applyTranslations(obj, map) {
  if (typeof obj === 'string') return map[obj] ?? obj
  if (!obj || typeof obj !== 'object') return obj
  const out = Array.isArray(obj) ? [] : {}
  for (const [k, v] of Object.entries(obj)) out[k] = applyTranslations(v, map)
  return out
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function translateOne(text, pair, cache) {
  const key = `${pair}::${text}`
  if (cache[key]) return cache[key]
  const url =
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(text.slice(0, 450)) +
    '&langpair=' +
    encodeURIComponent(pair)
  const res = await fetch(url)
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`)
    err.status = res.status
    throw err
  }
  const data = await res.json()
  const translated = data?.responseData?.translatedText
  if (!translated || typeof translated !== 'string') {
    throw new Error('bad response: ' + JSON.stringify(data).slice(0, 200))
  }
  cache[key] = translated
  return translated
}

function preservePlaceholders(source, translated) {
  const ph = source.match(/\{[a-zA-Z0-9_]+\}/g) || []
  let out = translated
  for (const p of ph) {
    if (!out.includes(p)) out = `${out} ${p}`.trim()
  }
  return out
}

function preserveTokens(source, translated) {
  const TOKENS = [
    'PDF',
    'JPG',
    'PNG',
    'WebP',
    'Base64',
    'GST',
    'HSN',
    'SAC',
    'Toolspy',
    'URL',
    'API',
    'OCR',
    'CSV',
    'HEIC',
    'AVIF',
    'JFIF',
    'JSON',
    'PWA',
    'Instagram',
    'YouTube',
    'Facebook',
    'BMI',
    'QR',
  ]
  let out = translated
  for (const token of TOKENS) {
    if (source.includes(token) && !out.includes(token)) {
      out = `${out} ${token}`.trim()
    }
  }
  return out
}

function mergeFrenchFragments() {
  if (!fs.existsSync(FR_DIR)) return {}
  const files = fs
    .readdirSync(FR_DIR)
    .filter((f) => f.endsWith('.json') && f !== 'all.json')
    .sort()

  let merged = {}
  for (const f of files) {
    const data = JSON.parse(fs.readFileSync(path.join(FR_DIR, f), 'utf8'))
    merged = deepMerge(merged, data)
  }
  return merged
}

const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'))
const enKeys = Object.keys(en)
const enStrings = new Set(collectStrings(en))

const frFragments = mergeFrenchFragments()
let merged = deepMerge(en, frFragments)

// Identify any remaining English strings after overlay.
const stillEnglish = [...new Set(collectStrings(merged).filter((s) => enStrings.has(s)))]
console.log(`[fr] tools keys: en=${enKeys.length}, fragments=${Object.keys(frFragments).length}`)
console.log(`[fr] strings to translate: ${stillEnglish.length}`)

const cache = fs.existsSync(CACHE_PATH) ? JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8')) : {}
const pair = 'en|fr'
const map = {}
let i = 0
for (const text of stillEnglish) {
  i++
  // skip pure technical tokens / symbols (keep as-is)
  if (/^[A-Z0-9 .×\\-_/()%*•|]+$/.test(text) && text.length < 40) {
    map[text] = text
    continue
  }
  let translated = null
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      translated = await translateOne(text, pair, cache)
      break
    } catch (e) {
      const status = e?.status
      if (status === 429) {
        const waitMs = 8000 * attempt
        console.warn(`[fr] rate-limited (429) #${i} attempt ${attempt}/6; waiting ${waitMs}ms`)
        await sleep(waitMs)
        continue
      }
      console.warn(`[fr] translate fail #${i} attempt ${attempt}/6: ${e.message} :: ${text.slice(0, 70)}`)
      await sleep(1500)
    }
  }
  if (!translated) {
    // last resort: keep English (should be very rare)
    map[text] = text
  } else {
    let t = preservePlaceholders(text, translated)
    t = preserveTokens(text, t)
    map[text] = t
  }
  if (i % 25 === 0) {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache))
    console.log(`[fr] translated ${i}/${stillEnglish.length}`)
    await sleep(1200)
  } else {
    await sleep(750)
  }
}

fs.writeFileSync(CACHE_PATH, JSON.stringify(cache))
merged = applyTranslations(merged, map)

// Verify keys match EN.
const outKeys = Object.keys(merged)
const missingKeys = enKeys.filter((k) => !(k in merged))
const extraKeys = outKeys.filter((k) => !(k in en))
if (missingKeys.length) throw new Error('missing tool keys: ' + missingKeys.join(', '))
if (extraKeys.length) throw new Error('extra tool keys: ' + extraKeys.join(', '))
if (outKeys.length !== enKeys.length) throw new Error(`bad tool count: out=${outKeys.length} en=${enKeys.length}`)

fs.mkdirSync(FR_DIR, { recursive: true })
fs.writeFileSync(OUT_PATH, JSON.stringify(merged, null, 2))
console.log(`[fr] wrote ${OUT_PATH} tools=${outKeys.length}`)
