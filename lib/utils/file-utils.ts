export interface ImageMetadata {
  width: number;
  height: number;
  size: number;
  format: string;
  mimeType: string;
}

export interface CompressionSettings {
  quality: number;
  format: string;
  resize?: {
    width?: number;
    height?: number;
    maintainAspectRatio?: boolean;
  };
  removeExifData?: boolean | 'selective';
  enableProgressive?: boolean;
  targetFileSize?: number; // in bytes
  preserveOriginalNames?: boolean;
}

export const SUPPORTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg', 
  'image/png',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
  'image/heic',
  'image/heif',
  'image/bmp',
  'image/tiff',
  'image/tif',
  'image/ico',
  'image/x-icon',
];

export const SUPPORTED_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 
  'heic', 'heif', 'bmp', 'tiff', 'tif', 'ico'
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function getMimeTypeFromExtension(extension: string): string {
  const mimeMap: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'avif': 'image/avif',
    'heic': 'image/heic',
    'heif': 'image/heif',
    'bmp': 'image/bmp',
    'tiff': 'image/tiff',
    'tif': 'image/tiff',
    'ico': 'image/x-icon',
  };
  return mimeMap[extension] || 'image/jpeg';
}

export function getImageFormat(file: File): string {
  const extension = getFileExtension(file.name);
  const mimeType = file.type.toLowerCase();
  
  if (extension === 'avif' || mimeType.includes('avif')) return 'AVIF';
  if (extension === 'heic' || mimeType.includes('heic')) return 'HEIC';
  if (extension === 'heif' || mimeType.includes('heif')) return 'HEIF';
  if (extension === 'webp' || mimeType.includes('webp')) return 'WebP';
  if (extension === 'svg' || mimeType.includes('svg')) return 'SVG';
  if (extension === 'gif' || mimeType.includes('gif')) return 'GIF';
  if (extension === 'png' || mimeType.includes('png')) return 'PNG';
  if (['jpg', 'jpeg'].includes(extension) || mimeType.includes('jpeg')) return 'JPEG';
  if (extension === 'bmp' || mimeType.includes('bmp')) return 'BMP';
  if (['tiff', 'tif'].includes(extension) || mimeType.includes('tiff')) return 'TIFF';
  if (extension === 'ico' || mimeType.includes('icon')) return 'ICO';
  
  return 'Unknown';
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { 
      valid: false, 
      error: `File too large. Maximum size is ${formatFileSize(MAX_FILE_SIZE)}` 
    };
  }

  const extension = getFileExtension(file.name);
  const isValidType = SUPPORTED_IMAGE_TYPES.includes(file.type) || 
                     SUPPORTED_EXTENSIONS.includes(extension);

  if (!isValidType) {
    return { 
      valid: false, 
      error: 'Unsupported file type. Please select a valid image file.' 
    };
  }

  return { valid: true };
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.width, height: img.height });
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    
    img.src = url;
  });
}

export async function getImageMetadata(file: File): Promise<ImageMetadata> {
  const dimensions = await getImageDimensions(file);
  return {
    width: dimensions.width,
    height: dimensions.height,
    size: file.size,
    format: getImageFormat(file),
    mimeType: file.type,
  };
}

export function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<void> {
  try {
    // Check if we're in a secure context and clipboard API is available
    if (navigator.clipboard && navigator.clipboard.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
  } catch (error) {
    console.warn('Clipboard API failed, using fallback:', error);
  }

  // Fallback method for insecure contexts or browsers without clipboard API
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    textarea.setAttribute('readonly', '');
    
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    
    if (!successful) {
      throw new Error('execCommand copy failed');
    }
  } catch (fallbackError) {
    // Final fallback - create a modal with the text for manual copying
    showManualCopyModal(text);
  }
}

export async function copyImageToClipboard(blob: Blob): Promise<void> {
  try {
    // Check if clipboard API is available and we're in secure context
    if (navigator.clipboard && navigator.clipboard.write && window.isSecureContext) {
      // Convert to PNG for maximum compatibility
      const pngBlob = await convertToPng(blob);
      const clipboardItem = new ClipboardItem({ 'image/png': pngBlob });
      await navigator.clipboard.write([clipboardItem]);
      return;
    }
  } catch (error) {
    console.warn('Clipboard API failed, using fallback:', error);
  }

  // Fallback for insecure contexts - download the image instead
  try {
    const filename = `image-${Date.now()}.png`;
    const pngBlob = await convertToPng(blob);
    downloadFile(pngBlob, filename);
    
    // Show helpful message
    showImageCopyFallbackModal(filename);
  } catch (fallbackError) {
    throw new Error('Failed to copy image. Please try downloading instead.');
  }
}

export async function pasteFromClipboard(): Promise<string | null> {
  try {
    if (navigator.clipboard && navigator.clipboard.readText && window.isSecureContext) {
      return await navigator.clipboard.readText();
    }
  } catch (error) {
    console.warn('Clipboard read failed:', error);
  }
  
  // For insecure contexts, show a modal asking user to paste manually
  return await showManualPasteModal();
}

export async function pasteImageFromClipboard(): Promise<File | null> {
  try {
    if (navigator.clipboard && navigator.clipboard.read && window.isSecureContext) {
      const clipboardItems = await navigator.clipboard.read();
      
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type);
            return new File([blob], 'pasted-image', { type: blob.type });
          }
        }
      }
    }
  } catch (error) {
    console.warn('Clipboard image read failed:', error);
  }
  
  return null;
}

export function loadImageFromUrl(url: string): Promise<File> {
  return new Promise(async (resolve, reject) => {
    // Try multiple approaches in order of preference
    
    // Method 1: Direct fetch (works for CORS-enabled images)
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'image/*',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        
        if (blob.type.startsWith('image/') || blob.size > 0) {
          const filename = url.split('/').pop()?.split('?')[0] || 'image-from-url';
          const file = new File([blob], filename, { 
            type: blob.type || getMimeTypeFromUrl(url) 
          });
          resolve(file);
          return;
        }
      }
    } catch (fetchError) {
      console.log('Direct fetch failed, trying alternative method...');
    }

    // Method 2: CORS Proxy (for stubborn CORS-blocked images)
    try {
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (response.ok) {
        const blob = await response.blob();
        
        if (blob.size > 0) {
          const filename = url.split('/').pop()?.split('?')[0] || 'image-from-url';
          const file = new File([blob], filename, { 
            type: blob.type || getMimeTypeFromUrl(url) 
          });
          resolve(file);
          return;
        }
      }
    } catch (proxyError) {
      console.log('Proxy method failed, trying image element...');
    }

    // Method 3: Image element with canvas (most reliable for CORS-blocked images)
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const filename = url.split('/').pop()?.split('?')[0] || 'image-from-url.png';
            const file = new File([blob], filename, { type: 'image/png' });
            resolve(file);
          } else {
            reject(new Error('Failed to convert image to file'));
          }
        }, 'image/png');
      } catch (canvasError) {
        reject(new Error('Failed to process image: ' + canvasError));
      }
    };
    
    img.onerror = () => {
      // Method 4: Try without crossOrigin (last resort)
      const imgFallback = new Image();
      
      imgFallback.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas not supported'));
            return;
          }
          
          canvas.width = imgFallback.naturalWidth;
          canvas.height = imgFallback.naturalHeight;
          ctx.drawImage(imgFallback, 0, 0);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const filename = url.split('/').pop()?.split('?')[0] || 'image-from-url.png';
              const file = new File([blob], filename, { type: 'image/png' });
              resolve(file);
            } else {
              reject(new Error('Failed to convert image to file'));
            }
          }, 'image/png');
        } catch (canvasError) {
          reject(new Error('All methods failed. The image URL may be invalid or the server blocks external access. Try:\n\n1. Using a direct image link (ending in .jpg, .png, etc.)\n2. Using images from CORS-friendly sources like:\n   • imgur.com\n   • i.imgur.com\n   • via.placeholder.com\n   • picsum.photos\n\n3. Downloading the image and uploading it instead'));
        }
      };
      
      imgFallback.onerror = () => {
        reject(new Error('Failed to load image. Please check:\n\n1. URL is correct and accessible\n2. URL points directly to an image file\n3. You have internet connection\n\nTry these reliable image sources:\n• https://picsum.photos/800/600\n• https://via.placeholder.com/800x600\n• Direct links from imgur.com'));
      };
      
      imgFallback.src = url;
    };
    
    img.src = url;
  });
}

function getMimeTypeFromUrl(url: string): string {
  const extension = url.split('.').pop()?.toLowerCase().split('?')[0];
  return getMimeTypeFromExtension(extension || '');
}

function validateImageBlob(blob: Blob): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve();
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Invalid image data'));
    };
    
    img.src = url;
  });
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}

export function generateTimestamp(): string {
  return new Date().toISOString().slice(0, 19).replace(/:/g, '-');
}

export function addWatermarkToFilename(originalFilename: string, toolType: string = 'processed'): string {
  const siteConfig = {
    fileWatermark: process.env.NEXT_PUBLIC_FILE_WATERMARK || 'toolspy',
  };
  
  const lastDotIndex = originalFilename.lastIndexOf('.');
  const extension = lastDotIndex > 0 
    ? originalFilename.substring(lastDotIndex) 
    : '';
  
  // Simple format: toolspy-decoded.png or toolspy-encoded.txt
  return `${siteConfig.fileWatermark}-${toolType}${extension}`;
}

export async function createZipFromFiles(files: File[], zipName: string = 'compressed-images.zip'): Promise<Blob> {
  if (!files || files.length === 0) {
    throw new Error('No files provided for ZIP creation');
  }

  console.log(`Creating ZIP with ${files.length} files:`, files.map(f => f.name));

  // Dynamically import JSZip to avoid SSR issues
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  // Keep track of used filenames to avoid duplicates
  const usedNames = new Set<string>();
  
  // Add each file to the zip with simple branded naming
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Use the file's existing name if it already follows our naming convention
    let fileName = file.name;
    
    // If the file doesn't already have our branding, keep the original name
    // The files from compression should already have the right naming format
    
    // Handle any remaining duplicate filenames by adding a counter
    let counter = 1;
    let uniqueFileName = fileName;
    while (usedNames.has(uniqueFileName)) {
      const lastDotIndex = fileName.lastIndexOf('.');
      if (lastDotIndex > 0) {
        const name = fileName.substring(0, lastDotIndex);
        const extension = fileName.substring(lastDotIndex);
        uniqueFileName = `${name}-copy${counter}${extension}`;
      } else {
        uniqueFileName = `${fileName}-copy${counter}`;
      }
      counter++;
    }
    usedNames.add(uniqueFileName);
    
    try {
      // Read file content as array buffer for proper handling
      const arrayBuffer = await file.arrayBuffer();
      
      if (arrayBuffer.byteLength === 0) {
        console.warn(`File ${uniqueFileName} is empty, skipping`);
        continue;
      }
      
      zip.file(uniqueFileName, arrayBuffer);
      console.log(`Added file ${i + 1}/${files.length}: ${uniqueFileName} (${arrayBuffer.byteLength} bytes)`);
    } catch (error) {
      console.error(`Failed to add file ${uniqueFileName}:`, error);
      // Continue with other files instead of breaking the whole process
      console.warn(`Skipping file ${uniqueFileName} due to error`);
      continue;
    }
  }
  
  const zipFileCount = Object.keys(zip.files).length;
  console.log(`Generating ZIP file with ${zipFileCount} files`);
  
  if (zipFileCount === 0) {
    throw new Error('No files were successfully added to the ZIP');
  }
  
  // Generate the zip file
  const result = await zip.generateAsync({ 
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: {
      level: 6
    }
  });
  
  console.log(`ZIP generation complete. Final ZIP size: ${result.size} bytes`);
  return result;
}

export function downloadZip(zipBlob: Blob, filename: string = 'compressed-images.zip'): void {
  downloadFile(zipBlob, filename);
} 

// Helper function to convert any image blob to PNG
async function convertToPng(blob: Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    if (!ctx) {
      reject(new Error('Canvas not supported'));
      return;
    }
    
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      
      canvas.toBlob((pngBlob) => {
        if (pngBlob) {
          resolve(pngBlob);
        } else {
          reject(new Error('Failed to convert to PNG'));
        }
      }, 'image/png', 1.0);
      
      URL.revokeObjectURL(img.src);
    };
    
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      reject(new Error('Failed to load image'));
    };
    
    img.src = URL.createObjectURL(blob);
  });
}

// Helper function to show manual copy modal
function showManualCopyModal(text: string): void {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;

  const title = document.createElement('h3');
  title.textContent = 'Manual Copy Required';
  title.style.cssText = 'margin: 0 0 15px 0; color: #333;';

  const message = document.createElement('p');
  message.textContent = 'Automatic clipboard access is not available. Please copy the text below manually:';
  message.style.cssText = 'margin: 0 0 15px 0; color: #666;';

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.cssText = `
    width: 100%;
    height: 120px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: monospace;
    resize: vertical;
  `;
  textarea.readOnly = true;

  const buttonContainer = document.createElement('div');
  buttonContainer.style.cssText = 'display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;';

  const selectButton = document.createElement('button');
  selectButton.textContent = 'Select All';
  selectButton.style.cssText = `
    padding: 8px 16px;
    background: #007cba;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  selectButton.onclick = () => {
    textarea.select();
    textarea.setSelectionRange(0, text.length);
  };

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.style.cssText = `
    padding: 8px 16px;
    background: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  closeButton.onclick = () => document.body.removeChild(modal);

  buttonContainer.appendChild(selectButton);
  buttonContainer.appendChild(closeButton);
  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(textarea);
  content.appendChild(buttonContainer);
  modal.appendChild(content);
  document.body.appendChild(modal);

  // Auto-select text
  textarea.focus();
  textarea.select();
}

// Helper function to show image copy fallback modal
function showImageCopyFallbackModal(filename: string): void {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  `;

  const content = document.createElement('div');
  content.style.cssText = `
    background: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    text-align: center;
  `;

  const title = document.createElement('h3');
  title.textContent = 'Image Downloaded';
  title.style.cssText = 'margin: 0 0 15px 0; color: #333;';

  const message = document.createElement('p');
  message.textContent = `Since automatic clipboard access is not available, the image has been downloaded as "${filename}". You can now use it in other applications.`;
  message.style.cssText = 'margin: 0 0 15px 0; color: #666; line-height: 1.5;';

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Got it';
  closeButton.style.cssText = `
    padding: 8px 20px;
    background: #007cba;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;
  closeButton.onclick = () => document.body.removeChild(modal);

  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(closeButton);
  modal.appendChild(content);
  document.body.appendChild(modal);

  // Auto-close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(modal)) {
      document.body.removeChild(modal);
    }
  }, 5000);
}

// Helper function to show manual paste modal
function showManualPasteModal(): Promise<string | null> {
  return new Promise((resolve) => {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;

    const content = document.createElement('div');
    content.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    const title = document.createElement('h3');
    title.textContent = 'Manual Paste Required';
    title.style.cssText = 'margin: 0 0 15px 0; color: #333;';

    const message = document.createElement('p');
    message.textContent = 'Please paste your content in the text area below:';
    message.style.cssText = 'margin: 0 0 15px 0; color: #666;';

    const textarea = document.createElement('textarea');
    textarea.placeholder = 'Paste your content here (Ctrl+V)...';
    textarea.style.cssText = `
      width: 100%;
      height: 120px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-family: monospace;
      resize: vertical;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = 'display: flex; gap: 10px; margin-top: 15px; justify-content: flex-end;';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Use This Text';
    confirmButton.style.cssText = `
      padding: 8px 16px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    confirmButton.onclick = () => {
      document.body.removeChild(modal);
      resolve(textarea.value.trim() || null);
    };

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
      padding: 8px 16px;
      background: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    cancelButton.onclick = () => {
      document.body.removeChild(modal);
      resolve(null);
    };

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);
    content.appendChild(title);
    content.appendChild(message);
    content.appendChild(textarea);
    content.appendChild(buttonContainer);
    modal.appendChild(content);
    document.body.appendChild(modal);

    // Focus on textarea
    textarea.focus();
  });
} 