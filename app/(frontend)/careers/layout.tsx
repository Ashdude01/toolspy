import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | Toolspy',
  description: 'Join our team at Toolspy! We\'re looking for talented individuals to help us build amazing tools. Apply for positions like Graphic Designer, SEO Executive, Marketing Executive, and more.',
  keywords: ['careers', 'jobs', 'employment', 'hiring', 'graphic designer', 'seo executive', 'marketing executive', 'business development', 'digital marketer', 'toolspy'],
  authors: [{ name: 'Tool Spy' }],
  creator: 'Toolspy',
  publisher: 'Tool Spy',
  openGraph: {
    title: 'Careers - Join Our Team | Toolspy',
    description: 'Join our team at Toolspy! We\'re looking for talented individuals to help us build amazing tools. Apply for positions like Graphic Designer, SEO Executive, Marketing Executive, and more.',
    url: 'https://toolspy.net/careers',
    siteName: 'Toolspy',
    images: [
      {
        url: '/images/careers-og.webp',
        width: 1200,
        height: 630,
        alt: 'Toolspy Careers - Join Our Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers - Join Our Team | Toolspy',
    description: 'Join our team at Toolspy! We\'re looking for talented individuals to help us build amazing tools. Apply for positions like Graphic Designer, SEO Executive, Marketing Executive, and more.',
    images: ['/images/careers-og.webp'],
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
    canonical: 'https://toolspy.net/careers',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
