"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { scrollToElement } from "@/lib/utils";
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
import { FileUpload } from "@/components/tools/shared/file-upload";
import { CompactImagePreview } from "@/components/tools/shared/compact-image-preview";
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
  Archive,
  Eye,
} from "lucide-react";
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useToolImageHandoffImport } from "@/hooks/use-tool-image-handoff";
import { useT } from "@/lib/i18n/use-t";

interface ConversionResult {
  file: File;
  originalName: string;
  originalSize: number;
  convertedSize: number;
  originalFormat: string;
  newFormat: string;
  success: boolean;
  error?: string;
}

const CONVERTER_OUTPUT_FORMATS = ["png", "jpeg", "webp", "gif", "bmp", "tiff"] as const;

function ImageConverterContent() {
  const t = useT();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const selectedSectionRef = useRef<HTMLDivElement>(null);
  const [linkImportLoading, setLinkImportLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [outputFormat, setOutputFormat] = useState("png");
  const [quality, setQuality] = useState([85]);

  const formatOptions = [
    { value: "png", label: "PNG", description: "Lossless compression, supports transparency" },
    { value: "jpeg", label: "JPEG", description: "Lossy compression, smaller file sizes" },
    { value: "webp", label: "WebP", description: "Modern format, excellent compression" },
    { value: "gif", label: "GIF", description: "Supports animation, limited colors" },
    { value: "bmp", label: "BMP", description: "Uncompressed, large file sizes" },
    { value: "tiff", label: "TIFF", description: "High quality, professional use" },
  ];

  // ?extension_data= or #extension_data= - same JSON
  useEffect(() => {
    const fromQuery = searchParams?.get("extension_data");
    let fromHash: string | null = null;
    if (typeof window !== "undefined" && !fromQuery) {
      const h = window.location.hash;
      if (h.startsWith("#extension_data=")) {
        try {
          fromHash = decodeURIComponent(h.slice("#extension_data=".length));
        } catch {
          showToast("Invalid extension_data in link", "error");
          return;
        }
      }
    }
    const extensionDataParam = fromQuery || fromHash;
    if (!extensionDataParam) return;
    const clearHashAfterImport = Boolean(fromHash);

    let canceled = false;

    const parsePayload = (): {
      images: string[];
      format: (typeof CONVERTER_OUTPUT_FORMATS)[number];
      quality: number;
    } | null => {
      try {
        const parsed = JSON.parse(extensionDataParam as string);
        if (!parsed || typeof parsed !== "object") {
          showToast("Invalid extension_data format", "error");
          return null;
        }
        if (!Array.isArray(parsed.images) || parsed.images.length === 0) {
          showToast("No images in extension_data", "error");
          return null;
        }
        const images = parsed.images.filter(
          (u: unknown): u is string => typeof u === "string" && u.trim().length > 0
        );
        if (images.length === 0) {
          showToast("No valid image URLs in extension_data", "error");
          return null;
        }
        const settings =
          parsed.settings && typeof parsed.settings === "object" ? parsed.settings : {};
        const fmt =
          typeof settings.format === "string" &&
          (CONVERTER_OUTPUT_FORMATS as readonly string[]).includes(settings.format)
            ? settings.format
            : "webp";
        const qualityNum =
          typeof settings.quality === "number"
            ? Math.max(1, Math.min(100, Math.round(settings.quality)))
            : 85;
        return { images, format: fmt, quality: qualityNum };
      } catch {
        showToast("Failed to parse extension_data", "error");
        return null;
      }
    };

    const data = parsePayload();
    if (!data || canceled) return;

    setLinkImportLoading(true);

    setOutputFormat(data.format);
    setQuality([data.quality]);

    const fetchAsFile = async (url: string, index: number): Promise<File | null> => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        const blob = await res.blob();
        if (!blob.type.startsWith("image/")) return null;
        const ext = blob.type.split("/")[1] || "jpg";
        return new File([blob], `imported-${index + 1}.${ext}`, { type: blob.type });
      } catch {
        return null;
      }
    };

    (async () => {
      try {
        showToast(`Fetching ${data.images.length} image(s)…`, "info");
        const files = (
          await Promise.all(data.images.map((u, i) => fetchAsFile(u, i)))
        ).filter((f): f is File => !!f);
        if (canceled) return;
        if (files.length === 0) {
          showToast("Failed to fetch any images from extension_data", "error");
          return;
        }
        if (files.length < data.images.length) {
          showToast(`Loaded ${files.length} of ${data.images.length} image(s)`, "warning");
        }
        setSelectedFiles(files);

        if (clearHashAfterImport && typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }

        setTimeout(() => {
          if (!canceled) scrollToElement(selectedSectionRef, 50);
        }, 200);
      } finally {
        if (!canceled) setLinkImportLoading(false);
      }
    })();

    return () => {
      canceled = true;
      setLinkImportLoading(false);
    };
  }, [searchParams, showToast]);

  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  useToolImageHandoffImport((files) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    showToast("Image loaded from another Toolspy tool", "success");
    setTimeout(() => scrollToElement(selectedSectionRef, 50), 200);
  });

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setConvertedResults([]);
    showToast(t('toolCommon.clearAll'), "info");
  };

  const convertImages = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select images to convert", "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: ConversionResult[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setConversionProgress({
        current: i + 1,
        total: selectedFiles.length,
        file: file.name,
      });

      try {
        const result = await convertSingleImage(file, outputFormat, quality[0]);
        results.push(result);
      } catch (error) {
        results.push({
          file,
          originalName: file.name,
          originalSize: file.size,
          convertedSize: 0,
          originalFormat: file.type.split('/')[1] || 'unknown',
          newFormat: outputFormat,
          success: false,
          error: error instanceof Error ? error.message : "Conversion failed",
        });
      }
    }

    setConvertedResults(results);
    setIsConverting(false);

    const successCount = results.filter(r => r.success).length;
    const failCount = results.length - successCount;

    if (successCount > 0) {
      showToast(
        t('tools.imageConverter.convertedSuccess', { count: successCount }),
        failCount > 0 ? "warning" : "success"
      );
    } else {
      showToast(t('tools.imageConverter.allFailed'), "error");
    }
  };

  const convertSingleImage = async (file: File, format: string, qualityValue: number): Promise<ConversionResult> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = document.createElement('img') as HTMLImageElement;

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          // Fill white background for JPEG (no transparency)
          if (format === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          // Determine output format and quality
          let mimeType = `image/${format}`;
          let outputQuality = 1;

          if (format === 'jpeg' || format === 'webp') {
            outputQuality = qualityValue / 100;
          }

                     canvas.toBlob((blob) => {
             if (blob) {
               const originalFormat = file.type.split('/')[1] || 'unknown';
               // Create filename with toolspy-converted prefix and new format extension
               const fileName = `toolspy-converted.${format}`;
               const convertedFile = new File([blob], fileName, { type: mimeType });

              resolve({
                file: convertedFile,
                originalName: file.name,
                originalSize: file.size,
                convertedSize: blob.size,
                originalFormat,
                newFormat: format,
                success: true,
              });
            } else {
              resolve({
                file,
                originalName: file.name,
                originalSize: file.size,
                convertedSize: 0,
                originalFormat: file.type.split('/')[1] || 'unknown',
                newFormat: format,
                success: false,
                error: "Failed to convert image",
              });
            }
          }, mimeType, outputQuality);
        }
      };

      img.onerror = () => {
        resolve({
          file,
          originalName: file.name,
          originalSize: file.size,
          convertedSize: 0,
          originalFormat: file.type.split('/')[1] || 'unknown',
          newFormat: format,
          success: false,
          error: "Failed to load image",
        });
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const downloadSingle = (result: ConversionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast(`${result.file.name} downloaded`, "success");
    }
  };

  const downloadAll = async () => {
    const successResults = convertedResults.filter(r => r.success);
    if (successResults.length === 0) return;

    if (successResults.length === 1) {
      downloadSingle(successResults[0]);
    } else {
      try {
        const files = successResults.map(r => r.file);
        const zipBlob = await createZipFromFiles(files, "converted-images.zip");
        downloadZip(zipBlob, "image-converter-results.zip");
        showToast(`Downloaded ${successResults.length} converted images as ZIP`, "success");
      } catch (error) {
        showToast("Failed to create ZIP file", "error");
      }
    }
  };

  const getTotalSizeReduction = () => {
    const successResults = convertedResults.filter(r => r.success);
    const totalOriginal = successResults.reduce((sum, r) => sum + r.originalSize, 0);
    const totalConverted = successResults.reduce((sum, r) => sum + r.convertedSize, 0);
    const reduction = ((totalOriginal - totalConverted) / totalOriginal) * 100;
    return { totalOriginal, totalConverted, reduction };
  };

  const { totalOriginal, totalConverted, reduction } = convertedResults.length > 0 ? getTotalSizeReduction() : { totalOriginal: 0, totalConverted: 0, reduction: 0 };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      {/* <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-purple-500 dark:from-purple-600 to-pink-600 dark:to-pink-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Professional Image Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert images between different formats (PNG, JPEG, WebP, SVG, GIF, BMP, AVIF, HEIC, etc). 
          Batch processing with quality control and format optimization.
        </p>
      </div> */}

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={50}
        autoCollapse={true}
        showBrandedModal={true}
        modalDuration={2000}
        importInProgress={linkImportLoading}
        importModalMessage="Importing images"
        importModalSubMessage="Fetching your images-almost there…"
      />


      {/* Selected Files + settings (ref for scroll after extension import) */}
      {selectedFiles.length > 0 && (
        <div ref={selectedSectionRef} className="space-y-6">
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Selected Images ({selectedFiles.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedFiles.map((file, index) => (
                <CompactImagePreview
                  key={index}
                  file={file}
                  onRemove={() => removeFile(index)}
                  showMetadata={true}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {t('toolCommon.settings')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Output Format */}
              <div className="space-y-3">
                <Label htmlFor="output-format-select">{t('tools.imageConverter.outputFormat')}</Label>
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger id="output-format-select" aria-label="Select output image format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatOptions.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{format.label}</span>
                          <span className="text-xs text-gray-500">{format.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quality */}
              {(outputFormat === 'jpeg' || outputFormat === 'webp') && (
                <div className="space-y-3">
                  <Label htmlFor="quality-slider">{t('tools.imageConverter.quality')}: {quality[0]}%</Label>
                  <Slider
                    id="quality-slider"
                    value={quality}
                    onValueChange={setQuality}
                    max={100}
                    min={1}
                    step={1}
                    className="w-full"
                    aria-label="Image quality slider"
                    aria-valuemin={1}
                    aria-valuemax={100}
                    aria-valuenow={quality[0]}
                  />
                  <div className="text-xs text-gray-500">
                    Higher quality = larger file size
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={convertImages} 
                disabled={selectedFiles.length === 0 || isConverting}
                className="flex-1"
                aria-label={`Convert ${selectedFiles.length} image${selectedFiles.length !== 1 ? 's' : ''} to ${outputFormat.toUpperCase()} format`}
              >
                <Image className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('tools.imageConverter.convertImages')} ({selectedFiles.length}) → {outputFormat.toUpperCase()}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearAllFiles}
                aria-label="Clear all selected images"
              >
                <RefreshCw className="h-4 w-4 mr-2" aria-hidden="true" />
                {t('toolCommon.clearAll')}
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
      )}

      {/* Conversion Results */}
      {convertedResults.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversion Results</CardTitle>
              <div className="flex gap-2">
                {convertedResults.filter(r => r.success).length > 0 && (
                  <Button 
                    onClick={downloadAll} 
                    size="sm"
                    aria-label={`Download all ${convertedResults.filter(r => r.success).length} converted images`}
                  >
                    <Archive className="h-4 w-4 mr-2" aria-hidden="true" />
                    {t('toolCommon.downloadAll')} ({convertedResults.filter(r => r.success).length})
                  </Button>
                )}
              </div>
            </div>
            {totalOriginal > 0 && (
              <CardDescription>
                Total size: {formatFileSize(totalOriginal)} → {formatFileSize(totalConverted)} 
                ({reduction > 0 ? `${reduction.toFixed(1)}% reduction` : `${Math.abs(reduction).toFixed(1)}% increase`})
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {convertedResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                                     <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                       <span className="font-medium truncate">
                         {result.success ? result.file.name : result.originalName}
                       </span>
                       <Badge variant={result.success ? "default" : "destructive"}>
                         {result.success ? "Converted" : "Failed"}
                       </Badge>
                     </div>
                                         <div className="text-sm text-gray-600 dark:text-gray-400">
                                               {result.success ? (
                          <>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{result.originalFormat.toUpperCase()} → {result.newFormat.toUpperCase()}</span>
                            </div>
                            <div className="text-xs">
                              {formatFileSize(result.originalSize)} → {formatFileSize(result.convertedSize)}
                            </div>
                          </>
                        ) : (
                         <span className="text-red-600 dark:text-red-400">{result.error}</span>
                       )}
                     </div>
                  </div>
                  
                  {result.success && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => downloadSingle(result)}
                        aria-label={`Download ${result.file.name}`}
                      >
                        <Download className="h-4 w-4 mr-1" aria-hidden="true" />
                        {t('toolCommon.download')}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isConverting}
        currentFile={conversionProgress.file}
        current={conversionProgress.current}
        total={conversionProgress.total}
        title={t('tools.imageConverter.converting')}
        description="Please wait while we convert your images..."
      />

      {/* SEO Content */}
      <div className="mt-12">
</div>
    </div>
  );
}

export default function ImageConverterPage() {
  return (
    <ToolPageWrapper toolSlug="image-converter">
      <ToastProvider>
        <ImageConverterContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
} 