import { HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  faqs: FAQItem[];
  className?: string;
  variant?: "default" | "modern";
}

/**
 * FAQ list rendered with native <details>/<summary> elements.
 *
 * Every question AND answer is always present in the server-rendered HTML
 * (answers are only visually collapsed, not removed from the DOM), so search
 * engines can read the full content - good for SEO and rich results.
 */
export function FAQ({
  title = "Frequently Asked Questions",
  description,
  faqs,
  className = "",
  variant = "modern",
}: FAQProps) {
  const showHeader = variant === "modern";

  return (
    <div className={`bg-transparent ${className}`}>
      {showHeader && (
        <div className="mb-5 text-center">
          <div className="flex items-center justify-start gap-3 text-xl font-bold md:justify-center md:text-3xl">
            <HelpCircle className="h-8 w-8 shrink-0 text-indigo-600" />
            <h2>{title}</h2>
          </div>
          {description && (
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="mx-auto max-w-4xl space-y-2">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group rounded-xl border border-border bg-card shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground [&::-webkit-details-marker]:hidden">
              <span>{faq.question}</span>
              <span className="relative h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400">
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current transition-transform group-open:rotate-90" />
              </span>
            </summary>
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
