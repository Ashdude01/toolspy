import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { SplitPdfSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('split-pdf')

export default function SplitPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="split-pdf">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <SplitPdfSEOContent />
      </div>
    </DynamicToolLayout>
  )
}