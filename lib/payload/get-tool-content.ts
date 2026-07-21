import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Tool ka CMS content — cached + tagged.
 *
 * - Tag: `tool-content:<slug>` → Payload ke afterChange hook se invalidate hota hai
 *   (on-demand ISR: content save karo → sirf usi tool ke pages refresh)
 * - fallbackLocale 'en' → jo field translate nahi hui usme English aata hai
 * - DB down / Payload not ready → null (frontend code-content par fallback karta hai;
 *   page KABHI nahi tootta)
 */
export interface ToolContentDoc {
  toolSlug: string
  contentSource: 'code' | 'cms'
  metaTitle?: string | null
  metaDescription?: string | null
  sections?: Array<{
    anchorId: string
    heading: string
    body?: unknown // lexical richText state
  }> | null
  faqs?: Array<{ question: string; answer: string }> | null
  disclaimer?: string | null
  keywords?: string | null
  /** Custom JSON-LD override (object ya array). Present ho to automatic schema replace karta hai. */
  customSchema?: unknown
}

export function getToolContent(
  slug: string,
  locale: string
): Promise<ToolContentDoc | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'tool-content',
          where: { toolSlug: { equals: slug } },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          locale: locale as any,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          fallbackLocale: 'en' as any,
          limit: 1,
          draft: false,
          depth: 0,
        })
        return (res.docs[0] as unknown as ToolContentDoc) ?? null
      } catch (err) {
        // DB unreachable (e.g. build without DATABASE_URL) → code-content fallback
        console.warn(`[tool-content] fetch failed for ${slug}/${locale}:`, err)
        return null
      }
    },
    [`tool-content-${slug}-${locale}`],
    { tags: [`tool-content:${slug}`] }
  )()
}
