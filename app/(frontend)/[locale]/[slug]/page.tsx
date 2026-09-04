import type { Metadata } from 'next'
import type { ComponentType } from 'react'
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
 * Localized single-segment pages — /de/image-compressor/, /de/about/, /de/tools/ ...
 *
 * DO cheezein handle karta hai (dispatcher):
 *   1. TOOLS (toolRegistry me) — hybrid CMS/code content (jaisa pehle tha, untouched).
 *   2. STATIC PAGES (about, contact, tools-listing, legal…) — existing English
 *      component render + NOINDEX. Ye pages abhi translate NAHI hote (SEO ROI ~0),
 *      bas locale switch par 404 nahi aata. Jab tak translation nahi → noindex,
 *      no hreflang (honest — Google ko duplicate/English content advertise nahi karte).
 *
 * Baaki sab → notFound() (site-layout 404).
 */

export const dynamicParams = false

type Params = Promise<{ locale: string; slug: string }>

/** Static pages jinke localized routes chahiye (English content + noindex). */
const STATIC_PAGES: Record<string, () => Promise<{ default: ComponentType }>> = {
  tools: () => import('@/app/(frontend)/tools/page'),
  about: () => import('@/app/(frontend)/about/page'),
  contact: () => import('@/app/(frontend)/contact/page'),
  careers: () => import('@/app/(frontend)/careers/page'),
  help: () => import('@/app/(frontend)/help/page'),
  feedback: () => import('@/app/(frontend)/feedback/page'),
  'bug-report': () => import('@/app/(frontend)/bug-report/page'),
  'digital-marketing': () => import('@/app/(frontend)/digital-marketing/page'),
  privacy: () => import('@/app/(frontend)/privacy/page'),
  terms: () => import('@/app/(frontend)/terms/page'),
  disclaimer: () => import('@/app/(frontend)/disclaimer/page'),
  dmca: () => import('@/app/(frontend)/dmca/page'),
  'cookie-policy': () => import('@/app/(frontend)/cookie-policy/page'),
  'gdpr-ccpa': () => import('@/app/(frontend)/gdpr-ccpa/page'),
}
const STATIC_PAGE_SLUGS = Object.keys(STATIC_PAGES)

const NICE_TITLES: Record<string, string> = {
  tools: 'All Tools',
  about: 'About Us',
  contact: 'Contact',
  careers: 'Careers',
  help: 'Help Center',
  feedback: 'Feedback',
  'bug-report': 'Report a Bug',
  'digital-marketing': 'Digital Marketing',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service',
  disclaimer: 'Disclaimer',
  dmca: 'DMCA',
  'cookie-policy': 'Cookie Policy',
  'gdpr-ccpa': 'GDPR & CCPA',
}

export function generateStaticParams() {
  const locales = ROUTABLE_LOCALES.filter((l) => l !== DEFAULT_LOCALE)
  return locales.flatMap((locale) => [
    ...localizedToolSlugs.map((slug) => ({ locale, slug })),
    ...STATIC_PAGE_SLUGS.map((slug) => ({ locale, slug })),
  ])
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params
  const info = ALL_LOCALES[locale]
  if (!info) return {}

  const entry = toolRegistry[slug]

  // ---- STATIC PAGE (untranslated) — noindex, self-canonical, no hreflang ----
  if (!entry && STATIC_PAGES[slug]) {
    return {
      title: `${NICE_TITLES[slug] ?? slug} | ${siteConfig.name}`,
      alternates: { canonical: `${siteConfig.url}/${locale}/${slug}/` },
      robots: { index: false, follow: true },
    }
  }

  if (!entry) return {}

  // ---- TOOL (hybrid CMS/code) ----
  const layoutMod = await entry.layout()
  const base: Metadata = layoutMod?.metadata ?? {}

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
    ...(cmsActive && doc?.metaTitle ? { title: limitTitle(doc.metaTitle) } : {}),
    ...(cmsActive && doc?.metaDescription ? { description: limitDescription(doc.metaDescription) } : {}),
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
          ...(cmsActive && doc?.metaDescription ? { description: limitDescription(doc.metaDescription) } : {}),
        }
      : undefined,
    // SAFETY: jab tak locale PUBLISHED_LOCALES me nahi — noindex
    ...(published ? {} : { robots: { index: false, follow: true } }),
  }
}

function PageFallback() {
  return (
    <div
      className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg"
      aria-hidden="true"
    />
  )
}

export default async function LocalizedPage({ params }: { params: Params }) {
  const { locale, slug } = await params

  if (locale === DEFAULT_LOCALE || !isRoutableLocale(locale)) notFound()

  const entry = toolRegistry[slug]

  // ---- STATIC PAGE: existing English component render (English + noindex) ----
  if (!entry) {
    const loader = STATIC_PAGES[slug]
    if (!loader) notFound()
    const Mod = await loader()
    const StaticPage = Mod.default
    if (!StaticPage) notFound()
    return (
      <Suspense fallback={<PageFallback />}>
        <StaticPage />
      </Suspense>
    )
  }

  // ---- TOOL (hybrid CMS/code) ----
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
    return (
      <DynamicToolLayout toolSlug={slug}>
        <ToolCustomSchema slug={slug} locale={locale} />
        <Suspense fallback={<PageFallback />}>
          <ToolPage />
        </Suspense>
        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <ToolSeoContentTemplate slug={slug} doc={doc} />
        </div>
      </DynamicToolLayout>
    )
  }

  return (
    <ToolLayout>
      <ToolPage />
    </ToolLayout>
  )
}
