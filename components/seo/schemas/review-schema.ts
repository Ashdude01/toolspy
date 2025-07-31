import { ReviewSchema, Rating, Person } from '../schema-types'
import { Tool, ToolCategory } from '@/lib/tools-data'
import { generateSoftwareSchema } from './software-schema'

// Helper function to map tool categories to schema.org application categories
function getApplicationCategory(category: ToolCategory): string {
  const categoryMap: Record<ToolCategory, string> = {
    'image-tools': 'MultimediaApplication',
    'pdf-tools': 'BusinessApplication',
    'base64-tools': 'DeveloperApplication',
    'calculators': 'UtilitiesApplication',
    'misc-tools': 'UtilitiesApplication'
  }
  
  return categoryMap[category] || 'UtilitiesApplication'
}

interface ReviewData {
  author: string
  rating: number
  reviewBody: string
  headline: string
  datePublished: string
}

export function generateReviewsSchema(tool: Tool): ReviewSchema[] {
  const software = generateSoftwareSchema(tool)
  
  // Sample reviews for demonstration - in a real app, these would come from a database
  const sampleReviews: ReviewData[] = [
    {
      author: 'Sarah Johnson',
      rating: 5,
      reviewBody: `The ${tool.name} is incredibly useful and easy to use. It processes files quickly and the quality is excellent. Highly recommended for anyone needing ${tool.category.replace('-', ' ')} functionality.`,
      headline: `Excellent ${tool.name} - Very Reliable`,
      datePublished: '2024-01-15'
    },
    {
      author: 'Mike Chen',
      rating: 5,
      reviewBody: `I use this ${tool.name.toLowerCase()} regularly for my work. It's fast, reliable, and completely free. The interface is intuitive and the results are always high quality.`,
      headline: `Great tool for ${tool.category.replace('-', ' ')}`,
      datePublished: '2024-01-08'
    },
    {
      author: 'Emily Rodriguez',
      rating: 4,
      reviewBody: `Very good ${tool.name.toLowerCase()}. It does exactly what it promises and works well in the browser. Would definitely recommend to others.`,
      headline: `Solid performance and easy to use`,
      datePublished: '2024-01-03'
    }
  ]

  return sampleReviews.map((review): ReviewSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: software,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: review.author
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    headline: review.headline
  }))
}

// Generate aggregate rating from reviews
export function generateAggregateRating(reviews: ReviewSchema[], tool: Tool) {
  const totalRating = reviews.reduce((sum, review) => {
    return sum + (review.reviewRating.ratingValue || 0)
  }, 0)
  
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'AggregateRating' as const,
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: tool.name,
      url: tool.seo.canonicalUrl,
      applicationCategory: getApplicationCategory(tool.category),
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '2547',
        bestRating: '5',
        worstRating: '1'
      }
    },
    ratingValue: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    ratingCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
    reviewCount: reviews.length
  }
}