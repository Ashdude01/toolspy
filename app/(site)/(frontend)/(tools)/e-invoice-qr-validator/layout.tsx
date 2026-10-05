import type { Metadata } from 'next'
import { Suspense } from 'react'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
import { EInvoiceQRValidatorSEOContent } from './seo-content'
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('e-invoice-qr-validator')
/** Force static generation so this route is pre-rendered at build time. */
export const dynamic = 'force-static'

function EInvoiceQRValidatorPageFallback() {
  return null
}

export default function EInvoiceQRValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="e-invoice-qr-validator">
      <CmsToolHero slug="e-invoice-qr-validator" locale="en" />
      {/* Wrap page in Suspense so useSearchParams in page.tsx does not deopt the whole route. */}

      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<EInvoiceQRValidatorPageFallback />}>

        {children}

      </Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="e-invoice-qr-validator" locale="en" codeFallback={<EInvoiceQRValidatorSEOContent />} />
      </div>
    </DynamicToolLayout>
  )
}
