import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { AIResumeBuilderSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('ai-resume-builder')

export default function AiResumeBuilderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ai-resume-builder">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <AIResumeBuilderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}