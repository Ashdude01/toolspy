import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { getToolFAQData } from '@/components/seo/faq-types'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('image-compressor')

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const faqs = getToolFAQData('image-compressor')
  return (
    <DynamicToolLayout toolSlug="image-compressor" faqs={faqs}>
      {children}
    </DynamicToolLayout>
  )
}