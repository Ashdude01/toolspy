"use client";

import { useRef, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const [outputFormat, setOutputFormat] = useState("webp");
  const [enableResize, setEnableResize] = useState(false);
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [removeExifData, setRemoveExifData] = useState<boolean | "selective">(
    "selective"
  );
  const [enableProgressive, setEnableProgressive] = useState(false);
  const [preserveOriginalNames, setPreserveOriginalNames] = useState(false);
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
  const compressionSettingsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  
  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    scrollToElement(afterUploadRef, 50);
  };

  // Auto-import images from search params (?images=url or ?images=[url1,url2])
  // Skip if extension_data is present to avoid conflicts
  useEffect(() => {
    const extensionDataParam = searchParams?.get("extension_data");
    if (extensionDataParam) return; // extension_data takes priority
    
    const imagesParam = searchParams?.get("images");
    if (!imagesParam) return;

    const parseUrls = (): string[] => {
      try {
        // Try JSON array
        const parsed = JSON.parse(imagesParam);
        if (Array.isArray(parsed)) return parsed.filter((u) => typeof u === 'string');
      } catch {}
      // Fallback: comma-separated
      if (imagesParam.includes(",")) return imagesParam.split(",").map((s) => s.trim());
      return [imagesParam.trim()];
    };

    const urls = parseUrls().filter(Boolean);
    if (urls.length === 0) return;

    let canceled = false;
    const fetchAsFile = async (url: string, index: number): Promise<File | null> => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return null;
        const blob = await res.blob();
        const ext = blob.type.split('/')[1] || 'jpg';
        const name = `imported-${index}.${ext}`;
        return new File([blob], name, { type: blob.type });
      } catch {
        return null;
      }
    };

    (async () => {
      const files = (await Promise.all(urls.map((u, i) => fetchAsFile(u, i)))).filter(
        (f): f is File => !!f
      );
      if (canceled || files.length === 0) return;
      setSelectedFiles((prev) => [...prev, ...files]);
      scrollToElement(afterUploadRef, 50);
    })();

    return () => {
      canceled = true;
    };
  }, [searchParams]);

  // Handle extension_data search param with images and settings
  useEffect(() => {
    const extensionDataParam = searchParams?.get("extension_data");
    if (!extensionDataParam) return;

    let canceled = false;

    // Parse and validate extension_data
    const parseExtensionData = (): {
      images: string[];
      settings: {
        preset: CompressionPreset;
        quality: number;
        format: string;
        resize?: {
          width?: number;
          height?: number;
          maintainAspectRatio: boolean;
        };
        removeExifData: boolean;
        enableProgressive: boolean;
        targetFileSize?: number;
      };
    } | null => {
      try {
        const parsed = JSON.parse(extensionDataParam);
        
        // Validate structure
        if (!parsed || typeof parsed !== 'object') {
          showToast("Invalid extension_data format", "error");
          return null;
        }

        // Validate images array
        if (!Array.isArray(parsed.images) || parsed.images.length === 0) {
          showToast("No images provided in extension_data", "error");
          return null;
        }
        const images = parsed.images.filter((url: any) => typeof url === 'string' && url.trim().length > 0);
        if (images.length === 0) {
          showToast("No valid image URLs found", "error");
          return null;
        }

        // Validate settings
        if (!parsed.settings || typeof parsed.settings !== 'object') {
          showToast("Invalid settings in extension_data", "error");
          return null;
        }

        const settings = parsed.settings;
        const validPresets: CompressionPreset[] = ['balanced', 'high-quality', 'max-compression', 'web-optimized'];
        const preset = validPresets.includes(settings.preset) ? settings.preset : 'balanced';

        // Validate quality (1-100)
        const quality = typeof settings.quality === 'number' 
          ? Math.max(1, Math.min(100, settings.quality)) 
          : 85;

        // Validate format
        const validFormats = ['original', 'jpeg', 'png', 'webp', 'avif'];
        const format = typeof settings.format === 'string' && validFormats.includes(settings.format)
          ? settings.format
          : 'original';

        // Validate resize settings if provided
        let resize: { width?: number; height?: number; maintainAspectRatio: boolean } | undefined;
        if (settings.resize && typeof settings.resize === 'object') {
          const resizeSettings = settings.resize;
          resize = {
            maintainAspectRatio: typeof resizeSettings.maintainAspectRatio === 'boolean' 
              ? resizeSettings.maintainAspectRatio 
              : true,
          };
          
          if (typeof resizeSettings.width === 'number' && resizeSettings.width > 0) {
            resize.width = Math.round(resizeSettings.width);
          }
          if (typeof resizeSettings.height === 'number' && resizeSettings.height > 0) {
            resize.height = Math.round(resizeSettings.height);
          }
          
          // Only enable resize if at least one dimension is provided
          if (!resize.width && !resize.height) {
            resize = undefined;
          }
        }

        // Validate removeExifData
        const removeExifData = typeof settings.removeExifData === 'boolean' ? settings.removeExifData : true;

        // Validate enableProgressive
        const enableProgressive = typeof settings.enableProgressive === 'boolean' ? settings.enableProgressive : false;

        // Validate targetFileSize (in KB)
        let targetFileSize: number | undefined;
        if (typeof settings.targetFileSize === 'number' && settings.targetFileSize > 0) {
          targetFileSize = Math.round(settings.targetFileSize);
        }

        return {
          images,
          settings: {
            preset,
            quality,
            format,
            resize,
            removeExifData,
            enableProgressive,
            targetFileSize,
          },
        };
      } catch (error) {
        showToast("Failed to parse extension_data: " + (error instanceof Error ? error.message : "Invalid JSON"), "error");
        return null;
      }
    };

    const data = parseExtensionData();
    if (!data || canceled) return;

    // Apply settings to state
    setCurrentPreset(data.settings.preset);
    setQuality([data.settings.quality]);
    setOutputFormat(data.settings.format);
    setEnableResize(!!data.settings.resize);
    if (data.settings.resize) {
      setResizeWidth(data.settings.resize.width?.toString() || "");
      setResizeHeight(data.settings.resize.height?.toString() || "");
      setMaintainAspectRatio(data.settings.resize.maintainAspectRatio);
    }
    setRemoveExifData(data.settings.removeExifData);
    setEnableProgressive(data.settings.enableProgressive);
    setTargetFileSize(data.settings.targetFileSize?.toString() || "");

    // Fetch images
    const fetchAsFile = async (url: string, index: number): Promise<File | null> => {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          console.error(`Failed to fetch image ${index + 1}: ${res.statusText}`);
          return null;
        }
        const blob = await res.blob();
        if (!blob.type.startsWith('image/')) {
          console.error(`Invalid image type for ${url}: ${blob.type}`);
          return null;
        }
        const ext = blob.type.split('/')[1] || 'jpg';
        const name = `imported-${index + 1}.${ext}`;
        return new File([blob], name, { type: blob.type });
      } catch (error) {
        console.error(`Error fetching image ${index + 1}:`, error);
        return null;
      }
    };

    (async () => {
      showToast(`Fetching ${data.images.length} image(s)...`, "info");
      
      const files = (await Promise.all(
        data.images.map((url, i) => fetchAsFile(url, i))
      )).filter((f): f is File => !!f);

      if (canceled) return;

      if (files.length === 0) {
        showToast("Failed to fetch any images", "error");
        return;
      }

      if (files.length < data.images.length) {
        showToast(`Fetched ${files.length} of ${data.images.length} images`, "warning");
      }

      setSelectedFiles(files);
      
      // Scroll to compression settings area after a short delay to ensure state is updated
      setTimeout(() => {
        if (!canceled) {
          // scrollToElement(compressionSettingsRef, 50);
          scrollToElement(afterUploadRef, 50);
        }
      }, 300);
    })();

    return () => {
      canceled = true;
    };
  }, [searchParams, showToast]);

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
      preserveOriginalNames,
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
      scrollToElement(resultsRef);
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
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
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
        autoCollapse={true}
        showBrandedModal={true}
        modalDuration={2000}
        onModalClose={() => {
          // Optional: Add any logic when modal closes
        }}
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div ref={afterUploadRef} className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {/* Selected Files Preview */}
            <Card className="mb-6 sm:mb-8 md:col-span-4 ">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>
                      Selected Files ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for compression
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={clearAllFiles} 
                    size="sm"
                    aria-label="Clear all selected images"
                  >
                    <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="md:max-h-64 overflow-y-auto">
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

            {/* Compression Presets */}
            <Card className="mb-6 sm:mb-8 md:col-span-2">
              <CardHeader>
                <CardTitle>Compression Preset</CardTitle>
                <CardDescription>
                  Choose a preset or customize settings below
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Compression Presets */}
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
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${title} compression preset: ${description}`}
                      aria-pressed={currentPreset === key}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          applyPreset(key);
                        }
                      }}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2 mb-2">
                          <span aria-hidden="true">{icon}</span>
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
              </CardContent>
            </Card>
          </div>

          {/* Compression Settings Card */}
          <Card ref={compressionSettingsRef} className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Compression Settings</CardTitle>
                  <CardDescription>
                    Fine-tune compression parameters
                  </CardDescription>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  size="sm"
                  className="hidden md:flex gap-1"
                  aria-label={showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
                  aria-expanded={showAdvanced}
                >
                  <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="hidden xl:inline">
                    {showAdvanced ? "Hide" : "Advanced"}
                  </span>
                  <span className="xl:hidden">
                    {showAdvanced ? "Hide" : "More"}
                  </span>
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4 ml-2" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Top Row: Quality, Output Format, Target Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Quality Slider */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="quality-slider" className="text-sm font-medium">Quality</Label>
                  <div className="space-y-2">
                    <div className="text-right text-sm font-medium">
                      {quality[0]}%
                    </div>
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
                  </div>
                </div>

                {/* Target File Size */}
                <div className="space-y-2">
                  <Label htmlFor="target-size-input" className="text-sm font-medium">
                    Target Size (KB)
                  </Label>
                  <Input
                    id="target-size-input"
                    type="number"
                    placeholder="Auto"
                    value={targetFileSize}
                    onChange={(e) => setTargetFileSize(e.target.value)}
                    className="ring-1 ring-gray-400"
                    aria-label="Target file size in kilobytes"
                  />
                </div>

                {/* Output Format */}
                <div className="space-y-2">
                  <Label htmlFor="output-format-select" className="text-sm font-medium">Output Format</Label>
                  <Select value={outputFormat} onValueChange={setOutputFormat}>
                    <SelectTrigger id="output-format-select" aria-label="Select output image format">
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
                aria-label={showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
                aria-expanded={showAdvanced}
              >
                <Settings className="h-4 w-4 mr-2" aria-hidden="true" />
                <span className="inline">
                  {showAdvanced ? "Hide" : "Advanced"}
                </span>
                {showAdvanced ? (
                  <ChevronUp className="h-4 w-4 ml-2" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4 ml-2" aria-hidden="true" />
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
                          <Label htmlFor="resize-width-input" className="text-sm font-medium">
                            Width (px)
                          </Label>
                          <Input
                            id="resize-width-input"
                            type="number"
                            placeholder="Auto"
                            value={resizeWidth}
                            onChange={(e) => setResizeWidth(e.target.value)}
                            aria-label="Image width in pixels"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="resize-height-input" className="text-sm font-medium">
                            Height (px)
                          </Label>
                          <Input
                            id="resize-height-input"
                            type="number"
                            placeholder="Auto"
                            value={resizeHeight}
                            onChange={(e) => setResizeHeight(e.target.value)}
                            aria-label="Image height in pixels"
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="aspect-ratio-switch"
                          checked={maintainAspectRatio}
                          onCheckedChange={setMaintainAspectRatio}
                          aria-label="Maintain aspect ratio when resizing"
                        />
                        <Label htmlFor="aspect-ratio-switch" className="text-sm">Maintain Aspect Ratio</Label>
                      </div>
                    </div>
                  )}

                  {/* Bottom Row: EXIF Metadata and Progressive Encoding */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* EXIF Metadata */}
                    <div className="space-y-2">
                      <Label htmlFor="exif-metadata-select" className="text-sm font-medium">
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
                        <SelectTrigger id="exif-metadata-select" aria-label="Select EXIF metadata handling">
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
                        aria-label="Enable progressive encoding"
                        checked={enableProgressive}
                        onChange={(e) => setEnableProgressive(e.target.checked)}
                        className="rounded"
                      />
                      <Label htmlFor="progressive-checkbox" className="text-sm">
                        Progressive encoding
                      </Label>
                    </div>
                  </div>

                  {/* File Naming Options */}
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="preserve-names-switch"
                      checked={preserveOriginalNames}
                      onCheckedChange={setPreserveOriginalNames}
                      aria-label="Preserve original filenames"
                    />
                    <Label htmlFor="preserve-names-switch" className="text-sm font-medium">
                      Original Filename
                    </Label>
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
                aria-label={isCompressing 
                  ? "Compressing images, please wait" 
                  : `Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? 's' : ''}`}
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
        <Card ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Compression Results</CardTitle>
                <CardDescription>
                  {compressedResults.length} image(s) compressed successfully on <span className="font-semibold text-primary">Toolspy</span>
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={downloadAll} 
                  variant="outline" 
                  size="sm"
                  aria-label={`Download all ${compressedResults.length} compressed images individually`}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Download All</span>
                  <span className="sm:hidden">All</span>
                </Button>
                <Button 
                  onClick={downloadAllAsZip} 
                  size="sm"
                  aria-label={`Download all ${compressedResults.length} compressed images as ZIP file`}
                >
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
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
                        aria-label={`Copy ${result.file.name} to clipboard`}
                      >
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
                        <span className="ml-1 sm:hidden text-xs">Copy</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadSingle(result)}
                        title="Download file"
                        aria-label={`Download ${result.file.name}`}
                      >
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
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
