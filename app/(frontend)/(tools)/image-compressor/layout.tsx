import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
// Import FAQ loader to ensure FAQ registration happens at module load time (server-side)
import './faq-loader'
import { ImageCompressorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('image-compressor')

/**
 * Force static generation so this route is pre-rendered at build time.
 * That way the full HTML (including SEO content) is in the initial document and view-source.
 */
export const dynamic = 'force-static'

function ImageCompressorPageFallback() {
  return (
    <div className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg" aria-hidden="true" />
  )
}

export default function ImageCompressorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="image-compressor">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route.
          Without this, production build sends only RSC/JS and SEO content is missing from view-source. */}
      <Suspense fallback={<ImageCompressorPageFallback />}>
        {children}
      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="image-compressor" codeFallback={<ImageCompressorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}