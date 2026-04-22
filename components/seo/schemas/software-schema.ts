import { SoftwareApplicationSchema, Offer } from '../schema-types'
import { Tool, ToolCategory } from '@/lib/tools-data'
import { siteConfig } from '@/lib/config'
import { generateOrganizationSchema } from './organization-schema'
import { getToolRatingSummary } from '@/lib/tool-reviews'

export function generateSoftwareSchema(tool: Tool): SoftwareApplicationSchema {
  const organization = generateOrganizationSchema()
  
  const offer: Offer = {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  }
  
  const ratingSummary = getToolRatingSummary(tool)

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.seo.canonicalUrl,
    '@id': `${tool.seo.canonicalUrl}#softwareapp`,
    applicationCategory: getApplicationCategory(tool.category),
    operatingSystem: 'Web Browser',
    softwareVersion: '2.0',
    author: organization,
    offers: offer,
    ...(ratingSummary
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: ratingSummary.ratingValue.toString(),
            reviewCount: ratingSummary.reviewCount.toString(),
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
    featureList: tool.tags,
    screenshot: `${siteConfig.url}/images/tools/${tool.slug.replace('/', '')}-screenshot.webp`,
    softwareHelp: {
      '@type': 'CreativeWork',
      url: `${tool.seo.canonicalUrl}#help`,
      name: `${tool.name} Help Guide`
    },
    requirements: [
      'Modern web browser',
      'JavaScript enabled',
      'Internet connection'
    ],
    applicationSubCategory: getApplicationSubCategory(tool.category)
  }
}

function getApplicationCategory(category: ToolCategory): string {
  const categoryMap: Record<ToolCategory, string> = {
    'image-tools': 'MultimediaApplication',
    'pdf-tools': 'BusinessApplication',
    'base64-tools': 'DeveloperApplication',
    'calculators': 'UtilitiesApplication',
    'misc-tools': 'UtilitiesApplication',
    'json-tools': 'DeveloperApplication',
    'ai-tools': 'MultimediaApplication',
    'code-tools': 'DeveloperApplication',
    'conversion-tools': 'WebApplication',
    'gst-tools': 'BusinessApplication',
    'exam-tools': 'EducationalApplication'
  };
  
  return categoryMap[category] || 'UtilitiesApplication'
}

function getApplicationSubCategory(category: ToolCategory): string {
  const subCategoryMap: Record<ToolCategory, string> = {
    'image-tools': 'Image Processing',
    'pdf-tools': 'Document Processing',
    'base64-tools': 'Data Encoding',
    'calculators': 'Mathematical Tools',
    'misc-tools': 'General Utilities',
    'json-tools': 'Data Processing',
    'ai-tools': 'AI Tools',
    'code-tools': 'Code Processing',
    'conversion-tools': 'File Conversion',
    'gst-tools': 'Tax Calculation',
    'exam-tools': 'Educational Assessment'
  };
  
  return subCategoryMap[category] || 'Web Utilities'
}