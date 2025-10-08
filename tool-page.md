# Schema & Metadata Generation Strategy

This document outlines the schema and metadata generation structure for perticular tools pages.

## 📁 Directory Structure

```
src/app/
├── (tools)/
│   └── image-compressor/
│       ├── layout.tsx        # Metadata and schema
│       └── page.tsx          # Main page content
│       └── seo-content.tsx   # SEO page content & FAQs.



## 📋 Data Structure for Schema



// faq data
export const faq_data: IFaq[] = [
  {
    id: 1,
    question: "tool's FAQ question?",
    answer: "tool's answer context.",
  },
  // ... more FAQs (typically 5-8 questions)
];

```

## 🏗️ Metadata Generation Structure

### 2. layout.tsx Structure

```typescript
import { Metadata } from "next";
import { createMetadata, createFullUrl } from "@/utils/metadata";
import MarketingPageSchema from "@/components/schema/MarketingPageSchema";
import { createMarketingPageData } from "@/utils/marketing-page-data";
import { faq_data } from "./data";
import { testimonial } from "./data";

const baseMetadata: Metadata = {
  title: "SEO Services Agency [Location] | Best SEO Company [Location]",
  description: "Location-specific meta description with local keywords and value proposition.",
};

export const metadata = createMetadata(
  baseMetadata,
  "/[location]-seo-services-company"
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageData = createMarketingPageData({
    title: baseMetadata.title as string,
    description: baseMetadata.description as string,
    path: "/[location]-seo-services-company",
    serviceType: "Digital Marketing Agency",
    faqs: faq_data.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
    reviews: testimonial.map((review) => ({
      author: review.name,
      rating: review.rating,
      text: review.desc,
    })),
    aggregateRating: {
      rating: 4.9,
      reviewCount: 156,
      bestRating: 5,
    },
    image: "https://biztalbox.com/_next/image?url=%2Fassets%2Fimg%2Fservices%2Fseo.webp&w=1080&q=75",
  });

  return (
    <>
      <MarketingPageSchema
        pageData={pageData}
        currentUrl={createFullUrl("/[location]-seo-services-company")}
      />
      {children}
    </>
  );
}
```

## 🔧 Required Schema Components

### Schema Generation Utilities
- `MarketingPageSchema` - Structured data component
- `createMarketingPageData` - Schema data creation utility
- `createMetadata` - Meta tag creation utility
- `createFullUrl` - URL generation utility

## 📊 Schema Markup Structure

### Schema Types Generated
- **Organization Schema:** Company information
- **LocalBusiness Schema:** Location-specific business
- **Service Schema:** Service offerings
- **WebPage Schema:** Page information
- **BreadcrumbList Schema:** Navigation structure
- **FAQPage Schema:** FAQ structured data
- **Review Schema:** Customer testimonials

### Schema Data Structure
```typescript
const pageData = {
  title: "Page title",
  description: "Page description",
  path: "/page-url",
  serviceType: "Digital Marketing Agency",
  faqs: [
    {
      question: "FAQ question",
      answer: "FAQ answer"
    }
  ],
  reviews: [
    {
      author: "Client name",
      rating: 5,
      text: "Testimonial text"
    }
  ],
  aggregateRating: {
    rating: 4.9,
    reviewCount: 156,
    bestRating: 5
  },
  image: "https://example.com/image.jpg"
}
```

## 🎯 Meta Tags Structure

### Meta Tag Requirements
- **Title:** 50-60 characters with location + service
- **Description:** 150-160 characters with local keywords
- **Keywords:** Location-specific terms naturally integrated

### Meta Tag Generation
```typescript
const baseMetadata: Metadata = {
  title: "SEO Services Agency [Location] | Best SEO Company [Location]",
  description: "Location-specific meta description with local keywords and value proposition.",
};

export const metadata = createMetadata(
  baseMetadata,
  "/[location]-seo-services-company"
);
```

## 🚀 Implementation Checklist

### Schema & Metadata Setup
- [ ] Create data.tsx with FAQs and testimonials
- [ ] Implement layout.tsx with metadata structure
- [ ] Configure baseMetadata with location-specific title and description
- [ ] Set up createMetadata utility with proper URL
- [ ] Implement createMarketingPageData with schema data
- [ ] Add MarketingPageSchema component with structured data
- [ ] Validate schema markup with Google's Rich Results Test

### Validation
- [ ] Test meta title length (50-60 characters)
- [ ] Test meta description length (150-160 characters)
- [ ] Validate schema markup with structured data testing tools
- [ ] Check for proper local keyword integration
- [ ] Verify FAQ schema implementation
- [ ] Test review schema with testimonials
- [ ] Ensure proper breadcrumb schema

This structure ensures proper schema and metadata generation for location-based SEO and marketing pages.