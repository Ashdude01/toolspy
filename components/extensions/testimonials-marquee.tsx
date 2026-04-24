"use client";

import { useId, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

type Testimonial = {
  name: string;
  content: string;
  rating: number;
};

function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1" aria-label={`${full} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < full ? "text-amber-500 fill-amber-500" : "text-muted-foreground/30"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function Row({
  items,
  seconds,
  reverse,
}: {
  items: Testimonial[];
  seconds: number;
  reverse?: boolean;
}) {
  const duplicated = useMemo(() => [...items, ...items], [items]);
  const dir = reverse ? "reverse" : "normal";

  return (
    <div className="relative overflow-hidden">
      <div
        className="pointer-events-none flex w-max gap-4 will-change-transform"
        style={{
          animation: `toolspy-marquee ${seconds}s linear infinite`,
          animationDirection: dir,
        }}
        aria-hidden="true"
      >
        {duplicated.map((t, idx) => (
          <Card
            key={`${t.name}-${idx}`}
            className="w-[320px] sm:w-[360px] bg-background/70 backdrop-blur"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">{t.name}</div>
                <Stars value={t.rating} />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {t.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsMarquee({
  items,
  title = "Don’t take our word for it.",
}: {
  items: Testimonial[];
  title?: string;
}) {
  const labelId = useId();
  const top = items.slice(0, Math.ceil(items.length / 2));
  const bottom = items.slice(Math.ceil(items.length / 2));

  return (
    <section aria-labelledby={labelId} className="space-y-6">
      <header className="text-center space-y-2">
        <h2 id={labelId} className="text-2xl sm:text-3xl font-bold tracking-tight">
          {title}
        </h2>
      </header>

      <div className="space-y-4">
        <Row items={top} seconds={26} />
        <Row items={bottom} seconds={30} reverse />
      </div>

      <style jsx>{`
        @keyframes toolspy-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}

