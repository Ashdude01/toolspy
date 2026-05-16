export const PAGE_SIZE_OPTIONS = [
  { value: "a1", label: "A1 (594 × 841 mm)" },
  { value: "a2", label: "A2 (420 × 594 mm)" },
  { value: "a3", label: "A3 (297 × 420 mm)" },
  { value: "a4", label: "A4 (210 × 297 mm)" },
  { value: "a5", label: "A5 (148 × 210 mm)" },
  { value: "letter", label: "Letter (8.5 × 11 in)" },
  { value: "legal", label: "Legal (8.5 × 14 in)" },
  { value: "tabloid", label: "Tabloid (11 × 17 in)" },
  { value: "executive", label: "Executive (7.25 × 10.5 in)" },
] as const;

export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number]["value"];
export type Orientation = "portrait" | "landscape";
export type MarginPreset = "none" | "small" | "medium" | "large" | "custom";

export interface ImageToPdfOptions {
  pageSize: PageSize;
  orientation: Orientation;
  marginPreset: MarginPreset;
  /** Used when marginPreset is "custom"; value is millimetres (same unit as jsPDF mm). */
  customMarginMm?: number;
}

function getMarginMm(
  marginPreset: MarginPreset,
  customMarginMm?: number
): number {
  switch (marginPreset) {
    case "none":
      return 0;
    case "small":
      return 10;
    case "medium":
      return 20;
    case "large":
      return 30;
    case "custom":
      return Math.max(0, customMarginMm ?? 0);
    default:
      return 20;
  }
}

function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load ${file.name}`));
    };
    img.src = url;
  });
}

function getJsPdfImageFormat(file: File): "JPEG" | "PNG" {
  if (file.type === "image/png" || file.type === "image/gif") {
    return "PNG";
  }
  return "JPEG";
}

function imageToDataUrl(
  img: HTMLImageElement,
  format: "JPEG" | "PNG"
): string {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not prepare image for PDF");
  }
  ctx.drawImage(img, 0, 0);
  const mime = format === "PNG" ? "image/png" : "image/jpeg";
  return canvas.toDataURL(mime, 0.92);
}

export async function convertImagesToPdf(
  files: File[],
  options: ImageToPdfOptions,
  onProgress?: (current: number, total: number, fileName: string) => void
): Promise<Blob> {
  if (files.length === 0) {
    throw new Error("No images selected");
  }

  const marginMm = getMarginMm(options.marginPreset, options.customMarginMm);
  const { jsPDF } = await import("jspdf");

  let pdf: InstanceType<typeof jsPDF> | null = null;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);

    const img = await loadImageFromFile(file);
    const format = getJsPdfImageFormat(file);
    const dataUrl = imageToDataUrl(img, format);

    if (i === 0) {
      pdf = new jsPDF({
        orientation: options.orientation,
        unit: "mm",
        format: options.pageSize,
      });
    } else {
      pdf!.addPage(options.pageSize, options.orientation);
    }

    const pdfWidth = pdf!.internal.pageSize.getWidth();
    const pdfHeight = pdf!.internal.pageSize.getHeight();
    const availableWidth = pdfWidth - marginMm * 2;
    const availableHeight = pdfHeight - marginMm * 2;

    if (availableWidth <= 0 || availableHeight <= 0) {
      throw new Error("Margins are too large for the selected page size");
    }

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const availAspect = availableWidth / availableHeight;

    let imgW: number;
    let imgH: number;
    if (imgAspect > availAspect) {
      imgW = availableWidth;
      imgH = availableWidth / imgAspect;
    } else {
      imgH = availableHeight;
      imgW = availableHeight * imgAspect;
    }

    const x = (pdfWidth - imgW) / 2;
    const y = (pdfHeight - imgH) / 2;

    pdf!.addImage(dataUrl, format, x, y, imgW, imgH, undefined, "FAST");
  }

  return pdf!.output("blob");
}
