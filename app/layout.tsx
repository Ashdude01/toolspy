import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { PWAWrapper } from '@/components/pwa-wrapper'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics/google-tag-manager'
import { siteConfig } from '@/lib/config'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ComprehensiveSchemas } from '@/components/seo/comprehensive-schemas'

const inter = Inter({ subsets: ['latin'] })

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
  verification: {
    google: 'google-site-verification-code',
    yandex: 'b04c69b64649efd5',
    yahoo: 'yahoo-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Toolspy" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
        <meta name="google-adsense-account" content="ca-pub-8490028444671399" />
        <GoogleTagManager />
        {/* Comprehensive Structured Data Schemas */}
        <ComprehensiveSchemas />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PWAWrapper>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Header />
              <main>
                {children}
              </main>
              <div className="a_ads_container container max-w-7xl mx-auto py-10 bg-transparent">
                <div
                  id="frame"
                  style={{
                    width: "100%",
                    margin: "auto",
                    position: "relative",
                    zIndex: 10,
                  }}
                >
                  <iframe
                    data-aa="2419400"
                    src="//acceptable.a-ads.com/2419400/?size=Adaptive"
                    style={{
                      border: 0,
                      padding: 0,
                      width: "70%",
                      height: "auto",
                      overflow: "hidden",
                      display: "block",
                      margin: "auto",
                    }}
                  ></iframe>
                </div>
              </div>
              <Footer />
            </div>
          </PWAWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
} 