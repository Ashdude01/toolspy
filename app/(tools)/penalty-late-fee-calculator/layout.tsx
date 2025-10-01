import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('penalty-late-fee-calculator')

export default function PenaltyLateFeeCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="penalty-late-fee-calculator">
      {children}
    </DynamicToolLayout>
  )
}
