import type { GlobalConfig } from 'payload'
import { toolSelectOptions } from '../lib/i18n/tool-labels'

/**
 * Homepage CMS settings — popular tools cards ko admin se add/remove/reorder.
 * Frontend: CMS list milti hai to wahi use; warna code fallback (featured tools).
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Homepage sections — Popular tools cards order & selection.',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
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
  hooks: {
    afterChange: [
      async () => {
        try {
          const { revalidateTag, revalidatePath } = await import('next/cache')
          revalidateTag('homepage')
          revalidatePath('/')
        } catch (err) {
          console.warn('[homepage] revalidate failed:', err)
        }
      },
    ],
  },
}
