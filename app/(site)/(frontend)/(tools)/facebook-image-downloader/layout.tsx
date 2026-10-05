import type { Metadata } from "next";
import { Suspense } from "react";
import { generateToolMetadata, DynamicToolLayout } from "@/components/layout/dynamic-tool-layout"
import { CmsToolHero } from '@/components/i18n/cms-tool-hero';
import "./faq-loader";

export const metadata: Metadata = generateToolMetadata("facebook-image-downloader");
export const dynamic = "force-static";

function FacebookImageDownloaderPageFallback() {
  return null
}

export default function FacebookImageDownloaderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="facebook-image-downloader">
      <CmsToolHero slug="facebook-image-downloader" locale="en" />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<FacebookImageDownloaderPageFallback />}>{children}</Suspense>
      </div>
    </DynamicToolLayout>
  );
}
