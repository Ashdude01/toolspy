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
  Smartphone,
  Monitor,
  Laptop,
  Tablet,
  Palette,
  Image as ImageIcon,
  FileText,
  Archive,
} from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { createIconZip, downloadIconZip, IconFile } from "@/lib/utils/icon-zip-utils";

// Import SEO Content Component
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

// PWA icon configurations
const PWA_ICON_SIZES = [
  { name: "16x16", size: 16, folder: "16x16" },
  { name: "32x32", size: 32, folder: "32x32" },
  { name: "48x48", size: 48, folder: "48x48" },
  { name: "64x64", size: 64, folder: "64x64" },
  { name: "72x72", size: 72, folder: "72x72" },
  { name: "96x96", size: 96, folder: "96x96" },
  { name: "128x128", size: 128, folder: "128x128" },
  { name: "144x144", size: 144, folder: "144x144" },
  { name: "152x152", size: 152, folder: "152x152" },
  { name: "192x192", size: 192, folder: "192x192" },
  { name: "256x256", size: 256, folder: "256x256" },
  { name: "384x384", size: 384, folder: "384x384" },
  { name: "512x512", size: 512, folder: "512x512" },
];

function PWAIconGeneratorContent() {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [appShortName, setAppShortName] = useState("");
  const [themeColor, setThemeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [padding, setPadding] = useState([10]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<File[]>([]);
  const [generationProgress, setGenerationProgress] = useState({
    current: 0,
    total: 0,
    size: "",
  });

  // Additional manifest fields
  const [startUrl, setStartUrl] = useState("/");
  const [displayMode, setDisplayMode] = useState("standalone");
  const [orientation, setOrientation] = useState("any");
  const [scope, setScope] = useState("/");
  const [lang, setLang] = useState("en");
  const [categories, setCategories] = useState<string[]>(["productivity", "utilities"]);

  const afterUploadRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      scrollToElement(afterUploadRef, 50);
    }
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const clearFile = () => {
    setSelectedFile(null);
    setGeneratedIcons([]);
    showToast("File cleared", "info");
  };

  const generateIcons = async () => {
    if (!selectedFile) {
      showToast("Please select an image file", "error");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: PWA_ICON_SIZES.length, size: "" });
    setGeneratedIcons([]);

    try {
      const results: File[] = [];

      for (let i = 0; i < PWA_ICON_SIZES.length; i++) {
        const sizeConfig = PWA_ICON_SIZES[i];
        
        setGenerationProgress({ 
          current: i + 1, 
          total: PWA_ICON_SIZES.length, 
          size: `${sizeConfig.size}x${sizeConfig.size}` 
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;

        canvas.width = sizeConfig.size;
        canvas.height = sizeConfig.size;

        // Create background
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, sizeConfig.size, sizeConfig.size);

        // Load and draw image
        const img = new Image();
        await new Promise((resolve) => {
          img.onload = resolve;
          img.src = URL.createObjectURL(selectedFile);
        });

        // Calculate image dimensions with padding
        const paddingPixels = (padding[0] / 100) * sizeConfig.size;
        const imageSize = sizeConfig.size - (paddingPixels * 2);
        
        // Apply border radius if specified
        if (borderRadius[0] > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(0, 0, sizeConfig.size, sizeConfig.size, borderRadius[0]);
          ctx.clip();
        }

        // Draw image
        ctx.drawImage(img, paddingPixels, paddingPixels, imageSize, imageSize);

        // Convert to blob and create file
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/png');
        });

        const fileName = `icon-${sizeConfig.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });
        results.push(file);

        URL.revokeObjectURL(img.src);
      }

      setGeneratedIcons(results);
      showToast(`Generated ${results.length} PWA icons`, "success");
      scrollToElement(resultsRef);
    } catch (error) {
      showToast("Icon generation failed: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllIcons = async () => {
    if (generatedIcons.length === 0) {
      showToast("No icons available for download", "error");
      return;
    }

    try {
      // Prepare icon files for the new ZIP utility
      const iconFiles: IconFile[] = generatedIcons.map(file => ({
        file,
        platform: 'pwa' // PWA icons go in a single 'pwa' folder
      }));

      // Create manifest.json content
      const manifest = {
        name: appName || "PWA App",
        short_name: appShortName || "PWA",
        description: appDescription || "Progressive Web App",
        start_url: startUrl,
        display: displayMode,
        background_color: backgroundColor,
        theme_color: themeColor,
        orientation: orientation,
        scope: scope,
        lang: lang,
        categories: categories,
        icons: PWA_ICON_SIZES.map((sizeConfig, index) => ({
          src: `pwa/icon-${sizeConfig.name}.png`,
          sizes: `${sizeConfig.size}x${sizeConfig.size}`,
          type: "image/png",
          purpose: "any maskable"
        })),
        // Additional PWA fields for production use
        id: startUrl,
        version: "1.0.0",
        dir: "ltr",
        prefer_related_applications: false,
        related_applications: [],
        screenshots: [],
        shortcuts: []
      };

      const manifestContent = JSON.stringify(manifest, null, 2);

      // Create ZIP with simplified structure
      const zipBlob = await createIconZip(iconFiles, {
        zipName: "pwa-icons.zip",
        manifestContent: manifestContent
      });
      
      // Download the ZIP file
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadIconZip(zipBlob, `${watermark}-pwa-icons.zip`);
      showToast("PWA icons downloaded successfully!", "success");
    } catch (error) {
      showToast(`ZIP Error: ${error instanceof Error ? error.message : "Failed to create ZIP file"}`, "error");
    }
  };

  const downloadSingleIcon = (file: File) => {
    downloadFile(file, file.name);
  };

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
        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PWA Icon Generator
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Generate PWA icons and manifest file with Toolspy's advanced icon generator. 
          Create icons for Progressive Web Apps with complete privacy protection.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={false}
        maxFiles={1}
        className="mb-6 sm:mb-8"
      />

      {/* Selected File and Settings */}
      {selectedFile && (
        <div ref={afterUploadRef}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 sm:mb-8">
            <div className="flex flex-col gap-6">
            {/* Selected File Preview */}
            <Card className="">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Selected Image</CardTitle>
                    <CardDescription>Source image for PWA icon generation</CardDescription>
                  </div>
                  <Button variant="outline" onClick={clearFile} size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ImagePreview
                  file={selectedFile}
                  className="w-full object-contain rounded-lg"
                />
              </CardContent>
            </Card>

            {/* PWA Colors */}
            <Card className="">
              <CardHeader>
                <CardTitle>PWA Colors</CardTitle>
                <CardDescription>Theme and background colors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="theme-color"
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="background-color">Background Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="background-color"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            </div>

            {/* PWA Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>PWA Information</CardTitle>
                <CardDescription>Basic PWA details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">App Name</Label>
                  <Input
                    id="app-name"
                    placeholder="My PWA App"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-short-name">Short Name</Label>
                  <Input
                    id="app-short-name"
                    placeholder="PWA"
                    value={appShortName}
                    onChange={(e) => setAppShortName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-description">Description</Label>
                  <Input
                    id="app-description"
                    placeholder="PWA description"
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="start-url">Start URL</Label>
                  <Input
                    id="start-url"
                    placeholder="/"
                    value={startUrl}
                    onChange={(e) => setStartUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display-mode">Display Mode</Label>
                  <Select value={displayMode} onValueChange={setDisplayMode}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standalone">Standalone</SelectItem>
                      <SelectItem value="fullscreen">Fullscreen</SelectItem>
                      <SelectItem value="minimal-ui">Minimal UI</SelectItem>
                      <SelectItem value="browser">Browser</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orientation">Orientation</Label>
                  <Select value={orientation} onValueChange={setOrientation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="portrait">Portrait</SelectItem>
                      <SelectItem value="landscape">Landscape</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="scope">Scope</Label>
                  <Input
                    id="scope"
                    placeholder="/"
                    value={scope}
                    onChange={(e) => setScope(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lang">Language</Label>
                  <Input
                    id="lang"
                    placeholder="en"
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
            
          </div>

          {/* Icon Settings */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Icon Settings</CardTitle>
                  <CardDescription>Customize icon appearance</CardDescription>
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
            <CardContent className="space-y-5">
              {/* Basic Settings */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Padding: {padding[0]}%</Label>
                  <Slider
                    value={padding}
                    onValueChange={setPadding}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Border Radius: {borderRadius[0]}px</Label>
                  <Slider
                    value={borderRadius}
                    onValueChange={setBorderRadius}
                    max={50}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generateIcons}
                disabled={!selectedFile || isGenerating}
                size="lg"
                className="w-full"
              >
                {isGenerating
                  ? "Generating PWA Icons..."
                  : "Generate PWA Icons"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generated Icons */}
      {generatedIcons.length > 0 && (
        <Card ref={resultsRef}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Generated PWA Icons</CardTitle>
                <CardDescription>
                  {generatedIcons.length} PWA icons with manifest file
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAllIcons} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download All ZIP</span>
                  <span className="sm:hidden">All ZIP</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {generatedIcons.map((file, index) => {
                const sizeConfig = PWA_ICON_SIZES[index];
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 border rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`${sizeConfig.name} icon`}
                        className="w-full h-full object-cover"
                        onLoad={(e) => {
                          setTimeout(() => {
                            URL.revokeObjectURL((e.target as HTMLImageElement).src);
                          }, 100);
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{sizeConfig.name}</p>
                    <p className="text-xs text-muted-foreground">{sizeConfig.size}×{sizeConfig.size}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadSingleIcon(file)}
                      className="mt-2 w-full"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isGenerating}
        title="Generating PWA Icons"
        current={generationProgress.current}
        total={generationProgress.total}
        currentFile={generationProgress.size}
        description="Please wait while we generate your PWA icons..."
      />
</div>
  );
}

export default function PWAIconGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="pwa-icon-generator">
      <ToastProvider>
        <PWAIconGeneratorContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
