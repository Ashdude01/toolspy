import { BlogToolsFooter } from '@/components/blog/blog-tools-footer'

/**
 * Wraps every /blog route. The "Explore all tools" module renders after the page
 * content and before the global site footer (defined in the root layout).
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BlogToolsFooter />
    </>
  )
}
