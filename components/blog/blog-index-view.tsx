import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { WebPageSchema } from '@/components/seo/comprehensive-schemas'
import { getPublishedBlogPosts } from '@/lib/payload/get-posts'
import { formatBlogDate } from '@/components/blog/blog-meta'
import { siteConfig } from '@/lib/config'
import { getT } from '@/lib/i18n/messages'

/**
 * BlogIndexView — blog index ka actual render (locale-aware).
 *
 * NOTE: ye ek VIEW component hai (route nahi), isliye `locale` prop yahan safe hai
 * (route pages me extra props Next allow nahi karta). English route aur localized
 * `[locale]/blog` wrapper dono ise use karte hain — bas locale alag hota hai.
 *
 * locale → getPublishedBlogPosts(locale): jo post translate hai wo us language me,
 * warna English fallback (Payload fallbackLocale). Ab `/de/blog/` par German content
 * dikhta hai (jahan aapne daala hai).
 */
export async function BlogIndexView({ locale = 'en' }: { locale?: string }) {
  const posts = await getPublishedBlogPosts(locale)
  const isLocalized = locale !== 'en'
  const base = isLocalized ? `/${locale}` : ''
  const t = getT(locale)

  return (
    <>
      <WebPageSchema
        title={t('blog.indexMetaTitle')}
        description={t('blog.indexMetaDescription')}
        url={`${siteConfig.url}${base}/blog/`}
        breadcrumbs={[
          { name: t('blog.home'), url: `${siteConfig.url}${base}/` },
          { name: t('nav.blog'), url: `${siteConfig.url}${base}/blog/` },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">{t('blog.latestArticles')}</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.latestArticlesSubtitle')}
          </p>
          <p className="text-sm text-muted-foreground">
            {t('blog.writtenByPrefix')}{' '}
            <Link
              href={`${base}/blog/author/`}
              className="underline underline-offset-4 hover:text-foreground"
            >
              {t('blog.editorialTeam')}
            </Link>
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`${base}/blog/${post.slug}/`}
              className="group block h-full"
            >
              <Card className="h-full transition-shadow duration-200 hover:shadow-lg overflow-hidden">
                {post.featuredImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.featuredImageUrl}
                    alt={post.featuredImageAlt || post.title}
                    className="w-full h-40 object-cover border-b"
                  />
                ) : null}
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {t('blog.minRead', { count: post.readingTimeMinutes })}
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {formatBlogDate(post.updatedAt || post.publishedAt, locale)}
                    {post.author ? ` · ${post.author.name}` : ''}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">{post.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </>
  )
}
