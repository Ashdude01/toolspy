import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { PdfPasswordRemoverSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('pdf-password-remover')

export default function PdfPasswordRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="pdf-password-remover">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <PdfPasswordRemoverSEOContent />
      </div>
    </DynamicToolLayout>
  )
}