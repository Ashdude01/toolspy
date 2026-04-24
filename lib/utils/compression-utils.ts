import { CompressionSettings } from './file-utils';
import { siteConfig } from '@/lib/config';

export const COMPRESSION_PRESETS = {
  'balanced': { quality: 85, format: 'original' },
  'high-quality': { quality: 95, format: 'original' },
  'max-compression': { quality: 60, format: 'webp' },
  'web-optimized': { quality: 80, format: 'webp' }
} as const;

export type CompressionPreset = keyof typeof COMPRESSION_PRESETS;

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  format: string;
}

export async function compressImage(
  file: File, 
  settings: CompressionSettings,
  index?: number,
  options?: { signal?: AbortSignal }
): Promise<File> {
  return new Promise((resolve, reject) => {
    const signal = options?.signal;
    if (signal?.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    let cleanedUp = false;

    const cleanup = () => {
      if (cleanedUp) return;
      cleanedUp = true;
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {}
      if (signal) signal.removeEventListener('abort', onAbort);
      img.onload = null;
      img.onerror = null;
    };

    const onAbort = () => {
      cleanup();
      reject(new DOMException('Aborted', 'AbortError'));
    };

    if (signal) {
      signal.addEventListener('abort', onAbort, { once: true });
    }
    
    if (!ctx) {
      cleanup();
      reject(new Error('Canvas not supported'));
      return;
    }
    
    img.onload = async () => {
      try {
        if (signal?.aborted) {
          cleanup();
          reject(new DOMException('Aborted', 'AbortError'));
          return;
        }
        // Calculate dimensions
        let { width, height } = calculateDimensions(
          img.width, 
          img.height, 
          settings.resize
        );
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Determine output format
        const outputFormat = getOutputFormat(settings.format, file.type);
        
        // Handle target file size priority
        if (settings.targetFileSize) {
          const result = await compressToTargetSize(
            canvas, 
            outputFormat, 
            settings.targetFileSize,
            settings.enableProgressive
          );
          if (result) {
            const filename = generateCompressedFilename(file.name, outputFormat, index, settings.preserveOriginalNames);
            const compressedFile = new File([result], filename, { 
              type: outputFormat 
            });
            cleanup();
            resolve(compressedFile);
            return;
          }
        }
        
        // Fallback to quality-based compression
        const quality = settings.quality / 100;
        
        canvas.toBlob(
          (blob) => {
            if (signal?.aborted) {
              cleanup();
              reject(new DOMException('Aborted', 'AbortError'));
              return;
            }
            if (blob) {
              const filename = generateCompressedFilename(file.name, outputFormat, index, settings.preserveOriginalNames);
              const compressedFile = new File([blob], filename, { 
                type: outputFormat 
              });
              cleanup();
              resolve(compressedFile);
            } else {
              cleanup();
              reject(new Error('Failed to compress image'));
            }
          },
          outputFormat,
          quality
        );
      } catch (error) {
        cleanup();
        reject(error);
      }
    };
    
    img.onerror = () => {
      cleanup();
      reject(new Error('Failed to load image'));
    };
    img.src = objectUrl;
  });
}

function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  resize?: CompressionSettings['resize']
): { width: number; height: number } {
  if (!resize) {
    return { width: originalWidth, height: originalHeight };
  }
  
  let { width, height } = resize;
  const aspectRatio = originalWidth / originalHeight;
  
  if (width && height) {
    if (resize.maintainAspectRatio) {
      // Fit within bounds while maintaining aspect ratio
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
    }
  } else if (width) {
    height = width / aspectRatio;
  } else if (height) {
    width = height * aspectRatio;
  } else {
    return { width: originalWidth, height: originalHeight };
  }
  
  return { 
    width: Math.round(width), 
    height: Math.round(height) 
  };
}

function getOutputFormat(format: string, originalType: string): string {
  if (format === 'original') {
    return originalType || 'image/jpeg';
  }
  
  const formatMap: Record<string, string> = {
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'webp': 'image/webp',
    'avif': 'image/avif',
  };
  
  return formatMap[format] || 'image/jpeg';
}

function generateCompressedFilename(originalName: string, outputFormat: string, index?: number, preserveOriginalNames?: boolean): string {
  const extension = getExtensionFromMimeType(outputFormat);
  
  if (preserveOriginalNames) {
    // Keep original filename, just change extension if needed
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    return `${nameWithoutExt}.${extension}`;
  }
  
  const watermark = siteConfig.fileWatermark;
  
  // Simple format: toolspy-compressed-1.jpg
  const fileIndex = index !== undefined ? index + 1 : 1;
  return `${watermark}-compressed-${fileIndex}.${extension}`;
}

function getExtensionFromMimeType(mimeType: string): string {
  const extensionMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/gif': 'gif',
  };
  
  return extensionMap[mimeType] || 'jpg';
}

async function compressToTargetSize(
  canvas: HTMLCanvasElement,
  outputFormat: string,
  targetSizeBytes: number,
  enableProgressive?: boolean
): Promise<Blob | null> {
  const toBlobAsync = (
    c: HTMLCanvasElement,
    type: string,
    quality?: number
  ): Promise<Blob> =>
    new Promise((resolve, reject) => {
      c.toBlob(
        (b) => (b ? resolve(b) : reject(new Error("Failed to compress image"))),
        type,
        quality
      );
    });

  // PNG ignores quality; target size control needs a lossy format.
  const targetFriendlyFormat =
    outputFormat === "image/png" ? "image/webp" : outputFormat;

  const tolerance = Math.max(1024, Math.round(targetSizeBytes * 0.07)); // ~7% or at least 1KB
  const minQ = 0.12;
  const maxQ = 0.95;

  const searchQuality = async (
    c: HTMLCanvasElement
  ): Promise<{ blob: Blob; q: number } | null> => {
    // If format doesn't support quality, just do one pass and return it.
    if (targetFriendlyFormat === "image/png") {
      const blob = await toBlobAsync(c, targetFriendlyFormat);
      return { blob, q: 1 };
    }

    let lo = minQ;
    let hi = maxQ;
    let best: { blob: Blob; q: number } | null = null;

    // 7-8 iterations is a good tradeoff between speed and precision.
    for (let i = 0; i < 8; i++) {
      const q = (lo + hi) / 2;
      const blob = await toBlobAsync(c, targetFriendlyFormat, q);

      const diff = Math.abs(blob.size - targetSizeBytes);
      const bestDiff = best ? Math.abs(best.blob.size - targetSizeBytes) : Infinity;
      if (diff < bestDiff) best = { blob, q };

      if (blob.size > targetSizeBytes + tolerance) {
        hi = q;
      } else if (blob.size < targetSizeBytes - tolerance) {
        lo = q;
      } else {
        return { blob, q };
      }
    }

    return best;
  };

  try {
    // 1) Try quality tuning first (fastest path).
    const first = await searchQuality(canvas);
    if (!first) return null;

    // 2) If we still can't get close enough (usually for very detailed images),
    // downscale slightly and retry. This makes "around target size" achievable.
    let best = first.blob;
    let workingCanvas = canvas;

    for (let attempt = 0; attempt < 3; attempt++) {
      if (Math.abs(best.size - targetSizeBytes) <= tolerance) return best;

      // If we're under target, keep the best we found—don't upscale.
      if (best.size < targetSizeBytes) return best;

      const ratio = targetSizeBytes / best.size;
      const scale = Math.max(0.35, Math.min(0.95, Math.sqrt(ratio) * 0.98));
      if (scale >= 0.95) return best;

      const nextW = Math.max(1, Math.round(workingCanvas.width * scale));
      const nextH = Math.max(1, Math.round(workingCanvas.height * scale));
      if (nextW === workingCanvas.width || nextH === workingCanvas.height) return best;

      const down = document.createElement("canvas");
      down.width = nextW;
      down.height = nextH;
      const dctx = down.getContext("2d");
      if (!dctx) return best;
      dctx.drawImage(workingCanvas, 0, 0, nextW, nextH);

      workingCanvas = down;
      const next = await searchQuality(workingCanvas);
      if (!next) return best;
      best = next.blob;
    }

    return best;
  } catch {
    return null;
  }
}

// Advanced compression with browser-image-compression library fallback
export async function compressImageAdvanced(
  file: File,
  settings: CompressionSettings
): Promise<File> {
  try {
    // Try to use browser-image-compression if available
    if (typeof window !== 'undefined' && (window as any).imageCompression) {
      const options = {
        maxSizeMB: 10,
        maxWidthOrHeight: settings.resize?.width || settings.resize?.height || 1920,
        useWebWorker: true,
        quality: settings.quality / 100,
      };
      
      return await (window as any).imageCompression(file, options);
    }
  } catch (error) {
    console.warn('Advanced compression failed, falling back to canvas compression:', error);
  }
  
  // Fallback to canvas compression
  return compressImage(file, settings);
}

export function getCompressionEstimate(
  originalSize: number,
  quality: number,
  format: string
): number {
  // Rough estimates based on typical compression ratios
  const baseRatio = quality / 100;
  
  const formatMultipliers: Record<string, number> = {
    'image/jpeg': 0.8,
    'image/webp': 0.6,
    'image/avif': 0.4,
    'image/png': 0.9,
    'original': 0.8,
  };
  
  const multiplier = formatMultipliers[format] || 0.8;
  return Math.round(originalSize * baseRatio * multiplier);
}

export async function batchCompress(
  files: File[],
  settings: CompressionSettings,
  onProgress?: (current: number, total: number, currentFile: string) => void,
  options?: { signal?: AbortSignal }
): Promise<CompressionResult[]> {
  const results: CompressionResult[] = [];
  const signal = options?.signal;
  
  for (let i = 0; i < files.length; i++) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const file = files[i];
    onProgress?.(i + 1, files.length, file.name);
    
    try {
      const compressedFile = await compressImage(file, settings, i, { signal });
      const compressionRatio = Math.round(((file.size - compressedFile.size) / file.size) * 100);
      
      results.push({
        file: compressedFile,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        compressionRatio,
        format: getExtensionFromMimeType(compressedFile.type),
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        throw error;
      }
      console.error(`Failed to compress ${file.name}:`, error);
    }
  }
  
  onProgress?.(files.length, files.length, 'Complete');
  return results;
} 