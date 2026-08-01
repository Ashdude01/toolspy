import {
  RichText as PayloadRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'

/**
 * Frontend rich-text renderer.
 * - Headings, lists, links, tables — default converters.
 * - upload (CMS images) — custom converter (needs populated media via depth >= 1).
 * - videoEmbed block — responsive iframe.
 */

// YouTube/Vimeo watch-URL ko embed-URL me convert karo
function toEmbedUrl(raw: string): string {
  if (!raw) return ''
  try {
    const u = new URL(raw)
    // youtube.com/watch?v=ID  →  youtube.com/embed/ID
    if (u.hostname.includes('youtube.com') && u.searchParams.get('v')) {
      return `https://www.youtube.com/embed/${u.searchParams.get('v')}`
    }
    // youtu.be/ID
    if (u.hostname.includes('youtu.be')) {
      return `https://www.youtube.com/embed${u.pathname}`
    }
    // vimeo.com/ID  →  player.vimeo.com/video/ID
    if (u.hostname.includes('vimeo.com') && !u.hostname.includes('player')) {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return `https://player.vimeo.com/video/${id}`
    }
    // already an embed URL ya koi aur provider — as-is
    return raw
  } catch {
    return raw
  }
}

type MediaDoc = {
  url?: string | null
  alt?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
  sizes?: {
    wide?: { url?: string | null }
    card?: { url?: string | null }
  }
  // UploadFeature fields live on the node, but caption can also be on the media doc
}

function resolveMediaUrl(doc: MediaDoc): string | null {
  return (
    doc.sizes?.wide?.url ||
    doc.sizes?.card?.url ||
    doc.url ||
    null
  )
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  // Override upload so CMS images always render when media is populated.
  // Plain <img> — avoids next/image custom-loader issues with /api/media/... URLs.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: ({ node }: any) => {
    const value = node?.value
    if (!value || typeof value !== 'object') return null

    const doc = value as MediaDoc
    const src = resolveMediaUrl(doc)
    if (!src) return null

    const alt = doc.alt || ''
    const caption =
      (typeof node?.fields?.caption === 'string' && node.fields.caption) ||
      doc.caption ||
      ''

    return (
      <figure className="my-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          width={doc.width ?? undefined}
          height={doc.height ?? undefined}
          loading="lazy"
          decoding="async"
          className="mx-auto h-auto max-w-full rounded-lg border border-border"
        />
        {caption ? (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        ) : null}
      </figure>
    )
  },
  blocks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    videoEmbed: ({ node }: any) => {
      const url: string = node?.fields?.url ?? ''
      const caption: string = node?.fields?.caption ?? ''
      const src = toEmbedUrl(url)
      if (!src) return null
      return (
        <figure className="my-6">
          <div
            className="relative w-full overflow-hidden rounded-lg border border-border"
            style={{ paddingTop: '56.25%' }}
          >
            <iframe
              src={src}
              title={caption || 'Video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function RenderRichText({ data }: { data: any }) {
  if (!data) return null
  return <PayloadRichText data={data} converters={converters} />
}
