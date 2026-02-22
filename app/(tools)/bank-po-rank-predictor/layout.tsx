import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { BankPORankPredictorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('bank-po-rank-predictor')

export default function BankPORankPredictorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="bank-po-rank-predictor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <BankPORankPredictorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
