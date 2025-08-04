// Site Configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Toolspy',
  title: process.env.NEXT_PUBLIC_SITE_TITLE || 'Toolspy – Free Online Calculators, Converters & File Tools',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Professional Online Tools Hub',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.com',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'toolspy.com',
  
  // Branding
  brandColor: process.env.NEXT_PUBLIC_BRAND_COLOR || '#3b82f6',
  brandColorSecondary: process.env.NEXT_PUBLIC_BRAND_COLOR_SECONDARY || '#1e40af',
  
  // File Processing
  fileWatermark: process.env.NEXT_PUBLIC_FILE_WATERMARK || 'toolspy',
  fileSuffix: process.env.NEXT_PUBLIC_FILE_SUFFIX || 'by-toolspy',
  
  // Social Media
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@toolspy',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/toolspy',
  },
  
  // Analytics & Tracking
  analytics: {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
    enableAnalytics: !!process.env.NEXT_PUBLIC_GTM_ID,
  },
  
  // SEO
  keywords: [
    'online tools',
    'image compression',
    'base64 converter',
    'image converter',
    'web tools',
    'free tools',
    'toolspy',
    'image optimization'
  ],
  
  // Tool Categories
  tools: {
    imageTools: [
      'Image Compressor',
      'Image to Base64',
      'Base64 to Image'
    ]
  }
};

export default siteConfig; 