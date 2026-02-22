import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { FileProtectorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('file-protector')

export default function FileProtectorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="file-protector">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <FileProtectorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}