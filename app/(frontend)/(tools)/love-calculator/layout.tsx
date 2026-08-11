import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { LoveCalculatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

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
      <Suspense fallback={<LoveCalculatorPageFallback />}>
        {children}
      </Suspense>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="love-calculator" codeFallback={<LoveCalculatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
