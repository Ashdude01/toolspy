import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { JSONFormatterSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('json-formatter')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function JsonFormatterPageFallback() {
  return null
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="json-formatter">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<JsonFormatterPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="json-formatter" codeFallback={<JSONFormatterSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}