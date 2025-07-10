import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Clock, CheckCircle } from 'lucide-react';
import { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
  className?: string;
}

export function ToolCard({ tool, className }: ToolCardProps) {
  const getStatusBadge = () => {
    switch (tool.status) {
      case 'active':
        return (
          <Badge variant="default" className="text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case 'beta':
        return (
          <Badge variant="secondary" className="text-xs">
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
          ? 'hover:shadow-lg hover:scale-105 cursor-pointer' 
          : 'opacity-75 cursor-not-allowed'
      } ${tool.featured ? 'ring-2 ring-primary/20' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{tool.icon}</div>
              <div>
                <CardTitle className="text-lg leading-tight">{tool.name}</CardTitle>
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

          <div className="flex justify-between items-center">
            <Button 
              variant={isClickable ? "default" : "secondary"} 
              size="sm" 
              disabled={!isClickable}
              className="w-full"
            >
              {isClickable ? (
                <>
                  Use Tool
                  <ExternalLink className="w-4 h-4 ml-2" />
                </>
              ) : (
                'Coming Soon'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </CardWrapper>
  );
} 