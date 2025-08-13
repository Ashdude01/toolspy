import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('facebook-image-downloader')

export default function FacebookImageDownloaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="facebook-image-downloader">
      {children}
    </DynamicToolLayout>
  )
}


