"use client";

import { ToolCategory } from "@/lib/tools-data";
import { ImageToolsSEOContent } from "./category-content/image-tools-seo";
import { PDFToolsSEOContent } from "./category-content/pdf-tools-seo";
import { Base64ToolsSEOContent } from "./category-content/base64-tools-seo";
import { CalculatorsSEOContent } from "./category-content/calculators-seo";
import { MiscToolsSEOContent } from "./category-content/misc-tools-seo";
import { JSONToolsSEOContent } from "./category-content/json-tools-seo";
import { AIToolsSEOContent } from "./category-content/ai-tools-seo";
import { CodeToolsSEOContent } from "./category-content/code-tools-seo";
import { ConversionToolsSEOContent } from "./category-content/conversion-tools-seo";

interface CategorySEOContentProps {
  category: ToolCategory;
}

export function CategorySEOContent({ category }: CategorySEOContentProps) {
  switch (category) {
    case 'image-tools':
      return <ImageToolsSEOContent />;
    case 'pdf-tools':
      return <PDFToolsSEOContent />;
    case 'base64-tools':
      return <Base64ToolsSEOContent />;
    case 'calculators':
      return <CalculatorsSEOContent />;
    case 'misc-tools':
      return <MiscToolsSEOContent />;
    case 'json-tools':
      return <JSONToolsSEOContent />;
    case 'ai-tools':
      return <AIToolsSEOContent />;
    case 'code-tools':
      return <CodeToolsSEOContent />;
    case 'conversion-tools':
      return <ConversionToolsSEOContent />;
    default:
      return null;
  }
}
