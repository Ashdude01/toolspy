import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CATPercentilePredictorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('cat-percentile-predictor')

export default function CATPercentilePredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="cat-percentile-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <CATPercentilePredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
