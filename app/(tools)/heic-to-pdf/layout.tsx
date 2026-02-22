import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { HeicToPdfSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('heic-to-pdf')

export default function HeicToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="heic-to-pdf">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <HeicToPdfSEOContent />
      </div>
    </DynamicToolLayout>
  )
}