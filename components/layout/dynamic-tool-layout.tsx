import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'
import { ToolSchemas } from '@/components/seo/schema-manager'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

// Generate dynamic metadata for any tool
export function generateToolMetadata(toolSlug: string): Metadata {
  const tool = getToolBySlug(toolSlug)
  
  if (!tool) {
    return {
      title: limitTitle('Tool Not Found | Toolspy'),
      description: limitDescription('The requested tool could not be found.')
    }
  }

  return {
    title: limitTitle(tool.seo.metaTitle),
    description: limitDescription(tool.seo.metaDescription),
    keywords: tool.seo.keywords.join(', '),
    authors: [{ name: 'Tool Spy' }],
    creator: 'Toolspy',
    publisher: 'Tool Spy',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      title: limitTitle(tool.seo.ogTitle),
      description: limitDescription(tool.seo.ogDescription),
      url: tool.seo.canonicalUrl,
      siteName: 'Toolspy',
      images: [
        {
          url: tool.posterImage || tool.seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.seo.ogDescription}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: limitTitle(tool.seo.twitterTitle),
      description: limitDescription(tool.seo.twitterDescription),
      images: [tool.posterImage || tool.seo.ogImage],
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