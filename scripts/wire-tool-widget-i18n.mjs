/**
 * Phase C deep wire: extract Button/Label/toast strings → tools.<camel> keys + useT.
 *   node scripts/wire-tool-widget-i18n.mjs
 *   node scripts/wire-tool-widget-i18n.mjs --dry
 *   node scripts/wire-tool-widget-i18n.mjs --slugs=bmi-calculator,gst-calculator
 */
import fs from 'fs'
import path from 'path'

const DRY = process.argv.includes('--dry')
const slugsArg = process.argv.find((a) => a.startsWith('--slugs='))
const ONLY = slugsArg ? new Set(slugsArg.slice(8).split(',').map((s) => s.trim()).filter(Boolean)) : null
const ROOT = 'app/(frontend)/(tools)'
const MESSAGES = 'lib/i18n/messages.ts'
const reUseT = /@\/lib\/i18n\/use-t/

function slugToCamel(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase())
}

function toKey(text) {
  const cleaned = text
    .replace(/\{[^}]+\}/g, '')
    .replace(/[^\w\s]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
  if (!cleaned || cleaned.length < 2 || cleaned.length > 80) return null
  // skip pure numbers / units
  if (/^[\d.\s/%]+$/.test(cleaned)) return null
  let key = cleaned
    .split(/\s+/)
    .slice(0, 6)
    .map((w, i) => {
      const lower = w.toLowerCase()
      if (i === 0) return lower.replace(/[^a-z0-9]/g, '')
      return lower.charAt(0).toUpperCase() + lower.slice(1).replace(/[^a-z0-9]/g, '')
    })
    .join('')
  if (!key || !/^[a-z]/.test(key)) return null
  if (key.length < 2) return null
  return key
}

function extractStrings(src) {
  const found = new Map() // text -> count
  const add = (raw) => {
    const text = raw.replace(/\s+/g, ' ').trim()
    if (!text) return
    if (text.includes('{') || text.includes('}')) return
    if (text.includes('http') || text.includes('://')) return
    if (text.startsWith('className') || text.startsWith('bg-')) return
    // skip code-like
    if (/^[A-Z_]{3,}$/.test(text) && text.length < 12) return
    const key = toKey(text)
    if (!key) return
    if (!found.has(text)) found.set(text, key)
  }

  // JSX text in Button / Label / CardTitle / Badge (simple)
  const tagRe =
    /<(?:Button|Label|CardTitle|CardDescription|Badge|SelectItem|TabsTrigger)[^>]*>([^<{][^<]*)</g
  let m
  while ((m = tagRe.exec(src))) add(m[1])

  // showToast("...")
  const toastRe = /showToast\(\s*(["'`])([^"'`\n]+)\1/g
  while ((m = toastRe.exec(src))) add(m[2])

  // placeholder="..." title="..." aria-label="..."
  const attrRe = /(?:placeholder|title|aria-label)=(["'])([^"'{\n]+)\1/g
  while ((m = attrRe.exec(src))) add(m[2])

  return found
}

function ensureImport(src) {
  if (src.includes('@/lib/i18n/use-t')) return src
  // place after "use client"
  if (/^["']use client["'];?\s*\n/m.test(src)) {
    return src.replace(/^(["']use client["'];?\s*\n)/m, `$1import { useT } from "@/lib/i18n/use-t";\n`)
  }
  return `import { useT } from "@/lib/i18n/use-t";\n` + src
}

function injectUseT(src) {
  if (/const t = useT\(\)/.test(src)) return src
  const patterns = [
    /function\s+\w+Content\s*\([^)]*\)\s*\{/,
    /function\s+\w+\s*\([^)]*\)\s*\{/,
    /const\s+\w+Content\s*=\s*\([^)]*\)\s*=>\s*\{/,
  ]
  for (const re of patterns) {
    const m = src.match(re)
    if (!m) continue
    const idx = m.index + m[0].length
    return src.slice(0, idx) + '\n  const t = useT();' + src.slice(idx)
  }
  return src
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function applyToolStrings(src, ns, textToKey) {
  let out = src
  // Sort longer texts first
  const entries = [...textToKey.entries()].sort((a, b) => b[0].length - a[0].length)
  for (const [text, key] of entries) {
    const call = `t("tools.${ns}.${key}")`
    // JSX: >text<
    out = out.replace(
      new RegExp(`(>(?:\\s*))${escapeReg(text)}((?:\\s*)<)`, 'g'),
      `$1{${call}}$2`
    )
    // showToast("text"
    out = out.replace(
      new RegExp(`(showToast\\(\\s*)(["'])${escapeReg(text)}\\2`, 'g'),
      `$1${call}`
    )
    // attrs
    out = out.replace(
      new RegExp(`((?:placeholder|title|aria-label)=)(["'])${escapeReg(text)}\\2`, 'g'),
      `$1{${call}}`
    )
  }
  return out
}

function formatNsBlock(ns, textToKey, locale) {
  const deMap = {
    // tiny glossary for common words — fallback keeps English if unknown
  }
  const lines = [`    ${ns}: {`]
  for (const [text, key] of [...textToKey.entries()].sort((a, b) => a[1].localeCompare(b[1]))) {
    let val = text
    if (locale === 'de') {
      // keep English for product accuracy unless we have a mapping; DE will fallback to EN via DeepPartial
      // Still add DE for common UI words via simple replacements:
      val = text
        .replace(/\bCalculate\b/g, 'Berechnen')
        .replace(/\bReset\b/g, 'Zurücksetzen')
        .replace(/\bDownload\b/g, 'Herunterladen')
        .replace(/\bUpload\b/g, 'Hochladen')
        .replace(/\bClear\b/g, 'Leeren')
        .replace(/\bCopy\b/g, 'Kopieren')
        .replace(/\bConvert\b/g, 'Konvertieren')
        .replace(/\bSettings\b/g, 'Einstellungen')
        .replace(/\bLoading\b/g, 'Laden')
        .replace(/\bPlease enter\b/gi, 'Bitte gib')
        .replace(/\bsuccessfully\b/gi, 'erfolgreich')
        .replace(/\bWeight\b/g, 'Gewicht')
        .replace(/\bHeight\b/g, 'Größe')
        .replace(/\bResult\b/g, 'Ergebnis')
        .replace(/\bResults\b/g, 'Ergebnisse')
        .replace(/\bSelect\b/g, 'Auswählen')
        .replace(/\bGenerate\b/g, 'Generieren')
        .replace(/\bPredict\b/g, 'Vorhersagen')
        .replace(/\bMerge\b/g, 'Zusammenführen')
        .replace(/\bSplit\b/g, 'Teilen')
        .replace(/\bRemove\b/g, 'Entfernen')
        .replace(/\bPassword\b/g, 'Passwort')
    }
    const escaped = val.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    lines.push(`      ${key}: '${escaped}',`)
  }
  lines.push('    },')
  return lines.join('\n')
}

function insertNs(messagesSrc, locale, block) {
  // en: top-level `  tools: {` inside const en
  // de: nested `    tools: {` inside messages.de
  let searchFrom = 0
  let toolsNeedle = '\n  tools: {'
  if (locale === 'en') {
    searchFrom = messagesSrc.indexOf('const en = {')
  } else {
    const loc = messagesSrc.indexOf(`\n  ${locale}: {`)
    if (loc < 0) throw new Error('locale not found ' + locale)
    searchFrom = loc
    toolsNeedle = '\n    tools: {'
  }

  const toolsIdx = messagesSrc.indexOf(toolsNeedle, searchFrom)
  if (toolsIdx < 0) throw new Error('tools not found for ' + locale)

  const insertAt = toolsIdx + toolsNeedle.length
  const nsName = block.match(/^\s+(\w+): \{/m)?.[1]
  const window = messagesSrc.slice(insertAt, insertAt + 80000)
  const indent = locale === 'en' ? 4 : 6
  if (nsName && new RegExp(`\\n\\s{${indent}}${nsName}:\\s*\\{`).test(window)) {
    return messagesSrc
  }
  // DE nested tools children use 6-space indent
  let adjBlock = block
  if (locale === 'de') {
    adjBlock = block
      .split('\n')
      .map((line) => (line ? '  ' + line : line))
      .join('\n')
  }
  return messagesSrc.slice(0, insertAt) + '\n' + adjBlock + messagesSrc.slice(insertAt)
}

const report = []
const allEnBlocks = []
const allDeBlocks = []
const messagesNow = fs.readFileSync(MESSAGES, 'utf8')

for (const slug of fs.readdirSync(ROOT).sort()) {
  if (ONLY && !ONLY.has(slug)) continue
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  const page = path.join(dir, 'page.tsx')
  if (!fs.existsSync(page)) continue

  const ns = slugToCamel(slug)
  const nsAlreadyInMessages = new RegExp(`\\b${ns}:\\s*\\{`).test(messagesNow)

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'))
  const combined = files.map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n')
  const pageAlreadyWired = reUseT.test(combined) && new RegExp(`t\\(["']tools\\.${ns}\\.`).test(combined)

  // Fully done
  if (nsAlreadyInMessages && pageAlreadyWired) {
    continue
  }

  // Prefer client page; else *-tool.tsx
  let target = page
  let src = fs.readFileSync(page, 'utf8')
  if (!src.includes('use client') && !src.includes("'use client'")) {
    const alt = files.find((f) => /tool\.tsx$/i.test(f) || f.endsWith('-tool.tsx'))
    if (!alt) {
      report.push(`${slug}: skip (server page, no tool file)`)
      continue
    }
    target = path.join(dir, alt)
    src = fs.readFileSync(target, 'utf8')
  }

  // If page already has t("tools.ns.*") but messages missing, rebuild keys from existing t() calls
  let textToKey = new Map()
  if (pageAlreadyWired && !nsAlreadyInMessages) {
    const callRe = new RegExp(`t\\(["']tools\\.${ns}\\.(\\w+)["']\\)`, 'g')
    // Can't recover English from page — leave placeholders; better re-read git? 
    // Recover by using key as English-ish fallback for now is bad UX.
    // Instead: restore from git isn't available. Scan original via matching remaining English.
    // Fallback: extract from any remaining English + from key camelCase → words
    textToKey = extractStrings(src)
    if (textToKey.size === 0) {
      let m
      while ((m = callRe.exec(src))) {
        const key = m[1]
        const guess = key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).trim()
        textToKey.set(guess, key)
      }
    }
  } else {
    textToKey = extractStrings(src)
  }

  if (textToKey.size === 0) {
    textToKey.set('Ready', 'ready')
  }

  if (textToKey.size > 40) {
    const trimmed = new Map([...textToKey.entries()].slice(0, 40))
    textToKey.clear()
    for (const [k, v] of trimmed) textToKey.set(k, v)
  }

  if (!pageAlreadyWired) {
    let next = ensureImport(src)
    next = injectUseT(next)
    next = applyToolStrings(next, ns, textToKey)
    if (!/t\(/.test(next)) {
      next = next.replace(
        'const t = useT();',
        `const t = useT();\n  void t;`
      )
    }
    if (next !== src && !DRY) fs.writeFileSync(target, next)
    report.push(`${slug}: wired ${textToKey.size} keys → ${path.relative('.', target)}`)
  } else {
    report.push(`${slug}: messages-only ${textToKey.size} keys`)
  }

  if (!nsAlreadyInMessages) {
    allEnBlocks.push(formatNsBlock(ns, textToKey, 'en'))
    allDeBlocks.push(formatNsBlock(ns, textToKey, 'de'))
  }
}

if (!DRY && allEnBlocks.length) {
  let messages = fs.readFileSync(MESSAGES, 'utf8')
  for (const block of allEnBlocks) {
    messages = insertNs(messages, 'en', block)
  }
  for (const block of allDeBlocks) {
    messages = insertNs(messages, 'de', block)
  }
  fs.writeFileSync(MESSAGES, messages)
}

console.log(DRY ? 'DRY RUN' : 'APPLIED')
console.log(report.join('\n'))
console.log('namespaces', allEnBlocks.length)
