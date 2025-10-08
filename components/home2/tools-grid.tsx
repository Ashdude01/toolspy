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

interface ToolsGridProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function ToolsGrid({ searchQuery, onSearchChange }: ToolsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    ToolCategory | "all"
  >("all");
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categorizedTools = getToolsByCategory();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const popularTools = tools.slice(0, 6);

  // Filter tools based on search and category
  const filterTools = () => {
    setIsLoading(true);
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
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  // Trigger filter when search or category changes
  React.useEffect(() => {
    filterTools();
  }, [searchQuery, selectedCategory]);

  const hasFilters = searchQuery.trim() || selectedCategory !== "all";

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'image-tools':
        return <FileImage className="h-6 w-6" />
      case 'pdf-tools':
        return <FileText className="h-6 w-6" />
      case 'calculators':
        return <Calculator className="h-6 w-6" />
      case 'base64-tools':
        return <Code className="h-6 w-6" />
      case 'misc-tools':
        return <Wrench className="h-6 w-6" />
      case 'json-tools':
        return <FileJson className="h-6 w-6" />
      case 'ai-tools':
        return <Bot className="h-6 w-6" />
      case 'code-tools':
        return <Terminal className="h-6 w-6" />
      case 'conversion-tools':
        return <RefreshCw className="h-6 w-6" />
      case 'gst-tools':
        return <DollarSign className="h-6 w-6" />
      case 'exam-tools':
        return <GraduationCap className="h-6 w-6" />
      default:
        return <Wrench className="h-6 w-6" />
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "image":
        return "from-green-500 to-emerald-500";
      case "pdf":
        return "from-red-500 to-pink-500";
      case "calculator":
        return "from-blue-500 to-cyan-500";
      case "encoding":
        return "from-purple-500 to-violet-500";
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
      value: "70+",
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
    <section id="tools" className="pt-8 pb-12 px-4 dark:bg-slate-950">
      <div className="container mx-auto px-0">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center max-w-7xl mx-auto">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge
              variant="outline"
              className="font-semibold mb-3 text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800 animate-pulse"
            >
              <Shield className="w-4 h-4 mr-2" />
              Privacy-First • No Data Collection • Free Forever
            </Badge>

            <h1 className="flex flex-col items-center lg:gap-4 justify-center leading-6 lg:flex-row  text-black dark:text-white text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 transform transition-all duration-500 ease-out">
              <span className="text-center">Expert Tools for </span>
              {/* <span className="text-3xl sm:text-4xl lg:t/ext-5xl">Your </span> */}
              <TypewriterText
                staticText=""
                words={typewriterWords}
                typingSpeed={20}
                deletingSpeed={20}
                pauseTime={2500}
                // className="inline-block !text-inherit !leading-snug lg:min-w-96 text-start"
                className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text leading-normal text-transparent animate-gradient lg:min-w-96 text-center lg:text-left"
              />
              {/* <span className="text-3xl sm:text-4xl lg:text-5xl"> Instantly</span> */}
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Convert, compress, calculate, and process your files instantly.
              <span className="font-semibold text-blue-600 dark:text-blue-400">
                {" "}
                No registration required
              </span>
              , completely free, and your privacy is protected.
            </p>
          </div>

          {/* Quick Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 hover:scale-105 transition-transform duration-300 group"
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
          </div>
        </div>


        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto mb-8">
         

          {/* Enhanced Search Bar */}
          <div className="mx-auto mb-8 transition-all duration-1000 delay-300 opacity-100 translate-y-0">
            <div className="relative group">
              {/* Background glow effect */}
              {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div> */}

              {/* Main search container */}
              <div className="relative px-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <div
                  // onSubmit={handleSubmit}
                  className="flex items-center py-2 flex-row gap-4"
                >
                  {/* Search icon with animation */}
                  <div className="flex items-center justify-center">
                    <Search className="h-6 w-6 text-slate-400 group-focus-within:text-blue-500 transition-all duration-300 group-hover:scale-110" />
                  </div>

                  {/* Input field */}
                  <input
                    type="search"
                    name="keyword"
                    placeholder="Search 100+ professional tools..."
                    className="flex-1 !active:outline-none !outline-none !active:border-none shadow-none !focus:border-none bg-transparent text-lg placeholder:text-slate-400 dark:placeholder:text-slate-500 !focus:ring-0 !focus:outline-none text-slate-800 dark:text-slate-200"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />

                  <Button
                    type="submit"
                    size="sm"
                    className="mr-2 h-10 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                  >
                    <Sparkle className="h-4 w-4 mr-2" />
                    Search
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
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
              className="hover:border-slate-400 shadow-none"
            >
              Popular
            </Button>
            {Object.entries(toolCategories).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key as ToolCategory)}
                className="hover:border-slate-400 shadow-none"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Popular Tools Grid */}
        {!hasFilters && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-12">
            {popularTools.map((tool, index) => (
              <Link
                key={tool.id}
                href={`/${tool.slug}`}
                className="group block"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                  {/* Main card */}
                  <div className="relative min-h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-300 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                      <div className="w-full h-full bg-white/90 dark:bg-slate-800/90 rounded-xl"></div>
                    </div>

                    <div className="relative">
                      {/* Header with icon and badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${getCategoryColor(
                              tool.category
                            )} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                          >
                            {getCategoryIcon(tool.category)}
                          </div>
                          {/* Floating particles effect */}
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {toolCategories[tool.category]?.name}
                        </Badge>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {tool.name}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Search Results */}
        {hasFilters && (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
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

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {[...Array(6)].map((_, i) => (
                  <Card
                    key={i}
                    className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                  >
                    <CardHeader>
                      <div className="h-12 w-12 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredTools.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filteredTools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    href={`/${tool.slug}`}
                    className="group block"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                      {/* Main card */}
                      <div className="relative h-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-300 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-xl transition-all duration-500 p-6 overflow-hidden">
                        {/* Animated border gradient */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                          <div className="w-full h-full bg-white/90 dark:bg-slate-800/90 rounded-xl"></div>
                        </div>

                        <div className="relative">
                          {/* Header with icon and badge */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="relative">
                              <div
                                className={`w-12 h-10 bg-gradient-to-br ${getCategoryColor(
                                  tool.category
                                )} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                              >
                                {getCategoryIcon(tool.category)}
                              </div>
                              {/* Floating particles effect */}
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500"></div>
                            </div>
                            <Badge variant="outline" className="text-xs hidden md:block">
                              {toolCategories[tool.category]?.name}
                            </Badge>
                          </div>

                          {/* Content */}
                          <div>
                            <h3 className="text-lg leading-normal font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              {tool.name}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                              {tool.description.slice(0, 60)}...
                            </p>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                      </div>
                  </Link>
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
                  <Link href="/contact"><Button variant="default">Request a Tool</Button></Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
