import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

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
    </DynamicToolLayout>
  )
}
