import type { GlobalConfig } from 'payload'
import { toolSelectOptions } from '../lib/i18n/tool-labels'

/**
 * Homepage CMS settings.
 *
 * 1. popularTools — homepage ke "Popular tools" cards (order/selection).
 * 2. HYBRID SEO CONTENT (tool-page jaisa) — homepage ke SEO content block ko
 *    per-language Code/CMS toggle se manage karo:
 *      - `contentSource` (LOCALIZED): har language ka apna Code/CMS choice.
 *      - `content` (LOCALIZED richText): jab us language ka source = CMS ho, to
 *        homepage par built-in HomeSeoContent ki jagah YE dikhta hai.
 *    Rich text editor wahi full-featured hai jo posts + tool-content par hai
 *    (headings, lists, tables, images, video embed).
 *
 * Hero + popular tool cards + testimonials hamesha CODE se aate hain (layout).
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Homepage — Popular tools cards + per-language SEO content (Code/CMS).',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO Content',
          description:
            'Homepage ka SEO content block (hero ke neeche). Har language alag Code/CMS choose kar sakti hai.',
          fields: [
            {
              name: 'contentSource',
              type: 'select',
              localized: true,
              defaultValue: 'code',
              options: [
                { label: 'Code — built-in homepage content', value: 'code' },
                { label: 'CMS — use the content below', value: 'cms' },
              ],
              admin: {
                description:
                  'Is language ke liye: "CMS" karo aur neeche content likho → us language ke homepage par wahi dikhega. "Code" = built-in content (default).',
              },
            },
            {
              name: 'content',
              type: 'richText',
              localized: true,
              admin: {
                description:
                  'Homepage SEO content (hero ke neeche). Sirf tab render hota hai jab is language ka Content Source = CMS ho. Full editor: headings, lists, tables, images, video.',
              },
            },
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: { description: 'Homepage <title> (optional, per language). Khali = default.' },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: { description: 'Homepage meta description (optional, per language).' },
            },
          ],
        },
        {
          label: 'Popular Tools',
          fields: [
            {
              name: 'popularTools',
              type: 'array',
              labels: { singular: 'Popular tool', plural: 'Popular tools' },
              admin: {
                description:
                  'Homepage Popular Tools cards. Drag to reorder. Type in the dropdown to search by tool name or slug. Empty list = site uses code featured tools.',
                initCollapsed: false,
                components: {
                  RowLabel: '@/components/payload/PopularToolRowLabel#PopularToolRowLabel',
                },
              },
              fields: [
                {
                  name: 'toolSlug',
                  type: 'select',
                  required: true,
                  options: toolSelectOptions,
                  admin: {
                    description: 'Search by typing the tool name or slug.',
                    isClearable: false,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidateTag, revalidatePath } = await import('next/cache')
          const { ROUTABLE_LOCALES, DEFAULT_LOCALE } = await import('../lib/i18n/locales')
          revalidateTag('homepage')
          revalidatePath('/')
          for (const locale of ROUTABLE_LOCALES) {
            if (locale === DEFAULT_LOCALE) continue
            revalidatePath(`/${locale}`)
          }
        } catch (err) {
          console.warn('[homepage] revalidate failed:', err)
        }
      },
    ],
  },
}
