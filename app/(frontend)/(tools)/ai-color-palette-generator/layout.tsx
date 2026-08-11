import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { ColorPaletteGeneratorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('color-palette-generator')

/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function ColorPaletteGeneratorPageFallback() {
  return null
}

export default function ColorPaletteGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="color-palette-generator">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<ColorPaletteGeneratorPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="color-palette-generator" codeFallback={<ColorPaletteGeneratorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}