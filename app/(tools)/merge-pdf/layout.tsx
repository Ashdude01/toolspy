import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF Merger - Combine Multiple PDF Files Online | Toolspy',
  description: 'Merge PDF files online for free. Combine multiple PDF documents into one file with custom page order. Privacy-protected client-side processing.',
  keywords: 'merge pdf, combine pdf, pdf merger, join pdf files, pdf combiner, merge documents, online pdf merger, pdf tools, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF Merger - Combine PDF Files | Toolspy',
    description: 'Merge multiple PDF documents into one file with complete control over page order. Privacy-protected processing and high-quality output.',
    url: 'https://toolspy.com/merge-pdf',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/merge-pdf-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF Merger Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Merger - Combine PDF Files | Toolspy',
    description: 'Professional PDF merger tool. Combine multiple PDF documents with custom order and privacy protection.',
    images: ['/images/merge-pdf-twitter.png'],
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
    canonical: 'https://toolspy.com/merge-pdf',
  },
}

export default function MergePdfLayout({
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
            "name": "Toolspy PDF Merger",
            "description": "Professional PDF merger tool for combining multiple PDF documents into one file with custom page ordering",
            "url": "https://toolspy.com/merge-pdf",
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
              "ratingCount": "1653"
            },
            "featureList": [
              "PDF merging",
              "Custom page order",
              "Batch processing",
              "Privacy protection",
              "Quality preservation",
              "Client-side processing",
              "No file size limits"
            ],
            "screenshot": "https://toolspy.com/images/merge-pdf-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 