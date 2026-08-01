import type { CollectionConfig } from 'payload'
import { toolSlugs } from '../lib/i18n/tool-slugs'

/**
 * tool-content — HYBRID MODEL ka CMS side.
 *
 * Code decide karta hai tool KYA karta hai (app/(tools)/<slug>/page.tsx),
 * ye collection decide karti hai tool ke page par KYA LIKHA hai. Join key = toolSlug.
 *
 * Structure EXACTLY existing seo-content pattern follow karta hai
 * (reference: coast-fire-calculator — left TOC + right article):
 *   sections[] = h2(anchorId) + richText body → TOC in se AUTO-generate hota hai
 *
 * SAFETY: contentSource default 'code' hai — jab tak aap khud 'cms' na karo,
 * page par existing seo-content.tsx hi render hota hai, CMS entry ignore hoti hai.
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
    listSearchableFields: ['toolSlug'],
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
      type: 'select',
      required: true,
      unique: true,
      index: true,
      options: toolSlugs.map((slug) => ({ label: slug, value: slug })),
      admin: {
        description: 'Tool URL slug.',
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
          label: 'Sections',
          description:
            'Har section = ek h2 heading + body. TOC (left sidebar) in headings se automatic banta hai.',
          fields: [
            {
              name: 'sections',
              type: 'array',
              localized: true,
              labels: { singular: 'Section', plural: 'Sections' },
              admin: {
                initCollapsed: false,
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
    afterChange: [
      async ({ doc }) => {
        try {
          const { revalidateTag, revalidatePath } = await import('next/cache')
          const slug = doc.toolSlug as string
          // Data cache (unstable_cache in getToolContent)
          revalidateTag(`tool-content:${slug}`)
          // Full Route Cache — English layouts use force-static; tag alone is not enough
          revalidatePath(`/${slug}/`)
          // Localized tool pages (/de/... etc.) — keep in sync with ROUTABLE_LOCALES
          const { ROUTABLE_LOCALES, DEFAULT_LOCALE } = await import('../lib/i18n/locales')
          for (const locale of ROUTABLE_LOCALES) {
            if (locale === DEFAULT_LOCALE) continue
            revalidatePath(`/${locale}/${slug}/`)
          }
        } catch (err) {
          // payload CLI/seed script context me next/cache available nahi hota — safe ignore
          console.warn(`[tool-content] revalidate failed for ${doc.toolSlug}:`, err)
        }
        return doc
      },
    ],
  },
}
