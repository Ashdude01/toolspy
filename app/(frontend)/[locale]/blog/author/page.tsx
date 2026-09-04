import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isRoutableLocale, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import BlogAuthorsIndexPage from '@/app/(frontend)/blog/author/page'

/** Localized blog authors index — /de/blog/author/ (English render + noindex). */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: `Authors | ${siteConfig.name}`,
    alternates: { canonical: `${siteConfig.url}/${locale}/blog/author/` },
    robots: { index: false, follow: true },
  }
}

export default async function LocalizedAuthorsIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogAuthorsIndexPage />
}
