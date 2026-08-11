import type { Metadata } from 'next'
import { getToolBySlug } from '@/lib/tools-data'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ToolSchemas } from '../seo/schema-manager'
import { ALL_LOCALES, PUBLISHED_LOCALES } from '@/lib/i18n/locales'

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

// Dynamic tool layout component with automatic schema support.
//
// IMPORTANT (client-safety): ye component 84 tool `page.tsx` files (jo "use client"
// hain) me `ToolPageWrapper` ke through render hota hai. Isliye ye SYNC + client-safe
// hona ZAROORI hai — yahan Payload/DB (getToolContent) import karte hi poora Payload
// node SDK client bundle me chala jata tha aur `Can't resolve 'fs'` (webpack
// "Cannot read properties of undefined (reading 'call')") se saara client JS toot
// jata tha (search dead, admin lexical skeleton).
//
// CMS ka custom JSON-LD ab SERVER-ONLY path se aata hai (ToolCustomSchema, jo sirf
// server layouts/pages me use hota hai) — yahan sirf automatic schema.
export function DynamicToolLayout({
  toolSlug,
  children,
}: {
  toolSlug: string
  children: React.ReactNode
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return <>{children}</>
  }

  return (
    <>
      <ToolSchemas tool={tool} includeReviews={true} includeFAQ={true} />
      {children}
    </>
  )
}