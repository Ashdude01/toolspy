import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { hasLexicalContent } from '@/lib/blog/lexical-from-sections'
import { DEFAULT_LOCALE } from '@/lib/i18n/locales'

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

const FETCH_TIMEOUT_MS = 12000

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

function localeHasCmsBody(doc: ToolContentDoc | null): boolean {
  if (!doc || doc.contentSource !== 'cms') return false
  if (hasLexicalContent(doc.content)) return true
  return (doc.sections?.length ?? 0) > 0
}

async function fetchToolContent(slug: string, locale: string): Promise<ToolContentDoc | null> {
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
        // Field-level fallback mixed English hero/FAQ into a translated article.
        fallbackLocale: false,
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
    // Throw so a timeout is not cached as "this locale has no article".
    throw err
  }
}

export function getToolContent(
  slug: string,
  locale: string
): Promise<ToolContentDoc | null> {
  return unstable_cache(
    async () => {
      const localized = await fetchToolContent(slug, locale)
      // Whole-document fallback only when this locale has no CMS article.
      // Empty hero/FAQ stay empty so English fields do not overwrite a translation.
      if (locale !== DEFAULT_LOCALE && !localeHasCmsBody(localized)) {
        return fetchToolContent(slug, DEFAULT_LOCALE)
      }
      return localized
    },
    [`tool-content-${slug}-${locale}-d4`],
    {
      tags: [`tool-content:${slug}`],
      // Time fallback only. CMS publish busts this immediately via revalidateTag.
      revalidate: 86400,
    }
  )()
}
