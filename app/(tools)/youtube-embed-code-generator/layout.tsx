import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeEmbedCodeGeneratorSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('youtube-embed-code-generator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function YouTubeEmbedCodeGeneratorPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function YouTubeEmbedCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-embed-code-generator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<YouTubeEmbedCodeGeneratorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <YouTubeEmbedCodeGeneratorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


