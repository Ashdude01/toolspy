import { OrganizationSchema, ContactPoint } from '../schema-types'
import { siteConfig } from '@/lib/config'

export function generateOrganizationSchema(): OrganizationSchema {
  const contactPoints: ContactPoint[] = [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English'],
      email: 'support@toolspy.com'
    }
  ]

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo/black.webp`,
    description: 'Professional online tools for image compression, base64 conversion, PDF processing, and calculations. Free, fast, and secure browser-based tools.',
    sameAs: [
      siteConfig.social.twitter.replace('@', 'https://twitter.com/'),
      siteConfig.social.github
    ],
    contactPoint: contactPoints,
    founder: [
      {
        '@type': 'Person',
        name: 'Toolspy Team',
        url: siteConfig.url
      }
    ]
  }
}