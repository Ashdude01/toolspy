"use client";

import { useState } from "react";
import { ToolsGrid } from "@/components/home2/tools-grid";
import { FeaturesSection } from "@/components/home2/features-section";
import { TestimonialsSection } from "@/components/home2/testimonials-section";
import { BrowseCategoriesSection } from "@/components/home2/BrowseCategoriesSection";
import StaticPageSchema from "@/components/seo/StaticPageSchema";
import { useSearchParams } from "next/navigation";

export default function HomePageV2() {
  const params = useSearchParams();
  const search = params?.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(search);

  return (
    <>
      <StaticPageSchema pageType="homepage" />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
        <ToolsGrid searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <BrowseCategoriesSection />
        <FeaturesSection />
        <TestimonialsSection />
      </div>
    </>
  );
}
