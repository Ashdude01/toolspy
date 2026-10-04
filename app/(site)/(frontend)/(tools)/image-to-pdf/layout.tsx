import type { Metadata } from "next";
import { Suspense } from "react";
import {
  generateToolMetadata,
  DynamicToolLayout,
} from "@/components/layout/dynamic-tool-layout";
import "./faq-loader";
import { ImageToPdfSEOContent } from "./seo-content"
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero';

export const metadata: Metadata = generateToolMetadata("image-to-pdf");

export const dynamic = "force-static";

function ImageToPdfPageFallback() {
  return null
}

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="image-to-pdf">
      <CmsToolHero slug="image-to-pdf" locale="en" />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<ImageToPdfPageFallback />}>{children}</Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="image-to-pdf" locale="en" codeFallback={<ImageToPdfSEOContent />} />
      </div>
    </DynamicToolLayout>
  );
}
