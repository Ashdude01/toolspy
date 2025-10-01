import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('upsc-rank-predictor')

export default function UPSCRankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="upsc-rank-predictor">
      {children}
    </DynamicToolLayout>
  )
}
