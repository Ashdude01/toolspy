"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";
import { extractFacebookImages, type FacebookImageInfo } from "@/lib/utils/facebook-extractor";
import { FacebookPhotoExtensionCta } from "@/components/tools/facebook-photo-extension-cta";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SAMPLE_URL = "https://www.facebook.com/photo/?fbid=1234567890";
const FB_BTN = cn(
  buttonVariants({ size: "lg" }),
  "h-12 shrink-0 bg-[#1877F2] px-8 font-semibold text-white hover:bg-[#166FE5] hover:text-white",
);

const LOADING_STEPS = [
  "Fetching post from Facebook…",
  "Parsing images from the page…",
  "Almost done…",
] as const;

type Status = "idle" | "loading" | "done" | "error";

function isFacebookUrl(val: string) {
  return val.includes("facebook.com") || val.includes("fb.com");
}

function DownloaderInner() {
  const { showToast } = useToast();
  const params = useSearchParams();
  const [url, setUrl] = useState("");
  const [urlError, setUrlError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [loadingStep, setLoadingStep] = useState(0);
  const [imageInfo, setImageInfo] = useState<FacebookImageInfo | null>(null);
  const [selected, setSelected] = useState(0);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<Record<number, boolean>>({});
  const [downloadFailedIndices, setDownloadFailedIndices] = useState<Set<number>>(
    () => new Set(),
  );
  const stepTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const u = params?.get("url");
    if (u) setUrl(u);
  }, [params]);

  useEffect(() => {
    return () => stepTimers.current.forEach(clearTimeout);
  }, []);

  function clearStepTimers() {
    stepTimers.current.forEach(clearTimeout);
    stepTimers.current = [];
  }

  async function analyze(overrideUrl?: string) {
    const value = (overrideUrl ?? url).trim();
    if (!value) {
      setUrlError(true);
      setStatus("error");
      setImageInfo({ images: [], error: "Paste a Facebook post or photo link first." });
      return;
    }

    setUrlError(false);
    setStatus("loading");
    setLoadingStep(0);
    setImageInfo(null);
    setSelected(0);
    setDownloaded({});
    setDownloadFailedIndices(new Set());

    clearStepTimers();
    stepTimers.current.push(setTimeout(() => setLoadingStep(1), 900));
    stepTimers.current.push(setTimeout(() => setLoadingStep(2), 2200));

    try {
      const result = await extractFacebookImages(value);
      clearStepTimers();
      setImageInfo(result);

      if (result.images.length > 0) {
        setStatus("done");
        showToast(`Found ${result.images.length} image(s)`, "success");
      } else {
        setStatus("error");
        showToast(result.error || "No images found", "error");
      }
    } catch (error) {
      clearStepTimers();
      const errorMessage = error instanceof Error ? error.message : "Failed to extract images";
      setImageInfo({ images: [], error: errorMessage });
      setStatus("error");
      showToast(errorMessage, "error");
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = e.clipboardData.getData("text").trim();
    if (isFacebookUrl(pasted) && status !== "loading") {
      setTimeout(() => analyze(pasted), 150);
    }
  }

  async function downloadImage(imgUrl: string, index: number) {
    setDownloadingIndex(index);
    try {
      const proxyUrl = `/api/facebook-image-proxy?url=${encodeURIComponent(imgUrl)}`;
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error("Failed to fetch image");

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const urlExtension = imgUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i)?.[1] || "jpg";
      const blobExtension = blob.type.split("/")[1]?.split(";")[0] || urlExtension;
      const extension = blobExtension || urlExtension;

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `facebook-image-${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
      showToast("Image downloaded successfully!", "success");
      setDownloaded((d) => ({ ...d, [index]: true }));
      setDownloadFailedIndices((prev) => {
        if (!prev.has(index)) return prev;
        const next = new Set(prev);
        next.delete(index);
        return next;
      });
    } catch {
      setDownloadFailedIndices((prev) => new Set(prev).add(index));
      showToast("Proxy download failed. Opening image in new tab…", "info");
      window.open(imgUrl, "_blank");
    } finally {
      setDownloadingIndex(null);
    }
  }

  function downloadAll() {
    if (!imageInfo?.images.length) return;
    imageInfo.images.forEach((img, i) => downloadImage(img, i));
  }

  function reset() {
    setUrl("");
    setUrlError(false);
    setStatus("idle");
    setImageInfo(null);
    setSelected(0);
    setDownloaded({});
    setDownloadFailedIndices(new Set());
  }

  const images = imageInfo?.images ?? [];
  const active = images[selected];
  const errorMessage =
    status === "error"
      ? imageInfo?.error ||
        (imageInfo && imageInfo.images.length === 0
          ? "No public images found for this link."
          : null)
      : null;

  return (
    <div className="w-full space-y-6" id="top">
      <Card className="w-full border-border/80 shadow-lg">
        <CardContent className="p-5 sm:p-6">
          <div className="space-y-3">
            <Label
              htmlFor="fb-url"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Facebook URL
            </Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="fb-url"
                type="url"
                inputMode="url"
                placeholder="https://www.facebook.com/photo/?fbid=…"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (urlError) setUrlError(false);
                }}
                onKeyDown={(e) => e.key === "Enter" && status !== "loading" && analyze()}
                onPaste={handlePaste}
                disabled={status === "loading"}
                className={cn(
                  "h-12 flex-1 border-border bg-background font-mono text-sm dark:border-border",
                  urlError &&
                    "border-destructive ring-1 ring-destructive focus-visible:ring-destructive",
                )}
              />
              <button
                type="button"
                onClick={() => analyze()}
                disabled={status === "loading"}
                className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#1877F2] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#166FE5] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                  </>
                ) : (
                  "Analyze"
                )}
              </button>
            </div>

            {urlError && (
              <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                Paste a Facebook post or photo link first.
              </p>
            )}

            <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                {["Public posts", "Photo pages", "Direct links"].map((label) => (
                  <span
                    key={label}
                    className="select-none rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {label}
                  </span>
                ))}
              </div>
              {/* <button
                type="button"
                onClick={() => setUrl(SAMPLE_URL)}
                className="text-left text-xs font-semibold text-[#1877F2] hover:underline sm:text-right dark:text-blue-400"
              >
                Try a sample link →
              </button> */}
            </div>
          </div>

          {/* Loading state with step progress */}
          {status === "loading" && (
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-[#1877F2]" />
                <span>{LOADING_STEPS[loadingStep]}</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {LOADING_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-500",
                      i <= loadingStep ? "bg-[#1877F2]" : "bg-muted",
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-5 border-t border-border pt-5">
              <p className="flex items-start gap-2 text-sm text-destructive">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </p>
            </div>
          )}

          {status === "done" && active && (
            <div className="mt-5 animate-in fade-in slide-in-from-bottom-2 border-t border-border pt-5 duration-300">
              {/* Header row */}
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
                  <div>
                    <p className="font-semibold text-foreground">
                      {images.length} image{images.length !== 1 ? "s" : ""} found
                    </p>
                    {imageInfo?.title && (
                      <p className="text-sm text-muted-foreground">{imageInfo.title}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {images.length > 1 && (
                    <Button
                      size="sm"
                      onClick={downloadAll}
                      disabled={downloadingIndex !== null}
                      className={cn(FB_BTN, "h-9 px-4")}
                    >
                      <Download className="h-4 w-4" />
                      Download all ({images.length})
                    </Button>
                  )}
                  <Button size="sm" variant="outline" onClick={reset}>
                    <RotateCcw className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
              </div>

              {/* Primary download CTA - above the image preview */}
              <div className="mb-3 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => downloadImage(active, selected)}
                  disabled={downloadingIndex === selected}
                  className={cn(FB_BTN, "h-10 flex-1 sm:flex-none sm:px-6")}
                >
                  {downloadingIndex === selected ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : downloaded[selected] ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {downloadingIndex === selected
                    ? "Saving…"
                    : downloaded[selected]
                      ? "Saved"
                      : images.length > 1
                        ? `Download Image ${selected + 1} of ${images.length}`
                        : "Download Image"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(active, "_blank")}
                  className="h-10"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open
                </Button>
              </div>

              {/* Image preview */}
              <div className="overflow-hidden rounded-xl border border-border bg-muted/30">
                <div className="relative aspect-[16/10] w-full bg-muted sm:aspect-[16/9]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={active}
                    alt={`Facebook image ${selected + 1}`}
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23ccc"/><text x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999">Unavailable</text></svg>';
                    }}
                  />
                  <Badge className="absolute left-3 top-3 border-0 bg-black/60 text-white hover:bg-black/60">
                    Full size
                  </Badge>
                </div>
                <div className="border-t border-border bg-card px-4 py-2.5">
                  <p className="text-xs text-muted-foreground">
                    {images.length > 1
                      ? `Image ${selected + 1} of ${images.length} - highest quality available`
                      : "Highest quality available"}
                  </p>
                </div>
              </div>

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-label={`Select image ${i + 1}`}
                      className={cn(
                        "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                        i === selected
                          ? "border-[#1877F2] ring-2 ring-[#1877F2]/30"
                          : "border-border opacity-80 hover:opacity-100",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      {downloaded[i] && (
                        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {downloadFailedIndices.has(selected) && (
                <div className="mt-3">
                  <FacebookPhotoExtensionCta variant="download-fail" imageIndex={selected} />
                </div>
              )}

              {imageInfo?.description && (
                <p className="mt-3 rounded-lg bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground">
                  {imageInfo.description}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <FacebookPhotoExtensionCta variant="persistent" />
    </div>
  );
}

export default function Downloader() {
  return (
    <ToastProvider>
      <DownloaderInner />
    </ToastProvider>
  );
}
