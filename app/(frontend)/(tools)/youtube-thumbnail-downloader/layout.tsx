import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeThumbnailDownloaderSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export const metadata: Metadata = generateToolMetadata('youtube-thumbnail-downloader')

/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function YouTubeThumbnailDownloaderPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function YouTubeThumbnailDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="youtube-thumbnail-downloader">
      <Suspense fallback={<YouTubeThumbnailDownloaderPageFallback />}>
        {children}
      </Suspense>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="youtube-thumbnail-downloader" codeFallback={<YouTubeThumbnailDownloaderSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
