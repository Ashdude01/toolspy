import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('instagram-reels-downloader')

export default function InstagramReelsDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-reels-downloader">
      {children}
    </DynamicToolLayout>
  )
}


