"use client"
/**
 * Global tool card - the single card design used everywhere:
 * homepage grid, /tools listing, and category pages.
 * Design: gradient icon square (top-left) + category badge (top-right)
 * + bold tool name + description. Matches the homepage card layout.
 */
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import {
  FileImage,
  FileText,
  Calculator,
  Code,
  Wrench,
  GraduationCap,
  DollarSign,
  RefreshCw,
  Terminal,
  Bot,
  FileJson,
  Clock,
} from 'lucide-react';
import { Tool, ToolCategory } from '@/lib/tools-data';
import { useT, useLocale } from '@/lib/i18n/use-t';
import { getToolCopy } from '@/lib/i18n/get-tool-copy';
import { localizeHref } from '@/lib/i18n/localize-href';

export function getCategoryIcon(category: string, className = 'h-6 w-6') {
  switch (category) {
    case 'image-tools':
      return <FileImage className={className} />;
    case 'pdf-tools':
      return <FileText className={className} />;
    case 'calculators':
      return <Calculator className={className} />;
    case 'base64-tools':
      return <Code className={className} />;
    case 'misc-tools':
      return <Wrench className={className} />;
    case 'json-tools':
      return <FileJson className={className} />;
    case 'ai-tools':
      return <Bot className={className} />;
    case 'code-tools':
      return <Terminal className={className} />;
    case 'conversion-tools':
      return <RefreshCw className={className} />;
    case 'gst-tools':
      return <DollarSign className={className} />;
    case 'exam-tools':
      return <GraduationCap className={className} />;
    default:
      return <Wrench className={className} />;
  }
}

export function getCategoryColor(category: ToolCategory | string) {
  switch (category) {
    case 'image-tools':
      return 'from-green-500 to-emerald-500';
    case 'pdf-tools':
      return 'from-red-500 to-pink-500';
    case 'calculators':
      return 'from-blue-500 to-cyan-500';
    case 'base64-tools':
      return 'from-purple-500 to-violet-500';
    case 'misc-tools':
      return 'from-orange-500 to-amber-500';
    case 'json-tools':
      return 'from-indigo-500 to-blue-500';
    case 'ai-tools':
      return 'from-pink-500 to-rose-500';
    case 'code-tools':
      return 'from-slate-500 to-gray-500';
    case 'conversion-tools':
      return 'from-teal-500 to-cyan-500';
    case 'gst-tools':
      return 'from-yellow-500 to-orange-500';
    case 'exam-tools':
      return 'from-violet-500 to-purple-500';
    default:
      return 'from-gray-500 to-slate-500';
  }
}

interface ToolCardProps {
  tool: Tool;
  className?: string;
  /** Trim long descriptions (used in dense grids). Default: full description. */
  truncateDescription?: number;
  /** Hide the category badge (e.g., on category pages where it is redundant). */
  showCategoryBadge?: boolean;
}

export function ToolCard({
  tool,
  className,
  truncateDescription,
  showCategoryBadge = true,
}: ToolCardProps) {
  const t = useT();
  const locale = useLocale();
  const copy = getToolCopy(tool.slug, locale);
  const isClickable = tool.status === 'active';
  const description =
    truncateDescription && copy.description.length > truncateDescription
      ? `${copy.description.slice(0, truncateDescription)}...`
      : copy.description;

  const cardInner = (
    <div
      className={`relative h-full bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-700 transition-shadow duration-200 p-6 ${
        isClickable
          ? 'hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
          : 'opacity-75'
      }`}
    >
      <div className="relative">
        {/* Header: gradient icon square + category badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-1.5 bg-gradient-to-br ${getCategoryColor(
              tool.category
            )} rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200 transform-gpu`}
          >
            {getCategoryIcon(tool.category)}
          </div>
          {tool.status === 'coming-soon' ? (
            <Badge variant="outline" className="text-xs">
              <span className="inline-flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {t('common.comingSoon')}
              </span>
            </Badge>
          ) : showCategoryBadge ? (
            <Badge variant="outline" className="text-xs">
              {t(`categories.${tool.category}` as 'categories.image-tools')}
            </Badge>
          ) : null}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {copy.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Decorative hover elements */}
      <div
        className="absolute top-4 right-4 w-16 h-16
          bg-gradient-to-br
          from-red-600/10 to-yellow-400/10
          dark:from-yellow-400/10 dark:to-zinc-300/10
          rounded-full
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none"
      ></div>
      <div
        className="absolute bottom-4 left-4 w-12 h-12
          bg-gradient-to-br
          from-purple-600/10 to-cyan-500/10
          dark:from-zinc-400/10 dark:to-red-300/10
          rounded-full
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500 delay-100
          pointer-events-none"
      ></div>
    </div>
  );

  if (!isClickable) {
    return (
      <div className={`group block h-full cursor-not-allowed ${className || ''}`} title={t('common.comingSoon')}>
        {cardInner}
      </div>
    );
  }

  return (
    <Link href={localizeHref(locale, tool.path)} className={`group block h-full ${className || ''}`}>
      {cardInner}
    </Link>
  );
}
