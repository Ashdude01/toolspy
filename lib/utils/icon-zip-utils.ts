/**
 * Specialized ZIP utilities for icon generator tools
 * Creates simplified folder structure: platform folders with direct icon files + manifest.json
 */

export interface IconFile {
  file: File;
  platform: string;
  size?: string;
  name?: string;
}

export interface IconZipOptions {
  zipName: string;
  manifestContent: string;
  watermark?: string;
}

/**
 * Creates a ZIP file with simplified folder structure for icon generators
 * Structure: 
 * - android/ (contains all android icon files directly)
 * - ios/ (contains all ios icon files directly)
 * - manifest.json (in root)
 */
export async function createIconZip(
  iconFiles: IconFile[],
  options: IconZipOptions
): Promise<Blob> {
  if (!iconFiles || iconFiles.length === 0) {
    throw new Error('No icon files provided for ZIP creation');
  }

  // Dynamically import JSZip to avoid SSR issues
  const JSZip = (await import('jszip')).default;
  const zip = new JSZip();
  
  // Group files by platform
  const platformGroups: { [platform: string]: File[] } = {};
  
  iconFiles.forEach(({ file, platform }) => {
    if (!platformGroups[platform]) {
      platformGroups[platform] = [];
    }
    platformGroups[platform].push(file);
  });

  // Add files to ZIP with simple platform folder structure
  Object.entries(platformGroups).forEach(([platform, files]) => {
    files.forEach((file) => {
      // Add file directly to platform folder (no subfolders)
      zip.file(`${platform}/${file.name}`, file);
    });
  });

  // Add manifest.json to root
  if (options.manifestContent) {
    zip.file('manifest.json', options.manifestContent);
  }

  const zipFileCount = Object.keys(zip.files).length;

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

  return result;
}

/**
 * Downloads the icon ZIP file with proper naming
 */
export function downloadIconZip(zipBlob: Blob, filename: string): void {
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

