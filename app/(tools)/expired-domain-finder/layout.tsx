import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('expired-domain-finder')

export default function ExpiredDomainFinderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="expired-domain-finder">
      {children}
    </DynamicToolLayout>
  )
}
