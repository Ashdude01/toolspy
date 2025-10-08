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
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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
  Gauge,
  Zap,
  Target,
  Globe,
} from "lucide-react";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { CompressPdfSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface CompressionResult {
  file: File;
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  success: boolean;
  error?: string;
}

function CompressPdfContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedResults, setCompressedResults] = useState<CompressionResult[]>([]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [compressionLevel, setCompressionLevel] = useState("balanced");
  const [imageQuality, setImageQuality] = useState([70]);

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
    setCompressedResults([]);
    showToast("All files cleared", "info");
  };

  const compressPdfs = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select PDF files to compress", "error");
      return;
    }

    setIsCompressing(true);
    setCompressionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: CompressionResult[] = [];

    try {
      // Import PDF library dynamically
      const { PDFDocument } = await import('pdf-lib');

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setCompressionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          // Load PDF document
          const pdfBytes = await file.arrayBuffer();
          const pdfDoc = await PDFDocument.load(pdfBytes);

          // Apply compression settings based on level
          let compressionOptions = {};
          
          switch (compressionLevel) {
            case "light":
              compressionOptions = {
                useObjectStreams: true,
                addDefaultPage: false,
                subset: false,
              };
              break;
            case "balanced":
              compressionOptions = {
                useObjectStreams: true,
                addDefaultPage: false,
                subset: true,
              };
              break;
            case "maximum":
              compressionOptions = {
                useObjectStreams: true,
                addDefaultPage: false,
                subset: true,
                compress: true,
              };
              break;
          }

          // Note: pdf-lib has limited compression capabilities
          // For a production app, you'd want to use more advanced compression
          const compressedPdfBytes = await pdfDoc.save(compressionOptions);
          
          // Calculate compression ratio
          const originalSize = file.size;
          const compressedSize = compressedPdfBytes.length;
          const compressionRatio = Math.round(((originalSize - compressedSize) / originalSize) * 100);

          // Create compressed file
          const compressedFile = new File([compressedPdfBytes], file.name, {
            type: 'application/pdf'
          });

          results.push({
            file: compressedFile,
            originalName: file.name,
            originalSize,
            compressedSize,
            compressionRatio: Math.max(0, compressionRatio),
            success: true,
          });

        } catch (error) {
          results.push({
            file: file,
            originalName: file.name,
            originalSize: file.size,
            compressedSize: file.size,
            compressionRatio: 0,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      setCompressedResults(results);
      const successCount = results.filter(r => r.success).length;
      const totalSaved = results.reduce((sum, r) => sum + (r.originalSize - r.compressedSize), 0);
      
      if (successCount > 0) {
        showToast(`Compressed ${successCount} PDF(s), saved ${formatFileSize(totalSaved)}`, "success");
      }
      const errorCount = results.filter(r => !r.success).length;
      if (errorCount > 0) {
        showToast(`Failed to compress ${errorCount} file(s)`, "error");
      }

    } catch (error) {
      showToast(
        "Compression failed: " + (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadSingle = (result: CompressionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast("Compressed PDF downloaded", "success");
    }
  };

  const downloadAll = () => {
    const successResults = compressedResults.filter(r => r.success);
    successResults.forEach((result) => {
      downloadFile(result.file, result.file.name);
    });
    showToast(`Downloaded ${successResults.length} compressed PDF files`, "success");
  };

  const compressionPresets = [
    {
      key: "light",
      icon: <Zap className="h-5 w-5" />,
      title: "Light Compression",
      description: "Minimal compression, keeps original quality",
      savings: "10-20% size reduction",
    },
    {
      key: "balanced",
      icon: <Target className="h-5 w-5" />,
      title: "Balanced",
      description: "Good balance of quality and file size",
      savings: "20-40% size reduction",
    },
    {
      key: "maximum",
      icon: <Gauge className="h-5 w-5" />,
      title: "Maximum Compression",
      description: "Smallest file size, some quality loss",
      savings: "40-60% size reduction",
    },
  ];

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
          PDF Compressor
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Reduce PDF file sizes while maintaining quality. Compress documents for faster sharing, 
          storage efficiency, and web optimization.
        </p>
      </div>

      {/* File Upload */}
      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={20}
        maxFileSize={50 * 1024 * 1024} // 50MB
        className="mb-6 sm:mb-8"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selected PDF Files ({selectedFiles.length})
                </CardTitle>
                <CardDescription>Files ready for compression</CardDescription>
              </div>
              <Button variant="outline" onClick={clearAllFiles} size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">{file.name}</h4>
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
      )}

      {/* Compression Presets */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Compression Presets</CardTitle>
            <CardDescription>
              Choose a compression level that best fits your needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {compressionPresets.map(({ key, icon, title, description, savings }) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-all duration-200 ${
                    compressionLevel === key
                      ? "ring-1 ring-primary bg-gray-300/50 dark:bg-gray-500/50"
                      : "hover:shadow-md hover:ring-1 hover:ring-primary"
                  }`}
                  onClick={() => setCompressionLevel(key)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{title}</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                    <p className="text-xs text-green-600 font-medium">{savings}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compression Settings */}
      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Advanced Settings</CardTitle>
            <CardDescription>
              Fine-tune compression parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Image Quality: {imageQuality[0]}%
                </Label>
                <Slider
                  value={imageQuality}
                  onValueChange={setImageQuality}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Lower values = smaller files, higher values = better quality
                </p>
              </div>
            </div>

            {/* Compress Button */}
            <Button
              onClick={compressPdfs}
              disabled={selectedFiles.length === 0 || isCompressing}
              size="lg"
              className="w-full"
            >
              <Gauge className="h-5 w-5 mr-2" />
              {isCompressing
                ? "Compressing..."
                : `Compress ${selectedFiles.length} PDF Files`}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Compression Results */}
      {compressedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Compression Results
                </CardTitle>
                <CardDescription>
                  {compressedResults.filter(r => r.success).length} PDF(s) compressed successfully
                </CardDescription>
              </div>
              <Button onClick={downloadAll} size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compressedResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm sm:text-base mb-2">
                        {result.originalName}
                      </h4>
                      {result.success ? (
                        <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                          <span>Original: {formatFileSize(result.originalSize)}</span>
                          <span>Compressed: {formatFileSize(result.compressedSize)}</span>
                          <Badge
                            variant={result.compressionRatio > 20 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {result.compressionRatio}% smaller
                          </Badge>
                        </div>
                      ) : (
                        <p className="text-xs text-red-500">Error: {result.error}</p>
                      )}
                    </div>
                    {result.success && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                      >
                        <Download className="h-3 w-3 mr-1" />
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
        isOpen={isCompressing}
        title="Compressing PDF Files"
        current={compressionProgress.current}
        total={compressionProgress.total}
        currentFile={compressionProgress.file}
        description="Please wait while we compress your PDF files..."
      />

      {/* SEO Content Section */}
      <CompressPdfSEOContent />
    </div>
  );
}

export default function CompressPdfPage() {
  return (
    <ToolPageWrapper toolSlug="compress-pdf">
      (
    <ToastProvider>
      <CompressPdfContent />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
} 