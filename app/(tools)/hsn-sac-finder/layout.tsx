import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { HSNSACFinderSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('hsn-sac-finder')

export default function HSNSACFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="hsn-sac-finder">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <HSNSACFinderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
