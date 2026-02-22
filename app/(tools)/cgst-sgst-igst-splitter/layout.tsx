import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CGSTSGSTIGSTSplitterSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('cgst-sgst-igst-splitter')

export default function CGSTSGSTIGSTSplitterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="cgst-sgst-igst-splitter">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <CGSTSGSTIGSTSplitterSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
