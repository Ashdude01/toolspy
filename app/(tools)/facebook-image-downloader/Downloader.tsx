"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  FileArchive,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";
import {
  extractFacebookImages,
  fetchFacebookImageBlob,
  type ExtractPhase,
  type FacebookImageInfo,
} from "@/lib/utils/facebook-extractor";
import { FacebookPhotoExtensionCta } from "@/components/tools/facebook-photo-extension-cta";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SAMPLE_URL = "https://www.facebook.com/photo/?fbid=1234567890";
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "toolspy.net";
const FILE_STAMP = `by-${SITE_DOMAIN}`;
const FB_BTN = cn(
  buttonVariants({ size: "lg" }),
  "h-12 shrink-0 bg-[#1877F2] px-8 font-semibold text-white hover:bg-[#166FE5] hover:text-white",
);

// Each real extraction phase maps to a step (for the 3 dots) and a message.
// Driven by actual milestones from the extractor - not fixed timers.
const PHASE_UI: Record<ExtractPhase, { step: number; label: string }> = {
  fetching: { step: 0, label: "Connecting to the post…" },
  reading: { step: 1, label: "Reading the page…" },
  parsing: { step: 2, label: "Extracting images…" },
  fallback: { step: 2, label: "Trying alternate sources…" },
};
const STEP_COUNT = 3;

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
  const [phase, setPhase] = useState<ExtractPhase>("fetching");
  const [imageInfo, setImageInfo] = useState<FacebookImageInfo | null>(null);
  const [selected, setSelected] = useState(0);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);
  const [downloaded, setDownloaded] = useState<Record<number, boolean>>({});
  const [downloadFailedIndices, setDownloadFailedIndices] = useState<Set<number>>(
    () => new Set(),
  );
  const [selectedSet, setSelectedSet] = useState<Set<number>>(() => new Set());
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState({ done: 0, total: 0 });
  const [savingSelected, setSavingSelected] = useState(false);

  useEffect(() => {
    const u = params?.get("url");
    if (u) setUrl(u);
  }, [params]);

  async function analyze(overrideUrl?: string) {
    const value = (overrideUrl ?? url).trim();
    if (!value) {
      setUrlError(true);
      setStatus("idle");
      setImageInfo(null);
      return;
    }

    setUrlError(false);
    setStatus("loading");
    setPhase("fetching");
    setImageInfo(null);
    setSelected(0);
    setDownloaded({});
    setDownloadFailedIndices(new Set());
    setSelectedSet(new Set());

    try {
      const result = await extractFacebookImages(value, {
        onProgress: (p) => setPhase(p),
      });
      setImageInfo(result);

      if (result.images.length > 0) {
        setStatus("done");
        setSelectedSet(new Set(result.images.map((_, i) => i)));
        showToast(`Found ${result.images.length} image(s)`, "success");
      } else {
        setStatus("error");
        showToast(result.error || "No images found", "error");
      }
    } catch (error) {
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

  function extFromBlob(imgUrl: string, blob: Blob) {
    const urlExtension = imgUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i)?.[1] || "jpg";
    const blobExtension = blob.type.split("/")[1]?.split(";")[0];
    return (blobExtension || urlExtension).toLowerCase();
  }

  // Watermarked filename, e.g. "facebook-image-3-by-toolspy.net.jpg"
  function imageFilename(index: number, ext: string) {
    return `facebook-image-${index + 1}-${FILE_STAMP}.${ext}`;
  }

  function saveBlob(blob: Blob, filename: string) {
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
  }

  async function downloadImage(
    imgUrl: string,
    index: number,
    options?: { bulk?: boolean },
  ) {
    if (!options?.bulk) setDownloadingIndex(index);
    try {
      // Fetches via public CORS proxies first, server proxy only as fallback.
      const blob = await fetchFacebookImageBlob(imgUrl);
      saveBlob(blob, imageFilename(index, extFromBlob(imgUrl, blob)));

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
      showToast("Download failed. Opening image in new tab…", "info");
      window.open(imgUrl, "_blank");
    } finally {
      if (!options?.bulk) setDownloadingIndex(null);
    }
  }

  // Selection helpers
  function toggleSelected(index: number) {
    setSelectedSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  function selectAll() {
    setSelectedSet(new Set(images.map((_, i) => i)));
  }

  function clearSelection() {
    setSelectedSet(new Set());
  }

  async function downloadSelected() {
    const indices = images.map((_, i) => i).filter((i) => selectedSet.has(i));
    if (!indices.length) {
      showToast("Select at least one image first", "info");
      return;
    }

    setSavingSelected(true);
    try {
      await Promise.all(indices.map((i) => downloadImage(images[i], i, { bulk: true })));
    } finally {
      setSavingSelected(false);
    }
  }

  async function downloadZip(indices: number[]) {
    if (!indices.length) {
      showToast("Select at least one image first", "info");
      return;
    }
    setZipping(true);
    setZipProgress({ done: 0, total: indices.length });
    try {
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();
      let ok = 0;

      // Sequential fetch keeps the public proxies from rate-limiting us.
      for (const i of indices) {
        try {
          const blob = await fetchFacebookImageBlob(images[i]);
          zip.file(imageFilename(i, extFromBlob(images[i], blob)), blob);
          ok += 1;
          setDownloaded((d) => ({ ...d, [i]: true }));
        } catch {
          setDownloadFailedIndices((prev) => new Set(prev).add(i));
        }
        setZipProgress((p) => ({ ...p, done: p.done + 1 }));
      }

      if (ok === 0) throw new Error("All images failed to download");

      const content = await zip.generateAsync({ type: "blob" });
      saveBlob(content, `facebook-images-${FILE_STAMP}.zip`);
      showToast(`Downloaded ${ok} image(s) as ZIP`, "success");
    } catch {
      showToast("ZIP download failed. Try downloading images individually.", "error");
    } finally {
      setZipping(false);
      setZipProgress({ done: 0, total: 0 });
    }
  }

  function reset() {
    setUrl("");
    setUrlError(false);
    setStatus("idle");
    setImageInfo(null);
    setSelected(0);
    setDownloaded({});
    setDownloadFailedIndices(new Set());
    setSelectedSet(new Set());
    setZipping(false);
    setZipProgress({ done: 0, total: 0 });
    setSavingSelected(false);
  }

  const images = imageInfo?.images ?? [];
  const active = images[selected];
  const selectedCount = selectedSet.size;
  const busy = downloadingIndex !== null || zipping || savingSelected;
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

          {/* Loading state - synced to real extraction phases */}
          {status === "loading" && (
            <div className="mt-5 border-t border-border pt-5">
              <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-[#1877F2]" />
                <span>{PHASE_UI[phase].label}</span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {Array.from({ length: STEP_COUNT }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-500",
                      i <= PHASE_UI[phase].step ? "bg-[#1877F2]" : "bg-muted",
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
              {/* Header row - compact */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground">
                      {images.length} image{images.length !== 1 ? "s" : ""} found
                    </p>
                    {imageInfo?.title && (
                      <p className="truncate text-sm text-muted-foreground">{imageInfo.title}</p>
                    )}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={reset}
                  disabled={zipping}
                  aria-label="Clear results"
                  className="h-8 w-8 shrink-0 text-muted-foreground"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
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
                </div>
                <div className="border-t border-border bg-card px-4 py-2.5">
                  <p className="text-xs text-muted-foreground">
                    {images.length > 1
                      ? `Image ${selected + 1} of ${images.length} - highest quality available`
                      : "Highest quality available"}
                  </p>
                </div>
              </div>

              {/* Bulk actions + selection - one compact bar */}
              {images.length > 1 && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium text-foreground">
                      {selectedCount}/{images.length}
                    </span>
                    <span className="text-muted-foreground">selected</span>
                    <button
                      type="button"
                      onClick={selectedCount === images.length ? clearSelection : selectAll}
                      className="font-semibold text-[#1877F2] hover:underline dark:text-blue-400"
                    >
                      {selectedCount === images.length ? "Clear" : "Select all"}
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={downloadSelected}
                      disabled={busy || selectedCount === 0}
                      aria-label={`Download ${selectedCount} selected image(s)`}
                      className={cn(FB_BTN, "h-8 px-3 text-xs")}
                    >
                      {savingSelected ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )}
                      {savingSelected ? "Saving…" : `Save ${selectedCount}`}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => downloadZip(images.map((_, i) => i).filter((i) => selectedSet.has(i)))}
                      disabled={busy || selectedCount === 0}
                      aria-label={`Download ${selectedCount} selected image(s) as ZIP`}
                      className="h-8 px-3 text-xs"
                    >
                      {zipping ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <FileArchive className="h-3.5 w-3.5" />
                      )}
                      {zipping ? `${zipProgress.done}/${zipProgress.total}` : `ZIP ${selectedCount}`}
                    </Button>
                  </div>
                </div>
              )}

              {/* Thumbnail strip */}
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      type="button"
                      onClick={() => setSelected(i)}
                      aria-label={`Preview image ${i + 1}`}
                      className={cn(
                        "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                        i === selected
                          ? "border-[#1877F2] ring-2 ring-[#1877F2]/30"
                          : "border-border opacity-80 hover:opacity-100",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      {/* selection checkbox */}
                      <span
                        role="checkbox"
                        aria-checked={selectedSet.has(i)}
                        aria-label={`Select image ${i + 1} for download`}
                        tabIndex={0}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelected(i);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === " " || e.key === "Enter") {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleSelected(i);
                          }
                        }}
                        className={cn(
                          "absolute left-1 top-1 flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 text-[11px] font-bold transition-colors",
                          selectedSet.has(i)
                            ? "border-[#1877F2] bg-[#1877F2] text-white"
                            : "border-white/90 bg-black/40 text-transparent hover:bg-black/60",
                        )}
                      >
                        ✓
                      </span>
                      {downloaded[i] && (
                        <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-bold text-white">
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
