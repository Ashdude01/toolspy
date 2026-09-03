import { withPayload } from '@payloadcms/next/withPayload'

/**
 * Toolspy v2 — next.config (ESM me convert kiya kyunki Payload ko
 * withPayload wrapper + ESM config chahiye).
 *
 * Existing next.config.js ka SAARA config yahan as-is preserve hai —
 * env, redirects, images, trailingSlash. Purani next.config.js file
 * DELETE karni hai (git rm next.config.js) warna Next usi ko uthayega.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Toolspy',
    NEXT_PUBLIC_SITE_TITLE: 'Toolspy – Free Online Calculators, Converters & File Tools',
    NEXT_PUBLIC_SITE_DESCRIPTION: 'Toolspy: Fast, free and secure web‑based tools including converters, calculators, image compression, QR code generator & more - zero install, local browser processing',
    NEXT_PUBLIC_SITE_URL: 'https://toolspy.net',
    NEXT_PUBLIC_SITE_DOMAIN: 'toolspy.net',
    NEXT_PUBLIC_BRAND_COLOR: '#3b82f6',
    NEXT_PUBLIC_BRAND_COLOR_SECONDARY: '#1e40af',
    NEXT_PUBLIC_FILE_WATERMARK: 'toolspy',
    NEXT_PUBLIC_FILE_SUFFIX: 'by-toolspy',
    NEXT_PUBLIC_TWITTER_HANDLE: '@toolspy',
    NEXT_PUBLIC_GITHUB_URL: 'https://github.com/toolspy',
    // Analytics & Tracking
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-TJ84FG2F',
    // Image optimization services (optional) - using fallback values
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL || '',
    NEXT_PUBLIC_IMAGEKIT_URL: process.env.NEXT_PUBLIC_IMAGEKIT_URL || '',
    // Third-party downloader API (RapidAPI or similar)
    NEXT_PUBLIC_DOWNLOADER_API_URL: process.env.NEXT_PUBLIC_DOWNLOADER_API_URL || '',
    NEXT_PUBLIC_DOWNLOADER_API_KEY: process.env.NEXT_PUBLIC_DOWNLOADER_API_KEY || '',
    NEXT_PUBLIC_DOWNLOADER_API_HOST: process.env.NEXT_PUBLIC_DOWNLOADER_API_HOST || '',
    // WHOIS API (apilayer.com)
    NEXT_PUBLIC_WHOIS_API_KEY: process.env.NEXT_PUBLIC_WHOIS_API_KEY || '',
  },
  // SSR: server har request pe full HTML (body + text) bhejta hai - View Source / crawlers ko content milta hai.
  trailingSlash: true,

  // 301 redirects - policy-safe slugs. "private-viewer" URL AdSense/platform-policy
  // ke liye risky tha, isliye tool ab /instagram-dp-viewer/ par hai.
  async redirects() {
    return [
      {
        source: '/instagram-private-viewer',
        destination: '/instagram-dp-viewer/',
        permanent: true,
      },
      {
        source: '/instagram-private-viewer/',
        destination: '/instagram-dp-viewer/',
        permanent: true,
      },
    ]
  },

  images: {
    unoptimized: false,
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
    domains: ['res.cloudinary.com', 'ik.imagekit.io'],
  },
  compress: true,

  // Sharp is a native module — keep it external and force Vercel NFT to include
  // libvips binaries (sharp 0.34/0.35 fail on Vercel without this + pinned version).
  serverExternalPackages: [
    'sharp',
    'payload',
    '@payloadcms/db-postgres',
    'cloudinary',
    '@payloadcms/plugin-cloud-storage',
  ],
  outputFileTracingIncludes: {
    '/*': [
      './node_modules/sharp/**/*',
      './node_modules/@img/sharp-linux-x64/**/*',
      './node_modules/@img/sharp-libvips-linux-x64/**/*',
      './node_modules/@img/sharp-linuxmusl-x64/**/*',
      './node_modules/@img/sharp-libvips-linuxmusl-x64/**/*',
    ],
  },

  // Payload requirement — .js imports ko .ts par bhi resolve karo
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }
    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
