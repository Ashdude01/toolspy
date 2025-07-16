import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF Splitter - Split PDF Files Online | Toolspy',
  description: 'Split PDF files online for free. Divide large PDF documents into smaller files by page ranges, pages per file, or individual pages.',
  keywords: 'split pdf, divide pdf, pdf splitter, extract pages, split pdf online, pdf page extractor, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF Splitter - Split PDF Files | Toolspy',
    description: 'Split large PDF documents into smaller files with complete control over page selection. Privacy-protected processing.',
    url: 'https://toolspy.com/split-pdf',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/split-pdf-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF Splitter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Splitter - Split PDF Files | Toolspy',
    description: 'Professional PDF splitting tool. Divide large documents into smaller files with privacy protection.',
    images: ['/images/split-pdf-twitter.png'],
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
    canonical: 'https://toolspy.com/split-pdf',
  },
}

export default function SplitPdfLayout({
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
            "name": "Toolspy PDF Splitter",
            "description": "Professional PDF splitting tool for dividing large PDF documents into smaller files",
            "url": "https://toolspy.com/split-pdf",
            "applicationCategory": "BusinessApplication",
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
              "ratingCount": "1234"
            },
            "featureList": [
              "PDF splitting",
              "Page range selection",
              "Batch processing",
              "Privacy protection",
              "Client-side processing",
              "Multiple split modes",
              "ZIP download"
            ],
            "screenshot": "https://toolspy.com/images/split-pdf-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 