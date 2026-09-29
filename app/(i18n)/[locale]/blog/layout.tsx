import { BlogToolsFooter } from '@/components/blog/blog-tools-footer'

/** Same explore-tools footer as English /blog for localized blog routes. */
export default function LocalizedBlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BlogToolsFooter />
    </>
  )
}
