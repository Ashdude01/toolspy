"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
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
import { useLocale, useT } from "@/lib/i18n/use-t";
import { localizeHref } from "@/lib/i18n/localize-href";
import { getToolCopy } from "@/lib/i18n/get-tool-copy";

export function BrowseCategoriesSection() {
  const categorizedTools = getToolsByCategory();
  const locale = useLocale();
  const t = useT();

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
    <section className="py-16 overflow-x-hidden w-full">
      <div className="container mx-auto px-0">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Browse by Category
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore Tools by <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Find the perfect tools for your specific needs. Each category is
            carefully curated with professional-grade utilities.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="category-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {Object.entries(toolCategories).map(
            ([categoryKey, category]) => {
              const categoryType = categoryKey as ToolCategory;
              const stats = getCategoryStats(categoryType);
              const sampleTools = (categorizedTools[categoryType] || []).slice(0, 4);

              return (
                <div key={categoryKey} className="group relative h-full">
                  <Link
                    href={`/tools/${categoryKey}`}
                    className="absolute inset-0 z-0 rounded-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    aria-label={t(`categories.${categoryKey}`)}
                  />
                  <div className="relative z-10 pointer-events-none h-full bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-md group-hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                    <div className="relative p-6 h-full flex flex-col">
                      <div className="absolute top-0 right-0 p-2 pb-3 pl-3 bg-foreground/5 rounded-bl-3xl">
                        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
                          {stats.count}
                        </div>
                      </div>
                      <div className="flex justify-between mb-2 gap-3">
                        <div
                          className={`w-20 h-20 h-fit p-3 bg-gradient-to-br ${getCategoryColor(
                            categoryType
                          )} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 transform-gpu`}
                        >
                          {getCategoryIcon(categoryType)}
                        </div>
                        <div className="">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                            {t(`categories.${categoryKey}`)}
                          </h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                            {category.description}
                          </p>

                        </div>
                      </div>

                      {/* <div className="flex-1"> */}


                        {/* <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-green-500" aria-hidden />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {t('homeCategories.featured', { count: stats.featured })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-blue-500" aria-hidden />
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {t('homeCategories.popular')}
                            </span>
                          </div>
                        </div>*/}
                      {/* </div> */}

                      {sampleTools.length > 0 && (
                        <ul className="flex flex-wrap gap-2 pointer-events-auto">
                          {sampleTools.map((tool) => (
                            <li key={tool.slug}>
                              <Link
                                href={localizeHref(locale, tool.path.endsWith('/') ? tool.path : `${tool.path}/`)}
                                className="relative z-20 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-blue-300 hover:text-blue-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:text-blue-300"
                              >
                                {getToolCopy(tool.slug, locale).name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-800 rounded-2xl px-4 sm:px-8 py-4 border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
            <div className="text-center sm:text-left">
              <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm sm:text-base">
                Can't find what you're looking for?
              </div>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                Request a new tool or category
              </div>
            </div>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-shadow duration-200 w-full sm:w-auto transform-gpu">
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
