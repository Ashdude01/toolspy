import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogAuthor } from '@/lib/blog-data'
import { getT } from '@/lib/i18n/messages'
import { localizeHref } from '@/lib/i18n/localize-href'

/** Author bio card shown near the end of an article (smallpdf-style). */
export function AuthorCard({
  author,
  locale = 'en',
}: {
  author?: BlogAuthor | null
  locale?: string
}) {
  if (!author) return null
  const t = getT(locale)
  const href = localizeHref(locale, `/blog/author/${author.slug}/`)
  const firstName = author.name.split(' ')[0]

  return (
    <section className="rounded-2xl border bg-muted/30 p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        {author.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={author.photoUrl}
            alt={author.name}
            width={80}
            height={80}
            className="h-20 w-20 shrink-0 rounded-full border object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border bg-muted text-2xl font-semibold text-muted-foreground">
            {author.name.slice(0, 1)}
          </div>
        )}

        <div className="min-w-0 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {t('blog.writtenBy')}
          </p>
          <h3 className="text-lg font-bold tracking-tight">
            <Link href={href} className="hover:text-primary transition-colors">
              {author.name}
            </Link>
          </h3>
          {author.role ? (
            <p className="text-sm text-muted-foreground">
              {author.role} {t('blog.atToolspy')}
            </p>
          ) : null}
          {author.bio ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
          ) : null}
          <Link
            href={href}
            className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary hover:underline"
          >
            {t('blog.viewAllArticlesBy', { name: firstName })}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
