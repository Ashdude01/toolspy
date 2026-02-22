import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { OCRTextExtractorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('ocr-text-extractor')

export default function OcrTextExtractorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ocr-text-extractor">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <OCRTextExtractorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}