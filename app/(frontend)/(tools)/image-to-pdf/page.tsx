"use client";

import { useRef, useState, useEffect, useCallback } from "react";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FileText,
  ChevronUp,
  ChevronDown,
  Settings,
  ImageIcon,
  Plus,
} from "lucide-react";
import {
  formatFileSize,
  downloadFile,
  validateImageFile,
} from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import {
  convertImagesToPdf,
  PAGE_SIZE_OPTIONS,
  type MarginPreset,
  type Orientation,
  type PageSize,
} from "@/lib/utils/image-to-pdf-utils";
import { scrollToElement } from "@/lib/utils";

interface ImageItem {
  id: string;
  file: File;
  previewUrl: string;
}

const MAX_FILES = 50;
const ACCEPT =
  "image/jpeg,image/jpg,image/png,image/webp,image/bmp,image/gif,.jpg,.jpeg,.png,.webp,.bmp,.gif";

function ImageToPdfContent() {
  const { showToast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<PageSize>("a4");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [marginPreset, setMarginPreset] = useState<MarginPreset>("medium");
  const [customMarginMm, setCustomMarginMm] = useState("10");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0, file: "" });
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [uploadCollapsed, setUploadCollapsed] = useState(false);
  const afterUploadRef = useRef<HTMLDivElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  const revokePreviews = useCallback((items: ImageItem[]) => {
    items.forEach((item) => URL.revokeObjectURL(item.previewUrl));
  }, []);

  useEffect(() => {
    return () => revokePreviews(images);
  }, [images, revokePreviews]);

  const addFiles = (files: File[]) => {
    const valid: ImageItem[] = [];
    for (const file of files) {
      if (images.length + valid.length >= MAX_FILES) {
        showToast(`Maximum ${MAX_FILES} images allowed`, "error");
        break;
      }
      const check = validateImageFile(file);
      if (!check.valid) {
        showToast(check.error || `${file.name} is not supported`, "error");
        continue;
      }
      valid.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
    if (valid.length === 0) return;
    setImages((prev) => [...prev, ...valid]);
    setResultBlob(null);
    setUploadCollapsed(true);
    scrollToElement(afterUploadRef, 50);
    showToast(
      `${valid.length} image${valid.length === 1 ? "" : "s"} added`,
      "success"
    );
  };

  const handleFileSelect = (files: File[]) => addFiles(files);
  const handleUploadError = (error: string) => showToast(error, "error");

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
    setResultBlob(null);
  };

  const clearAll = () => {
    revokePreviews(images);
    setImages([]);
    setResultBlob(null);
    setUploadCollapsed(false);
    showToast("All images cleared", "info");
  };

  const moveImage = (id: string, direction: "up" | "down") => {
    setImages((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const next = direction === "up" ? idx - 1 : idx + 1;
      if (next < 0 || next >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[next]] = [copy[next], copy[idx]];
      return copy;
    });
    setResultBlob(null);
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      showToast("Please add at least one image", "error");
      return;
    }

    if (marginPreset === "custom") {
      const mm = parseFloat(customMarginMm);
      if (Number.isNaN(mm) || mm < 0) {
        showToast("Enter a valid custom margin in mm", "error");
        return;
      }
    }

    setIsConverting(true);
    setProgress({ current: 0, total: images.length, file: "" });
    setResultBlob(null);

    try {
      const blob = await convertImagesToPdf(
        images.map((i) => i.file),
        {
          pageSize,
          orientation,
          marginPreset,
          customMarginMm:
            marginPreset === "custom" ? parseFloat(customMarginMm) : undefined,
        },
        (current, total, fileName) => {
          setProgress({ current, total, file: fileName });
        }
      );
      setResultBlob(blob);
      showToast("PDF created successfully", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Conversion failed",
        "error"
      );
    } finally {
      setIsConverting(false);
    }
  };

  const downloadPdf = () => {
    if (!resultBlob) return;
    const name =
      images.length === 1
        ? images[0].file.name.replace(/\.[^.]+$/, "") + ".pdf"
        : "images.pdf";
    downloadFile(resultBlob, name);
    showToast("PDF downloaded", "success");
  };

  const progressPercent =
    progress.total > 0
      ? Math.round((progress.current / progress.total) * 100)
      : 0;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Image to PDF Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn JPG, PNG, WebP, and other images into one polished PDF. Set page
          size, orientation, and margins - then download in seconds.
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleUploadError}
        accept={ACCEPT}
        multiple
        maxFiles={MAX_FILES}
        className="mb-6 sm:mb-8"
        collapsed={uploadCollapsed && images.length > 0}
        onToggleCollapse={() => setUploadCollapsed((c) => !c)}
        autoCollapse
      />

      {images.length > 0 && (
        <div
          ref={afterUploadRef}
          className="animate-in fade-in slide-in-from-top-4 duration-500 space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <Card className="lg:col-span-4">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Images ({images.length})
                    </CardTitle>
                    <CardDescription>
                      Pages appear in this order. Use arrows to reorder.
                    </CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <input
                      ref={addMoreInputRef}
                      type="file"
                      accept={ACCEPT}
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files?.length) {
                          addFiles(Array.from(e.target.files));
                          e.target.value = "";
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      disabled={isConverting || images.length >= MAX_FILES}
                      onClick={() => addMoreInputRef.current?.click()}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add more images
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAll}
                      disabled={isConverting}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear all
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="max-h-[28rem] overflow-y-auto">
                <div className="space-y-3">
                  {images.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden border bg-background">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.previewUrl}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate text-sm sm:text-base">
                          {item.file.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {formatFileSize(item.file.size)}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveImage(item.id, "up")}
                          disabled={index === 0 || isConverting}
                          title="Move up one row"
                          aria-label={`Move ${item.file.name} up`}
                        >
                          <ChevronUp className="h-4 w-4" aria-hidden />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveImage(item.id, "down")}
                          disabled={
                            index === images.length - 1 || isConverting
                          }
                          title="Move down one row"
                          aria-label={`Move ${item.file.name} down`}
                        >
                          <ChevronDown className="h-4 w-4" aria-hidden />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeImage(item.id)}
                          disabled={isConverting}
                          title="Remove"
                          aria-label={`Remove ${item.file.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  PDF settings
                </CardTitle>
                <CardDescription>Page layout for your document</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Page size</Label>
                  <Select
                    value={pageSize}
                    onValueChange={(v) => setPageSize(v as PageSize)}
                    disabled={isConverting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PAGE_SIZE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Orientation</Label>
                  <Select
                    value={orientation}
                    onValueChange={(v) => setOrientation(v as Orientation)}
                    disabled={isConverting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Margin</Label>
                  <Select
                    value={marginPreset}
                    onValueChange={(v) => setMarginPreset(v as MarginPreset)}
                    disabled={isConverting}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="small">Small (10 mm)</SelectItem>
                      <SelectItem value="medium">Medium (20 mm)</SelectItem>
                      <SelectItem value="large">Large (30 mm)</SelectItem>
                      <SelectItem value="custom">Custom (mm)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {marginPreset === "custom" && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-margin">Custom margin (mm)</Label>
                    <Input
                      id="custom-margin"
                      type="number"
                      min={0}
                      step={0.5}
                      value={customMarginMm}
                      onChange={(e) => setCustomMarginMm(e.target.value)}
                      disabled={isConverting}
                      placeholder="e.g. 15"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={convertToPdf}
                  disabled={isConverting}
                  size="lg"
                  className="flex-1"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  {isConverting
                    ? "Converting…"
                    : `Convert ${images.length} image${images.length === 1 ? "" : "s"} to PDF`}
                </Button>
                
              </div>
            </CardContent>
          </Card>

          {resultBlob && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Your PDF is ready
                </CardTitle>
                <CardDescription>
                  {images.length} page{images.length === 1 ? "" : "s"} •{" "}
                  {formatFileSize(resultBlob.size)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadPdf} size="lg">
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <ProgressModal
        isOpen={isConverting}
        title="Creating PDF"
        current={progressPercent}
        total={100}
        currentFile={progress.file}
        description="Processing images in your browser…"
      />
    </div>
  );
}

export default function ImageToPdfPage() {
  return (
    <ToolPageWrapper toolSlug="image-to-pdf">
      <ToastProvider>
        <ImageToPdfContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
