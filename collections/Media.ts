import type { CollectionConfig } from 'payload'

/**
 * Media — image uploads ke liye (rich text editor me image insert karne hetu).
 *
 * LOCAL DEV / SELF-HOST: files `public/media/` me store hoti hain (staticDir).
 * VERCEL (serverless): local disk persist nahi hota — wahan @payloadcms/storage-vercel-blob
 * ya @payloadcms/storage-s3 (Cloudflare R2) adapter add karna hoga. Uske liye
 * bolna, main wire kar dunga.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true, // public images
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 400 },
      { name: 'card', width: 800 },
      { name: 'wide', width: 1200 },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', admin: { description: 'Alt text (SEO + accessibility ke liye zaroori)' } },
    { name: 'caption', type: 'text' },
  ],
}
