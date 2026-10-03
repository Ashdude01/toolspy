import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Tool ka CMS content — cached + tagged.
 *
 * - Tag: `tool-content:<slug>` → Payload ke afterChange hook se invalidate hota hai
 * - revalidate: ISR window (production pe stale-while-revalidate, cold Neon hang kam)
 * - fetch timeout: Vercel pe stuck waiting avoid
 * - DB down → null → code-content fallback
 */
export interface ToolContentDoc {
  toolSlug: string
  contentSource: 'code' | 'cms'
  heroHeading?: string | null
  heroDescription?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  /** Single-article Lexical body (preferred). H2 headings drive the TOC. */
  content?: unknown
  tocIncludeH3?: boolean | null
  tocExclude?: Array<{ anchorId?: string | null }> | null
  /** Legacy multi-section editor — used only when `content` is empty. */
  sections?: Array<{
    anchorId: string
    heading: string
    body?: unknown
  }> | null
  faqs?: Array<{ question: string; answer: string }> | null
  disclaimer?: string | null
  keywords?: string | null
  customSchema?: unknown
}

const FETCH_TIMEOUT_MS = 4000

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`[tool-content] timeout ${ms}ms: ${label}`)), ms)
    promise.then(
      (v) => {
        clearTimeout(t)
        resolve(v)
      },
      (e) => {
        clearTimeout(t)
        reject(e)
      }
    )
  })
}

export function getToolContent(
  slug: string,
  locale: string
): Promise<ToolContentDoc | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await withTimeout(
          getPayload({ config }),
          FETCH_TIMEOUT_MS,
          `getPayload ${slug}/${locale}`
        )
        const res = await withTimeout(
          payload.find({
            collection: 'tool-content',
            where: { toolSlug: { equals: slug } },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            locale: locale as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fallbackLocale: 'en' as any,
            limit: 1,
            draft: false,
            depth: 2,
          }),
          FETCH_TIMEOUT_MS,
          `find ${slug}/${locale}`
        )
        return (res.docs[0] as unknown as ToolContentDoc) ?? null
      } catch (err) {
        console.warn(`[tool-content] fetch failed for ${slug}/${locale}:`, err)
        return null
      }
    },
    [`tool-content-${slug}-${locale}-d2`],
    {
      tags: [`tool-content:${slug}`],
      // Production ISR cache — pehli hit ke baad 1h tak fast static serve
      revalidate: 3600,
    }
  )()
}
