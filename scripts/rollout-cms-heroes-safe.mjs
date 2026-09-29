/**
 * 1) Inject CmsToolHero + locale into all tool layouts
 * 2) Wrap Suspense children so .tool-legacy-hero is hidden (no JSX deletion)
 * 3) Mark page Header/Hero wrappers with tool-legacy-hero class
 * 4) Pass locale into ToolContentSwitch
 *
 *   node scripts/rollout-cms-heroes-safe.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve('app/(frontend)/(tools)')
const tools = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

let layoutsOk = 0
let pagesMarked = 0
let layoutFail = []

for (const slug of tools) {
  const layoutFile = path.join(ROOT, slug, 'layout.tsx')
  if (!fs.existsSync(layoutFile)) continue
  let src = fs.readFileSync(layoutFile, 'utf8')
  if (!src.includes('DynamicToolLayout')) {
    layoutFail.push(slug)
    continue
  }

  if (!src.includes('cms-tool-hero')) {
    if (src.includes("tool-content-switch'")) {
      src = src.replace(
        "from '@/components/i18n/tool-content-switch'",
        "from '@/components/i18n/tool-content-switch'\nimport { CmsToolHero } from '@/components/i18n/cms-tool-hero'"
      )
    } else if (src.includes('tool-content-switch"')) {
      src = src.replace(
        'from "@/components/i18n/tool-content-switch"',
        'from "@/components/i18n/tool-content-switch"\nimport { CmsToolHero } from "@/components/i18n/cms-tool-hero"'
      )
    } else {
      src = src.replace(
        /from ["']@\/components\/layout\/dynamic-tool-layout["']/,
        (m) => `${m}\nimport { CmsToolHero } from '@/components/i18n/cms-tool-hero'`
      )
    }
  }

  if (!src.includes("locale = 'en'") && !src.includes('locale?: string')) {
    src = src.replace(
      /export default function (\w+)\((\{[\s\S]*?\})\s*:\s*(\{[\s\S]*?\})\)\s*\{/,
      (full, name, props, type) => {
        if (props.includes('locale') || type.includes('locale')) return full
        if (!props.includes('children')) return full
        return `export default function ${name}({\n  children,\n  locale = 'en',\n}: {\n  children: React.ReactNode\n  locale?: string\n}) {`
      }
    )
  }

  if (!src.includes(`<CmsToolHero slug="${slug}"`)) {
    src = src.replace(
      /(<DynamicToolLayout toolSlug="[^"]+">)([\s\S]*?)(<Suspense\b)/,
      (full, open, mid, sus) => {
        if (mid.includes('CmsToolHero')) return full
        return `${open}\n      <CmsToolHero slug="${slug}" locale={locale} />${mid}${sus}`
      }
    )
  }

  // Hide legacy page heroes without deleting JSX
  if (!src.includes('tool-legacy-hero]:hidden') && src.includes('<Suspense')) {
    src = src.replace(
      /(<Suspense\b[\s\S]*?<\/Suspense>)/,
      `<div className="contents [&_.tool-legacy-hero]:hidden">\n        $1\n      </div>`
    )
  }

  if (!src.includes('locale={locale}') && src.includes('ToolContentSwitch')) {
    src = src.replace(
      /<ToolContentSwitch slug="([^"]+)"(\s+)/g,
      '<ToolContentSwitch slug="$1" locale={locale}$2'
    )
  }

  if (!src.includes('CmsToolHero')) {
    layoutFail.push(slug)
    continue
  }

  fs.writeFileSync(layoutFile, src)
  layoutsOk++

  // Mark page header
  const pageFile = path.join(ROOT, slug, 'page.tsx')
  if (!fs.existsSync(pageFile)) continue
  let page = fs.readFileSync(pageFile, 'utf8')
  const before = page
  page = page.replace(
    /(\{\/\*\s*(Header|Hero)\s*\*\/\}\s*<div className=")(text-center)/g,
    '$1tool-legacy-hero $3'
  )
  // common pattern without comment
  page = page.replace(
    /(<div className=")(text-center mb-6 sm:mb-8">\s*\n\s*<Badge)/g,
    '$1tool-legacy-hero $2'
  )
  page = page.replace(
    /(<div className=")(text-center mb-6 sm:mb-8">\s*\n\s*<h2)/g,
    '$1tool-legacy-hero $2'
  )
  if (page !== before) {
    fs.writeFileSync(pageFile, page)
    pagesMarked++
  }
}

console.log(JSON.stringify({ layoutsOk, pagesMarked, layoutFail }, null, 2))
