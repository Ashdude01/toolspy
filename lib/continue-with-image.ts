import { tryCopyImageToClipboard } from "@/lib/utils/file-utils";
import {
  saveToolImageHandoff,
  TOOLSPY_HANDOFF_QUERY,
  type ToolspyHandoffRecord,
} from "@/lib/toolspy-image-handoff";

function defaultFilename(blob: Blob): string {
  const ext =
    blob.type === "image/webp"
      ? "webp"
      : blob.type === "image/jpeg" || blob.type === "image/jpg"
        ? "jpg"
        : blob.type === "image/png"
          ? "png"
          : "png";
  return `toolspy-image-${Date.now()}.${ext}`;
}

/**
 * Persist image + optional clipboard copy, then full-navigate so any tool page can pick it up.
 * `path` should be like `/image-compressor` (leading slash, no query).
 */
export async function continueWithImageToTool(
  blob: Blob,
  path: string,
  options?: { filename?: string; copyToClipboard?: boolean }
): Promise<void> {
  const id = crypto.randomUUID();
  const filename = options?.filename ?? defaultFilename(blob);
  const record: ToolspyHandoffRecord = { blob, filename };
  await saveToolImageHandoff(id, record);

  const copy = options?.copyToClipboard !== false;
  if (copy && typeof navigator !== "undefined") {
    await tryCopyImageToClipboard(blob);
  }

  const base = path.startsWith("/") ? path : `/${path}`;
  const sep = base.includes("?") ? "&" : "?";
  const url = `${base}${sep}${TOOLSPY_HANDOFF_QUERY}=${encodeURIComponent(id)}`;
  window.location.assign(url);
}

export { TOOLSPY_HANDOFF_QUERY };
