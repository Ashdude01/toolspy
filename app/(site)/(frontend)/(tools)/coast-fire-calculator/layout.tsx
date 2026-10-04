import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CoastFireCalculatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('coast-fire-calculator')

/**
 * Force static generation so this route is pre-rendered at build time.
 * That way the full HTML (including SEO content) is in the initial document and view-source.
 */
export const dynamic = 'force-static'

function CoastFireCalculatorPageFallback() {
  return null
}

export default function CoastFireCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="coast-fire-calculator">
      <CmsToolHero slug="coast-fire-calculator" locale="en" />
      {/* Wrap page in Suspense so client-only hydration does not deopt the whole route. */}
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<CoastFireCalculatorPageFallback />}>
        {children}
      </Suspense>
      </div>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="coast-fire-calculator" locale="en" codeFallback={<CoastFireCalculatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
