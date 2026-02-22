import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { GATERankPredictorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('gate-rank-predictor')

export default function GATERankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="gate-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <GATERankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
