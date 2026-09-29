import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { LoveCalculatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

export const metadata: Metadata = generateToolMetadata('love-calculator')

export const dynamic = 'force-static'

function LoveCalculatorPageFallback() {
  return null
}

export default function LoveCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="love-calculator">
      <CmsToolHero slug="love-calculator" locale="en" />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<LoveCalculatorPageFallback />}>
        {children}
      </Suspense>
      </div>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="love-calculator" locale="en" codeFallback={<LoveCalculatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
