/**
 * Retranslate strings that are still identical to English in all.json.
 *
 * Rationale: Some API responses can return the source text unchanged; this pass
 * forces a second translation attempt (Google gtx endpoint) for likely-UI strings.
 *
 * Usage:
 *   node scripts/retranslate-identical-tool-strings.mjs nl sv it
 */
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'tmp-en-tools.json'), 'utf8'))
const LOCALES = process.argv.slice(2).length ? process.argv.slice(2) : ['nl', 'sv', 'it']

const PRESERVE_TOKENS = [
  'Toolspy',
  'Instagram',
  'YouTube',
  'Twitter',
  'Facebook',
  'Google',
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
  'UPSC',
  'JEE',
  'NEET',
  'GATE',
  'GST',
  'CGST',
  'SGST',
  'IGST',
  'ITC',
  'JFIF',
  'HEIC',
  'ICO',
  'ID',
  'DP',
]
const PRESERVE_SET = new Set(PRESERVE_TOKENS)

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const PLACEHOLDER_RE = /\{[a-zA-Z0-9_]+\}/g
const TOKEN_RE = new RegExp(`\\b(?:${PRESERVE_TOKENS.map(escapeRegExp).join('|')})\\b`, 'g')

function isPureTechnicalToken(text) {
  return /^[A-Z0-9 .×\-_/()%*•|]+$/.test(text) && text.length < 40
}

function containsPreserveToken(text) {
  return TOKEN_RE.test(text)
}

function protectText(text) {
  const replacements = []
  let i = 0
  const protect = (m) => {
    const key = `__TK${i}__`
    replacements.push([key, m])
    i++
    return key
  }
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

async function translateGoogle(text, locale) {
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
  if (!translated || typeof translated !== 'string') throw new Error('bad google response')
  return translated
}

function preservePlaceholders(source, translated) {
  const ph = source.match(/\{[a-zA-Z0-9_]+\}/g) || []
  let out = translated
  for (const p of ph) if (!out.includes(p)) out = `${out} ${p}`.trim()
  return out
}

function shouldRetranslate(text) {
  if (PRESERVE_SET.has(text)) return false
  if (isPureTechnicalToken(text)) return false
  if (PLACEHOLDER_RE.test(text)) return false
  // exclude common unit/format patterns; keep short UI labels/messages
  if (/[()×°]/.test(text)) return false
  if (/\d/.test(text) && !containsPreserveToken(text)) return false
  if (text.length > 80) return false
  if (!/[A-Za-z]/.test(text)) return false
  return true
}

function collectCandidates(enObj, locObj, out) {
  if (typeof enObj === 'string') {
    if (typeof locObj === 'string' && enObj === locObj && shouldRetranslate(enObj)) out.add(enObj)
    return
  }
  if (!enObj || typeof enObj !== 'object') return
  for (const [k, v] of Object.entries(enObj)) collectCandidates(v, locObj?.[k], out)
}

function applyMap(obj, map) {
  if (typeof obj === 'string') return map[obj] ?? obj
  if (!obj || typeof obj !== 'object') return obj
  const out = Array.isArray(obj) ? [] : {}
  for (const [k, v] of Object.entries(obj)) out[k] = applyMap(v, map)
  return out
}

for (const locale of LOCALES) {
  const allPath = path.join(ROOT, 'lib', 'i18n', 'tools-locales', locale, 'all.json')
  const loc = JSON.parse(fs.readFileSync(allPath, 'utf8'))

  const candidates = new Set()
  collectCandidates(en, loc, candidates)
  const list = [...candidates].sort()
  console.log(`[${locale}] candidates=${list.length}`)

  const map = {}
  for (const src of list) {
    const { protectedText, restore } = protectText(src)
    const t = await translateGoogle(protectedText, locale)
    map[src] = preservePlaceholders(src, restore(t))
  }

  const updated = applyMap(loc, map)
  fs.writeFileSync(allPath, JSON.stringify(updated, null, 2))
  console.log(`[${locale}] updated=${Object.keys(map).length}`)
}

