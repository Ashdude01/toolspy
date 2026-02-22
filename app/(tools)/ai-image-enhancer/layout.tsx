import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { AIImageEnhancerSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('ai-image-enhancer')

export default function AiImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ai-image-enhancer">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <AIImageEnhancerSEOContent />
      </div>
    </DynamicToolLayout>
  )
}