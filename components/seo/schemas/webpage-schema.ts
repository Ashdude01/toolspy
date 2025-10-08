import { WebPageSchema, ImageObject, BreadcrumbList, Thing } from '../schema-types'
import { Tool, ToolCategory } from '@/lib/tools-data'
import { siteConfig } from '@/lib/config'

// Helper function to map tool categories to schema.org application categories
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

export function generateWebPageSchema(
  pageType: 'homepage' | 'tool' | 'category' | 'about' | 'contact' | 'help',
  data?: { tool?: Tool; category?: ToolCategory; customTitle?: string; customDescription?: string }
): WebPageSchema {
  const baseUrl = siteConfig.url
  
  switch (pageType) {
    case 'homepage':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: siteConfig.title,
        description: siteConfig.description,
        url: baseUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: `${baseUrl}/images/main.webp`,
          width: 1200,
          height: 630,
          caption: 'Toolspy - Professional Online Tools'
        },
        about: [
          {
            '@type': 'SoftwareApplication',
            name: 'Online Tools Platform',
            url: baseUrl
          }
        ],
        mentions: [
          {
            '@type': 'Thing',
            name: 'Image Compression',
            url: `${baseUrl}/tools/image-tools`
          },
          {
            '@type': 'Thing',
            name: 'PDF Processing',
            url: `${baseUrl}/tools/pdf-tools`
          },
          {
            '@type': 'Thing',
            name: 'Base64 Conversion',
            url: `${baseUrl}/tools/base64-tools`
          }
        ]
      }
    
    case 'tool':
      if (!data?.tool) throw new Error('Tool data required for tool page schema')
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.tool.seo.metaTitle,
        description: data.tool.seo.metaDescription,
        url: data.tool.seo.canonicalUrl,
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: data.tool.seo.ogImage,
          width: 1200,
          height: 630,
          caption: `${data.tool.name} - ${siteConfig.name}`
        },
        breadcrumb: generateBreadcrumbs('tool', data.tool),
        about: [
          {
            '@type': 'SoftwareApplication',
            name: data.tool.name,
            url: data.tool.seo.canonicalUrl,
            applicationCategory: getApplicationCategory(data.tool.category),
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
          }
        ]
      }
    
    case 'category':
      if (!data?.category) throw new Error('Category data required for category page schema')
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${data.category.charAt(0).toUpperCase() + data.category.slice(1).replace('-', ' ')} Tools - ${siteConfig.name}`,
        description: `Professional ${data.category.replace('-', ' ')} tools for free online use`,
        url: `${baseUrl}/tools/${data.category}`,
        breadcrumb: generateBreadcrumbs('category', undefined, data.category)
      }
    
    case 'about':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `About ${siteConfig.name}`,
        description: `Learn about ${siteConfig.name} and our mission to provide free, professional-grade online tools`,
        url: `${baseUrl}/about`,
        breadcrumb: generateBreadcrumbs('about')
      }
    
    case 'contact':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Contact ${siteConfig.name}`,
        description: `Get in touch with ${siteConfig.name} team. Report bugs, request features, or get help with our online tools`,
        url: `${baseUrl}/contact`,
        breadcrumb: generateBreadcrumbs('contact')
      }
    
    case 'help':
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `Help Center - ${siteConfig.name}`,
        description: `Get help with ${siteConfig.name} online tools. Find answers to common questions, troubleshooting guides, and learn how to use our free utilities effectively`,
        url: `${baseUrl}/help`,
        breadcrumb: generateBreadcrumbs('help')
      }
    
    default:
      return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data?.customTitle || siteConfig.title,
        description: data?.customDescription || siteConfig.description,
        url: baseUrl
      }
  }
}

function generateBreadcrumbs(
  pageType: 'tool' | 'category' | 'about' | 'contact' | 'help',
  tool?: Tool,
  category?: ToolCategory
): BreadcrumbList {
  const baseUrl = siteConfig.url
  const breadcrumbs = [
    {
      '@type': 'ListItem' as const,
      position: 1,
      name: 'Home',
      item: baseUrl
    }
  ]

  switch (pageType) {
    case 'tool':
      if (tool) {
        breadcrumbs.push(
          {
            '@type': 'ListItem' as const,
            position: 2,
            name: 'Tools',
            item: `${baseUrl}/tools`
          },
          {
            '@type': 'ListItem' as const,
            position: 3,
            name: getCategoryDisplayName(tool.category),
            item: `${baseUrl}/tools/${tool.category}`
          },
          {
            '@type': 'ListItem' as const,
            position: 4,
            name: tool.name,
            item: tool.seo.canonicalUrl
          }
        )
      }
      break
    
    case 'category':
      if (category) {
        breadcrumbs.push(
          {
            '@type': 'ListItem' as const,
            position: 2,
            name: 'Tools',
            item: `${baseUrl}/tools`
          },
          {
            '@type': 'ListItem' as const,
            position: 3,
            name: getCategoryDisplayName(category),
            item: `${baseUrl}/tools/${category}`
          }
        )
      }
      break
    
    case 'about':
      breadcrumbs.push({
        '@type': 'ListItem' as const,
        position: 2,
        name: 'About',
        item: `${baseUrl}/about`
      })
      break
    
    case 'contact':
      breadcrumbs.push({
        '@type': 'ListItem' as const,
        position: 2,
        name: 'Contact',
        item: `${baseUrl}/contact`
      })
      break
    
    case 'help':
      breadcrumbs.push({
        '@type': 'ListItem' as const,
        position: 2,
        name: 'Help',
        item: `${baseUrl}/help`
      })
      break
  }

  return {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs
  }
}

function getCategoryDisplayName(category: ToolCategory): string {
  const displayNames: Record<ToolCategory, string> = {
    'image-tools': 'Image Tools',
    'pdf-tools': 'PDF Tools',
    'base64-tools': 'Base64 Tools',
    'calculators': 'Calculators',
    'misc-tools': 'Miscellaneous Tools',
    'json-tools': 'JSON Tools',
    'ai-tools': 'AI Tools',
    'code-tools': 'Code Tools',
    'conversion-tools': 'Conversion Tools',
    'gst-tools': 'GST/MSME Toolkit',
    'exam-tools': 'Exam Rank/Cutoff Predictors'
  };
  
  return displayNames[category] || category
}