import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { PdfToImageSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('pdf-to-image')

export default function PdfToImageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="pdf-to-image">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <PdfToImageSEOContent />
      </div>
    </DynamicToolLayout>
  )
}