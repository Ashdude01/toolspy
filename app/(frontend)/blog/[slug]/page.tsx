import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';
import {
  getPublishedBlogPostBySlug,
  getPublishedBlogPosts,
} from '@/lib/payload/get-posts';
import { limitTitle, limitDescription } from '@/lib/utils/seo';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    const posts = await getPublishedBlogPosts();
    if (posts.length > 0) return posts.map((post) => ({ slug: post.slug }));
  } catch {
    // build without DB
  }
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found | Toolspy',
      robots: { index: false, follow: false },
    };
  }
  const url = `https://toolspy.net/blog/${post.slug}/`;
  return {
    title: limitTitle(`${post.title} | Toolspy`),
    description: limitDescription(post.description),
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: limitTitle(post.title),
      description: limitDescription(post.description),
      url,
      siteName: 'Toolspy',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: limitTitle(post.title),
      description: limitDescription(post.description),
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const url = `https://toolspy.net/blog/${post.slug}/`;
  const allPosts = await getPublishedBlogPosts();
  const sameCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const others = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: url,
    author: {
      '@type': 'Organization',
      name: 'Toolspy',
      url: 'https://toolspy.net',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Toolspy',
      logo: {
        '@type': 'ImageObject',
        url: 'https://toolspy.net/icon-192.png',
      },
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://toolspy.net' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://toolspy.net/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog/" className="hover:text-foreground transition-colors">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground line-clamp-1">
              {post.title}
            </li>
          </ol>
        </nav>

        <article className="space-y-10">
          {/* Header */}
          <header className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="outline">{post.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {formatDate(post.updatedAt || post.publishedAt)} · {post.readingTimeMinutes} min
                read
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{post.description}</p>
          </header>

          {/* Body */}
          {post.sections.map((section, i) => (
            <section key={i} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl font-semibold tracking-tight">{section.heading}</h2>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-base leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="space-y-2 list-disc pl-6 text-muted-foreground">
                  {section.list.map((item, j) => (
                    <li key={j} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        {section.table.headers.map((h, j) => (
                          <th key={j} className="px-4 py-3 text-left font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, j) => (
                        <tr key={j} className="border-t">
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-3 text-muted-foreground">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {section.table.caption && (
                    <p className="px-4 py-2 text-xs text-muted-foreground border-t bg-muted/30">
                      {section.table.caption}
                    </p>
                  )}
                </div>
              )}
            </section>
          ))}

          {/* Tool CTA */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg">Try it yourself: {post.relatedTool.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{post.relatedTool.cta}</p>
              <Link
                href={post.relatedTool.path}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Open {post.relatedTool.name}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* FAQs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {post.faqs.map((faq, i) => (
                <div key={i} className="rounded-lg border p-4 space-y-2">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold tracking-tight">Related Reads</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.slug} href={`/blog/${r.slug}/`} className="group block h-full">
                    <div className="h-full rounded-lg border p-4 hover:shadow-md transition-shadow space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {r.category}
                      </Badge>
                      <h3 className="text-sm font-semibold leading-snug group-hover:text-primary transition-colors">
                        {r.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </>
  );
}
