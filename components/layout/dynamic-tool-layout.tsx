import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ToolSchemas } from '../seo/schema-manager'
import { createFullUrl } from '@/lib/utils/metadata'

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
  faqs,
  reviews
}: { 
  toolSlug: string
  children: React.ReactNode 
  faqs?: Array<{
    question: string
    answer: string
  }>
  reviews?: Array<{
    author: string
    rating: number
    text: string
  }>
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return <>{children}</>
  }

  const defaultReviews = [
    {
      author: "John Doe",
      rating: 5,
      text: `The ${tool.name} is absolutely fantastic! It exceeded my expectations and is incredibly easy to use. Highly recommend it to everyone!`
    },
    {
      author: "Jane Smith",
      rating: 5,
      text: `I am thoroughly impressed with the ${tool.name}. It delivers outstanding performance and the results are always top-notch. A must-have tool!`
    },
    {
      author: "Alex Johnson",
      rating: 5,
      text: `Using the ${tool.name} has been a game-changer for me. It's efficient, reliable, and the quality is unmatched. Five stars!`
    },
    {
      author: "Emily Davis",
      rating: 5,
      text: `The ${tool.name} is simply the best. It offers great value and the user experience is seamless. I can't imagine working without it!`
    },
    {
      author: "Michael Brown",
      rating: 5,
      text: `I love the ${tool.name}! It's intuitive and delivers excellent results every time. I highly recommend it to anyone in need of a reliable tool.`
    }
  ]

  const pageData = {
    title: tool.seo.metaTitle,
    description: tool.seo.metaDescription,
    path: tool.path,
    serviceType: tool.name,
    faqs: faqs || [],
    reviews: reviews || defaultReviews,
    aggregateRating: {
      rating: 4.9,
      reviewCount: 1247,
      bestRating: 5,
    },
    image: tool.posterImage || tool.seo.ogImage,
  };


  return (
    <>
      {/* Enhanced Schema Markup */}
      <ToolSchemas 
        tool={tool}
        includeReviews={true}
        includeFAQ={true}
      />
      {children}
    </>
  )
}

// Component is already exported above 