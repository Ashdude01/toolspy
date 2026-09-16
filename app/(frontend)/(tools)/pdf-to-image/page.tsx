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
import { PDFFileUpload } from "@/components/tools/shared/pdf-file-upload";
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
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ConversionResult {
  files: File[];
  originalName: string;
  success: boolean;
  error?: string;
  pageCount: number;
}

function PdfToImageContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [outputFormat, setOutputFormat] = useState("png");
  const [imageQuality, setImageQuality] = useState("300");
  const [pageRange, setPageRange] = useState("all");
  const [customPages, setCustomPages] = useState("");

  const handleFileSelect = (files: File[]) => {
    // Filter only PDF files
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      showToast("Please select PDF files only", "error");
      return;
    }
    
    if (pdfFiles.length !== files.length) {
      showToast(`${files.length - pdfFiles.length} non-PDF files were filtered out`, "warning");
    }
    
    setSelectedFiles((prev) => [...prev, ...pdfFiles]);
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

  const convertToImages = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select PDF files to convert", "error");
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
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker path
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setConversionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          // Load PDF document
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
          const totalPages = pdf.numPages;

          // Determine pages to convert
          let pagesToConvert: number[] = [];
          if (pageRange === "all") {
            pagesToConvert = Array.from({ length: totalPages }, (_, i) => i + 1);
          } else if (pageRange === "first") {
            pagesToConvert = [1];
          } else if (pageRange === "custom" && customPages) {
            // Parse custom page range (e.g., "1,3,5-7")
            const ranges = customPages.split(',').map(s => s.trim());
            for (const range of ranges) {
              if (range.includes('-')) {
                const [start, end] = range.split('-').map(n => parseInt(n.trim()));
                if (start && end && start <= end && start >= 1 && end <= totalPages) {
                  for (let p = start; p <= end; p++) {
                    pagesToConvert.push(p);
                  }
                }
              } else {
                const pageNum = parseInt(range);
                if (pageNum && pageNum >= 1 && pageNum <= totalPages) {
                  pagesToConvert.push(pageNum);
                }
              }
            }
          }

          // Remove duplicates and sort
          pagesToConvert = Array.from(new Set(pagesToConvert)).sort((a, b) => a - b);

          const imageFiles: File[] = [];
          const dpi = parseInt(imageQuality);
          const scale = dpi / 72; // PDF default DPI is 72

          // Convert each page
          for (let pageNum of pagesToConvert) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale });

            // Create canvas
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            // Render page
            if (context) {
              await page.render({
                canvas,
                canvasContext: context,
                viewport: viewport,
              }).promise;

              // Convert to blob
              const blob = await new Promise<Blob>((resolve) => {
                if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
                  canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.95);
                } else {
                  canvas.toBlob((blob) => resolve(blob!), `image/${outputFormat}`);
                }
              });

              // Create file
              const fileName = `${file.name.replace('.pdf', '')}_page_${pageNum}.${outputFormat}`;
              const imageFile = new File([blob], fileName, { type: `image/${outputFormat}` });
              imageFiles.push(imageFile);
            }
          }

          results.push({
            files: imageFiles,
            originalName: file.name,
            success: true,
            pageCount: pagesToConvert.length,
          });

        } catch (error) {
          results.push({
            files: [],
            originalName: file.name,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            pageCount: 0,
          });
        }
      }

      setConvertedResults(results);
      const successCount = results.filter(r => r.success).length;
      const totalImages = results.reduce((sum, r) => sum + r.files.length, 0);
      
      if (successCount > 0) {
        showToast(`Successfully converted ${successCount} PDF(s) to ${totalImages} image(s)`, "success");
      }
      const errorCount = results.filter(r => !r.success).length;
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

  const downloadAll = async () => {
    const allFiles = convertedResults.flatMap(r => r.files);
    if (allFiles.length === 0) return;

    if (allFiles.length === 1) {
      downloadFile(allFiles[0], allFiles[0].name);
      showToast("Image downloaded", "success");
    } else {
      try {
        const zipBlob = await createZipFromFiles(allFiles, "converted-images.zip");
        downloadZip(zipBlob, "converted-images.zip");
        showToast(`Downloaded ${allFiles.length} images as ZIP`, "success");
      } catch (error) {
        showToast("Failed to create ZIP file", "error");
      }
    }
  };

  const downloadSingle = (files: File[]) => {
    if (files.length === 1) {
      downloadFile(files[0], files[0].name);
      showToast("Image downloaded", "success");
    } else {
      files.forEach(file => {
        downloadFile(file, file.name);
      });
      showToast(`Downloaded ${files.length} images`, "success");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PDF to Image Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert PDF pages to high-quality images (PNG, JPG, WebP). Extract individual pages or entire documents 
          with customizable quality and format options.
        </p>
      </div>

      {/* File Upload */}
      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={10}
        maxFileSize={1024 * 1024 * 1024} // 1GB
        className="mb-6 sm:mb-8"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* Selected Files */}
            <Card className="mb-6 sm:mb-8 md:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Selected PDF Files ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for image conversion
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={clearAllFiles} size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 overflow-y-auto">
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">
                            {file.name}
                          </h4>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(index)}
                        title="Remove file"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
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
                  Output Format
                </CardTitle>
                <CardDescription>
                  Choose conversion format
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Format</Label>
                    <Select value={outputFormat} onValueChange={setOutputFormat}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="png">
                          <div className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            PNG Images
                          </div>
                        </SelectItem>
                        <SelectItem value="jpg">
                          <div className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            JPG Images
                          </div>
                        </SelectItem>
                        <SelectItem value="webp">
                          <div className="flex items-center gap-2">
                            <Image className="h-4 w-4" />
                            WebP Images
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Image Quality (DPI)</Label>
                    <Select value={imageQuality} onValueChange={setImageQuality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="150">150 DPI (Small)</SelectItem>
                        <SelectItem value="300">300 DPI (Standard)</SelectItem>
                        <SelectItem value="600">600 DPI (High)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Pages to Convert</Label>
                    <Select value={pageRange} onValueChange={setPageRange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Pages</SelectItem>
                        <SelectItem value="first">First Page Only</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {pageRange === "custom" && (
                    <div className="space-y-2">
                      <Label>Custom Pages</Label>
                      <Input
                        placeholder="e.g., 1,3,5-7"
                        value={customPages}
                        onChange={(e) => setCustomPages(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Conversion Button */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Conversion Settings</CardTitle>
            <CardDescription>Fine-tune conversion parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={convertToImages}
              disabled={selectedFiles.length === 0 || isConverting}
              size="lg"
              className="w-full"
            >
              <Image className="h-5 w-5 mr-2" />
              {isConverting
                ? "Converting..."
                : `Convert ${selectedFiles.length} PDF File(s) to ${outputFormat.toUpperCase()}`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conversion Results */}
      {convertedResults.filter(r => r.success || r.error).length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {convertedResults.filter(r => r.success).length} PDF(s) converted to {convertedResults.reduce((sum, r) => sum + r.files.length, 0)} image(s)
                </CardDescription>
              </div>
              {convertedResults.filter(r => r.success).length > 0 && (
                <Button onClick={downloadAll} size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download All Images
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedResults.map((result, index) => {
                if (!result.success && !result.error) return null;
                
                return (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm sm:text-base mb-2">
                          {result.originalName}
                        </h4>
                        {result.success ? (
                          <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                            <span>{result.pageCount} pages converted</span>
                            <span>•</span>
                            <span>{result.files.length} images created</span>
                            <span>•</span>
                            <span>{formatFileSize(result.files.reduce((sum, f) => sum + f.size, 0))}</span>
                            <Badge variant="default" className="text-xs">
                              {outputFormat.toUpperCase()}
                            </Badge>
                          </div>
                        ) : (
                          <p className="text-xs text-red-500">
                            Error: {result.error || 'Unknown error'}
                          </p>
                        )}
                      </div>
                      {result.success && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadSingle(result.files)}
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

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isConverting}
        title="Converting PDF to Images"
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description="Please wait while we convert your PDF pages to images..."
      />
</div>
  );
}

export default function PdfToImagePage() {
  return (
    <ToolPageWrapper toolSlug="pdf-to-image"><ToastProvider>
      <PdfToImageContent /></ToastProvider></ToolPageWrapper>
  );
} 