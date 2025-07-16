import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF to Word Converter - Convert PDF to DOCX Online | Toolspy',
  description: 'Convert PDF to Word documents online for free. Transform PDF files to editable DOCX format with privacy-protected client-side processing.',
  keywords: 'pdf to word, convert pdf to docx, pdf to word converter, pdf to document, extract text from pdf, pdf editor, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF to Word Converter - Convert PDF to DOCX | Toolspy',
    description: 'Convert PDF documents to editable Word files instantly. Privacy-protected processing with high-quality text extraction.',
    url: 'https://toolspy.com/pdf-to-word',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/pdf-to-word-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF to Word Converter Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to Word Converter - Convert PDF to DOCX | Toolspy',
    description: 'Professional PDF to Word conversion tool. Transform PDF documents to editable Word files with privacy protection.',
    images: ['/images/pdf-to-word-twitter.png'],
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
    canonical: 'https://toolspy.com/pdf-to-word',
  },
}

export default function PdfToWordLayout({
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
            "name": "Toolspy PDF to Word Converter",
            "description": "Professional PDF to Word conversion tool for transforming PDF documents into editable Word files",
            "url": "https://toolspy.com/pdf-to-word",
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
              "ratingCount": "1423"
            },
            "featureList": [
              "PDF to Word conversion",
              "Batch processing",
              "Privacy protection",
              "Text extraction",
              "Client-side processing",
              "DOCX output format",
              "No file size limits"
            ],
            "screenshot": "https://toolspy.com/images/pdf-to-word-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 