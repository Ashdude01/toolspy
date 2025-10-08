
interface ToolPageSchemaProps {
  pageData: any;
  currentUrl: string;
}

/**
 * Enhanced Marketing Page Schema component that generates comprehensive structured data
 * for better Google detection and SEO performance
 */
export default function ToolPageSchema({ pageData, currentUrl }: ToolPageSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net';
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Toolspy",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Professional online tools for developers, designers, and businesses",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "url": `${baseUrl}/contact`
    },
    "sameAs": [
      "https://twitter.com/toolspy",
      "https://github.com/toolspy"
    ]
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolspy",
    "url": baseUrl,
    "description": "Professional online tools for developers, designers, and businesses",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // WebPage Schema
  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageData.title,
    "description": pageData.description,
    "url": currentUrl,
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": pageData.title,
      "description": pageData.description,
      "url": currentUrl,
      "applicationCategory": "WebApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": pageData.aggregateRating
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": baseUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tools",
          "item": `${baseUrl}/tools`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": pageData.title,
          "item": currentUrl
        }
      ]
    }
  };

  // SoftwareApplication Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageData.title,
    "description": pageData.description,
    "url": currentUrl,
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "author": {
      "@type": "Organization",
      "name": "Toolspy"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Toolspy",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/icon-192.png`
      }
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": pageData.aggregateRating,
    "image": pageData.image
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (pageData.faqs || []).map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Review Schema
  const reviewSchemas = (pageData.reviews || []).map((review: any) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": pageData.title,
      "url": currentUrl
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.text,
    "datePublished": new Date().toISOString().split('T')[0]
  }));

  // AggregateRating Schema
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": pageData.title,
      "url": currentUrl
    },
    "ratingValue": pageData.aggregateRating.rating,
    "reviewCount": pageData.aggregateRating.reviewCount,
    "bestRating": pageData.aggregateRating.bestRating,
    "worstRating": 1
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": pageData.title,
    "description": pageData.description,
    "provider": {
      "@type": "Organization",
      "name": "Toolspy",
      "url": baseUrl
    },
    "areaServed": "Worldwide",
    "serviceType": pageData.serviceType,
    "url": currentUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

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
      
      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema, null, 0)
        }}
      />
      
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema, null, 0)
        }}
      />
      
      {/* Review Schemas */}
      {(reviewSchemas || []).map((reviewSchema: any, index: number) => (
        <script
          key={`review-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(reviewSchema, null, 0)
          }}
        />
      ))}
      
      {/* AggregateRating Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aggregateRatingSchema, null, 0)
        }}
      />
      
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema, null, 0)
        }}
      />
    </>
  );
}
