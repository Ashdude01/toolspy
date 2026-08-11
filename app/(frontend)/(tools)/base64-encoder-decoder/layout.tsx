import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { Base64EncoderDecoderSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('base64-encoder-decoder')

/**
 * Force static generation so this route is pre-rendered at build time.
 * That way the full HTML (including SEO content) is in the initial document and view-source.
 */
export const dynamic = 'force-static'

function Base64EncoderDecoderPageFallback() {
  return null
}

export default function Base64EncoderDecoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="base64-encoder-decoder">
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <Suspense fallback={<Base64EncoderDecoderPageFallback />}>

        {children}

      </Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="base64-encoder-decoder" codeFallback={<Base64EncoderDecoderSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}