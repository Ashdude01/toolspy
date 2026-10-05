import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getFeaturedTools, getToolBySlug, type Tool } from '@/lib/tools-data'

const TIMEOUT_MS = 4000

function race<T>(p: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`[homepage] timeout: ${label}`)), TIMEOUT_MS)
    ),
  ])
}

/**
 * Homepage popular tools — CMS global `homepage.popularTools` order.
 * Empty / DB down → code featured tools fallback.
 */
export function getHomepagePopularTools(): Promise<Tool[]> {
  return unstable_cache(
    async () => {
      try {
        const payload = await race(getPayload({ config }), 'getPayload')
        const doc = await race(payload.findGlobal({ slug: 'homepage', depth: 0 }), 'findGlobal')
        const rows = (doc as { popularTools?: Array<{ toolSlug?: string }> } | null)?.popularTools
        if (!rows?.length) return getFeaturedTools()

        const tools = rows
          .map((r) => (r.toolSlug ? getToolBySlug(r.toolSlug) : undefined))
          .filter((t): t is Tool => Boolean(t))
        return tools.length > 0 ? tools : getFeaturedTools()
      } catch (err) {
        console.warn('[homepage] fetch failed, using featured tools:', err)
        return getFeaturedTools()
      }
    },
    ['homepage-popular-tools'],
    { tags: ['homepage'], revalidate: 86400 }
  )()
}

/**
 * Homepage SEO content (hybrid, locale-aware) — tool-page jaisa.
 *
 * - contentSource per-language (localized): 'code' | 'cms'
 * - content: localized richText (lexical) — jab source 'cms' ho tabhi render
 * - metaTitle/metaDescription: localized (optional)
 *
 * fallbackLocale 'en' → jo field translate nahi, usme English. DB down → null
 * (frontend code content par fallback karta hai).
 */
export interface HomepageContent {
  contentSource: 'code' | 'cms'
  content?: unknown
  metaTitle?: string | null
  metaDescription?: string | null
}

export function getHomepageContent(locale: string = 'en'): Promise<HomepageContent | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await race(getPayload({ config }), 'getPayload content')
        const doc = await race(
          payload.findGlobal({
            slug: 'homepage',
            depth: 0,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            locale: locale as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            fallbackLocale: 'en' as any,
          }),
          'findGlobal content'
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const d = doc as any
        const contentSource: HomepageContent['contentSource'] =
          d?.contentSource === 'cms' ? 'cms' : 'code'
        const result: HomepageContent = {
          contentSource,
          content: d?.content ?? null,
          metaTitle: d?.metaTitle ?? null,
          metaDescription: d?.metaDescription ?? null,
        }
        return result
      } catch (err) {
        console.warn(`[homepage] content fetch failed (${locale}):`, err)
        return null
      }
    },
    [`homepage-content-${locale}`],
    { tags: ['homepage'], revalidate: 86400 }
  )()
}
