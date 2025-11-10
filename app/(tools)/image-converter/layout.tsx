import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'
// Import seo-content to ensure FAQ registration happens at module load time
// The module-level registration code executes even though it's a client component
import './seo-content'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('image-converter')

export default function ImageConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="image-converter">
      {children}
    </DynamicToolLayout>
  )
}