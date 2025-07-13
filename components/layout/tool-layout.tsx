import { Metadata } from 'next';
import { Tool } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

interface ToolLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

export function generateMetadata(tool: Tool): Metadata {
  return generateToolMetadata(tool);
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}

export default ToolLayout; 