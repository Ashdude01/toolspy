import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { AIBackgroundRemoverSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('ai-background-remover')

export default function AiBackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ai-background-remover">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <AIBackgroundRemoverSEOContent />
      </div>
    </DynamicToolLayout>
  )
}