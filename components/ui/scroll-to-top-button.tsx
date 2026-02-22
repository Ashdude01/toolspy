"use client";

import { Button } from "@/components/ui/button";

interface ScrollToTopButtonProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Client-only button that scrolls to top. Used in server-rendered SEO content
 * so the CTA is interactive without making the whole section client.
 */
export function ScrollToTopButton({ children, className }: ScrollToTopButtonProps) {
  return (
    <Button
      size="lg"
      className={className}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      {children ?? "Back to top"}
    </Button>
  );
}
