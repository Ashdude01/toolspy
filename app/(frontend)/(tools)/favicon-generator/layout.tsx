import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { FaviconGeneratorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('favicon-generator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function FaviconGeneratorPageFallback() {
  return null
}

export default function FaviconGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="favicon-generator">
      <CmsToolHero slug="favicon-generator" locale="en" />
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<FaviconGeneratorPageFallback />}>

        {children}

      </Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="favicon-generator" locale="en" codeFallback={<FaviconGeneratorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
