/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Toolspy',
    NEXT_PUBLIC_SITE_TITLE: 'Toolspy – Free Online Calculators, Converters & File Tools',
    NEXT_PUBLIC_SITE_DESCRIPTION: 'Toolspy: Fast, free and secure web‑based tools including converters, calculators, image compression, QR code generator & more — zero install, local browser processing',
    NEXT_PUBLIC_SITE_URL: 'https://toolspy.com',
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
  },
  output: 'export',
  trailingSlash: true,

  images: {
    unoptimized: false,
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
    domains: ['res.cloudinary.com', 'ik.imagekit.io'],
  },
  // PWA optimizations (headers not supported with export mode)
  // Headers would be configured at the server/CDN level for static export
  // Note: experimental.optimizeCss disabled due to critters dependency issues
  // Enable compression (handled by server/CDN for static export)
  compress: true,
};

module.exports = nextConfig; 