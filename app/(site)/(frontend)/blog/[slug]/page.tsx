import { Metadata } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { getPublishedBlogPosts } from '@/lib/payload/get-posts'
import { BlogPostView, buildBlogPostMetadata } from '@/components/blog/blog-post-view'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = new Set(blogPosts.map((post) => post.slug))
  try {
    const posts = await getPublishedBlogPosts()
    for (const post of posts) slugs.add(post.slug)
  } catch {
    // build without DB
  }
  return [...slugs].map((slug) => ({ slug }))
}

/** New CMS slugs after deploy must still resolve (old `false` caused 404). */
export const dynamicParams = true
export const revalidate = 86400

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  return buildBlogPostMetadata(slug, 'en')
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  return <BlogPostView slug={slug} locale="en" />
}
