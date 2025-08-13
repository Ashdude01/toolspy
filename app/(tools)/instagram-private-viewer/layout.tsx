import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('instagram-private-viewer')

export default function InstagramPrivateViewerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="instagram-private-viewer">
      {children}
    </DynamicToolLayout>
  )
}


