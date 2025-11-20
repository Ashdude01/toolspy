"use client"

import { useState } from "react"
import { ToolsGrid } from "@/components/home2/tools-grid"
import { FeaturesSection } from "@/components/home2/features-section"
import { TestimonialsSection } from "@/components/home2/testimonials-section"
import { BrowseCategoriesSection } from "@/components/home2/BrowseCategoriesSection"

export default function HomePageV2() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 overflow-x-hidden w-full">
      <ToolsGrid searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <BrowseCategoriesSection/>
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  )
}

