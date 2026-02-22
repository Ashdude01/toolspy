import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { MarkdownToDocsConverterSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('markdown-to-docs-converter')

export default function MarkdownToDocsConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="markdown-to-docs-converter">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <MarkdownToDocsConverterSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
