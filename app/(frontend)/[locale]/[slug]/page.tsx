import type { Metadata } from 'next'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { toolRegistry, localizedToolSlugs } from '@/lib/i18n/tool-registry'
import {
  ALL_LOCALES,
  DEFAULT_LOCALE,
  ROUTABLE_LOCALES,
  PUBLISHED_LOCALES,
  isPublishedLocale,
  isRoutableLocale,
} from '@/lib/i18n/locales'
import { siteConfig } from '@/lib/config'
import { getToolContent } from '@/lib/payload/get-tool-content'
import { ToolSeoContentTemplate } from '@/components/i18n/tool-seo-content-template'
import { DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { ToolCustomSchema } from '@/components/seo/tool-custom-schema'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

/**
 * Localized tool pages — /de/image-compressor/, /fr/gst-calculator/, ...
 *
 * HYBRID MODEL (Phase 2 — CMS wired):
 *   - Tool LOGIC: existing app/(tools)/<slug>/page.tsx (untouched)
 *   - CONTENT:
 *       contentSource 'cms'  → Payload ka localized content, coast-fire layout
 *                              template me (ToolSeoContentTemplate)
 *       contentSource 'code' → existing English layout + seo-content as-is
 *       CMS entry hi nahi / DB down → same code fallback (page kabhi nahi tootta)
 *
 * SSG + on-demand ISR: pages build par generate hote hain; Payload me content
 * save karte hi afterChange hook `tool-content:<slug>` tag revalidate karta hai.
 */

export const dynamicParams = false

type Params = Promise<{ locale: string; slug: string }>

export function generateStaticParams() {
  return ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE).flatMap((locale) =>
    localizedToolSlugs.map((slug) => ({ locale, slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { locale, slug } = await params
  const entry = toolRegistry[slug]
  const info = ALL_LOCALES[locale]
  if (!entry || !info) return {}

  // Base: existing English layout ki metadata
  const layoutMod = await entry.layout()
  const base: Metadata = layoutMod?.metadata ?? {}

  // CMS content (agar hai) — localized metaTitle/metaDescription override
  const doc = await getToolContent(slug, locale)
  const cmsActive = doc?.contentSource === 'cms'

  const published = isPublishedLocale(locale)
  const canonical = `${siteConfig.url}/${locale}/${slug}/`

  const languages: Record<string, string> = {
    'x-default': `${siteConfig.url}/${slug}/`,
    en: `${siteConfig.url}/${slug}/`,
  }
  for (const pub of PUBLISHED_LOCALES) {
    const pubInfo = ALL_LOCALES[pub]
    if (pubInfo) languages[pubInfo.hreflang] = `${siteConfig.url}/${pub}/${slug}/`
  }

  return {
    ...base,
    ...(cmsActive && doc?.metaTitle
      ? { title: limitTitle(doc.metaTitle) }
      : {}),
    ...(cmsActive && doc?.metaDescription
      ? { description: limitDescription(doc.metaDescription) }
      : {}),
    ...(cmsActive && doc?.keywords ? { keywords: doc.keywords } : {}),
    alternates: {
      canonical,
      ...(published ? { languages } : {}),
    },
    openGraph: base.openGraph
      ? {
          ...base.openGraph,
          url: canonical,
          locale: info.ogLocale,
          ...(cmsActive && doc?.metaTitle ? { title: limitTitle(doc.metaTitle) } : {}),
          ...(cmsActive && doc?.metaDescription
            ? { description: limitDescription(doc.metaDescription) }
            : {}),
        }
      : undefined,
    // SAFETY: jab tak locale PUBLISHED_LOCALES me nahi — noindex
    ...(published ? {} : { robots: { index: false, follow: true } }),
  }
}

function ToolPageFallback() {
  return (
    <div
      className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg"
      aria-hidden="true"
    />
  )
}

export default async function LocalizedToolPage({ params }: { params: Params }) {
  const { locale, slug } = await params

  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()

  const entry = toolRegistry[slug]
  if (!entry) notFound()

  const [layoutMod, pageMod, doc] = await Promise.all([
    entry.layout(),
    entry.page(),
    getToolContent(slug, locale),
  ])
  const ToolLayout = layoutMod.default
  const ToolPage = pageMod.default
  if (!ToolLayout || !ToolPage) notFound()

  const cmsActive = doc?.contentSource === 'cms' && (doc.sections?.length ?? 0) > 0

  if (cmsActive && doc) {
    // CMS MODE: tool logic + localized CMS content (coast-fire layout template)
    return (
      <DynamicToolLayout toolSlug={slug}>
        {/* CMS custom JSON-LD (server-only) */}
        <ToolCustomSchema slug={slug} locale={locale} />
        <Suspense fallback={<ToolPageFallback />}>
          <ToolPage />
        </Suspense>
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <ToolSeoContentTemplate slug={slug} doc={doc} />
        </div>
      </DynamicToolLayout>
    )
  }

  // CODE MODE (default / fallback): existing English layout + content as-is.
  // contentSource 'code' wale tools (e.g. facebook-image-downloader) hamesha
  // yahin se render honge — zero change guarantee.
  return (
    <ToolLayout>
      <ToolPage />
    </ToolLayout>
  )
}
