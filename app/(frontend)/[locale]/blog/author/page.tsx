import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  isRoutableLocale,
  isPublishedLocale,
  DEFAULT_LOCALE,
} from '@/lib/i18n/locales'
import { BlogAuthorsIndexView } from '@/components/blog/blog-authors-index-view'
import { buildAuthorsIndexMetadata } from '@/app/(frontend)/blog/author/page'

/** Localized blog authors index — /de/blog/author/ */
export const dynamicParams = true
export const revalidate = 3600

type Params = Promise<{ locale: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  return {
    ...buildAuthorsIndexMetadata(locale),
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedAuthorsIndex({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <BlogAuthorsIndexView locale={locale} />
}
