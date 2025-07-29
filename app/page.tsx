import { Metadata } from 'next'
import { ToolsSection } from '@/components/tools/tools-section'
import { siteConfig } from '@/lib/config'
import { HomeSeoContent } from '@/components/sections/home-seo-content'

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.description}`,
  description: `${siteConfig.description}. Professional online tools for image compression, base64 conversion, and more. Free, fast, and secure.`,
}

export default function HomePage() {
  return (
    <>
      {/* <HeroSection /> */}
      <ToolsSection />
      <HomeSeoContent/>
    </>
  )
} 