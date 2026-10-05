import { Loader2 } from "lucide-react";

export default function CategoryRouteLoading() {
  return (
    <div
      className="container max-w-7xl mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
      <p className="text-sm text-muted-foreground text-center">
        Loading category…
      </p>
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-36 rounded-xl border bg-muted/40 animate-pulse"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}
