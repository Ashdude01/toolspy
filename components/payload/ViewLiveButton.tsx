'use client'

import { useDocumentInfo } from '@payloadcms/ui'

/**
 * Edit screen pe "View live" button — published URL nayi tab me kholta hai.
 */
export function ViewLiveButton() {
  const { collectionSlug, savedDocumentData, id } = useDocumentInfo()

  if (!id || !savedDocumentData) return null

  const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')
  let href: string | null = null

  if (collectionSlug === 'posts') {
    const slug = typeof savedDocumentData.slug === 'string' ? savedDocumentData.slug : null
    if (slug) href = `${base}/blog/${slug}/`
  } else if (collectionSlug === 'pages') {
    const slug = typeof savedDocumentData.slug === 'string' ? savedDocumentData.slug : null
    if (!slug) href = null
    else if (slug === 'home' || slug === '/') href = `${base}/`
    else href = `${base}/${slug.replace(/^\/+/, '')}/`
  } else if (collectionSlug === 'tool-content') {
    const slug =
      typeof savedDocumentData.toolSlug === 'string' ? savedDocumentData.toolSlug : null
    if (slug) href = `${base}/${slug}/`
  }

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 12px',
        height: 32,
        borderRadius: 4,
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-50)',
        color: 'var(--theme-text)',
        textDecoration: 'none',
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: 'nowrap',
      }}
    >
      View live ↗
    </a>
  )
}
