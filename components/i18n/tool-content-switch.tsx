import { getToolContent } from '@/lib/payload/get-tool-content'
import { ToolSeoContentTemplate } from '@/components/i18n/tool-seo-content-template'

/**
 * ToolContentSwitch — English (main) tool pages ko CMS-aware banata hai.
 *
 * ASYNC server component (no Suspense wrapper): layout ke saath hi resolve hota
 * hai taaki ISR/static HTML me tool UI + SEO ek hi document me aaye.
 * Outer Suspense + loading.tsx pehle <main> khali chhod dete the (header/footer
 * pehle paint → layout shift).
 *
 * contentSource === 'cms' + sections → CMS template
 * warna → codeFallback (hardcoded seo-content)
 * DB down → null → codeFallback
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
  if (doc?.contentSource === 'cms' && (doc.sections?.length ?? 0) > 0) {
    return <ToolSeoContentTemplate slug={slug} doc={doc} />
  }
  return <>{codeFallback}</>
}
