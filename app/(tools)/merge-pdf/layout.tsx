import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { MergePdfSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('merge-pdf')

export default function MergePdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="merge-pdf">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <MergePdfSEOContent />
      </div>
    </DynamicToolLayout>
  )
}