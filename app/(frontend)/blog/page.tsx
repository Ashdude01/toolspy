import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';
import { getPublishedBlogPosts } from '@/lib/payload/get-posts';
import { formatBlogDate } from '@/components/blog/blog-meta';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Blog – Guides for Exams, GST & Online Tools | Toolspy',
  description:
    'Practical guides from Toolspy: exam rank & percentile analysis (JEE, CAT, SSC CGL), GST rules explained with tables, and how-to guides for image & PDF tools.',
  keywords: [
    'toolspy blog',
    'exam rank guides',
    'gst guides',
    'image compression guide',
    'pdf tools guide',
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: 'Blog – Guides for Exams, GST & Online Tools | Toolspy',
    description:
      'Practical guides: exam rank & percentile analysis, GST rules with tables, and image/PDF how-tos.',
    url: `${siteConfig.url}/blog/`,
    type: 'website',
  },
};

/** Pre-rendered at build time; CMS updates revalidate via posts afterChange. */
export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const posts = await getPublishedBlogPosts();

  return (
    <>
      <WebPageSchema
        title="Blog – Guides for Exams, GST & Online Tools | Toolspy"
        description="Practical guides from Toolspy: exam rank analysis, GST rules, and tool how-tos."
        url={`${siteConfig.url}/blog/`}
        breadcrumbs={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog/` },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Latest Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practical, data-backed guides for exams, GST, and everyday file tasks - each one
            paired with a free tool that does the work for you.
          </p>
          <p className="text-sm text-muted-foreground">
            Written by the{' '}
            <Link href="/blog/author/" className="underline underline-offset-4 hover:text-foreground">
              Toolspy editorial team
            </Link>
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block h-full">
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
                      {post.readingTimeMinutes} min read
                    </span>
                  </div>
                  <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {formatBlogDate(post.updatedAt || post.publishedAt)}
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
  );
}
