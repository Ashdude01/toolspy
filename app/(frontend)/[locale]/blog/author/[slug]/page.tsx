import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isRoutableLocale, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import BlogAuthorPage, { generateMetadata as enAuthorMeta } from '@/app/(frontend)/blog/author/[slug]/page'

/** Localized author page — /de/blog/author/<slug>/ (English render + noindex). */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const base = await enAuthorMeta({ params: Promise.resolve({ slug }) })
  return {
    ...base,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/author/${slug}/` },
    robots: { index: false, follow: true },
  }
}

export default async function LocalizedAuthorPage({ params }: { params: Params }) {
  const { locale, slug } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogAuthorPage params={Promise.resolve({ slug })} />
}
