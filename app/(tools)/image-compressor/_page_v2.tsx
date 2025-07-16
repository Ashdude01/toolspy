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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ImagePreview } from "@/components/tools/shared/image-preview";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Copy,
  Trash2,
  Settings,
  Zap,
  Target,
  Gauge,
  Globe,
  ChevronDown,
  ChevronUp,
  Shield,
} from "lucide-react";
import {
  COMPRESSION_PRESETS,
  CompressionPreset,
  batchCompress,
  CompressionResult,
} from "@/lib/utils/compression-utils";
import { CompressionSettings } from "@/lib/utils/file-utils";
import {
  formatFileSize,
  downloadFile,
  copyImageToClipboard,
  createZipFromFiles,
  downloadZip,
} from "@/lib/utils/file-utils";
import { scrollToElement } from "@/lib/utils";

// Import SEO Content Component
import { ImageCompressorSEOContent } from "./seo-content";
import { CompactImagePreview } from "@/components/tools/shared/compact-image-preview";

function ImageCompressorContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedResults, setCompressedResults] = useState<
    CompressionResult[]
  >([]);
  const [currentPreset, setCurrentPreset] =
    useState<CompressionPreset>("web-optimized");
  const [quality, setQuality] = useState([85]);
  const [outputFormat, setOutputFormat] = useState("original");
  const [enableResize, setEnableResize] = useState(false);
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [removeExifData, setRemoveExifData] = useState<boolean | "selective">(
    "selective"
  );
  const [enableProgressive, setEnableProgressive] = useState(false);
  const [targetFileSize, setTargetFileSize] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionProgress, setCompressionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const afterUploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
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
    setCompressedResults([]);
    showToast("All files cleared", "info");
  };

  const applyPreset = (preset: CompressionPreset) => {
    setCurrentPreset(preset);
    const presetSettings = COMPRESSION_PRESETS[preset];
    setQuality([presetSettings.quality]);
    setOutputFormat(presetSettings.format);
  };

  const handleCompress = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select files to compress", "error");
      return;
    }

    setIsCompressing(true);
    setCompressionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const settings: CompressionSettings = {
      quality: quality[0],
      format: outputFormat,
      resize: enableResize
        ? {
            width: resizeWidth ? parseInt(resizeWidth) : undefined,
            height: resizeHeight ? parseInt(resizeHeight) : undefined,
            maintainAspectRatio,
          }
        : undefined,
      removeExifData,
      enableProgressive,
      targetFileSize: targetFileSize
        ? parseInt(targetFileSize) * 1024
        : undefined, // Convert KB to bytes
    };

    try {
      const results = await batchCompress(
        selectedFiles,
        settings,
        (current, total, currentFile) => {
          setCompressionProgress({ current, total, file: currentFile });
        }
      );

      setCompressedResults(results);
      const totalSaved = results.reduce(
        (sum, result) => sum + (result.originalSize - result.compressedSize),
        0
      );
      showToast(
        `Compressed ${results.length} image(s), saved ${formatFileSize(
          totalSaved
        )}`,
        "success"
      );
      scrollToElement(resultsRef,);
    } catch (error) {
      showToast(
        "Compression failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadSingle = (result: CompressionResult) => {
    downloadFile(result.file, result.file.name);
    showToast("File downloaded", "success");
  };

  const downloadAll = () => {
    compressedResults.forEach((result) => {
      downloadFile(result.file, result.file.name);
    });
  };

  const downloadAllAsZip = async () => {
    try {
      console.log("Starting ZIP download...");
      console.log("Compressed results count:", compressedResults.length);

      if (compressedResults.length === 0) {
        showToast("No compressed images available for download", "error");
        return;
      }

      const files = compressedResults.map((result) => result.file);
      console.log(
        "Files to zip:",
        files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
      );

      const zipBlob = await createZipFromFiles(files, "compressed-images.zip");

      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadZip(zipBlob, `${watermark}-compressed-images.zip`);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create ZIP file";
      showToast(`ZIP Error: ${errorMessage}`, "error");
    }
  };

  const copySingle = async (result: CompressionResult) => {
    try {
      await copyImageToClipboard(result.file);
      showToast("Image copied to clipboard", "success");
    } catch (error) {
      console.error("Copy error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to copy image";
      showToast(errorMessage, "error");
    }
  };

  const presetCards = [
    {
      key: "balanced" as CompressionPreset,
      icon: <Target className="h-5 w-5" />,
      title: "Balanced",
      description: "Good quality + reasonable file size",
    },
    {
      key: "high-quality" as CompressionPreset,
      icon: <Zap className="h-5 w-5" />,
      title: "High Quality",
      description: "Best quality, larger file size",
    },
    {
      key: "max-compression" as CompressionPreset,
      icon: <Gauge className="h-5 w-5" />,
      title: "Max Compress",
      description: "Smallest file size, lower quality",
    },
    {
      key: "web-optimized" as CompressionPreset,
      icon: <Globe className="h-5 w-5" />,
      title: "Web Optimized",
      description: "Perfect for websites and web apps",
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

        {/* Main Heading */}
        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Professional Image Compressor
        </h1>
        <p className="text-sm  sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Compress images while maintaining quality with Toolspy's advanced
          compression engine. Reduce file size and optimize images.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={100}
        className="mb-6 sm:mb-8"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div ref={afterUploadRef} className="grid grid-cols-1 md:grid-cols-6 gap-5">
          <Card className="mb-6 sm:mb-8 max-h-fit md:col-span-4 ">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Selected Files ({selectedFiles.length})</CardTitle>
                  <CardDescription>Files ready for compression</CardDescription>
                </div>
                <Button variant="outline" onClick={clearAllFiles} size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="md:max-h-[30rem] overflow-y-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
          {/* )} */}

          {/* Compression Presets & Settings */}
          <Card className="mb-6 sm:mb-8 md:col-span-2">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Compression Settings</CardTitle>
                  <CardDescription>
                    Choose a preset or customize settings below
                  </CardDescription>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  size="sm"
                  className="hidden md:flex gap-1"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="hidden xl:inline">
                    {showAdvanced ? "Hide" : "Advanced"}
                  </span>
                  <span className="xl:hidden">
                    {showAdvanced ? "Hide" : "More"}
                  </span>
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Compression Presets */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Quick Presets
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                  {presetCards.map(({ key, icon, title, description }) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all duration-200 ${
                        currentPreset === key
                          ? "ring-1 ring-primary bg-gray-300/50 dark:bg-gray-500/50"
                          : "hover:shadow-md hover:ring-1 hover:ring-primary"
                      }`}
                      onClick={() => applyPreset(key)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          {icon}
                          <span className="font-semibold text-sm sm:text-base">
                            {title}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-muted"></div>
              {/* Top Row: Quality, Output Format, Target Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Quality Slider */}
                <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                  <Label className="text-sm font-medium">Quality</Label>
                  <div className="space-y-2">
                    <div className="text-right text-sm font-medium">
                      {quality[0]}%
                    </div>
                    <Slider
                      value={quality}
                      onValueChange={setQuality}
                      max={100}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Target File Size */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Target Size (KB)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    value={targetFileSize}
                    onChange={(e) => setTargetFileSize(e.target.value)}
                  />
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="original">Keep Original</SelectItem>
                      <SelectItem value="jpeg">JPEG</SelectItem>
                      <SelectItem value="png">PNG</SelectItem>
                      <SelectItem value="webp">WebP</SelectItem>
                      <SelectItem value="avif">AVIF</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Advance Setting Button for Mobile */}
              <Button
                variant="outline"
                onClick={() => setShowAdvanced(!showAdvanced)}
                size="sm"
                className="md:hidden w-full"
              >
                <Settings className="h-4 w-4 mr-2" />
                <span className="inline">
                  {showAdvanced ? "Hide" : "Advanced"}
                </span>
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" />
                )}
              </Button>

              {/* Advanced Settings (when toggled) */}
              {showAdvanced && (
                <div className="space-y-4">
                  {/* Resize Toggle */}
                  <div className="flex gap-2">
                    <input
                      type="checkbox"
                      id="resize-checkbox"
                      checked={enableResize}
                      onChange={(e) => setEnableResize(e.target.checked)}
                      className="rounded"
                    />
                    <Label
                      htmlFor="resize-checkbox"
                      className="text-sm font-medium"
                    >
                      Resize images
                    </Label>
                  </div>
                  {/* Resize Settings (when enabled) */}
                  {enableResize && (
                    <div className="space-y-4 pl-3 sm:pl-6 border-l-2 border-muted">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Width (px)
                          </Label>
                          <Input
                            type="number"
                            placeholder="Auto"
                            value={resizeWidth}
                            onChange={(e) => setResizeWidth(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium">
                            Height (px)
                          </Label>
                          <Input
                            type="number"
                            placeholder="Auto"
                            value={resizeHeight}
                            onChange={(e) => setResizeHeight(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={maintainAspectRatio}
                          onCheckedChange={setMaintainAspectRatio}
                        />
                        <Label className="text-sm">Maintain Aspect Ratio</Label>
                      </div>
                    </div>
                  )}

                  {/* Bottom Row: EXIF Metadata and Progressive Encoding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* EXIF Metadata */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        EXIF Metadata
                      </Label>
                      <Select
                        value={
                          removeExifData === true
                            ? "remove"
                            : removeExifData === false
                            ? "keep"
                            : "selective"
                        }
                        onValueChange={(value) => {
                          if (value === "remove") setRemoveExifData(true);
                          else if (value === "keep") setRemoveExifData(false);
                          else setRemoveExifData("selective"); // selective
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="remove">Remove All</SelectItem>
                          <SelectItem value="keep">Preserve All</SelectItem>
                          <SelectItem value="selective">
                            Selective (Safe)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Progressive Encoding */}
                    <div className="flex items-center space-x-2 pt-2 sm:pt-6">
                      <input
                        type="checkbox"
                        id="progressive-checkbox"
                        checked={enableProgressive}
                        onChange={(e) => setEnableProgressive(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="progressive-checkbox" className="text-sm">
                        Progressive encoding
                      </Label>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    Advanced settings allow you to fine-tune compression
                    parameters for optimal results.
                  </p>
                </div>
              )}

              {/* Compress Button */}
              <Button
                onClick={handleCompress}
                disabled={selectedFiles.length === 0 || isCompressing}
                size="lg"
                className="w-full"
              >
                {isCompressing
                  ? "Compressing..."
                  : `Compress ${selectedFiles.length} Images`}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Compression Results */}
      {compressedResults.length > 0 && (
        <Card ref={resultsRef}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Compression Results</CardTitle>
                <CardDescription>
                  {compressedResults.length} image(s) compressed successfully
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAll} variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download All</span>
                  <span className="sm:hidden">All</span>
                </Button>
                <Button onClick={downloadAllAsZip} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">
                    Download All ZIP ({compressedResults.length})
                  </span>
                  <span className="sm:hidden">
                    ZIP ({compressedResults.length})
                  </span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {compressedResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Thumbnail */}
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <img
                        src={URL.createObjectURL(result.file)}
                        alt={result.file.name}
                        className="w-full sm:w-16 sm:h-16 aspect-video object-cover rounded-lg border"
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

                    {/* File Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h4 className="font-medium truncate text-sm sm:text-base">
                        {result.file.name}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground mt-1 space-y-1 sm:space-y-0">
                        <span>
                          Original: {formatFileSize(result.originalSize)}
                        </span>
                        <span>
                          Compressed: {formatFileSize(result.compressedSize)}
                        </span>
                        <Badge
                          variant={
                            result.compressionRatio > 30
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs w-fit mx-auto sm:mx-0"
                        >
                          {result.compressionRatio}% saved
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center sm:justify-start space-x-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copySingle(result)}
                        title="Copy to clipboard"
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="ml-1 sm:hidden text-xs">Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                        title="Download file"
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="ml-1 sm:hidden text-xs">Download</span>
                      </Button>
                    </div>
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
        title="Compressing Images"
        current={compressionProgress.current}
        total={compressionProgress.total}
        currentFile={compressionProgress.file}
        description="Please wait while we compress your images..."
      />

      {/* SEO Content Section */}
      <ImageCompressorSEOContent />
    </div>
  );
}

export default function ImageCompressorPage() {
  return (
    <ToastProvider>
      <ImageCompressorContent />
    </ToastProvider>
  );
}
