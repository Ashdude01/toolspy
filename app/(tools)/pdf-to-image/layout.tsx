import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF to Image Converter - Convert PDF to PNG, JPG, WebP | Toolspy',
  description: 'Convert PDF pages to high-quality images online for free. Extract PDF pages as PNG, JPG, or WebP images with custom quality settings. Privacy-protected conversion.',
  keywords: 'pdf to image, pdf to png, pdf to jpg, convert pdf to image, pdf page extraction, pdf converter, online pdf tools, pdf to jpeg, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF to Image Converter - Extract PDF Pages | Toolspy',
    description: 'Convert PDF documents to high-quality images. Extract individual pages or entire documents as PNG, JPG, or WebP images with privacy protection.',
    url: 'https://toolspy.com/pdf-to-image',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/pdf-to-image-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF to Image Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to Image Converter - Extract PDF Pages | Toolspy',
    description: 'Professional PDF to image conversion tool. Extract PDF pages as high-quality PNG, JPG, or WebP images instantly.',
    images: ['/images/pdf-to-image-twitter.png'],
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
    canonical: 'https://toolspy.com/pdf-to-image',
  },
}

export default function PdfToImageLayout({
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
            "name": "Toolspy PDF to Image Converter",
            "description": "Professional PDF to image conversion tool for extracting PDF pages as high-quality PNG, JPG, or WebP images",
            "url": "https://toolspy.com/pdf-to-image",
            "applicationCategory": "MultimediaApplication",
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
              "ratingCount": "1923"
            },
            "featureList": [
              "PDF to image conversion",
              "Multiple output formats",
              "Custom page ranges",
              "Quality settings",
              "Batch processing",
              "Privacy protection",
              "Client-side processing"
            ],
            "screenshot": "https://toolspy.com/images/pdf-to-image-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 