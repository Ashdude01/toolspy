import Link from 'next/link'
import type { BlogAuthor, BlogPost } from '@/lib/blog-data'
import { getT } from '@/lib/i18n/messages'
import { localizeHref } from '@/lib/i18n/localize-href'

export function formatBlogDate(iso: string, locale = 'en') {
  const tag = locale === 'en' ? 'en-IN' : locale
  return new Date(iso).toLocaleDateString(tag, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
}

export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
  locale = 'en',
}: {
  author?: BlogAuthor | null
  publishedAt: string
  updatedAt?: string
  readingTimeMinutes?: number
  locale?: string
}) {
  const t = getT(locale)
  const authorHref = author
    ? localizeHref(locale, `/blog/author/${author.slug}/`)
    : undefined

  return (
    <div className="flex flex-wrap items-start gap-3 text-sm">
      {author?.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={author.photoUrl}
          alt={author.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border"
        />
      ) : (
        <div
          className="h-12 w-12 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold border"
          aria-hidden
        >
          {(author?.name || 'T').slice(0, 1)}
        </div>
      )}
      <div className="min-w-0 space-y-1">
        {author ? (
          <p className="font-medium text-foreground">
            <Link href={authorHref!} className="hover:text-primary transition-colors">
              {author.name}
            </Link>
          </p>
        ) : (
          <p className="font-medium text-foreground">{t('blog.teamToolspy')}</p>
        )}
        <p className="text-muted-foreground">
          🕒 {formatBlogDate(publishedAt, locale)}
          {updatedAt && updatedAt !== publishedAt
            ? ` ${t('blog.updatedOn', { date: formatBlogDate(updatedAt, locale) })}`
            : ''}
          {typeof readingTimeMinutes === 'number'
            ? ` · ${t('blog.minRead', { count: readingTimeMinutes })}`
            : ''}
        </p>
      </div>
    </div>
  )
}

export function EditorialBox({
  post,
  locale = 'en',
}: {
  post: BlogPost
  locale?: string
}) {
  const t = getT(locale)
  if (!post.reviewedBy && !post.editorialNote) return null
  return (
    <aside className="rounded-lg border bg-muted/40 p-4 text-sm space-y-2">
      <p className="font-semibold text-foreground">{t('blog.editorialReview')}</p>
      {post.reviewedBy ? (
        <p className="text-muted-foreground">
          {t('blog.reviewedByPrefix')}{' '}
          <Link
            href={localizeHref(locale, `/blog/author/${post.reviewedBy.slug}/`)}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {post.reviewedBy.name}
          </Link>
          {post.reviewedAt
            ? ` ${t('blog.onDate', { date: formatBlogDate(post.reviewedAt, locale) })}.`
            : '.'}
        </p>
      ) : null}
      {post.editorialNote ? (
        <p className="text-muted-foreground">{post.editorialNote}</p>
      ) : null}
    </aside>
  )
}
