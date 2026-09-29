import { ReactNode } from 'react';

interface ToolPageWrapperProps {
  toolSlug: string;
  children: ReactNode;
}

/**
 * Legacy wrapper kept for client tool pages.
 * Schema + layout shell live in each tool's server layout.tsx (DynamicToolLayout).
 * This component must stay client-safe — no server/Payload imports.
 */
export function ToolPageWrapper({ children }: ToolPageWrapperProps) {
  return <>{children}</>;
}
