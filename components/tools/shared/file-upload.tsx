'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UploadCloud, Link, ChevronDown, ChevronUp } from 'lucide-react';
import { validateImageFile, loadImageFromUrl, pasteImageFromClipboard, isValidUrl } from '@/lib/utils/file-utils';
import { BrandedUploadModal } from './branded-upload-modal';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  accept?: string;
  maxFiles: number;
  className?: string;
  collapsed?: boolean; // Manual control for collapsed state (optional)
  onToggleCollapse?: () => void; // Callback to toggle collapse
  autoCollapse?: boolean; // Automatically collapse when files are uploaded (default: true)
  // Branded modal props
  showBrandedModal?: boolean; // Enable/disable branded modal (default: true)
  modalDuration?: number; // Duration in milliseconds (default: 2000)
  onModalClose?: () => void; // Callback when modal closes
  /** Show the branded “uploading” overlay while importing from URLs (e.g. extension_data). */
  importInProgress?: boolean;
  importModalMessage?: string;
  importModalSubMessage?: string;
  // Ad placement zones (for future use)
  adSlotTop?: React.ReactNode; // Ad component to show above modal
  adSlotBottom?: React.ReactNode; // Ad component to show below modal
  adSlotLeft?: React.ReactNode; // Ad component to show left of modal
  adSlotRight?: React.ReactNode; // Ad component to show right of modal
}

export function FileUpload({ 
  onFileSelect, 
  onError, 
  multiple = false, 
  accept = 'image/*',
  maxFiles,
  className = '',
  collapsed: externalCollapsed,
  onToggleCollapse,
  autoCollapse = true,
  showBrandedModal = true,
  modalDuration = 2000,
  onModalClose,
  importInProgress = false,
  importModalMessage = 'Importing images',
  importModalSubMessage = 'Fetching your images-this may take a moment…',
  adSlotTop,
  adSlotBottom,
  adSlotLeft,
  adSlotRight
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  // Use external collapsed state if provided, otherwise use internal state
  const collapsed = externalCollapsed !== undefined ? externalCollapsed : internalCollapsed;

  // Wrapper for file selection that shows modal - defined first to avoid hoisting issues
  const handleFileSelectWithModal = useCallback((files: File[]) => {
    if (showBrandedModal && files.length > 0) {
      setIsUploadModalOpen(true);
      // Delay file selection slightly to show modal first
      setTimeout(() => {
        onFileSelect(files);
        // Auto-collapse if enabled and not externally controlled
        if (autoCollapse && externalCollapsed === undefined) {
          setInternalCollapsed(true);
        }
      }, 100);
    } else {
      onFileSelect(files);
      // Auto-collapse if enabled and not externally controlled
      if (autoCollapse && externalCollapsed === undefined) {
        setInternalCollapsed(true);
      }
    }
  }, [onFileSelect, showBrandedModal, autoCollapse, externalCollapsed]);

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
      onError(`You can only process up to ${maxFiles} files at once. Please select fewer files.`);
      return;
    }
    
    if (validFiles.length > 0) {
      handleFileSelectWithModal(validFiles);
    }
  }, [handleFileSelectWithModal, onError, maxFiles]);

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
        handleFileSelectWithModal([file]);
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
          handleFileSelectWithModal([file]);
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
    <div className={`space-y-4 transition-all duration-300 mb-6 sm:mb-8 ${className}`}>
      {/* Main Upload Area */}
      <Card
        className={`
          relative border-2 border-dashed transition-all duration-300 overflow-hidden bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 hover:dark:bg-slate-800
          ${collapsed 
            ? 'min-h-[80px] cursor-pointer' 
            : 'min-h-[280px] cursor-pointer'
          }
          ${isDragOver 
            ? 'border-primary bg-primary/5' 
            : 'border-muted-foreground/25 hover:border-primary/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={collapsed ? () => document.getElementById('file-input')?.click() : () => document.getElementById('file-input')?.click()}
      >
        {collapsed ? (
          // Collapsed View
          <div className="p-4 flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 flex-1 cursor-pointer"
              onClick={() => document.getElementById('file-input')?.click()}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <UploadCloud className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Add More Images</h3>
                <p className="text-xs text-muted-foreground">Click to upload or drag and drop</p>
              </div>
            </div>
            {(onToggleCollapse || (autoCollapse && externalCollapsed === undefined)) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onToggleCollapse) {
                    onToggleCollapse();
                  } else if (autoCollapse && externalCollapsed === undefined) {
                    setInternalCollapsed(!internalCollapsed);
                  }
                }}
                className="flex-shrink-0"
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            )}
            <input
              id="file-input"
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        ) : (
          // Expanded View
          <>
            <div className="p-5 md:p-12 text-center">
          {/* Cloud Upload Icon */}
          <div className="relative mb-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
              <UploadCloud className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Drop images here to compress
          </h3>
          <p className="mb-5 text-sm text-muted-foreground">
            Or choose a clear action below — files stay on your device
          </p>

          {/* Action Buttons — stopPropagation so nested controls aren't dead-click traps */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <Button 
              className="h-11 min-w-[140px] text-sm font-semibold sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                document.getElementById('file-input')?.click();
              }}
            >
              Choose images
            </Button>
            <Button 
              variant="outline" 
              className="h-11 text-sm sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                handlePaste();
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Pasting…' : 'Paste image'}
            </Button>
          </div>

          {/* Supported Formats */}
          <p className="text-sm text-muted-foreground">
            Supports JPG, PNG, GIF, WebP, SVG, AVIF, HEIC, BMP, TIFF, ICO • JFIF{multiple ? ` • Up to ${maxFiles} files` : ''}
          </p>

          {/* Keyboard Shortcut Hint */}
          <p className="text-xs text-muted-foreground mt-2">
            Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> to paste image
          </p>
          
          {/* URL Import */}
       <Card className="p-4 mt-6" onClick={(e) => e.stopPropagation()}>
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
          {/* <div className="text-xs text-muted-foreground">
            <strong>Tip:</strong> For best results, try reliable sources:
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
              <span>• Direct image URLs (.jpg, .png)</span>
            </div>
          </div> */}
        </div>
      </Card>
          {/* <div 
            className="flex items-center space-x-2 mt-6 bg-muted rounded-md p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Link className="h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Enter image URL..."
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUrlImport()}
              className="flex-1 ring-1 ring-primary"
            />
            <Button 
              onClick={handleUrlImport}
              disabled={!urlInput.trim() || isLoading}
              size="sm"
            >
              {isLoading ? 'Loading...' : 'Import'}
            </Button>
          </div> */}
            </div>
            
            <input
              id="file-input"
              type="file"
              accept={accept}
              multiple={multiple}
              onChange={handleFileInput}
              className="hidden"
            />
          </>
        )}
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
            <strong>Tip:</strong> For best results, try reliable sources:
            <div className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-1">
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

      {/* Branded Upload Modal with Ad Placement Zones */}
      <BrandedUploadModal
        isOpen={
          showBrandedModal &&
          (isUploadModalOpen || importInProgress)
        }
        onClose={() => {
          setIsUploadModalOpen(false);
          onModalClose?.();
        }}
        duration={modalDuration}
        autoClose={!importInProgress}
        allowBackdropClose={!importInProgress}
        message={
          importInProgress ? importModalMessage : 'Uploading on Toolspy'
        }
        subMessage={
          importInProgress
            ? importModalSubMessage
            : 'Processing your images...'
        }
        adSlotTop={adSlotTop}
        adSlotBottom={adSlotBottom}
        adSlotLeft={adSlotLeft}
        adSlotRight={adSlotRight}
      />
    </div>
  );
} 