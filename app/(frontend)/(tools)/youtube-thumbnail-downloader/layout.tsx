import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeThumbnailDownloaderSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

export const metadata: Metadata = generateToolMetadata('youtube-thumbnail-downloader')

/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function YouTubeThumbnailDownloaderPageFallback() {
  return null
}

export default function YouTubeThumbnailDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="youtube-thumbnail-downloader">
      <CmsToolHero slug="youtube-thumbnail-downloader" locale="en" />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<YouTubeThumbnailDownloaderPageFallback />}>
        {children}
      </Suspense>
      </div>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="youtube-thumbnail-downloader" locale="en" codeFallback={<YouTubeThumbnailDownloaderSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
