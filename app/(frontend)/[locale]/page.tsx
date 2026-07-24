import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from '@/app/page'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  ROUTABLE_LOCALES,
  PUBLISHED_LOCALES,
  isPublishedLocale,
  isRoutableLocale,
} from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

/**
 * Localized homepage — /de/, /fr/, ... (Next 15: async params)
 * Phase 2: existing English homepage reuse. Phase 3: Payload 'pages' se
 * localized hero/sections aayenge.
 */

export const dynamicParams = false

type Params = Promise<{ locale: string }>

export function generateStaticParams() {
  return ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { locale } = await params
  const info = ALL_LOCALES[locale]
  if (!info) return {}

  const published = isPublishedLocale(locale)
  const canonical = `${siteConfig.url}/${locale}/`

  const languages: Record<string, string> = {
    'x-default': `${siteConfig.url}/`,
    en: `${siteConfig.url}/`,
  }
  for (const pub of PUBLISHED_LOCALES) {
    const pubInfo = ALL_LOCALES[pub]
    if (pubInfo) languages[pubInfo.hreflang] = `${siteConfig.url}/${pub}/`
  }

  return {
    title: limitTitle(siteConfig.title),
    description: limitDescription(siteConfig.description),
    alternates: {
      canonical,
      ...(published ? { languages } : {}),
    },
    ...(published ? {} : { robots: { index: false, follow: true } }),
  }
}

export default async function LocalizedHomePage({ params }: { params: Params }) {
  const { locale } = await params
  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()

  return <HomePage />
}
