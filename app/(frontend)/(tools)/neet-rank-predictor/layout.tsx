import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { NEETRankPredictorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('neet-rank-predictor')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function NEETRankPredictorPageFallback() {
  return null
}

export default function NEETRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="neet-rank-predictor">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<NEETRankPredictorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="neet-rank-predictor" codeFallback={<NEETRankPredictorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
