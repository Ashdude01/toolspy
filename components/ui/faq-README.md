# FAQ Component

A reusable FAQ component with interactive expandable questions and answers, designed to be used across different tools in the Toolspy application.

## Features

- **Two Design Variants**: Enhanced (with gradient background) and Default (simple design)
- **Interactive Expandable**: Click to expand/collapse FAQ items
- **Responsive Design**: Works on all screen sizes
- **Dark Mode Support**: Fully compatible with dark/light themes
- **Customizable**: Flexible props for different use cases
- **Accessible**: Proper ARIA attributes and keyboard navigation

## Usage

### Basic Usage

```tsx
import { FAQ, FAQItem } from "@/components/ui/faq";

const faqs: FAQItem[] = [
  {
    question: "How do I use this tool?",
    answer: "Simply upload your files and click the process button. It's that easy!"
  },
  {
    question: "What file formats are supported?",
    answer: "We support JPEG, PNG, WebP, and many other popular formats."
  }
];

function MyComponent() {
  return (
    <FAQ 
      title="Frequently Asked Questions"
      description="Everything you need to know about our tool"
      faqs={faqs}
    />
  );
}
```

### Enhanced Variant (Default)

```tsx
<FAQ
  title="Image Resizer FAQ"
  description="Everything you need to know about our free image resizer"
  faqs={faqs}
  variant="enhanced" // This is the default
/>
```

### Default Variant (Simple)

```tsx
<FAQ
  title="Simple FAQ"
  faqs={faqs}
  variant="default"
/>
```

### Without Description

```tsx
<FAQ
  title="Quick Questions"
  faqs={faqs}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Frequently Asked Questions"` | The main title of the FAQ section |
| `description` | `string` | `undefined` | Optional description text below the title |
| `faqs` | `FAQItem[]` | **Required** | Array of FAQ items |
| `className` | `string` | `""` | Additional CSS classes |
| `variant` | `"default" \| "enhanced"` | `"enhanced"` | Design variant to use |

## FAQItem Interface

```tsx
interface FAQItem {
  question: string;
  answer: string;
}
```

## Design Variants

### Enhanced Variant
- Gradient background (blue to purple to pink)
- Large title with icon
- Centered layout
- Enhanced hover effects
- Larger spacing and typography
- Shadow effects

### Default Variant
- Simple card design
- Standard spacing
- Basic hover effects
- Compact layout

## Examples

### Image Resizer FAQ
```tsx
const imageResizerFAQs: FAQItem[] = [
  {
    question: "How do I resize an image without losing quality?",
    answer: "To minimize quality loss, avoid enlarging images significantly. When making images smaller, use high-quality settings (90-95%) and consider using PNG format for graphics with text or sharp edges."
  },
  {
    question: "What's the best image size for social media?",
    answer: "Different platforms have optimal dimensions: Instagram posts (1080×1080), Facebook posts (1200×630), Twitter posts (1200×675), LinkedIn posts (1200×627), and YouTube thumbnails (1280×720)."
  }
];

<FAQ
  title="Image Resizer FAQ"
  description="Everything you need to know about our free image resizer and resize image online capabilities"
  faqs={imageResizerFAQs}
  variant="enhanced"
/>
```

### Image Optimizer FAQ
```tsx
const imageOptimizerFAQs: FAQItem[] = [
  {
    question: "What's the difference between lossless and lossy compression?",
    answer: "Lossless compression reduces file size without any quality loss by removing redundant data, while lossy compression achieves smaller files by removing some image data."
  },
  {
    question: "Should I use WebP format for my images?",
    answer: "WebP provides 25-35% better compression than JPEG while maintaining similar or better quality. It's supported by all modern browsers and is ideal for web use."
  }
];

<FAQ
  title="Image Optimizer FAQ"
  description="Common questions about image optimization"
  faqs={imageOptimizerFAQs}
  variant="default"
/>
```

## Styling

The component uses Tailwind CSS classes and is fully responsive. The enhanced variant includes:

- Gradient backgrounds
- Hover effects
- Smooth transitions
- Shadow effects
- Proper spacing

## Accessibility

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

## Best Practices

1. **Keep questions concise** - Users should quickly understand what each FAQ covers
2. **Provide detailed answers** - Give comprehensive, helpful responses
3. **Use natural language** - Write in a conversational tone
4. **Group related questions** - Organize FAQs logically
5. **Update regularly** - Keep FAQs current with your tool's features
6. **Include SEO keywords** - Naturally incorporate relevant keywords in questions and answers
