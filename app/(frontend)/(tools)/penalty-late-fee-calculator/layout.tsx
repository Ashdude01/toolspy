import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { PenaltyLateFeeCalculatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('penalty-late-fee-calculator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function PenaltyLateFeeCalculatorPageFallback() {
  return null
}

export default function PenaltyLateFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="penalty-late-fee-calculator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<PenaltyLateFeeCalculatorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="penalty-late-fee-calculator" codeFallback={<PenaltyLateFeeCalculatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
