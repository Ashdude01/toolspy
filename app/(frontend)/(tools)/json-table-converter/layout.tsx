import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { JSONTableConverterSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('json-table-converter')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function JsonTableConverterPageFallback() {
  return null
}

export default function JsonTableConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="json-table-converter">
      <CmsToolHero slug="json-table-converter" locale="en" />
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<JsonTableConverterPageFallback />}>

        {children}

      </Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="json-table-converter" locale="en" codeFallback={<JSONTableConverterSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}