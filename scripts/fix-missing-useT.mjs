/**
 * Fix pages where t("...") was applied but const t = useT() missing / wrong scope.
 *   node scripts/fix-missing-useT.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = 'app/(frontend)/(tools)'
let fixed = 0

for (const slug of fs.readdirSync(ROOT)) {
  const dir = path.join(ROOT, slug)
  if (!fs.statSync(dir).isDirectory()) continue
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.tsx'))) {
    const p = path.join(dir, file)
    let src = fs.readFileSync(p, 'utf8')
    if (!/t\(\s*["']tools\./.test(src) && !/t\(\s*["']toolCommon\./.test(src)) continue
    if (!src.includes('@/lib/i18n/use-t')) {
      src = src.replace(/^(["']use client["'];?\s*\n)/m, `$1import { useT } from "@/lib/i18n/use-t";\n`)
    }

    // Find functions/arrows that contain t("tools. or t("toolCommon. without their own const t = useT
    // Strategy: inject into every *Content component and default export page component.
    const targets = [
      /((?:function|const)\s+\w*Content\w*\s*=\s*\([^)]*\)\s*=>\s*\{)/,
      /((?:function|const)\s+\w*Content\w*\s*\([^)]*\)\s*\{)/,
      /(function\s+\w*Content\w*\s*\([^)]*\)\s*\{)/,
      /(export default function\s+\w+\s*\([^)]*\)\s*\{)/,
    ]

    let changed = false
    // Remove wrongly placed useT in tiny helpers (readFileAsDataUrl etc) if they don't use t
    src = src.replace(
      /(function\s+\w+\([^)]*\)\s*\{\n)\s*const t = useT\(\);\n/g,
      (full, head) => {
        // peek ahead 400 chars for t(
        const idx = src.indexOf(full)
        const after = src.slice(idx + full.length, idx + full.length + 600)
        if (!/\bt\(/.test(after.split(/\nfunction |\nconst |\nexport /)[0] || after)) {
          changed = true
          return head
        }
        return full
      }
    )

    // Ensure main content has useT
    let injected = false
    for (const re of targets) {
      const m = src.match(re)
      if (!m) continue
      const start = m.index + m[0].length
      const window = src.slice(start, start + 300)
      if (/const t = useT\(\)/.test(window)) {
        injected = true
        break
      }
      src = src.slice(0, start) + '\n  const t = useT();' + src.slice(start)
      injected = true
      changed = true
      break
    }

    // CoastFIRE-style: single big component without Content suffix
    if (!injected && /t\(\s*["']tools\./.test(src)) {
      // Find first function that uses t( — inject there
      const fnRe = /((?:export\s+)?(?:default\s+)?function\s+(\w+)\s*\([^)]*\)\s*\{|const\s+(\w+)\s*=\s*\([^)]*\)\s*=>\s*\{)/g
      let m
      while ((m = fnRe.exec(src))) {
        const name = m[2] || m[3] || ''
        if (/^(Field|readFile|format|build|helper)/i.test(name)) continue
        const start = m.index + m[0].length
        const bodyStart = src.slice(start, start + 800)
        if (!/\bt\(/.test(bodyStart) && !src.slice(start, start + 5000).includes('t("tools.')) {
          // check fuller body until next top-level function — approximate
          continue
        }
        // Does this function body contain t( ?
        const rest = src.slice(start)
        const nextFn = rest.search(/\n(?:export\s+)?(?:default\s+)?function\s+\w+|\nconst\s+\w+\s*=\s*\(/)
        const body = nextFn > 0 ? rest.slice(0, nextFn) : rest.slice(0, 8000)
        if (!/\bt\(/.test(body)) continue
        if (/const t = useT\(\)/.test(body.slice(0, 400))) break
        src = src.slice(0, start) + '\n  const t = useT();' + src.slice(start)
        changed = true
        break
      }
    }

    if (changed) {
      fs.writeFileSync(p, src)
      fixed++
      console.log('fixed', path.relative('.', p))
    }
  }
}
console.log('total', fixed)
