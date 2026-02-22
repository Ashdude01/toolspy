import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { TaxCalculatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('tax-calculator')

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="tax-calculator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <TaxCalculatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
