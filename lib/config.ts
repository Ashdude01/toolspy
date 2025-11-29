// Site Configuration
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Toolspy',
  title: 'Toolspy – Free Online Calculators, Converters & File Tools',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Professional Online Tools Hub',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://toolspy.net',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'toolspy.net',
  
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
  
  // Ezoic Ads Configuration
  ezoic: {
    enabled: process.env.NEXT_PUBLIC_EZOIC_ENABLED === 'true',
    publisherId: process.env.NEXT_PUBLIC_EZOIC_PUBLISHER_ID || '19390',
    adsTxtManagerUrl: `https://srv.adstxtmanager.com/${process.env.NEXT_PUBLIC_EZOIC_PUBLISHER_ID || '19390'}/${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'toolspy.net'}`,
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
    'image optimization',
    'PDF converter',
    'document converter',
    'file compression',
    'online calculator',
    'web utilities',
    'browser tools',
    'privacy tools',
    'secure online tools',
    'professional utilities',
    'digital tools',
    'web tools platform',
    'free online utilities',
    'client-side processing',
    'mobile-optimized tools',
    'image optimizer',
    'PDF merger',
    'calculator tools',
    'base64 tools',
    'PDF tools',
    'image converter online',
    'free web tools',
    'online utilities',
    'browser-based tools',
    'privacy-focused tools',
    'professional tools',
    'digital utilities'
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