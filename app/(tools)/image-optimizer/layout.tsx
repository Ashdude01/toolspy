import { Metadata } from 'next';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/components/seo/tool-seo';

export async function generateMetadata(): Promise<Metadata> {
  const tool = getToolBySlug('image-optimizer');
  if (!tool) {
    return {
      title: 'Image Optimizer - Toolspy',
      description: 'Optimize images for faster loading and better performance',
    };
  }
  return generateToolMetadata(tool);
}

export default function ImageOptimizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 