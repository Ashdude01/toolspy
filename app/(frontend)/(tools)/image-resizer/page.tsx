"use client";

import { useState, useRef, type ReactNode } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  Download,
  RefreshCw,
  Shield,
  FileImage,
  Maximize2,
  Square,
  X,
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
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { scrollToElement } from "@/lib/utils";
import { useToolImageHandoffImport } from "@/hooks/use-tool-image-handoff";
import { useT } from "@/lib/i18n/use-t";

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

function StepCircle({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
      {children}
    </span>
  );
}

function ImageResizerContent() {
  const t = useT();
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
              showToast(t("tools.imageResizer.imagesAdded", { count: selectedFiles.length }), "success");
              scrollToElement(settingsRef, 50)
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  useToolImageHandoffImport((selectedFiles) => {
    handleFileSelect(selectedFiles);
    showToast(t("tools.imageResizer.handoffLoaded"), "success");
  });

  const handleFileUploadError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
    showToast(t("tools.imageResizer.fileRemoved"), "success");
  };

  const clearAllFiles = () => {
    files.forEach((file) => {
      if (file.resizedUrl) {
        URL.revokeObjectURL(file.resizedUrl);
      }
      URL.revokeObjectURL(file.previewUrl);
    });
    setFiles([]);
    showToast(t("tools.imageResizer.allFilesCleared"), "success");
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
    showToast(t("tools.imageResizer.appliedPercent", { percent: percentage[0] }), "success");
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
      showToast(t("tools.imageResizer.appliedPreset", { preset }), "success");
    }
  };

  const resizeImages = async () => {
    if (files.length === 0) {
      showToast(t("tools.imageResizer.selectImagesFirst"), "error");
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

      showToast(t("tools.imageResizer.resizeSuccess"), "success");
    } catch (error) {
      console.error("Resize error:", error);
      showToast(t("tools.imageResizer.resizeFailed"), "error");
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

    showToast(t("toolCommon.successSaved"), "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(
      (file) => file.status === "completed" && file.resizedUrl
    );

    if (completedFiles.length === 0) {
      showToast(t("tools.imageResizer.noResizedToDownload"), "error");
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
  };

  /** Fit each image inside the W×H box without stretching (industry-standard "max size" behavior). */
  const applyCustomPixelsToAll = () => {
    const w = typeof customWidth === "number" ? customWidth : 0;
    const h = typeof customHeight === "number" ? customHeight : 0;
    if (w < 1 || h < 1) {
      showToast(t("tools.imageResizer.enterMaxDimensions"), "error");
      return;
    }
    setFiles((prev) =>
      prev.map((file) => {
        if (!maintainAspectRatio) {
          return { ...file, newWidth: w, newHeight: h };
        }
        const ar = file.originalWidth / file.originalHeight;
        const boxAr = w / h;
        if (ar > boxAr) {
          const newW = w;
          const newH = Math.round(w / ar);
          return { ...file, newWidth: newW, newHeight: newH };
        }
        const newH = h;
        const newW = Math.round(h * ar);
        return { ...file, newWidth: newW, newHeight: newH };
      })
    );
    showToast(t("tools.imageResizer.fittedWithin", { width: w, height: h }), "success");
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
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">
      <header className="space-y-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            variant="outline"
            className="border-emerald-200 bg-emerald-50 font-medium text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-100"
          >
            <Shield className="mr-1.5 h-3.5 w-3.5" />
            {t("tools.imageResizer.privacyBadge")}
          </Badge>
          <Badge
            variant="outline"
            className="hidden font-medium sm:inline-flex border-sky-200 bg-sky-50 text-sky-900 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-100"
          >
            <Zap className="mr-1.5 h-3.5 w-3.5" />
            {t("tools.imageResizer.batchBadge", { max: maxFiles })}
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("tools.imageResizer.title")}
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("tools.imageResizer.subtitle")}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left: workflow */}
        <div ref={settingsRef} className="space-y-6">
          <Card>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex gap-3">
                <StepCircle>1</StepCircle>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("tools.imageResizer.stepUpload")}
                  </p>
                  <CardTitle className="text-xl">{t("tools.imageResizer.addImagesTitle")}</CardTitle>
                  <CardDescription>
                    {t("tools.imageResizer.addImagesDescription")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFileSelect={handleFileSelect}
                onError={handleFileUploadError}
                accept="image/*"
                multiple
                maxFiles={maxFiles}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex gap-3">
                <StepCircle>2</StepCircle>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("tools.imageResizer.stepResize")}
                  </p>
                  <CardTitle className="text-xl">{t("tools.imageResizer.howToResizeTitle")}</CardTitle>
                  <CardDescription>
                    {t("tools.imageResizer.howToResizeDescription")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={resizeMode}
                onValueChange={(v) =>
                  setResizeMode(v as "percentage" | "pixels" | "preset")
                }
              >
                <TabsList className="grid h-auto w-full grid-cols-3 gap-1 p-1">
                  <TabsTrigger
                    value="percentage"
                    className="gap-1.5 py-2.5 text-xs sm:text-sm"
                  >
                    <Target className="h-3.5 w-3.5 opacity-70" />
                    {t("tools.imageResizer.tabByPercent")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="pixels"
                    className="gap-1.5 py-2.5 text-xs sm:text-sm"
                  >
                    <Square className="h-3.5 w-3.5 opacity-70" />
                    {t("tools.imageResizer.tabPixels")}
                  </TabsTrigger>
                  <TabsTrigger
                    value="preset"
                    className="gap-1.5 py-2.5 text-xs sm:text-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5 opacity-70" />
                    {t("tools.imageResizer.tabPresets")}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="percentage" className="mt-6 space-y-4 outline-none">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <Label className="text-base">{t("tools.imageResizer.scaleLabel")}</Label>
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
                    <div className="flex flex-wrap gap-2">
                      {[50, 75, 100, 150, 200].map((p) => (
                        <Button
                          key={p}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setPercentage([p])}
                        >
                          {p}%
                        </Button>
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      className="w-full"
                      onClick={applyPercentageToAll}
                      disabled={files.length === 0}
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      {t("tools.imageResizer.applyPercentToAll", { percent: percentage[0] })}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="pixels" className="mt-6 space-y-4 outline-none">
                  <p className="text-sm text-muted-foreground">
                    {t("tools.imageResizer.pixelsHint")}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="max-w">{t("tools.imageResizer.maxWidthLabel")}</Label>
                      <Input
                        id="max-w"
                        type="number"
                        min={1}
                        value={customWidth}
                        onChange={(e) =>
                          setCustomWidth(
                            e.target.value ? parseInt(e.target.value, 10) : ""
                          )
                        }
                        placeholder={t("tools.imageResizer.maxWidthPlaceholder")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-h">{t("tools.imageResizer.maxHeightLabel")}</Label>
                      <Input
                        id="max-h"
                        type="number"
                        min={1}
                        value={customHeight}
                        onChange={(e) =>
                          setCustomHeight(
                            e.target.value ? parseInt(e.target.value, 10) : ""
                          )
                        }
                        placeholder={t("tools.imageResizer.maxHeightPlaceholder")}
                      />
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    onClick={applyCustomPixelsToAll}
                    disabled={files.length === 0}
                  >
                    {t("tools.imageResizer.applyBoxToAll")}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    {t("tools.imageResizer.perFileHint")}
                  </p>
                </TabsContent>

                <TabsContent
                  value="preset"
                  className="mt-6 max-h-[min(360px,50vh)] space-y-4 overflow-y-auto pr-1 outline-none"
                >
                  <p className="text-sm text-muted-foreground">
                    {t("tools.imageResizer.presetsHint")}
                  </p>
                  <div className="space-y-6">
                    {Object.entries(PRESET_DIMENSIONS).map(([category, presets]) => (
                      <div key={category} className="space-y-2">
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {category}
                        </p>
                        <div className="grid gap-2">
                          {Object.entries(presets).map(([preset, dimensions]) => (
                            <Button
                              key={preset}
                              type="button"
                              variant="outline"
                              size="sm"
                              className="h-auto justify-start whitespace-normal py-2 text-left text-xs"
                              onClick={() =>
                                applyPresetToAll(`${category} - ${preset}`)
                              }
                              disabled={files.length === 0}
                            >
                              <span className="font-medium">{preset}</span>
                              <span className="ml-2 text-muted-foreground">
                                {dimensions.width}×{dimensions.height}px
                              </span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-3 pb-4">
              <div className="flex gap-3">
                <StepCircle>3</StepCircle>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("tools.imageResizer.stepOutput")}
                  </p>
                  <CardTitle className="text-xl">{t("tools.imageResizer.formatQualityTitle")}</CardTitle>
                  <CardDescription>
                    {t("tools.imageResizer.formatQualityDescription")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t("tools.imageResizer.outputFormatLabel")}</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">{t("tools.imageResizer.formatKeepOriginal")}</SelectItem>
                    <SelectItem value="jpeg">{t("tools.imageResizer.formatJpeg")}</SelectItem>
                    <SelectItem value="png">{t("tools.imageResizer.formatPng")}</SelectItem>
                    <SelectItem value="webp">{t("tools.imageResizer.formatWebp")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Label>{t("toolCommon.quality")}</Label>
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
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuality(60)}
                  >
                    60%
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuality(80)}
                  >
                    80%
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setQuality(95)}
                  >
                    95%
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="flex gap-3 rounded-lg border bg-muted/30 p-4">
                <Switch
                  id="aspectRatio"
                  checked={maintainAspectRatio}
                  onCheckedChange={setMaintainAspectRatio}
                  className="mt-0.5"
                />
                <div className="space-y-1">
                  <Label htmlFor="aspectRatio" className="text-base">
                    {t("tools.imageResizer.lockAspectRatio")}
                  </Label>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("tools.imageResizer.lockAspectRatioHint")}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 rounded-md bg-muted/50 p-3 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-600" />
                <span>
                  {t("tools.imageResizer.formatTip")}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/25 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t("tools.imageResizer.resizeDownloadTitle")}</CardTitle>
              <CardDescription>
                {t("tools.imageResizer.resizeDownloadDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                type="button"
                onClick={resizeImages}
                disabled={files.length === 0 || isProcessing}
                className="h-12 w-full text-base"
                size="lg"
              >
                <Maximize2 className="mr-2 h-5 w-5" />
                {isProcessing
                  ? t("tools.imageResizer.resizing")
                  : files.length > 1
                    ? t("tools.imageResizer.resizeImagesCount", { count: files.length })
                    : t("tools.imageResizer.resizeImages")}
              </Button>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={downloadAllFiles}
                  disabled={isProcessing || completedCount === 0}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  {t("tools.imageResizer.downloadAll", { count: completedCount })}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetAll}
                  disabled={isProcessing}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  {t("tools.imageResizer.resetAll")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: queue */}
        <div className="space-y-6 lg:sticky lg:top-6">
          <Card className="flex min-h-[280px] flex-col">
            <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0 pb-4">
              <div className="flex gap-3">
                <StepCircle>4</StepCircle>
                <div className="min-w-0 space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("tools.imageResizer.stepQueue")}
                  </p>
                  <CardTitle className="text-xl">{t("tools.imageResizer.queueTitle")}</CardTitle>
                  <CardDescription>
                    {files.length === 0
                      ? t("tools.imageResizer.queueEmpty")
                      : `${files.length} · ${formatFileSize(totalOriginalSize)}`}
                  </CardDescription>
                </div>
              </div>
              {files.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearAllFiles}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t("toolCommon.clearAll")}
                </Button>
              )}
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              {files.length === 0 ? (
                <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed p-8 text-center">
                  <FileImage className="h-12 w-12 text-muted-foreground/40" />
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">{t("tools.imageResizer.noImagesInQueue")}</p>
                    <p className="max-w-xs text-sm text-muted-foreground">
                      {t("tools.imageResizer.queueEmptyHint")}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Files</p>
                      <p className="font-semibold">{files.length}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Resized</p>
                      <p className="font-semibold text-green-600">{completedCount}</p>
                    </div>
                    <div className="rounded-lg border bg-muted/30 px-3 py-2">
                      <p className="text-xs text-muted-foreground">Original total</p>
                      <p className="font-semibold">{formatFileSize(totalOriginalSize)}</p>
                    </div>
                    {totalNewSize > 0 && (
                      <div className="rounded-lg border bg-muted/30 px-3 py-2">
                        <p className="text-xs text-muted-foreground">Size change</p>
                        <p className="font-semibold text-sky-600">{compressionRatio}%</p>
                      </div>
                    )}
                  </div>
                  <Separator />
                  <div className="flex max-h-[min(70vh,720px)] flex-col gap-3 overflow-y-auto pr-1">
                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="rounded-lg border bg-card p-3 transition-colors hover:bg-muted/30"
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border bg-muted">
                            <img
                              src={file.previewUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                            {file.status === "completed" && (
                              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                                <CheckCircle className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              {getStatusIcon(file.status)}
                              <span className="truncate font-medium text-sm">
                                {file.name}
                              </span>
                              {file.status === "completed" && file.newSize && (
                                <Badge variant="outline" className="text-xs">
                                  {formatFileSize(file.newSize)}
                                </Badge>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
                              <div>
                                <span className="text-muted-foreground">Original</span>
                                <div className="font-medium">
                                  {file.originalWidth}×{file.originalHeight}
                                </div>
                                <div className="text-muted-foreground">
                                  {formatFileSize(file.originalSize)}
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">New size</span>
                                <div className="font-medium">
                                  {file.newWidth}×{file.newHeight}
                                </div>
                                {file.newSize ? (
                                  <div className="text-muted-foreground">
                                    {formatFileSize(file.newSize)}
                                  </div>
                                ) : null}
                              </div>
                              {file.newSize ? (
                                <div>
                                  <span className="text-muted-foreground">Saved</span>
                                  <div className="font-medium text-green-600">
                                    {(
                                      ((file.originalSize - file.newSize) /
                                        file.originalSize) *
                                      100
                                    ).toFixed(0)}
                                    %
                                  </div>
                                </div>
                              ) : (
                                <div />
                              )}
                              <div>
                                <span className="text-muted-foreground">Status</span>
                                <div className="capitalize">{file.status}</div>
                              </div>
                            </div>
                            {resizeMode === "pixels" && (
                              <div className="grid grid-cols-2 gap-2 pt-1">
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
                                        parseInt(e.target.value, 10) || 0
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
                                        parseInt(e.target.value, 10) || 0
                                      )
                                    }
                                    className="h-8"
                                  />
                                </div>
                              </div>
                            )}
                            {file.error && (
                              <div className="rounded border border-red-200 bg-red-50 p-2 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/20 dark:text-red-300">
                                {file.error}
                              </div>
                            )}
                          </div>
                          <div className="flex shrink-0 gap-2 sm:flex-col">
                            {file.status === "completed" && file.resizedUrl && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => downloadFile(file)}
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(file.id)}
                              title="Remove"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Info className="h-4 w-4" />
            How this works
          </CardTitle>
          <CardDescription>
            Same ideas as popular online resizers: control dimensions first, then export quality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Target className="h-4 w-4 text-blue-600" />
                Aspect ratio
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Keeping aspect ratio avoids stretched people and objects. Turn it off only for special layouts.
              </p>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Gauge className="h-4 w-4 text-green-600" />
                Quality vs size
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lower quality or smaller dimensions reduce file size. Match your use: web, email, or print.
              </p>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Zap className="h-4 w-4 text-purple-600" />
                Batch
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                One set of settings applies to every file. Adjust individuals in the queue when needed.
              </p>
            </div>
            <div className="space-y-4 rounded-lg border p-4">
              <div className="flex items-center gap-2 font-medium">
                <Palette className="h-4 w-4 text-pink-600" />
                Formats
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You can keep the original type or switch to JPEG, PNG, or WebP before download.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ProgressModal
        isOpen={isProcessing}
        current={currentFile}
        total={files.length}
        title={t("tools.imageResizer.progressTitle")}
        description={t("tools.imageResizer.progressDescription")}
        currentFile={files[currentFile]?.name}
      />
    </div>
  );
}

export default function ImageResizerPage() {
  return (
    <ToolPageWrapper toolSlug="image-resizer"><ToastProvider>
      <ImageResizerContent /></ToastProvider></ToolPageWrapper>
  );
}
