import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { GSTCalculatorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('gst-calculator')

export default function GSTCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="gst-calculator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <GSTCalculatorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
