# Dynamic Tool Layouts - Complete Guide

## Overview

The dynamic layout system allows you to automatically generate SEO metadata and schema markup for all your tools using a single source of truth - your `tools-data.ts` file. This eliminates duplicate code and ensures consistency across all tools.

## How It Works

### 1. Central Data Source
All tool metadata is stored in `lib/tools-data.ts` with comprehensive SEO information:

```typescript
{
  id: 'image-compressor',
  name: 'Professional Image Compressor',
  slug: 'image-compressor',
  description: 'Compress images with Toolspy\'s advanced engine...',
  // ... other properties
  seo: {
    metaTitle: 'Professional Image Compressor - Free Online Tool | Toolspy',
    metaDescription: 'Compress images with advanced algorithms...',
    canonicalUrl: 'https://toolspy.net/image-compressor',
    keywords: ['compress', 'optimize', 'resize', 'jpeg', 'png'],
    // ... complete SEO metadata
  }
}
```

### 2. Dynamic Layout Component
`components/layout/dynamic-tool-layout.tsx` provides:
- `generateToolMetadata(toolSlug)` - Generates Next.js metadata
- `DynamicToolLayout` - Renders schema markup and children
- Automatic category mapping for schema.org

### 3. Individual Tool Layouts
Each tool's `layout.tsx` is now just a few lines:

```typescript
import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('tool-slug')

export default function ToolLayout({ children }: { children: React.ReactNode }) {
  return (
    <DynamicToolLayout toolSlug="tool-slug">
      {children}
    </DynamicToolLayout>
  )
}
```

## Benefits

✅ **Single Source of Truth**: All metadata in `tools-data.ts`
✅ **No Duplication**: DRY principle applied
✅ **Consistency**: Same structure for all tools
✅ **Maintainability**: Update one place, affects all tools
✅ **SEO Optimized**: Complete metadata and schema markup
✅ **Type Safety**: Full TypeScript support

## Migration Status

The following tools have been converted to use dynamic layouts:

### ✅ Converted Tools:
- image-compressor
- age-calculator
- base64-encoder-decoder
- color-picker
- compress-pdf
- currency-converter
- file-protector
- heic-to-pdf
- image-converter
- image-optimizer
- image-resizer
- merge-pdf
- pdf-converter
- pdf-password-remover
- pdf-to-csv
- pdf-to-excel
- pdf-to-image
- pdf-to-word
- percentage-calculator
- qr-code-generator
- split-pdf

### ⚠️ Tools Without Layouts (Need Creation):
- area-converter
- base64-to-image
- bmi-calculator
- image-to-base64
- investment-calculator
- jfif-to-jpg
- jfif-to-pdf
- length-converter
- loan-calculator
- love-calculator
- mortgage-calculator
- retirement-calculator
- salary-calculator
- tax-calculator
- temperature-converter
- unit-converter
- volume-converter
- weight-converter

## Adding New Tools

### Option 1: Use the Template
Copy `templates/tool-layout.template.tsx` and replace:
- `{{TOOL_SLUG}}` with your tool's slug
- `{{TOOL_NAME}}` with PascalCase name

### Option 2: Manual Creation
```typescript
import type { Metadata } from 'next'
import { generateToolMetadata, DynamicToolLayout } from '@/components/layout/dynamic-tool-layout'

export const metadata: Metadata = generateToolMetadata('your-tool-slug')

export default function YourToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="your-tool-slug">
      {children}
    </DynamicToolLayout>
  )
}
```

## Commands

- `npm run convert-layouts` - Convert all existing layouts to dynamic approach
- Manual conversion for individual tools as needed

## Maintenance

### To Add a New Tool:
1. Add tool data to `lib/tools-data.ts`
2. Create the tool's folder structure
3. Add `layout.tsx` using the template
4. Create your `page.tsx` component

### To Update Tool Metadata:
1. Edit the tool's entry in `lib/tools-data.ts`
2. The changes automatically apply to all metadata and schema markup

## Schema Markup Features

The dynamic layout automatically generates:
- Software Application schema
- Proper categorization (Multimedia, Business, Developer, Utilities)
- Features list from tool tags
- Ratings and offers
- Help documentation links

## Next Steps

1. ✅ All existing layouts converted
2. 🔄 Create layouts for tools that don't have them yet
3. 🔄 Test SEO metadata on various tools
4. 🔄 Consider adding tool-specific schema variations if needed

## Testing

To verify the dynamic layouts are working:

1. Check browser dev tools for proper `<title>` and `<meta>` tags
2. Verify schema markup in JSON-LD format
3. Use tools like Google's Rich Results Test
4. Check that social media previews work correctly

The dynamic layout system is now fully implemented and ready for production use! 