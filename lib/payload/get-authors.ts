import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { BlogAuthor } from '@/lib/blog-data'
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults'
import { mediaSrc } from '@/lib/blog/media-url'

const FETCH_TIMEOUT_MS = 4000
const FALLBACK_AUTHORS = [defaultBlogAuthor, defaultBlogReviewer]

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`[authors] timeout ${ms}ms: ${label}`)), ms)
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapAuthor(doc: any): BlogAuthor | null {
  if (!doc?.slug || !doc?.name) return null
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role || undefined,
    bio: doc.bio || undefined,
    photoUrl: mediaSrc(doc.photo),
  }
}

function mergeAuthors(cms: BlogAuthor[]): BlogAuthor[] {
  const bySlug = new Map<string, BlogAuthor>()
  for (const a of FALLBACK_AUTHORS) bySlug.set(a.slug, a)
  for (const a of cms) bySlug.set(a.slug, a)
  return [...bySlug.values()]
}

export function getPublishedAuthors(): Promise<BlogAuthor[]> {
  return unstable_cache(
    async () => {
      try {
        const payload = await withTimeout(getPayload({ config }), FETCH_TIMEOUT_MS, 'getPayload')
        const res = await withTimeout(
          payload.find({
            collection: 'authors',
            sort: 'name',
            limit: 100,
            depth: 1,
            overrideAccess: true,
          }),
          FETCH_TIMEOUT_MS,
          'find authors'
        )
        const mapped = res.docs.map(mapAuthor).filter((a): a is BlogAuthor => Boolean(a))
        return mergeAuthors(mapped)
      } catch (err) {
        console.warn('[authors] CMS fetch failed, using defaults:', err)
        return FALLBACK_AUTHORS
      }
    },
    ['authors-all-v1'],
    { tags: ['authors'], revalidate: 86400 }
  )()
}

export function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await withTimeout(getPayload({ config }), FETCH_TIMEOUT_MS, `getPayload ${slug}`)
        const res = await withTimeout(
          payload.find({
            collection: 'authors',
            where: { slug: { equals: slug } },
            limit: 1,
            depth: 1,
            overrideAccess: true,
          }),
          FETCH_TIMEOUT_MS,
          `find ${slug}`
        )
        const fromCms = res.docs[0] ? mapAuthor(res.docs[0]) : null
        if (fromCms) return fromCms
      } catch (err) {
        console.warn(`[authors] CMS fetch failed for ${slug}:`, err)
      }
      return FALLBACK_AUTHORS.find((a) => a.slug === slug) ?? null
    },
    [`author-${slug}-v1`],
    { tags: ['authors'], revalidate: 86400 }
  )()
}
