import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { UPSCRankPredictorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('upsc-rank-predictor')

export default function UPSCRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="upsc-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <UPSCRankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
