import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { JFIFToJPGSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('jfif-to-jpg')

export default function JfifToJpgLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="jfif-to-jpg">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <JFIFToJPGSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
