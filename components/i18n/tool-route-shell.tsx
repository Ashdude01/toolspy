/**
 * Shared tool page chrome: CMS hero + hide legacy page hero + SEO switch.
 * Used by English layouts (locale=en) and localized dispatcher (locale from URL).
 */
import { Suspense } from 'react'
import { DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export function ToolRouteShell({
  slug,
  locale = 'en',
  children,
  seoFallback,
}: {
  slug: string
  locale?: string
  children: React.ReactNode
  seoFallback: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug={slug}>
      <CmsToolHero slug={slug} locale={locale} />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
        <ToolContentSwitch slug={slug} locale={locale} codeFallback={seoFallback} />
      </div>
    </DynamicToolLayout>
  )
}
