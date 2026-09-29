import type { Block } from 'payload'

/**
 * Video Embed block — YouTube/Vimeo/kisi bhi embed URL ke liye.
 * Rich text editor me "Video" block insert karke URL daalo.
 */
export const VideoEmbed: Block = {
  slug: 'videoEmbed',
  labels: { singular: 'Video', plural: 'Videos' },
  imageAltText: 'Video',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'YouTube / Vimeo / embed URL (e.g. https://www.youtube.com/watch?v=...)' },
    },
    { name: 'caption', type: 'text' },
  ],
}
