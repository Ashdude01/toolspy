import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { JEEAdvancedRankPredictorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('jee-advanced-rank-predictor')

export default function JEEAdvancedRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="jee-advanced-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <JEEAdvancedRankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
