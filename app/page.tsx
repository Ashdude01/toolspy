import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section'
import { ToolsSection } from '@/components/tools/tools-section'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: `${siteConfig.description}. Professional online tools for image compression, base64 conversion, and more. Free, fast, and secure.`,
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ToolsSection />
    </>
  )
} 