import Link from "next/link";
import Downloader from "./Downloader";
import { cn } from "@/lib/utils";
import { getToolBySlug } from "@/lib/tools-data";

const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6";

const HOW_TO_STEPS = [
  {
    title: "Open the Facebook post or photo",
    desc: "Navigate to the public Facebook post, photo page, or profile you want to save. Make sure the content is publicly visible - posts that require login cannot be downloaded.",
  },
  {
    title: "Copy the URL from your browser address bar",
    desc: 'Click the address bar and copy the full URL. On mobile, tap the share icon → "Copy link". Works with facebook.com/posts/…, facebook.com/photo/?fbid=…, or a direct image URL.',
  },
  {
    title: "Paste the link - the tool auto-analyzes it",
    desc: 'Paste the copied URL into the input box above. The downloader detects it automatically and starts analyzing. You can also click "Analyze" manually to start.',
  },
  {
    title: "Download photos in full size",
    desc: 'Click "Download Image" to save the selected photo, or "Download All" to grab every image in a gallery at once. Photos are saved at the highest resolution Facebook exposes.',
  },
];

const STEPS = [
  {
    n: "1",
    title: "Paste the link",
    desc: "Copy the URL of a public Facebook post or photo and paste it into the box above.",
  },
  {
    n: "2",
    title: "Analyze",
    desc: "We scan the page and pull out every image we can find in the post.",
  },
  {
    n: "3",
    title: "Pick your photos",
    desc: "Browse the detected images and choose the ones you actually want.",
  },
  {
    n: "4",
    title: "Download",
    desc: "Save them in full size and use them wherever you need.",
  },
];

const TYPES = [
  {
    title: "Public post URL",
    desc: "The most reliable option. Works with standard post links that anyone can open without logging in.",
    useCase: "Public posts & galleries",
    precision: "Best success rate",
    example: "facebook.com/username/posts/…",
  },
  {
    title: "Photo page URL",
    desc: "Links that open a single photo and include an fbid parameter in the address.",
    useCase: "A specific public photo",
    precision: "Good",
    example: "facebook.com/photo/?fbid=…",
  },
  {
    title: "Direct image link",
    desc: "Already have the image's direct .jpg, .png, or .webp URL? Drop it in and download it straight away.",
    useCase: "Save a single image fast",
    precision: "High",
    example: "…/image.jpg",
  },
];

const DOWNLOAD_TYPES = [
  {
    title: "Photos from posts",
    desc: "Download any photo or image from a public Facebook post in one click - single shots or whole galleries.",
  },
  {
    title: "Profile pictures (DP)",
    desc: "Save a public Facebook profile photo at the largest size available - a quick Facebook profile pic downloader and DP download.",
  },
  {
    title: "Cover photos",
    desc: "Paste a public profile or page link to download a Facebook cover photo along with any other images.",
  },
  {
    title: "HD & full-size images",
    desc: "When Facebook exposes a full-size version, you can download HD photos from Facebook at the highest available resolution.",
  },
];

const FEATURES = [
  {
    title: "No signup needed",
    desc: "Use the tool without creating an account or installing anything.",
  },
  {
    title: "Fast workflow",
    desc: "Paste a link, analyze, and download the detected images in a few clicks.",
  },
  {
    title: "Full size when available",
    desc: "If Facebook exposes a full-size version, that's exactly what you download.",
  },
  {
    title: "Works in your browser",
    desc: "Runs on modern browsers across desktop and mobile.",
  },
];

const TABLE = [
  { f: "Public post URLs", ok: true, note: "Standard facebook.com/…/posts/… links." },
  { f: "Photo page URLs", ok: true, note: "Handles /photo/?fbid=… public photos." },
  { f: "Direct image URLs", ok: true, note: "JPG, PNG, WebP and similar formats." },
  { f: "Multiple images per post", ok: true, note: "Gallery posts list each detected image." },
  { f: "Private posts", ok: false, note: "Login-required posts can't be extracted." },
  { f: "Account / install required", ok: false, note: "Everything runs in your browser." },
  { f: "Mobile-friendly", ok: true, note: "Fully responsive layout." },
];

const RELATED_TOOLS = [
  {
    href: "/ai-image-enhancer",
    title: "AI Image Enhancer",
    desc: "Upscale, unblur, or restore downloaded Facebook photos with AI - get the best quality from any image.",
    label: "AI Tool",
  },
  {
    href: "/image-compressor",
    title: "Image Compressor",
    desc: "Compress downloaded Facebook photos to reduce file size without visible quality loss.",
    label: "Image",
  },
  {
    href: "/compress-pdf",
    title: "PDF Compressor",
    desc: "Reduce PDF file sizes while maintaining quality. Compress documents for faster sharing, storage optimization.",
    label: "PDF",
  },
  {
    href: "/color-palette-generator",
    title: "Color Palette Generator",
    desc: "A fast color palette builder and color combo generator for designers and developers.",
    label: "Color",
  },
  {
    href: "/ai-background-remover",
    title: "Background Remover",
    desc: "Remove the background from a downloaded profile picture or any image with one click.",
    label: "AI Tool",
  },
  {
    href: "/image-resizer",
    title: "Image Resizer",
    desc: "Resize downloaded photos to exact dimensions - perfect for profile pictures, wallpapers, or web use.",
    label: "Image",
  },
];

const FAQS = [
  {
    q: "Is the Facebook image downloader free?",
    a: "Yes. It's completely free to use. There's no signup, no software to install, and no watermarks on your downloads.",
  },
  {
    q: "Which Facebook links work?",
    a: "You can use public post URLs, photo page links that contain an fbid, and direct image links ending in .jpg, .png, or .webp.",
  },
  {
    q: "Can I download photos from private posts?",
    a: "No. If a post requires you to log in to see it, the images can't be pulled. The tool only works with content that's publicly visible.",
  },
  {
    q: "Can it download more than one photo at once?",
    a: 'Yes. When a post contains a gallery, every photo shows up separately so you can grab them one at a time or all together using "Download All".',
  },
  {
    q: "Do I need an account or an app?",
    a: "No. Everything runs in your browser - there's nothing to download or sign up for.",
  },
  {
    q: "Is it safe to use?",
    a: "Yes. Images are fetched directly in your browser. Please only download photos you have permission to use.",
  },
  {
    q: "Can I download a Facebook profile picture?",
    a: "Yes. Paste a public profile link and the tool works as a Facebook profile pic downloader - it saves the profile photo (DP) at the largest size that's publicly available. Profile pictures on private accounts that require login can't be downloaded.",
  },
  {
    q: "Can I download HD or full-size Facebook photos?",
    a: "Yes. Whenever Facebook provides a full-size version of an image, you can download HD photos from Facebook at the highest resolution available for that link.",
  },
  {
    q: "Can I download a Facebook cover photo?",
    a: "Yes. Paste the public profile or page URL and you can download the Facebook cover photo just like any other image in a post.",
  },
  {
    q: "Is there a Chrome extension?",
    a: "Yes. If you'd rather save images while you browse, our Chrome Facebook photo downloader extension lets you scan and download pictures in one click.",
  },
  {
    q: "How do I download photos from a Facebook group?",
    a: "If the group is public, paste the post URL and the tool will extract the images. Private group posts require login and cannot be downloaded - only publicly accessible content works.",
  },
  {
    q: "Can I download all photos from a Facebook album?",
    a: "Yes, when an album or gallery post is publicly accessible, the tool detects all images in it. Use the \"Download All\" button to save every photo from the album in one go.",
  },
  {
    q: "Does it work on mobile (Android and iPhone)?",
    a: "Yes. The tool is fully responsive and works in any modern mobile browser. On Android or iPhone, open your browser, paste the Facebook link, and download as usual. No app installation needed.",
  },
  {
    q: "Why can't I download this photo?",
    a: "The most common reasons are: (1) the post is private or requires login, (2) the link format isn't supported - try using the direct post URL instead of a shared link, (3) Facebook may have changed the page structure. If downloads fail, the tool will open the image in a new tab as a fallback.",
  },
  {
    q: "Is it legal to download Facebook photos?",
    a: "Downloading publicly available Facebook photos is technically possible with this tool, but legality depends on your intended use. Saving photos for personal use is generally fine. Republishing, selling, or using someone else's photos commercially without permission may violate copyright law and Facebook's Terms of Service. Always respect the original creator's rights.",
  },
];

// NOTE: The FAQPage JSON-LD is emitted globally via `faq-loader.ts`
// (registerToolFAQ -> DynamicToolLayout). We intentionally do NOT emit a
// second FAQPage here to avoid duplicate FAQPage structured data on the page.
// Keep faq-loader.ts in sync with the FAQS list below (visible content).

// NOTE: The tool's app schema (SoftwareApplication, with offers/price) is
// emitted once per tool by SchemaManager (via DynamicToolLayout). We do NOT
// emit a second WebApplication here to avoid duplicate app structured data.

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://toolspy.net" },
    {
      "@type": "ListItem",
      position: 2,
      name: "Facebook Image Downloader",
      item: "https://toolspy.net/facebook-image-downloader",
    },
  ],
};

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#1877F2] dark:text-blue-400">
      {children}
    </p>
  );
}

function FeatureIcon() {
  return (
    <div className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2]/10 dark:bg-blue-500/15">
      <span className="h-3.5 w-3.5 rounded-sm bg-[#1877F2] dark:bg-blue-400" />
    </div>
  );
}

export default function FacebookImageDownloaderPage() {
  // Pull the poster image (and other meta) straight from tools-data so it stays
  // in sync and is easy to change in one place in the future.
  const tool = getToolBySlug("facebook-image-downloader");
  const posterImage = tool?.posterImage;
  const canonicalUrl =
    tool?.seo?.canonicalUrl || "https://toolspy.net/facebook-image-downloader";

  // Complete, best-practice HowTo schema. Built here (not at module scope) so it
  // can use the dynamic poster image and canonical URL from tools-data. Note:
  // Google deprecated HowTo rich results in 2023, so this no longer earns a rich
  // snippet, but it remains valid structured data that helps AI/answer engines
  // understand the steps and keeps the markup complete and correct.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Download Facebook Photos",
    description:
      "Download photos from public Facebook posts, profile pictures, and cover photos in HD quality - no app or account required.",
    ...(posterImage ? { image: posterImage } : {}),
    totalTime: "PT1M",
    estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
    supply: [
      { "@type": "HowToSupply", name: "A public Facebook post, photo, or profile URL" },
    ],
    tool: [{ "@type": "HowToTool", name: "Toolspy Facebook Image Downloader" }],
    step: HOW_TO_STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
      url: `${canonicalUrl}#step-${i + 1}`,
    })),
  };

  return (
    <div className="w-full bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero — title/description from CmsToolHero in layout; widget stays here */}
      <section className="border-b border-border">
        <div className={cn(CONTAINER, "py-12 text-center sm:py-16")}>
          <div className="tool-legacy-hero">
            <h1 className="mx-auto mt-5 max-w-3xl !pb-0 !text-[2rem] font-extrabold leading-tight tracking-tight sm:!text-4xl lg:!text-5xl">
              Facebook Image Downloader
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Paste a public Facebook post or photo link below to download full-size images.
              Private posts won&apos;t work — for those, use our free browser extension.
            </p>
          </div>

          <div className="w-full">
            <Downloader />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {[
              "No watermark",
              "No signup or login",
              "Private - runs in your browser",
              "HD & full size",
            ].map((item) => (
              <span
                key={item}
                className="pointer-events-none flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="border-t border-border bg-muted/40 py-14 dark:bg-muted/20 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>Related tools</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            More free tools you might need
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Download from other platforms, enhance your photos, or edit them - all free, no signup.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RELATED_TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-foreground group-hover:text-[#1877F2] dark:group-hover:text-blue-400">
                    {t.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#1877F2]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1877F2] dark:bg-blue-500/15 dark:text-blue-400">
                    {t.label}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Download from public posts - text left, image right (pulled dynamically from tools-data) */}
      {posterImage && (
        <section className="border-t border-border py-14 sm:py-16">
          <div className={CONTAINER}>
            <div className="max-w-2xl">
              <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
                Download Facebook Images from Public Posts
              </h2>
              <p className="mt-3 text-muted-foreground">
                Use this Facebook image downloader to extract photos from a public post URL. It also
                works as a Facebook photo downloader for direct image links.
              </p>
            </div>

            <div className="mt-10 grid items-center gap-8 lg:mt-12 lg:grid-cols-2 lg:gap-12">
              {/* Left: copy */}
              <div className="order-2 lg:order-1">
                <ul className="space-y-3.5">
                  {[
                    "Paste a Facebook post URL and click Analyze.",
                    "Works best for public posts you can open without logging in.",
                    "Download each detected image at the highest size Facebook provides for that URL.",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-muted-foreground">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 text-[#1877F2] dark:text-blue-400"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
                  <p className="font-bold text-foreground">Note</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    If a post is private or not accessible in your browser, this tool won&apos;t be
                    able to extract its images.
                  </p>
                </div>
              </div>

              {/* Right: poster image */}
              <figure className="relative order-1 lg:order-2">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-[#1877F2]/25 via-transparent to-[#1877F2]/10 blur-2xl"
                />
                <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={posterImage}
                    alt="Facebook Image Downloader - download HD photos, profile pictures (DP), and cover photos from public Facebook posts"
                    width={1200}
                    height={675}
                    loading="lazy"
                    decoding="async"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </figure>
            </div>
          </div>
        </section>
      )}

       

      {/* How to download Facebook photos - featured snippet target */}
      <section className="border-t border-border py-14 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>Step-by-step guide</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            How to Download Facebook Photos
          </h2>
          <p className="mt-2 text-muted-foreground">
            Downloading a photo from Facebook takes less than a minute. Here&apos;s exactly how to
            save any public Facebook image to your device.
          </p>
          <ol className="mt-8 space-y-3">
            {HOW_TO_STEPS.map((step, i) => (
              <li
                key={i}
                id={`step-${i + 1}`}
                className="flex scroll-mt-24 gap-4 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1877F2] text-sm font-extrabold text-white dark:bg-blue-600">
                  {i + 1}
                </div>
                <div>
                  <p className="font-bold text-foreground">{step.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What you can download */}
      <section className="border-t border-border bg-muted/40 py-14 dark:bg-muted/20 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>What you can download</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Photos, profile pictures, cover photos &amp; more
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Whether you need a single image, a Facebook profile picture, or a full cover photo, the
            downloader pulls the highest-quality version a public link allows.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {DOWNLOAD_TYPES.map((t) => (
              <div
                key={t.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <FeatureIcon />
                <h3 className="font-bold text-foreground">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            After downloading, you can{" "}
            <Link
              href="/image-compressor"
              className="font-medium text-[#1877F2] hover:underline dark:text-blue-400"
            >
              compress the image
            </Link>
            ,{" "}
            <Link
              href="/image-resizer"
              className="font-medium text-[#1877F2] hover:underline dark:text-blue-400"
            >
              resize it for any platform
            </Link>
            , or{" "}
            <Link
              href="/ai-background-remover"
              className="font-medium text-[#1877F2] hover:underline dark:text-blue-400"
            >
              remove the background
            </Link>{" "}
            - all free tools, right here.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border py-14 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>How it works</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Download images in four steps
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="flex flex-col gap-2.5 rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-sm font-extrabold text-white dark:bg-blue-600">
                  {s.n}
                </div>
                <p className="font-bold text-foreground">{s.title}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported links */}
      <section className="border-t border-border bg-muted/40 py-14 dark:bg-muted/20 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>Supported links</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Three ways to link a photo
          </h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            The tool understands the common ways people link to a Facebook image - and tells you how
            reliable each one is.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {TYPES.map((t) => (
              <div
                key={t.title}
                className="flex min-h-[200px] flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-foreground">{t.title}</h3>
                  <span className="shrink-0 rounded-full bg-[#1877F2]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#1877F2] dark:bg-blue-500/15 dark:text-blue-400">
                    {t.precision}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
                <div className="mt-auto space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="text-muted-foreground/70">Use case: </span>
                    {t.useCase}
                  </p>
                  <code className="block truncate rounded-lg bg-muted px-3 py-2 font-mono text-xs text-foreground">
                    {t.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it's easy */}
      <section className="border-t border-border py-14 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>Why it&apos;s easy</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Built for a short, predictable workflow
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <FeatureIcon />
                <h3 className="font-bold text-foreground">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities table */}
      <section className="border-t border-border bg-muted/40 py-14 dark:bg-muted/20 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>What it supports</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Capabilities &amp; limits
          </h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="hidden grid-cols-[1.4fr_0.7fr_2fr] bg-muted/60 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:grid">
              <div className="px-5 py-3.5">Feature</div>
              <div className="px-5 py-3.5">Supported</div>
              <div className="px-5 py-3.5">Notes</div>
            </div>
            {TABLE.map((r) => (
              <div
                key={r.f}
                className="grid grid-cols-1 gap-1 border-t border-border px-5 py-3.5 first:border-t-0 sm:grid-cols-[1.4fr_0.7fr_2fr] sm:items-center sm:gap-0 sm:py-0"
              >
                <div className="py-1 text-sm font-semibold text-foreground sm:px-0 sm:py-3.5">
                  {r.f}
                </div>
                <div className="py-1 sm:py-3.5">
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-0.5 text-xs font-bold",
                      r.ok
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                    )}
                  >
                    {r.ok ? "Yes" : "No"}
                  </span>
                </div>
                <div className="py-1 text-sm text-muted-foreground sm:py-3.5">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-14 sm:py-16">
        <div className={CONTAINER}>
          <Kicker>FAQ</Kicker>
          <h2 className="!text-2xl font-extrabold tracking-tight sm:!text-3xl">
            Frequently asked questions
          </h2>
          <div className="mt-6 space-y-2">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-border bg-card shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span className="relative h-4 w-4 shrink-0 text-[#1877F2] dark:text-blue-400">
                    <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-current" />
                    <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 rounded bg-current transition-transform group-open:rotate-90" />
                  </span>
                </summary>
                <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="bg-gradient-to-br from-[#1877F2] to-[#0d56c4] py-14 text-center sm:py-16">
        <div className={CONTAINER}>
          <h2 className="!text-2xl font-extrabold tracking-tight text-white sm:!text-3xl">
            Ready to download Facebook images?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-blue-100">
            Paste a public post link, analyze, and save the photos you need in just a couple of
            clicks.
          </p>
          <a
            href="#top"
            className="mt-6 inline-flex h-12 items-center rounded-lg bg-white px-8 text-sm font-bold text-[#1877F2] shadow transition hover:bg-blue-50"
          >
            Start downloading
          </a>
        </div>
      </section>
    </div>
  );
}
