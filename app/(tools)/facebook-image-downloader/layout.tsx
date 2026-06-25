import type { Metadata } from "next";
import { Suspense } from "react";
import { generateToolMetadata, DynamicToolLayout } from "@/components/layout/dynamic-tool-layout";
import "./faq-loader";

export const metadata: Metadata = generateToolMetadata("facebook-image-downloader");
export const dynamic = "force-static";

function FacebookImageDownloaderPageFallback() {
  return (
    <div className="min-h-[320px] animate-pulse bg-muted/30" aria-hidden="true" />
  );
}

export default function FacebookImageDownloaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicToolLayout toolSlug="facebook-image-downloader">
      <Suspense fallback={<FacebookImageDownloaderPageFallback />}>{children}</Suspense>
    </DynamicToolLayout>
  );
}
