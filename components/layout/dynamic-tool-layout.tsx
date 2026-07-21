import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ToolSchemas } from '../seo/schema-manager'
import { createFullUrl } from '@/lib/utils/metadata'
import { ALL_LOCALES, PUBLISHED_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { getToolContent } from '@/lib/payload/get-tool-content'

// Generate dynamic metadata for any tool
export function generateToolMetadata(toolSlug: string): Metadata {
  const tool = getToolBySlug(toolSlug)
  
  if (!tool) {
    return {
      title: limitTitle('Tool Not Found | Toolspy'),
      description: limitDescription('The requested tool could not be found.')
    }
  }

  return {
    title: limitTitle(tool.seo.metaTitle),
    description: limitDescription(tool.seo.metaDescription),
    keywords: tool.seo.keywords.join(', '),
    authors: [{ name: 'Tool Spy' }],
    creator: 'Toolspy',
    publisher: 'Tool Spy',
    openGraph: {
      title: limitTitle(tool.seo.ogTitle),
      description: limitDescription(tool.seo.ogDescription),
      url: tool.seo.canonicalUrl,
      siteName: 'Toolspy',
      images: [
        {
          url: tool.posterImage || tool.seo.ogImage,
          width: 1200,
          height: 630,
          alt: `${tool.seo.ogDescription}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: limitTitle(tool.seo.twitterTitle),
      description: limitDescription(tool.seo.twitterDescription),
      images: [tool.posterImage || tool.seo.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: tool.seo.canonicalUrl,
      // hreflang — sirf jab locales publish hon (dono taraf ka pairing zaroori hai)
      ...(PUBLISHED_LOCALES.length > 0
        ? {
            languages: {
              'x-default': tool.seo.canonicalUrl,
              en: tool.seo.canonicalUrl,
              ...Object.fromEntries(
                PUBLISHED_LOCALES.flatMap((code) => {
                  const info = ALL_LOCALES[code]
                  // tool.slug me kabhi leading slash hota hai kabhi nahi —
                  // normalize karke hamesha /de/<slug>/ banao
                  const cleanSlug = tool.slug.replace(/^\/+/, '')
                  return info
                    ? [[info.hreflang, `https://toolspy.net/${code}/${cleanSlug}/`]]
                    : []
                })
              ),
            },
          }
        : {}),
    },
  }
}

// Dynamic tool layout component with enhanced schema support.
// ASYNC (server component): CMS me customSchema hai to WAHI render hota hai,
// warna existing automatic ToolSchemas chalta hai. DB down/khali → automatic
// (getToolContent gracefully null return karta hai). English pages ke liye
// locale default 'en'; localized pages apna locale pass karte hain.
export async function DynamicToolLayout({
  toolSlug,
  children,
  locale = DEFAULT_LOCALE,
}: {
  toolSlug: string
  children: React.ReactNode
  locale?: string
  // (faqs/reviews props hataye — unused the; ToolSchemas tool-data se khud leta hai)
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return children
  }

  // CMS custom schema check (cached — koi extra runtime cost nahi)
  let customSchema: unknown = null
  try {
    const doc = await getToolContent(toolSlug, locale)
    if (doc?.customSchema && isNonEmptySchema(doc.customSchema)) {
      customSchema = doc.customSchema
    }
  } catch {
    // ignore — automatic schema fallback
  }

  return (
    <>
      {customSchema ? (
        // CMS ka custom JSON-LD — automatic band
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(customSchema) }}
        />
      ) : (
        // Default: automatic schema generation (jaisa abhi chal raha hai)
        <ToolSchemas tool={tool} includeReviews={true} includeFAQ={true} />
      )}
      {children}
    </>
  )
}

// customSchema tabhi valid maano jab wo non-empty object ya array ho
function isNonEmptySchema(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0
  if (v && typeof v === 'object') return Object.keys(v as object).length > 0
  return false
}

// Component is already exported above 