import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { JEEMainRankPredictorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('jee-main-rank-predictor')

export default function JEEMainRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="jee-main-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <JEEMainRankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
