import type { Metadata } from 'next'
import { SiteDocument } from '@/components/layout/site-document'
import { siteConfig } from '@/lib/config'
import { DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { dirForLocale } from '@/lib/i18n/pathname-locale'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

/**
 * English (unprefixed) site tree — /bmi-calculator/, /blog/, …
 *
 * ISR: no headers()/cookies() here. Locale is known (DEFAULT_LOCALE).
 * Localized URLs live under app/(i18n)/[locale] with their own <html lang>.
 */
export const revalidate = 3600

export const metadata: Metadata = {
  title: limitTitle(siteConfig.title),
  description: limitDescription(siteConfig.description),
  keywords: siteConfig.keywords,
  authors: [{ name: `${siteConfig.name} Team` }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  applicationName: 'Toolspy',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Toolspy',
    startupImage: [
      {
        url: '/icon-512.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: limitTitle(siteConfig.title),
    description: limitDescription(siteConfig.description),
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/main.webp',
        width: 1200,
        height: 680,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: limitTitle(siteConfig.title),
    description: limitDescription(siteConfig.description),
    creator: siteConfig.social.twitter,
    images: ['/main.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'b04c69b64649efd5',
    yahoo: 'yahoo-site-verification-code',
  },
}

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteDocument locale={DEFAULT_LOCALE} dir={dirForLocale(DEFAULT_LOCALE)}>
      {children}
    </SiteDocument>
  )
}
