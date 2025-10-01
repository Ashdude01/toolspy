import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('bank-po-rank-predictor')

export default function BankPORankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="bank-po-rank-predictor">
      {children}
    </DynamicToolLayout>
  )
}
