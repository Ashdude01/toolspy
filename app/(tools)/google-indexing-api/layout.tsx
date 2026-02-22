import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { GoogleIndexingApiSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('google-indexing-api')

export default function GoogleIndexingApiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="google-indexing-api">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <GoogleIndexingApiSEOContent />
      </div>
    </DynamicToolLayout>
  )
}