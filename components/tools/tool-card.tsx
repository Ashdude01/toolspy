"use client"
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const getStatusBadge = () => {

    if(typeof window !== 'undefined' && window.innerWidth < 768) return null;
    switch (tool.status) {
      case 'active':
        return (
          <Badge variant="secondary" className="text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Live
          </Badge>
        );
      case 'beta':
        return (
          <Badge variant="outline" className="text-xs">
            Beta
          </Badge>
        );
      case 'coming-soon':
        return (
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Coming Soon
          </Badge>
        );
      default:
        return null;
    }
  };

  const isClickable = tool.status === 'active';

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isClickable) {
      return (
        <Link href={tool.path} className={className}>
          {children}
        </Link>
      );
    }
    return <div className={className}>{children}</div>;
  };

  return (
    <CardWrapper>
      <Card className={`h-full transition-all duration-200 ${
        isClickable 
          ? 'hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-900 cursor-pointer' 
          : 'opacity-75 cursor-not-allowed'
      } ring-1 ring-white/5`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{tool.icon}</div>
              <div>
                <CardTitle className="text-base md:text-lg leading-tight">{tool.name}</CardTitle>
                {tool.featured && (
                  <Badge variant="secondary" className="text-xs mt-1">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="text-sm mb-4">
            {tool.description}
          </CardDescription>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {tool.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {tool.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tool.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex justify-between items-center pointer-events-none">
            <span
              className={`inline-flex w-full items-center justify-center rounded-md border px-3 py-2 text-sm font-medium ${
                isClickable
                  ? "border-gray-300 bg-background text-foreground"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {isClickable ? (
                <>
                  Use Tool
                  <ExternalLink className="w-4 h-4 ml-2 shrink-0" aria-hidden />
                </>
              ) : (
                "Coming Soon"
              )}
            </span>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
} 