import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
// Import FAQ loader to ensure FAQ registration happens at module load time (server-side)
// This is a server-side compatible file that registers FAQs before schema generation
import './faq-loader'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('website-screenshot')

export default function WebsiteScreenshotLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <DynamicToolLayout toolSlug="website-screenshot">
      {children}
    </DynamicToolLayout>
  )
}
