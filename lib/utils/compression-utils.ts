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
  index?: number
): Promise<File> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Canvas not supported'));
      return;
    }
    
    img.onload = async () => {
      try {
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
            const filename = generateCompressedFilename(file.name, outputFormat, index);
            const compressedFile = new File([result], filename, { 
              type: outputFormat 
            });
            resolve(compressedFile);
            return;
          }
        }
        
        // Fallback to quality-based compression
        const quality = settings.quality / 100;
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const filename = generateCompressedFilename(file.name, outputFormat, index);
              const compressedFile = new File([blob], filename, { 
                type: outputFormat 
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          outputFormat,
          quality
        );
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
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
    return originalType;
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

function generateCompressedFilename(originalName: string, outputFormat: string, index?: number): string {
  const extension = getExtensionFromMimeType(outputFormat);
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
  return new Promise((resolve) => {
    let quality = 0.9; // Start with high quality
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryCompress = () => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(null);
            return;
          }
          
          if (blob.size <= targetSizeBytes || attempts >= maxAttempts) {
            resolve(blob);
          } else {
            // Reduce quality and try again
            quality *= 0.8; // Reduce by 20% each time
            attempts++;
            if (quality < 0.1) quality = 0.1; // Minimum quality
            tryCompress();
          }
        },
        outputFormat,
        quality
      );
    };
    
    tryCompress();
  });
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
  onProgress?: (current: number, total: number, currentFile: string) => void
): Promise<CompressionResult[]> {
  const results: CompressionResult[] = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    onProgress?.(i, files.length, file.name);
    
    try {
      const compressedFile = await compressImage(file, settings, i);
      const compressionRatio = Math.round(((file.size - compressedFile.size) / file.size) * 100);
      
      results.push({
        file: compressedFile,
        originalSize: file.size,
        compressedSize: compressedFile.size,
        compressionRatio,
        format: getExtensionFromMimeType(compressedFile.type),
      });
    } catch (error) {
      console.error(`Failed to compress ${file.name}:`, error);
    }
  }
  
  onProgress?.(files.length, files.length, 'Complete');
  return results;
} 