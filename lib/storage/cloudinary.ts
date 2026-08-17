import { v2 as cloudinary } from 'cloudinary'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

/**
 * Cloudinary storage adapter for Payload's cloud-storage plugin.
 *
 * Why: local disk (public/media) does NOT persist on Vercel serverless, so every
 * CMS/rich-text image upload was lost on redeploy. Cloudinary gives a free-forever
 * bucket + CDN + automatic image optimisation.
 *
 * Deterministic URLs: each file (original + every sharp image size) maps to a stable
 * Cloudinary public_id derived from the collection + filename, so generateURL can
 * reconstruct the delivery URL without a DB lookup and every size resolves correctly.
 */

const FOLDER = (process.env.CLOUDINARY_FOLDER || 'toolspy').replace(/\/+$/, '')

export function isCloudinaryEnabled(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  )
}

let configured = false
function ensureConfigured() {
  if (configured) return
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
  configured = true
}

/** Strip the extension — Cloudinary stores format separately and appends it on delivery. */
function stripExt(filename: string): string {
  const dot = filename.lastIndexOf('.')
  return dot > 0 ? filename.slice(0, dot) : filename
}

/** Stable public_id, e.g. `toolspy/media/my-photo-800x450`. */
function publicIdFor(collectionSlug: string, filename: string): string {
  return [FOLDER, collectionSlug, stripExt(filename)].filter(Boolean).join('/')
}

export function cloudinaryAdapter(): Adapter {
  return ({ collection }): GeneratedAdapter => {
    const collectionSlug = collection.slug

    return {
      name: 'cloudinary',

      onInit: () => {
        ensureConfigured()
      },

      handleUpload: async ({ file }) => {
        ensureConfigured()
        await new Promise<void>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              public_id: publicIdFor(collectionSlug, file.filename),
              resource_type: 'image',
              overwrite: true,
              invalidate: true,
              use_filename: false,
              unique_filename: false,
            },
            (error) => (error ? reject(error) : resolve())
          )
          stream.end(file.buffer)
        })
      },

      handleDelete: async ({ filename }) => {
        ensureConfigured()
        try {
          await cloudinary.uploader.destroy(publicIdFor(collectionSlug, filename), {
            resource_type: 'image',
            invalidate: true,
          })
        } catch {
          // Missing/already-deleted asset — never block the Payload delete.
        }
      },

      generateURL: ({ filename }) => {
        ensureConfigured()
        return cloudinary.url(publicIdFor(collectionSlug, filename), {
          secure: true,
          resource_type: 'image',
        })
      },

      staticHandler: (_req, { params }) => {
        ensureConfigured()
        const url = cloudinary.url(publicIdFor(params.collection, params.filename), {
          secure: true,
          resource_type: 'image',
        })
        return new Response(null, { status: 302, headers: { Location: url } })
      },
    }
  }
}
