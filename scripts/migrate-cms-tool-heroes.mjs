/**
 * Migrate all tool layouts to inject CmsToolHero + accept locale prop.
 * Also strips common Header / Hero blocks from tool page.tsx files.
 *
 *   node scripts/migrate-cms-tool-heroes.mjs
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.resolve('app/(site)/(frontend)/(tools)')

function listTools() {
  return fs
    .readdirSync(ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .filter((name) => fs.existsSync(path.join(ROOT, name, 'layout.tsx')))
}

function migrateLayout(slug) {
  const file = path.join(ROOT, slug, 'layout.tsx')
  let src = fs.readFileSync(file, 'utf8')

  if (src.includes('CmsToolHero')) {
    return { slug, layout: 'skip-already' }
  }

  if (!src.includes('DynamicToolLayout')) {
    return { slug, layout: 'skip-no-dynamic' }
  }

  if (
    !src.includes("from '@/components/i18n/cms-tool-hero'") &&
    !src.includes('from "@/components/i18n/cms-tool-hero"')
  ) {
    if (src.includes("from '@/components/i18n/tool-content-switch'")) {
      src = src.replace(
        "from '@/components/i18n/tool-content-switch'",
        "from '@/components/i18n/tool-content-switch'\nimport { CmsToolHero } from '@/components/i18n/cms-tool-hero'"
      )
    } else if (src.includes('from "@/components/i18n/tool-content-switch"')) {
      src = src.replace(
        'from "@/components/i18n/tool-content-switch"',
        'from "@/components/i18n/tool-content-switch"\nimport { CmsToolHero } from "@/components/i18n/cms-tool-hero"'
      )
    } else {
      src = src.replace(
        /from ['"]@\/components\/layout\/dynamic-tool-layout['"]/,
        (m) => `${m}\nimport { CmsToolHero } from '@/components/i18n/cms-tool-hero'`
      )
    }
  }

  src = src.replace(
    /export default function (\w+)\(\{\s*children,\s*\}:\s*\{\s*children:\s*React\.ReactNode\s*\}\)/m,
    `export default function $1({\n  children,\n  locale = 'en',\n}: {\n  children: React.ReactNode\n  locale?: string\n})`
  )

  src = src.replace(
    /export default function (\w+)\(\{ children \}: \{ children: React\.ReactNode \}\)/m,
    `export default function $1({\n  children,\n  locale = 'en',\n}: {\n  children: React.ReactNode\n  locale?: string\n})`
  )

  // facebook layout uses children; type on next lines
  src = src.replace(
    /export default function (\w+)\(\{\s*\n\s*children,\s*\n\}: \{\s*\n\s*children: React\.ReactNode;\s*\n\}\)/m,
    `export default function $1({\n  children,\n  locale = 'en',\n}: {\n  children: React.ReactNode\n  locale?: string\n})`
  )

  if (src.includes('<Suspense')) {
    const next = src.replace(
      /(<DynamicToolLayout toolSlug="[^"]+">\s*)(\n?\s*)(<Suspense)/,
      `$1$2<CmsToolHero slug="${slug}" locale={locale} />\n$2$3`
    )
    if (next === src) return { slug, layout: 'fail-inject' }
    src = next
  } else if (src.includes('{children}')) {
    const next = src.replace(
      /(<DynamicToolLayout toolSlug="[^"]+">\s*)(\n?\s*)(\{children\})/,
      `$1$2<CmsToolHero slug="${slug}" locale={locale} />\n$2$3`
    )
    if (next === src) return { slug, layout: 'fail-inject' }
    src = next
  } else {
    return { slug, layout: 'fail-inject' }
  }

  if (!src.includes('locale = ') && !src.includes("locale = 'en'")) {
    return { slug, layout: 'fail-locale-sig' }
  }

  fs.writeFileSync(file, src)
  return { slug, layout: 'ok' }
}

function stripPageHero(slug) {
  const file = path.join(ROOT, slug, 'page.tsx')
  if (!fs.existsSync(file)) return { slug, page: 'no-page' }
  let src = fs.readFileSync(file, 'utf8')
  if (src.includes('CmsToolHero') || src.includes('ToolPageHero')) {
    return { slug, page: 'has-hero-component' }
  }

  const before = src
  src = src.replace(
    /\{\/\*\s*(Header|Hero)\s*\*\/\}\s*<div className="text-center[^"]*">[\s\S]*?<\/div>\s*(?=\{\/\*|<[A-Z]|\{selectedFiles|\{compressedResults|<FileUpload|<Card)/m,
    ''
  )

  if (src === before) return { slug, page: 'no-header-block' }

  fs.writeFileSync(file, src)
  return { slug, page: 'stripped' }
}

const tools = listTools()
const layoutResults = tools.map(migrateLayout)
const pageResults = tools.map(stripPageHero)

console.log(
  'Layouts:',
  JSON.stringify(
    {
      ok: layoutResults.filter((r) => r.layout === 'ok').length,
      skip: layoutResults.filter((r) => String(r.layout).startsWith('skip')).length,
      fail: layoutResults.filter((r) => String(r.layout).startsWith('fail')),
    },
    null,
    2
  )
)
console.log(
  'Pages:',
  JSON.stringify(
    {
      stripped: pageResults.filter((r) => r.page === 'stripped').length,
      noHeader: pageResults.filter((r) => r.page === 'no-header-block').length,
      other: pageResults.filter((r) => !['stripped', 'no-header-block'].includes(r.page)),
    },
    null,
    2
  )
)
