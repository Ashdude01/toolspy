import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogPost } from '@/lib/blog-data'
import type { TocItem } from '@/lib/blog/toc'
import { getFeaturedTools } from '@/lib/tools-data'
import { getT } from '@/lib/i18n/messages'
import { TableOfContents } from './table-of-contents'

interface BlogSidebarProps {
  toc: TocItem[]
  recentPosts: BlogPost[]
  locale?: string
}

export function BlogSidebar({ toc, recentPosts, locale = 'en' }: BlogSidebarProps) {
  const featuredTools = getFeaturedTools().slice(0, 5)
  const t = getT(locale)

  return (
    <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
      {toc.length > 0 ? (
        <div className="hidden lg:block pl-5">
          <TableOfContents items={toc} variant="desktop" />
        </div>
      ) : null}

      {recentPosts.length > 0 ? (
        <div className="rounded-xl p-5">
          <h3 className="mb-3.5 text-base font-semibold text-muted-foreground">
            {t('blog.recentArticles')}
          </h3>
          <ul className="space-y-4">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}/`} className="group flex gap-3">
                  {post.featuredImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.featuredImageUrl}
                      alt={post.featuredImageAlt || post.title}
                      width={64}
                      height={64}
                      className="h-14 w-14 shrink-0 rounded-lg border object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border bg-muted text-xs text-muted-foreground">
                      {post.category.slice(0, 3)}
                    </div>
                  )}
                  <span className="text-sm font-medium leading-snug text-foreground line-clamp-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {featuredTools.length > 0 ? (
        <div className="rounded-xl p-5">
          <h3 className="mb-3.5 text-base font-semibold text-muted-foreground">
            {t('blog.featuredTools')}
          </h3>
          <ul className="space-y-1">
            {featuredTools.map((tool) => (
              <li key={tool.id}>
                <Link
                  href={tool.path}
                  className="group flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-muted"
                >
                  <span className="flex items-center gap-2 font-medium text-foreground">
                    <span aria-hidden className="text-base">
                      {tool.icon}
                    </span>
                    {tool.name}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/tools/"
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            {t('blog.browseAllTools')}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}
    </aside>
  )
}
