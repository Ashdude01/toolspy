import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { UPSCRankPredictorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export const metadata: Metadata = generateToolMetadata('upsc-rank-predictor')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function UPSCRankPredictorPageFallback() {
  return null
}

export default function UPSCRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="upsc-rank-predictor">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<UPSCRankPredictorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="upsc-rank-predictor" codeFallback={<UPSCRankPredictorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
