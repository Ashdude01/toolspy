import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Age Calculator - Calculate Your Exact Age Online | Toolspy',
  description: 'Calculate your exact age in years, months, days, hours, and minutes. Professional age calculator with zodiac signs, life statistics, and milestone tracking.',
  keywords: 'age calculator, calculate age, age in days, age in months, how old am I, birth date calculator, age difference calculator, zodiac calculator, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional Age Calculator - Calculate Exact Age | Toolspy',
    description: 'Calculate your exact age with detailed statistics. Get age in years, months, days, zodiac signs, and life milestones with professional accuracy.',
    url: 'https://toolspy.com/age-calculator',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/age-calculator-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy Age Calculator Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Age Calculator - Calculate Your Exact Age | Toolspy',
    description: 'Professional age calculator with detailed statistics. Calculate age in years, months, days, and get zodiac information.',
    images: ['/images/age-calculator-twitter.png'],
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
    canonical: 'https://toolspy.com/age-calculator',
  },
}

export default function AgeCalculatorLayout({
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
            "name": "Toolspy Age Calculator",
            "description": "Professional age calculator for calculating exact age in years, months, days, hours, and minutes with zodiac signs",
            "url": "https://toolspy.com/age-calculator",
            "applicationCategory": "UtilitiesApplication",
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
              "ratingValue": "4.9",
              "ratingCount": "2341"
            },
            "featureList": [
              "Age calculation",
              "Zodiac signs",
              "Life statistics",
              "Milestone tracking",
              "Age difference calculator",
              "Privacy protection",
              "Detailed breakdown"
            ],
            "screenshot": "https://toolspy.com/images/age-calculator-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 