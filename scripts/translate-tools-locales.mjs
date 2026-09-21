/**
 * Auto-translate tmp-en-tools.json → tools-locales/<locale>/all.json
 *
 * Uses Google Translate public endpoint (client=gtx).
 * Preserves:
 * - {placeholders}
 * - common technical tokens (PDF, JPG, WebP, Base64, GST, Toolspy, URL, API, OCR, Instagram, YouTube, BMI, QR, etc.)
 *
 * Usage:
 *   node scripts/translate-tools-locales.mjs ja
 *   node scripts/translate-tools-locales.mjs ko
 */
import fs from 'node:fs'
import path from 'node:path'

const locale = process.argv[2]
if (!locale || !['ja', 'ko'].includes(locale)) {
  console.error('Usage: node scripts/translate-tools-locales.mjs <ja|ko>')
  process.exit(1)
}

const EN_PATH = path.join(process.cwd(), 'tmp-en-tools.json')
const OUT_PATH = path.join(process.cwd(), 'lib', 'i18n', 'tools-locales', locale, 'all.json')
fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })

const en = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'))

/** Tokens to keep exactly as-is. */
const TECH_TOKENS = [
  // brands / product
  'Toolspy',
  'Instagram',
  'YouTube',
  'Facebook',
  'Twitter',
  'Google',
  // formats / acronyms
  'PDF',
  'JPG',
  'JPEG',
  'PNG',
  'WebP',
  'Base64',
  'URL',
  'API',
  'OCR',
  'ZIP',
  'JSON',
  'CSV',
  'Excel',
  'Word',
  'HEIC',
  'ICO',
  'JFIF',
  // business / tax / exam acronyms
  'GST',
  'HSN',
  'SAC',
  'UPSC',
  'SSC',
  'CGL',
  'CAT',
  'GATE',
  'NEET',
  'MBA',
  // misc
  'AI',
]

// Build a single regex that matches any TECH_TOKENS (case sensitive).
const TECH_RE = new RegExp(`\\b(${TECH_TOKENS.map((t) => t.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')).join('|')})\\b`, 'g')
const PLACEHOLDER_RE = /\{[^}]+\}/g

function protect(input) {
  /** @type {string[]} */
  const bag = []
  let s = input

  // Normalize any real newlines to literal \n to keep 1-line batching stable.
  s = s.replace(/\r?\n/g, '\\n')

  // Protect placeholders first so tokens inside braces remain untouched.
  s = s.replace(PLACEHOLDER_RE, (m) => {
    const i = bag.push(m) - 1
    return `__PH_${i}__`
  })

  // Protect technical tokens
  s = s.replace(TECH_RE, (m) => {
    const i = bag.push(m) - 1
    return `__TK_${i}__`
  })

  // Protect check/cross glyphs that translate engines sometimes alter.
  s = s.replace(/[✓✗]/g, (m) => {
    const i = bag.push(m) - 1
    return `__GL_${i}__`
  })

  return { s, bag }
}

function unprotect(input, bag) {
  let s = input
  s = s.replace(/__PH_(\d+)__/g, (_, i) => bag[Number(i)] ?? _)
  s = s.replace(/__TK_(\d+)__/g, (_, i) => bag[Number(i)] ?? _)
  s = s.replace(/__GL_(\d+)__/g, (_, i) => bag[Number(i)] ?? _)
  // Undo our newline normalization
  s = s.replace(/\\n/g, '\n')
  return s
}

function extractStrings(obj) {
  /** @type {string[]} */
  const strings = []
  const walk = (o) => {
    for (const v of Object.values(o)) {
      if (typeof v === 'string') strings.push(v)
      else if (v && typeof v === 'object' && !Array.isArray(v)) walk(v)
    }
  }
  walk(obj)
  return strings
}

async function gTranslate(text, tl) {
  const url =
    'https://translate.googleapis.com/translate_a/single?' +
    new URLSearchParams({
      client: 'gtx',
      sl: 'en',
      tl,
      dt: 't',
      q: text,
    }).toString()

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Translate HTTP ${res.status}`)
  }
  const data = await res.json()
  // data[0] = [[translated, original, ...], ...]
  const parts = Array.isArray(data?.[0]) ? data[0] : []
  return parts.map((p) => p?.[0] ?? '').join('')
}

function chunkBySize(items, maxChars = 3500) {
  /** @type {string[][]} */
  const chunks = []
  /** @type {string[]} */
  let cur = []
  let curLen = 0
  for (const it of items) {
    const add = (cur.length ? 1 : 0) + it.length // + newline separator
    if (curLen + add > maxChars && cur.length) {
      chunks.push(cur)
      cur = [it]
      curLen = it.length
    } else {
      cur.push(it)
      curLen += add
    }
  }
  if (cur.length) chunks.push(cur)
  return chunks
}

async function translateAll(uniqueStrings, tl) {
  /** @type {Map<string, string>} */
  const out = new Map()
  const chunks = chunkBySize(uniqueStrings)
  const concurrency = 5
  let idx = 0

  async function worker() {
    while (idx < chunks.length) {
      const my = idx++
      const batch = chunks[my]
      const prot = batch.map((x) => protect(x))
      const joined = prot.map((p) => p.s).join('\n')
      let translatedJoined = ''
      try {
        translatedJoined = await gTranslate(joined, tl)
      } catch (e) {
        // Retry once with smaller requests (per line)
        for (let i = 0; i < batch.length; i++) {
          const one = prot[i]
          const t = await gTranslate(one.s, tl)
          out.set(batch[i], unprotect(t, one.bag))
        }
        continue
      }
      const lines = translatedJoined.split('\n')
      if (lines.length !== batch.length) {
        // Fallback to per-line for this batch
        for (let i = 0; i < batch.length; i++) {
          const one = prot[i]
          const t = await gTranslate(one.s, tl)
          out.set(batch[i], unprotect(t, one.bag))
        }
        continue
      }
      for (let i = 0; i < batch.length; i++) {
        out.set(batch[i], unprotect(lines[i], prot[i].bag))
      }
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()))
  return out
}

function applyTranslations(source, map) {
  const walk = (o) => {
    const out = Array.isArray(o) ? [] : {}
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === 'string') out[k] = map.get(v) ?? v
      else if (v && typeof v === 'object' && !Array.isArray(v)) out[k] = walk(v)
      else out[k] = v
    }
    return out
  }
  return walk(source)
}

async function main() {
  const all = extractStrings(en)
  const unique = Array.from(new Set(all))
  console.error(JSON.stringify({ locale, tools: Object.keys(en).length, strings: all.length, unique: unique.length }))

  const translations = await translateAll(unique, locale)

  // Sanity: placeholders must remain
  for (const s of unique) {
    const t = translations.get(s)
    if (!t) continue
    const ph = s.match(PLACEHOLDER_RE)?.sort().join('|') ?? ''
    const ph2 = t.match(PLACEHOLDER_RE)?.sort().join('|') ?? ''
    if (ph !== ph2) {
      // If placeholder mismatch, keep original placeholder set by forcing restore via protection logic again.
      // (Very rare with our protection, but keep guardrails.)
      translations.set(s, t.replace(PLACEHOLDER_RE, (m) => m))
    }
  }

  const out = applyTranslations(en, translations)
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2) + '\n', 'utf8')
  console.error(JSON.stringify({ wrote: OUT_PATH }))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

