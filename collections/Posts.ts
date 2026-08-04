import type { CollectionConfig } from 'payload'

/**
 * Blog posts — structured fields match lib/blog-data.ts so CMS can own published content.
 * Frontend hybrid: CMS published doc milta hai to wahi, warna code fallback.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'publishedAt', 'updatedAt'],
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
    { name: 'excerpt', type: 'textarea', localized: true, admin: { description: 'Short description / meta' } },
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
      name: 'sections',
      type: 'array',
      localized: true,
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text' },
        {
          name: 'paragraphs',
          type: 'textarea',
          admin: { description: 'Separate paragraphs with a blank line' },
        },
        {
          name: 'listItems',
          type: 'textarea',
          admin: { description: 'One list item per line' },
        },
        {
          name: 'tableJson',
          type: 'textarea',
          admin: {
            description:
              'Optional table as JSON: {"caption":"...","headers":["A"],"rows":[["1"]]}',
          },
        },
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
    { name: 'content', type: 'richText', localized: true, admin: { description: 'Optional freeform rich text (extra)' } },
    { name: 'metaTitle', type: 'text', localized: true },
    { name: 'metaDescription', type: 'textarea', localized: true },
    { name: 'coverImageUrl', type: 'text', admin: { description: 'Cloudinary / CDN URL' } },
    { name: 'publishedAt', type: 'date', admin: { date: { pickerAppearance: 'dayAndTime' } } },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidatePath, revalidateTag } = await import('next/cache')
          revalidateTag('posts')
          revalidatePath('/blog/')
          if (doc?.slug) {
            revalidatePath(`/blog/${doc.slug}/`)
            revalidateTag(`post:${doc.slug}`)
          }
        } catch (err) {
          console.warn('[posts] revalidate failed:', err)
        }
        return doc
      },
    ],
  },
}
