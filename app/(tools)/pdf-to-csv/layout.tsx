import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF to CSV Converter - Extract Data from PDF to CSV | Toolspy',
  description: 'Convert PDF to CSV online for free. Extract tabular data from PDF documents to CSV format for data analysis with privacy protection.',
  keywords: 'pdf to csv, extract data from pdf, pdf data extraction, convert pdf to csv, tabular data extraction, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF to CSV Converter - Extract PDF Data | Toolspy',
    description: 'Extract tabular data from PDF documents to CSV format instantly. Privacy-protected data extraction.',
    url: 'https://toolspy.com/pdf-to-csv',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/pdf-to-csv-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF to CSV Converter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to CSV Converter - Extract PDF Data | Toolspy',
    description: 'Professional PDF to CSV conversion tool. Extract structured data from PDF documents.',
    images: ['/images/pdf-to-csv-twitter.png'],
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
    canonical: 'https://toolspy.com/pdf-to-csv',
  },
}

export default function PdfToCsvLayout({
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
            "name": "Toolspy PDF to CSV Converter",
            "description": "Professional PDF to CSV conversion tool for extracting tabular data from PDF documents",
            "url": "https://toolspy.com/pdf-to-csv",
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
              "ratingValue": "4.5",
              "ratingCount": "643"
            },
            "featureList": [
              "PDF to CSV conversion",
              "Data extraction",
              "Privacy protection",
              "Batch processing",
              "Client-side processing",
              "Tabular data extraction",
              "Structured data export"
            ],
            "screenshot": "https://toolspy.com/images/pdf-to-csv-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 