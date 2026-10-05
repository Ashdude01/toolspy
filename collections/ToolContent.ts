import type { CollectionConfig } from 'payload'
import { toolSearchKey } from '../lib/i18n/tool-labels'

/**
 * tool-content — HYBRID MODEL ka CMS side.
 *
 * Code decide karta hai tool KYA karta hai (app/(tools)/<slug>/page.tsx),
 * ye collection decide karti hai tool ke page par KYA LIKHA hai. Join key = toolSlug.
 *
 * SAFETY: contentSource default 'code' hai — jab tak aap khud 'cms' na karo,
 * page par existing seo-content.tsx hi render hota hai, CMS entry ignore hoti hai.
 *
 * Preferred body: localized `content` richText (H2 → TOC). Legacy `sections[]`
 * still works when `content` is empty.
 */
export const ToolContent: CollectionConfig = {
  slug: 'tool-content',
  labels: {
    singular: 'Tool Content',
    plural: 'Tool Content',
  },
  admin: {
    useAsTitle: 'toolSlug',
    defaultColumns: ['toolSlug', 'contentSource', 'updatedAt'],
    description: 'SEO content for tool pages.',
    // toolSlug is text (searchable); searchKey adds name/tags
    listSearchableFields: ['searchKey', 'toolSlug'],
    components: {
      edit: {
        beforeDocumentControls: ['@/components/payload/ViewLiveButton#ViewLiveButton'],
      },
    },
    preview: ({ doc }) => {
      const base = (process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net').replace(/\/$/, '')
      const data = doc as { toolSlug?: unknown } | null | undefined
      const slug = typeof data?.toolSlug === 'string' ? data.toolSlug : null
      return slug ? `${base}/${slug}/` : null
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
      name: 'toolSlug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          'Tool URL slug (content join key). Editable when tool page paths change. Must be unique — duplicates are blocked.',
      },
      validate: (value: unknown) => {
        if (value == null || value === '') return 'Slug is required'
        if (typeof value !== 'string') return 'Slug must be text'
        const slug = value.trim().toLowerCase()
        if (!slug) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
          return 'Use lowercase letters, numbers, and hyphens only (e.g. image-compressor)'
        }
        if (slug.length > 120) return 'Slug is too long (max 120 characters)'
        return true
      },
      hooks: {
        beforeChange: [
          ({ value }) =>
            typeof value === 'string' ? value.trim().toLowerCase() : value,
        ],
      },
    },
    {
      name: 'searchKey',
      type: 'text',
      index: true,
      admin: {
        hidden: true,
        readOnly: true,
      },
    },
    {
      name: 'contentSource',
      type: 'select',
      required: true,
      defaultValue: 'code',
      options: [
        { label: 'Code — use file content', value: 'code' },
        { label: 'CMS — use this editor', value: 'cms' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'REQUIRED to go live: set to "CMS" and Publish. Publish alone is not enough — while this stays "Code", the site keeps hardcoded seo-content.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Meta SEO',
          description: 'Page title, description aur keywords (har language alag)',
          fields: [
            {
              name: 'heroHeading',
              type: 'text',
              localized: true,
              admin: {
                description:
                  'Page ka visible <h1> (tool ke content block ke top par). Har language alag. Khali chhodo → tool ka default naam use hoga. CMS-active pages ka SEO H1 yahi hai.',
              },
            },
            {
              name: 'heroDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description:
                  'H1 ke neeche 1-line intro. Khali → meta description use hogi. Har language alag.',
              },
            },
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Page ka <title> (max ~65 chars)' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Meta description (max ~160 chars)' },
            },
            {
              name: 'keywords',
              type: 'text',
              localized: true,
              admin: { description: 'Comma-separated meta keywords (optional)' },
            },
          ],
        },
        {
          label: 'Article',
          description:
            'Poora article ek rich text me. H2 headings se left TOC automatic banta hai. Paste once, done.',
          fields: [
            {
              name: 'content',
              type: 'richText',
              localized: true,
              admin: {
                description:
                  'Main article body. Toolbar se Heading → H2 = TOC item. H3 = subheading (TOC me nahi, jab tak neeche "Include H3" on na ho). Lists, links, tables, images, video supported.',
              },
            },
            {
              name: 'tocIncludeH3',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description:
                  'On = H3 bhi TOC me nested dikhe. Off (default) = sirf H2 TOC me.',
              },
            },
            {
              name: 'tocExclude',
              type: 'array',
              labels: { singular: 'Hidden TOC heading', plural: 'Hidden TOC headings' },
              admin: {
                description:
                  'Optional: jin H2/H3 ko TOC se hide karna hai unka auto-slug yahan daalo (e.g. "how-it-works"). Page par heading dikhegi, TOC link nahi.',
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'anchorId',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'Slugified heading id (lowercase-hyphens), same as URL #anchor',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Legacy sections',
          description:
            'Purana multi-section editor. Naye content ke liye "Article" tab use karo. Agar Article khali hai to ye sections fallback ke taur par render hote hain.',
          fields: [
            {
              name: 'sections',
              type: 'array',
              localized: true,
              labels: { singular: 'Section', plural: 'Sections' },
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'anchorId',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'URL anchor, e.g. "what-is-coast-fire" (lowercase, hyphens)',
                  },
                },
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  admin: {
                    description: 'h2 heading — TOC me bhi yahi dikhega',
                  },
                },
                {
                  name: 'body',
                  type: 'richText',
                  admin: {
                    description:
                      'Paragraphs, h3 sub-headings, lists, bold, images, tables, video. Upload images via the toolbar.',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'FAQs',
          description: 'Page par FAQ section + Google FAQ schema (JSON-LD) dono me jaate hain.',
          fields: [
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
          label: 'Extras',
          description: 'Disclaimer aur advanced schema override',
          fields: [
            {
              name: 'disclaimer',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Optional — article ke end me chhota disclaimer box (coast-fire jaisa)',
              },
            },
            {
              name: 'customSchema',
              type: 'json',
              admin: {
                description:
                  'ADVANCED (optional): Custom JSON-LD. Valid JSON daalne par automatic schema band ho jayega. Khali chhodo to website khud schema generate karti rahegi.',
              },
              validate: (value: unknown) => {
                if (value === null || value === undefined || value === '') return true
                if (typeof value === 'object') return true
                return 'customSchema ek JSON object ya array hona chahiye (ya khali).'
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        const slug = (data?.toolSlug ?? originalDoc?.toolSlug) as string | undefined
        if (slug) {
          data.searchKey = toolSearchKey(slug)
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, previousDoc }) => {
        try {
          const { revalidateTag, revalidatePath } = await import('next/cache')
          const { ROUTABLE_LOCALES, DEFAULT_LOCALE } = await import('../lib/i18n/locales')

          const slugs = new Set<string>()
          if (typeof doc.toolSlug === 'string') slugs.add(doc.toolSlug)
          // Slug rename: purana page bhi invalidate
          if (
            previousDoc &&
            typeof previousDoc.toolSlug === 'string' &&
            previousDoc.toolSlug !== doc.toolSlug
          ) {
            slugs.add(previousDoc.toolSlug)
          }

          for (const slug of slugs) {
            revalidateTag(`tool-content:${slug}`)
            revalidatePath(`/${slug}/`)
            for (const locale of ROUTABLE_LOCALES) {
              if (locale === DEFAULT_LOCALE) continue
              revalidatePath(`/${locale}/${slug}/`)
            }
          }
        } catch (err) {
          console.warn(`[tool-content] revalidate failed for ${doc.toolSlug}:`, err)
        }
        return doc
      },
    ],
  },
}
