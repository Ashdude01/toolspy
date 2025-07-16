import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF to Excel Converter - Convert PDF to XLSX Online | Toolspy',
  description: 'Convert PDF to Excel spreadsheets online for free. Extract tabular data from PDF documents to editable XLSX format with privacy protection.',
  keywords: 'pdf to excel, convert pdf to xlsx, pdf to spreadsheet, extract data from pdf, pdf data extraction, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF to Excel Converter - Convert PDF to XLSX | Toolspy',
    description: 'Convert PDF documents to Excel spreadsheets instantly. Extract tabular data with privacy-protected processing.',
    url: 'https://toolspy.com/pdf-to-excel',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/pdf-to-excel-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF to Excel Converter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to Excel Converter - Convert PDF to XLSX | Toolspy',
    description: 'Professional PDF to Excel conversion tool. Transform PDF documents to editable spreadsheets.',
    images: ['/images/pdf-to-excel-twitter.png'],
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
    canonical: 'https://toolspy.com/pdf-to-excel',
  },
}

export default function PdfToExcelLayout({
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
            "name": "Toolspy PDF to Excel Converter",
            "description": "Professional PDF to Excel conversion tool for extracting tabular data from PDF documents",
            "url": "https://toolspy.com/pdf-to-excel",
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
              "ratingValue": "4.6",
              "ratingCount": "756"
            },
            "featureList": [
              "PDF to Excel conversion",
              "Data extraction",
              "Privacy protection",
              "Batch processing",
              "Client-side processing",
              "XLSX output format",
              "Table extraction"
            ],
            "screenshot": "https://toolspy.com/images/pdf-to-excel-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 