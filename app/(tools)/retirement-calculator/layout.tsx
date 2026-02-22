import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { RetirementCalculatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('retirement-calculator')

export default function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="retirement-calculator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <RetirementCalculatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
