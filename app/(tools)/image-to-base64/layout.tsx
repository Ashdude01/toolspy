import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { ImageToBase64SEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('image-to-base64')

export default function ImageToBase64Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="image-to-base64">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ImageToBase64SEOContent />
      </div>
    </DynamicToolLayout>
  )
}
