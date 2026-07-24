import { Loader2 } from "lucide-react";

export default function ToolsRouteLoading() {
  return (
    <div
      className="container max-w-6xl mx-auto px-4 min-h-[40vh] flex flex-col items-center justify-center gap-3 text-muted-foreground"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-9 w-9 animate-spin text-primary" aria-hidden />
      <p className="text-sm">Loading tool…</p>
    </div>
  );
}
