import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InstagramReelsDownloaderSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export const metadata: Metadata = generateToolMetadata('instagram-reels-downloader')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function InstagramReelsDownloaderPageFallback() {
  return null
}

export default function InstagramReelsDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-reels-downloader">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<InstagramReelsDownloaderPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="instagram-reels-downloader" codeFallback={<InstagramReelsDownloaderSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}


