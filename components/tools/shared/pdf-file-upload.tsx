'use client';

import { useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { UploadCloud, Link, FileText, X, AlertCircle } from 'lucide-react';
import { isValidUrl } from '@/lib/utils/file-utils';

interface PDFFileUploadProps {
  onFileSelect: (files: File[]) => void;
  onError: (error: string) => void;
  multiple?: boolean;
  maxFiles: number;
  maxFileSize?: number; // in bytes
  className?: string;
  disabled?: boolean;
}

export function PDFFileUpload({ 
  onFileSelect, 
  onError, 
  multiple = false, 
  maxFiles,
  maxFileSize = 50 * 1024 * 1024, // 50MB default
  className = '',
  disabled = false
}: PDFFileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validatePDFFile = useCallback((file: File) => {
    // Check file type
    if (file.type !== 'application/pdf') {
      return {
        valid: false,
        error: `${file.name} is not a PDF file. Please select PDF files only.`
      };
    }

    // Check file size
    if (file.size > maxFileSize) {
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
      onFileSelect(validFiles);
    }
  }, [maxFiles, onError, onFileSelect, validatePDFFile]);

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

  const maxSizeMB = Math.round(maxFileSize / (1024 * 1024));

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Upload Area */}
      <Card
        className={`
          border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer
          ${isDragOver 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && document.getElementById('pdf-file-input')?.click()}
      >
        <input
          id="pdf-file-input"
          type="file"
          accept="application/pdf,.pdf"
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="flex flex-col items-center space-y-4">
          <div className={`p-3 rounded-full ${isDragOver ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
            <FileText className={`h-8 w-8 ${isDragOver ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Upload PDF Files
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Drag and drop PDF files here, or click to browse
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              PDF files only
            </span>
            <span>•</span>
            <span>Max {maxSizeMB}MB per file</span>
            <span>•</span>
            <span>Up to {maxFiles} files</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              document.getElementById('pdf-file-input')?.click();
            }}
          >
            <UploadCloud className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </div>
      </Card>

      {/* URL Upload */}
      <Card className="p-4">
        <form onSubmit={handleUrlSubmit} className="space-y-3">
          <div className="flex items-center gap-2">
            <Link className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Or load from URL
            </span>
          </div>
          
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/document.pdf"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              disabled={isLoading || disabled}
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={!urlInput.trim() || isLoading || disabled}
              size="sm"
            >
              {isLoading ? 'Loading...' : 'Load PDF'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Help Text */}
      <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
        <p className="flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          All PDF processing happens locally in your browser for complete privacy
        </p>
        <p>💡 Tip: You can also paste PDFs with Ctrl+V (Cmd+V on Mac)</p>
      </div>
    </div>
  );
} 