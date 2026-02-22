import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { TemperatureConverterSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('temperature-converter')

export default function TemperatureConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="temperature-converter">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <TemperatureConverterSEOContent />
      </div>
    </DynamicToolLayout>
  )
}
