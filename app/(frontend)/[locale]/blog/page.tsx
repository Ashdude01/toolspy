import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isRoutableLocale, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { BlogIndexView } from '@/components/blog/blog-index-view'

/**
 * Localized blog index — /de/blog/ ...
 * BlogIndexView(locale) → jahan post translate hai wahan us language me, warna
 * English fallback. Abhi NOINDEX (jab tak locale PUBLISHED na ho).
 */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: `Blog | ${siteConfig.name}`,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/` },
    robots: { index: false, follow: true },
  }
}

export default async function LocalizedBlogIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogIndexView locale={locale} />
}
