import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { FacebookImageDownloaderSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('facebook-image-downloader')

export default function FacebookImageDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="facebook-image-downloader">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <FacebookImageDownloaderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


