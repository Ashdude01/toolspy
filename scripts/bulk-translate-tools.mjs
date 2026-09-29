/**
 * Bulk-translate tmp-en-tools.json → lib/i18n/tools-locales/<locale>/all.json
 * Uses MyMemory free API (no API key). Rate-limited; resumable via cache.
 *
 * Usage: npx tsx scripts/bulk-translate-tools.mjs [locale...]
 * Example: npx tsx scripts/bulk-translate-tools.mjs fr es
 * Default: all target locales
 */
import fs from 'node:fs'
import path from 'node:path'

const LOCALES = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['fr', 'es', 'ja', 'nl', 'sv', 'it', 'ru', 'id', 'ko', 'tr', 'ar']

const LANGPAIR = {
  fr: 'en|fr',
  es: 'en|es',
  ja: 'en|ja',
  nl: 'en|nl',
  sv: 'en|sv',
  it: 'en|it',
  ru: 'en|ru',
  id: 'en|id',
  ko: 'en|ko',
  tr: 'en|tr',
  ar: 'en|ar',
}

const en = JSON.parse(fs.readFileSync('tmp-en-tools.json', 'utf8'))
const cachePath = 'tmp-translate-cache.json'
const cache = fs.existsSync(cachePath)
  ? JSON.parse(fs.readFileSync(cachePath, 'utf8'))
  : {}

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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function collectStrings(obj, out = []) {
  for (const v of Object.values(obj)) {
    if (typeof v === 'string') out.push(v)
    else if (v && typeof v === 'object') collectStrings(v, out)
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

function buildSeedMap(enObj, localeObj, map) {
  if (typeof enObj === 'string') {
    if (typeof localeObj === 'string' && localeObj.trim()) map[enObj] = localeObj
    return
  }
  if (!enObj || typeof enObj !== 'object') return
  if (!localeObj || typeof localeObj !== 'object') return
  for (const [k, v] of Object.entries(enObj)) buildSeedMap(v, localeObj[k], map)
}

function loadSeedLocale(locale) {
  const dir = path.join('lib', 'i18n', 'tools-locales', locale)
  if (!fs.existsSync(dir)) return {}
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json') && f !== 'all.json')
    .sort()

  let merged = {}
  for (const name of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'))
    merged = deepMerge(merged, data)
  }
  return merged
}

const PRESERVE_TOKENS = [
  // brands / product
  'Toolspy',
  'Instagram',
  'YouTube',
  'Twitter',
  'Facebook',
  'Google',
  // common technical abbreviations
  'URL',
  'API',
  'OCR',
  'BMI',
  'QR',
  'PDF',
  'JPG',
  'JPEG',
  'PNG',
  'WebP',
  'Base64',
  'HTML',
  'JSON',
  'CSV',
  'ZIP',
  'WHOIS',
  // exams / finance acronyms used in tools
  'UPSC',
  'JEE',
  'NEET',
  'GATE',
  'GST',
  'CGST',
  'SGST',
  'IGST',
  'ITC',
  // formats/extensions seen in tool names
  'JFIF',
  'HEIC',
  'ICO',
  // misc UI tokens
  'ID',
  'DP',
]

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PLACEHOLDER_RE = /\{[a-zA-Z0-9_]+\}/g
const TOKEN_RE = new RegExp(`\\b(?:${PRESERVE_TOKENS.map(escapeRegExp).join('|')})\\b`, 'g')

function protectText(text) {
  const replacements = []
  let i = 0
  const protect = (m) => {
    const key = `__TK${i}__`
    replacements.push([key, m])
    i++
    return key
  }

  // Protect placeholders first, then preserve tokens inside sentences.
  let out = text.replace(PLACEHOLDER_RE, protect)
  out = out.replace(TOKEN_RE, protect)

  return {
    protectedText: out,
    restore: (translated) => {
      let restored = translated
      for (const [k, v] of replacements) restored = restored.split(k).join(v)
      return restored
    },
  }
}

async function translateOneMyMemory(text, pair) {
  const key = `${pair}::${text}`
  if (cache[key]) return cache[key]
  const url =
    'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(text.slice(0, 450)) +
    '&langpair=' +
    encodeURIComponent(pair)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const data = await res.json()
  const translated = data?.responseData?.translatedText
  if (!translated || typeof translated !== 'string') {
    throw new Error('bad response: ' + JSON.stringify(data).slice(0, 200))
  }
  // MyMemory sometimes returns MATCH markers / same text under quota
  cache[key] = translated
  return translated
}

async function translateOneGoogle(text, locale) {
  const key = `google:${locale}::${text}`
  if (cache[key]) return cache[key]
  const url =
    'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=' +
    encodeURIComponent(locale) +
    '&dt=t&q=' +
    encodeURIComponent(text)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GOOGLE_HTTP ${res.status}`)
  const data = await res.json()
  const translated =
    Array.isArray(data?.[0]) && data[0].length
      ? data[0].map((seg) => (Array.isArray(seg) ? seg[0] : '')).join('')
      : ''
  if (!translated || typeof translated !== 'string') {
    throw new Error('bad google response: ' + JSON.stringify(data).slice(0, 200))
  }
  cache[key] = translated
  return translated
}

async function translateOneSmart(text, pair, locale) {
  // Prefer MyMemory (cached from prior runs), but fall back quickly on 429/quota.
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await translateOneMyMemory(text, pair)
    } catch (e) {
      const msg = String(e?.message || e)
      const is429 = msg.includes('HTTP 429')
      if (!is429) {
        // transient network errors: small backoff then retry
        const waitMs = 500 * attempt + Math.floor(Math.random() * 250)
        await sleep(waitMs)
        continue
      }
      // quota / rate-limit: jump to fallback
      break
    }
  }
  return await translateOneGoogle(text, locale)
}

function preservePlaceholders(source, translated) {
  // Ensure {placeholders} from source exist in output
  const ph = source.match(/\{[a-zA-Z0-9_]+\}/g) || []
  let out = translated
  for (const p of ph) {
    if (!out.includes(p)) {
      // if translator mangled braces, append originals at end as last resort
      out = `${out} ${p}`.trim()
    }
  }
  return out
}

const SPLIT_MARK = '__SPLIT__'

async function translateBatch(texts, pair) {
  const protectedItems = texts.map((t) => ({ source: t, ...protectText(t) }))
  const joined = protectedItems.map((p) => p.protectedText).join(`\n${SPLIT_MARK}\n`)

  const locale = pair.split('|')[1]
  const joinedTranslated = await translateOneSmart(joined, pair, locale)
  const parts = joinedTranslated.split(
    new RegExp(`[\\r\\n]+\\s*${escapeRegExp(SPLIT_MARK)}\\s*[\\r\\n]+`, 'g'),
  )

  if (parts.length !== texts.length) {
    console.warn(
      `[batch] split mismatch: expected ${texts.length}, got ${parts.length}. Falling back to per-string translation.`,
    )
    const out = []
    for (const p of protectedItems) {
      const t = await translateOneSmart(p.protectedText, pair, locale)
      out.push(preservePlaceholders(p.source, p.restore(t)))
      await sleep(800)
    }
    return out
  }

  return parts.map((seg, idx) => {
    const p = protectedItems[idx]
    return preservePlaceholders(p.source, p.restore(seg))
  })
}

function isPureTechnicalToken(text) {
  return /^[A-Z0-9 .×\-_/()%*•|]+$/.test(text) && text.length < 40
}

async function translateLocale(locale) {
  const pair = LANGPAIR[locale]
  if (!pair) throw new Error('unknown locale ' + locale)

  const unique = [...new Set(collectStrings(en))]
  const seedLocale = loadSeedLocale(locale)
  const seedMap = {}
  buildSeedMap(en, seedLocale, seedMap)

  console.log(`[${locale}] unique strings: ${unique.length}`)
  console.log(`[${locale}] seeded strings: ${Object.keys(seedMap).length}`)

  const map = { ...seedMap }

  // Pre-fill technical tokens (no translation needed)
  for (const text of unique) {
    if (map[text]) continue
    if (isPureTechnicalToken(text)) map[text] = text
  }

  const todo = unique.filter((t) => !map[t])
  console.log(`[${locale}] to translate: ${todo.length}`)

  // Translate in small batches to reduce rate-limit errors.
  // Keep the joined string comfortably under the 450-char cutoff used above.
  const maxBatchChars = 380
  let done = 0
  for (let start = 0; start < todo.length; ) {
    const batch = []
    let size = 0
    while (start < todo.length) {
      const candidate = todo[start]
      const added = candidate.length + (batch.length ? (`\n${SPLIT_MARK}\n`.length) : 0)
      if (batch.length && size + added > maxBatchChars) break
      batch.push(candidate)
      size += added
      start++
      if (size >= maxBatchChars) break
    }

    const translated = await translateBatch(batch, pair)
    for (let j = 0; j < batch.length; j++) map[batch[j]] = translated[j]

    done += batch.length
    if (done % 50 === 0 || done === todo.length) {
      fs.writeFileSync(cachePath, JSON.stringify(cache))
      console.log(`[${locale}] ${done}/${todo.length}`)
    }

    // Gentle throttle even when batching.
    await sleep(900)
  }

  fs.writeFileSync(cachePath, JSON.stringify(cache))
  const translated = applyTranslations(en, map)
  const dir = path.join('lib', 'i18n', 'tools-locales', locale)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'all.json'), JSON.stringify(translated, null, 2))
  console.log(`[${locale}] wrote all.json tools=${Object.keys(translated).length}`)
}

for (const locale of LOCALES) {
  await translateLocale(locale)
}
console.log('done')
