import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CompositionRegularSchemeEstimatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('composition-regular-scheme-estimator')

export default function CompositionRegularSchemeEstimatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="composition-regular-scheme-estimator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <CompositionRegularSchemeEstimatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
