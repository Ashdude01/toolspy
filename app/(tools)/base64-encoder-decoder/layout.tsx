import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { Base64EncoderDecoderSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('base64-encoder-decoder')

export default function Base64EncoderDecoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="base64-encoder-decoder">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <Base64EncoderDecoderSEOContent />
      </div>
    </DynamicToolLayout>
  )
}