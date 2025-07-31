import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'
import { ToolSchemas } from '@/components/seo/schema-manager'

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

// Dynamic tool layout component with enhanced schema support
export function DynamicToolLayout({ 
  toolSlug, 
  children,
  includeReviews = true,
  includeFAQ = true
}: { 
  toolSlug: string
  children: React.ReactNode 
  includeReviews?: boolean
  includeFAQ?: boolean
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return <>{children}</>
  }

  return (
    <>
      {/* Enhanced Schema Markup */}
      <ToolSchemas 
        tool={tool} 
        includeReviews={includeReviews}
        includeFAQ={includeFAQ}
      />
      {children}
    </>
  )
}

// Component is already exported above 