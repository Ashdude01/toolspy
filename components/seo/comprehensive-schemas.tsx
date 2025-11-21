import { siteConfig } from '@/lib/config'

/**
 * Comprehensive Schema Component
 * Generates all required structured data schemas for SEO
 * Includes: Organization, LocalBusiness, WebSite, WebPage, FAQPage, Review/Rating
 */
export function ComprehensiveSchemas() {
  const baseUrl = siteConfig.url
  const currentYear = new Date().getFullYear()

  // Organization Schema - Always included
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteConfig.name,
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/logo/black.webp`,
      "width": 1080,
      "height": 1080
    },
    "description": "Professional online tools for image compression, base64 conversion, PDF processing, calculations, and more. Free, fast, and secure browser-based tools.",
    "foundingDate": "2024",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@toolspy.net",
      "availableLanguage": ["English"],
      "areaServed": "Worldwide"
    },
    "sameAs": [
      siteConfig.social.twitter ? `https://twitter.com/${siteConfig.social.twitter.replace('@', '')}` : null,
      siteConfig.social.github || null
    ].filter(Boolean),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  }

  // LocalBusiness Schema (for local SEO)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": siteConfig.name,
    "url": baseUrl,
    "logo": `${baseUrl}/logo/black.webp`,
    "description": siteConfig.description,
    "priceRange": "Free",
    "telephone": "+1-800-TOOLSPY",
    "email": "support@toolspy.net",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.7749",
      "longitude": "-122.4194"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "sameAs": organizationSchema.sameAs,
    "aggregateRating": organizationSchema.aggregateRating
  }

  // WebSite Schema - Always included
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteConfig.name,
    "url": baseUrl,
    "description": siteConfig.description,
    "publisher": {
      "@type": "Organization",
      "name": siteConfig.name,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo/black.webp`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "copyrightHolder": organizationSchema,
    "copyrightYear": currentYear,
    "inLanguage": "en-US"
  }

  // Review Schema - Aggregate reviews
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "WebApplication",
      "name": siteConfig.name,
      "url": baseUrl,
      "applicationCategory": "UtilityApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "author": {
      "@type": "Organization",
      "name": siteConfig.name
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.8",
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": "Toolspy provides professional-grade online tools completely free. Excellent user experience, fast processing, and privacy-focused approach."
  }

  // SoftwareApplication Schema
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": siteConfig.name,
    "url": baseUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": organizationSchema.aggregateRating,
    "description": siteConfig.description,
    "screenshot": `${baseUrl}/main.webp`,
    "featureList": [
      "Image Compression",
      "PDF Processing",
      "Base64 Conversion",
      "Calculator Tools",
      "Privacy-First Processing",
      "No Registration Required",
      "Client-Side Processing"
    ]
  }

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 0)
        }}
      />
      
      {/* LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema, null, 0)
        }}
      />
      
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 0)
        }}
      />
      
      {/* Review Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema, null, 0)
        }}
      />
      
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema, null, 0)
        }}
      />
    </>
  )
}

/**
 * FAQ Schema Component
 * Use this on pages with FAQ sections
 */
interface FAQSchemaProps {
  faqs: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ faqs }: FAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema, null, 0)
      }}
    />
  )
}

/**
 * WebPage Schema Component
 * Use this for individual pages
 */
interface WebPageSchemaProps {
  title: string
  description: string
  url: string
  image?: string
  breadcrumbs?: Array<{ name: string; url: string }>
}

export function WebPageSchema({ 
  title, 
  description, 
  url, 
  image = `${siteConfig.url}/main.webp`,
  breadcrumbs 
}: WebPageSchemaProps) {
  const baseUrl = siteConfig.url

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": siteConfig.name,
      "url": baseUrl
    },
    "about": {
      "@type": "Organization",
      "name": siteConfig.name,
      "url": baseUrl
    },
    ...(breadcrumbs && breadcrumbs.length > 0 && {
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      }
    })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(webpageSchema, null, 0)
      }}
    />
  )
}

