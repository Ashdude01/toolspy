"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  FileImage,
  FileText,
  Download,
  X,
  Settings,
  Shield,
  RefreshCw,
  Archive,
  Eye,
} from "lucide-react";
import { HeicToPdfSEOContent } from "./seo-content";

interface ProcessedFile {
  id: string;
  name: string;
  originalFile: File;
  pdfBlob?: Blob;
  pdfUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

function HeicToPdfContent() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [quality, setQuality] = useState("high");
  const [margin, setMargin] = useState("medium");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFiles = 20;
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleFileSelect = (selectedFiles: File[]) => {
    if (files.length + selectedFiles.length > maxFiles) {
      showToast(`Maximum ${maxFiles} files allowed`, "error");
      return;
    }

    const validFiles = selectedFiles.filter(file => {
      const isHeic = file.type === 'image/heic' || file.type === 'image/heif' || 
                     file.name.toLowerCase().endsWith('.heic') || 
                     file.name.toLowerCase().endsWith('.heif');
      
      if (!isHeic) {
        showToast(`${file.name} is not a HEIC/HEIF file`, "error");
        return false;
      }
      
      if (file.size > maxFileSize) {
        showToast(`${file.name} is too large (max 10MB)`, "error");
        return false;
      }
      
      return true;
    });

    const newFiles: ProcessedFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      originalFile: file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...newFiles]);
    showToast(`${validFiles.length} HEIC file(s) added`, "success");
  };

  const handleFileUploadError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    showToast("File removed", "success");
  };

  const clearAllFiles = () => {
    files.forEach(file => {
      if (file.pdfUrl) {
        URL.revokeObjectURL(file.pdfUrl);
      }
    });
    setFiles([]);
    showToast("All files cleared", "success");
  };

  const convertToPdf = async () => {
    if (files.length === 0) {
      showToast("Please select HEIC files first", "error");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      // Import required libraries dynamically
      const jsPDF = (await import('jspdf')).jsPDF;
      const heic2any = (await import('heic2any')).default;

      const updatedFiles = [...files];
      
      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        
        try {
          setProgress((i / updatedFiles.length) * 100);
          file.status = 'processing';
          setFiles([...updatedFiles]);

          // Convert HEIC to JPEG
          const jpegBlob = await heic2any({
            blob: file.originalFile,
            toType: "image/jpeg",
            quality: quality === 'high' ? 0.9 : quality === 'medium' ? 0.7 : 0.5
          }) as Blob;

          // Create image from JPEG blob
          const imageUrl = URL.createObjectURL(jpegBlob);
          const img = new Image();
          
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = imageUrl;
          });

          // Calculate page dimensions and margins
          const margins = {
            small: 10,
            medium: 20,
            large: 30
          };
          
          const marginSize = margins[margin as keyof typeof margins];
          
          // Page size configurations
          const pageSizes = {
            a4: [210, 297],
            letter: [216, 279],
            legal: [216, 356],
            a3: [297, 420]
          };
          
          const [pageWidth, pageHeight] = pageSizes[pageSize as keyof typeof pageSizes];
          
          // Determine orientation
          let finalOrientation = orientation;
          if (orientation === 'auto') {
            finalOrientation = img.width > img.height ? 'landscape' : 'portrait';
          }
          
          const pdf = new jsPDF({
            orientation: finalOrientation as 'portrait' | 'landscape',
            unit: 'mm',
            format: pageSize === 'custom' ? [pageWidth, pageHeight] : pageSize
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          // Calculate image dimensions to fit within margins
          const availableWidth = pdfWidth - (marginSize * 2);
          const availableHeight = pdfHeight - (marginSize * 2);
          
          const imgAspectRatio = img.width / img.height;
          const availableAspectRatio = availableWidth / availableHeight;
          
          let imgWidth, imgHeight;
          
          if (imgAspectRatio > availableAspectRatio) {
            // Image is wider than available space
            imgWidth = availableWidth;
            imgHeight = availableWidth / imgAspectRatio;
          } else {
            // Image is taller than available space
            imgHeight = availableHeight;
            imgWidth = availableHeight * imgAspectRatio;
          }
          
          // Center the image
          const x = (pdfWidth - imgWidth) / 2;
          const y = (pdfHeight - imgHeight) / 2;
          
          // Add image to PDF
          pdf.addImage(img, 'JPEG', x, y, imgWidth, imgHeight);
          
          // Generate PDF blob
          const pdfBlob = pdf.output('blob');
          const pdfUrl = URL.createObjectURL(pdfBlob);
          
          file.pdfBlob = pdfBlob;
          file.pdfUrl = pdfUrl;
          file.status = 'completed';
          
          // Clean up
          URL.revokeObjectURL(imageUrl);
          
        } catch (error) {
          console.error('Error converting file:', error);
          file.status = 'error';
          file.error = `Failed to convert: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        
        setFiles([...updatedFiles]);
      }
      
      setProgress(100);
      showToast("HEIC to PDF conversion completed!", "success");
      
    } catch (error) {
      console.error('Conversion error:', error);
      showToast("Conversion failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: ProcessedFile) => {
    if (!file.pdfUrl) return;
    
    const link = document.createElement('a');
    link.href = file.pdfUrl;
    link.download = file.name.replace(/\.(heic|heif)$/i, '.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${file.name} downloaded`, "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(file => file.status === 'completed' && file.pdfUrl);
    
    if (completedFiles.length === 0) {
      showToast("No converted files to download", "error");
      return;
    }

    if (completedFiles.length === 1) {
      downloadFile(completedFiles[0]);
      return;
    }

    // For multiple files, create a zip
    const JSZip = require('jszip');
    const zip = new JSZip();
    
    Promise.all(
      completedFiles.map(async (file) => {
        if (file.pdfBlob) {
          const fileName = file.name.replace(/\.(heic|heif)$/i, '.pdf');
          zip.file(fileName, file.pdfBlob);
        }
      })
    ).then(() => {
      zip.generateAsync({ type: 'blob' }).then((content: Blob) => {
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted-heic-files.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showToast("All files downloaded as ZIP", "success");
      });
    });
  };

  const resetAll = () => {
    clearAllFiles();
    setPageSize("a4");
    setOrientation("auto");
    setQuality("high");
    setMargin("medium");
    setProgress(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <FileImage className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          HEIC to PDF Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert Apple HEIC/HEIF images to PDF format with customizable layout options. 
          Process multiple files with batch conversion and privacy protection.
        </p>
      </div>

      {/* File Upload */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Upload HEIC Files
          </CardTitle>
          <CardDescription>
            Select HEIC/HEIF images to convert to PDF format (max {maxFiles} files, 10MB each)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FileUpload
            onFileSelect={handleFileSelect}
            onError={handleFileUploadError}
            accept=".heic,.heif,image/heic,image/heif"
            multiple
            maxFiles={maxFiles}
          />
          
          {files.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">
                  Files: {files.length} selected, {completedCount} converted
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFiles}
                  disabled={isProcessing}
                >
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {getStatusIcon(file.status)}
                      <span className="text-sm truncate">{file.name}</span>
                      {file.status === 'error' && (
                        <span className="text-xs text-red-500">({file.error})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && file.pdfUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadFile(file)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {!isProcessing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Conversion Settings */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            PDF Settings
          </CardTitle>
          <CardDescription>
            Customize the PDF output format and quality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Page Size</Label>
              <Select value={pageSize} onValueChange={setPageSize} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="letter">Letter (8.5 × 11 in)</SelectItem>
                  <SelectItem value="legal">Legal (8.5 × 14 in)</SelectItem>
                  <SelectItem value="a3">A3 (297 × 420 mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Orientation</Label>
              <Select value={orientation} onValueChange={setOrientation} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto (based on image)</SelectItem>
                  <SelectItem value="portrait">Portrait</SelectItem>
                  <SelectItem value="landscape">Landscape</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Image Quality</Label>
              <Select value={quality} onValueChange={setQuality} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High (90%)</SelectItem>
                  <SelectItem value="medium">Medium (70%)</SelectItem>
                  <SelectItem value="low">Low (50%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Page Margins</Label>
              <Select value={margin} onValueChange={setMargin} disabled={isProcessing}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (10mm)</SelectItem>
                  <SelectItem value="medium">Medium (20mm)</SelectItem>
                  <SelectItem value="large">Large (30mm)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={convertToPdf}
              disabled={files.length === 0 || isProcessing}
              className="flex-1"
            >
              <FileText className="h-4 w-4 mr-2" />
              {isProcessing ? 'Converting...' : `Convert to PDF${files.length > 1 ? `s (${files.length})` : ''}`}
            </Button>
            
            {completedCount > 0 && (
              <Button
                variant="outline"
                onClick={downloadAllFiles}
                disabled={isProcessing}
                className="flex-1 sm:flex-initial"
              >
                {completedCount === 1 ? (
                  <Download className="h-4 w-4 mr-2" />
                ) : (
                  <Archive className="h-4 w-4 mr-2" />
                )}
                {completedCount === 1 ? 'Download PDF' : `Download All (${completedCount})`}
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={resetAll}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isProcessing}
        current={Math.round(progress)}
        total={100}
        title="Converting HEIC to PDF"
        description="Processing your images, please wait..."
      />

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About HEIC to PDF Conversion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">HEIC Format</div>
              <div className="text-muted-foreground">
                High Efficiency Image Container used by Apple devices for photos
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">PDF Benefits</div>
              <div className="text-muted-foreground">
                Universal format viewable on any device with consistent layout
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Quality Control</div>
              <div className="text-muted-foreground">
                Adjust compression and page settings for optimal file size
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Privacy Protected</div>
              <div className="text-muted-foreground">
                All processing happens locally in your browser
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <HeicToPdfSEOContent />
    </div>
  );
}

export default function HeicToPdfPage() {
  return (
    <ToastProvider>
      <HeicToPdfContent />
    </ToastProvider>
  );
} 