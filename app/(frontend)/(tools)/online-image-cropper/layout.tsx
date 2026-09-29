import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DynamicToolLayout,
  generateToolMetadata,
} from "@/components/layout/dynamic-tool-layout";
import "./faq-loader";
import { OnlineImageCropperSEOContent } from "./seo-content"
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch'
import { CmsToolHero } from '@/components/i18n/cms-tool-hero';

export const metadata: Metadata = generateToolMetadata("online-image-cropper");

export const dynamic = "force-static";

function PageFallback() {
  return null
}

export default function OnlineImageCropperLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DynamicToolLayout toolSlug="online-image-cropper">
      <CmsToolHero slug="online-image-cropper" locale="en" />
      <div className="contents [&_.tool-legacy-hero]:hidden">
        <Suspense fallback={<PageFallback />}>{children}</Suspense>
      </div>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="online-image-cropper" locale="en" codeFallback={<OnlineImageCropperSEOContent />} />
      </div>
    </DynamicToolLayout>
  );
}

