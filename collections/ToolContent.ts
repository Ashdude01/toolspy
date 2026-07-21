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
 * (facebook-image-downloader hamesha 'code' par rahega jab tak aap na badlo.)
 */
export const ToolContent: CollectionConfig = {
  slug: 'tool-content',
  admin: {
    useAsTitle: 'toolSlug',
    defaultColumns: ['toolSlug', 'contentSource', 'updatedAt'],
    description:
      'Tool pages ka SEO content (har language me). contentSource "code" = website par existing hardcoded content dikhta hai; "cms" = yahan ka content dikhta hai.',
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true, // published content public hai (frontend build isse padhta hai)
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
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !(toolSlugs as readonly string[]).includes(value)) {
          return `Unknown tool slug. Valid slugs: lib/i18n/tool-slugs.ts me dekho.`
        }
        return true
      },
      admin: {
        description:
          'Tool ka URL slug (e.g. "image-compressor"). Sirf registered tools allowed — galat slug save hi nahi hoga.',
      },
    },
    {
      name: 'contentSource',
      type: 'select',
      required: true,
      defaultValue: 'code',
      options: [
        { label: 'Code (existing seo-content.tsx) — website par koi change nahi', value: 'code' },
        { label: 'CMS — neeche ka content website par dikhega', value: 'cms' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'DHYAN SE: "cms" karne par is tool ke localized pages par yahan ka content render hoga.',
      },
    },

    // ---------- LOCALIZED CONTENT (har field har language me alag) ----------
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
      name: 'sections',
      type: 'array',
      localized: true,
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description:
          'Har section = ek h2 heading + body. TOC (left sidebar) in headings se automatic banta hai — coast-fire-calculator jaisa layout.',
      },
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          required: true,
          admin: { description: 'URL anchor, e.g. "what-is-coast-fire" (lowercase, hyphens)' },
        },
        {
          name: 'heading',
          type: 'text',
          required: true,
          admin: { description: 'h2 heading — TOC me bhi yahi dikhega' },
        },
        {
          name: 'body',
          type: 'richText',
          admin: { description: 'Paragraphs, h3 sub-headings, lists, images (Cloudinary URL), bold etc.' },
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      localized: true,
      labels: { singular: 'FAQ', plural: 'FAQs' },
      admin: {
        description: 'Page par FAQ section + Google FAQ schema (JSON-LD) dono me jaate hain.',
      },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'textarea', required: true },
      ],
    },
    {
      name: 'disclaimer',
      type: 'textarea',
      localized: true,
      admin: { description: 'Optional — article ke end me chhota disclaimer box (coast-fire jaisa)' },
    },
    {
      name: 'keywords',
      type: 'text',
      localized: true,
      admin: { description: 'Comma-separated meta keywords (optional)' },
    },
    {
      name: 'customSchema',
      type: 'json',
      admin: {
        description:
          'ADVANCED (optional): Custom JSON-LD schema. Agar yahan valid JSON daala, to is tool page par YEHI schema render hoga (automatic wala band ho jayega). Khali chhoda to website khud schema generate karti rahegi (default). Ek object ya objects ka array — dono chalega.',
      },
      // Basic validation: valid JSON-LD (object/array) hi allow karo
      validate: (value: unknown) => {
        if (value === null || value === undefined || value === '') return true
        if (typeof value === 'object') return true
        return 'customSchema ek JSON object ya array hona chahiye (ya khali).'
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc }) => {
        // On-demand ISR: is tool ke saare cached locale pages invalidate
        try {
          const { revalidateTag } = await import('next/cache')
          revalidateTag(`tool-content:${doc.toolSlug}`)
        } catch {
          // payload CLI/seed script context me next/cache available nahi hota — safe ignore
        }
        return doc
      },
    ],
  },
}
