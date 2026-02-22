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
  Trash2,
} from "lucide-react";
import { formatFileSize, downloadFile as downloadFileUtil } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

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
    if (!file.pdfUrl || !file.pdfBlob) return;
    
    const fileName = file.name.replace(/\.(heic|heif)$/i, '.pdf');
    downloadFileUtil(file.pdfBlob, fileName);
    showToast(`${fileName} downloaded`, "success");
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
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleFileUploadError}
        accept=".heic,.heif,image/heic,image/heif"
        multiple
        maxFiles={maxFiles}
        className="mb-6 sm:mb-8"
      />

      {files.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* Selected Files */}
            <Card className="mb-6 sm:mb-8 md:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileImage className="h-5 w-5" />
                      Selected HEIC Files ({files.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for PDF conversion
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={clearAllFiles} size="sm" disabled={isProcessing}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 overflow-y-auto">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(file.status)}
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            {file.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {formatFileSize(file.originalFile.size)}
                            {file.status === 'error' && file.error && (
                              <span className="text-red-500 ml-2">• {file.error}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.status === 'completed' && file.pdfUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => downloadFile(file)}
                            title="Download PDF"
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        )}
                        {!isProcessing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                            title="Remove file"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Settings */}
            <Card className="mb-6 sm:mb-8 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  PDF Settings
                </CardTitle>
                <CardDescription>
                  Customize PDF output
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
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
          </div>
        </div>
      )}

      {/* Conversion Button */}
      {files.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
            <CardDescription>Fine-tune conversion parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={convertToPdf}
                disabled={files.length === 0 || isProcessing}
                size="lg"
                className="flex-1"
              >
                <FileText className="h-5 w-5 mr-2" />
                {isProcessing
                  ? "Converting..."
                  : `Convert ${files.length} HEIC File(s) to PDF`}
              </Button>
              
              {completedCount > 0 && (
                <Button
                  variant="outline"
                  onClick={downloadAllFiles}
                  disabled={isProcessing}
                  size="lg"
                >
                  {completedCount === 1 ? (
                    <>
                      <Download className="h-5 w-5 mr-2" />
                      Download PDF
                    </>
                  ) : (
                    <>
                      <Archive className="h-5 w-5 mr-2" />
                      Download All ({completedCount})
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isProcessing}
        title="Converting HEIC to PDF"
        current={Math.round(progress)}
        total={100}
        currentFile=""
        description="Processing your images, please wait..."
      />

      {/* Conversion Results */}
      {files.filter(f => f.status === 'completed' || f.status === 'error').length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {completedCount} HEIC file(s) converted successfully
                </CardDescription>
              </div>
              {completedCount > 0 && (
                <Button onClick={downloadAllFiles} size="sm" variant="outline" disabled={isProcessing}>
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => {
                if (file.status === 'pending' || file.status === 'processing') return null;
                
                return (
                  <div key={file.id} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base mb-2">
                          {file.name}
                        </h4>
                        {file.status === 'completed' ? (
                          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>
                              Original: {formatFileSize(file.originalFile.size)}
                            </span>
                            <Badge variant="default" className="text-xs">
                              PDF
                            </Badge>
                          </div>
                        ) : (
                          <p className="text-xs text-red-500">
                            Error: {file.error || 'Unknown error'}
                          </p>
                        )}
                      </div>
                      {file.status === 'completed' && file.pdfUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(file)}
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
</div>
  );
}

export default function HeicToPdfPage() {
  return (
    <ToolPageWrapper toolSlug="heic-to-pdf"><ToastProvider>
      <HeicToPdfContent /></ToastProvider></ToolPageWrapper>
  );
} 