import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { AIImageEnhancerSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

export const metadata: Metadata = generateToolMetadata('ai-image-enhancer')

/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function AiImageEnhancerPageFallback() {
  return null
}

export default function AiImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="ai-image-enhancer">
      <Suspense fallback={<AiImageEnhancerPageFallback />}>
        {children}
      </Suspense>
      <div className="container mx-auto max-w-7xl overflow-x-clip py-6 sm:py-8">
        <ToolContentSwitch slug="ai-image-enhancer" codeFallback={<AIImageEnhancerSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
