import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  blogPosts,
  type BlogAuthor,
  type BlogCategory,
  type BlogPost,
  type BlogSection,
  type BlogTable,
} from '@/lib/blog-data'
import {
  defaultBlogAuthor,
  defaultBlogReviewer,
  defaultEditorialNote,
} from '@/lib/blog/defaults'
import { hasLexicalContent } from '@/lib/blog/lexical-from-sections'
import { mediaAlt, mediaSrc } from '@/lib/blog/media-url'

const FETCH_TIMEOUT_MS = 4000

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(`[posts] timeout ${ms}ms: ${label}`)), ms)
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

function parseParagraphs(raw?: string | null): string[] | undefined {
  if (!raw?.trim()) return undefined
  return raw
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function parseList(raw?: string | null): string[] | undefined {
  if (!raw?.trim()) return undefined
  return raw
    .split('\n')
    .map((l) => l.replace(/^[-*•]\s*/, '').trim())
    .filter(Boolean)
}

function parseTable(raw?: string | null): BlogTable | undefined {
  if (!raw?.trim()) return undefined
  try {
    const v = JSON.parse(raw) as BlogTable
    if (v && Array.isArray(v.headers) && Array.isArray(v.rows)) return v
  } catch {
    // ignore invalid JSON
  }
  return undefined
}

function isoDate(value: unknown): string | undefined {
  if (typeof value !== 'string' || !value) return undefined
  return value.slice(0, 10)
}

function mapAuthor(value: unknown): BlogAuthor | null {
  if (!value || typeof value !== 'object') return null
  const doc = value as {
    slug?: string | null
    name?: string | null
    role?: string | null
    bio?: string | null
    photo?: unknown
  }
  if (!doc.slug || !doc.name) return null
  return {
    slug: doc.slug,
    name: doc.name,
    role: doc.role || undefined,
    bio: doc.bio || undefined,
    photoUrl: mediaSrc(doc.photo),
  }
}

export function enrichCodePost(post: BlogPost): BlogPost {
  return {
    ...post,
    author: post.author || defaultBlogAuthor,
    reviewedBy: post.reviewedBy || defaultBlogReviewer,
    reviewedAt: post.reviewedAt || post.updatedAt || post.publishedAt,
    editorialNote: post.editorialNote || defaultEditorialNote(post.category),
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cmsDocToBlogPost(doc: any): BlogPost | null {
  if (!doc?.slug || !doc?.title) return null
  const sections: BlogSection[] = Array.isArray(doc.sections)
    ? doc.sections.map(
        (s: {
          heading?: string | null
          paragraphs?: string | null
          listItems?: string | null
          tableJson?: string | null
        }) => ({
          heading: s.heading || undefined,
          paragraphs: parseParagraphs(s.paragraphs),
          list: parseList(s.listItems),
          table: parseTable(s.tableJson),
        })
      )
    : []

  const keywords =
    typeof doc.keywords === 'string'
      ? doc.keywords
          .split(',')
          .map((k: string) => k.trim())
          .filter(Boolean)
      : []

  const featuredImageUrl =
    mediaSrc(doc.featuredImage) || (typeof doc.coverImageUrl === 'string' ? doc.coverImageUrl : null)
  const ogImageUrl = mediaSrc(doc.ogImage) || featuredImageUrl

  const publishedAt =
    isoDate(doc.publishedAt) || new Date().toISOString().slice(0, 10)

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.excerpt || doc.metaDescription || '',
    category: (doc.category as BlogCategory) || 'Tools & Guides',
    publishedAt,
    updatedAt: isoDate(doc.updatedAt),
    readingTimeMinutes: Number(doc.readingTimeMinutes) || 5,
    keywords,
    relatedTool: {
      name: doc.relatedTool?.name || 'Toolspy Tools',
      path: doc.relatedTool?.path || '/tools/',
      cta: doc.relatedTool?.cta || 'Try related tools on Toolspy.',
    },
    sections,
    faqs: Array.isArray(doc.faqs)
      ? doc.faqs.map((f: { question: string; answer: string }) => ({
          question: f.question,
          answer: f.answer,
        }))
      : [],
    content: hasLexicalContent(doc.content) ? doc.content : null,
    featuredImageUrl,
    featuredImageAlt: mediaAlt(doc.featuredImage, doc.title),
    ogImageUrl,
    ogTitle: doc.ogTitle || doc.metaTitle || doc.title,
    ogDescription: doc.ogDescription || doc.excerpt || doc.metaDescription || '',
    twitterTitle: doc.twitterTitle || doc.ogTitle || doc.metaTitle || doc.title,
    twitterDescription:
      doc.twitterDescription || doc.ogDescription || doc.excerpt || doc.metaDescription || '',
    author: mapAuthor(doc.author) || defaultBlogAuthor,
    reviewedBy: mapAuthor(doc.reviewedBy),
    reviewedAt: isoDate(doc.reviewedAt),
    editorialNote: doc.editorialNote || defaultEditorialNote(doc.category || 'Tools & Guides'),
  }
}

function mergePosts(cms: BlogPost[]): BlogPost[] {
  const bySlug = new Map<string, BlogPost>()
  for (const post of blogPosts) bySlug.set(post.slug, enrichCodePost(post))
  for (const post of cms) bySlug.set(post.slug, post)
  return [...bySlug.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const payload = await withTimeout(getPayload({ config }), FETCH_TIMEOUT_MS, 'getPayload list')
    const res = await withTimeout(
      payload.find({
        collection: 'posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedAt',
        limit: 100,
        draft: false,
        depth: 2,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        locale: 'en' as any,
      }),
      FETCH_TIMEOUT_MS,
      'find posts'
    )
    const mapped = res.docs.map(cmsDocToBlogPost).filter((p): p is BlogPost => Boolean(p))
    return mergePosts(mapped)
  } catch (err) {
    console.warn('[posts] CMS fetch failed, using code blog-data:', err)
    return blogPosts.map(enrichCodePost)
  }
}

export function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return unstable_cache(fetchPublishedPosts, ['posts-all-en-v2'], {
    tags: ['posts'],
    revalidate: 3600,
  })()
}

export function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await withTimeout(
          getPayload({ config }),
          FETCH_TIMEOUT_MS,
          `getPayload ${slug}`
        )
        const res = await withTimeout(
          payload.find({
            collection: 'posts',
            where: {
              and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
            },
            limit: 1,
            draft: false,
            depth: 2,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            locale: 'en' as any,
          }),
          FETCH_TIMEOUT_MS,
          `find ${slug}`
        )
        const fromCms = res.docs[0] ? cmsDocToBlogPost(res.docs[0]) : null
        if (fromCms) return fromCms
      } catch (err) {
        console.warn(`[posts] CMS fetch failed for ${slug}:`, err)
      }
      const fromCode = blogPosts.find((p) => p.slug === slug)
      return fromCode ? enrichCodePost(fromCode) : null
    },
    [`post-${slug}-v2`],
    { tags: ['posts', `post:${slug}`], revalidate: 3600 }
  )()
}

export function getPostsByAuthorSlug(authorSlug: string): Promise<BlogPost[]> {
  return getPublishedBlogPosts().then((posts) =>
    posts.filter((p) => p.author?.slug === authorSlug || p.reviewedBy?.slug === authorSlug)
  )
}
