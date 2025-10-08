import type { Metadata } from 'next'
// import "./styles.css"

export const metadata: Metadata = {
  title: 'Toolspy V2 - Professional Online Tools Hub',
  description: 'Discover the new Toolspy homepage with enhanced design, better user experience, and all your favorite professional online tools.',
  keywords: [
    'online tools',
    'image compression',
    'PDF converter',
    'base64 tools',
    'calculator',
    'free tools',
    'professional tools',
    'privacy-focused tools',
    'toolspy v2',
    'new homepage'
  ],
  openGraph: {
    title: 'Toolspy V2 - Professional Online Tools Hub',
    description: 'Experience the new Toolspy homepage with enhanced design and better user experience.',
    type: 'website',
    url: 'https://toolspy.net/home2',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Toolspy V2 - Professional Online Tools Hub',
    description: 'Experience the new Toolspy homepage with enhanced design and better user experience.',
  },
  robots: {
    index: false, // Don't index this R&D version
    follow: false,
  },
}

export default function Home2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
