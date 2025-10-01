import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('cat-percentile-predictor')

export default function CATPercentilePredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="cat-percentile-predictor">
      {children}
    </DynamicToolLayout>
  )
}
