import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { CodeBeautifierSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('code-beautifier')

export default function CodeBeautifierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="code-beautifier">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <CodeBeautifierSEOContent />
      </div>
    </DynamicToolLayout>
  )
}