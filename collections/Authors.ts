import type { CollectionConfig } from 'payload'

/**
 * Public blog authors — E-E-A-T profile pages at /blog/author/<slug>/.
 * Separate from admin Users (login accounts).
 */
export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: {
    singular: 'Author',
    plural: 'Authors',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role', 'updatedAt'],
    listSearchableFields: ['name', 'slug', 'role', 'bio'],
    description: 'Public author profiles for blog posts (name, bio, photo).',
    components: {
      edit: {
        beforeDocumentControls: ['@/components/payload/ViewLiveButton#ViewLiveButton'],
      },
    },
    preview: ({ doc }) => {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')
      const data = doc as { slug?: unknown } | null | undefined
      const slug = typeof data?.slug === 'string' ? data.slug : null
      return slug ? `${base}/blog/author/${slug}/` : null
    },
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
        description: 'URL slug under /blog/author/<slug>/.',
      },
      validate: (value: unknown) => {
        if (value == null || value === '') return 'Slug is required'
        if (typeof value !== 'string') return 'Slug must be text'
        const slug = value.trim().toLowerCase()
        if (!slug) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
          return 'Use lowercase letters, numbers, and hyphens only (e.g. toolspy-editorial)'
        }
        if (slug.length > 80) return 'Slug is too long (max 80 characters)'
        return true
      },
      hooks: {
        beforeChange: [
          ({ value }) => (typeof value === 'string' ? value.trim().toLowerCase() : value),
        ],
      },
    },
    { name: 'name', type: 'text', required: true },
    {
      name: 'role',
      type: 'text',
      admin: { description: 'e.g. Editor, Reviewer, GST Specialist' },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: { description: 'Short author bio shown on profile + byline.' },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Square profile photo (optional).' },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          const { ROUTABLE_LOCALES, DEFAULT_LOCALE } = await import('../lib/i18n/locales')
          revalidateTag('authors')
          revalidateTag('posts')
          revalidatePath('/blog/')
          revalidatePath('/blog/author/')
          if (doc?.slug) revalidatePath(`/blog/author/${doc.slug}/`)
          for (const locale of ROUTABLE_LOCALES) {
            if (locale === DEFAULT_LOCALE) continue
            revalidatePath(`/${locale}/blog/`)
            revalidatePath(`/${locale}/blog/author/`)
            if (doc?.slug) revalidatePath(`/${locale}/blog/author/${doc.slug}/`)
          }
        } catch (err) {
          console.warn('[authors] revalidate failed:', err)
        }
        return doc
      },
    ],
  },
}
