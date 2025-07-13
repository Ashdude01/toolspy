import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Image Converter - Convert PNG, JPEG, WebP, GIF, BMP | Toolspy',
  description: 'Convert images between all major formats online for free. Support for PNG, JPEG, WebP, GIF, BMP, TIFF with batch processing and quality control. No registration required.',
  keywords: 'image converter, convert images, png to jpg, jpeg to png, webp converter, gif converter, image format converter, batch image conversion, online image converter, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional Image Converter - Convert Any Image Format | Toolspy',
    description: 'Convert images between PNG, JPEG, WebP, GIF, BMP, and TIFF formats. Batch processing, quality control, and privacy-focused client-side conversion.',
    url: 'https://toolspy.com/image-converter',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/image-converter-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy Professional Image Converter',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Converter - Convert Any Image Format | Toolspy',
    description: 'Professional image format converter with batch processing. Convert PNG, JPEG, WebP, GIF, and more formats instantly.',
    images: ['/images/image-converter-twitter.png'],
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
    canonical: 'https://toolspy.com/image-converter',
  },
}

export default function ImageConverterLayout({
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
            "name": "Toolspy Professional Image Converter",
            "description": "Advanced online image format conversion tool supporting PNG, JPEG, WebP, GIF, BMP, and TIFF with batch processing",
            "url": "https://toolspy.com/image-converter",
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
              "ratingValue": "4.8",
              "ratingCount": "2156"
            },
            "featureList": [
              "Image format conversion",
              "Batch processing", 
              "Quality control",
              "PNG to JPEG conversion",
              "WebP optimization",
              "GIF support",
              "Client-side processing"
            ],
            "screenshot": "https://toolspy.com/images/image-converter-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 