import { siteConfig } from '@/lib/config'

/**
 * Site-wide Schema Component
 * Emits the two site-wide entities that belong on every page:
 *   - Organization
 *   - WebSite
 *
 * NOTE: LocalBusiness, self-authored Review and fabricated aggregateRating were
 * intentionally removed. Google's structured-data policy treats self-serving
 * reviews/ratings as a manual-action risk, and LocalBusiness misrepresents an
 * online-only tool. Tool-specific schema (WebPage, SoftwareApplication, FAQ)
 * is emitted per page by SchemaManager. Add Review/AggregateRating back ONLY
 * when real, user-visible reviews exist (see lib/tool-reviews.ts).
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
    }
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

  return (
    <>
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema, null, 0)
        }}
      />
      
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema, null, 0)
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
  image = `/logo/facebook_photo_downloader.png`,
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

