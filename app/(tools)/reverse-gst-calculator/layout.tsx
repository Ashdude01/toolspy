import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

// Generate metadata dynamically for this tool
export const metadata: Metadata = generateToolMetadata('reverse-gst-calculator')

export default function ReverseGSTCalculatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="reverse-gst-calculator">
      {children}
    </DynamicToolLayout>
  )
}
