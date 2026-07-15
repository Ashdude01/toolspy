// Generic, framework-agnostic helpers for exporting a result "share card".
// A tool supplies a self-contained SVG string (no external CSS/fonts) and a
// size; these helpers rasterize it to PNG via <canvas>, trigger downloads, and
// wrap it into a PDF using jsPDF. Shared across every tool's share feature so
// the rasterization logic lives in exactly one place.

export interface CardSize {
  width: number;
  height: number;
}

/** Rasterize a standalone SVG string to a PNG data URL using an offscreen canvas. */
export function svgToPngDataUrl(
  svg: string,
  size: CardSize,
  scale = 2,
  background = "#ffffff"
): Promise<string> {
  return new Promise((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = size.width * scale;
        canvas.height = size.height * scale;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas 2D context unavailable");
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to render share image"));
    };
    img.src = url;
  });
}

/** Trigger a browser download for a data URL. */
export function downloadDataUrl(dataUrl: string, filename: string): void {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Build a single-page, card-sized PDF from a PNG data URL via jsPDF. */
export async function pngToPdf(
  pngDataUrl: string,
  size: CardSize,
  filename: string,
  orientation: "landscape" | "portrait" = "landscape"
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ orientation, unit: "px", format: [size.width, size.height] });
  doc.addImage(pngDataUrl, "PNG", 0, 0, size.width, size.height);
  doc.save(filename);
}

/** Copy text to the clipboard; returns true on success, false if it fell back. */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (typeof window !== "undefined") window.prompt("Copy your share link:", text);
    return false;
  }
}
