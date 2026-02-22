import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InstagramReelsDownloaderSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('instagram-reels-downloader')

export default function InstagramReelsDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-reels-downloader">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <InstagramReelsDownloaderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


