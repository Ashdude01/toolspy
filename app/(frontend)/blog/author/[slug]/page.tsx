import { Metadata } from 'next'
import {
  BlogAuthorView,
  buildAuthorMetadata,
  generateAuthorStaticParams,
} from '@/components/blog/blog-author-view'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return generateAuthorStaticParams()
}

export const dynamicParams = true
export const revalidate = 3600

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params
  return buildAuthorMetadata(slug, 'en')
}

export default async function BlogAuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  return <BlogAuthorView slug={slug} locale="en" />
}
