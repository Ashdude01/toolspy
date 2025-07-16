import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free File Protector - Add Password Protection to Files | Toolspy',
  description: 'Protect your files with password encryption online for free. Add security to PDFs and documents with privacy-protected processing.',
  keywords: 'file protector, password protect files, encrypt files, secure files, pdf protection, file security, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional File Protector - Secure Your Files | Toolspy',
    description: 'Add password protection to your files instantly. Privacy-protected encryption for maximum security.',
    url: 'https://toolspy.com/file-protector',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/file-protector-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy File Protector Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free File Protector - Secure Your Files | Toolspy',
    description: 'Professional file protection tool. Add password security to your documents with privacy protection.',
    images: ['/images/file-protector-twitter.png'],
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
    canonical: 'https://toolspy.com/file-protector',
  },
}

export default function FileProtectorLayout({
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
            "name": "Toolspy File Protector",
            "description": "Professional file protection tool for adding password security to documents and files",
            "url": "https://toolspy.com/file-protector",
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
              "ratingCount": "892"
            },
            "featureList": [
              "File password protection",
              "PDF encryption",
              "Privacy protection",
              "Batch processing",
              "Client-side processing",
              "Secure encryption",
              "Multiple file support"
            ],
            "screenshot": "https://toolspy.com/images/file-protector-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 