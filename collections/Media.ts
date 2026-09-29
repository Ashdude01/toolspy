import type { CollectionConfig } from 'payload'
import { isCloudinaryEnabled } from '../lib/storage/cloudinary'

const cloudinaryOn = isCloudinaryEnabled()

/**
 * Media — CMS / rich-text image uploads.
 *
 * Cloudinary (when CLOUDINARY_* env vars are set): files go to the CDN.
 * Local fallback: `public/media/` — only for machines without Cloudinary creds.
 *
 * Payload imageSizes + sharp are OFF on Cloudinary: extra local resizes are what
 * commonly made admin uploads fail on Vercel. Cloudinary serves resized variants
 * via URL transforms instead.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    description: cloudinaryOn
      ? 'Images upload to Cloudinary (CDN).'
      : 'Cloudinary env vars missing — uploads go to local public/media (not persisted on Vercel).',
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    // Skip Payload/sharp derivatives when Cloudinary owns the file.
    ...(cloudinaryOn ? {} : {
      imageSizes: [
        { name: 'thumbnail', width: 400 },
        { name: 'card', width: 800 },
        { name: 'wide', width: 1200 },
      ],
    }),
  },
  fields: [
    { name: 'alt', type: 'text', admin: { description: 'Alt text (SEO + accessibility ke liye zaroori)' } },
    { name: 'caption', type: 'text' },
  ],
}
