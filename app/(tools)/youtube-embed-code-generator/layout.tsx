import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('youtube-embed-code-generator')

export default function YouTubeEmbedCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-embed-code-generator">
      {children}
    </DynamicToolLayout>
  )
}


