"use client";

import { useState, useEffect } from "react";
import { ToolCard } from "./tool-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Shield, } from "lucide-react";
import {
  Tool,
  ToolCategory,
  toolCategories,
  tools,
  getToolsByCategory,
} from "@/lib/tools-data";
import Link from "next/link";

interface ToolsSectionProps {
  searchQuery?: string;
}

export function ToolsSection({
  searchQuery: initialSearchQuery,
}: ToolsSectionProps) {
  const [toolsData] = useState<Tool[]>(tools);
  const [categorizedTools] = useState<Record<ToolCategory, Tool[]>>(
    getToolsByCategory()
  );
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [selectedCategory, setSelectedCategory] = useState<
    ToolCategory | "all"
  >("all");
  const [loading, setLoading] = useState(false);

  // Filter tools when search query or category changes
  useEffect(() => {
    filterTools();
  }, [searchQuery, selectedCategory, toolsData]);

  // Update search query from props
  useEffect(() => {
    if (initialSearchQuery !== undefined) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const filterTools = () => {
    let filtered = toolsData;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }

    // Filter by search query
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

  const handleCategoryChange = (category: ToolCategory | "all") => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const hasFilters = searchQuery.trim() || selectedCategory !== "all";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 min:w-full">
          <Badge variant="outline" className="mb-4 font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900">
            <Shield className="w-4 h-4 mr-2" />
           Privacy-First • No Data Collection
          </Badge>

          {/* Main Heading */}
          <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Professional Tools Made Simple
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our collection of free, secure, and easy-to-use web
            tools
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange("all")}
            >
              All Tools
            </Button>
            {Object.entries(toolCategories).map(([key, category]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(key as ToolCategory)}
                className="flex-grow-0"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {hasFilters ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">
                Search Results ({filteredTools.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Clear Filters
              </Button>
            </div>

            {filteredTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No tools found matching your criteria.
                </p>
                <Link href="/contact" >
                  <Button variant="outline" className="mt-2" size="sm">
                    Request a Tool
                  </Button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          /* Categorized Tools */
          <div className="space-y-12 py-6">
            {Object.entries(toolCategories).map(
              ([categoryKey, categoryInfo]) => {
                const categoryTools =
                  categorizedTools[categoryKey as ToolCategory] || [];

                if (categoryTools.length === 0) return null;

                return (
                  <div key={categoryKey}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-3xl">{categoryInfo.icon}</div>
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {categoryInfo.name}
                        </h3>
                        <p className="text-muted-foreground">
                          {categoryInfo.description}
                        </p>
                      </div>
                      {/* <Badge variant="secondary" className="ml-auto">
                        {categoryTools.length}{" "}
                        {categoryTools.length === 1 ? "tool" : "tools"}
                      </Badge> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                      ))}
                    </div>

                    <Separator className="mt-12" />
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </section>
  );
}
