import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { getFeaturedTools, getToolBySlug, type Tool } from '@/lib/tools-data'

/**
 * Homepage popular tools — CMS global `homepage.popularTools` order.
 * Empty / DB down → code featured tools fallback.
 */
export function getHomepagePopularTools(): Promise<Tool[]> {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const doc = await payload.findGlobal({
          slug: 'homepage',
          depth: 0,
        })
        const rows = (doc as { popularTools?: Array<{ toolSlug?: string }> } | null)
          ?.popularTools
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
    { tags: ['homepage'] }
  )()
}
