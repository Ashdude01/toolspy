import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('ssc-cgl-rank-predictor')

export default function SSCCGLRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ssc-cgl-rank-predictor">
      {children}
    </DynamicToolLayout>
  )
}
