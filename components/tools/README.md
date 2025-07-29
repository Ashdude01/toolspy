# RelatedTools Component

A reusable component that displays related tools from the same category as the current tool, with fallback to other categories if needed.

## Usage

### Basic Usage

```tsx
import { RelatedTools } from "@/components/tools/related-tools";

export function YourToolSEOContent() {
  return (
    <div className="space-y-8">
      {/* Your existing content */}
      
      {/* Related Tools Section */}
      <RelatedTools currentToolSlug="your-tool-slug" />
    </div>
  );
}
```

### Advanced Usage with Custom Props

```tsx
<RelatedTools 
  currentToolSlug="image-compressor"
  maxTools={6}
  title="More Image Processing Tools"
  description="Enhance your workflow with these complementary image tools."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentToolSlug` | `string` | **Required** | The slug of the current tool (used to exclude it from results) |
| `maxTools` | `number` | `8` | Maximum number of related tools to display |
| `title` | `string` | `"More Helpful Tools You Might Like"` | Section heading |
| `description` | `string` | `"Check out our other tools that work great together."` | Section description |

## How it Works

1. **Same Category First**: The component prioritizes tools from the same category as the current tool
2. **Fallback to Other Categories**: If no tools exist in the same category, it shows tools from other categories
3. **Automatic Exclusion**: The current tool is automatically excluded from the results
4. **Status Handling**: Shows "Coming Soon" badge for tools with `coming-soon` status

## Category-Based Logic

The component uses the tool's category from `tools-data.ts`:

- `image-tools` → Shows other image processing tools
- `pdf-tools` → Shows other PDF manipulation tools  
- `calculators` → Shows other calculator tools
- `base64-tools` → Shows other encoding/decoding tools
- `misc-tools` → Shows other utility tools

## Examples for Different Tool Types

### Image Tools
```tsx
<RelatedTools 
  currentToolSlug="image-compressor"
  title="More Image Tools You'll Love"
  description="Perfect for your complete image processing workflow."
/>
```

### PDF Tools
```tsx
<RelatedTools 
  currentToolSlug="pdf-converter"
  title="Complete PDF Toolkit"
  description="Everything you need for professional PDF processing."
/>
```

### Calculators
```tsx
<RelatedTools 
  currentToolSlug="bmi-calculator"
  title="More Useful Calculators"
  description="Solve more problems with our suite of calculators."
/>
```

### Base64 Tools
```tsx
<RelatedTools 
  currentToolSlug="base64-encoder-decoder"
  title="Encoding & Decoding Tools"
  description="Complete toolkit for data encoding and conversion."
/>
```

## Implementation Steps

1. **Import the component** in your SEO content file:
   ```tsx
   import { RelatedTools } from "@/components/tools/related-tools";
   ```

2. **Add it to your JSX** (typically near the end, before the final CTA):
   ```tsx
   {/* Related Tools */}
   <RelatedTools currentToolSlug="your-tool-slug" />
   ```

3. **Customize as needed** with optional props for better context

## Benefits

- **Consistent UI**: Same design across all tool pages
- **SEO Friendly**: Internal linking between related tools
- **User Engagement**: Keeps users exploring more tools
- **Maintenance**: Single component to update styling/logic
- **Flexibility**: Customizable titles and descriptions per tool

## Notes

- The component returns `null` if no related tools are found
- It automatically handles "Coming Soon" tools with appropriate badges
- The "Why Use Multiple Toolspy Tools?" section is included for SEO and user education
- All links use relative paths from the tools data configuration 