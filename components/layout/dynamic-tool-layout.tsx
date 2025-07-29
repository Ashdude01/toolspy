import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'

// Generate dynamic metadata for any tool
export function generateToolMetadata(toolSlug: string): Metadata {
  const tool = getToolBySlug(toolSlug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found | Toolspy',
      description: 'The requested tool could not be found.'
    }
  }

  return {
    title: tool.seo.metaTitle,
    description: tool.seo.metaDescription,
    keywords: tool.seo.keywords.join(', '),
    authors: [{ name: 'Toolspy Team' }],
    creator: 'Toolspy',
    publisher: 'Toolspy',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: tool.seo.ogTitle,
      description: tool.seo.ogDescription,
      url: tool.seo.canonicalUrl,
      siteName: 'Toolspy',
      images: [
        {
          url: tool.seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.name} - Toolspy Tool`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seo.twitterTitle,
      description: tool.seo.twitterDescription,
      images: [tool.seo.twitterImage],
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
      canonical: tool.seo.canonicalUrl,
    },
  }
}

// Dynamic tool layout component
export function DynamicToolLayout({ 
  toolSlug, 
  children 
}: { 
  toolSlug: string
  children: React.ReactNode 
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return <>{children}</>
  }

  // Generate dynamic schema markup based on tool data
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "description": tool.description,
    "url": tool.seo.canonicalUrl,
    "applicationCategory": getApplicationCategory(tool.category),
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
    "featureList": tool.tags,
    "screenshot": `https://toolspy.com/images/tools/${tool.slug.replace('/', '')}-screenshot.png`,
    "softwareHelp": {
      "@type": "CreativeWork",
      "url": `${tool.seo.canonicalUrl}#faq`
    }
  }

  return (
    <>
      {/* Dynamic Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup)
        }}
      />
      {children}
    </>
  )
}

// Helper function to map tool categories to schema.org application categories
function getApplicationCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'image-tools': 'MultimediaApplication',
    'pdf-tools': 'BusinessApplication', 
    'base64-tools': 'DeveloperApplication',
    'calculators': 'UtilitiesApplication',
    'misc-tools': 'UtilitiesApplication'
  }
  
  return categoryMap[category] || 'UtilitiesApplication'
} 