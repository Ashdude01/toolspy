"use client";

import { useState, useEffect } from "react";
import { ToolCard } from "@/components/tools/tool-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";
import {
  toolCategories,
  ToolCategory,
  getToolsByCategory,
  Tool,
} from "@/lib/tools-data";
import { useSearchParams } from "next/navigation";

interface CategoryToolsClientProps {
  category: ToolCategory;
}

export function CategoryToolsClient({ category }: CategoryToolsClientProps) {
  // Ensure category exists before proceeding
  if (!toolCategories[category]) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">Category not found.</p>
        <Link href="/tools">
          <Button className="mt-4">Browse All Tools</Button>
        </Link>
      </div>
    );
  }

  const categoryInfo = toolCategories[category];
  const allCategoryTools = getToolsByCategory()[category] || [];

  // Use client-side URL parsing for search
  const searchParams = useSearchParams();
  const initialSearchQuery = searchParams?.get("search") || "";

  const [filteredTools, setFilteredTools] = useState<Tool[]>(allCategoryTools);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchQuery);

  useEffect(() => {
    const categoryTools = getToolsByCategory()[category] || [];

    if (searchTerm.trim()) {
      const lowercaseQuery = searchTerm.toLowerCase();
      const filtered = categoryTools.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowercaseQuery) ||
          tool.description.toLowerCase().includes(lowercaseQuery) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      );
      setFilteredTools(filtered);
    } else {
      setFilteredTools(categoryTools);
    }
  }, [category, searchTerm]);

  // Update search term from URL on component mount
  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 pb-10">
      <div className="container mx-auto px-4">
        {/* Category Header */}
        <div className="text-center mb-10">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-4xl font-bold mb-2">{categoryInfo.name}</h1>
            <p className="text-xl text-muted-foreground">
              {categoryInfo.description}
            </p>
          </div>
          <div className="bg-primary/10 inline-block px-4 py-2 rounded-full">
            <span className="text-sm font-medium">
              {allCategoryTools.length}{" "}
              {allCategoryTools.length === 1 ? "tool" : "tools"} available
            </span>
          </div>
        </div>

        {/* Search and Tools */}
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search ${categoryInfo.name.toLowerCase()}...`}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Header */}
          {searchTerm.trim() && (
            <div className="flex items-center justify-center gap-4">
              <span className="text-lg font-semibold">
                Search Results ({filteredTools.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}

          {/* Tools Grid */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} showCategoryBadge={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm.trim()
                  ? `No tools found matching "${searchTerm}" in ${categoryInfo.name.toLowerCase()}.`
                  : `No tools available in ${categoryInfo.name.toLowerCase()}.`}
              </p>
              <div className="flex justify-center gap-4">
                {searchTerm.trim() && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </Button>
                )}
                <Link href="/tools">
                  <Button variant="outline" size="sm">
                    Browse All Tools
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
