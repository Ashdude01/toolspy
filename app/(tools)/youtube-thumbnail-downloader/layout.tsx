import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('youtube-thumbnail-downloader')

export default function YouTubeThumbnailDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="youtube-thumbnail-downloader">
      {children}
    </DynamicToolLayout>
  )
}


