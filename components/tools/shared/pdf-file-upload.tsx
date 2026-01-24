'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UploadCloud, Link, FileText, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { isValidUrl } from '@/lib/utils/file-utils';
import { BrandedUploadModal } from './branded-upload-modal';

interface PDFFileUploadProps {
  onFileSelect: (files: File[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  maxFiles: number;
  maxFileSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
  // Collapse functionality
  collapsed?: boolean; // Manual control for collapsed state (optional)
  onToggleCollapse?: () => void; // Callback to toggle collapse
  autoCollapse?: boolean; // Automatically collapse when files are uploaded (default: true)
  // Branded modal props
  showBrandedModal?: boolean; // Enable/disable branded modal (default: true)
  modalDuration?: number; // Duration in milliseconds (default: 2000)
  onModalClose?: () => void; // Callback when modal closes
  modalMessage?: string; // Custom modal message
  modalSubMessage?: string; // Custom modal sub-message
  // Ad placement zones (for future use)
  adSlotTop?: React.ReactNode;
  adSlotBottom?: React.ReactNode;
  adSlotLeft?: React.ReactNode;
  adSlotRight?: React.ReactNode;
}

export function PDFFileUpload({ 
  onFileSelect, 
  onError, 
  multiple = false, 
  maxFiles,
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  className = '',
  disabled = false,
  collapsed: externalCollapsed,
  onToggleCollapse,
  autoCollapse = true,
  showBrandedModal = true,
  modalDuration = 2000,
  onModalClose,
  modalMessage = 'Uploading on Toolspy',
  modalSubMessage = 'Processing your PDF files...',
  adSlotTop,
  adSlotBottom,
  adSlotLeft,
  adSlotRight
}: PDFFileUploadProps) {
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

  const validatePDFFile = useCallback((file: File) => {
    // Check file type
    if (file.type !== 'application/pdf') {
      return {
        valid: false,
        error: `${file.name} is not a PDF file. Please select PDF files only.`
      };
    }

    // Check file size (skip if unlimited)
    if (maxFileSize !== Infinity && file.size > maxFileSize) {
      const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));
      return {
        valid: false,
        error: `${file.name} is too large. Maximum file size is ${maxSizeMB}MB.`
      };
    }

    // Check if file is corrupted by trying to read the PDF header
    return new Promise<{ valid: boolean; error?: string }>((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          resolve({
            valid: false,
            error: `${file.name} could not be read. The file may be corrupted.`
          });
          return;
        }

        const bytes = new Uint8Array(arrayBuffer.slice(0, 8));
        const header = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
        
        // Check for PDF header (%PDF)
        if (!header.startsWith('255044462d')) { // %PDF- in hex
          resolve({
            valid: false,
            error: `${file.name} is not a valid PDF file or may be corrupted.`
          });
          return;
        }

        resolve({ valid: true });
      };
      
      reader.onerror = () => {
        resolve({
          valid: false,
          error: `${file.name} could not be read. The file may be corrupted.`
        });
      };
      
      reader.readAsArrayBuffer(file.slice(0, 1024)); // Read first 1KB for validation
    });
  }, [maxFileSize]);

  const handleFileValidation = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    
    if (fileArray.length > maxFiles) {
      onError(`You can only process up to ${maxFiles} PDF files at once. Please select fewer files.`);
      return;
    }
    
    for (const file of fileArray) {
      const validation = await validatePDFFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        onError(validation.error || 'Invalid PDF file');
      }
    }
    
    if (validFiles.length > 0) {
      handleFileSelectWithModal(validFiles);
    }
  }, [maxFiles, onError, handleFileSelectWithModal, validatePDFFile]);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileValidation(files);
    }
  }, [disabled, handleFileValidation]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(false);
    }
  }, [disabled]);

  const handleFileInput = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileValidation(files);
    }
    // Reset input value so same file can be selected again
    e.target.value = '';
  }, [handleFileValidation]);

  const loadPDFFromUrl = useCallback(async (url: string) => {
    if (!isValidUrl(url)) {
      onError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/pdf')) {
        throw new Error('The URL does not point to a PDF file');
      }

      const blob = await response.blob();
      const filename = url.split('/').pop() || 'downloaded.pdf';
      const file = new File([blob], filename, { type: 'application/pdf' });

      await handleFileValidation([file]);
      setUrlInput('');
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Failed to load PDF from URL');
    } finally {
      setIsLoading(false);
    }
  }, [handleFileValidation, onError]);

  const handleUrlSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim() && !isLoading && !disabled) {
      loadPDFFromUrl(urlInput.trim());
    }
  }, [urlInput, isLoading, disabled, loadPDFFromUrl]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
        // Check if we're not in an input field
        const activeElement = document.activeElement;
        if (activeElement && (
          activeElement.tagName === 'INPUT' || 
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.getAttribute('contenteditable') === 'true'
        )) {
          return; // Don't handle if user is typing in an input
        }
        
        // Handle paste
        navigator.clipboard.read().then(async (clipboardItems) => {
          for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
              if (type === 'application/pdf') {
                const blob = await clipboardItem.getType(type);
                const file = new File([blob], 'pasted.pdf', { type: 'application/pdf' });
                await handleFileValidation([file]);
                break;
              }
            }
          }
        }).catch(() => {
          // Clipboard access failed or no PDF content
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [disabled, handleFileValidation]);

  const maxSizeMB = maxFileSize === Infinity ? null : Math.round(maxFileSize / (1024 * 1024));

  return (
    <div className={`space-y-4 transition-all duration-300 ${className}`}>
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
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={collapsed ? () => document.getElementById('pdf-file-input')?.click() : () => document.getElementById('pdf-file-input')?.click()}
      >
        {collapsed ? (
          // Collapsed View
          <div className="p-4 flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 flex-1 cursor-pointer"
              onClick={() => document.getElementById('pdf-file-input')?.click()}
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Add More PDFs</h3>
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
              id="pdf-file-input"
              type="file"
              accept="application/pdf,.pdf"
              multiple={multiple}
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
            />
          </div>
        ) : (
          // Expanded View
          <>
            <div className="p-5 md:p-12 text-center">
              {/* File Icon */}
              <div className="relative mb-6">
                <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${
                  isDragOver 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <FileText className={`h-8 w-8 ${
                    isDragOver 
                      ? 'text-blue-600' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`} />
                </div>
              </div>

              {/* Main Text */}
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Drag and drop your PDF{multiple ? 's' : ''} here
              </h3>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-2 mb-6">
                <Button 
                  variant="secondary" 
                  className="h-auto text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('pdf-file-input')?.click();
                  }}
                  disabled={disabled}
                >
                  Browse Files
                </Button>
                <span className="text-muted-foreground">•</span>
                <Button 
                  variant="secondary" 
                  className="h-auto text-purple-600 hover:text-purple-700 text-xs sm:text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle paste for PDFs
                    navigator.clipboard.read().then(async (clipboardItems) => {
                      for (const clipboardItem of clipboardItems) {
                        for (const type of clipboardItem.types) {
                          if (type === 'application/pdf') {
                            const blob = await clipboardItem.getType(type);
                            const file = new File([blob], 'pasted.pdf', { type: 'application/pdf' });
                            await handleFileValidation([file]);
                            break;
                          }
                        }
                      }
                    }).catch(() => {
                      onError('Failed to paste from clipboard. Please allow clipboard permissions.');
                    });
                  }}
                  disabled={isLoading || disabled}
                >
                  {isLoading ? 'Pasting...' : 'Paste from Clipboard'}
                </Button>
              </div>

              {/* Supported Formats */}
              <p className="text-sm text-muted-foreground">
                PDF files only{multiple ? ` • Up to ${maxFiles} files` : ''}{maxSizeMB !== null ? ` • Max ${maxSizeMB}MB per file` : ''}
              </p>

              {/* Keyboard Shortcut Hint */}
              <p className="text-xs text-muted-foreground mt-2">
                Press <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-800 bg-gray-200 border border-gray-300 rounded dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">V</kbd> to paste PDF
              </p>
              
              {/* URL Import */}
              <Card className="p-4 mt-6" onClick={(e) => e.stopPropagation()}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Link className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Enter PDF URL..."
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleUrlSubmit(e as any)}
                      disabled={isLoading || disabled}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleUrlSubmit}
                      disabled={!urlInput.trim() || isLoading || disabled}
                      size="sm"
                    >
                      {isLoading ? 'Loading...' : 'Import'}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            <input
              id="pdf-file-input"
              type="file"
              accept="application/pdf,.pdf"
              multiple={multiple}
              onChange={handleFileInput}
              className="hidden"
              disabled={disabled}
            />
          </>
        )}
      </Card>

      {/* Help Text */}
      {!collapsed && (
        <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <p className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            All PDF processing happens locally in your browser for complete privacy
          </p>
          <p>💡 Tip: You can also paste PDFs with Ctrl+V (Cmd+V on Mac)</p>
        </div>
      )}

      {/* Branded Upload Modal */}
      <BrandedUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => {
          setIsUploadModalOpen(false);
          onModalClose?.();
        }}
        duration={modalDuration}
        message={modalMessage}
        subMessage={modalSubMessage}
        adSlotTop={adSlotTop}
        adSlotBottom={adSlotBottom}
        adSlotLeft={adSlotLeft}
        adSlotRight={adSlotRight}
      />
    </div>
  );
}
