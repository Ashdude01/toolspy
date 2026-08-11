import { getToolContent } from '@/lib/payload/get-tool-content'
import { ToolSeoContentTemplate } from '@/components/i18n/tool-seo-content-template'
import { ToolCustomSchema } from '@/components/seo/tool-custom-schema'

/**
 * ToolContentSwitch — English (main) tool pages ko CMS-aware banata hai.
 *
 * contentSource === 'cms' (aur sections bhare hain) → CMS content render
 *   (coast-fire layout, ToolSeoContentTemplate).
 * warna → codeFallback (existing hardcoded <XSEOContent />) — jaisa abhi.
 *
 * getToolContent cached hai (tag: tool-content:<slug>). Admin me save karte hi
 * afterChange hook revalidateTag call karta hai → agli request par updated content.
 * DB down/khali → null → codeFallback (page kabhi nahi tootta).
 */
export async function ToolContentSwitch({
  slug,
  locale = 'en',
  codeFallback,
}: {
  slug: string
  locale?: string
  codeFallback: React.ReactNode
}) {
  const doc = await getToolContent(slug, locale)
  const cmsActive = doc?.contentSource === 'cms' && (doc.sections?.length ?? 0) > 0
  return (
    <>
      {/* CMS custom JSON-LD (agar hai) — server-only, cached fetch (dedup) */}
      <ToolCustomSchema slug={slug} locale={locale} />
      {cmsActive && doc ? (
        <ToolSeoContentTemplate slug={slug} doc={doc} />
      ) : (
        codeFallback
      )}
    </>
  )
}
