import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Percentage Calculator - Calculate Discounts, Tips, Increases | Toolspy',
  description: 'Professional percentage calculator for discounts, tips, increases, decreases, and compound growth. Step-by-step solutions and detailed explanations. Free online tool.',
  keywords: 'percentage calculator, calculate percentage, percentage increase, percentage decrease, discount calculator, tip calculator, compound interest, percentage formula, math calculator, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional Percentage Calculator - Free Online Tool | Toolspy',
    description: 'Calculate any percentage with step-by-step explanations. Discounts, tips, increases, decreases, and compound growth calculator with detailed solutions.',
    url: 'https://toolspy.com/percentage-calculator',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/percentage-calculator-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy Professional Percentage Calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Percentage Calculator - Calculate Discounts & Tips | Toolspy',
    description: 'Professional percentage calculator with step-by-step solutions. Calculate discounts, tips, increases, and compound growth instantly.',
    images: ['/images/percentage-calculator-twitter.png'],
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
    canonical: 'https://toolspy.com/percentage-calculator',
  },
}

export default function PercentageCalculatorLayout({
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
            "name": "Toolspy Professional Percentage Calculator",
            "description": "Advanced percentage calculator for discounts, tips, increases, decreases, and compound growth with step-by-step solutions",
            "url": "https://toolspy.com/percentage-calculator",
            "applicationCategory": "EducationalApplication",
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
              "ratingCount": "1847"
            },
            "featureList": [
              "Basic percentage calculations",
              "Percentage increase/decrease",
              "Discount calculator",
              "Tip calculator",
              "Compound growth",
              "Step-by-step solutions",
              "Multiple calculation types"
            ],
            "screenshot": "https://toolspy.com/images/percentage-calculator-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 