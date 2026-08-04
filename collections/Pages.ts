import type { CollectionConfig } from 'payload'

/**
 * Static pages (about, contact, privacy, etc.) — har language me.
 * Frontend wiring Phase 3 me hogi (abhi existing hardcoded pages hi chalte rahenge).
 */
export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    listSearchableFields: ['title', 'slug'],
    components: {
      edit: {
        beforeDocumentControls: ['@/components/payload/ViewLiveButton#ViewLiveButton'],
      },
    },
    preview: ({ doc }) => {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')
      const data = doc as { slug?: unknown } | null | undefined
      const slug = typeof data?.slug === 'string' ? data.slug : null
      if (!slug) return null
      if (slug === 'home' || slug === '/') return `${base}/`
      return `${base}/${slug.replace(/^\/+/, '')}/`
    },
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL slug. Locked after create (cannot change on edit).',
      },
      access: {
        update: () => false,
      },
    },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'content', type: 'richText', localized: true },
    { name: 'metaTitle', type: 'text', localized: true },
    { name: 'metaDescription', type: 'textarea', localized: true },
  ],
}
