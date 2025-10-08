import { ReactNode } from 'react';
import { DynamicToolLayout } from '@/components/layout/dynamic-tool-layout';

interface ToolPageWrapperProps {
  toolSlug: string;
  children: ReactNode;
}

/**
 * Wrapper component for tool pages that provides schema and layout functionality
 * This is a compatibility component for tools that haven't been migrated to the new layout system
 */
export function ToolPageWrapper({ toolSlug, children }: ToolPageWrapperProps) {
  return (
    <DynamicToolLayout toolSlug={toolSlug}>
      {children}
    </DynamicToolLayout>
  );
}
