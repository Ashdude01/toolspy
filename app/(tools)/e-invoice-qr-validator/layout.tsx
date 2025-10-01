import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('e-invoice-qr-validator')

export default function EInvoiceQRValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="e-invoice-qr-validator">
      {children}
    </DynamicToolLayout>
  )
}
