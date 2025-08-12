"use client"
import { Metadata } from 'next'
import { useSearchParams } from 'next/navigation'
import { ToolsSection } from '@/components/tools/tools-section'
import { siteConfig } from '@/lib/config'
import { HomeSeoContent } from '@/components/sections/home-seo-content'
import { HomepageSchemas } from '@/components/seo/schema-manager'
import { limitTitle, limitDescription } from '@/lib/utils/seo'

export default function HomePage() {
  // client component wrapper to capture search params
  return <HomePageClient />
}

function HomePageClient() {
  const params = useSearchParams();
  const search = params?.get('search') || '';
  return (
    <>
      <HomepageSchemas />
      <ToolsSection searchQuery={search} />
      <HomeSeoContent/>
    </>
  )
}