"use client";

import { useRef, useState } from "react";
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
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Trash2,
  Shield,
  Image,
  RefreshCw,
  Settings,
} from "lucide-react";
import {
  formatFileSize,
  downloadFile,
  createZipFromFiles,
  downloadZip,
} from "@/lib/utils/file-utils";
import { CompactImagePreview } from "@/components/tools/shared/compact-image-preview";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { scrollToElement } from "@/lib/utils";

interface ConversionResult {
  file: File;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  success: boolean;
  error?: string;
}

function JfifToJpgContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>(
    []
  );
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [quality, setQuality] = useState([90]);
  const afterUploadRef = useRef<HTMLDivElement>(null);
  const handleFileSelect = (files: File[]) => {
    // Filter only JFIF files
    console.log(files);
    const jfifFiles = files.filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.name.toLowerCase().endsWith(".jfif") ||
        file.name.toLowerCase().endsWith(".jif")
    );

    if (jfifFiles.length === 0) {
      showToast("Please select JFIF files only", "error");
      return;
    }

    if (jfifFiles.length !== files.length) {
      showToast(
        `${files.length - jfifFiles.length} non-JFIF files were filtered out`,
        "warning"
      );
    }

    setSelectedFiles((prev) => [...prev, ...jfifFiles]);
    scrollToElement(afterUploadRef, 50);
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

  const convertToJpg = async () => {
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
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setConversionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          // Create canvas for conversion
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Could not get canvas context");
          }

          // Load image
          const img = document.createElement("img");
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error("Failed to load image"));
            img.src = URL.createObjectURL(file);
          });

          // Set canvas size
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw image to canvas
          ctx.drawImage(img, 0, 0);

          // Convert to JPG blob
          const jpgBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Failed to convert to JPG"));
                }
              },
              "image/jpeg",
              quality[0] / 100
            );
          });

          // Create new file
          const jpgFileName = file.name.replace(/\.(jfif|jif)$/i, ".jpg");
          const jpgFile = new File([jpgBlob], jpgFileName, {
            type: "image/jpeg",
          });

          // Clean up
          URL.revokeObjectURL(img.src);

          results.push({
            file: jpgFile,
            originalName: file.name,
            originalSize: file.size,
            convertedSize: jpgFile.size,
            success: true,
          });
        } catch (error) {
          results.push({
            file: file,
            originalName: file.name,
            originalSize: file.size,
            convertedSize: 0,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          });
        }
      }

      setConvertedResults(results);
      const successCount = results.filter((r) => r.success).length;
      const errorCount = results.filter((r) => !r.success).length;

      if (successCount > 0) {
        showToast(
          `Successfully converted ${successCount} JFIF file(s) to JPG`,
          "success"
        );
      }
      if (errorCount > 0) {
        showToast(`Failed to convert ${errorCount} file(s)`, "error");
      }
    } catch (error) {
      showToast(
        "Conversion failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadSingle = (result: ConversionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast("JPG file downloaded", "success");
    }
  };

  const downloadAll = async () => {
    const successResults = convertedResults.filter((r) => r.success);
    if (successResults.length === 0) return;

    if (successResults.length === 1) {
      downloadSingle(successResults[0]);
    } else {
      try {
        const files = successResults.map((r) => r.file);
        const zipBlob = await createZipFromFiles(files, "converted-images.zip");
        downloadZip(zipBlob, "jfif-to-jpg-toolspy.zip");
        showToast(
          `Downloaded ${successResults.length} JPG files as ZIP`,
          "success"
        );
      } catch (error) {
        showToast("Failed to create ZIP file", "error");
      }
    }
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
          JFIF to JPG Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert JFIF images to JPG format with customizable quality settings.
          Fast, reliable, and completely private conversion.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={50}
        accept=".jfif,.jif"
        className="mb-6 sm:mb-8"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div ref={afterUploadRef}>
          <div className="flex flex-col gap-6">
            <Card className="mb-6 sm:mb-8 md:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      Selected JFIF Files ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for JPG conversion
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={clearAllFiles} size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

            {/* Conversion Settings */}
            <Card className="mb-6 sm:mb-8 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Conversion Settings
                </CardTitle>
                <CardDescription>
                  Customize the quality of your JPG output
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">JPG Quality</label>
                      <span className="text-sm font-medium">{quality[0]}%</span>
                    </div>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={10}
                      step={5}
                      className="w-full cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher quality = larger file size, Lower quality = smaller
                      file size
                    </p>
                  </div>
                </div>

                {/* Convert Button */}
                <Button
                  onClick={convertToJpg}
                  disabled={selectedFiles.length === 0 || isConverting}
                  size="lg"
                  className="w-full"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  {isConverting
                    ? "Converting..."
                    : `Convert ${selectedFiles.length} JFIF to JPG`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Conversion Results */}
      {convertedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Image className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {convertedResults.filter((r) => r.success).length} file(s)
                  converted successfully
                </CardDescription>
              </div>
              <Button onClick={downloadAll} size="sm">
                <Download className="h-4 w-4" />
                Download Zip
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    {result.success && (
                      <div className="flex-shrink-0 self-center sm:self-start">
                        <img
                          src={URL.createObjectURL(result.file)}
                          alt={result.file.name}
                          className="w-full sm:w-16 sm:h-16 aspect-square object-cover rounded-lg border"
                          onLoad={(e) => {
                            // Clean up object URL to prevent memory leaks
                            setTimeout(() => {
                              URL.revokeObjectURL(
                                (e.target as HTMLImageElement).src
                              );
                            }, 100);
                          }}
                        />
                      </div>
                    )}

                    {/* File Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h4 className="font-medium truncate text-sm sm:text-base">
                        {result.file.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground mt-1">
                        <span>
                          Original: {formatFileSize(result.originalSize)}
                        </span>
                        {result.success && (
                          <span>
                            JPG: {formatFileSize(result.convertedSize)}
                          </span>
                        )}
                        <Badge
                          variant={result.success ? "default" : "destructive"}
                          className="text-xs w-fit mx-auto sm:mx-0"
                        >
                          {result.success ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      {result.error && (
                        <p className="text-xs text-red-500 mt-1">
                          Error: {result.error}
                        </p>
                      )}
                    </div>

                    {/* Action Button */}
                    {result.success && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                        title="Download JPG"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="ml-1 sm:hidden text-xs">Download</span>
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
        title="Converting JFIF to JPG"
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description="Please wait while we convert your JFIF images to JPG..."
      />
</div>
  );
}

export default function JfifToJpgPage() {
  return (
    <ToolPageWrapper toolSlug="jfif-to-jpg"><ToastProvider>
      <JfifToJpgContent /></ToastProvider></ToolPageWrapper>
  );
}
