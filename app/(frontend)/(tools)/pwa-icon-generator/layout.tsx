import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { PWAIconGeneratorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('pwa-icon-generator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function PWAIconGeneratorPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function PWAIconGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="pwa-icon-generator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<PWAIconGeneratorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <PWAIconGeneratorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
