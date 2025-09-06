"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { tools, getToolBySlug, type Tool } from "@/lib/tools-data";
import Link from "next/link";

interface RelatedToolsProps {
  currentToolSlug: string;
  maxTools?: number;
  title?: string;
  description?: string;
}

export function RelatedTools({ 
  currentToolSlug, 
  maxTools = 8,
  title = "More Helpful Tools You Might Like",
  description = "Check out our other tools that work great together."
}: RelatedToolsProps) {
  const currentTool = getToolBySlug(currentToolSlug);
  
  if (!currentTool) {
    return null;
  }

  // Get tools from the same category, excluding the current tool
  const relatedTools = tools
    .filter(tool => 
      tool.category === currentTool.category && 
      tool.slug !== currentToolSlug
    )
    .slice(0, maxTools)
    .map(tool => ({
      name: tool.name,
      description: tool.description,
      keywords: tool.tags.join(', '),
      href: tool.path,
      comingSoon: tool.status === 'coming-soon',
    }));

  // If no related tools in same category, get some from other categories
  if (relatedTools.length === 0) {
    const otherTools = tools
      .filter(tool => tool.slug !== currentToolSlug)
      .slice(0, maxTools)
      .map(tool => ({
        name: tool.name,
        description: tool.description,
        keywords: tool.tags.join(', '),
        href: tool.path,
        comingSoon: tool.status === 'coming-soon',
      }));
    
    relatedTools.push(...otherTools);
  }

  if (relatedTools.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <h3 className="text-2xl font-bold text-center">
        {title}
      </h3>
      <p className="text-center text-muted-foreground max-w-3xl mx-auto">
        {description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedTools.map((tool, index) => (
          <Card key={index} className="p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold mb-2">{tool.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  {tool.description}
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  <b>Keywords</b>: {tool.keywords}
                </p>
                {tool.comingSoon ? (
                  <Badge variant="secondary">Coming Soon</Badge>
                ) : (
                  <Button variant="outline" size="sm" asChild>
                    <Link href={tool.href}>Try Tool →</Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* <div className="mt-8 p-6 bg-muted/50 rounded-lg">
        <h4 className="font-semibold mb-2">
          Why Use Multiple Toolspy Tools?
        </h4>
        <p className="text-sm text-muted-foreground">
          Our integrated suite of professional tools ensures consistent
          quality and user experience across all your digital tasks. All tools
          feature the same privacy-focused, client-side processing for maximum
          security and performance. Whether you're compressing images,
          converting formats, or encoding data, Toolspy provides
          professional-grade solutions completely free.
        </p>
      </div> */}
    </section>
  );
} 