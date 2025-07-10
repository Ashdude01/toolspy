export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to Base64'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

export function base64ToBlob(base64String: string): Blob {
  // Extract format and data
  const { format, data } = parseBase64String(base64String);
  
  // Convert base64 to binary
  const binaryString = atob(data);
  const bytes = new Uint8Array(binaryString.length);
  
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return new Blob([bytes], { type: format });
}

export function parseBase64String(base64String: string): { format: string; data: string } {
  // Handle data URLs
  if (base64String.startsWith('data:')) {
    const match = base64String.match(/^data:(image\/[a-zA-Z]+);base64,(.+)$/);
    if (match) {
      return {
        format: match[1],
        data: match[2]
      };
    }
  }
  
  // Handle raw base64 with format detection
  const data = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
  const format = detectImageFormatFromBase64(data);
  
  return { format, data };
}

export function detectImageFormatFromBase64(base64Data: string): string {
  try {
    const binaryString = atob(base64Data);
    
    // Check file signatures
    if (binaryString.startsWith('\xFF\xD8\xFF')) return 'image/jpeg';
    if (binaryString.startsWith('\x89PNG')) return 'image/png';
    if (binaryString.startsWith('GIF87a') || binaryString.startsWith('GIF89a')) return 'image/gif';
    if (binaryString.startsWith('RIFF') && binaryString.includes('WEBP')) return 'image/webp';
    if (binaryString.includes('ftypavif')) return 'image/avif';
    if (binaryString.includes('ftypheic')) return 'image/heic';
    if (binaryString.includes('ftypheif')) return 'image/heif';
    if (binaryString.startsWith('BM')) return 'image/bmp';
    if (binaryString.startsWith('II*\0') || binaryString.startsWith('MM\0*')) return 'image/tiff';
    if (binaryString.startsWith('\0\0\x01\0')) return 'image/x-icon';
    if (binaryString.includes('<svg')) return 'image/svg+xml';
    
    // Default fallback
    return 'image/png';
  } catch (error) {
    return 'image/png';
  }
}

export function isValidBase64(str: string): boolean {
  try {
    // Remove data URL prefix if present
    const base64Data = str.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
    
    // Check if it's valid base64
    return btoa(atob(base64Data)) === base64Data;
  } catch (error) {
    return false;
  }
}

export function getBase64ImageFormat(base64String: string): string {
  const match = base64String.match(/^data:image\/([a-zA-Z]+);base64,/);
  if (match) {
    return match[1].toUpperCase();
  }
  
  // Try to detect from binary data
  try {
    const data = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
    const format = detectImageFormatFromBase64(data);
    return format.split('/')[1]?.toUpperCase() || 'Unknown';
  } catch {
    return 'Unknown';
  }
}

export function base64ToFile(base64String: string, filename?: string): File {
  const blob = base64ToBlob(base64String);
  const { format } = parseBase64String(base64String);
  
  // Generate filename if not provided
  if (!filename) {
    const extension = getExtensionFromMimeType(format);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    filename = `decoded-image-${timestamp}.${extension}`;
  }
  
  return new File([blob], filename, { type: format });
}

function getExtensionFromMimeType(mimeType: string): string {
  const extensionMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/avif': 'avif',
    'image/heic': 'heic',
    'image/heif': 'heif',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
    'image/x-icon': 'ico',
  };
  
  return extensionMap[mimeType] || 'png';
}

export function getBase64Size(base64String: string): number {
  // Remove data URL prefix
  const data = base64String.replace(/^data:image\/[a-zA-Z]+;base64,/, '');
  
  // Calculate approximate file size (base64 is ~33% larger than binary)
  return Math.round((data.length * 3) / 4);
}

export function validateBase64Image(base64String: string): { valid: boolean; error?: string; format?: string } {
  if (!base64String || typeof base64String !== 'string') {
    return { valid: false, error: 'Invalid Base64 string' };
  }
  
  if (!isValidBase64(base64String)) {
    return { valid: false, error: 'Invalid Base64 format' };
  }
  
  const size = getBase64Size(base64String);
  const maxSize = 50 * 1024 * 1024; // 50MB
  
  if (size > maxSize) {
    return { 
      valid: false, 
      error: `Image too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB` 
    };
  }
  
  const format = getBase64ImageFormat(base64String);
  
  return { valid: true, format };
}

export function createImageFromBase64(base64String: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image from Base64'));
    img.src = base64String.startsWith('data:') ? base64String : `data:image/png;base64,${base64String}`;
  });
} 