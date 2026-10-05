/**
 * Remove invalid `locale` prop from Next.js layout signatures (TS2344).
 * Keep CmsToolHero/ToolContentSwitch on locale="en" inside layouts.
 * Localized routes pass locale via [locale]/[slug]/page.tsx shell instead.
 *
 *   node scripts/fix-layout-locale-prop.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = 'app/(site)/(frontend)/(tools)'
let n = 0

for (const slug of fs.readdirSync(ROOT)) {
  const f = path.join(ROOT, slug, 'layout.tsx')
  if (!fs.existsSync(f)) continue
  let s = fs.readFileSync(f, 'utf8')
  if (!s.includes('locale')) continue

  const before = s

  // Normalize default export to children-only (Next LayoutProps)
  s = s.replace(
    /export default function (\w+)\(\{\s*children,\s*locale = 'en',\s*\}: \{\s*children: React\.ReactNode\s*locale\?: string\s*\}\)/g,
    `export default function $1({\n  children,\n}: {\n  children: React.ReactNode\n})`
  )

  s = s.replace(
    /export default function (\w+)\(\{\n  children,\n  locale = 'en',\n\}: \{\n  children: React\.ReactNode\n  locale\?: string\n\}\)/g,
    `export default function $1({\n  children,\n}: {\n  children: React.ReactNode\n})`
  )

  // CmsToolHero locale={locale} -> locale="en"
  s = s.replace(
    /<CmsToolHero slug="([^"]+)" locale=\{locale\} \/>/g,
    '<CmsToolHero slug="$1" locale="en" />'
  )

  // ToolContentSwitch locale={locale} -> locale="en"
  s = s.replace(
    /<ToolContentSwitch slug="([^"]+)" locale=\{locale\} /g,
    '<ToolContentSwitch slug="$1" locale="en" '
  )

  if (s !== before) {
    fs.writeFileSync(f, s)
    n++
  }
}
console.log('fixed layouts', n)
