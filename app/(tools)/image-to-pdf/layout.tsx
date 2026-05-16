import type { Metadata } from "next";
import { Suspense } from "react";
import {
  generateToolMetadata,
  DynamicToolLayout,
} from "@/components/layout/dynamic-tool-layout";
import "./faq-loader";
import { ImageToPdfSEOContent } from "./seo-content";

export const metadata: Metadata = generateToolMetadata("image-to-pdf");

export const dynamic = "force-static";

function ImageToPdfPageFallback() {
  return (
    <div
      className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg"
      aria-hidden="true"
    />
  );
}

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicToolLayout toolSlug="image-to-pdf">
      <Suspense fallback={<ImageToPdfPageFallback />}>{children}</Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ImageToPdfSEOContent />
      </div>
    </DynamicToolLayout>
  );
}
