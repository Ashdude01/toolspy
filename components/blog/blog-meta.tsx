import Link from 'next/link'
import type { BlogAuthor, BlogPost } from '@/lib/blog-data'

export function formatBlogDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function AuthorByline({
  author,
  publishedAt,
  updatedAt,
  readingTimeMinutes,
}: {
  author?: BlogAuthor | null
  publishedAt: string
  updatedAt?: string
  readingTimeMinutes?: number
}) {
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
            <Link href={`/blog/author/${author.slug}/`} className="hover:text-primary transition-colors">
              {author.name}
            </Link>
            {author.role ? (
              <span className="text-muted-foreground font-normal"> · {author.role}</span>
            ) : null}
          </p>
        ) : (
          <p className="font-medium text-foreground">Toolspy Editorial Team</p>
        )}
        <p className="text-muted-foreground">
          Published {formatBlogDate(publishedAt)}
          {updatedAt && updatedAt !== publishedAt ? ` · Updated ${formatBlogDate(updatedAt)}` : ''}
          {typeof readingTimeMinutes === 'number' ? ` · ${readingTimeMinutes} min read` : ''}
        </p>
      </div>
    </div>
  )
}

export function EditorialBox({ post }: { post: BlogPost }) {
  if (!post.reviewedBy && !post.editorialNote) return null
  return (
    <aside className="rounded-lg border bg-muted/40 p-4 text-sm space-y-2">
      <p className="font-semibold text-foreground">Editorial review</p>
      {post.reviewedBy ? (
        <p className="text-muted-foreground">
          Reviewed by{' '}
          <Link
            href={`/blog/author/${post.reviewedBy.slug}/`}
            className="text-foreground underline underline-offset-4 hover:text-primary"
          >
            {post.reviewedBy.name}
          </Link>
          {post.reviewedAt ? ` on ${formatBlogDate(post.reviewedAt)}` : ''}.
        </p>
      ) : null}
      {post.editorialNote ? (
        <p className="text-muted-foreground leading-relaxed">{post.editorialNote}</p>
      ) : null}
    </aside>
  )
}
