import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  blogPosts,
  type BlogCategory,
  type BlogPost,
  type BlogSection,
  type BlogTable,
} from '@/lib/blog-data'

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cmsDocToBlogPost(doc: any): BlogPost | null {
  if (!doc?.slug || !doc?.title) return null
  const sections: BlogSection[] = Array.isArray(doc.sections)
    ? doc.sections.map((s: {
        heading?: string | null
        paragraphs?: string | null
        listItems?: string | null
        tableJson?: string | null
      }) => ({
        heading: s.heading || undefined,
        paragraphs: parseParagraphs(s.paragraphs),
        list: parseList(s.listItems),
        table: parseTable(s.tableJson),
      }))
    : []

  const keywords =
    typeof doc.keywords === 'string'
      ? doc.keywords
          .split(',')
          .map((k: string) => k.trim())
          .filter(Boolean)
      : []

  return {
    slug: doc.slug,
    title: doc.title,
    description: doc.excerpt || doc.metaDescription || '',
    category: (doc.category as BlogCategory) || 'Tools & Guides',
    publishedAt:
      typeof doc.publishedAt === 'string'
        ? doc.publishedAt.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    updatedAt: typeof doc.updatedAt === 'string' ? doc.updatedAt.slice(0, 10) : undefined,
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
  }
}

async function fetchPublishedPosts(): Promise<BlogPost[]> {
  try {
    const payload = await getPayload({ config })
    const res = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      sort: '-publishedAt',
      limit: 100,
      draft: false,
      depth: 0,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      locale: 'en' as any,
    })
    const mapped = res.docs
      .map(cmsDocToBlogPost)
      .filter((p): p is BlogPost => Boolean(p))
    return mapped.length > 0 ? mapped : blogPosts
  } catch (err) {
    console.warn('[posts] CMS fetch failed, using code blog-data:', err)
    return blogPosts
  }
}

export function getPublishedBlogPosts(): Promise<BlogPost[]> {
  return unstable_cache(fetchPublishedPosts, ['posts-all-en'], {
    tags: ['posts'],
  })()
}

export function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return unstable_cache(
    async () => {
      try {
        const payload = await getPayload({ config })
        const res = await payload.find({
          collection: 'posts',
          where: {
            and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
          },
          limit: 1,
          draft: false,
          depth: 0,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          locale: 'en' as any,
        })
        const fromCms = res.docs[0] ? cmsDocToBlogPost(res.docs[0]) : null
        if (fromCms) return fromCms
      } catch (err) {
        console.warn(`[posts] CMS fetch failed for ${slug}:`, err)
      }
      return blogPosts.find((p) => p.slug === slug) ?? null
    },
    [`post-${slug}`],
    { tags: ['posts', `post:${slug}`] }
  )()
}
