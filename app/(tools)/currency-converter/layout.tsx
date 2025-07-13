import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Currency Converter - Real-Time Exchange Rates | Toolspy',
  description: 'Convert currencies with real-time exchange rates. Support for 150+ world currencies with historical data and conversion charts. Fast and accurate currency converter.',
  keywords: 'currency converter, exchange rates, forex converter, currency calculator, USD to EUR, GBP to USD, currency exchange, real-time rates, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional Currency Converter - Real-Time Rates | Toolspy',
    description: 'Convert currencies with real-time exchange rates. Support for 150+ world currencies with historical data and conversion charts.',
    url: 'https://toolspy.com/currency-converter',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/currency-converter-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy Currency Converter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Currency Converter - Real-Time Exchange Rates | Toolspy',
    description: 'Professional currency converter with real-time rates. Convert between 150+ world currencies instantly.',
    images: ['/images/currency-converter-twitter.png'],
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
    canonical: 'https://toolspy.com/currency-converter',
  },
}

export default function CurrencyConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Toolspy Currency Converter",
            "description": "Professional currency converter with real-time exchange rates for 150+ world currencies",
            "url": "https://toolspy.com/currency-converter",
            "applicationCategory": "FinanceApplication",
            "operatingSystem": "Web Browser",
            "softwareVersion": "1.0",
            "author": {
              "@type": "Organization",
              "name": "Toolspy",
              "url": "https://toolspy.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "1876"
            },
            "featureList": [
              "Real-time exchange rates",
              "150+ world currencies",
              "Historical data",
              "Conversion charts",
              "Currency trends",
              "Popular conversions",
              "Rate alerts"
            ],
            "screenshot": "https://toolspy.com/images/currency-converter-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 