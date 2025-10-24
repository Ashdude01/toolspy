"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ImagePreview } from "@/components/tools/shared/image-preview";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Trash2,
  Shield,
  FileText,
  Image,
  Settings,
} from "lucide-react";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { CompactImagePreview } from "@/components/tools/shared/compact-image-preview";
import { JfifToPdfSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ConversionResult {
  file: File;
  originalName: string;
  originalSize: number;
  success: boolean;
  error?: string;
}

function JfifToPdfContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [pageOrientation, setPageOrientation] = useState("auto");
  const [pageSize, setPageSize] = useState("A4");
  const [imagePosition, setImagePosition] = useState("center");
  const [margin, setMargin] = useState("20");

  const handleFileSelect = (files: File[]) => {
    // Filter only JFIF files
    const jfifFiles = files.filter(file => 
      file.type === 'image/jpeg' || 
      file.name.toLowerCase().endsWith('.jfif') ||
      file.name.toLowerCase().endsWith('.jif')
    );
    
    if (jfifFiles.length === 0) {
      showToast("Please select JFIF files only", "error");
      return;
    }
    
    if (jfifFiles.length !== files.length) {
      showToast(`${files.length - jfifFiles.length} non-JFIF files were filtered out`, "warning");
    }
    
    setSelectedFiles((prev) => [...prev, ...jfifFiles]);
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setConvertedResults([]);
    showToast("All files cleared", "info");
  };

  const convertToPdf = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select JFIF files to convert", "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: ConversionResult[] = [];

    try {
      // Import PDF library dynamically
      const { jsPDF } = await import('jspdf');
      
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setConversionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          // Create new PDF document
          const pdf = new jsPDF({
            orientation: pageOrientation === 'auto' ? 'portrait' : pageOrientation as 'portrait' | 'landscape',
            unit: 'mm',
            format: pageSize.toLowerCase() as 'a4' | 'letter' | 'legal',
          });

          // Convert image to base64
          const base64 = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });

          // Get image dimensions
          const img = document.createElement('img');
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = base64;
          });

          // Calculate page dimensions
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const marginSize = parseInt(margin);
          const availableWidth = pageWidth - (2 * marginSize);
          const availableHeight = pageHeight - (2 * marginSize);

          // Calculate image size maintaining aspect ratio
          const imgRatio = img.width / img.height;
          const pageRatio = availableWidth / availableHeight;
          
          let finalWidth, finalHeight;
          if (imgRatio > pageRatio) {
            finalWidth = availableWidth;
            finalHeight = availableWidth / imgRatio;
          } else {
            finalHeight = availableHeight;
            finalWidth = availableHeight * imgRatio;
          }

          // Calculate position
          let x, y;
          switch (imagePosition) {
            case 'top-left':
              x = marginSize;
              y = marginSize;
              break;
            case 'top-center':
              x = (pageWidth - finalWidth) / 2;
              y = marginSize;
              break;
            case 'top-right':
              x = pageWidth - finalWidth - marginSize;
              y = marginSize;
              break;
            case 'center':
            default:
              x = (pageWidth - finalWidth) / 2;
              y = (pageHeight - finalHeight) / 2;
              break;
          }

          // Add image to PDF
          pdf.addImage(base64, 'JPEG', x, y, finalWidth, finalHeight);

          // Generate PDF blob
          const pdfBlob = pdf.output('blob');
          const pdfFile = new File([pdfBlob], file.name.replace(/\.(jfif|jif)$/i, '.pdf'), {
            type: 'application/pdf'
          });

          results.push({
            file: pdfFile,
            originalName: file.name,
            originalSize: file.size,
            success: true,
          });

        } catch (error) {
          results.push({
            file: file,
            originalName: file.name,
            originalSize: file.size,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      setConvertedResults(results);
      const successCount = results.filter(r => r.success).length;
      const errorCount = results.filter(r => !r.success).length;
      
      if (successCount > 0) {
        showToast(`Successfully converted ${successCount} JFIF file(s) to PDF`, "success");
      }
      if (errorCount > 0) {
        showToast(`Failed to convert ${errorCount} file(s)`, "error");
      }

    } catch (error) {
      showToast(
        "Conversion failed: " + (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadSingle = (result: ConversionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast("PDF downloaded", "success");
    }
  };

  const downloadAll = () => {
    const successResults = convertedResults.filter(r => r.success);
    successResults.forEach((result) => {
      downloadFile(result.file, result.file.name);
    });
    showToast(`Downloaded ${successResults.length} PDF files`, "success");
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          JFIF to PDF Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert JFIF images to PDF documents with professional quality. 
          Batch processing, customizable layouts, and high-quality output.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={50}
        accept="image/jpeg,.jfif,.jif"
        className="mb-6 sm:mb-8"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Selected JFIF Files ({selectedFiles.length})
                </CardTitle>
                <CardDescription>Files ready for PDF conversion</CardDescription>
              </div>
              <Button variant="outline" onClick={clearAllFiles} size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedFiles.map((file, index) => (
                <CompactImagePreview
                  key={`${file.name}-${index}`}
                  file={file}
                  onRemove={() => removeFile(index)}
                  className="bg-muted"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversion Settings */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              PDF Settings
            </CardTitle>
            <CardDescription>
              Customize your PDF output settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Page Size */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Page Size</Label>
                <Select value={pageSize} onValueChange={setPageSize}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A4">A4 (210×297 mm)</SelectItem>
                    <SelectItem value="Letter">Letter (8.5×11 in)</SelectItem>
                    <SelectItem value="Legal">Legal (8.5×14 in)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Orientation */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Orientation</Label>
                <Select value={pageOrientation} onValueChange={setPageOrientation}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto (Based on image)</SelectItem>
                    <SelectItem value="portrait">Portrait</SelectItem>
                    <SelectItem value="landscape">Landscape</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Image Position */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Image Position</Label>
                <Select value={imagePosition} onValueChange={setImagePosition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top-left">Top Left</SelectItem>
                    <SelectItem value="top-center">Top Center</SelectItem>
                    <SelectItem value="top-right">Top Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Margin */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Margin (mm)</Label>
                <Input
                  type="number"
                  value={margin}
                  onChange={(e) => setMargin(e.target.value)}
                  min="0"
                  max="50"
                  placeholder="20"
                />
              </div>
            </div>

            {/* Convert Button */}
            <Button
              onClick={convertToPdf}
              disabled={selectedFiles.length === 0 || isConverting}
              size="lg"
              className="w-full"
            >
              <FileText className="h-5 w-5 mr-2" />
              {isConverting
                ? "Converting..."
                : `Convert ${selectedFiles.length} JFIF to PDF`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conversion Results */}
      {convertedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {convertedResults.filter(r => r.success).length} PDF file(s) converted successfully
                </CardDescription>
              </div>
              <Button onClick={downloadAll} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All PDF Files
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate text-sm sm:text-base">
                        {result.originalName} → {result.file.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground mt-1">
                        <span>Original: {formatFileSize(result.originalSize)}</span>
                        {result.success && (
                          <span>PDF: {formatFileSize(result.file.size)}</span>
                        )}
                        <Badge
                          variant={result.success ? "default" : "destructive"}
                          className="text-xs w-fit"
                        >
                          {result.success ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      {result.error && (
                        <p className="text-xs text-red-500 mt-1">Error: {result.error}</p>
                      )}
                    </div>

                    {/* Download Button */}
                    {result.success && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                        title="Download PDF"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isConverting}
        title="Converting JFIF to PDF"
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description="Please wait while we convert your JFIF images to PDF..."
      />

      {/* SEO Content Section */}
      <JfifToPdfSEOContent />
    </div>
  );
}

export default function JfifToPdfPage() {
  return (
    <ToolPageWrapper toolSlug="jfif-to-pdf"><ToastProvider>
      <JfifToPdfContent /></ToastProvider></ToolPageWrapper>
  );
} 