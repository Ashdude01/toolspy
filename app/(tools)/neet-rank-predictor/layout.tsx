import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { NEETRankPredictorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('neet-rank-predictor')

export default function NEETRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="neet-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <NEETRankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
