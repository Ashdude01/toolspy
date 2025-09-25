"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  FileImage,
  FileText,
  Calculator,
  Code,
  Search,
  Filter
} from "lucide-react"
import { tools, toolCategories, getToolsByCategory, Tool, ToolCategory } from "@/lib/tools-data"
import React from "react"
import Link from "next/link"

interface ToolsGridProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function ToolsGrid({ searchQuery, onSearchChange }: ToolsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | "all">("all")
  const [filteredTools, setFilteredTools] = useState<Tool[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const categorizedTools = getToolsByCategory()
  const popularTools = tools.slice(0, 6)

  // Filter tools based on search and category
  const filterTools = () => {
    setIsLoading(true)
    let filtered = tools

    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (tool) =>
          tool.name.toLowerCase().includes(lowercaseQuery) ||
          tool.description.toLowerCase().includes(lowercaseQuery) ||
          tool.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery))
      )
    }

    setFilteredTools(filtered)
    setTimeout(() => setIsLoading(false), 300) // Simulate loading
  }

  // Trigger filter when search or category changes
  React.useEffect(() => {
    filterTools()
  }, [searchQuery, selectedCategory])

  const hasFilters = searchQuery.trim() || selectedCategory !== "all"

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <FileImage className="h-6 w-6" />
      case 'pdf':
        return <FileText className="h-6 w-6" />
      case 'calculator':
        return <Calculator className="h-6 w-6" />
      case 'encoding':
        return <Code className="h-6 w-6" />
      default:
        return <FileImage className="h-6 w-6" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'image':
        return 'from-green-500 to-emerald-500'
      case 'pdf':
        return 'from-red-500 to-pink-500'
      case 'calculator':
        return 'from-blue-500 to-cyan-500'
      case 'encoding':
        return 'from-purple-500 to-violet-500'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <section id="tools" className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Most Popular Tools
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Discover our most-used professional tools that millions trust for their daily digital tasks.
          </p>
        </div>

        {/* Popular Tools Grid */}
        {!hasFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {popularTools.map((tool, index) => (
              <Card 
                key={tool.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(tool.category)} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                      {getCategoryIcon(tool.category)}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {toolCategories[tool.category]?.name}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/${tool.slug}`}>
                    <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className="transition-all duration-200 hover:scale-105"
          >
            All Tools
          </Button>
          {Object.entries(toolCategories).map(([key, category]) => (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(key as ToolCategory)}
              className="transition-all duration-200 hover:scale-105"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Search Results */}
        {hasFilters && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold">
                Search Results ({filteredTools.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onSearchChange("")
                  setSelectedCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool, index) => (
                  <Card 
                    key={tool.id} 
                    className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-r ${getCategoryColor(tool.category)} rounded-lg flex items-center justify-center text-white text-xl group-hover:scale-110 transition-transform duration-300`}>
                          {getCategoryIcon(tool.category)}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {toolCategories[tool.category]?.name}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-slate-600 dark:text-slate-300">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={`/${tool.slug}`}>
                        <Button className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                          Use Tool
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-12 w-12 text-slate-400" />
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-lg mb-4">
                  No tools found matching your criteria.
                </p>
                <Button variant="outline">
                  Request a Tool
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
