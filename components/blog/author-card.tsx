import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BlogAuthor } from '@/lib/blog-data'

/** Author bio card shown near the end of an article (smallpdf-style). */
export function AuthorCard({ author }: { author?: BlogAuthor | null }) {
  if (!author) return null

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
            Written by
          </p>
          <h3 className="text-lg font-bold tracking-tight">
            <Link
              href={`/blog/author/${author.slug}/`}
              className="hover:text-primary transition-colors"
            >
              {author.name}
            </Link>
          </h3>
          {author.role ? (
            <p className="text-sm text-muted-foreground">{author.role} at Toolspy</p>
          ) : null}
          {author.bio ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{author.bio}</p>
          ) : null}
          <Link
            href={`/blog/author/${author.slug}/`}
            className="inline-flex items-center gap-1 pt-1 text-sm font-medium text-primary hover:underline"
          >
            View all articles by {author.name.split(' ')[0]}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
