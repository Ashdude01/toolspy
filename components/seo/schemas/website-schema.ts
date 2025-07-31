import { WebSiteSchema, SearchAction } from '../schema-types'
import { siteConfig } from '@/lib/config'
import { generateOrganizationSchema } from './organization-schema'

export function generateWebsiteSchema(): WebSiteSchema {
  const organization = generateOrganizationSchema()
  
  const searchAction: SearchAction = {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: searchAction,
    publisher: organization,
    copyrightHolder: organization,
    copyrightYear: new Date().getFullYear()
  }
}