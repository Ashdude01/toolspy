import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { FacebookEngagementCalculatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('facebook-engagement-calculator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function FacebookEngagementCalculatorPageFallback() {
  return null
}

export default function FacebookEngagementCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="facebook-engagement-calculator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<FacebookEngagementCalculatorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="facebook-engagement-calculator" codeFallback={<FacebookEngagementCalculatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
