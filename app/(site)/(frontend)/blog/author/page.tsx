import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import { BlogAuthorsIndexView } from '@/components/blog/blog-authors-index-view'

export const metadata: Metadata = {
  title: 'Authors | Toolspy Blog',
  description:
    'Meet the Toolspy editorial team behind exam, GST, and online-tool guides. Read author bios and their published articles.',
  alternates: { canonical: `${siteConfig.url}/blog/author/` },
  openGraph: {
    title: 'Authors | Toolspy Blog',
    description: 'Toolspy editorial team, reviewers, and their published guides.',
    url: `${siteConfig.url}/blog/author/`,
    type: 'website',
  },
}

export const dynamic = 'force-static'
export const revalidate = 86400

export default async function BlogAuthorsIndexPage() {
  return <BlogAuthorsIndexView locale="en" />
}
