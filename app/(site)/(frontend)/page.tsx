import type { Metadata } from 'next'
import { HomePageView, buildHomepageMetadata } from '@/components/home2/home-page-view'

/** ISR. CMS publish still purges via the `homepage` cache tag. */
export const dynamic = 'force-static'
export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildHomepageMetadata('en')
}

export default async function HomePage() {
  return <HomePageView locale="en" />
}
