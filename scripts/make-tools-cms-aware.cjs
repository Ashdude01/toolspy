/**
 * Codemod: saare English tool layouts (app/(site)/(frontend)/(tools)/<slug>/layout.tsx)
 * ko CMS-aware banata hai — taaki admin me contentSource='cms' karne par
 * updated content main website par bhi dikhe (warna existing hardcoded content).
 *
 * Chalane ka tarika (repo root se):
 *   node scripts/make-tools-cms-aware.cjs
 *
 * Idempotent: dobara chalana safe (already-done files skip hote hain).
 */
const fs = require('fs')
const path = require('path')

const TOOLS_DIR = path.join(process.cwd(), 'app', '(site)', '(frontend)', '(tools)')

if (!fs.existsSync(TOOLS_DIR)) {
  console.error('NOT FOUND:', TOOLS_DIR, '\nRepo root se chalao (jahan app/ folder hai).')
  process.exit(1)
}

let changed = 0, skipped = 0, already = 0
const skips = []

for (const slug of fs.readdirSync(TOOLS_DIR)) {
  const file = path.join(TOOLS_DIR, slug, 'layout.tsx')
  if (!fs.existsSync(file)) continue
  let s = fs.readFileSync(file, 'utf8')

  if (s.includes('ToolContentSwitch')) { already++; continue }

  // SEO content component name: import { XSEOContent } from './seo-content'
  const mImp = s.match(/import\s*\{\s*([A-Za-z0-9_]+)\s*\}\s*from\s*['"]\.\/seo-content['"]/)
  if (!mImp) { skipped++; skips.push(`${slug} (no seo-content import)`); continue }
  const comp = mImp[1]

  // slug from toolSlug="..." or generateToolMetadata('...')
  const mSlug = s.match(/toolSlug=["']([a-z0-9-]+)["']/) || s.match(/generateToolMetadata\(['"]([a-z0-9-]+)['"]\)/)
  if (!mSlug) { skipped++; skips.push(`${slug} (no slug)`); continue }
  const toolSlug = mSlug[1]

  // render tag <Comp /> replace (first occurrence)
  const renderRe = new RegExp('<' + comp + '\\s*/>')
  if (!renderRe.test(s)) { skipped++; skips.push(`${slug} (no render tag)`); continue }

  s = s.replace(renderRe, `<ToolContentSwitch slug="${toolSlug}" codeFallback={<${comp} />} />`)
  s = s.replace(mImp[0], mImp[0] + "\nimport { ToolContentSwitch } from '@/components/i18n/tool-content-switch'")

  fs.writeFileSync(file, s, 'utf8')
  changed++
}

console.log(`\n✅ CMS-aware done. changed: ${changed}, already: ${already}, skipped: ${skipped}`)
if (skips.length) {
  console.log('skipped (ye code-content par hi rahenge — normal hai):')
  skips.forEach((x) => console.log('  -', x))
}
