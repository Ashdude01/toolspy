import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeEmbedCodeGeneratorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export const metadata: Metadata = generateToolMetadata('youtube-embed-code-generator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function YouTubeEmbedCodeGeneratorPageFallback() {
  return null
}

export default function YouTubeEmbedCodeGeneratorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-embed-code-generator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<YouTubeEmbedCodeGeneratorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="youtube-embed-code-generator" codeFallback={<YouTubeEmbedCodeGeneratorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}


