import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { YouTubeThumbnailDownloaderSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('youtube-thumbnail-downloader')

export default function YouTubeThumbnailDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-thumbnail-downloader">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <YouTubeThumbnailDownloaderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


