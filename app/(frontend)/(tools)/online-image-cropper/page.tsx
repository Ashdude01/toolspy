"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { useT } from "@/lib/i18n/use-t";
import { copyImageToClipboard, formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { ContinueWithImage } from "@/components/tools/continue-with-image";
import {
  Crop,
  Download,
  Image as ImageIcon,
  Link2,
  Maximize2,
  Share2,
  Shield,
  Trash2,
  Zap,
} from "lucide-react";

type Shape = "rectangle" | "square" | "circle" | "pentagon" | "hexagon" | "custom";
type Aspect =
  | "free"
  | "1:1"
  | "4:3"
  | "16:9"
  | "3:2"
  | "9:16";

type CropRect = { x: number; y: number; w: number; h: number };

function aspectToNumber(a: Aspect): number | null {
  if (a === "free") return null;
  const [w, h] = a.split(":").map(Number);
  if (!w || !h) return null;
  return w / h;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function polygonPath(ctx: CanvasRenderingContext2D, sides: number, w: number, h: number) {
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) / 2;
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
    const x = cx + r * Math.cos(ang);
    const y = cy + r * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function OnlineImageCropperContent() {
  const t = useT();
  const { showToast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const [shape, setShape] = useState<Shape>("rectangle");
  const [aspect, setAspect] = useState<Aspect>("free");
  const [outputFormat, setOutputFormat] = useState<"image/png" | "image/jpeg" | "image/webp">(
    "image/png"
  );

  const [crop, setCrop] = useState<CropRect | null>(null);
  type DragState =
    | {
        mode: "new" | "move";
        startX: number;
        startY: number;
        origin?: CropRect;
      }
    | { mode: "custom-point"; index: number; cropAtStart: CropRect };

  const dragRef = useRef<DragState | null>(null);

  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultMeta, setResultMeta] = useState<{ width: number; height: number } | null>(null);

  // Custom shape (polygon) points in normalized crop-space (0..1)
  const [customPoints, setCustomPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [customDrawMode, setCustomDrawMode] = useState(false);
  const [isHoveringCrop, setIsHoveringCrop] = useState(false);

  const effectiveAspect = useMemo(() => {
    if (
      shape === "square" ||
      shape === "circle" ||
      shape === "pentagon" ||
      shape === "hexagon"
    ) {
      return "1:1" as Aspect;
    }
    return aspect;
  }, [aspect, shape]);

  const aspectNum = useMemo(() => aspectToNumber(effectiveAspect), [effectiveAspect]);

  useEffect(() => {
    return () => {
      if (imageUrl) URL.revokeObjectURL(imageUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [imageUrl, resultUrl]);

  useEffect(() => {
    if (!resultUrl) {
      setResultMeta(null);
      return;
    }
    const img = new Image();
    img.onload = () => setResultMeta({ width: img.width, height: img.height });
    img.src = resultUrl;
  }, [resultUrl]);

  useEffect(() => {
    // Default export format: shape crops need alpha → PNG/WebP
    if (shape === "rectangle" || shape === "square") return;
    if (outputFormat === "image/jpeg") setOutputFormat("image/png");
  }, [shape, outputFormat]);

  useEffect(() => {
    if (shape === "custom") {
      setCustomDrawMode(true);
      return;
    }
    setCustomDrawMode(false);
    setCustomPoints([]);
  }, [shape]);

  const clearAll = () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setImageUrl(null);
    setCrop(null);
    setResultBlob(null);
    setResultUrl(null);
    setResultMeta(null);
    setCustomDrawMode(false);
    setCustomPoints([]);
  };

  const onFileSelect = (files: File[]) => {
    const f = files[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      showToast(t("tools.onlineImageCropper.selectImageFile"), "error");
      return;
    }
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(null);
    setResultUrl(null);

    setFile(f);
    const url = URL.createObjectURL(f);
    setImageUrl(url);
    setCrop(null);
    setCustomDrawMode(false);
    setCustomPoints([]);
  };

  const stageBox = () => stageRef.current?.getBoundingClientRect() ?? null;

  const getRenderedImageRect = () => {
    const img = imgRef.current;
    const box = stageBox();
    if (!img || !box || !img.naturalWidth || !img.naturalHeight) return null;
    const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
    const w = img.naturalWidth * scale;
    const h = img.naturalHeight * scale;
    const x = (box.width - w) / 2;
    const y = (box.height - h) / 2;
    return { x, y, w, h, scale };
  };

  const pointerToLocal = (clientX: number, clientY: number) => {
    const box = stageBox();
    if (!box) return null;
    const imgRect = getRenderedImageRect();
    return {
      x: clamp(clientX - box.left, 0, box.width),
      y: clamp(clientY - box.top, 0, box.height),
      w: box.width,
      h: box.height,
      imgRect,
    };
  };

  const startDrag = (e: React.PointerEvent) => {
    if (!stageRef.current) return;
    stageRef.current.setPointerCapture(e.pointerId);
    const p = pointerToLocal(e.clientX, e.clientY);
    if (!p) return;

    // Custom polygon: drag existing points (always, so users can re-adjust)
    if (shape === "custom" && crop && customPoints.length > 0) {
      const HIT_PX = 14;
      for (let i = customPoints.length - 1; i >= 0; i--) {
        const pt = customPoints[i];
        const hx = crop.x + pt.x * crop.w;
        const hy = crop.y + pt.y * crop.h;
        if (Math.hypot(p.x - hx, p.y - hy) <= HIT_PX) {
          dragRef.current = {
            mode: "custom-point",
            index: i,
            cropAtStart: { ...crop },
          };
          return;
        }
      }
    }

    // Custom polygon: add points inside current crop
    if (shape === "custom" && customDrawMode && crop && p.imgRect) {
      const inside =
        p.x >= crop.x && p.x <= crop.x + crop.w && p.y >= crop.y && p.y <= crop.y + crop.h;
      if (inside) {
        const nx = (p.x - crop.x) / crop.w;
        const ny = (p.y - crop.y) / crop.h;
        setCustomPoints((prev) => [...prev, { x: clamp(nx, 0, 1), y: clamp(ny, 0, 1) }]);
        return;
      }
    }

    // If clicking inside existing crop, move it
    if (crop) {
      const inside =
        p.x >= crop.x && p.x <= crop.x + crop.w && p.y >= crop.y && p.y <= crop.y + crop.h;
      if (inside) {
        dragRef.current = { mode: "move", startX: p.x, startY: p.y, origin: crop };
        setIsHoveringCrop(true);
        return;
      }
    }

    // Start new crop constrained to rendered image area (avoids export misalignment)
    if (p.imgRect) {
      const ix = clamp(p.x, p.imgRect.x, p.imgRect.x + p.imgRect.w);
      const iy = clamp(p.y, p.imgRect.y, p.imgRect.y + p.imgRect.h);
      dragRef.current = { mode: "new", startX: ix, startY: iy };
      setCrop({ x: ix, y: iy, w: 1, h: 1 });
      return;
    }

    dragRef.current = { mode: "new", startX: p.x, startY: p.y };
    setCrop({ x: p.x, y: p.y, w: 1, h: 1 });
  };

  const moveDrag = (e: React.PointerEvent) => {
    const p = pointerToLocal(e.clientX, e.clientY);
    if (!p) return;
    const d = dragRef.current;

    if (d?.mode === "custom-point") {
      const c = d.cropAtStart;
      const nx = clamp((p.x - c.x) / c.w, 0, 1);
      const ny = clamp((p.y - c.y) / c.h, 0, 1);
      const idx = d.index;
      setCustomPoints((prev) => prev.map((pt, i) => (i === idx ? { x: nx, y: ny } : pt)));
      return;
    }

    if (!d) {
      if (!crop) {
        setIsHoveringCrop(false);
        return;
      }
      const inside =
        p.x >= crop.x && p.x <= crop.x + crop.w && p.y >= crop.y && p.y <= crop.y + crop.h;
      setIsHoveringCrop(inside);
      return;
    }

    if (d.mode === "move" && d.origin) {
      const dx = p.x - d.startX;
      const dy = p.y - d.startY;
      const next = {
        x: clamp(d.origin.x + dx, 0, p.w - d.origin.w),
        y: clamp(d.origin.y + dy, 0, p.h - d.origin.h),
        w: d.origin.w,
        h: d.origin.h,
      };
      setCrop(next);
      return;
    }

    // new
    const x0 = d.startX;
    const y0 = d.startY;
    let x1 = p.x;
    let y1 = p.y;

    // Constrain to rendered image box
    if (p.imgRect) {
      x1 = clamp(x1, p.imgRect.x, p.imgRect.x + p.imgRect.w);
      y1 = clamp(y1, p.imgRect.y, p.imgRect.y + p.imgRect.h);
    }
    let x = Math.min(x0, x1);
    let y = Math.min(y0, y1);
    let w = Math.abs(x1 - x0);
    let h = Math.abs(y1 - y0);

    if (aspectNum) {
      // adjust h based on w, keeping drag direction feel
      if (w / h > aspectNum) {
        h = w / aspectNum;
      } else {
        w = h * aspectNum;
      }
      // keep anchored at start point
      x = x1 >= x0 ? x0 : x0 - w;
      y = y1 >= y0 ? y0 : y0 - h;
    }

    if (p.imgRect) {
      x = clamp(x, p.imgRect.x, p.imgRect.x + p.imgRect.w);
      y = clamp(y, p.imgRect.y, p.imgRect.y + p.imgRect.h);
      w = clamp(w, 1, p.imgRect.x + p.imgRect.w - x);
      h = clamp(h, 1, p.imgRect.y + p.imgRect.h - y);
    } else {
      x = clamp(x, 0, p.w);
      y = clamp(y, 0, p.h);
      w = clamp(w, 1, p.w - x);
      h = clamp(h, 1, p.h - y);
    }

    setCrop({ x, y, w, h });
  };

  const endDrag = (e: React.PointerEvent) => {
    dragRef.current = null;
    // keep hover state based on current pointer position next move
    try {
      stageRef.current?.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const cropShapeStyle = useMemo(() => {
    if (!crop) return { container: {}, outline: {} };
    const base: React.CSSProperties = {
      left: crop.x,
      top: crop.y,
      width: crop.w,
      height: crop.h,
    };

    const clip =
      shape === "pentagon"
        ? "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)"
        : shape === "hexagon"
          ? "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)"
          : undefined;

    const radius = shape === "circle" ? "9999px" : undefined;

    const container: React.CSSProperties = {
      ...base,
      borderRadius: radius,
      clipPath: clip as any,
    };
    const outline: React.CSSProperties = {
      borderRadius: radius,
      clipPath: clip as any,
    };
    return { container, outline };
  }, [crop, shape]);

  const exportCrop = async () => {
    if (!file || !imgRef.current || !stageRef.current) {
      showToast(t("tools.onlineImageCropper.uploadFirst"), "error");
      return;
    }
    if (!crop) {
      showToast(t("tools.onlineImageCropper.selectCropArea"), "error");
      return;
    }
    if (shape === "custom" && customPoints.length < 3) {
      showToast(t("tools.onlineImageCropper.minThreePoints"), "error");
      return;
    }

    const img = imgRef.current;
    const stage = stageRef.current;
    const stageRect = stage.getBoundingClientRect();
    const displayW = stageRect.width;
    const displayH = stageRect.height;

    const rendered = getRenderedImageRect();
    if (!rendered) {
      showToast(t("tools.onlineImageCropper.imageNotReady"), "error");
      return;
    }

    // Crop coords within rendered image box (stage coords)
    const cx = clamp(crop.x, rendered.x, rendered.x + rendered.w);
    const cy = clamp(crop.y, rendered.y, rendered.y + rendered.h);
    const cw = clamp(crop.w, 1, rendered.x + rendered.w - cx);
    const ch = clamp(crop.h, 1, rendered.y + rendered.h - cy);

    // Map to natural pixels
    const scale = rendered.scale;
    let srcX = Math.round((cx - rendered.x) / scale);
    let srcY = Math.round((cy - rendered.y) / scale);
    let srcW = Math.round(cw / scale);
    let srcH = Math.round(ch / scale);

    // Source crop in natural pixels
    // For shape crops enforce square (and for custom we keep rectangle crop bounds)
    if (shape !== "rectangle" && shape !== "custom") {
      const side = Math.min(srcW, srcH);
      srcW = side;
      srcH = side;
    }

    srcX = clamp(srcX, 0, img.naturalWidth - 1);
    srcY = clamp(srcY, 0, img.naturalHeight - 1);
    srcW = clamp(srcW, 1, img.naturalWidth - srcX);
    srcH = clamp(srcH, 1, img.naturalHeight - srcY);

    const temp = document.createElement("canvas");
    temp.width = srcW;
    temp.height = srcH;
    const tctx = temp.getContext("2d");
    if (!tctx) {
      showToast(t("tools.onlineImageCropper.canvasNotSupported"), "error");
      return;
    }
    tctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);

    let outCanvas = temp;
    if (shape === "circle" || shape === "pentagon" || shape === "hexagon" || shape === "custom") {
      const masked = document.createElement("canvas");
      masked.width = srcW;
      masked.height = srcH;
      const mctx = masked.getContext("2d");
      if (!mctx) {
        showToast(t("tools.onlineImageCropper.canvasNotSupported"), "error");
        return;
      }

      mctx.clearRect(0, 0, srcW, srcH);
      if (shape === "circle") {
        mctx.beginPath();
        mctx.arc(srcW / 2, srcH / 2, Math.min(srcW, srcH) / 2, 0, Math.PI * 2);
        mctx.closePath();
      } else if (shape === "pentagon") {
        polygonPath(mctx, 5, srcW, srcH);
      } else if (shape === "hexagon") {
        polygonPath(mctx, 6, srcW, srcH);
      } else if (shape === "custom") {
        const pts = customPoints;
        mctx.beginPath();
        pts.forEach((p, idx) => {
          const x = p.x * srcW;
          const y = p.y * srcH;
          if (idx === 0) mctx.moveTo(x, y);
          else mctx.lineTo(x, y);
        });
        mctx.closePath();
      }
      mctx.clip();
      mctx.drawImage(temp, 0, 0);
      outCanvas = masked;
    }

    const mime =
      shape === "rectangle" || shape === "square"
        ? outputFormat
        : outputFormat === "image/jpeg"
          ? "image/png"
          : outputFormat;

    const blob: Blob | null = await new Promise((resolve) =>
      outCanvas.toBlob(
        (b) => resolve(b),
        mime,
        mime === "image/jpeg" ? 0.92 : undefined
      )
    );

    if (!blob) {
      showToast(t("tools.onlineImageCropper.exportFailed"), "error");
      return;
    }

    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(blob);
    setResultUrl(URL.createObjectURL(blob));
    showToast(t("tools.onlineImageCropper.cropReady"), "success");
  };

  const downloadResult = () => {
    if (!resultBlob) return;
    const ext =
      resultBlob.type === "image/jpeg" ? "jpg" : resultBlob.type === "image/webp" ? "webp" : "png";
    const name = file?.name?.replace(/\.[^/.]+$/, "") || "cropped";
    downloadFile(resultBlob, `${name}-cropped.${ext}`);
    showToast(t("tools.onlineImageCropper.downloaded"), "success");
  };

  const copyResultLink = async () => {
    try {
      if (!resultUrl) return;
      await navigator.clipboard.writeText(resultUrl);
      showToast(t("tools.onlineImageCropper.linkCopied"), "success");
    } catch {
      showToast(t("tools.onlineImageCropper.copyLinkFailed"), "error");
    }
  };

  const shareResult = async () => {
    if (!resultBlob) return;
    try {
      // Prefer sharing the file if supported
      const ext =
        resultBlob.type === "image/jpeg"
          ? "jpg"
          : resultBlob.type === "image/webp"
            ? "webp"
            : "png";
      const base = file?.name?.replace(/\.[^/.]+$/, "") || "cropped";
      const shareFile = new File([resultBlob], `${base}-cropped.${ext}`, {
        type: resultBlob.type,
      });

      const canShareFiles =
        typeof navigator !== "undefined" &&
        typeof (navigator as any).canShare === "function" &&
        (navigator as any).canShare({ files: [shareFile] });
      if (canShareFiles && navigator.share) {
        await navigator.share({ files: [shareFile], title: "Cropped image" });
        return;
      }
      // fallback: copy preview link
      await copyResultLink();
    } catch {
      await copyResultLink();
    }
  };

  const copyResultImage = async () => {
    if (!resultBlob) return;
    try {
      await copyImageToClipboard(resultBlob);
      showToast(t("tools.onlineImageCropper.imageCopied"), "success");
    } catch {
      showToast(t("tools.onlineImageCropper.copyFailed"), "error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          {t("tools.onlineImageCropper.privacyBadge")}
        </Badge>
        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {t("tools.onlineImageCropper.title")}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          {t("tools.onlineImageCropper.subtitle")}
        </p>
      </div>

      <FileUpload
        onFileSelect={onFileSelect}
        onError={(err) => showToast(err, "error")}
        multiple={false}
        maxFiles={1}
        autoCollapse={true}
        showBrandedModal={true}
        modalDuration={1500}
      />

      {imageUrl && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crop className="h-4 w-4" /> {t("tools.onlineImageCropper.cropAreaTitle")}
                  </CardTitle>
                  <CardDescription>{t("tools.onlineImageCropper.cropAreaDescription")}</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 className="h-4 w-4 mr-2" /> {t("toolCommon.clear")}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={stageRef}
                className={`relative w-full overflow-hidden rounded-xl border bg-muted/30 select-none touch-none ${
                  customDrawMode && shape === "custom"
                    ? "cursor-crosshair"
                    : isHoveringCrop
                      ? "cursor-move"
                      : "cursor-crosshair"
                }`}
                style={{ aspectRatio: "16 / 10", maxHeight: 520 }}
                onPointerDown={startDrag}
                onPointerMove={moveDrag}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onPointerLeave={() => setIsHoveringCrop(false)}
                aria-label="Image crop stage"
              >
                <img
                  ref={imgRef}
                  src={imageUrl}
                  alt="Uploaded image"
                  className="absolute inset-0 h-full w-full object-contain"
                  draggable={false}
                />

                {/* dimming overlay */}
                <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

                {/* crop cutout */}
                {crop && (
                  <>
                    <div
                      className="absolute bg-transparent"
                      style={cropShapeStyle.container as any}
                      aria-hidden="true"
                    >
                      <div
                        className="absolute inset-0 shadow-[0_0_0_9999px_rgba(0,0,0,0.35)]"
                        style={cropShapeStyle.outline as any}
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          ...(cropShapeStyle.outline as any),
                          boxShadow:
                            "0 0 0 2px rgba(255,255,255,0.55), 0 0 0 1px rgba(0,0,0,0.65), 0 0 18px rgba(59,130,246,0.35)",
                        }}
                      />
                      {shape === "pentagon" || shape === "hexagon" || shape === "custom" ? (
                        <>
                          <svg
                            className="absolute inset-0 h-full w-full"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                          >
                            {shape === "custom" && customPoints.length < 3 ? (
                              <>
                                <rect
                                  x="2"
                                  y="2"
                                  width="96"
                                  height="96"
                                  rx="10"
                                  ry="10"
                                  fill="none"
                                  opacity="0.55"
                                  stroke="#ffffff"
                                  strokeWidth="1"
                                />
                                <text
                                  x="50"
                                  y="50"
                                  textAnchor="middle"
                                  dominantBaseline="middle"
                                  fontSize="8"
                                  fill="#ffffff"
                                  style={{
                                    paintOrder: "stroke",
                                    stroke: "rgba(0,0,0,0.25)",
                                    strokeWidth: 1.5,
                                  }}
                                >
                                  {t("tools.onlineImageCropper.clickToAddPoints")}
                                </text>
                              </>
                            ) : (
                              <polygon
                                points={
                                  shape === "pentagon"
                                    ? "50,0 100,38 82,100 18,100 0,38"
                                    : shape === "hexagon"
                                      ? "25,6 75,6 100,50 75,94 25,94 0,50"
                                      : customPoints.map((p) => `${p.x * 100},${p.y * 100}`).join(" ")
                                }
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3.5"
                                vectorEffect="non-scaling-stroke"
                                style={{
                                  filter:
                                    "drop-shadow(0 0 0.5px rgba(0,0,0,0.6)) drop-shadow(0 0 8px rgba(59,130,246,0.35))",
                                }}
                              />
                            )}
                          </svg>
                          {shape === "custom" && customPoints.length > 0 ? (
                            <div className="pointer-events-auto absolute inset-0" aria-hidden="true">
                              {customPoints.map((pt, i) => (
                                <div
                                  key={i}
                                  className="absolute z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-primary shadow-md touch-none"
                                  style={{ left: `${pt.x * 100}%`, top: `${pt.y * 100}%` }}
                                />
                              ))}
                            </div>
                          ) : null}
                        </>
                      ) : (
                        <div
                          className="absolute inset-0 border-[3px] border-primary"
                          style={cropShapeStyle.outline as any}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {t("tools.onlineImageCropper.shapeTip")}
              </p>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t("tools.onlineImageCropper.settingsTitle")}</CardTitle>
              <CardDescription>{t("tools.onlineImageCropper.settingsDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>{t("tools.onlineImageCropper.cropShapeLabel")}</Label>
                <Select value={shape} onValueChange={(v) => setShape(v as Shape)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rectangle">{t("tools.onlineImageCropper.shapeRectangle")}</SelectItem>
                    <SelectItem value="square">{t("tools.onlineImageCropper.shapeSquare")}</SelectItem>
                    <SelectItem value="circle">{t("tools.onlineImageCropper.shapeCircle")}</SelectItem>
                    <SelectItem value="pentagon">{t("tools.onlineImageCropper.shapePentagon")}</SelectItem>
                    <SelectItem value="hexagon">{t("tools.onlineImageCropper.shapeHexagon")}</SelectItem>
                    <SelectItem value="custom">{t("tools.onlineImageCropper.shapeCustom")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("tools.onlineImageCropper.aspectRatioLabel")}</Label>
                <Select
                  value={effectiveAspect}
                  onValueChange={(v) => setAspect(v as Aspect)}
                  disabled={shape !== "rectangle"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">{t("tools.onlineImageCropper.aspectFree")}</SelectItem>
                    <SelectItem value="1:1">{t("tools.onlineImageCropper.aspectSquare")}</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="3:2">3:2</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="9:16">9:16</SelectItem>
                  </SelectContent>
                </Select>
                {shape !== "rectangle" && (
                  <p className="text-xs text-muted-foreground">
                    {t("tools.onlineImageCropper.aspectFixedHint")}
                  </p>
                )}
              </div>

              {shape === "custom" && (
                <div className="space-y-2">
                  <Label>{t("tools.onlineImageCropper.customShapeLabel")}</Label>
                  <div className="rounded-lg border bg-muted/30 p-3 space-y-2">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t("tools.onlineImageCropper.customShapeHint")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant={customDrawMode ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => setCustomDrawMode((v) => !v)}
                      >
                        {customDrawMode
                          ? t("tools.onlineImageCropper.drawingOn")
                          : t("tools.onlineImageCropper.drawingOff")}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setCustomPoints([])}
                      >
                        {t("tools.onlineImageCropper.clearPoints")}
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t("tools.onlineImageCropper.pointsLabel")} <span className="font-medium text-foreground">{customPoints.length}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label>{t("tools.onlineImageCropper.outputFormatLabel")}</Label>
                <Select value={outputFormat} onValueChange={(v) => setOutputFormat(v as any)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image/png">PNG</SelectItem>
                    <SelectItem value="image/webp">WebP</SelectItem>
                    <SelectItem value="image/jpeg" disabled={shape !== "rectangle" && shape !== "square"}>
                      JPEG
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Button onClick={exportCrop} className="w-full gap-2">
                  {t("tools.onlineImageCropper.createCroppedImage")} <Crop className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={downloadResult}
                  disabled={!resultBlob}
                  className="w-full gap-2"
                >
                  {t("toolCommon.download")} <Download className="h-4 w-4" />
                </Button>
              </div>

              {resultBlob && (
                <div className="text-sm text-muted-foreground">
                  {t("tools.onlineImageCropper.outputSizeLabel")} <span className="font-medium text-foreground">{formatFileSize(resultBlob.size)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {resultUrl && resultBlob && (
            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle>{t("tools.onlineImageCropper.resultTitle")}</CardTitle>
                <CardDescription>{t("tools.onlineImageCropper.resultDescription")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
                  <div className="md:col-span-2">
                    <div className="rounded-xl border bg-muted/30 overflow-hidden max-w-[360px]">
                      <img
                        src={resultUrl}
                        alt="Cropped result"
                        className="w-full h-auto"
                        style={{ maxHeight: 260, objectFit: "contain" }}
                      />
                    </div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Size:{" "}
                      <span className="font-medium text-foreground">
                        {formatFileSize(resultBlob.size)}
                      </span>
                      {" • "}
                      <span className="font-medium text-foreground">
                        {resultBlob.type.replace("image/", "").toUpperCase()}
                      </span>
                      {resultMeta && (
                        <>
                          {" • "}
                          <span className="font-medium text-foreground">
                            {resultMeta.width}×{resultMeta.height}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-3 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button onClick={downloadResult} className="gap-2">
                        {t("toolCommon.download")} <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={shareResult} className="gap-2">
                        {t("tools.onlineImageCropper.share")} <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={copyResultLink} className="gap-2">
                        {t("tools.onlineImageCropper.copyLink")} <Link2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" onClick={copyResultImage} className="gap-2">
                        {t("tools.onlineImageCropper.copyImage")}
                      </Button>
                    </div>

                    <ContinueWithImage
                      getBlob={() => resultBlob}
                      getFilename={() => {
                        const ext =
                          resultBlob.type === "image/webp"
                            ? "webp"
                            : resultBlob.type === "image/jpeg"
                              ? "jpg"
                              : "png";
                        return `cropped-${Date.now()}.${ext}`;
                      }}
                      onMissingBlob={() =>
                        showToast(t("tools.onlineImageCropper.continueMissingCrop"), "error")
                      }
                      items={[
                        {
                          label: t("tools.onlineImageCropper.continueCompress"),
                          description: t("tools.onlineImageCropper.continueCompressDesc"),
                          href: "/image-compressor",
                          icon: Zap,
                        },
                        {
                          label: t("tools.onlineImageCropper.continueResize"),
                          description: t("tools.onlineImageCropper.continueResizeDesc"),
                          href: "/image-resizer",
                          icon: Maximize2,
                        },
                        {
                          label: t("tools.onlineImageCropper.continueConvert"),
                          description: t("tools.onlineImageCropper.continueConvertDesc"),
                          href: "/image-converter",
                          icon: ImageIcon,
                        },
                      ]}
                    />

                    
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

export default function OnlineImageCropperPage() {
  return (
    <ToastProvider>
      <OnlineImageCropperContent />
    </ToastProvider>
  );
}

