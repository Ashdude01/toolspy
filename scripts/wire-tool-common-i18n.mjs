/**
 * Phase C bootstrap: inject useT + map common UI strings to toolCommon.
 *   node scripts/wire-tool-common-i18n.mjs
 *   node scripts/wire-tool-common-i18n.mjs --dry
 */
import fs from 'fs'
import path from 'path'

const DRY = process.argv.includes('--dry')
const ROOT = 'app/(site)/(frontend)/(tools)'
const reUseT = /@\/lib\/i18n\/use-t|useT\s*\(/

/** Exact string → toolCommon key (JSX text / quoted literals). */
const REPLACEMENTS = [
  // Longer / more specific first
  ['Clear All', 'clearAll'],
  ['Download All', 'downloadAll'],
  ['Add More Images', 'addMoreImages'],
  ['Choose images', 'chooseImages'],
  ['Choose files', 'chooseFiles'],
  ['Drop images here', 'dropImagesHere'],
  ['Drop files here', 'dropFilesHere'],
  ['Paste image', 'pasteImage'],
  ['Output Format', 'outputFormat'],
  ['Click to upload or drag and drop', 'clickOrDrag'],
  ['Something went wrong. Please try again.', 'errorGeneric'],
  ['Saved successfully', 'successSaved'],
  ['Download', 'download'],
  ['Convert', 'convert'],
  ['Compress', 'compress'],
  ['Calculate', 'calculate'],
  ['Settings', 'settings'],
  ['Advanced', 'advanced'],
  ['Quality', 'quality'],
  ['Upload', 'upload'],
  ['Loading...', 'loading'],
  ['Loading…', 'loading'],
  ['Reset', 'reset'],
  ['Clear', 'clear'],
  ['Copy', 'copy'],
  ['Paste', 'paste'],
  ['Import', 'import'],
  ['Analyze', 'analyze'],
]

function slugToCamel(slug) {
  return slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

function ensureImport(src) {
  if (src.includes("@/lib/i18n/use-t")) return src
  // After first import block line
  const m = src.match(/^import .+?;$/m)
  if (!m) {
    return `import { useT } from "@/lib/i18n/use-t";\n` + src
  }
  // Insert after last consecutive import at top
  const lines = src.split('\n')
  let lastImport = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^import\s/.test(lines[i]) || (/^\s/.test(lines[i]) && lastImport === i - 1 && lines[i].includes('from'))) {
      lastImport = i
      continue
    }
    // multi-line import continuation
    if (lastImport >= 0 && i === lastImport + 1 && (lines[i].includes('from') || lines[i].trim().startsWith('}'))) {
      lastImport = i
      continue
    }
    if (lastImport >= 0 && /^import\s/.test(lines[i])) {
      lastImport = i
      continue
    }
  }
  // Simpler: find last line that is part of imports
  lastImport = -1
  let inImport = false
  for (let i = 0; i < Math.min(lines.length, 80); i++) {
    const line = lines[i]
    if (/^import\s/.test(line)) {
      inImport = true
      lastImport = i
      if (line.includes(';') || line.includes("from")) {
        // might still be multi-line if no from yet
        if (line.includes('from') && (line.includes(';') || line.endsWith("'") || line.endsWith('"'))) {
          inImport = !line.includes('{') || line.includes('}')
        }
      }
      continue
    }
    if (inImport) {
      lastImport = i
      if (line.includes(';') || (line.includes('from') && line.trim().endsWith(';'))) {
        inImport = false
      } else if (line.trim() === '' || /^[A-Za-z]/.test(line)) {
        // ended
        lastImport = i - 1
        break
      }
      continue
    }
    if (lastImport >= 0 && line.trim() === '') break
  }
  if (lastImport < 0) {
    return `import { useT } from "@/lib/i18n/use-t";\n` + src
  }
  lines.splice(lastImport + 1, 0, 'import { useT } from "@/lib/i18n/use-t";')
  return lines.join('\n')
}

function injectUseT(src) {
  if (/const t = useT\(\)/.test(src)) return src
  // Prefer *Content() functions, else first function after "use client"
  const patterns = [
    /function\s+(\w+Content)\s*\(\s*\)\s*\{/,
    /function\s+(\w+)\s*\(\s*\)\s*\{/,
    /const\s+(\w+Content)\s*=\s*\(\s*\)\s*=>\s*\{/,
    /export default function\s+(\w+)\s*\(/,
  ]
  for (const re of patterns) {
    const m = src.match(re)
    if (!m) continue
    const idx = m.index + m[0].length
    // Skip if next few lines already have useT
    const slice = src.slice(idx, idx + 200)
    if (slice.includes('useT()')) return src
    return src.slice(0, idx) + '\n  const t = useT();' + src.slice(idx)
  }
  return src
}

function applyReplacements(src) {
  let out = src
  let count = 0
  for (const [english, key] of REPLACEMENTS) {
    // JSX text nodes: >Download<
    const jsxRe = new RegExp(`(>|\\}\\s*)(${escapeReg(english)})(<|\\s*\\{)`, 'g')
    out = out.replace(jsxRe, (full, a, _b, c) => {
      // avoid replacing inside already-t()
      count++
      return `${a}{t("toolCommon.${key}")}${c}`
    })
    // showToast("Download"...
    const toastRe = new RegExp(`(showToast\\(\\s*)(["'])${escapeReg(english)}\\2`, 'g')
    out = out.replace(toastRe, (_, a, q) => {
      count++
      return `${a}t("toolCommon.${key}")`
    })
    // title="Download" aria-label="Download"
    const attrRe = new RegExp(`((?:title|aria-label|placeholder)=)(["'])${escapeReg(english)}\\2`, 'g')
    out = out.replace(attrRe, (_, a) => {
      count++
      return `${a}{t("toolCommon.${key}")}`
    })
  }
  return { out, count }
}

function escapeReg(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

let filesChanged = 0
let totalRepl = 0
const touched = []

for (const slug of fs.readdirSync(ROOT).sort()) {
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  const page = path.join(dir, 'page.tsx')
  if (!fs.existsSync(page)) continue

  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'))
  const already = files.some((f) => reUseT.test(fs.readFileSync(path.join(dir, f), 'utf8')))
  if (already) continue

  let src = fs.readFileSync(page, 'utf8')
  if (!src.includes('"use client"') && !src.includes("'use client'")) {
    // server page — look for *-tool.tsx
    const toolFile = files.find((f) => f.includes('-tool') || f.includes('Tool'))
    if (!toolFile) {
      // still inject into page if it has interactive strings? skip server wrappers
      continue
    }
    const p = path.join(dir, toolFile)
    src = fs.readFileSync(p, 'utf8')
    let next = ensureImport(src)
    next = injectUseT(next)
    const { out, count } = applyReplacements(next)
    if (out !== src) {
      if (!DRY) fs.writeFileSync(p, out)
      filesChanged++
      totalRepl += count
      touched.push(`${slug}/${toolFile} (+${count})`)
    }
    continue
  }

  let next = ensureImport(src)
  next = injectUseT(next)
  const { out, count } = applyReplacements(next)
  if (out !== src) {
    if (!DRY) fs.writeFileSync(page, out)
    filesChanged++
    totalRepl += count
    touched.push(`${slug}/page.tsx (+${count})`)
  } else if (next !== src) {
    // at least injected useT
    if (!DRY) fs.writeFileSync(page, next)
    filesChanged++
    touched.push(`${slug}/page.tsx (useT only)`)
  }
}

console.log(DRY ? 'DRY RUN' : 'APPLIED')
console.log('files', filesChanged, 'replacements', totalRepl)
console.log(touched.join('\n'))
