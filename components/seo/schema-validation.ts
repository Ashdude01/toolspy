// Schema validation utilities for development and testing
import { Tool, ToolCategory } from '@/lib/tools-data'
import { generateOrganizationSchema } from './schemas/organization-schema'
import { generateWebsiteSchema } from './schemas/website-schema'
import { generateSoftwareSchema } from './schemas/software-schema'
import { generateReviewsSchema, generateAggregateRating } from './schemas/review-schema'
import { generateFAQSchema } from './schemas/faq-schema'
import { generateWebPageSchema } from './schemas/webpage-schema'

// Schema validation function for development use
export function validateSchemas(tool?: Tool) {
  const results: { type: string; valid: boolean; errors: string[] }[] = []
  
  try {
    // Test Organization Schema
    const orgSchema = generateOrganizationSchema()
    results.push({
      type: 'Organization',
      valid: validateOrganizationSchema(orgSchema),
      errors: []
    })
  } catch (error) {
    results.push({
      type: 'Organization',
      valid: false,
      errors: [error instanceof Error ? error.message : 'Unknown error']
    })
  }
  
  try {
    // Test Website Schema
    const websiteSchema = generateWebsiteSchema()
    results.push({
      type: 'Website',
      valid: validateWebsiteSchema(websiteSchema),
      errors: []
    })
  } catch (error) {
    results.push({
      type: 'Website',
      valid: false,
      errors: [error instanceof Error ? error.message : 'Unknown error']
    })
  }
  
  if (tool) {
    try {
      // Test Software Schema
      const softwareSchema = generateSoftwareSchema(tool)
      results.push({
        type: 'SoftwareApplication',
        valid: validateSoftwareSchema(softwareSchema),
        errors: []
      })
    } catch (error) {
      results.push({
        type: 'SoftwareApplication',
        valid: false,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      })
    }
    
    try {
      // Test Review Schema
      const reviewsSchema = generateReviewsSchema(tool)
      const aggregateRating = generateAggregateRating(reviewsSchema, tool)
      results.push({
        type: 'Reviews & Rating',
        valid: reviewsSchema.length > 0 && validateAggregateRating(aggregateRating),
        errors: []
      })
    } catch (error) {
      results.push({
        type: 'Reviews & Rating',
        valid: false,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      })
    }
    
    try {
      // Test FAQ Schema
      const faqSchema = generateFAQSchema(tool)
      results.push({
        type: 'FAQ',
        valid: validateFAQSchema(faqSchema),
        errors: []
      })
    } catch (error) {
      results.push({
        type: 'FAQ',
        valid: false,
        errors: [error instanceof Error ? error.message : 'Unknown error']
      })
    }
  }
  
  try {
    // Test WebPage Schema
    const webpageSchema = generateWebPageSchema('homepage')
    results.push({
      type: 'WebPage',
      valid: validateWebPageSchema(webpageSchema),
      errors: []
    })
  } catch (error) {
    results.push({
      type: 'WebPage',
      valid: false,
      errors: [error instanceof Error ? error.message : 'Unknown error']
    })
  }
  
  return results
}

// Individual schema validators
function validateOrganizationSchema(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'Organization' &&
    schema.name &&
    schema.url
  )
}

function validateWebsiteSchema(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'WebSite' &&
    schema.name &&
    schema.url
  )
}

function validateSoftwareSchema(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'SoftwareApplication' &&
    schema.name &&
    schema.description &&
    schema.url &&
    schema.applicationCategory
  )
}

function validateAggregateRating(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'AggregateRating' &&
    schema.ratingValue &&
    schema.ratingCount &&
    schema.itemReviewed &&
    schema.itemReviewed['@type'] &&
    schema.itemReviewed.name
  )
}

function validateFAQSchema(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'FAQPage' &&
    schema.mainEntity &&
    Array.isArray(schema.mainEntity) &&
    schema.mainEntity.length > 0
  )
}

function validateWebPageSchema(schema: any): boolean {
  return !!(
    schema['@context'] === 'https://schema.org' &&
    schema['@type'] === 'WebPage' &&
    schema.name &&
    schema.description &&
    schema.url
  )
}

// Development helper to log schema validation results
export function logSchemaValidation(tool?: Tool) {
  if (process.env.NODE_ENV === 'development') {
    const results = validateSchemas(tool)
    console.group('🔍 Schema Validation Results')
    
    results.forEach(result => {
      const emoji = result.valid ? '✅' : '❌'
      console.log(`${emoji} ${result.type}: ${result.valid ? 'Valid' : 'Invalid'}`)
      if (result.errors.length > 0) {
        console.log('   Errors:', result.errors)
      }
    })
    
    const validCount = results.filter(r => r.valid).length
    const totalCount = results.length
    console.log(`\n📊 Summary: ${validCount}/${totalCount} schemas valid`)
    console.groupEnd()
  }
}

// Rich Results testing URLs for Google validation
export function generateRichResultsTestUrls(baseUrl: string = 'https://toolspy.com') {
  return {
    homepage: `https://search.google.com/test/rich-results?url=${encodeURIComponent(baseUrl)}`,
    imageCompressor: `https://search.google.com/test/rich-results?url=${encodeURIComponent(baseUrl + '/image-compressor')}`,
    pdfTools: `https://search.google.com/test/rich-results?url=${encodeURIComponent(baseUrl + '/tools/pdf-tools')}`,
    about: `https://search.google.com/test/rich-results?url=${encodeURIComponent(baseUrl + '/about')}`
  }
}