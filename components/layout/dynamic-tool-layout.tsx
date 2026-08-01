import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getToolBySlug } from '@/lib/tools-data'
import { limitTitle, limitDescription } from '@/lib/utils/seo'
import { ToolSchemas } from '../seo/schema-manager'
import { ALL_LOCALES, PUBLISHED_LOCALES, DEFAULT_LOCALE } from '@/lib/i18n/locales'
import { getToolContent } from '@/lib/payload/get-tool-content'

// Generate dynamic metadata for any tool
export function generateToolMetadata(toolSlug: string): Metadata {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return {
      title: limitTitle('Tool Not Found | Toolspy'),
      description: limitDescription('The requested tool could not be found.'),
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
      ...(PUBLISHED_LOCALES.length > 0
        ? {
            languages: {
              'x-default': tool.seo.canonicalUrl,
              en: tool.seo.canonicalUrl,
              ...Object.fromEntries(
                PUBLISHED_LOCALES.flatMap((code) => {
                  const info = ALL_LOCALES[code]
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

/**
 * SYNC layout shell — CMS/Payload await yahan NAHI hota.
 * Pehle await karne se root layout (header/footer) stream ho jata tha aur
 * <main> seconds tak khali rehta tha (layout shift).
 *
 * children + SEO turant render; customSchema alag Suspense me (JSON-LD only).
 * Pages ISR/force-static rehte hain — ye SSR shift nahi hai.
 */
export function DynamicToolLayout({
  toolSlug,
  children,
  locale = DEFAULT_LOCALE,
}: {
  toolSlug: string
  children: React.ReactNode
  locale?: string
}) {
  const tool = getToolBySlug(toolSlug)

  if (!tool) {
    return children
  }

  return (
    <>
      <Suspense fallback={<ToolSchemas tool={tool} includeReviews={true} includeFAQ={true} />}>
        <CmsSchemaOrDefault tool={tool} toolSlug={toolSlug} locale={locale} />
      </Suspense>
      {children}
    </>
  )
}

async function CmsSchemaOrDefault({
  tool,
  toolSlug,
  locale,
}: {
  tool: NonNullable<ReturnType<typeof getToolBySlug>>
  toolSlug: string
  locale: string
}) {
  try {
    const doc = await getToolContent(toolSlug, locale)
    if (doc?.customSchema && isNonEmptySchema(doc.customSchema)) {
      return (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doc.customSchema) }}
        />
      )
    }
  } catch {
    // automatic schema fallback
  }
  return <ToolSchemas tool={tool} includeReviews={true} includeFAQ={true} />
}

function isNonEmptySchema(v: unknown): boolean {
  if (Array.isArray(v)) return v.length > 0
  if (v && typeof v === 'object') return Object.keys(v as object).length > 0
  return false
}
