import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CoastFireCalculatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('coast-fire-calculator')

/**
 * Force static generation so this route is pre-rendered at build time.
 * That way the full HTML (including SEO content) is in the initial document and view-source.
 */
export const dynamic = 'force-static'

function CoastFireCalculatorPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function CoastFireCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="coast-fire-calculator">
      {/* Wrap page in Suspense so client-only hydration does not deopt the whole route. */}
      <Suspense fallback={<CoastFireCalculatorPageFallback />}>
        {children}
      </Suspense>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <CoastFireCalculatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
