'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UploadCloud, Link, Clipboard, X, Cloud } from 'lucide-react';
import { validateImageFile, loadImageFromUrl, pasteImageFromClipboard, isValidUrl } from '@/lib/utils/file-utils';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles?: number;
  className?: string;
}

export function FileUpload({ 
  onFileSelect, 
  onError, 
  multiple = false, 
  accept = 'image/*',
  maxFiles = 10,
  className = '' 
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileValidation = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    
    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        onError(validation.error || 'Invalid file');
      }
    }
    
    if (validFiles.length > maxFiles) {
      onError(`Maximum ${maxFiles} files allowed`);
      return;
    }
    
    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  }, [onFileSelect, onError, maxFiles]);

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
      const file = await loadImageFromUrl(urlInput);
      const validation = validateImageFile(file);
      
      if (validation.valid) {
        onFileSelect([file]);
        setUrlInput('');
      } else {
        onError(validation.error || 'Invalid image file');
      }
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to load image from URL');
    } finally {
      setIsLoading(false);
    }
  }, [urlInput, onFileSelect, onError]);

  const handlePaste = useCallback(async () => {
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
  }, [onFileSelect, onError]);

  // Add keyboard shortcut for Ctrl+V
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'v' && !isLoading) {
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
  }, [handlePaste, isLoading]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Upload Area */}
      <Card
        className={`
          relative border-2 border-dashed transition-colors duration-200 cursor-pointer min-h-[280px]
          ${isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <div className="p-12 text-center">
          {/* Cloud Upload Icon */}
          <div className="relative mb-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <UploadCloud className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          {/* Main Text */}
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Drag and drop your image here
          </h3>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Button 
              variant="secondary" 
              className="h-auto text-blue-600 hover:text-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-input')?.click();
              }}
            >
              Browse & Upload
            </Button>
            <span className="text-muted-foreground">•</span>
            <Button 
              variant="secondary" 
              className="h-auto text-purple-600 hover:text-purple-700"
              onClick={(e) => {
                e.stopPropagation();
                handlePaste();
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Pasting...' : 'Paste from Clipboard'}
            </Button>
          </div>

          {/* Supported Formats */}
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG, GIF, WebP, SVG, AVIF, HEIC, BMP, TIFF, ICO • Max 10MB
          </p>

          {/* Keyboard Shortcut Hint */}
          <p className="text-xs text-muted-foreground mt-2">
            Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> to paste image
          </p>
        </div>
        
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
      </Card>

      {/* URL Import */}
      {/* <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Link className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter image URL..."
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
          <div className="text-xs text-muted-foreground">
            <strong>Tip:</strong> For best results, try these reliable sources:
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
              <span>• picsum.photos (random images)</span>
              <span>• via.placeholder.com (placeholders)</span>
              <span>• i.imgur.com (direct links)</span>
              <span>• Direct image URLs (.jpg, .png)</span>
            </div>
          </div>
        </div>
      </Card> */}

      {/* Paste from Clipboard */}
      {/* <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clipboard className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Paste from Clipboard</span>
            <span className='text-xs text-muted-foreground'>Ctrl + V</span>
          </div>
          <Button 
            onClick={handlePaste}
            disabled={isLoading}
            variant="default"
            size="sm"
          >
            {isLoading ? 'Pasting...' : 'Paste Image'}
          </Button>
        </div>
      </Card> */}
    </div>
  );
} 