"use client"

import { useState } from "react"
import { Navigation } from "./components/navigation"
import { HeroSection } from "./components/hero-section"
import { ToolsGrid } from "./components/tools-grid"
import { FeaturesSection } from "./components/features-section"
import { TestimonialsSection } from "./components/testimonials-section"
import { Footer } from "./components/footer"

export default function HomePageV2() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-950 dark:to-indigo-950">
      <Navigation />
      <HeroSection onSearch={setSearchQuery} searchQuery={searchQuery} />
      <ToolsGrid searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </div>
  )
}

