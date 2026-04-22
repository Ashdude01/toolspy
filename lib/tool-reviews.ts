import type { Tool } from '@/lib/tools-data'

export interface ToolReview {
  authorName: string
  ratingValue: number // 1..5
  datePublished: string // ISO 8601 (YYYY-MM-DD)
  headline: string
  reviewBody: string
}

/**
 * First‑party reviews that are displayed on the tool page.
 *
 * IMPORTANT:
 * - Only add reviews that are real and visible on the page.
 * - Keep schema counts/averages in sync with what the user can see.
 */
const TOOL_REVIEWS: Record<string, ToolReview[]> = {
  // Example:
  // 'facebook-image-downloader': [
  //   {
  //     authorName: 'Amit',
  //     ratingValue: 5,
  //     datePublished: '2026-04-20',
  //     headline: 'Works on public posts',
  //     reviewBody: 'Pulled all images from a public post quickly.',
  //   },
  // ],
}

export function getToolReviews(tool: Tool): ToolReview[] {
  return TOOL_REVIEWS[tool.slug] || TOOL_REVIEWS[tool.id] || []
}

export function getToolRatingSummary(tool: Tool): { ratingValue: number; reviewCount: number } | null {
  const reviews = getToolReviews(tool)
  if (reviews.length === 0) return null

  const total = reviews.reduce((sum, r) => sum + r.ratingValue, 0)
  const avg = total / reviews.length
  return {
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  }
}

