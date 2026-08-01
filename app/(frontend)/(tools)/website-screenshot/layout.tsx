import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { WebsiteScreenshotSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
// Import FAQ loader to ensure FAQ registration happens at module load time (server-side)
// This is a server-side compatible file that registers FAQs before schema generation
import './faq-loader'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('website-screenshot')

/**
 * Force static generation so this route is pre-rendered at build time.
 * That way the full HTML (including SEO content) is in the initial document and view-source.
 */
export const dynamic = 'force-static'

function WebsiteScreenshotPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function WebsiteScreenshotLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <DynamicToolLayout toolSlug="website-screenshot">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<WebsiteScreenshotPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="website-screenshot" codeFallback={<WebsiteScreenshotSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
