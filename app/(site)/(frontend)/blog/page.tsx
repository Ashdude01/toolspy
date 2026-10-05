import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import { BlogIndexView } from '@/components/blog/blog-index-view'

export const metadata: Metadata = {
  title: 'Blog – Guides for Exams, GST & Online Tools | Toolspy',
  description:
    'Practical guides from Toolspy: exam rank & percentile analysis (JEE, CAT, SSC CGL), GST rules explained with tables, and how-to guides for image & PDF tools.',
  keywords: [
    'toolspy blog',
    'exam rank guides',
    'gst guides',
    'image compression guide',
    'pdf tools guide',
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog/`,
  },
  openGraph: {
    title: 'Blog – Guides for Exams, GST & Online Tools | Toolspy',
    description:
      'Practical guides: exam rank & percentile analysis, GST rules with tables, and image/PDF how-tos.',
    url: `${siteConfig.url}/blog/`,
    type: 'website',
  },
}

/** Pre-rendered at build time; CMS updates revalidate via posts afterChange. */
export const dynamic = 'force-static'
export const revalidate = 86400

export default function BlogIndexPage() {
  return <BlogIndexView locale="en" />
}
