import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  isRoutableLocale,
  isPublishedLocale,
  DEFAULT_LOCALE,
} from '@/lib/i18n/locales'
import { getT } from '@/lib/i18n/messages'
import { siteConfig } from '@/lib/config'
import { BlogIndexView } from '@/components/blog/blog-index-view'

/**
 * Localized blog index — /de/blog/ ...
 * Indexable when locale is in PUBLISHED_LOCALES.
 */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  const t = getT(locale)
  return {
    title: t('blog.indexMetaTitle'),
    description: t('blog.indexMetaDescription'),
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/` },
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedBlogIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogIndexView locale={locale} />
}
