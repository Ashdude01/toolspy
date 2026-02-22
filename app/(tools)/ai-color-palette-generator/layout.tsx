import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { ColorPaletteGeneratorSEOContent } from './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('color-palette-generator')

export default function ColorPaletteGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="color-palette-generator">
      {children}
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ColorPaletteGeneratorSEOContent />
      </div>
    </DynamicToolLayout>
  )
}