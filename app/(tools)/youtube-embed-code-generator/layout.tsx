import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeEmbedCodeGeneratorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('youtube-embed-code-generator')

export default function YouTubeEmbedCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-embed-code-generator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <YouTubeEmbedCodeGeneratorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


