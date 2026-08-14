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
import { RenderRichText } from '@/components/richtext/render-rich-text';
import { hasLexicalContent } from '@/lib/blog/lexical-from-sections';
import { AuthorByline, EditorialBox } from '@/components/blog/blog-meta';
import { siteConfig } from '@/lib/config';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = new Set(blogPosts.map((post) => post.slug));
  try {
    const posts = await getPublishedBlogPosts();
    for (const post of posts) slugs.add(post.slug);
  } catch {
    // build without DB
  }
  return [...slugs].map((slug) => ({ slug }));
}

/** New CMS slugs after deploy must still resolve (old `false` caused 404). */
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found | Toolspy',
      robots: { index: false, follow: false },
    };
  }
  const url = `${siteConfig.url}/blog/${post.slug}/`;
  const ogTitle = limitTitle(post.ogTitle || post.title);
  const ogDescription = limitDescription(post.ogDescription || post.description);
  const twitterTitle = limitTitle(post.twitterTitle || ogTitle);
  const twitterDescription = limitDescription(post.twitterDescription || ogDescription);
  const shareImage = post.ogImageUrl || post.featuredImageUrl;

  return {
    title: limitTitle(`${post.title} | Toolspy`),
    description: limitDescription(post.description),
    keywords: post.keywords,
    authors: post.author ? [{ name: post.author.name, url: `${siteConfig.url}/blog/author/${post.author.slug}/` }] : [{ name: 'Toolspy Editorial Team' }],
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      siteName: 'Toolspy',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: post.author ? [post.author.name] : ['Toolspy Editorial Team'],
      images: shareImage
        ? [{ url: shareImage, width: 1200, height: 630, alt: post.featuredImageAlt || post.title }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: shareImage ? [shareImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${post.slug}/`;
  const allPosts = await getPublishedBlogPosts();
  const sameCategory = allPosts.filter(
    (p) => p.slug !== slug && p.category === post.category
  );
  const others = allPosts.filter(
    (p) => p.slug !== slug && p.category !== post.category
  );
  const related = [...sameCategory, ...others].slice(0, 3);
  const useRichText = hasLexicalContent(post.content);
  const shareImage = post.ogImageUrl || post.featuredImageUrl;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: url,
    image: shareImage || undefined,
    author: post.author
      ? {
          '@type': 'Person',
          name: post.author.name,
          url: `${siteConfig.url}/blog/author/${post.author.slug}/`,
          description: post.author.bio || undefined,
        }
      : {
          '@type': 'Organization',
          name: 'Toolspy',
          url: siteConfig.url,
        },
    publisher: {
      '@type': 'Organization',
      name: 'Toolspy',
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.url}/icon-192.png`,
      },
    },
    ...(post.reviewedBy
      ? {
          reviewedBy: {
            '@type': 'Person',
            name: post.reviewedBy.name,
            url: `${siteConfig.url}/blog/author/${post.reviewedBy.slug}/`,
          },
        }
      : {}),
  };

  const faqSchema =
    post.faqs.length > 0
      ? {
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
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container mx-auto px-4 py-10 max-w-3xl">
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
          <header className="space-y-4">
            <Badge variant="outline">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{post.description}</p>
            <AuthorByline
              author={post.author}
              publishedAt={post.publishedAt}
              updatedAt={post.updatedAt}
              readingTimeMinutes={post.readingTimeMinutes}
            />
          </header>

          {post.featuredImageUrl ? (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featuredImageUrl}
                alt={post.featuredImageAlt || post.title}
                width={1200}
                height={630}
                className="w-full h-auto rounded-xl border object-cover"
              />
            </figure>
          ) : null}

          <EditorialBox post={post} />

          {useRichText ? (
            <div className="article min-w-0 max-w-full overflow-x-hidden">
              <RenderRichText data={post.content} />
            </div>
          ) : (
            post.sections.map((section, i) => (
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
            ))
          )}

          {post.relatedTool?.name ? (
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
          ) : null}

          {post.faqs.length > 0 ? (
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
          ) : null}

          <p className="text-sm text-muted-foreground">
            About{' '}
            <Link href="/about/" className="underline underline-offset-4 hover:text-foreground">
              Toolspy
            </Link>{' '}
            ·{' '}
            <Link href="/contact/" className="underline underline-offset-4 hover:text-foreground">
              Contact
            </Link>
          </p>

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
