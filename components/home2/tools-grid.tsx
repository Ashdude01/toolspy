"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileImage,
  FileText,
  Calculator,
  Code,
  Search,
  Filter,
  Sparkle,
  Target,
  Download,
  Heart,
  Shield,
  Wrench,
  GraduationCap,
  DollarSign,
  RefreshCw,
  Terminal,
  Bot,
  FileJson,
  SearchIcon,
} from "lucide-react";
import {
  tools,
  toolCategories,
  getToolsByCategory,
  Tool,
  ToolCategory,
} from "@/lib/tools-data";
import React from "react";
import Link from "next/link";
import { TypewriterText } from "@/components/ui/typewriter-text";
import { ToolCard } from "@/components/tools/tool-card";

interface ToolsGridProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ToolsGrid({ searchQuery, onSearchChange }: ToolsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ToolCategory | "all"
  >("all");
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);

  const categorizedTools = getToolsByCategory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const popularTools = tools.filter((tool) => tool.featured);

  // Filter tools based on search and category
  const filterTools = () => {
    let filtered = tools;

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowercaseQuery) ||
          tool.description.toLowerCase().includes(lowercaseQuery) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
    }

    setFilteredTools(filtered);
  };

  // Trigger filter when search or category changes
  React.useEffect(() => {
    filterTools();
  }, [searchQuery, selectedCategory]);

  const hasFilters = searchQuery.trim() || selectedCategory !== "all";

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "image-tools":
        return <FileImage className="h-6 w-6" />;
      case "pdf-tools":
        return <FileText className="h-6 w-6" />;
      case "calculators":
        return <Calculator className="h-6 w-6" />;
      case "base64-tools":
        return <Code className="h-6 w-6" />;
      case "misc-tools":
        return <Wrench className="h-6 w-6" />;
      case "json-tools":
        return <FileJson className="h-6 w-6" />;
      case "ai-tools":
        return <Bot className="h-6 w-6" />;
      case "code-tools":
        return <Terminal className="h-6 w-6" />;
      case "conversion-tools":
        return <RefreshCw className="h-6 w-6" />;
      case "gst-tools":
        return <DollarSign className="h-6 w-6" />;
      case "exam-tools":
        return <GraduationCap className="h-6 w-6" />;
      default:
        return <Wrench className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: ToolCategory) => {
    switch (category) {
      case "image-tools":
        return "from-green-500 to-emerald-500";
      case "pdf-tools":
        return "from-red-500 to-pink-500";
      case "calculators":
        return "from-blue-500 to-cyan-500";
      case "base64-tools":
        return "from-purple-500 to-violet-500";
      case "misc-tools":
        return "from-orange-500 to-amber-500";
      case "json-tools":
        return "from-indigo-500 to-blue-500";
      case "ai-tools":
        return "from-pink-500 to-rose-500";
      case "code-tools":
        return "from-slate-500 to-gray-500";
      case "conversion-tools":
        return "from-teal-500 to-cyan-500";
      case "gst-tools":
        return "from-yellow-500 to-orange-500";
      case "exam-tools":
        return "from-violet-500 to-purple-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  // Dynamic words for typewriter effect
  const typewriterWords = [
    "Image Files",
    "PDF Docs",
    "Base64 Data",
    "Calculations",
    "Conversions",
    "JSON Data",
    "Code Snippets",
    "AI Content",
  ];

  const stats = [
    {
      label: "Professional Tools",
      value: "80+",
      icon: <Target className="h-5 w-5" />,
    },
    {
      label: "Max File Size",
      value: "100MB",
      icon: <Download className="h-5 w-5" />,
    },
    { label: "Free Forever", value: "∞", icon: <Heart className="h-5 w-5" /> },
    {
      label: "Private & Secure",
      value: "100%",
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <section id="tools" className="pt-8 pb-12 dark:bg-slate-950 px-4 w-full">
      <div className="container mx-auto px-0">
        {/* Background Elements */}

        <div className="text-center max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
              }`}
          >
            <Badge
              variant="outline"
              className="font-semibold mb-3 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 animate-pulse"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • Free
            </Badge>

            <h1 className="flex flex-col items-center lg:gap-4 justify-center leading-10 lg:flex-row text-black dark:text-white text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 transform transition-all duration-500 ease-out px-2">
              {/* Complete, crawlable H1 text (screen-reader + SEO). The animated
                  typewriter below is decorative only (aria-hidden), so crawlers
                  and assistive tech always get the full heading. */}
              <span className="sr-only">
                Expert Tools for Images, PDFs, Calculators, GST &amp; Exam
                Predictors - Free Online
              </span>
              <span aria-hidden="true" className="text-center">Expert Tools for </span>
              {/* <span className="text-3xl sm:text-4xl lg:t/ext-5xl">Your </span> */}
              <span aria-hidden="true" className="contents">
                <TypewriterText
                  staticText=""
                  words={typewriterWords}
                  typingSpeed={20}
                  deletingSpeed={20}
                  pauseTime={2500}
                  // className="inline-block !text-inherit !leading-snug lg:min-w-96 text-start"
                  className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text leading-normal text-transparent animate-gradient lg:min-w-96 text-center lg:text-left max-w-full"
                />
              </span>
              {/* <span className="text-3xl sm:text-4xl lg:text-5xl"> Instantly</span> */}
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Convert, compress, calculate, and process your files instantly.
              No registration required
              , completely free, and your privacy is protected.
            </p>
          </div>

          {/* Quick Stats */}
          {/* <div
            className={`hidden md:grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow duration-200 transform-gpu"
              >
                <div className="flex justify-center mb-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-8 w-full px-2">
          {/* Enhanced Search Bar */}
          <div className="mx-auto mb-8 transition-all duration-1000 delay-300 opacity-100 translate-y-0 w-full">
            <div className="relative group w-full">
              {/* Background glow effect */}
              {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div> */}

              {/* Main search container */}
              <div className="relative pl-3 pr-0 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 w-full transform-gpu">
                <div
                  // onSubmit={handleSubmit}
                  className="flex items-center py-1.5 flex-row gap-2 sm:gap-4 w-full"
                >
                  {/* Search icon with animation */}
                  <div className="items-center hidden md:flex justify-center flex-shrink-0">
                    <Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400 group-focus-within:text-blue-500 transition-all duration-300 group-hover:scale-110" />
                  </div>

                  {/* Input field */}
                  <input
                    type="search"
                    name="keyword"
                    placeholder="Search 100+ professional tools..."
                    className="flex-1 min-w-0 border-none !active:outline-none !outline-none !active:border-none shadow-none !focus:border-none bg-transparent text-base sm:text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 !focus:ring-0 !focus:outline-none text-slate-800 dark:text-slate-200"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />

                  <Button
                    type="button"
                    size="sm"
                    className="mr-2 h-10 px-4 sm:px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full"
                  >
                    <SearchIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </Button>
                </div>
                {/* Suggesstion */}
                {/* <div className="group-hover:opacity-100 p-3 z-10">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Try:
                    </span>
                    <Link
                      href="/image-compressor"
                      className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full"
                    >
                      image compressor
                    </Link>
                    <Link
                      href="/pdf-converter"
                      className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full"
                    >
                      PDF converter
                    </Link>
                    <Link
                      href="/base64-encoder-decoder"
                      className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full"
                    >
                      base64 encoder
                    </Link>
                  </div>
                </div> */}
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2"
            style={{
              scrollbarWidth: "thin",
              scrollBehavior: "smooth",
              scrollMarginBlock: "10px",
            }}
          >
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="hover:border-slate-400 shadow-none text-xs sm:text-sm"
            >
              Popular
            </Button>
            {Object.entries(toolCategories).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key as ToolCategory)}
                className="hover:border-slate-400 shadow-none text-xs sm:text-sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Tools Grid */}
        {!hasFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 mb-12 px-2">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}

        {/* Search Results */}
        {hasFilters && (
          <div className="max-w-6xl mx-auto w-full px-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                  {searchQuery.trim()
                    ? `Search Results for "${searchQuery}"`
                    : "Filtered Tools"}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {filteredTools.length} tool
                  {filteredTools.length !== 1 ? "s" : ""} found
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSearchChange("");
                  setSelectedCategory("all");
                }}
                className="hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Filter className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} truncateDescription={60} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-slate-400" />
                </div>
                <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  No tools found
                </h4>
                <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-md mx-auto">
                  {searchQuery.trim()
                    ? `No tools match "${searchQuery}". Try different keywords or browse categories.`
                    : "No tools found in this category. Try selecting a different category."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      onSearchChange("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                  <Button variant="default" asChild>
                    <Link href="/contact">Request a Tool</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
