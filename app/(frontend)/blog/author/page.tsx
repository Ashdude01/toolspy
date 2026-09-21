import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import { getT } from '@/lib/i18n/messages'
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
export const revalidate = 3600

export default async function BlogAuthorsIndexPage() {
  return <BlogAuthorsIndexView locale="en" />
}

/** Shared metadata builder for localized wrappers. */
export function buildAuthorsIndexMetadata(locale: string): Metadata {
  const t = getT(locale)
  const base = locale === 'en' ? '' : `/${locale}`
  return {
    title: t('blog.authorsMetaTitle'),
    description: t('blog.authorsMetaDescription'),
    alternates: { canonical: `${siteConfig.url}${base}/blog/author/` },
  }
}
