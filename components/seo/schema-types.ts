// Schema.org types and interfaces for SEO
export interface BaseSchema {
  '@context': 'https://schema.org'
  '@type': string
}

export interface OrganizationSchema extends BaseSchema {
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  description?: string
  sameAs?: string[]
  contactPoint?: ContactPoint[]
  address?: Address
  founder?: Person[]
}

export interface SoftwareApplicationSchema extends BaseSchema {
  '@type': 'SoftwareApplication'
  '@id'?: string
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  softwareVersion?: string
  author: Organization | Person
  offers?: Offer
  aggregateRating?: AggregateRating
  featureList?: string[]
  screenshot?: string
  softwareHelp?: CreativeWork
  downloadUrl?: string
  fileSize?: string
  requirements?: string[]
  applicationSubCategory?: string
}

export interface ReviewSchema extends BaseSchema {
  '@type': 'Review'
  itemReviewed: SoftwareApplicationSchema | Organization
  reviewRating: Rating
  author: Person
  datePublished: string
  reviewBody: string
  headline?: string
}

export interface AggregateRatingSchema extends BaseSchema {
  '@type': 'AggregateRating'
  ratingValue: number
  ratingCount: number
  bestRating?: number
  worstRating?: number
  reviewCount?: number
}

export interface FAQPageSchema extends BaseSchema {
  '@type': 'FAQPage'
  mainEntity: Question[]
  url?: string
  about?: Thing
}

export interface WebPageSchema extends BaseSchema {
  '@type': 'WebPage'
  name: string
  description: string
  url: string
  primaryImageOfPage?: ImageObject
  breadcrumb?: BreadcrumbList
  mainContentOfPage?: WebPageElement[]
  speakable?: SpeakableSpecification
  about?: Thing[]
  mentions?: Thing[]
}

export interface WebSiteSchema extends BaseSchema {
  '@type': 'WebSite'
  name: string
  url: string
  description?: string
  potentialAction?: SearchAction
  publisher?: Organization
  copyrightHolder?: Organization
  copyrightYear?: number
}

// Supporting types
export interface ContactPoint {
  '@type': 'ContactPoint'
  telephone?: string
  contactType: string
  email?: string
  availableLanguage?: string[]
}

export interface Address {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality?: string
  addressRegion?: string
  postalCode?: string
  addressCountry?: string
}

export interface Person {
  '@type': 'Person'
  name: string
  url?: string
  sameAs?: string[]
}

export interface Organization {
  '@type': 'Organization'
  name: string
  url?: string
  logo?: string
}

export interface Offer {
  '@type': 'Offer'
  price: string
  priceCurrency: string
  availability?: string
  priceValidUntil?: string
}

export interface AggregateRating {
  '@type': 'AggregateRating'
  ratingValue: string | number
  ratingCount: string | number
  reviewCount?: string | number
  bestRating?: string | number
  worstRating?: string | number
}

export interface Rating {
  '@type': 'Rating'
  ratingValue: number
  bestRating?: number
  worstRating?: number
}

export interface CreativeWork {
  '@type': 'CreativeWork'
  url: string
  name?: string
}

export interface Question {
  '@type': 'Question'
  name: string
  acceptedAnswer: Answer
}

export interface Answer {
  '@type': 'Answer'
  text: string
}

export interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
  caption?: string
}

export interface BreadcrumbList {
  '@type': 'BreadcrumbList'
  itemListElement: ListItem[]
}

export interface ListItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string
}

export interface WebPageElement {
  '@type': 'WebPageElement'
  cssSelector?: string
  xpath?: string
}

export interface SpeakableSpecification {
  '@type': 'SpeakableSpecification'
  cssSelector?: string[]
  xpath?: string[]
}

export interface Thing {
  '@type': string
  name: string
  url?: string
  // Allow additional properties for specific schema types
  [key: string]: any
}

export interface SearchAction {
  '@type': 'SearchAction'
  target: {
    '@type': 'EntryPoint'
    urlTemplate: string
  }
  'query-input': string
}

// Page types for schema generation
export type PageType = 'homepage' | 'tool' | 'category' | 'about' | 'contact' | 'blog' | 'help'

// Combined schema data interface
export interface SchemaData {
  pageType: PageType
  organization: OrganizationSchema
  website?: WebSiteSchema
  webpage?: WebPageSchema
  software?: SoftwareApplicationSchema
  reviews?: ReviewSchema[]
  aggregateRating?: AggregateRatingSchema
  faq?: FAQPageSchema
  breadcrumbs?: BreadcrumbList
}