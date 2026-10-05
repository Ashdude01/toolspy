import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  DEFAULT_LOCALE,
  ROUTABLE_LOCALES,
  isPublishedLocale,
  isRoutableLocale,
} from '@/lib/i18n/locales'
import { HomePageView, buildHomepageMetadata } from '@/components/home2/home-page-view'

/**
 * Localized homepage — /de/, /es/, ...
 * HomePageView(locale): layout code se; SEO content block CMS/code toggle se
 * (per-language). Jab tak locale PUBLISHED na ho → noindex.
 */
/** ISR — language switch serves the cached page, it does not SSR on each click. */
export const dynamic = 'force-static'
export const revalidate = 86400
export const dynamicParams = false

type Params = Promise<{ locale: string }>

export function generateStaticParams() {
  return ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params
  if (!isRoutableLocale(locale) || locale === DEFAULT_LOCALE) return {}
  const base = await buildHomepageMetadata(locale)
  return {
    ...base,
    ...(isPublishedLocale(locale) ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedHomePage({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()
  return <HomePageView locale={locale} />
}
