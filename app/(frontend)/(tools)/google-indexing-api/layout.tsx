import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { GoogleIndexingApiSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('google-indexing-api')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function GoogleIndexingApiPageFallback() {
  return null
}

export default function GoogleIndexingApiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="google-indexing-api">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<GoogleIndexingApiPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="google-indexing-api" codeFallback={<GoogleIndexingApiSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}