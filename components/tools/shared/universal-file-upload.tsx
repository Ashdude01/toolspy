'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UploadCloud, Link, FileText, Image as ImageIcon, File } from 'lucide-react';
import { validateImageFile, loadImageFromUrl, pasteImageFromClipboard, isValidUrl, formatFileSize } from '@/lib/utils/file-utils';

export interface FileTypeConfig {
  name: string;
  extensions: string[];
  mimeTypes: string[];
  maxSize?: number; // in bytes
  icon: React.ReactNode;
  description: string;
  validation?: (file: File) => { valid: boolean; error?: string };
}

export const FILE_TYPE_CONFIGS: Record<string, FileTypeConfig> = {
  image: {
    name: 'Images',
    extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'avif', 'heic', 'heif', 'bmp', 'tiff', 'tif', 'ico'],
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif', 'image/heic', 'image/heif', 'image/bmp', 'image/tiff', 'image/tif', 'image/ico', 'image/x-icon'],
    maxSize: 50 * 1024 * 1024, // 50MB
    icon: <ImageIcon className="h-5 w-5" />,
    description: 'JPG, PNG, GIF, WebP, SVG, AVIF, HEIC, BMP, TIFF, ICO',
    validation: validateImageFile,
  },
  document: {
    name: 'Documents',
    extensions: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'md', 'markdown'],
    mimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/rtf', 'application/vnd.oasis.opendocument.text', 'text/markdown'],
    maxSize: 100 * 1024 * 1024, // 100MB
    icon: <FileText className="h-5 w-5" />,
    description: 'PDF, DOC, DOCX, TXT, RTF, ODT, MD',
    validation: (file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const config = FILE_TYPE_CONFIGS.document;
      
      if (file.size > (config.maxSize || 100 * 1024 * 1024)) {
        return { 
          valid: false, 
          error: `File too large. Maximum size is ${formatFileSize(config.maxSize || 100 * 1024 * 1024)}` 
        };
      }
      
      const isValidType = config.extensions.includes(extension) || 
                         config.mimeTypes.includes(file.type);
      
      if (!isValidType) {
        return { 
          valid: false, 
          error: 'Unsupported file type. Please select a valid document file.' 
        };
      }
      
      return { valid: true };
    },
  },
  markdown: {
    name: 'Markdown',
    extensions: ['md', 'markdown', 'mdown', 'mkdn', 'mkd', 'mdwn', 'mdtxt', 'mdtext'],
    mimeTypes: ['text/markdown', 'text/x-markdown', 'text/plain'],
    maxSize: 10 * 1024 * 1024, // 10MB
    icon: <FileText className="h-5 w-5" />,
    description: 'MD, MARKDOWN, MDOWN, MKDN, MKD, MDWN, MDTXT, MDTEXT',
    validation: (file: File) => {
      const extension = file.name.split('.').pop()?.toLowerCase() || '';
      const config = FILE_TYPE_CONFIGS.markdown;
      
      if (file.size > (config.maxSize || 10 * 1024 * 1024)) {
        return { 
          valid: false, 
          error: `File too large. Maximum size is ${formatFileSize(config.maxSize || 10 * 1024 * 1024)}` 
        };
      }
      
      const isValidType = config.extensions.includes(extension) || 
                         config.mimeTypes.includes(file.type) ||
                         file.name.toLowerCase().endsWith('.md');
      
      if (!isValidType) {
        return { 
          valid: false, 
          error: 'Unsupported file type. Please select a valid Markdown file.' 
        };
      }
      
      return { valid: true };
    },
  },
  any: {
    name: 'Any File',
    extensions: [],
    mimeTypes: [],
    maxSize: 100 * 1024 * 1024, // 100MB
    icon: <File className="h-5 w-5" />,
    description: 'All file types',
    validation: (file: File) => {
      if (file.size > 100 * 1024 * 1024) {
        return { 
          valid: false, 
          error: `File too large. Maximum size is ${formatFileSize(100 * 1024 * 1024)}` 
        };
      }
      return { valid: true };
    },
  },
};

interface UniversalFileUploadProps {
  onFileSelect: (files: File[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  maxFiles?: number;
  fileTypes?: string[]; // Array of file type keys from FILE_TYPE_CONFIGS
  accept?: string; // Override accept attribute
  className?: string;
  title?: string;
  description?: string;
  showUrlImport?: boolean;
  showPasteFromClipboard?: boolean;
  pasteFromClipboardSupported?: boolean;
}

export function UniversalFileUpload({ 
  onFileSelect, 
  onError, 
  multiple = false, 
  maxFiles = 1,
  fileTypes = ['any'],
  accept,
  className = '',
  title,
  description,
  showUrlImport = true,
  showPasteFromClipboard = true,
  pasteFromClipboardSupported = true,
}: UniversalFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get the primary file type config for display
  const primaryFileType = fileTypes[0] || 'any';
  const primaryConfig = FILE_TYPE_CONFIGS[primaryFileType] || FILE_TYPE_CONFIGS.any;
  
  // Generate accept attribute
  const getAcceptAttribute = () => {
    if (accept) return accept;
    
    const allExtensions = fileTypes.flatMap(type => 
      FILE_TYPE_CONFIGS[type]?.extensions || []
    );
    
    return allExtensions.map(ext => `.${ext}`).join(',');
  };

  const handleFileValidation = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      let isValid = false;
      let errorMessage = 'Invalid file';
      
      // Check against each allowed file type
      for (const fileType of fileTypes) {
        const config = FILE_TYPE_CONFIGS[fileType];
        if (config?.validation) {
          const validation = config.validation(file);
          if (validation.valid) {
            isValid = true;
            break;
          } else {
            errorMessage = validation.error || 'Invalid file';
          }
        }
      }
      
      if (isValid) {
        validFiles.push(file);
      } else {
        onError(errorMessage);
      }
    }
    
    if (validFiles.length > maxFiles) {
      onError(`You can only process up to ${maxFiles} files at once. Please select fewer files.`);
      return;
    }
    
    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  }, [onFileSelect, onError, maxFiles, fileTypes]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileValidation(files);
    }
  }, [handleFileValidation]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileValidation(files);
    }
    // Reset input
    e.target.value = '';
  }, [handleFileValidation]);

  const handleUrlImport = useCallback(async () => {
    if (!urlInput.trim()) {
      onError('Please enter a valid URL');
      return;
    }

    if (!isValidUrl(urlInput)) {
      onError('Please enter a valid HTTP or HTTPS URL');
      return;
    }

    setIsLoading(true);
    try {
      // For images, use the existing image loading function
      if (fileTypes.includes('image')) {
        const file = await loadImageFromUrl(urlInput);
        const validation = validateImageFile(file);
        
        if (validation.valid) {
          onFileSelect([file]);
          setUrlInput('');
        } else {
          onError(validation.error || 'Invalid image file');
        }
      } else {
        // For other file types, try to fetch the file directly
        const response = await fetch(urlInput);
        if (response.ok) {
          const blob = await response.blob();
          const filename = urlInput.split('/').pop()?.split('?')[0] || 'file-from-url';
          const file = new (File as any)([blob], filename, { type: blob.type });
          
          // Validate the file
          const fileArray = [file];
          handleFileValidation(fileArray);
          setUrlInput('');
        } else {
          onError('Failed to load file from URL');
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to load file from URL');
    } finally {
      setIsLoading(false);
    }
  }, [urlInput, onFileSelect, onError, fileTypes, handleFileValidation]);

  const handlePaste = useCallback(async () => {
    if (!pasteFromClipboardSupported || !fileTypes.includes('image')) {
      onError('Paste from clipboard is only supported for images');
      return;
    }

    setIsLoading(true);
    try {
      const file = await pasteImageFromClipboard();
      if (file) {
        const validation = validateImageFile(file);
        if (validation.valid) {
          onFileSelect([file]);
        } else {
          onError(validation.error || 'Invalid image file');
        }
      } else {
        onError('No image found in clipboard');
      }
    } catch (error) {
      onError('Failed to paste from clipboard. Please allow clipboard permissions.');
    } finally {
      setIsLoading(false);
    }
  }, [onFileSelect, onError, fileTypes, pasteFromClipboardSupported]);

  // Add keyboard shortcut for Ctrl+V
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !isLoading && showPasteFromClipboard) {
        // Check if we're not in an input field
        const activeElement = document.activeElement;
        if (activeElement && (
          activeElement.tagName === 'INPUT' || 
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.getAttribute('contenteditable') === 'true'
        )) {
          return; // Don't handle if user is typing in an input
        }
        
        e.preventDefault();
        handlePaste();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePaste, isLoading, showPasteFromClipboard]);

  const displayTitle = title || `Drag and drop your ${primaryConfig.name.toLowerCase()}${multiple ? 's' : ''} here`;
  const displayDescription = description || `Supports ${primaryConfig.description}${multiple ? ` • Up to ${maxFiles} files` : ''}`;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Upload Area */}
      <Card
        className={`
          relative border-2 border-dashed transition-colors duration-200 cursor-pointer min-h-[280px] bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 hover:dark:bg-slate-800
          ${isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('universal-file-input')?.click()}
      >
        <div className="p-5 md:p-12 text-center">
          {/* Upload Icon */}
          <div className="relative mb-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              {primaryConfig.icon}
            </div>
          </div>

          {/* Main Text */}
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            {displayTitle}
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Button 
              variant="secondary" 
              className="h-auto text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('universal-file-input')?.click();
              }}
            >
              Browse Files
            </Button>
            {showPasteFromClipboard && pasteFromClipboardSupported && fileTypes.includes('image') && (
              <>
                <span className="text-muted-foreground">•</span>
                <Button 
                  variant="secondary" 
                  className="h-auto text-purple-600 hover:text-purple-700 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePaste();
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Pasting...' : 'Paste from Clipboard'}
                </Button>
              </>
            )}
          </div>

          {/* Supported Formats */}
          <p className="text-sm text-muted-foreground">
            {displayDescription}
          </p>

          {/* Keyboard Shortcut Hint */}
          {showPasteFromClipboard && pasteFromClipboardSupported && fileTypes.includes('image') && (
            <p className="text-xs text-muted-foreground mt-2">
              Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> to paste image
            </p>
          )}
          
          {/* URL Import */}
          {showUrlImport && (
            <Card className="p-4 mt-6" onClick={(e) => e.stopPropagation()}>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Link className="h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={`Enter ${primaryConfig.name.toLowerCase()} URL...`}
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlImport()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleUrlImport}
                    disabled={!urlInput.trim() || isLoading}
                    size="sm"
                  >
                    {isLoading ? 'Loading...' : 'Import'}
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
        
        <input
          id="universal-file-input"
          type="file"
          accept={getAcceptAttribute()}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
      </Card>
    </div>
  );
}
