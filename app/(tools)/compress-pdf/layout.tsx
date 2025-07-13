import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF Compressor - Reduce PDF File Size Online | Toolspy',
  description: 'Compress PDF files online for free. Reduce PDF file size by up to 60% while maintaining quality. Privacy-protected compression with multiple quality levels.',
  keywords: 'pdf compressor, compress pdf, reduce pdf size, pdf optimizer, shrink pdf, online pdf compressor, pdf file size reducer, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF Compressor - Reduce File Size | Toolspy',
    description: 'Compress PDF files by up to 60% while maintaining quality. Multiple compression levels and privacy-protected processing.',
    url: 'https://toolspy.com/compress-pdf',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/compress-pdf-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF Compressor Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Compressor - Reduce PDF File Size | Toolspy',
    description: 'Professional PDF compression tool. Reduce file size by up to 60% with quality preservation and privacy protection.',
    images: ['/images/compress-pdf-twitter.png'],
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
    canonical: 'https://toolspy.com/compress-pdf',
  },
}

export default function CompressPdfLayout({
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
            "name": "Toolspy PDF Compressor",
            "description": "Professional PDF compression tool for reducing file size while maintaining document quality and readability",
            "url": "https://toolspy.com/compress-pdf",
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
              "ratingValue": "4.7",
              "ratingCount": "1432"
            },
            "featureList": [
              "PDF compression",
              "Quality preservation",
              "Multiple compression levels",
              "Batch processing",
              "Privacy protection",
              "Client-side processing",
              "Up to 60% size reduction"
            ],
            "screenshot": "https://toolspy.com/images/compress-pdf-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 