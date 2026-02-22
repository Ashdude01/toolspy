import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { SSCCGLRankPredictorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('ssc-cgl-rank-predictor')

export default function SSCCGLRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ssc-cgl-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <SSCCGLRankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
