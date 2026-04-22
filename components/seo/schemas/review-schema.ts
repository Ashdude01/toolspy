import { ReviewSchema } from '../schema-types'
import { Tool } from '@/lib/tools-data'
import { getToolReviews } from '@/lib/tool-reviews'

export function generateReviewsSchema(tool: Tool): ReviewSchema[] {
  const reviews = getToolReviews(tool)

  return reviews.map((review): ReviewSchema => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': `${tool.seo.canonicalUrl}#softwareapp` } as any,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: review.ratingValue,
      bestRating: 5,
      worstRating: 1
    },
    author: {
      '@type': 'Person',
      name: review.authorName
    },
    datePublished: review.datePublished,
    reviewBody: review.reviewBody,
    headline: review.headline
  }))
}

// Note: Aggregate rating is now embedded directly in SoftwareApplication schema
// This function is kept for backward compatibility but is no longer used
export function generateAggregateRating(reviews: ReviewSchema[], tool: Tool) {
  const totalRating = reviews.reduce((sum, review) => {
    return sum + (review.reviewRating.ratingValue || 0)
  }, 0)
  
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0

  return {
    '@context': 'https://schema.org' as const,
    '@type': 'AggregateRating' as const,
    ratingValue: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    ratingCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
    reviewCount: reviews.length
  }
}