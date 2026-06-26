import { Tool, ToolCategory } from '@/lib/tools-data'
import { PageType } from './schema-types'
import { generateWebPageSchema } from './schemas/webpage-schema'
import { generateSoftwareSchema } from './schemas/software-schema'
import { generateReviewsSchema } from './schemas/review-schema'
import { generateFAQSchema } from './schemas/faq-schema'
import { siteConfig } from '@/lib/config'

interface SchemaManagerProps {
  pageType: PageType
  tool?: Tool
  category?: ToolCategory
  customTitle?: string
  customDescription?: string
  includeReviews?: boolean
  includeFAQ?: boolean
}

// Validate schema structure before rendering
function validateSchema(schema: any): boolean {
  if (!schema || typeof schema !== 'object') return false
  if (!schema['@context'] || schema['@context'] !== 'https://schema.org') return false
  if (!schema['@type']) return false
  return true
}

// Clean and validate FAQ schema
function validateFAQSchema(faqSchema: any): any | null {
  if (!faqSchema || !validateSchema(faqSchema)) return null
  
  // Ensure mainEntity exists and is an array with at least one question
  if (!faqSchema.mainEntity || !Array.isArray(faqSchema.mainEntity)) return null
  if (faqSchema.mainEntity.length === 0) return null
  
  // Validate each question
  const validQuestions = faqSchema.mainEntity.filter((q: any) => {
    return (
      q &&
      q['@type'] === 'Question' &&
      q.name &&
      typeof q.name === 'string' &&
      q.name.trim().length > 0 &&
      q.acceptedAnswer &&
      q.acceptedAnswer['@type'] === 'Answer' &&
      q.acceptedAnswer.text &&
      typeof q.acceptedAnswer.text === 'string' &&
      q.acceptedAnswer.text.trim().length > 0
    )
  })
  
  if (validQuestions.length === 0) return null
  
  return {
    ...faqSchema,
    mainEntity: validQuestions
  }
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
  // Site-wide Organization + WebSite are emitted once globally by
  // <ComprehensiveSchemas /> in app/layout.tsx, so we intentionally do NOT
  // re-emit them here. This removes the duplicate Organization/WebSite
  // structured data that previously appeared on every tool page.
  const schemas: any[] = []

  // Add webpage schema
  const webpageSchema = generateWebPageSchema(
    pageType as 'homepage' | 'tool' | 'category' | 'about' | 'contact' | 'help',
    { tool, category, customTitle, customDescription }
  )
  if (validateSchema(webpageSchema)) {
    schemas.push(webpageSchema)
  }
  
  // Add tool-specific schemas
  if (pageType === 'tool' && tool) {
    // Generate software schema with embedded aggregate rating
    const softwareSchema = generateSoftwareSchema(tool)
    
    // Add reviews if requested
    if (includeReviews) {
      const reviewsSchema = generateReviewsSchema(tool)
      
      // Add individual review schemas (only when you have real, visible reviews)
      reviewsSchema.forEach(review => {
        if (validateSchema(review)) {
          schemas.push(review)
        }
      })
    }
    
    // Validate and add software schema
    if (validateSchema(softwareSchema)) {
      schemas.push(softwareSchema)
    }
    
    // Add FAQ if requested - with validation
    if (includeFAQ) {
      const faqSchema = generateFAQSchema(tool)
      if (faqSchema) {
        const validatedFAQ = validateFAQSchema(faqSchema)
        if (validatedFAQ) {
          schemas.push(validatedFAQ)
        }
      }
    }
  }
  
  // Filter out any invalid schemas and render
  const validSchemas = schemas.filter(validateSchema)
  
  return (
    <>
      {validSchemas.map((schema, index) => (
        <script
          key={`schema-${index}-${schema['@type']}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2)
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

export function AboutSchemas() {
  return <SchemaManager pageType="about" />
}

export function ContactSchemas() {
  return <SchemaManager pageType="contact" />
}

export function HelpSchemas() {
  return <SchemaManager pageType="help" />
}

export function CategorySchemas({ 
  category, 
  customTitle, 
  customDescription 
}: { 
  category: ToolCategory
  customTitle?: string
  customDescription?: string
}) {
  return (
    <SchemaManager 
      pageType="category" 
      category={category}
      customTitle={customTitle}
      customDescription={customDescription}
    />
  )
}