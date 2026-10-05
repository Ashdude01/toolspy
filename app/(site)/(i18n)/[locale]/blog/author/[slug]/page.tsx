import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  isRoutableLocale,
  isPublishedLocale,
  DEFAULT_LOCALE,
} from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { BlogAuthorView, buildAuthorMetadata } from '@/components/blog/blog-author-view'

/** Localized author page — /de/blog/author/<slug>/ */
export const dynamicParams = true
export const revalidate = 86400

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const base = await buildAuthorMetadata(slug, locale)
  return {
    ...base,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/author/${slug}/` },
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedAuthorPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogAuthorView slug={slug} locale={locale} />
}
