import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { FacebookImageDownloaderSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('facebook-image-downloader')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function FacebookImageDownloaderPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function FacebookImageDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="facebook-image-downloader">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<FacebookImageDownloaderPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <FacebookImageDownloaderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


