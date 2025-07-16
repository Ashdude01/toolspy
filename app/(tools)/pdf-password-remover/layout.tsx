import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free PDF Password Remover - Unlock Protected PDFs Online | Toolspy',
  description: 'Remove password protection from PDF files online for free. Unlock password-protected PDFs instantly with privacy-protected client-side processing.',
  keywords: 'pdf password remover, unlock pdf, remove pdf password, pdf unlocker, decrypt pdf, password protected pdf, toolspy',
  authors: [{ name: 'Toolspy Team' }],
  creator: 'Toolspy',
  publisher: 'Toolspy',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Professional PDF Password Remover - Unlock Protected PDFs | Toolspy',
    description: 'Remove password protection from PDF files instantly. Privacy-protected processing with secure password handling.',
    url: 'https://toolspy.com/pdf-password-remover',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/pdf-password-remover-preview.png',
        width: 1200,
        height: 630,
        alt: 'Toolspy PDF Password Remover Tool',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Password Remover - Unlock Protected PDFs | Toolspy',
    description: 'Professional PDF password removal tool. Unlock password-protected PDFs with complete privacy protection.',
    images: ['/images/pdf-password-remover-twitter.png'],
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
    canonical: 'https://toolspy.com/pdf-password-remover',
  },
}

export default function PdfPasswordRemoverLayout({
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
            "name": "Toolspy PDF Password Remover",
            "description": "Professional PDF password removal tool for unlocking password-protected PDF documents",
            "url": "https://toolspy.com/pdf-password-remover",
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
              "ratingCount": "987"
            },
            "featureList": [
              "PDF password removal",
              "Batch processing",
              "Privacy protection",
              "Secure processing",
              "Client-side processing",
              "Quality preservation",
              "Multiple file support"
            ],
            "screenshot": "https://toolspy.com/images/pdf-password-remover-screenshot.png"
          })
        }}
      />
      {children}
    </>
  )
} 