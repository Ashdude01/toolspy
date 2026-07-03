import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { blogPosts } from '@/lib/blog-data';
import { WebPageSchema } from '@/components/seo/comprehensive-schemas';

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
    canonical: 'https://toolspy.net/blog',
  },
  openGraph: {
    title: 'Blog – Guides for Exams, GST & Online Tools | Toolspy',
    description:
      'Practical guides: exam rank & percentile analysis, GST rules with tables, and image/PDF how-tos.',
    url: 'https://toolspy.net/blog',
    type: 'website',
  },
};

/** Pre-rendered at build time. */
export const dynamic = 'force-static';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogIndexPage() {
  return (
    <>
      <WebPageSchema
        title="Blog – Guides for Exams, GST & Online Tools | Toolspy"
        description="Practical guides from Toolspy: exam rank analysis, GST rules, and tool how-tos."
        url="https://toolspy.net/blog"
        breadcrumbs={[
          { name: 'Home', url: 'https://toolspy.net' },
          { name: 'Blog', url: 'https://toolspy.net/blog' },
        ]}
      />
      <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Latest Articles</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Practical, data-backed guides for exams, GST, and everyday file tasks - each one
            paired with a free tool that does the work for you.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block h-full">
              <Card className="h-full transition-shadow duration-200 hover:shadow-lg">
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
                    {formatDate(post.updatedAt || post.publishedAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
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
