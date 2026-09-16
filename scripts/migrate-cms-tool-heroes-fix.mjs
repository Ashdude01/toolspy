/**
 * Fix remaining tool layouts: inject CmsToolHero + locale prop.
 *   node scripts/migrate-cms-tool-heroes-fix.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve('app/(frontend)/(tools)')

const tools = fs
  .readdirSync(ROOT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

let ok = 0
let skip = 0
let fail = []

for (const slug of tools) {
  const file = path.join(ROOT, slug, 'layout.tsx')
  if (!fs.existsSync(file)) continue
  let src = fs.readFileSync(file, 'utf8')

  if (src.includes(`<CmsToolHero slug="${slug}"`)) {
    skip++
    continue
  }
  if (!src.includes('DynamicToolLayout')) {
    fail.push({ slug, reason: 'no-dynamic' })
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

  // Ensure locale in props — rewrite common layout signatures
  if (!src.includes("locale = 'en'") && !src.includes('locale = "en"')) {
    src = src.replace(
      /export default function (\w+)\((\{[\s\S]*?\})\s*:\s*(\{[\s\S]*?\})\)\s*\{/,
      (full, name, props, type) => {
        if (props.includes('locale') || type.includes('locale')) return full
        // simple children-only layouts
        if (!props.includes('children')) return full
        return `export default function ${name}({\n  children,\n  locale = 'en',\n}: {\n  children: React.ReactNode\n  locale?: string\n}) {`
      }
    )
  }

  const injected = src.replace(
    /(<DynamicToolLayout toolSlug="[^"]+">)([\s\S]*?)(<Suspense\b)/,
    (full, open, mid, sus) => {
      if (mid.includes('CmsToolHero')) return full
      return `${open}\n      <CmsToolHero slug="${slug}" locale={locale} />${mid}${sus}`
    }
  )

  if (injected === src || !injected.includes('CmsToolHero')) {
    fail.push({ slug, reason: 'inject-failed' })
    continue
  }

  src = injected
  fs.writeFileSync(file, src)
  ok++
}

console.log(JSON.stringify({ ok, skip, fail }, null, 2))
