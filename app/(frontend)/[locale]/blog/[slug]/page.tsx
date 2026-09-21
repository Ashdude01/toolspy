import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  isRoutableLocale,
  isPublishedLocale,
  DEFAULT_LOCALE,
} from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { BlogPostView, buildBlogPostMetadata } from '@/components/blog/blog-post-view'

/**
 * Localized blog post — /de/blog/<slug>/ ...
 * Indexable when locale is in PUBLISHED_LOCALES.
 */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const base = await buildBlogPostMetadata(slug, locale)
  return {
    ...base,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/${slug}/` },
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedBlogPost({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogPostView slug={slug} locale={locale} />
}
