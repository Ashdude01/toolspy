# SEO Schema System

A comprehensive SEO schema system for Toolspy that automatically generates structured data for different page types.

## Features

- **Organization Schema**: Company information and contact details
- **Website Schema**: Site-wide information with search capabilities
- **WebPage Schema**: Page-specific metadata with breadcrumbs
- **SoftwareApplication Schema**: Tool-specific application information
- **Review Schema**: Generated user reviews for tools
- **AggregateRating Schema**: Combined rating data
- **FAQPage Schema**: Dynamic FAQs based on tool categories
- **Breadcrumb Schema**: Hierarchical navigation structure

## Usage

### Basic Implementation

The schema system is automatically integrated into your pages through components:

```tsx
// Homepage
import { HomepageSchemas } from '@/components/seo/schema-manager'

export default function HomePage() {
  return (
    <>
      <HomepageSchemas />
      {/* Your page content */}
    </>
  )
}
```

```tsx
// Tool pages (automatically integrated via DynamicToolLayout)
import { ToolSchemas } from '@/components/seo/schema-manager'

export default function ToolPage({ tool }) {
  return (
    <>
      <ToolSchemas tool={tool} includeReviews={true} includeFAQ={true} />
      {/* Your page content */}
    </>
  )
}
```

```tsx
// Category pages
import { CategorySchemas } from '@/components/seo/schema-manager'

export default function CategoryPage({ category }) {
  return (
    <>
      <CategorySchemas category={category} />
      {/* Your page content */}
    </>
  )
}
```

### Advanced Usage

#### Custom Schema Configuration

```tsx
import { SchemaManager } from '@/components/seo/schema-manager'

export default function CustomPage() {
  return (
    <>
      <SchemaManager
        pageType="tool"
        tool={tool}
        includeReviews={false}  // Disable reviews
        includeFAQ={true}       // Enable FAQs
      />
      {/* Your page content */}
    </>
  )
}
```

#### Manual Schema Generation

```tsx
import { generateSoftwareSchema } from '@/components/seo/schemas/software-schema'
import { generateFAQSchema } from '@/components/seo/schemas/faq-schema'

const softwareSchema = generateSoftwareSchema(tool)
const faqSchema = generateFAQSchema(tool)
```

## Schema Types

### Organization Schema
- Company information
- Contact points
- Social media links
- Founded information

### SoftwareApplication Schema
- Tool name and description
- Application category
- Features and requirements
- Pricing (free)
- Aggregate ratings
- Screenshots

### Review Schema
- Automatically generated user reviews
- Star ratings
- Review content based on tool category
- Author information

### FAQ Schema
- Dynamic FAQs based on tool categories
- Common questions for all tools
- Category-specific questions
- Structured Q&A format

## Development & Testing

### Schema Validation

```tsx
import { validateSchemas, logSchemaValidation } from '@/components/seo/schema-validation'

// In development, validate schemas
const results = validateSchemas(tool)
logSchemaValidation(tool) // Logs to console
```

### Rich Results Testing

Use Google's Rich Results Test to validate your schemas:

```tsx
import { generateRichResultsTestUrls } from '@/components/seo/schema-validation'

const testUrls = generateRichResultsTestUrls()
console.log(testUrls.homepage) // Test homepage
console.log(testUrls.imageCompressor) // Test tool page
```

## Configuration

### Site Configuration

Update `lib/config.ts` to customize organization data:

```tsx
export const siteConfig = {
  name: 'Your Site Name',
  url: 'https://yoursite.com',
  description: 'Your site description',
  social: {
    twitter: '@yourhandle',
    github: 'https://github.com/yourorg'
  }
}
```

### Tool Data Structure

Ensure your tools data includes proper SEO information:

```tsx
export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  tags: string[]
  seo: {
    metaTitle: string
    metaDescription: string
    canonicalUrl: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    ogImage: string
    twitterTitle: string
    twitterDescription: string
    twitterImage: string
  }
}
```

## Best Practices

1. **Always include organization and website schemas** on every page
2. **Use specific schemas for each page type** (tool, category, about, etc.)
3. **Include reviews and FAQs for tools** to improve rich snippets
4. **Test schemas regularly** using Google's Rich Results Test
5. **Keep schema data consistent** with actual page content
6. **Update review data periodically** to maintain freshness

## Google Rich Results Support

This schema system supports the following Google Rich Results:

- **Organization**: Company information in search results
- **Website**: Site-wide search box
- **Software Application**: App details and ratings
- **Reviews**: Star ratings and review snippets
- **FAQ**: Expandable Q&A sections
- **Breadcrumbs**: Navigation path display

## File Structure

```
components/seo/
├── schema-types.ts          # TypeScript interfaces
├── schema-manager.tsx       # Main orchestration component
├── schema-validation.ts     # Validation utilities
├── schemas/
│   ├── organization-schema.ts
│   ├── website-schema.ts
│   ├── webpage-schema.ts
│   ├── software-schema.ts
│   ├── review-schema.ts
│   └── faq-schema.ts
└── README.md               # This file
```

## Contributing

When adding new schema types:

1. Create the schema generator in `schemas/`
2. Add TypeScript interfaces to `schema-types.ts`
3. Update the `SchemaManager` component
4. Add validation functions to `schema-validation.ts`
5. Update this README with usage examples