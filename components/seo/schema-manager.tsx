'use client'

import { Tool, ToolCategory } from '@/lib/tools-data'
import { PageType } from './schema-types'
import { generateOrganizationSchema } from './schemas/organization-schema'
import { generateWebsiteSchema } from './schemas/website-schema'
import { generateWebPageSchema } from './schemas/webpage-schema'
import { generateSoftwareSchema } from './schemas/software-schema'
import { generateReviewsSchema, generateAggregateRating } from './schemas/review-schema'
import { generateFAQSchema } from './schemas/faq-schema'

interface SchemaManagerProps {
  pageType: PageType
  tool?: Tool
  category?: ToolCategory
  customTitle?: string
  customDescription?: string
  includeReviews?: boolean
  includeFAQ?: boolean
}

export function SchemaManager({
  pageType,
  tool,
  category,
  customTitle,
  customDescription,
  includeReviews = false,
  includeFAQ = false
}: SchemaManagerProps) {
  // Always include organization and website schemas
  const organizationSchema = generateOrganizationSchema()
  const websiteSchema = generateWebsiteSchema()
  
  // Generate page-specific schemas
  const schemas: any[] = [organizationSchema, websiteSchema]
  
  // Add webpage schema
  const webpageSchema = generateWebPageSchema(
    pageType as 'homepage' | 'tool' | 'category' | 'about',
    { tool, category, customTitle, customDescription }
  )
  schemas.push(webpageSchema)
  
  // Add tool-specific schemas
  if (pageType === 'tool' && tool) {
    const softwareSchema = generateSoftwareSchema(tool)
    schemas.push(softwareSchema)
    
    // Add reviews and ratings if requested
    if (includeReviews) {
      const reviewsSchema = generateReviewsSchema(tool)
      const aggregateRatingSchema = generateAggregateRating(reviewsSchema, tool)
      schemas.push(...reviewsSchema, aggregateRatingSchema)
    }
    
    // Add FAQ if requested
    if (includeFAQ) {
      const faqSchema = generateFAQSchema(tool)
      schemas.push(faqSchema)
    }
  }
  
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  )
}

// Convenience components for specific page types
export function HomepageSchemas() {
  return <SchemaManager pageType="homepage" />
}

export function ToolSchemas({ 
  tool, 
  includeReviews = true, 
  includeFAQ = true 
}: { 
  tool: Tool
  includeReviews?: boolean
  includeFAQ?: boolean
}) {
  return (
    <SchemaManager
      pageType="tool"
      tool={tool}
      includeReviews={includeReviews}
      includeFAQ={includeFAQ}
    />
  )
}

export function CategorySchemas({ category }: { category: ToolCategory }) {
  return <SchemaManager pageType="category" category={category} />
}

export function AboutSchemas() {
  return <SchemaManager pageType="about" />
}

export function ContactSchemas() {
  return <SchemaManager pageType="contact" />
}

export function HelpSchemas() {
  return <SchemaManager pageType="help" />
}