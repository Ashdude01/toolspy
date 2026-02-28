"use client";

import { useState, useRef } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Download,
  Copy,
  Camera,
  Globe,
  Settings,
  Loader2,
  CheckCircle2,
  X,
  Zap,
  Shield,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  formatFileSize,
  downloadFile,
  copyImageToClipboard,
  createZipFromFiles,
  downloadZip,
} from "@/lib/utils/file-utils";
import { scrollToElement } from "@/lib/utils";
type ScreenshotFormat = "png" | "jpeg" | "webp";
type DevicePreset = "desktop" | "tablet" | "mobile" | "custom";

interface ScreenshotResult {
  url: string;
  file: File;
  websiteUrl: string;
  format: ScreenshotFormat;
  dimensions: { width: number; height: number };
  timestamp: number;
}

interface ScreenshotSettings {
  format: ScreenshotFormat;
  devicePreset: DevicePreset;
  customWidth: number;
  customHeight: number;
  fullPage: boolean;
  quality: number;
}

function WebsiteScreenshotContent() {
  const { showToast } = useToast();
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [screenshotResults, setScreenshotResults] = useState<ScreenshotResult[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [settings, setSettings] = useState<ScreenshotSettings>({
    format: "png",
    devicePreset: "desktop",
    customWidth: 1920,
    customHeight: 1080,
    fullPage: true,
    quality: 90,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Get device preset dimensions
  const getDeviceDimensions = (preset: DevicePreset): { width: number; height: number } => {
    switch (preset) {
      case "desktop":
        return { width: 1920, height: 1080 };
      case "tablet":
        return { width: 768, height: 1024 };
      case "mobile":
        return { width: 375, height: 667 };
      case "custom":
        return { width: settings.customWidth, height: settings.customHeight };
      default:
        return { width: 1920, height: 1080 };
    }
  };

  // Validate URL
  const validateUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    try {
      const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  // Normalize URL
  const normalizeUrl = (url: string): string => {
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  // Capture screenshot using internal API with capture-website package
  const captureScreenshot = async (url: string): Promise<File | null> => {
    const normalizedUrl = normalizeUrl(url);
    const dimensions = getDeviceDimensions(settings.devicePreset);
    
    try {
      // Call our internal API route that uses capture-website package
      console.log('Calling screenshot API with:', {
        url: normalizedUrl,
        width: dimensions.width,
        height: dimensions.height,
        format: settings.format,
        fullPage: settings.fullPage,
        quality: settings.quality
      });
      
      const response = await fetch("/api/screenshot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: normalizedUrl,
          width: dimensions.width,
          height: dimensions.height,
          format: settings.format,
          fullPage: settings.fullPage,
          quality: settings.quality,
        }),
      });

      if (!response.ok) {
        let errorData: any = {};
        try {
          errorData = await response.json();
        } catch (e) {
          // If response is not JSON, get text
          const text = await response.text().catch(() => '');
          errorData = { error: text || `HTTP ${response.status}: ${response.statusText}` };
        }
        const errorMessage = errorData.error || errorData.details || `Screenshot API error: ${response.statusText}`;
        console.error("API Error Response:", errorData);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API Response:", { success: data.success, hasImage: !!data.image, format: data.format });
      
      if (!data.success || !data.image) {
        const errorMsg = data.error || data.details || "Failed to capture screenshot";
        console.error("API returned unsuccessful response:", data);
        throw new Error(errorMsg);
      }

      // Convert base64 image to File
      const base64Data = data.image.split(",")[1]; // Remove data:image/...;base64, prefix
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: `image/${settings.format}` });
      
      const filename = `screenshot-${new URL(normalizedUrl).hostname.replace(/\./g, "-")}-${Date.now()}.${settings.format}`;
      const file = new File([blob], filename, { type: blob.type });

      return file;
    } catch (error) {
      console.error("Screenshot capture error:", error);
      // Provide more detailed error information
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw error;
    }
  };

  // Handle screenshot capture
  const handleCapture = async () => {
    if (!websiteUrl.trim()) {
      showToast("Please enter a website URL", "error");
      return;
    }

    if (!validateUrl(websiteUrl)) {
      showToast("Please enter a valid website URL", "error");
      return;
    }

    setIsCapturing(true);
    try {
      const file = await captureScreenshot(websiteUrl);
      
      if (!file) {
        throw new Error("Failed to capture screenshot");
      }

      const dimensions = getDeviceDimensions(settings.devicePreset);
      const result: ScreenshotResult = {
        url: URL.createObjectURL(file),
        file,
        websiteUrl: normalizeUrl(websiteUrl),
        format: settings.format,
        dimensions,
        timestamp: Date.now(),
      };

      setScreenshotResults((prev) => [...prev, result]);
      showToast("Screenshot captured successfully!", "success");
      scrollToElement(resultsRef);
    } catch (error) {
      let errorMessage = "Failed to capture screenshot. Please try again.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        // Provide more user-friendly messages for common errors
        if (error.message.includes("timeout")) {
          errorMessage = "The website took too long to load. Please try a different URL or try again later.";
        } else if (error.message.includes("net::ERR") || error.message.includes("Failed to access")) {
          errorMessage = "Unable to access the website. Please check if the URL is correct and accessible.";
        } else if (error.message.includes("not available") || error.message.includes("not installed")) {
          errorMessage = "Screenshot service is temporarily unavailable. Please try again later.";
        }
      }
      
      showToast(errorMessage, "error");
      console.error("Screenshot error:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  // Download single screenshot
  const downloadSingle = (result: ScreenshotResult) => {
    downloadFile(result.file, result.file.name);
    showToast("Screenshot downloaded", "success");
  };

  // Download all screenshots
  const downloadAll = () => {
    screenshotResults.forEach((result) => {
      downloadFile(result.file, result.file.name);
    });
    showToast(`Downloaded ${screenshotResults.length} screenshot(s)`, "success");
  };

  // Download all as ZIP
  const downloadAllAsZip = async () => {
    try {
      if (screenshotResults.length === 0) {
        showToast("No screenshots available for download", "error");
        return;
      }

      const files = screenshotResults.map((result) => result.file);
      const zipBlob = await createZipFromFiles(files, "website-screenshots.zip");
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadZip(zipBlob, `${watermark}-website-screenshots.zip`);
      showToast("ZIP file downloaded successfully", "success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create ZIP file";
      showToast(`ZIP Error: ${errorMessage}`, "error");
    }
  };

  // Copy screenshot to clipboard
  const copySingle = async (result: ScreenshotResult) => {
    try {
      await copyImageToClipboard(result.file);
      showToast("Screenshot copied to clipboard", "success");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to copy screenshot";
      showToast(errorMessage, "error");
    }
  };

  // Remove screenshot
  const removeScreenshot = (index: number) => {
    setScreenshotResults((prev) => {
      const newResults = prev.filter((_, i) => i !== index);
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(prev[index].url);
      return newResults;
    });
    showToast("Screenshot removed", "info");
  };

  // Clear all screenshots
  const clearAll = () => {
    screenshotResults.forEach((result) => {
      URL.revokeObjectURL(result.url);
    });
    setScreenshotResults([]);
    showToast("All screenshots cleared", "info");
  };

  const devicePresets = [
    {
      key: "desktop" as DevicePreset,
      icon: <Monitor className="h-5 w-5" />,
      title: "Desktop",
      description: "1920 × 1080",
    },
    {
      key: "tablet" as DevicePreset,
      icon: <Tablet className="h-5 w-5" />,
      title: "Tablet",
      description: "768 × 1024",
    },
    {
      key: "mobile" as DevicePreset,
      icon: <Smartphone className="h-5 w-5" />,
      title: "Mobile",
      description: "375 × 667",
    },
    {
      key: "custom" as DevicePreset,
      icon: <Settings className="h-5 w-5" />,
      title: "Custom",
      description: "Custom size",
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
        <h2 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-700 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Professional Website Screenshot Tool
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Capture high-quality screenshots of any website in different formats and sizes. 
          Full-page capture, multiple device presets, and instant downloads.
        </p>
      </div>

      {/* URL Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>Enter Website URL</CardTitle>
          <CardDescription>
            Enter the URL of the website you want to capture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="https://example.com or example.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isCapturing) {
                    handleCapture();
                  }
                }}
                className="text-base"
              />
            </div>
            <Button
              onClick={handleCapture}
              disabled={isCapturing || !websiteUrl.trim()}
              size="lg"
              className="w-full sm:w-auto"
            >
              {isCapturing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Capturing...
                </>
              ) : (
                <>
                  <Camera className="h-4 w-4 mr-2" />
                  Capture Screenshot
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Screenshot Settings</CardTitle>
              <CardDescription>
                Configure screenshot format, dimensions, and quality
              </CardDescription>
            </div>
            <Button
              variant="secondary"
              onClick={() => setShowAdvanced(!showAdvanced)}
              size="sm"
            >
              <Settings className="h-4 w-4 mr-2" />
              {showAdvanced ? "Hide" : "Advanced"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Device Presets */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Device Preset</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {devicePresets.map((preset) => (
                <Card
                  key={preset.key}
                  className={`cursor-pointer transition-all duration-200 ${
                    settings.devicePreset === preset.key
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSettings({ ...settings, devicePreset: preset.key })}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex justify-center mb-2 text-primary">
                      {preset.icon}
                    </div>
                    <div className="font-semibold text-sm">{preset.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {preset.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Format Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Image Format</Label>
              <Select
                value={settings.format}
                onValueChange={(value: ScreenshotFormat) =>
                  setSettings({ ...settings, format: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="png">PNG (High Quality)</SelectItem>
                  <SelectItem value="jpeg">JPEG (Smaller Size)</SelectItem>
                  <SelectItem value="webp">WebP (Modern)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Full Page Capture</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  checked={settings.fullPage}
                  onCheckedChange={(checked) =>
                    setSettings({ ...settings, fullPage: checked })
                  }
                />
                <Label className="text-sm">
                  {settings.fullPage ? "Enabled" : "Viewport Only"}
                </Label>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t">
              {settings.devicePreset === "custom" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Custom Width (px)</Label>
                    <Input
                      type="number"
                      min="100"
                      max="4000"
                      value={settings.customWidth}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          customWidth: parseInt(e.target.value) || 1920,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Custom Height (px)</Label>
                    <Input
                      type="number"
                      min="100"
                      max="4000"
                      value={settings.customHeight}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          customHeight: parseInt(e.target.value) || 1080,
                        })
                      }
                    />
                  </div>
                </div>
              )}

              {settings.format === "jpeg" && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Quality: {settings.quality}%
                  </Label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={settings.quality}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        quality: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Screenshot Results */}
      {screenshotResults.length > 0 && (
        <Card ref={resultsRef} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Screenshot Results</CardTitle>
                <CardDescription>
                  {screenshotResults.length} screenshot(s) captured successfully on{" "}
                  <span className="font-semibold text-primary">Toolspy</span>
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
                    Download ZIP ({screenshotResults.length})
                  </span>
                  <span className="sm:hidden">ZIP</span>
                </Button>
                <Button onClick={clearAll} variant="outline" size="sm">
                  <X className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {screenshotResults.map((result, index) => (
                <div key={index} className="border rounded-lg p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    {/* Screenshot Preview */}
                    <div className="flex-shrink-0 self-center sm:self-start">
                      <img
                        src={result.url}
                        alt={`Screenshot of ${result.websiteUrl}`}
                        className="w-full sm:w-48 sm:h-auto max-h-64 object-contain rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => window.open(result.url, "_blank")}
                      />
                    </div>

                    {/* Screenshot Info */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <h4 className="font-medium truncate text-sm sm:text-base">
                        {result.websiteUrl}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-xs sm:text-sm text-muted-foreground mt-1 space-y-1 sm:space-y-0">
                        <span>
                          {result.dimensions.width} × {result.dimensions.height}
                        </span>
                        <span>{formatFileSize(result.file.size)}</span>
                        <Badge variant="secondary" className="text-xs w-fit mx-auto sm:mx-0">
                          {result.format.toUpperCase()}
                        </Badge>
                        {result.file.name.includes("full") && (
                          <Badge variant="outline" className="text-xs w-fit mx-auto sm:mx-0">
                            <Maximize2 className="h-3 w-3 mr-1" />
                            Full Page
                          </Badge>
                        )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeScreenshot(index)}
                        title="Remove screenshot"
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
</div>
  );
}

export default function WebsiteScreenshotPage() {
  return (
    <ToastProvider>
      <WebsiteScreenshotContent />
    </ToastProvider>
  );
}
