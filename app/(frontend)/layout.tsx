import type { Metadata } from 'next'
import { Inter as headingFont } from 'next/font/google'
import { Plus_Jakarta_Sans as bodyFont } from 'next/font/google'
import './../globals.css'
import { HeaderWithTheme } from '@/components/layout/header-with-theme'
import { Footer } from '@/components/layout/footer'
import { PWAWrapper } from '@/components/pwa-wrapper'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics/google-tag-manager'
import { ConsentInitScript } from '@/components/consent/consent-init-script'
import { ConsentProvider } from '@/components/consent/consent-provider'
import { CookieConsentBanner } from '@/components/consent/cookie-consent-banner'
import { HtmlLangSync } from '@/components/i18n/html-lang-sync'
import { getRequestLocale } from '@/lib/i18n/get-request-locale'
import { siteConfig } from '@/lib/config'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ComprehensiveSchemas } from '@/components/seo/comprehensive-schemas'

const headingFontFamily = headingFont({ subsets: ['latin'], variable: '--font-heading' })
const bodyFontFamily = bodyFont({ subsets: ['latin'], variable: '--font-body' })

/**
 * Must be request-dynamic: shared layout sits ABOVE [locale], so locale is not in
 * params. Static prerender would bake lang="en" into /de/... HTML (wrong View Source).
 */
export const dynamic = 'force-dynamic'

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { locale, dir } = await getRequestLocale()

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${bodyFontFamily.variable} ${headingFontFamily.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="google-adsense-account" content="ca-pub-2872990999715744"/>
        <meta name="apple-mobile-web-app-title" content="Toolspy" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        {/* Initialize Consent Mode BEFORE any Google tags */}
        <ConsentInitScript />
        <GoogleTagManager />
        {/* Comprehensive Structured Data Schemas */}
        <ComprehensiveSchemas />
      </head>
      <body className="antialiased">
        <HtmlLangSync />
        <GoogleTagManagerNoScript />
        <div className="min-h-screen bg-background dark:bg-slate-950">
          <HeaderWithTheme />
          <main>
            {children}
          </main>
          <Footer />
        </div>
        <ConsentProvider>
          <CookieConsentBanner />
        </ConsentProvider>
        <PWAWrapper />
      </body>
    </html>
  )
}
