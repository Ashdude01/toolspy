import { SoftwareApplicationSchema, AggregateRating, Offer } from '../schema-types'
import { Tool, ToolCategory } from '@/lib/tools-data'
import { siteConfig } from '@/lib/config'
import { generateOrganizationSchema } from './organization-schema'

export function generateSoftwareSchema(tool: Tool): SoftwareApplicationSchema {
  const organization = generateOrganizationSchema()
  
  const offer: Offer = {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock'
  }

  const aggregateRating: AggregateRating = {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2547',
    bestRating: '5',
    worstRating: '1'
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.seo.canonicalUrl,
    applicationCategory: getApplicationCategory(tool.category),
    operatingSystem: 'Web Browser',
    softwareVersion: '2.0',
    author: organization,
    offers: offer,
    aggregateRating: aggregateRating,
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
    'conversion-tools': 'WebApplication'
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
    'conversion-tools': 'File Conversion'
  };
  
  return subCategoryMap[category] || 'Web Utilities'
}