import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';
import { getPublishedAuthors } from '@/lib/payload/get-authors';
import { getPublishedBlogPosts } from '@/lib/payload/get-posts';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Authors | Toolspy Blog',
  description:
    'Meet the Toolspy editorial team behind exam, GST, and online-tool guides. Read author bios and their published articles.',
  alternates: { canonical: `${siteConfig.url}/blog/author/` },
  openGraph: {
    title: 'Authors | Toolspy Blog',
    description: 'Toolspy editorial team, reviewers, and their published guides.',
    url: `${siteConfig.url}/blog/author/`,
    type: 'website',
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function BlogAuthorsIndexPage() {
  const [authors, posts] = await Promise.all([getPublishedAuthors(), getPublishedBlogPosts()]);
  const counts = new Map<string, number>();
  for (const post of posts) {
    if (post.author?.slug) counts.set(post.author.slug, (counts.get(post.author.slug) || 0) + 1);
  }

  return (
    <>
      <WebPageSchema
        title="Authors | Toolspy Blog"
        description="Meet the Toolspy editorial team behind exam, GST, and online-tool guides."
        url={`${siteConfig.url}/blog/author/`}
        breadcrumbs={[
          { name: 'Home', url: siteConfig.url },
          { name: 'Blog', url: `${siteConfig.url}/blog/` },
          { name: 'Authors', url: `${siteConfig.url}/blog/author/` },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-5xl space-y-10">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Authors</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Guides on Toolspy are written and reviewed by our editorial team. Visit a profile for bio,
            review role, and published articles.
          </p>
        </header>

        <section className="grid gap-6 sm:grid-cols-2">
          {authors.map((author) => (
            <Link key={author.slug} href={`/blog/author/${author.slug}/`} className="group block h-full">
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
                    {counts.get(author.slug) || 0} article{(counts.get(author.slug) || 0) === 1 ? '' : 's'}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </section>
      </div>
    </>
  );
}
