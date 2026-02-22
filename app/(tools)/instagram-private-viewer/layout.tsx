import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { InstagramPrivateViewerSEOContent } from './seo-content'

export const metadata: Metadata = generateToolMetadata('instagram-private-viewer')

export default function InstagramPrivateViewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-private-viewer">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <InstagramPrivateViewerSEOContent />
      </div>
    </DynamicToolLayout>
  )
}


