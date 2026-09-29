/**
 * Localized site tree — /de/..., /fr/..., …
 *
 * Own <html lang>/<dir> from params (not headers) so ISR/Full Route Cache works.
 * English unprefixed URLs stay under app/(frontend).
 */
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SiteDocument } from '@/components/layout/site-document'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  ROUTABLE_LOCALES,
  isRoutableLocale,
} from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

export const revalidate = 3600

export function generateStaticParams() {
  return ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export const dynamicParams = false

export const metadata: Metadata = {
  title: limitTitle(siteConfig.title),
  description: limitDescription(siteConfig.description),
  metadataBase: new URL(siteConfig.url),
  applicationName: 'Toolspy',
  manifest: '/manifest.json',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) {
    notFound()
  }

  const info = ALL_LOCALES[locale]

  return (
    <SiteDocument locale={locale} dir={info.dir}>
      {children}
    </SiteDocument>
  )
}
