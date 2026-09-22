import type { ReactNode } from 'react'
import { Inter as headingFont } from 'next/font/google'
import { Plus_Jakarta_Sans as bodyFont } from 'next/font/google'
import '@/app/globals.css'
import { HeaderWithTheme } from '@/components/layout/header-with-theme'
import { Footer } from '@/components/layout/footer'
import { PWAWrapper } from '@/components/pwa-wrapper'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics/google-tag-manager'
import { ConsentInitScript } from '@/components/consent/consent-init-script'
import { ConsentProvider } from '@/components/consent/consent-provider'
import { CookieConsentBanner } from '@/components/consent/cookie-consent-banner'
import { HtmlLangSync } from '@/components/i18n/html-lang-sync'
import { ComprehensiveSchemas } from '@/components/seo/comprehensive-schemas'

const headingFontFamily = headingFont({ subsets: ['latin'], variable: '--font-heading' })
const bodyFontFamily = bodyFont({ subsets: ['latin'], variable: '--font-body' })

/**
 * Shared <html>/<body> chrome for EN + localized route trees.
 * Locale comes from the owning layout (params), never from headers() —
 * so pages can ISR / Full Route Cache without force-dynamic.
 */
export function SiteDocument({
  locale,
  dir,
  children,
}: {
  locale: string
  dir: 'ltr' | 'rtl'
  children: ReactNode
}) {
  return (
    <html
      lang={locale}
      dir={dir}
      className={`${bodyFontFamily.variable} ${headingFontFamily.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="google-adsense-account" content="ca-pub-2872990999715744" />
        <meta name="apple-mobile-web-app-title" content="Toolspy" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        <ConsentInitScript />
        <GoogleTagManager />
        <ComprehensiveSchemas />
      </head>
      <body className="antialiased">
        <HtmlLangSync />
        <GoogleTagManagerNoScript />
        <div className="min-h-screen bg-background dark:bg-slate-950">
          <HeaderWithTheme />
          <main>{children}</main>
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
