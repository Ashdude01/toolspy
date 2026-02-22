import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { PdfToWordSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('pdf-to-word')

export default function PdfToWordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="pdf-to-word">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <PdfToWordSEOContent />
      </div>
    </DynamicToolLayout>
  )
}