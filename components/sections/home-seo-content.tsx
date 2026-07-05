import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import {
  CheckCircle,
  Folder,
  Lightbulb,
  ListChecks,
  MessagesSquare,
  Shield,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface HomeFAQItem {
  question: string;
  answer: string;
}

const QUICK_START = [
  {
    title: "Find the tool you need",
    body: "Use the search box and categories to jump straight to the right tool.",
  },
  {
    title: "Run it in your browser",
    body: "Most tools work instantly without installing an app or creating an account.",
  },
  {
    title: "Download and move on",
    body: "Get your result and keep working - ideal for quick tasks and checklists.",
  },
];

const CATEGORIES = [
  {
    title: "Image tools",
    description: "Compress, convert, resize, optimize, and generate icons for web and apps.",
    links: [
      { label: "Image Compressor", href: "/image-compressor" },
      { label: "Image Converter", href: "/image-converter" },
      { label: "Image Resizer", href: "/image-resizer" },
      { label: "Image Optimizer", href: "/image-optimizer" },
      { label: "Favicon Generator", href: "/favicon-generator" },
    ],
  },
  {
    title: "PDF tools",
    description: "Merge, split, compress, convert, and unlock PDFs for everyday document work.",
    links: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "PDF to Word", href: "/pdf-to-word" },
      { label: "PDF to Image", href: "/pdf-to-image" },
    ],
  },
  {
    title: "Developer utilities",
    description: "Clean up and transform data quickly while debugging or building.",
    links: [
      { label: "JSON Formatter", href: "/json-formatter" },
      { label: "Base64 Encoder/Decoder", href: "/base64-encoder-decoder" },
      { label: "Code Beautifier", href: "/code-beautifier" },
    ],
  },
  {
    title: "Calculators",
    description: "Everyday math, finance, and planning calculators.",
    links: [
      { label: "Percentage Calculator", href: "/percentage-calculator" },
      { label: "Loan Calculator", href: "/loan-calculator" },
      { label: "Tax Calculator", href: "/tax-calculator" },
      { label: "Salary Calculator", href: "/salary-calculator" },
    ],
  },
];

const QUALITY_NOTES = [
  {
    title: "Privacy-first by design",
    body: "Many tools run locally in your browser. If a tool needs server-side processing, treat your files as temporary and avoid uploading anything sensitive.",
  },
  {
    title: "Simple, not salesy",
    body: "We focus on clear inputs, predictable outputs, and practical guidance so the tool is easy to use even if you’re in a hurry.",
  },
  {
    title: "Built for real workflows",
    body: "Batch-friendly where it matters, sensible defaults, and links to related tools so you can finish the entire task in one place.",
  },
];

const PITFALLS = [
  {
    title: "Know what the tool expects",
    body: "Some tools need a URL, some need a file, and some need average metrics. Read the labels and use realistic inputs.",
  },
  {
    title: "Use the right tool for the goal",
    body: "For example: optimize images for web delivery, but keep high-quality originals for design work.",
  },
  {
    title: "Treat estimates as estimates",
    body: "Finance and engagement calculators are for planning and comparisons - not official results.",
  },
];

const CHECKLIST = [
  { feature: "No signup for most tools", value: "Yes", note: "Quick access for small tasks." },
  { feature: "Browser-first workflow", value: "Yes", note: "No app install required." },
  { feature: "Clear guides and FAQs", value: "Yes", note: "Help text for common questions." },
  { feature: "Tool-to-tool navigation", value: "Yes", note: "Related links to finish workflows." },
];

export function HomeSeoContent({ faqData }: { faqData: HomeFAQItem[] }) {
  return (
    <article className="mx-auto max-w-7xl space-y-14 my-16 px-4 text-base sm:text-[17px] leading-relaxed">
      {/* Intro */}
      <section id="intro" className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight">
            Toolspy: free online tools for everyday work
          </h2>
          <p className="text-start md:text-center text-muted-foreground">
            Toolspy is a collection of browser-based utilities for common tasks like compressing
            images, working with PDFs, formatting data, and running quick calculations. Pick a tool,
            enter your inputs, and get the result - fast.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Instead of hunting for a different site every time you need to resize an image, merge
              PDFs, or calculate a percentage, you can keep one toolbox bookmarked. Each tool page
              includes a short guide, common pitfalls, and links to related tools.
            </p>
            <p>
              If you’re new, start with the{" "}
              <Link href="/tools" className="underline underline-offset-4 text-foreground">
                tools directory
              </Link>{" "}
              and browse by category.
            </p>
          </div>

          <figure className="rounded-2xl overflow-hidden border bg-muted/30">
            <Image
              width={1600}
              height={900}
              src="/images/main.webp"
              alt="Toolspy - browse tools by category and run utilities in the browser"
              className="w-full h-auto"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* Quick start */}
      <section className="space-y-6" id="quick-start">
        <SectionHeader
          eyebrow="Quick start"
          icon={Sparkles}
          title="How to use Toolspy"
          lead="Three steps for most tools."
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_START.map((s) => (
            <Card key={s.title} className="p-4 bg-muted/40">
              <h3 className="font-semibold mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-6" id="categories">
        <SectionHeader
          eyebrow="Browse"
          icon={Folder}
          title="Popular categories"
          lead="A few common starting points."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CATEGORIES.map((c) => (
            <Card key={c.title} className="p-5">
              <h3 className="font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-sm underline underline-offset-4 text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Quality notes */}
      <section className="space-y-6" id="quality">
        <SectionHeader
          eyebrow="Quality"
          icon={Shield}
          title="Notes on privacy and content quality"
          lead="Clear expectations, less surprise."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUALITY_NOTES.map((b) => (
            <Card key={b.title} className="p-5">
              <h3 className="font-semibold mb-1">{b.title}</h3>
              <p className="text-sm text-muted-foreground">{b.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Common pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PITFALLS.map((p) => (
            <Card key={p.title} className="p-5">
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground">{p.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader eyebrow="Overview" icon={ListChecks} title="What you can expect" />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>A quick summary of the experience.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium">Feature</th>
                    <th className="text-left p-3 font-medium">Supported</th>
                    <th className="text-left p-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {CHECKLIST.map((row, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="p-3 font-medium">{row.feature}</td>
                      <td className="p-3">
                        <div className="inline-flex items-center gap-2">
                          <span>{row.value}</span>
                          {row.value === "Yes" && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-muted-foreground">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* FAQ */}
      <section className="space-y-6" id="faq">
        <FAQ
          title="Frequently asked questions"
          description="Quick answers about how the site works."
          faqs={faqData}
        />
      </section>

      {/* Feedback */}
      <section className="space-y-6" id="feedback">
        <SectionHeader eyebrow="Help us improve" icon={MessagesSquare} title="Feedback" />
        <Card className="p-5">
          <div className="space-y-3 text-muted-foreground">
            <p>
              If a tool is missing a format, needs a better default, or you want a new utility
              added, leave a note on our{" "}
              <Link href="/feedback" className="underline underline-offset-4 text-foreground">
                feedback page
              </Link>
              .
            </p>
          </div>
        </Card>
      </section>

      {/* Final CTA */}
      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h3 className="text-2xl font-bold tracking-tight">Ready to find your tool?</h3>
          <p className="text-muted-foreground">
            Browse categories or search - most tools take less than a minute.
          </p>
          <ScrollToTopButton>Explore tools →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

