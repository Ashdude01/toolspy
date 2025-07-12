import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Online Image Compressor - Compress JPEG, PNG, WebP | Toolspy',
  description: 'Compress images online for free with Toolspy\'s advanced image compressor. Reduce JPEG, PNG, WebP file sizes by up to 80% while maintaining quality. No registration required.',
  keywords: 'image compressor, compress images, reduce image size, optimize images, JPEG compressor, PNG compressor, WebP compression, online image optimizer, free image compression, batch image compressor, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional Image Compressor - Free Online Tool | Toolspy',
    description: 'Compress images with advanced algorithms. Support for JPEG, PNG, WebP, AVIF. Batch processing, quality control, and privacy-focused client-side compression.',
    url: 'https://toolspy.com/image-compressor',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/image-compressor-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy Professional Image Compressor',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Image Compressor - Compress Images Online | Toolspy',
    description: 'Professional image compression tool with advanced features. Reduce file sizes while maintaining quality. No registration required.',
    images: ['/images/image-compressor-twitter.png'],
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
    canonical: 'https://toolspy.com/image-compressor',
  },
}

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Schema Markup for Image Compressor Tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Toolspy Professional Image Compressor",
            "description": "Advanced online image compression tool for JPEG, PNG, WebP optimization with batch processing and quality control",
            "url": "https://toolspy.com/image-compressor",
            "applicationCategory": "MultimediaApplication",
            "operatingSystem": "Web Browser",
            "softwareVersion": "2.0",
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
              "ratingCount": "2547"
            },
            "featureList": [
              "Image compression",
              "Batch processing", 
              "Quality control",
              "Format conversion",
              "EXIF management",
              "Progressive encoding",
              "Client-side processing"
            ],
            "screenshot": "https://toolspy.com/images/image-compressor-screenshot.png",
            "softwareHelp": {
              "@type": "CreativeWork",
              "url": "https://toolspy.com/image-compressor#faq"
            }
          })
        }}
      />
      {children}
    </>
  )
} 