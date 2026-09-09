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
  ImageIcon,
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
import { useToolImageHandoffImport } from "@/hooks/use-tool-image-handoff";

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
  const [linkImportLoading, setLinkImportLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  // Extension / long URL lists: ts-images=#... (hash is not sent to server; avoids query length limits)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = window.location.hash;
    if (!raw.startsWith("#ts-images=")) return;

    let urls: string[] = [];
    try {
      const decoded = decodeURIComponent(raw.slice("#ts-images=".length));
      const parsed = JSON.parse(decoded);
      if (Array.isArray(parsed)) {
        urls = parsed.filter((u): u is string => typeof u === "string" && u.trim().length > 0);
      }
    } catch {
      showToast("Could not read images from link", "error");
      return;
    }

    if (urls.length === 0) return;

    let canceled = false;
    setLinkImportLoading(true);

    const fetchAsFile = async (url: string, index: number): Promise<File | null> => {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) return null;
        const blob = await res.blob();
        const ext = blob.type.split("/")[1] || "jpg";
        const name = `imported-${index}.${ext}`;
        return new File([blob], name, { type: blob.type });
      } catch {
        return null;
      }
    };

    (async () => {
      try {
        showToast(`Fetching ${urls.length} image(s)…`, "info");
        const files = (await Promise.all(urls.map((u, i) => fetchAsFile(u, i)))).filter(
          (f): f is File => !!f
        );
        if (canceled || files.length === 0) {
          if (!canceled && files.length === 0) showToast("Failed to fetch images from link", "error");
          return;
        }
        setSelectedFiles((prev) => [...prev, ...files]);
        scrollToElement(afterUploadRef, 50);
        const path = window.location.pathname + window.location.search;
        window.history.replaceState(null, "", path);
      } finally {
        if (!canceled) setLinkImportLoading(false);
      }
    })();

    return () => {
      canceled = true;
      setLinkImportLoading(false);
    };
  }, [showToast]);
  
  const handleFileSelect = (files: File[]) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    scrollToElement(afterUploadRef, 50);
  };

  useToolImageHandoffImport((files) => {
    setSelectedFiles((prev) => [...prev, ...files]);
    scrollToElement(afterUploadRef, 50);
    showToast("Image loaded from another Toolspy tool", "success");
  });

  // Auto-import images from search params (?images=url or ?images=[url1,url2])
  // Skip if extension_data is present (query or hash) to avoid conflicts
  useEffect(() => {
    const extensionDataParam = searchParams?.get("extension_data");
    if (extensionDataParam) return; // extension_data takes priority
    if (
      typeof window !== "undefined" &&
      window.location.hash.startsWith("#extension_data=")
    )
      return;

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
    setLinkImportLoading(true);
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
      try {
        const files = (await Promise.all(urls.map((u, i) => fetchAsFile(u, i)))).filter(
          (f): f is File => !!f
        );
        if (canceled || files.length === 0) return;
        setSelectedFiles((prev) => [...prev, ...files]);
        scrollToElement(afterUploadRef, 50);
      } finally {
        if (!canceled) setLinkImportLoading(false);
      }
    })();

    return () => {
      canceled = true;
      setLinkImportLoading(false);
    };
  }, [searchParams]);

  // Handle extension_data: ?extension_data= or #extension_data=
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
        const parsed = JSON.parse(extensionDataParam as string);
        
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

    setLinkImportLoading(true);

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
      try {
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

        if (clearHashAfterImport && typeof window !== "undefined") {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }

        setTimeout(() => {
          if (!canceled) {
            scrollToElement(afterUploadRef, 50);
          }
        }, 300);
      } finally {
        if (!canceled) setLinkImportLoading(false);
      }
    })();

    return () => {
      canceled = true;
      setLinkImportLoading(false);
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

    abortRef.current?.abort();
    abortRef.current = new AbortController();

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
        },
        { signal: abortRef.current.signal }
      );

      if (results.length === 0) {
        showToast(
          "No images could be compressed. If you uploaded HEIC/HEIF/SVG or a restricted format, try converting to JPG/PNG first.",
          "error"
        );
        return;
      }

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
      if (error instanceof DOMException && error.name === "AbortError") {
        showToast("Compression cancelled", "info");
        return;
      }
      showToast(
        "Compression failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsCompressing(false);
      abortRef.current = null;
    }
  };

  const cancelCompression = () => {
    abortRef.current?.abort();
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

      if (compressedResults.length === 0) {
        showToast("No compressed images available for download", "error");
        return;
      }

      const files = compressedResults.map((result) => result.file);

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
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <Badge
          variant="outline"
          className="pointer-events-none bg-green-100 font-bold text-green-800 dark:bg-green-900 dark:text-green-200"
        >
          <Shield className="mr-2 h-4 w-4" aria-hidden />
          Privacy-first · Compresses in your browser
        </Badge>

        <h2 className="mb-3 mt-4 bg-gradient-to-r from-red-500 to-blue-700 bg-clip-text pb-1 text-2xl font-bold text-transparent dark:from-red-600 dark:to-blue-500 sm:text-3xl lg:text-4xl">
          Image Compressor
        </h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:text-base">
          Upload images → pick a preset → compress. Runs locally — files never leave your device.
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
        modalDuration={700}
        importInProgress={linkImportLoading}
        importModalMessage="Importing images"
        importModalSubMessage="Fetching your images — almost there…"
      />

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div
          ref={afterUploadRef}
          className="animate-in fade-in slide-in-from-top-4 pb-24 duration-500 md:pb-0"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            {/* Selected Files Preview */}
            <Card className="mb-4 md:col-span-3 md:mb-6 lg:col-span-4">
              <CardHeader>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" aria-hidden />
                      Selected ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>Ready to compress — pick a preset, then tap Compress</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={clearAllFiles}
                    size="sm"
                    aria-label="Clear all selected images"
                  >
                    <Trash2 className="mr-2 h-4 w-4" aria-hidden />
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="max-h-64 overflow-y-auto md:max-h-64">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
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
            <Card className="mb-4 md:col-span-3 md:mb-6 lg:col-span-2">
              <CardHeader>
                <CardTitle>Quick preset</CardTitle>
                <CardDescription>Most people use Web Optimized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {presetCards.map(({ key, icon, title, description }) => (
                    <button
                      key={key}
                      type="button"
                      className={`rounded-lg border p-3 text-left transition-all duration-200 ${
                        currentPreset === key
                          ? "border-primary bg-primary/10 ring-1 ring-primary"
                          : "border-border hover:border-primary/50 hover:bg-muted/40"
                      }`}
                      onClick={() => applyPreset(key)}
                      aria-label={`Select ${title} compression preset: ${description}`}
                      aria-pressed={currentPreset === key}
                    >
                      <div className="mb-1.5 flex items-center gap-2">
                        <span aria-hidden="true">{icon}</span>
                        <span className="text-sm font-semibold sm:text-base">{title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground sm:text-sm">{description}</p>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Primary compress — above settings so users don't bounce before finding it */}
          <div className="mb-4 hidden md:block">
            <Button
              onClick={handleCompress}
              disabled={selectedFiles.length === 0 || isCompressing}
              size="lg"
              className="h-12 w-full text-base font-semibold"
              aria-label={
                isCompressing
                  ? "Compressing images, please wait"
                  : `Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? "s" : ""}`
              }
            >
              {isCompressing
                ? "Compressing…"
                : `Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? "s" : ""}`}
            </Button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Optional: open Advanced settings below to tweak quality or format
            </p>
          </div>

          {/* Compression Settings Card */}
          <Card ref={compressionSettingsRef} className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Settings (optional)</CardTitle>
                  <CardDescription>
                    Defaults are fine for most photos — change only if you need to
                  </CardDescription>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  size="sm"
                  className="hidden gap-1 md:flex"
                  aria-label={showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
                  aria-expanded={showAdvanced}
                >
                  <Settings className="mr-2 h-4 w-4" aria-hidden />
                  <span>{showAdvanced ? "Hide" : "Advanced"}</span>
                  {showAdvanced ? (
                    <ChevronUp className="ml-2 h-4 w-4" aria-hidden />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Top Row: Quality, Output Format, Target Size */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                {/* Quality Slider */}
                <div className="sm:col-span-2 lg:col-span-1">
                  <Label htmlFor="quality-slider" className="text-sm font-medium">
                    Quality
                  </Label>
                  <div className="space-y-2">
                    <div className="text-right text-sm font-medium">{quality[0]}%</div>
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
                  <Label htmlFor="output-format-select" className="text-sm font-medium">
                    Output Format
                  </Label>
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
                className="w-full md:hidden"
                aria-label={showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
                aria-expanded={showAdvanced}
              >
                <Settings className="mr-2 h-4 w-4" aria-hidden />
                <span className="inline">{showAdvanced ? "Hide" : "Advanced"}</span>
                {showAdvanced ? (
                  <ChevronUp className="ml-2 h-4 w-4" aria-hidden />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4" aria-hidden />
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

              {/* Desktop secondary compress kept near settings for long-scroll users */}
              <Button
                onClick={handleCompress}
                disabled={selectedFiles.length === 0 || isCompressing}
                size="lg"
                className="hidden w-full md:inline-flex"
                variant="outline"
                aria-label={
                  isCompressing
                    ? "Compressing images, please wait"
                    : `Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? "s" : ""}`
                }
              >
                {isCompressing
                  ? "Compressing…"
                  : `Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? "s" : ""}`}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Mobile sticky compress — always visible after upload (cuts drop-off from buried CTA) */}
      {selectedFiles.length > 0 && !isCompressing && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.12)] backdrop-blur md:hidden">
          <Button
            onClick={handleCompress}
            disabled={selectedFiles.length === 0 || isCompressing}
            size="lg"
            className="h-12 w-full text-base font-semibold"
            aria-label={`Compress ${selectedFiles.length} image${selectedFiles.length !== 1 ? "s" : ""}`}
          >
            Compress {selectedFiles.length} image{selectedFiles.length !== 1 ? "s" : ""}
          </Button>
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
        onCancel={cancelCompression}
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
