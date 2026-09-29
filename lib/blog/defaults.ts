import type { BlogAuthor } from '@/lib/blog-data'

/** Default public author when CMS author is missing / code fallback. */
export const defaultBlogAuthor: BlogAuthor = {
  slug: 'toolspy-editorial',
  name: 'Toolspy Editorial Team',
  role: 'Editors',
  bio: 'The Toolspy editorial team publishes practical guides on exams, GST, and everyday file tools. Articles are written for clarity and updated when official rules or tool behaviour change.',
}

/** Default reviewer for editorial byline. */
export const defaultBlogReviewer: BlogAuthor = {
  slug: 'toolspy-review',
  name: 'Toolspy Review Desk',
  role: 'Reviewer',
  bio: 'The review desk checks Toolspy guides for factual accuracy, broken steps, and outdated exam/GST figures before publish and after major updates.',
}

export function defaultEditorialNote(category: string): string {
  if (category === 'Exams') {
    return 'Reviewed for accuracy. Rank/percentile bands are indicative estimates based on publicly discussed trends — always verify with the official notification and result.'
  }
  if (category === 'GST & Finance') {
    return 'Reviewed against publicly available GST rules. Rates, late fees, and procedures can change — confirm on the official GST portal before filing.'
  }
  return 'Reviewed for accuracy. Tool steps describe Toolspy’s current browser-based behaviour; always follow the latest in-app UI.'
}
