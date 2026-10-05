import type { MetadataRoute } from 'next'
import { tools, toolCategories } from '@/lib/tools-data'
import { blogPosts } from '@/lib/blog-data'
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults'
import { getPublishedBlogPosts } from '@/lib/payload/get-posts'
import { getPublishedAuthors } from '@/lib/payload/get-authors'
import { PUBLISHED_LOCALES, ALL_LOCALES } from '@/lib/i18n/locales'
import { CANONICAL_SITE_ORIGIN } from '@/lib/site-url'

/** Always apex — never www. Matches siteConfig.url / robots.txt. */
export const SITEMAP_BASE_URL = CANONICAL_SITE_ORIGIN

/** Child sitemap URLs (named — not 0/1/2). */
export const SITEMAP_CHILDREN = [
  { id: 'pages', path: '/sitemap/pages.xml' },
  { id: 'tools', path: '/sitemap/tools.xml' },
  { id: 'blog', path: '/sitemap/blog.xml' },
] as const

export type SitemapEntry = MetadataRoute.Sitemap[number]

/** Match Next trailingSlash: true — every page loc ends with /. */
function sitemapPath(path: string): string {
  if (!path || path === '/') return '/'
  const p = path.startsWith('/') ? path : `/${path}`
  return p.endsWith('/') ? p : `${p}/`
}

function absoluteUrl(path: string): string {
  const p = sitemapPath(path)
  return p === '/' ? `${SITEMAP_BASE_URL}/` : `${SITEMAP_BASE_URL}${p}`
}

function absoluteLocaleUrl(locale: string, path: string): string {
  const p = sitemapPath(path)
  return p === '/' ? `${SITEMAP_BASE_URL}/${locale}/` : `${SITEMAP_BASE_URL}/${locale}${p}`
}

function languagesFor(path: string): Record<string, string> | undefined {
  if (PUBLISHED_LOCALES.length === 0) return undefined
  const langs: Record<string, string> = {
    'x-default': absoluteUrl(path),
    en: absoluteUrl(path),
  }
  for (const loc of PUBLISHED_LOCALES) {
    const info = ALL_LOCALES[loc]
    if (info) langs[info.hreflang] = absoluteLocaleUrl(loc, path)
  }
  return langs
}

/** English + published-locale URLs with shared hreflang cluster. */
export function withLocales(
  path: string,
  opts: {
    changeFrequency: SitemapEntry['changeFrequency']
    priority: number
    lastModified?: Date
    localize?: boolean
  },
): MetadataRoute.Sitemap {
  const { changeFrequency, priority, lastModified = new Date(), localize = true } = opts
  const languages = localize ? languagesFor(path) : undefined
  const alt = languages ? { alternates: { languages } } : {}
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl(path), lastModified, changeFrequency, priority, ...alt },
  ]
  if (localize) {
    for (const loc of PUBLISHED_LOCALES) {
      entries.push({
        url: absoluteLocaleUrl(loc, path),
        lastModified,
        changeFrequency,
        priority: Math.max(0.1, priority - 0.05),
        ...alt,
      })
    }
  }
  return entries
}

function dedupe(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>()
  return entries.filter((e) => (seen.has(e.url) ? false : (seen.add(e.url), true)))
}

export function buildPagesSitemap(): MetadataRoute.Sitemap {
  const localized = [
    ...withLocales('', { changeFrequency: 'daily', priority: 1 }),
    ...withLocales('/tools', { changeFrequency: 'daily', priority: 0.9 }),
    ...withLocales('/blog', { changeFrequency: 'weekly', priority: 0.9 }),
    ...withLocales('/blog/author', { changeFrequency: 'weekly', priority: 0.7 }),
  ]

  const englishOnly: Array<[string, number, SitemapEntry['changeFrequency']]> = [
    ['/about', 0.8, 'monthly'],
    ['/contact', 0.8, 'monthly'],
    ['/digital-marketing', 0.85, 'monthly'],
    ['/help', 0.8, 'weekly'],
    ['/feedback', 0.6, 'monthly'],
    ['/bug-report', 0.6, 'monthly'],
    ['/privacy', 0.7, 'monthly'],
    ['/terms', 0.7, 'monthly'],
    ['/disclaimer', 0.5, 'monthly'],
    ['/dmca', 0.5, 'monthly'],
    ['/cookie-policy', 0.5, 'monthly'],
    ['/gdpr-ccpa', 0.5, 'monthly'],
  ]
  const staticPages = englishOnly.flatMap(([p, priority, changeFrequency]) =>
    withLocales(p, { changeFrequency, priority, localize: false }),
  )

  const extensionPages: MetadataRoute.Sitemap = [
    'image-compressor',
    'image-downloader',
    'facebook-photo-downloader',
  ].map((slug) => ({
    url: absoluteUrl(`/extensions/${slug}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  return dedupe([...localized, ...staticPages, ...extensionPages])
}

export function buildToolsSitemap(): MetadataRoute.Sitemap {
  const toolPages = tools
    .filter((tool) => tool.status === 'active')
    .flatMap((tool) => withLocales(tool.path, { changeFrequency: 'weekly', priority: 0.9 }))

  const categoryPages: MetadataRoute.Sitemap = Object.keys(toolCategories).map((category) => ({
    url: absoluteUrl(`/tools/${category}`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return dedupe([...toolPages, ...categoryPages])
}

export async function buildBlogSitemap(): Promise<MetadataRoute.Sitemap> {
  let posts = blogPosts
  try {
    posts = await getPublishedBlogPosts()
  } catch {
    // build / DB unavailable — code fallback
  }

  let authors = [defaultBlogAuthor, defaultBlogReviewer]
  try {
    const cmsAuthors = await getPublishedAuthors()
    if (cmsAuthors.length > 0) authors = cmsAuthors
  } catch {
    // fallback defaults
  }

  const blogPages = posts.flatMap((post) =>
    withLocales(`/blog/${post.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.8,
      lastModified: new Date(post.updatedAt || post.publishedAt),
    }),
  )

  const authorPages = authors.flatMap((author) =>
    withLocales(`/blog/author/${author.slug}`, {
      changeFrequency: 'monthly',
      priority: 0.6,
    }),
  )

  return dedupe([...blogPages, ...authorPages])
}
