import type { Metadata } from 'next'
import { HomePageView, buildHomepageMetadata } from '@/components/home2/home-page-view'

export async function generateMetadata(): Promise<Metadata> {
  return buildHomepageMetadata('en')
}

export default async function HomePage() {
  return <HomePageView locale="en" />
}
