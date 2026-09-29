import { readFile } from 'fs/promises'
import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'
import type { Adapter, GeneratedAdapter } from '@payloadcms/plugin-cloud-storage/types'

/**
 * Cloudinary storage adapter for Payload's cloud-storage plugin.
 *
 * Vercel has no persistent disk, so `public/media` uploads disappear (and often
 * fail outright). Uploads go to Cloudinary; Payload stores the CDN `secure_url`.
 */

const FOLDER = (process.env.CLOUDINARY_FOLDER || 'toolspy').replace(/\/+$/, '')

export function isCloudinaryEnabled(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim()
  )
}

let configured = false
function ensureConfigured() {
  if (configured) return
  if (!isCloudinaryEnabled()) {
    throw new Error(
      '[cloudinary] Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET'
    )
  }
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
  configured = true
}

function stripExt(filename: string): string {
  const dot = filename.lastIndexOf('.')
  return dot > 0 ? filename.slice(0, dot) : filename
}

function extOf(filename: string): string | undefined {
  const dot = filename.lastIndexOf('.')
  if (dot <= 0 || dot === filename.length - 1) return undefined
  return filename.slice(dot + 1).toLowerCase()
}

/** Stable public_id, e.g. `toolspy/media/my-photo`. */
export function publicIdFor(collectionSlug: string, filename: string): string {
  return [FOLDER, collectionSlug, stripExt(filename)].filter(Boolean).join('/')
}

export function cloudinaryDeliveryUrl(collectionSlug: string, filename: string): string {
  if (!filename || !isCloudinaryEnabled()) return ''
  ensureConfigured()
  const format = extOf(filename)
  return cloudinary.url(publicIdFor(collectionSlug, filename), {
    secure: true,
    resource_type: 'image',
    ...(format ? { format } : {}),
  })
}

async function fileBuffer(file: {
  buffer?: Buffer
  tempFilePath?: string
}): Promise<Buffer> {
  if (file.buffer && file.buffer.length > 0) return file.buffer
  if (file.tempFilePath) return readFile(file.tempFilePath)
  throw new Error('[cloudinary] Upload has no file buffer or temp path')
}

function cloudinaryUploadError(err: unknown): Error {
  const e = err as { message?: string; http_code?: number; error?: { message?: string } }
  const detail = e?.error?.message || e?.message || String(err)
  if (e?.http_code === 403 || /missing permissions|actions=\["create"\]/i.test(detail)) {
    return new Error(
      'Cloudinary upload forbidden: this API key has no Create permission. ' +
        'Cloudinary Console → Settings → API Keys → open this key (or create a new one) and enable Upload/Create. ' +
        'Then put CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env and Vercel.'
    )
  }
  return new Error(`Cloudinary upload failed: ${detail}`)
}

function uploadToCloudinary(buffer: Buffer, publicId: string): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        public_id: publicId,
        resource_type: 'auto',
        overwrite: true,
        invalidate: true,
        use_filename: false,
        unique_filename: false,
      },
      (error, result) => {
        if (error) return reject(cloudinaryUploadError(error))
        if (!result) return reject(new Error('[cloudinary] Empty upload response'))
        resolve(result)
      }
    )
    stream.end(buffer)
  })
}

export function cloudinaryAdapter(): Adapter {
  return ({ collection }): GeneratedAdapter => {
    const collectionSlug = collection.slug

    return {
      name: 'cloudinary',

      onInit: () => {
        if (isCloudinaryEnabled()) ensureConfigured()
        else {
          console.warn(
            '[cloudinary] Plugin loaded but env vars missing — media uploads will fail until CLOUDINARY_* is set.'
          )
        }
      },

      handleUpload: async ({ file, data }) => {
        ensureConfigured()
        const buffer = await fileBuffer(file)
        const publicId = publicIdFor(collectionSlug, file.filename)
        const result = await uploadToCloudinary(buffer, publicId)

        // Only attach CDN url on the original file — size variants would overwrite it.
        const isOriginal = !data?.filename || data.filename === file.filename
        if (!isOriginal) return {}

        return {
          url: result.secure_url,
          thumbnailURL: cloudinary.url(result.public_id, {
            secure: true,
            resource_type: result.resource_type === 'video' ? 'video' : 'image',
            transformation: [{ width: 400, crop: 'limit', fetch_format: 'auto', quality: 'auto' }],
          }),
          width: result.width,
          height: result.height,
        }
      },

      handleDelete: async ({ filename }) => {
        if (!isCloudinaryEnabled()) return
        ensureConfigured()
        try {
          await cloudinary.uploader.destroy(publicIdFor(collectionSlug, filename), {
            resource_type: 'image',
            invalidate: true,
          })
        } catch {
          // Missing/already-deleted — never block Payload delete.
        }
      },

      generateURL: ({ filename }) => cloudinaryDeliveryUrl(collectionSlug, filename),

      staticHandler: (_req, { params }) => {
        const url = cloudinaryDeliveryUrl(params.collection, params.filename)
        return new Response(null, { status: 302, headers: { Location: url } })
      },
    }
  }
}
