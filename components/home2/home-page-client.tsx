"use client";

import { useState } from "react";
import { ToolsGrid } from "@/components/home2/tools-grid";
import { FeaturesSection } from "@/components/home2/features-section";
import { BrowseCategoriesSection } from "@/components/home2/BrowseCategoriesSection";

/**
 * Client-only section for home: search state + interactive grid/categories/features.
 * Kept separate so the rest of the home page (SEO content) can be server-rendered.
 */
export function HomePageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <ToolsGrid searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BrowseCategoriesSection />
      <FeaturesSection />
    </>
  );
}
