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
import { ALL_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales'

const headingFontFamily = headingFont({ subsets: ['latin'], variable: '--font-heading' })
const bodyFontFamily = bodyFont({ subsets: ['latin'], variable: '--font-body' })

/**
 * Shared <html>/<body> chrome for EN + localized route trees.
 *
 * SSR lang defaults to English. A blocking head script corrects lang/dir from
 * the URL before paint. headers() is intentionally not used — it would force
 * every page onto SSR and make language switching wait on the server.
 */
function localeBootScript(): string {
  const dirs = Object.fromEntries(
    Object.entries(ALL_LOCALES).map(([code, info]) => [code, info.dir])
  )
  return `(function(){try{var d=${JSON.stringify(dirs)};var s=(location.pathname.split("/").filter(Boolean)[0]||"");var l=d[s]&&s!==${JSON.stringify(DEFAULT_LOCALE)}?s:${JSON.stringify(DEFAULT_LOCALE)};document.documentElement.lang=l;document.documentElement.dir=d[l]||"ltr";}catch(e){}})();`
}
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
        <script dangerouslySetInnerHTML={{ __html: localeBootScript() }} />
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
