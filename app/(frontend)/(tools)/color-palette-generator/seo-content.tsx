/**
 * Server-only SEO content for this tool page.
 * No "use client" - all markup is server-rendered so view-source and crawlers see full HTML.
 */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollToTopButton } from "@/components/ui/scroll-to-top-button";
import {
  CheckCircle,
  Keyboard,
  Link2,
  Lock,
  Contrast,
  Download,
  Lightbulb,
  ListChecks,
  Rocket,
  MessagesSquare,
  Sparkles,
  Palette,
} from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { RelatedTools } from "@/components/tools/related-tools";
import { registerToolFAQ } from "@/components/seo/faq-types";
import { FAQ } from "@/components/ui/faq";
import { SectionHeader } from "@/components/seo/section-header";
import { getToolBySlug } from "@/lib/tools-data";
import { getToolRatingSummary, getToolReviews } from "@/lib/tool-reviews";

export function ColorPaletteGeneratorSEOContent() {
  const tool = getToolBySlug("color-palette-generator");
  const reviews = tool ? getToolReviews(tool) : [];
  const ratingSummary = tool ? getToolRatingSummary(tool) : null;

  const featureChecklist = [
    { feature: "Generate a 5-color palette", value: "Yes", note: "Press Space or click Generate." },
    { feature: "Lock individual colors", value: "Yes", note: "Keep a color fixed while regenerating others." },
    { feature: "Drag to reorder", value: "Yes", note: "Horizontal on desktop, vertical on mobile." },
    { feature: "Edit hex directly", value: "Yes", note: "Click a swatch to enter a specific hex code." },
    { feature: "Add / remove colors (2–10)", value: "Yes", note: "Insert between colors or remove when more than two exist." },
    { feature: "Undo / redo", value: "Yes", note: "Step back and forward through palette history." },
    { feature: "Export formats", value: "Yes", note: "CSS, SCSS, Tailwind, JSON, Array, PNG." },
    { feature: "Shareable URL", value: "Yes", note: "URL encodes colors (e.g. ?colors=ff6b6b-4ecdc4-...)." },
    { feature: "Account required", value: "No", note: "No signup, no install." },
  ];

  const exportFormats = [
    {
      name: "CSS",
      description: "Root custom properties for use across your stylesheet.",
      example: ":root {\n  --color-1: #ff6b6b;\n  --color-2: #4ecdc4;\n}",
    },
    {
      name: "SCSS",
      description: "SCSS variables, ready to import into your design system.",
      example: "$color-1: #ff6b6b;\n$color-2: #4ecdc4;",
    },
    {
      name: "Tailwind",
      description: "A colors block you can paste into your tailwind.config.",
      example: "colors: {\n  'color-1': '#ff6b6b',\n  'color-2': '#4ecdc4'\n}",
    },
    {
      name: "JSON",
      description: "A JSON object with hex codes - good for scripts and tools.",
      example: '{\n  "color1": "#ff6b6b",\n  "color2": "#4ecdc4"\n}',
    },
    {
      name: "PNG",
      description: "Download the palette as an image to share in mockups or slides.",
      example: "palette.png",
    },
  ];

  const shortcuts = [
    { keys: "Space", action: "Generate a new palette (unlocked colors regenerate)." },
    { keys: "Drag", action: "Reorder colors (horizontal on desktop, vertical on mobile)." },
    { keys: "Click hex", action: "Edit a color directly with a specific hex value." },
    { keys: "Lock icon", action: "Lock the color so it stays when you generate." },
  ];

  // Curated sample palettes - each click loads the palette into the tool.
  const samplePalettes: { name: string; mood: string; colors: string[] }[] = [
    { name: "Sunset", mood: "Warm", colors: ["ff6b6b", "ffa94d", "ffd43b", "ff8787", "fab005"] },
    { name: "Ocean", mood: "Cool", colors: ["1b4965", "3d5a80", "45b7d1", "4ecdc4", "a8dadc"] },
    { name: "Forest", mood: "Natural", colors: ["2d6a4f", "40916c", "52b788", "74c69d", "b7e4c7"] },
    { name: "Pastel", mood: "Soft", colors: ["ffadad", "ffd6a5", "fdffb6", "caffbf", "9bf6ff"] },
    { name: "Monochrome", mood: "Neutral", colors: ["212529", "495057", "6c757d", "adb5bd", "dee2e6"] },
    { name: "Neon", mood: "Vibrant", colors: ["ff006e", "8338ec", "3a86ff", "06ffa5", "ffbe0b"] },
  ];

  return (
    <article
      className="mx-auto space-y-14 text-base sm:text-[17px] leading-relaxed"
      aria-label="Guide and SEO content"
    >
      {/* Sample palettes - unique, visual, clickable */}
      <section className="space-y-6 md:space-y-10" id="samples">
        <SectionHeader
          eyebrow="Inspiration"
          icon={Sparkles}
          title="Sample palettes to start from"
          lead="Click any color combo to load it into the builder."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {samplePalettes.map((p) => (
            <a
              key={p.name}
              href={`/color-palette-generator?colors=${p.colors.join("-")}`}
              className="group block rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <div className="grid grid-cols-5 h-16">
                {p.colors.map((c) => (
                  <div
                    key={c}
                    style={{ backgroundColor: `#${c}` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="p-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.mood}</p>
                </div>
                <p className="text-[11px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity truncate">
                  {p.colors.map((c) => `#${c}`).join(" · ")}
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
      {/* Related Tools */}
      <nav aria-label="Similar tools">
        <RelatedTools
          currentToolSlug="color-palette-generator"
          title="Similar Tools You Might Like"
        />
      </nav>

      {/* Intro (H1 - the tool UI above has no heading of its own) */}
      <section id="intro" className="space-y-8">
        <div className=" space-y-3">
          <h1 className="text-center font-bold tracking-tight">
            Color Palette Generator
          </h1>
          <p className="text-muted-foreground text-start md:text-center">
            A fast color palette builder and color combo generator for designers and developers.
            Start from scratch or generate a color palette from a seed color, lock the shades you
            like, and export as CSS, Tailwind, JSON, or PNG.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 items-center">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Designers and developers use this color palette builder to lock a seed hex, explore
              matching shades, and export the final palette to CSS, Tailwind, SCSS, JSON, or PNG
              in one click - no account, no install.
            </p>
            <p>
              Tweak individual colors, drag to reorder, and share the result through a URL that
              encodes the exact palette. Prefer preset inspiration? The sample color combos below
              load into the builder in one click so you can iterate from a known starting point.
            </p>
          </div>

          {tool?.posterImage && (
            <figure className="rounded-2xl overflow-hidden border bg-muted/30">
              <NextImage
                src={tool.posterImage}
                width={1600}
                height={900}
                alt="Color palette generator interface - five color swatches with lock, drag, and edit controls"
                className="w-full h-auto"
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </section>


      {/* How to use */}
      <section className="space-y-6" id="how-to-use">
        <SectionHeader
          eyebrow="Getting started"
          icon={Rocket}
          title="How to use it"
          lead="Build a palette in a few seconds."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">1. Generate</h3>
            <p className="text-sm text-muted-foreground">
              Press Space or click Generate to get a new palette.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">2. Lock colors</h3>
            <p className="text-sm text-muted-foreground">
              Lock the ones you like - they stay when you regenerate.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">3. Tweak hex values</h3>
            <p className="text-sm text-muted-foreground">
              Click a swatch to enter a specific hex code.
            </p>
          </Card>
          <Card className="p-4 bg-muted/40">
            <h3 className="font-semibold mb-1">4. Export or share</h3>
            <p className="text-sm text-muted-foreground">
              Export to CSS, Tailwind, JSON, or PNG. Or copy a share URL.
            </p>
          </Card>
        </div>
      </section>



      {/* Generate from a seed color - answers "generate color palette from color" intent */}
      <section className="space-y-4" id="from-color">
        <SectionHeader
          eyebrow="Starting point"
          icon={Palette}
          title="Generate a color palette from a color"
          lead="Use any hex as a seed to build the rest of the palette."
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            If you already have a brand color, a photo accent, or a mood color in mind, you can
            generate a color palette from that one color in four steps:
          </p>
          <ol className="list-decimal pl-5 space-y-1 text-sm">
            <li>
              Click the first swatch and enter your seed hex (for example{" "}
              <code className="bg-muted rounded px-1.5 py-0.5 text-xs">#4ecdc4</code>).
            </li>
            <li>Lock that swatch using the lock icon so it stays fixed.</li>
            <li>Press Space to regenerate the remaining colors around it.</li>
            <li>Repeat until the full palette fits - lock more shades as you like them.</li>
          </ol>
          <p className="text-sm">
            This turns the tool into a color palette scheme generator centered on your anchor
            color, and it is often faster than trying to hand-pick every shade.
          </p>
        </div>
      </section>

      {/* Shortcuts */}
      <section className="space-y-6" id="shortcuts">
        <SectionHeader
          eyebrow="Workflow"
          icon={Keyboard}
          title="Shortcuts & gestures"
          lead="Small interactions that speed up your workflow."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shortcuts.map((s, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start gap-3">
                <span className="inline-block shrink-0 rounded-md border px-2 py-1 text-xs font-mono bg-muted">
                  {s.keys}
                </span>
                <p className="text-sm text-muted-foreground">{s.action}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Export formats */}
      <section className="space-y-6" id="exports">
        <SectionHeader
          eyebrow="Export"
          icon={Download}
          title="Supported export formats"
          lead="Use the same palette across your design and code stack."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exportFormats.map((f, i) => (
            <Card key={i} className="p-5">
              <h3 className="font-semibold mb-1">{f.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{f.description}</p>
              <pre className="text-xs bg-muted/60 rounded-md p-3 overflow-x-auto whitespace-pre-wrap">
                {f.example}
              </pre>
            </Card>
          ))}
        </div>
      </section>

      {/* Share via URL */}
      <section className="space-y-4" id="share">
        <SectionHeader eyebrow="Sharing" icon={Link2} title="Share palettes via URL" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Click <strong className="text-foreground">Share</strong> to copy a URL that encodes
            your palette in the query string. Open the URL on any device and the same palette
            appears.
          </p>
          <p className="text-sm">
            Example:{" "}
            <code className="bg-muted rounded px-1.5 py-0.5 text-xs">
              ?colors=ff6b6b-4ecdc4-45b7d1-f7b731-9b59b6
            </code>
          </p>
          <p className="text-sm">
            The URL format is hex codes without <code>#</code>, joined by <code>-</code>. You can
            construct such URLs by hand for demos, docs, or bookmarks.
          </p>
        </div>
      </section>

      {/* Lock & generate variations */}
      <section className="space-y-4" id="lock">
        <SectionHeader
          eyebrow="Pro tip"
          icon={Lock}
          title="Lock colors to explore variations"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Locking is the fastest way to keep a base color (brand or background) while exploring
            accents and neutrals. Lock your brand hex first, then press Space repeatedly to scan
            through companion colors.
          </p>
          <p>Want all colors fresh? Make sure no locks are on and press Space.</p>
        </div>
      </section>

      {/* Accessibility / contrast */}
      <section className="space-y-4" id="contrast">
        <SectionHeader
          eyebrow="Accessibility"
          icon={Contrast}
          title="Contrast & accessibility notes"
        />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Palette aesthetics and accessibility are two different things. Before shipping a
            palette, check contrast for any text/background pair you plan to use against{" "}
            <strong className="text-foreground">WCAG AA</strong>: 4.5:1 for body text, 3:1 for
            large text.
          </p>
          <p>A few practical tips:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Pair a darker accent with a light background (or vice versa) for body text.</li>
            <li>
              Colors that sit very close on the color wheel often fail contrast - pick one and use
              the other as an accent.
            </li>
            <li>
              Test real UI states: default, hover, focus, disabled. Many palettes look great on a
              canvas but break on buttons.
            </li>
          </ul>
        </div>
      </section>

      {/* Common pitfalls */}
      <section className="space-y-6" id="pitfalls">
        <SectionHeader eyebrow="Heads up" icon={Lightbulb} title="Common pitfalls" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Locking every color</h3>
            <p className="text-sm text-muted-foreground">
              If every swatch is locked, Generate has nothing to change. Unlock at least one to
              explore variations.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Too many similar hues</h3>
            <p className="text-sm text-muted-foreground">
              Five similar blues look elegant but limit contrast options. Include at least one
              neutral and one accent.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Forgetting dark mode</h3>
            <p className="text-sm text-muted-foreground">
              Export your palette, then preview in a dark theme to catch unreadable pairs before
              shipping.
            </p>
          </Card>
          <Card className="p-5">
            <h3 className="font-semibold mb-1">Skipping semantic names</h3>
            <p className="text-sm text-muted-foreground">
              In CSS or Tailwind, rename generated variables to semantic tokens (primary, accent,
              neutral) before using in a real project.
            </p>
          </Card>
        </div>
      </section>

      {/* Feature checklist */}
      <section className="space-y-6" id="features">
        <SectionHeader
          eyebrow="Overview"
          icon={ListChecks}
          title="What this tool supports"
        />
        <Card>
          <CardHeader>
            <CardTitle>Feature checklist</CardTitle>
            <CardDescription>
              A factual summary of what the color palette generator does.
            </CardDescription>
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
                  {featureChecklist.map((row, i) => (
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

      {/* When to use vs color picker */}
      <section className="space-y-4" id="vs-picker">
        <SectionHeader title="Palette generator vs color picker" />
        <div className="space-y-3 text-muted-foreground">
          <p>
            Use a <strong className="text-foreground">color picker</strong> when you already know
            the exact color you want (from a brand, image, or mockup) and just need its hex, RGB,
            or HSL values.
          </p>
          <p>
            Use a <strong className="text-foreground">color palette generator</strong> when you’re
            starting fresh and want a set of colors that look good together - ideal for landing
            pages, illustrations, brand guidelines, or quick design explorations.
          </p>
          <p className="text-sm">
            Need a picker?{" "}
            <Link href="/color-picker" className="underline underline-offset-4">
              Try the Color Picker tool
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={getColorPaletteGeneratorFAQs()} />

      {/* User reviews */}
      <section className="space-y-6" id="reviews">
        <SectionHeader eyebrow="Community" icon={MessagesSquare} title="User reviews" />

        {ratingSummary ? (
          <p className="text-center text-muted-foreground">
            Rated{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.ratingValue}/5
            </span>{" "}
            based on{" "}
            <span className="font-semibold text-foreground">
              {ratingSummary.reviewCount}
            </span>{" "}
            review(s).
          </p>
        ) : (
          <p className="text-center text-muted-foreground">
            No reviews yet. If you used the tool, you can share feedback on our{" "}
            <Link className="underline underline-offset-4" href="/feedback">
              feedback page
            </Link>
            .
          </p>
        )}

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, 6).map((r, idx) => (
              <Card key={idx} className="p-5">
                <div className="space-y-1">
                  <p className="font-semibold">{r.headline}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.authorName} • {r.datePublished} • {r.ratingValue}/5
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {r.reviewBody}
                </p>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Final CTA */}
      <section>
        <div className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to build your palette?</h2>
          <p className="text-muted-foreground">
            Press Space to generate, lock the colors you like, then export to your format of
            choice.
          </p>
          <ScrollToTopButton>Start Generating →</ScrollToTopButton>
        </div>
      </section>
    </article>
  );
}

// Export FAQ data for schema generation
export function getColorPaletteGeneratorFAQs() {
  return [
    {
      question: "Is the color palette generator free to use?",
      answer: "Yes. It’s free and runs in your browser - no signup, no install.",
    },
    {
      question: "How do I generate a new palette?",
      answer:
        "Press the Spacebar or click Generate. Lock any color you want to keep before you regenerate.",
    },
    {
      question: "Can I generate a color palette from one base color?",
      answer:
        "Yes. Click the first swatch, enter your seed hex code, lock it with the lock icon, then press Space to generate matching companion colors around it.",
    },
    {
      question: "Can I choose exact hex codes?",
      answer:
        "Yes. Click a swatch to open the color input and type (or paste) a specific hex code.",
    },
    {
      question: "What export formats are supported?",
      answer:
        "CSS custom properties, SCSS variables, a Tailwind colors block, JSON, Array, and a PNG image.",
    },
    {
      question: "Can I share a palette?",
      answer:
        "Yes. Click Share to copy a URL that encodes your palette. Opening the URL recreates the same palette.",
    },
    {
      question: "How many colors can the palette have?",
      answer:
        "Between 2 and 10 colors. You can add a color between existing ones or remove any color when there are more than two.",
    },
    {
      question: "Is it accessible for users with visual impairments?",
      answer:
        "The interface is keyboard-accessible with screen-reader labels. For accessible output, verify text/background contrast against WCAG AA (4.5:1 body text, 3:1 large text).",
    },
  ];
}

// Register FAQ data for this tool
registerToolFAQ("color-palette-generator", getColorPaletteGeneratorFAQs);
