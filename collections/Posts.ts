import type { CollectionConfig } from 'payload'

/**
 * Blog posts — CMS owns published content; frontend hybrid with lib/blog-data.ts fallback.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'author', 'publishedAt', 'updatedAt'],
    listSearchableFields: ['title', 'slug', 'excerpt'],
    components: {
      edit: {
        beforeDocumentControls: ['@/components/payload/ViewLiveButton#ViewLiveButton'],
      },
    },
    preview: ({ doc }) => {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')
      const data = doc as { slug?: unknown } | null | undefined
      const slug = typeof data?.slug === 'string' ? data.slug : null
      return slug ? `${base}/blog/${slug}/` : null
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
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'slug',
              type: 'text',
              required: true,
              unique: true,
              index: true,
              admin: {
                description: 'URL slug under /blog/<slug>/. Locked after create.',
              },
              access: {
                update: () => false,
              },
            },
            { name: 'title', type: 'text', required: true, localized: true },
            {
              name: 'excerpt',
              type: 'textarea',
              localized: true,
              admin: { description: 'Short description / meta excerpt' },
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              defaultValue: 'Tools & Guides',
              options: [
                { label: 'Exams', value: 'Exams' },
                { label: 'GST & Finance', value: 'GST & Finance' },
                { label: 'Tools & Guides', value: 'Tools & Guides' },
              ],
            },
            {
              name: 'readingTimeMinutes',
              type: 'number',
              min: 1,
              defaultValue: 5,
              admin: { description: 'Estimated reading time' },
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Main / featured image (listing + article header).',
              },
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
              admin: {
                description:
                  'Main article body. Use H1–H3, bold, italic, lists (bullets + numbered), links, tables, and images.',
              },
            },
            {
              name: 'keywords',
              type: 'text',
              localized: true,
              admin: { description: 'Comma-separated keywords' },
            },
            {
              name: 'relatedTool',
              type: 'group',
              fields: [
                { name: 'name', type: 'text' },
                { name: 'path', type: 'text', admin: { description: 'e.g. /ssc-cgl-rank-predictor/' } },
                { name: 'cta', type: 'textarea' },
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              localized: true,
              labels: { singular: 'FAQ', plural: 'FAQs' },
              fields: [
                { name: 'question', type: 'text', required: true },
                { name: 'answer', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'SEO & Social',
          fields: [
            { name: 'metaTitle', type: 'text', localized: true },
            { name: 'metaDescription', type: 'textarea', localized: true },
            {
              name: 'ogTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Open Graph title. Empty = post title.' },
            },
            {
              name: 'ogDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Open Graph description. Empty = excerpt.' },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'OG / Twitter / social sharing image (1200×630). Empty = featured image.',
              },
            },
            {
              name: 'twitterTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Twitter/X title. Empty = OG title.' },
            },
            {
              name: 'twitterDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Twitter/X description. Empty = OG description.' },
            },
          ],
        },
        {
          label: 'Author & editorial',
          fields: [
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
              admin: { description: 'Byline author (public profile).' },
            },
            {
              name: 'publishedAt',
              type: 'date',
              admin: { date: { pickerAppearance: 'dayAndTime' } },
            },
            {
              name: 'reviewedBy',
              type: 'relationship',
              relationTo: 'authors',
              admin: { description: 'Editorial / fact reviewer (optional).' },
            },
            {
              name: 'reviewedAt',
              type: 'date',
              admin: {
                date: { pickerAppearance: 'dayAndTime' },
                description: 'When editorial review was completed.',
              },
            },
            {
              name: 'editorialNote',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'Shown on the article (e.g. sources checked, indicative exam figures).',
              },
            },
          ],
        },
      ],
    },
    /**
     * Legacy fields — hidden from the admin editor (the "Legacy sections" tab was
     * removed) but kept in the schema/DB so the frontend fallback renderer still
     * works for any older post that has no rich-text Content. Do not re-expose.
     */
    {
      name: 'coverImageUrl',
      type: 'text',
      admin: { hidden: true },
    },
    {
      name: 'sections',
      type: 'array',
      localized: true,
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { hidden: true },
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'paragraphs', type: 'textarea' },
        { name: 'listItems', type: 'textarea' },
        { name: 'tableJson', type: 'textarea' },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          const { ROUTABLE_LOCALES, DEFAULT_LOCALE } = await import('../lib/i18n/locales')
          revalidateTag('posts')
          revalidateTag('authors')
          revalidatePath('/blog/')
          revalidatePath('/blog/author/')
          if (doc?.slug) {
            revalidatePath(`/blog/${doc.slug}/`)
            revalidateTag(`post:${doc.slug}`)
          }
          for (const locale of ROUTABLE_LOCALES) {
            if (locale === DEFAULT_LOCALE) continue
            revalidatePath(`/${locale}/blog/`)
            revalidatePath(`/${locale}/blog/author/`)
            if (doc?.slug) revalidatePath(`/${locale}/blog/${doc.slug}/`)
          }
        } catch (err) {
          console.warn('[posts] revalidate failed:', err)
        }
        return doc
      },
    ],
  },
}
