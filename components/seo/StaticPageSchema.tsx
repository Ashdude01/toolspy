import { siteConfig } from '@/lib/config'

interface StaticPageSchemaProps {
  pageType: 'homepage' | 'about' | 'contact' | 'careers' | 'help' | 'category'
  pageData?: {
    title?: string
    description?: string
    url?: string
    category?: string
    customTitle?: string
    customDescription?: string
  }
}

/**
 * Server-side rendered schema component for static pages
 * Generates comprehensive structured data for better SEO and Google detection
 */
export default function StaticPageSchema({ pageType, pageData }: StaticPageSchemaProps) {
  const baseUrl = siteConfig.url
  
  // Organization Schema - Always included
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": baseUrl,
    "logo": `${baseUrl}/logo/black.webp`,
    "description": "Professional online tools for image compression, base64 conversion, PDF processing, and calculations. Free, fast, and secure browser-based tools.",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@toolspy.net",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      siteConfig.social.twitter.replace('@', 'https://twitter.com/'),
      siteConfig.social.github
    ],
    "founder": {
      "@type": "Person",
      "name": "Toolspy Team",
      "url": baseUrl
    }
  }

  // WebSite Schema - Always included
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": baseUrl,
    "description": siteConfig.description,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": organizationSchema,
    "copyrightHolder": organizationSchema,
    "copyrightYear": new Date().getFullYear()
  }

  // Generate page-specific data
  const getPageData = () => {
    const defaultData = {
      title: siteConfig.title,
      description: siteConfig.description,
      url: baseUrl
    }

    switch (pageType) {
      case 'homepage':
        return {
          ...defaultData,
          title: siteConfig.title,
          description: siteConfig.description,
          url: baseUrl
        }
      
      case 'about':
        return {
          ...defaultData,
          title: `About ${siteConfig.name} - Professional Online Tools Platform`,
          description: `Learn about ${siteConfig.name} and our mission to provide free, professional-grade online tools. Discover our comprehensive toolkit for developers, designers, and businesses.`,
          url: `${baseUrl}/about`
        }
      
      case 'contact':
        return {
          ...defaultData,
          title: `Contact ${siteConfig.name} - Get Support and Share Feedback`,
          description: `Get in touch with the ${siteConfig.name} team. Report bugs, request features, or get help with our online tools. We're here to help!`,
          url: `${baseUrl}/contact`
        }
      
      case 'careers':
        return {
          ...defaultData,
          title: `Careers at ${siteConfig.name} - Join Our Team`,
          description: `Join the ${siteConfig.name} team and help us build the future of online tools. We're looking for passionate developers and designers.`,
          url: `${baseUrl}/careers`
        }
      
      case 'help':
        return {
          ...defaultData,
          title: `Help Center - ${siteConfig.name} Support and Documentation`,
          description: `Get help with ${siteConfig.name} online tools. Find answers to common questions, troubleshooting guides, and learn how to use our free utilities effectively.`,
          url: `${baseUrl}/help`
        }
      
      case 'category':
        const categoryName = pageData?.category ? 
          pageData.category.charAt(0).toUpperCase() + pageData.category.slice(1).replace('-', ' ') : 
          'Tools'
        return {
          ...defaultData,
          title: `${categoryName} - Professional Tools | ${siteConfig.name}`,
          description: `Professional ${categoryName.toLowerCase()} tools for free online use. Browse our comprehensive collection of ${categoryName.toLowerCase()} utilities.`,
          url: `${baseUrl}/tools/${pageData?.category || ''}`
        }
      
      default:
        return {
          ...defaultData,
          title: pageData?.customTitle || pageData?.title || siteConfig.title,
          description: pageData?.customDescription || pageData?.description || siteConfig.description,
          url: pageData?.url || baseUrl
        }
    }
  }

  const currentPageData = getPageData()

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": currentPageData.title,
    "description": currentPageData.description,
    "url": currentPageData.url,
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${baseUrl}/images/main.webp`,
      "width": 1200,
      "height": 630,
      "caption": `${currentPageData.title} - ${siteConfig.name}`
    },
    "breadcrumb": generateBreadcrumbs(pageType, pageData),
    "about": [
      {
        "@type": "Organization",
        "name": siteConfig.name,
        "url": baseUrl
      }
    ],
    "mentions": generateMentions(pageType)
  }

  // Service Schema for contact and help pages
  const serviceSchema = (pageType === 'contact' || pageType === 'help') ? {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${siteConfig.name} Support`,
    "description": `Professional support and assistance for ${siteConfig.name} online tools`,
    "provider": organizationSchema,
    "areaServed": "Worldwide",
    "serviceType": "Customer Support",
    "url": currentPageData.url,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 0)
        }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 0)
        }}
      />
      
      {/* WebPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webpageSchema, null, 0)
        }}
      />
      
      {/* Service Schema (for contact/help pages) */}
      {serviceSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema, null, 0)
          }}
        />
      )}
    </>
  )
}

// Helper function to generate breadcrumbs
function generateBreadcrumbs(pageType: string, pageData?: any) {
  const baseUrl = siteConfig.url
  const breadcrumbs = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": baseUrl
    }
  ]

  switch (pageType) {
    case 'about':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "About",
        "item": `${baseUrl}/about`
      })
      break
    
    case 'contact':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Contact",
        "item": `${baseUrl}/contact`
      })
      break
    
    case 'careers':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Careers",
        "item": `${baseUrl}/careers`
      })
      break
    
    case 'help':
      breadcrumbs.push({
        "@type": "ListItem",
        "position": 2,
        "name": "Help",
        "item": `${baseUrl}/help`
      })
      break
    
    case 'category':
      breadcrumbs.push(
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": `${baseUrl}/tools`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageData?.category ? 
            pageData.category.charAt(0).toUpperCase() + pageData.category.slice(1).replace('-', ' ') : 
            'Tools',
          "item": `${baseUrl}/tools/${pageData?.category || ''}`
        }
      )
      break
  }

  return {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs
  }
}

// Helper function to generate mentions based on page type
function generateMentions(pageType: string) {
  const baseUrl = siteConfig.url
  const mentions = []

  switch (pageType) {
    case 'homepage':
      mentions.push(
        {
          "@type": "Thing",
          "name": "Image Compression",
          "url": `${baseUrl}/tools/image-tools`
        },
        {
          "@type": "Thing",
          "name": "PDF Processing",
          "url": `${baseUrl}/tools/pdf-tools`
        },
        {
          "@type": "Thing",
          "name": "Base64 Conversion",
          "url": `${baseUrl}/tools/base64-tools`
        }
      )
      break
    
    case 'about':
      mentions.push(
        {
          "@type": "Thing",
          "name": "Online Tools Platform",
          "url": baseUrl
        },
        {
          "@type": "Thing",
          "name": "Professional Tools",
          "url": `${baseUrl}/tools`
        }
      )
      break
    
    case 'contact':
      mentions.push(
        {
          "@type": "Thing",
          "name": "Customer Support",
          "url": `${baseUrl}/contact`
        },
        {
          "@type": "Thing",
          "name": "Bug Reports",
          "url": `${baseUrl}/bug-report`
        }
      )
      break
    
    case 'help':
      mentions.push(
        {
          "@type": "Thing",
          "name": "Documentation",
          "url": `${baseUrl}/help`
        },
        {
          "@type": "Thing",
          "name": "Troubleshooting",
          "url": `${baseUrl}/help`
        }
      )
      break
  }

  return mentions
}
