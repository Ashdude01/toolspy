import Downloader from "./Downloader";
import { cn } from "@/lib/utils";

const CONTAINER = "mx-auto w-full max-w-7xl px-4 sm:px-6";

export default function FacebookImageDownloaderPage() {
  return (
    <div className="w-full bg-background text-foreground">
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
    </div>
  );
}
