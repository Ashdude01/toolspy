"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  FileImage,
  FileText,
  Calculator,
  Code,
  Wrench,
  FileJson,
  Bot,
  Terminal,
  RefreshCw,
  DollarSign,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  toolCategories,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools-data";
import Link from "next/link";

export function BrowseCategoriesSection() {
  const categorizedTools = getToolsByCategory();

  const getCategoryIcon = (category: ToolCategory) => {
    switch (category) {
      case "image-tools":
        return <FileImage className="h-8 w-8" />;
      case "pdf-tools":
        return <FileText className="h-8 w-8" />;
      case "calculators":
        return <Calculator className="h-8 w-8" />;
      case "base64-tools":
        return <Code className="h-8 w-8" />;
      case "misc-tools":
        return <Wrench className="h-8 w-8" />;
      case "json-tools":
        return <FileJson className="h-8 w-8" />;
      case "ai-tools":
        return <Bot className="h-8 w-8" />;
      case "code-tools":
        return <Terminal className="h-8 w-8" />;
      case "conversion-tools":
        return <RefreshCw className="h-8 w-8" />;
      case "gst-tools":
        return <DollarSign className="h-8 w-8" />;
      case "exam-tools":
        return <GraduationCap className="h-8 w-8" />;
      default:
        return <Wrench className="h-8 w-8" />;
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

  const getCategoryStats = (category: ToolCategory) => {
    const tools = categorizedTools[category] || [];
    return {
      count: tools.length,
      featured: tools.filter((tool) => tool.featured).length,
    };
  };

  return (
    <section className="py-16 px-4 bg-gray-100 dark:bg-black relative overflow-x-hidden w-full max-w-full">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl max-w-[90vw]"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl max-w-[90vw]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[96rem] h-96 bg-gradient-to-r from-blue-400/3 to-purple-400/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-0 max-w-full">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Browse by Category
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore Tools by Category
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Find the perfect tools for your specific needs. Each category is
            carefully curated with professional-grade utilities.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2">
          {Object.entries(toolCategories).map(
            ([categoryKey, category], index) => {
              const categoryType = categoryKey as ToolCategory;
              const stats = getCategoryStats(categoryType);

              return (
                <Link key={categoryKey} href={`/tools?category=${categoryKey}`}>
                  <div
                    className="group relative cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                    {/* Main card */}
                    <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                      {/* Animated border gradient */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                        <div className="w-full h-full bg-white/90 dark:bg-slate-800/90 rounded-3xl"></div>
                      </div>

                      <div className="relative p-6 h-full flex flex-col">
                        {/* Header with icon */}
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(
                              categoryType
                            )} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                          >
                            {getCategoryIcon(categoryType)}
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                              {stats.count}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              tools
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                            {category.name}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                            {category.description}
                          </p>

                          {/* Stats */}
                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {stats.featured} featured
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4 text-blue-500" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                Popular
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action button */}
                        <div className="mt-auto">
                          <Button className="w-full h-10 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 hover:from-blue-600 hover:to-purple-600 text-slate-700 dark:text-slate-200 hover:text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            <span className="font-semibold text-sm">
                              Explore Category
                            </span>
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </Button>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-pink-500/5 to-yellow-500/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                    </div>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 px-2">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl px-4 sm:px-8 py-4 border border-slate-200 dark:border-slate-700 w-full sm:w-auto max-w-full">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                Can't find what you're looking for?
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Request a new tool or category
              </div>
            </div>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto">
                <Sparkles className="h-4 w-4 mr-2" />
                Request Tool
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
