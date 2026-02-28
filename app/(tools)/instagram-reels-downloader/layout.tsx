import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InstagramReelsDownloaderSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('instagram-reels-downloader')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function InstagramReelsDownloaderPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function InstagramReelsDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-reels-downloader">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<InstagramReelsDownloaderPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <InstagramReelsDownloaderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


