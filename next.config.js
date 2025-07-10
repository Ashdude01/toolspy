/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Toolspy',
    NEXT_PUBLIC_SITE_DESCRIPTION: 'Professional Online Tools Hub',
    NEXT_PUBLIC_SITE_URL: 'https://toolspy.com',
    NEXT_PUBLIC_SITE_DOMAIN: 'toolspy.com',
    NEXT_PUBLIC_BRAND_COLOR: '#3b82f6',
    NEXT_PUBLIC_BRAND_COLOR_SECONDARY: '#1e40af',
    NEXT_PUBLIC_FILE_WATERMARK: 'toolspy',
    NEXT_PUBLIC_FILE_SUFFIX: 'by-toolspy',
    NEXT_PUBLIC_TWITTER_HANDLE: '@toolspy',
    NEXT_PUBLIC_GITHUB_URL: 'https://github.com/toolspy',
    // Image optimization services (optional)
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NEXT_PUBLIC_IMAGEKIT_URL: process.env.NEXT_PUBLIC_IMAGEKIT_URL,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: false,
    loader: 'custom',
    loaderFile: './lib/image-loader.js',
  },
};

module.exports = nextConfig; 