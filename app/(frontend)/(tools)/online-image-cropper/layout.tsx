import type { Metadata } from "next";
import { Suspense } from "react";
import {
  DynamicToolLayout,
  generateToolMetadata,
} from "@/components/layout/dynamic-tool-layout";
import "./faq-loader";
import { OnlineImageCropperSEOContent } from "./seo-content"
import { ToolContentSwitch } from '@/components/i18n/tool-content-switch';

export const metadata: Metadata = generateToolMetadata("online-image-cropper");

export const dynamic = "force-static";

function PageFallback() {
  return (
    <div
      className="container mx-auto px-4 py-6 min-h-[200px] animate-pulse bg-muted/30 rounded-lg"
      aria-hidden="true"
    />
  );
}

export default function OnlineImageCropperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DynamicToolLayout toolSlug="online-image-cropper">
      <Suspense fallback={<PageFallback />}>{children}</Suspense>
      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <ToolContentSwitch slug="online-image-cropper" codeFallback={<OnlineImageCropperSEOContent />} />
      </div>
    </DynamicToolLayout>
  );
}

