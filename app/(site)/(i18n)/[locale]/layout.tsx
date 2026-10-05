/**
 * Localized site tree — /de/..., /ja/..., /ar/..., …
 *
 * Owns <html lang>/<dir> from route params (NOT headers), so:
 *   - View Source shows lang="ja" on /ja/... (SEO-correct)
 *   - Route stays ISR / force-static (headers() would force SSR)
 *
 * English unprefixed URLs stay under app/(site)/(frontend).
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

export const revalidate = 86400
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: limitTitle(siteConfig.title),
  description: limitDescription(siteConfig.description),
  metadataBase: new URL(siteConfig.url),
  applicationName: 'Toolspy',
  manifest: '/manifest.json',
}

/**
 * Throws 404 while keeping the parent SiteDocument wrapper (correct <html>).
 * Sync on purpose: an async function that only calls notFound() is typed as
 * Promise<void>, which React 19 rejects as a component. notFound() still
 * throws during this child's render, after <html lang> is already committed.
 */
function ForceNotFound(): React.ReactNode {
  notFound()
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const info = ALL_LOCALES[locale]
  const valid =
    Boolean(info) && locale !== DEFAULT_LOCALE && isRoutableLocale(locale)

  if (!valid) {
    // Still emit <html> so View Source / crawlers never get a fragment document.
    return (
      <SiteDocument locale={DEFAULT_LOCALE} dir={ALL_LOCALES[DEFAULT_LOCALE].dir}>
        <ForceNotFound />
      </SiteDocument>
    )
  }

  return (
    <SiteDocument locale={locale} dir={info.dir}>
      {children}
    </SiteDocument>
  )
}
