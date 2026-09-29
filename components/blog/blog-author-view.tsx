import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthorBySlug, getPublishedAuthors } from '@/lib/payload/get-authors'
import { getPostsByAuthorSlug } from '@/lib/payload/get-posts'
import { defaultBlogAuthor, defaultBlogReviewer } from '@/lib/blog/defaults'
import { formatBlogDate } from '@/components/blog/blog-meta'
import { limitDescription, limitTitle } from '@/lib/utils/seo'
import { siteConfig } from '@/lib/config'
import { getT } from '@/lib/i18n/messages'

function basePath(locale: string): string {
  return locale && locale !== 'en' ? `/${locale}` : ''
}

export async function generateAuthorStaticParams() {
  const slugs = new Set([defaultBlogAuthor.slug, defaultBlogReviewer.slug])
  try {
    const authors = await getPublishedAuthors()
    for (const a of authors) slugs.add(a.slug)
  } catch {
    // build without DB
  }
  return [...slugs].map((slug) => ({ slug }))
}

export async function buildAuthorMetadata(slug: string, locale = 'en'): Promise<Metadata> {
  const t = getT(locale)
  const author = await getAuthorBySlug(slug)
  if (!author) {
    return { title: 'Author Not Found | Toolspy', robots: { index: false, follow: false } }
  }
  const base = basePath(locale)
  const url = `${siteConfig.url}${base}/blog/author/${author.slug}/`
  const description = limitDescription(
    author.bio || t('blog.authorFallbackBio', { name: author.name }),
  )
  return {
    title: limitTitle(`${author.name} | Toolspy Blog`),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${author.name} | Toolspy Blog`,
      description,
      url,
      type: 'profile',
      images: author.photoUrl ? [{ url: author.photoUrl, alt: author.name }] : undefined,
    },
    twitter: {
      card: author.photoUrl ? 'summary_large_image' : 'summary',
      title: `${author.name} | Toolspy Blog`,
      description,
      images: author.photoUrl ? [author.photoUrl] : undefined,
    },
  }
}

/** Locale-aware author profile — used by /blog/author/[slug] and localized wrappers. */
export async function BlogAuthorView({
  slug,
  locale = 'en',
}: {
  slug: string
  locale?: string
}) {
  const t = getT(locale)
  const base = basePath(locale)
  const author = await getAuthorBySlug(slug)
  if (!author) notFound()

  const posts = await getPostsByAuthorSlug(author.slug, locale)
  const url = `${siteConfig.url}${base}/blog/author/${author.slug}/`

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    description: author.bio || undefined,
    jobTitle: author.role || undefined,
    url,
    image: author.photoUrl || undefined,
    worksFor: {
      '@type': 'Organization',
      name: 'Toolspy',
      url: siteConfig.url,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('blog.home'), item: `${siteConfig.url}${base}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: t('nav.blog'),
        item: `${siteConfig.url}${base}/blog/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t('blog.authors'),
        item: `${siteConfig.url}${base}/blog/author/`,
      },
      { '@type': 'ListItem', position: 4, name: author.name, item: url },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
        <nav aria-label="breadcrumb" className="text-sm text-muted-foreground">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={`${base}/`} className="hover:text-foreground">
                {t('blog.home')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`${base}/blog/`} className="hover:text-foreground">
                {t('nav.blog')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`${base}/blog/author/`} className="hover:text-foreground">
                {t('blog.authors')}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-foreground">{author.name}</li>
          </ol>
        </nav>

        <header className="flex flex-col sm:flex-row gap-6 sm:items-start">
          {author.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.photoUrl}
              alt={author.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover border shrink-0"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-muted border flex items-center justify-center text-2xl font-semibold shrink-0">
              {author.name.slice(0, 1)}
            </div>
          )}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{author.name}</h1>
            {author.role ? (
              <p className="text-muted-foreground">
                {author.role} {t('blog.atToolspy')}
              </p>
            ) : null}
            {author.bio ? (
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{author.bio}</p>
            ) : null}
            <p className="text-sm text-muted-foreground">
              <Link
                href={`${base}/about/`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {t('blog.aboutToolspy')}
              </Link>
              {' · '}
              <Link
                href={`${base}/contact/`}
                className="underline underline-offset-4 hover:text-foreground"
              >
                {t('nav.contact')}
              </Link>
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            {posts.length > 0
              ? t('blog.articlesHeadingCount', { count: posts.length })
              : t('blog.articlesHeading')}
          </h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">{t('blog.noArticles')}</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`${base}/blog/${post.slug}/`}
                  className="group block h-full"
                >
                  <Card className="flex h-full flex-col overflow-hidden pt-0 transition-shadow hover:shadow-md">
                    {post.featuredImageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.featuredImageUrl}
                        alt={post.featuredImageAlt || post.title}
                        width={800}
                        height={450}
                        className="aspect-[16/9] w-full object-cover"
                      />
                    ) : (
                      <div className="flex aspect-[16/9] w-full items-center justify-center bg-muted text-sm text-muted-foreground">
                        {post.category}
                      </div>
                    )}
                    <CardHeader className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatBlogDate(post.publishedAt, locale)}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-snug group-hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                    </CardHeader>
                    {post.editorialNote && post.reviewedBy?.slug === author.slug ? (
                      <CardContent>
                        <p className="text-xs text-muted-foreground">
                          {t('blog.editorialReviewerOn')}
                        </p>
                      </CardContent>
                    ) : null}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  )
}
