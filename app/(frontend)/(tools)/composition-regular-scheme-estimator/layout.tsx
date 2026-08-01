import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CompositionRegularSchemeEstimatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('composition-regular-scheme-estimator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function CompositionRegularSchemeEstimatorPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function CompositionRegularSchemeEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="composition-regular-scheme-estimator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<CompositionRegularSchemeEstimatorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="composition-regular-scheme-estimator" codeFallback={<CompositionRegularSchemeEstimatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
