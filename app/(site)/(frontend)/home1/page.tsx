import { Suspense } from "react";
import { ToolsSection } from "@/components/tools/tools-section";
import { HomeSeoContent } from "@/components/sections/home-seo-content";
import { homeFaqData } from "@/lib/home-faq-data";
import StaticPageSchema from "@/components/seo/StaticPageSchema";

function ToolsSectionFallback() {
  return (
    <div className="container mx-auto px-4 py-8" aria-hidden="true">
      <div className="mb-8 h-24 animate-pulse rounded-lg bg-muted" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <StaticPageSchema pageType="homepage" />
      <Suspense fallback={<ToolsSectionFallback />}>
        <ToolsSection searchQuery="" />
      </Suspense>
      <HomeSeoContent faqData={[...homeFaqData]} />
    </>
  );
}
