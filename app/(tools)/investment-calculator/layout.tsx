import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InvestmentCalculatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('investment-calculator')

export default function InvestmentCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="investment-calculator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <InvestmentCalculatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
