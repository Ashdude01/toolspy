"use client";

import { useState, useRef, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import { ImagePreview } from "@/components/tools/shared/image-preview";
import {
  Download,
  RefreshCw,
  Shield,
  FileImage,
  Maximize2,
  Minimize2,
  Square,
  X,
  Settings,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Info,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Palette,
  Target,
  Gauge,
  FileDown,
  Trash2,
  Copy,
  Share2,
} from "lucide-react";
import { ImageResizerSEOContent } from "./seo-content";
import { scrollToElement } from "@/lib/utils";

interface ProcessedFile {
  id: string;
  name: string;
  originalFile: File;
  previewUrl: string;
  resizedBlob?: Blob;
  resizedUrl?: string;
  originalWidth: number;
  originalHeight: number;
  newWidth: number;
  newHeight: number;
  originalSize: number;
  newSize?: number;
  status: "pending" | "processing" | "completed" | "error";
  error?: string;
}

// Preset dimensions for common use cases
const PRESET_DIMENSIONS = {
  "Social Media": {
    "Instagram Post": { width: 1080, height: 1080 },
    "Instagram Story": { width: 1080, height: 1920 },
    "Facebook Post": { width: 1200, height: 630 },
    "Twitter Post": { width: 1200, height: 675 },
    "LinkedIn Post": { width: 1200, height: 627 },
    "YouTube Thumbnail": { width: 1280, height: 720 },
  },
  "Web & Email": {
    "Website Banner": { width: 1920, height: 600 },
    "Email Header": { width: 600, height: 200 },
    "Blog Post": { width: 800, height: 400 },
    "Profile Picture": { width: 400, height: 400 },
  },
  "Print": {
    "A4 Portrait": { width: 2480, height: 3508 },
    "A4 Landscape": { width: 3508, height: 2480 },
    "Business Card": { width: 1050, height: 600 },
    "Poster": { width: 3000, height: 4000 },
  },
};

function ImageResizerContent() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(0);
  const [resizeMode, setResizeMode] = useState<"percentage" | "pixels" | "preset">("percentage");
  const [percentage, setPercentage] = useState([100]);
  const [customWidth, setCustomWidth] = useState<number | "">("");
  const [customHeight, setCustomHeight] = useState<number | "">("");
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState("original");
  const [selectedPreset, setSelectedPreset] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  const maxFiles = 10;

  // Enhanced file size formatting
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileSelect = (selectedFiles: File[]) => {
    const newFiles: ProcessedFile[] = [];

    selectedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const processedFile: ProcessedFile = {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            originalFile: file,
            previewUrl: e.target?.result as string,
            originalWidth: img.width,
            originalHeight: img.height,
            originalSize: file.size,
            newWidth: Math.round(img.width * (percentage[0] / 100)),
            newHeight: Math.round(img.height * (percentage[0] / 100)),
            status: "pending",
          };
          newFiles.push(processedFile);

          if (newFiles.length === selectedFiles.length) {
            setFiles((prev) => [...prev, ...newFiles]);
              showToast(`${selectedFiles.length} image(s) added successfully! ✨`, "success");
              scrollToElement(settingsRef, 50)
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileUploadError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    showToast("File removed", "success");
  };

  const clearAllFiles = () => {
    files.forEach((file) => {
      if (file.resizedUrl) {
        URL.revokeObjectURL(file.resizedUrl);
      }
      URL.revokeObjectURL(file.previewUrl);
    });
    setFiles([]);
    showToast("All files cleared", "success");
  };

  const updateDimensions = (fileId: string, width: number, height: number) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? { ...file, newWidth: width, newHeight: height }
          : file
      )
    );
  };

  const handleWidthChange = (fileId: string, width: number) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    if (maintainAspectRatio) {
      const aspectRatio = file.originalWidth / file.originalHeight;
      const newHeight = Math.round(width / aspectRatio);
      updateDimensions(fileId, width, newHeight);
    } else {
      updateDimensions(fileId, width, file.newHeight);
    }
  };

  const handleHeightChange = (fileId: string, height: number) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;

    if (maintainAspectRatio) {
      const aspectRatio = file.originalWidth / file.originalHeight;
      const newWidth = Math.round(height * aspectRatio);
      updateDimensions(fileId, newWidth, height);
    } else {
      updateDimensions(fileId, file.newWidth, height);
    }
  };

  const applyPercentageToAll = () => {
    const newPercentage = percentage[0] / 100;
    setFiles((prev) =>
      prev.map((file) => ({
        ...file,
        newWidth: Math.round(file.originalWidth * newPercentage),
        newHeight: Math.round(file.originalHeight * newPercentage),
      }))
    );
    showToast(`Applied ${percentage[0]}% scaling to all images`, "success");
  };

  const applyPresetToAll = (presetKey: string) => {
    const [category, preset] = presetKey.split(" - ");
    const categoryPresets = PRESET_DIMENSIONS[category as keyof typeof PRESET_DIMENSIONS];
    const dimensions = categoryPresets?.[preset as keyof typeof categoryPresets] as { width: number; height: number } | undefined;
    
    if (dimensions) {
      setFiles((prev) =>
        prev.map((file) => {
          const aspectRatio = file.originalWidth / file.originalHeight;
          const presetAspectRatio = dimensions.width / dimensions.height;
          
          let newWidth, newHeight;
          if (aspectRatio > presetAspectRatio) {
            // Image is wider than preset
            newHeight = dimensions.height;
            newWidth = Math.round(dimensions.height * aspectRatio);
          } else {
            // Image is taller than preset
            newWidth = dimensions.width;
            newHeight = Math.round(dimensions.width / aspectRatio);
          }
          
          return { ...file, newWidth, newHeight };
        })
      );
      showToast(`Applied ${preset} preset to all images`, "success");
    }
  };

  const resizeImages = async () => {
    if (files.length === 0) {
      showToast("Please select images first", "error");
      return;
    }

    setIsProcessing(true);
    setCurrentFile(0);

    try {
      const updatedFiles = [...files];

      for (let i = 0; i < updatedFiles.length; i++) {
        const file = updatedFiles[i];
        setCurrentFile(i);

        try {
          file.status = "processing";
          setFiles([...updatedFiles]);

          // Create canvas for resizing
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Could not get canvas context");
          }

          // Load original image
          const img = new Image();
          await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = file.previewUrl;
          });

          // Set canvas dimensions
          canvas.width = file.newWidth;
          canvas.height = file.newHeight;

          // Enable image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw resized image
          ctx.drawImage(img, 0, 0, file.newWidth, file.newHeight);

          // Get output format
          const outputFormat =
            format === "original" ? file.originalFile.type : `image/${format}`;
          const outputQuality = quality / 100;

          // Convert to blob
          const resizedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  resolve(blob);
                } else {
                  reject(new Error("Could not create blob"));
                }
              },
              outputFormat,
              outputQuality
            );
          });

          const resizedUrl = URL.createObjectURL(resizedBlob);

          file.resizedBlob = resizedBlob;
          file.resizedUrl = resizedUrl;
          file.newSize = resizedBlob.size;
          file.status = "completed";
        } catch (error) {
          console.error("Error resizing image:", error);
          file.status = "error";
          file.error = `Failed to resize: ${
            error instanceof Error ? error.message : "Unknown error"
          }`;
        }

        setFiles([...updatedFiles]);
      }

      showToast("🎉 Images resized successfully!", "success");
    } catch (error) {
      console.error("Resize error:", error);
      showToast("Resize failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: ProcessedFile) => {
    if (!file.resizedUrl) return;

    const link = document.createElement("a");
    link.href = file.resizedUrl;

    // Create filename with dimensions
    const nameParts = file.name.split(".");
    const extension = nameParts.pop() || "jpg";
    const baseName = nameParts.join(".");
    const formatExt = format === "original" ? extension : format;

    link.download = `${baseName}_${file.newWidth}x${file.newHeight}.${formatExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(`${file.name} downloaded successfully! 📁`, "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(
      (file) => file.status === "completed" && file.resizedUrl
    );

    if (completedFiles.length === 0) {
      showToast("No resized images to download", "error");
      return;
    }

    completedFiles.forEach((file) => downloadFile(file));
  };

  const resetAll = () => {
    clearAllFiles();
    setResizeMode("percentage");
    setPercentage([100]);
    setCustomWidth("");
    setCustomHeight("");
    setMaintainAspectRatio(true);
    setQuality(90);
    setFormat("original");
    setSelectedPreset("");
    setShowAdvanced(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileImage className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedCount = files.filter((f) => f.status === "completed").length;
  const totalOriginalSize = files.reduce((sum, file) => sum + file.originalSize, 0);
  const totalNewSize = files.reduce((sum, file) => sum + (file.newSize || 0), 0);
  const compressionRatio = totalOriginalSize > 0 ? ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1) : "0";

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Enhanced Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
        <Badge
          variant="outline"
            className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900/20 border-green-200 dark:border-green-800"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>
          <Badge
            variant="outline"
            className="font-bold hidden md:flex text-blue-800 dark:text-blue-200 bg-blue-100 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
          >
            <Zap className="w-4 h-4 mr-2" />
            Instant Processing
          </Badge>
        </div>

        <h1 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text pb-2 text-transparent text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Image Resizer
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Resize images to any dimension with professional quality. Perfect for social media, websites, and print. 
        </p>
      </div>

      {/* Enhanced File Upload */}
      
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleFileUploadError}
        accept="image/*"
        multiple
        maxFiles={maxFiles}
            className="mb-4"
          />
          
          {files.length > 0 && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Upload Summary</span>
                <Button variant="ghost" size="sm" onClick={clearAllFiles}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Files:</span>
                  <span className="ml-2 font-medium">{files.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Total Size:</span>
                  <span className="ml-2 font-medium">{formatFileSize(totalOriginalSize)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="ml-2 font-medium text-green-600">{completedCount}</span>
                </div>
                {totalNewSize > 0 && (
                  <div>
                    <span className="text-muted-foreground">Compression:</span>
                    <span className="ml-2 font-medium text-blue-600">{compressionRatio}%</span>
                  </div>
                )}
              </div>
            </div>
          )}

      {/* Enhanced Resize Settings */}
      <Card className="mb-8" ref={settingsRef}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Resize Settings
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="ml-auto"
            >
              {showAdvanced ? "Hide" : "Show"} Advanced
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Resize Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                resizeMode === "percentage"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-border hover:border-blue-300"
              }`}
              onClick={() => setResizeMode("percentage")}
            >
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Percentage</span>
              </div>
              <p className="text-sm text-muted-foreground">Scale images by percentage</p>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                resizeMode === "pixels"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-border hover:border-blue-300"
              }`}
              onClick={() => setResizeMode("pixels")}
            >
              <div className="flex items-center gap-2 mb-2">
                <Square className="h-5 w-5 text-purple-600" />
                <span className="font-medium">Custom Dimensions</span>
              </div>
              <p className="text-sm text-muted-foreground">Set exact pixel dimensions</p>
            </div>

            <div
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                resizeMode === "preset"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/20"
                  : "border-border hover:border-blue-300"
              }`}
              onClick={() => setResizeMode("preset")}
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5 text-pink-600" />
                <span className="font-medium">Presets</span>
              </div>
              <p className="text-sm text-muted-foreground">Use common dimensions</p>
            </div>
              </div>

          {/* Mode-specific controls */}
              {resizeMode === "percentage" && (
            <div className="space-y-4">
                <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Scale: {percentage[0]}%</Label>
                  <Badge variant="secondary">{percentage[0]}%</Badge>
                </div>
                  <Slider
                    value={percentage}
                    onValueChange={setPercentage}
                    max={300}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage([50])}
                  >
                    50%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage([75])}
                  >
                    75%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage([100])}
                  >
                    100%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage([150])}
                  >
                    150%
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPercentage([200])}
                  >
                    200%
                  </Button>
                </div>
                <Button
                  variant="outline"
                    onClick={applyPercentageToAll}
                    className="w-full"
                  >
                  <ArrowRight className="h-4 w-4 mr-2" />
                    Apply to All Images
                  </Button>
              </div>
            </div>
          )}

          {resizeMode === "pixels" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Width (pixels)</Label>
                <Input
                  type="number"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseInt(e.target.value) || "")}
                  placeholder="Enter width"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Height (pixels)</Label>
                <Input
                  type="number"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(parseInt(e.target.value) || "")}
                  placeholder="Enter height"
                  className="w-full"
                />
              </div>
            </div>
          )}

          {resizeMode === "preset" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(PRESET_DIMENSIONS).map(([category, presets]) => (
                  <div key={category} className="space-y-2">
                    <Label className="text-sm font-medium text-muted-foreground">{category}</Label>
                    <div className="space-y-1">
                      {Object.entries(presets).map(([preset, dimensions]) => (
                        <Button
                          key={preset}
                          variant="outline"
                          size="sm"
                          onClick={() => applyPresetToAll(`${category} - ${preset}`)}
                          className="w-full justify-start text-xs"
                        >
                          {preset} ({dimensions.width}×{dimensions.height})
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
                </div>
              )}

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-4">
              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Format</SelectItem>
                      <SelectItem value="jpeg">JPEG (Best for photos)</SelectItem>
                      <SelectItem value="png">PNG (Best for graphics)</SelectItem>
                      <SelectItem value="webp">WebP (Best for web)</SelectItem>
                  </SelectContent>
                </Select>
            </div>

              <div className="space-y-2">
                  <div className="flex items-center justify-between">
                <Label>Quality: {quality}%</Label>
                    <Badge variant="secondary">{quality}%</Badge>
                  </div>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuality(60)}
                    >
                      Low
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuality(80)}
                    >
                      Medium
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuality(95)}
                    >
                      High
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
              <div className="flex items-center space-x-2">
                  <Switch
                  id="aspectRatio"
                  checked={maintainAspectRatio}
                    onCheckedChange={setMaintainAspectRatio}
                  />
                  <Label htmlFor="aspectRatio" className="text-sm">
                    Maintain aspect ratio
                  </Label>
                </div>
                
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Quality Tips</span>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• JPEG: Best for photographs (smaller files)</li>
                    <li>• PNG: Best for graphics with transparency</li>
                    <li>• WebP: Best for web (smaller, modern format)</li>
                    <li>• Higher quality = larger file size</li>
                  </ul>
              </div>
            </div>
          </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Image List */}
      {files.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Images to Resize
              <Badge variant="secondary" className="ml-2">
                {files.length} selected
              </Badge>
            </CardTitle>
            <CardDescription>
              {completedCount} of {files.length} images processed successfully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 relative">
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                      {file.status === "completed" && (
                        <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-1">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <span className="font-medium truncate">{file.name}</span>
                        {file.status === "completed" && file.newSize && (
                          <Badge variant="outline" className="text-xs">
                            {formatFileSize(file.newSize)}
                          </Badge>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Original:</span>
                          <div className="font-medium">
                            {file.originalWidth} × {file.originalHeight}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatFileSize(file.originalSize)}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">New:</span>
                          <div className="font-medium">
                            {file.newWidth} × {file.newHeight}
                          </div>
                          {file.newSize && (
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(file.newSize)}
                            </div>
                          )}
                        </div>
                        {file.newSize && (
                          <div>
                            <span className="text-muted-foreground">Compression:</span>
                            <div className="font-medium text-green-600">
                              {((file.originalSize - file.newSize) / file.originalSize * 100).toFixed(1)}%
                            </div>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <div className="font-medium capitalize">{file.status}</div>
                        </div>
                      </div>

                      {resizeMode === "pixels" && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`width-${file.id}`} className="text-xs">
                              Width
                            </Label>
                            <Input
                              id={`width-${file.id}`}
                              type="number"
                              value={file.newWidth}
                              onChange={(e) =>
                                handleWidthChange(
                                  file.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`height-${file.id}`} className="text-xs">
                              Height
                            </Label>
                            <Input
                              id={`height-${file.id}`}
                              type="number"
                              value={file.newHeight}
                              onChange={(e) =>
                                handleHeightChange(
                                  file.id,
                                  parseInt(e.target.value) || 0
                                )
                              }
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}

                      {file.error && (
                        <div className="p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded text-red-600 text-sm">
                          {file.error}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "completed" && file.resizedUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(file)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Enhanced Action Buttons */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={resizeImages}
              disabled={files.length === 0 || isProcessing}
              className="flex-1 h-12 text-lg"
              size="lg"
            >
              <Maximize2 className="h-5 w-5 mr-2" />
              {isProcessing
                ? "Resizing..."
                : `Resize Images${files.length > 1 ? ` (${files.length})` : ""}`}
            </Button>

            {completedCount > 0 && (
              <Button
                variant="outline"
                onClick={downloadAllFiles}
                disabled={isProcessing}
                className="flex-1 sm:flex-initial h-12"
                size="lg"
              >
                <FileDown className="h-5 w-5 mr-2" />
                Download All ({completedCount})
              </Button>
            )}

            <Button
              variant="outline"
              onClick={resetAll}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial h-12"
              size="lg"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Reset All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isProcessing}
        current={currentFile}
        total={files.length}
        title="Resizing Images"
        description="Processing your images with professional quality..."
        currentFile={files[currentFile]?.name}
      />

      {/* Enhanced Info Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            About Image Resizing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <div className="font-medium text-blue-900 dark:text-blue-100">Aspect Ratio</div>
              </div>
              <div className="text-blue-700 dark:text-blue-300">
                Maintain original proportions to prevent distortion
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/20 dark:to-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Gauge className="h-4 w-4 text-green-600" />
                <div className="font-medium text-green-900 dark:text-green-100">Quality Control</div>
              </div>
              <div className="text-green-700 dark:text-green-300">
                Adjust compression to balance file size and quality
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/20 dark:to-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-purple-600" />
                <div className="font-medium text-purple-900 dark:text-purple-100">Batch Processing</div>
              </div>
              <div className="text-purple-700 dark:text-purple-300">
                Resize multiple images with the same settings
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20 rounded-lg border border-pink-200 dark:border-pink-800">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="h-4 w-4 text-pink-600" />
                <div className="font-medium text-pink-900 dark:text-pink-100">Format Support</div>
              </div>
              <div className="text-pink-700 dark:text-pink-300">
                Convert between JPEG, PNG, WebP formats
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <ImageResizerSEOContent />
    </div>
  );
}

export default function ImageResizerPage() {
  return (
    <ToastProvider>
      <ImageResizerContent />
    </ToastProvider>
  );
}
