import type { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { WebPageSchema } from '@/components/seo/comprehensive-schemas'
import { getPublishedAuthors } from '@/lib/payload/get-authors'
import { getPublishedBlogPosts } from '@/lib/payload/get-posts'
import { siteConfig } from '@/lib/config'
import { getT } from '@/lib/i18n/messages'

function basePath(locale: string): string {
  return locale && locale !== 'en' ? `/${locale}` : ''
}

/** Shared metadata builder for /blog/author and localized wrappers. */
export function buildAuthorsIndexMetadata(locale: string): Metadata {
  const t = getT(locale)
  const base = basePath(locale)
  return {
    title: t('blog.authorsMetaTitle'),
    description: t('blog.authorsMetaDescription'),
    alternates: { canonical: `${siteConfig.url}${base}/blog/author/` },
  }
}

/** Locale-aware authors index — used by /blog/author and /[locale]/blog/author. */
export async function BlogAuthorsIndexView({ locale = 'en' }: { locale?: string }) {
  const t = getT(locale)
  const base = basePath(locale)
  const [authors, posts] = await Promise.all([
    getPublishedAuthors(),
    getPublishedBlogPosts(locale),
  ])
  const counts = new Map<string, number>()
  for (const post of posts) {
    if (post.author?.slug) counts.set(post.author.slug, (counts.get(post.author.slug) || 0) + 1)
  }

  return (
    <>
      <WebPageSchema
        title={t('blog.authorsMetaTitle')}
        description={t('blog.authorsMetaDescription')}
        url={`${siteConfig.url}${base}/blog/author/`}
        breadcrumbs={[
          { name: t('blog.home'), url: `${siteConfig.url}${base}/` },
          { name: t('nav.blog'), url: `${siteConfig.url}${base}/blog/` },
          { name: t('blog.authors'), url: `${siteConfig.url}${base}/blog/author/` },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">{t('blog.authors')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t('blog.authorsSubtitle')}</p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {authors.map((author) => {
            const count = counts.get(author.slug) || 0
            return (
              <Link
                key={author.slug}
                href={`${base}/blog/author/${author.slug}/`}
                className="group block h-full"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                    {author.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={author.photoUrl}
                        alt={author.name}
                        className="h-16 w-16 rounded-full object-cover border shrink-0"
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-muted border flex items-center justify-center text-lg font-semibold shrink-0">
                        {author.name.slice(0, 1)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {author.name}
                      </CardTitle>
                      {author.role ? <CardDescription>{author.role}</CardDescription> : null}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {author.bio ? (
                      <p className="text-sm text-muted-foreground line-clamp-3">{author.bio}</p>
                    ) : null}
                    <p className="text-xs text-muted-foreground">
                      {count === 1
                        ? t('blog.articleCount', { count })
                        : t('blog.articleCountPlural', { count })}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </section>
      </div>
    </>
  )
}
