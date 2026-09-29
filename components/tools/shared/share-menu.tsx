"use client";

// Reusable "Share" dropdown for any tool result. A tool supplies a callback
// that builds a self-contained SVG "share card" plus the card size and a
// shareable URL; this component handles the whole menu (copy link, native
// share, PNG, PDF), all the open/close/copied/busy state, and the export
// plumbing via lib/share-export. Drop it into any tool page:
//
//   <ShareMenu
//     getShareUrl={() => `${location.origin}${location.pathname}?${query}`}
//     buildSvg={() => buildShareCardSVG(result)}
//     size={{ width: 1200, height: 675 }}
//     fileBase={() => "my-tool-result"}
//     shareTitle="My result"
//     shareText={() => "Check out my result"}
//   />

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link2, ImageDown, FileDown, Share2, Check } from "lucide-react";
import {
  svgToPngDataUrl,
  downloadDataUrl,
  pngToPdf,
  copyToClipboard,
  type CardSize,
} from "@/lib/share-export";
import { useT } from "@/lib/i18n/use-t";

export interface ShareMenuProps {
  /** Returns the shareable URL to copy / native-share (encodes tool state). */
  getShareUrl: () => string;
  /** Builds the self-contained SVG string for the export image. */
  buildSvg: () => string;
  /** Pixel size of the share card (used for PNG raster + PDF page size). */
  size: CardSize;
  /** Base filename (no extension) for downloads, e.g. () => "love-alex-sam". */
  fileBase: () => string;
  /** Title for the native share sheet. */
  shareTitle: string;
  /** Text for the native share sheet. */
  shareText: () => string;
  /** Extra classes for the trigger button (e.g. a brand gradient). */
  buttonClassName?: string;
  /** Button size, mirrors the shadcn Button `size` prop. */
  buttonSize?: "default" | "sm" | "lg" | "icon";
  /** Dropdown alignment relative to the trigger. */
  align?: "left" | "right";
  /** PDF page orientation. */
  pdfOrientation?: "landscape" | "portrait";
  /** Solid background painted behind the rasterized PNG/PDF. */
  cardBackground?: string;
}

export function ShareMenu({
  getShareUrl,
  buildSvg,
  size,
  fileBase,
  shareTitle,
  shareText,
  buttonClassName,
  buttonSize = "sm",
  align = "right",
  pdfOrientation = "landscape",
  cardBackground = "#ffffff",
}: ShareMenuProps) {
  const t = useT();
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [busy, setBusy] = React.useState<null | "img" | "pdf">(null);
  const [canNativeShare, setCanNativeShare] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const copyLink = async () => {
    const url = getShareUrl();
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", url);
    }
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    setOpen(false);
  };

  const nativeShare = async () => {
    setOpen(false);
    try {
      await navigator.share({ title: shareTitle, text: shareText(), url: getShareUrl() });
    } catch {
      /* user dismissed the share sheet - no-op */
    }
  };

  const runExport = async (kind: "img" | "pdf") => {
    setBusy(kind);
    try {
      const png = await svgToPngDataUrl(buildSvg(), size, 2, cardBackground);
      if (kind === "img") {
        downloadDataUrl(png, `${fileBase()}.png`);
      } else {
        await pngToPdf(png, size, `${fileBase()}.pdf`, pdfOrientation);
      }
    } catch {
      window.alert(
        kind === "img" ? t("share.imageFailed") : t("share.pdfFailed")
      );
    } finally {
      setBusy(null);
      setOpen(false);
    }
  };

  const itemClass =
    "flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-muted disabled:opacity-60";

  return (
    <div className="relative" ref={ref}>
      <Button
        size={buttonSize}
        className={buttonClassName}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {copied ? (
          <>
            <Check className="mr-1.5 h-4 w-4" /> {t("share.linkCopied")}
          </>
        ) : (
          <>
            <Share2 className="mr-1.5 h-3.5 w-3.5" /> {t("share.share")}
            <span className="ml-1 opacity-70">▾</span>
          </>
        )}
      </Button>
      {open && (
        <div
          role="menu"
          className={
            "absolute z-30 mt-2 w-60 max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-border bg-card shadow-lg " +
            (align === "left" ? "left-0" : "right-0")
          }
        >
          <button type="button" role="menuitem" onClick={copyLink} className={itemClass}>
            <Link2 className="h-4 w-4 text-muted-foreground" /> {t("share.copyShareableLink")}
          </button>
          {canNativeShare && (
            <button type="button" role="menuitem" onClick={nativeShare} className={itemClass}>
              <Share2 className="h-4 w-4 text-muted-foreground" /> {t("share.shareVia")}
            </button>
          )}
          <button
            type="button"
            role="menuitem"
            onClick={() => runExport("img")}
            disabled={busy !== null}
            className={itemClass}
          >
            <ImageDown className="h-4 w-4 text-muted-foreground" />
            {busy === "img" ? t("share.generatingImage") : t("share.downloadAsImage")}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => runExport("pdf")}
            disabled={busy !== null}
            className={itemClass}
          >
            <FileDown className="h-4 w-4 text-muted-foreground" />
            {busy === "pdf" ? t("share.generatingPdf") : t("share.downloadAsPdf")}
          </button>
        </div>
      )}
    </div>
  );
}
