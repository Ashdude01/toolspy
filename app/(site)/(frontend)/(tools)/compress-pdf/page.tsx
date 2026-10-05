"use client";

import dynamic from "next/dynamic";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { Loader2 } from "lucide-react";
import { useT } from "@/lib/i18n/use-t";

function LoadingFallback() {
  const t = useT();
  return (
    <div
      className="container max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-center max-w-md">
        {t('tools.compressPdf.loadingMessage')}
      </p>
    </div>
  );
}

const CompressPdfLazyInner = dynamic(() => import("./compress-pdf-inner"), {
    ssr: false,
    loading: () => <LoadingFallback />,
  }
);

export default function CompressPdfPage() {
  return (
    <ToolPageWrapper toolSlug="compress-pdf">
      <CompressPdfLazyInner />
    </ToolPageWrapper>
  );
}
