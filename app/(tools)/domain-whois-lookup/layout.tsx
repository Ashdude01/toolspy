import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('domain-whois-lookup')

export default function DomainWhoisLookupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="domain-whois-lookup">
      {children}
    </DynamicToolLayout>
  )
}
