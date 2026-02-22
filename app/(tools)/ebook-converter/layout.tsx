import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { EbookConverterSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('ebook-converter')

export default function EbookConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ebook-converter">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <EbookConverterSEOContent />
      </div>
    </DynamicToolLayout>
  )
}