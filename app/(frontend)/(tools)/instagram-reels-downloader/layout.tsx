import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InstagramReelsDownloaderSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

export const metadata: Metadata = generateToolMetadata('instagram-reels-downloader')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function InstagramReelsDownloaderPageFallback() {
  return null
}

export default function InstagramReelsDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="instagram-reels-downloader">
      <CmsToolHero slug="instagram-reels-downloader" locale="en" />
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<InstagramReelsDownloaderPageFallback />}>

        {children}

      </Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="instagram-reels-downloader" locale="en" codeFallback={<InstagramReelsDownloaderSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}


