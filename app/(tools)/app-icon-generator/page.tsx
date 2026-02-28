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
import {
  createIconZip,
  downloadIconZip,
  IconFile,
} from "@/lib/utils/icon-zip-utils";

// Import SEO Content Component
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

// Platform configurations
const PLATFORMS = {
  android: {
    name: "Android",
    icon: <Smartphone className="h-5 w-5" />,
    sizes: [
      { name: "mdpi", size: 48, folder: "mipmap-mdpi" },
      { name: "hdpi", size: 72, folder: "mipmap-hdpi" },
      { name: "xhdpi", size: 96, folder: "mipmap-xhdpi" },
      { name: "xxhdpi", size: 144, folder: "mipmap-xxhdpi" },
      { name: "xxxhdpi", size: 192, folder: "mipmap-xxxhdpi" },
    ],
  },
  ios: {
    name: "iOS",
    icon: <Smartphone className="h-5 w-5" />,
    sizes: [
      { name: "20pt", size: 20, folder: "20pt" },
      { name: "29pt", size: 29, folder: "29pt" },
      { name: "40pt", size: 40, folder: "40pt" },
      { name: "58pt", size: 58, folder: "58pt" },
      { name: "60pt", size: 60, folder: "60pt" },
      { name: "76pt", size: 76, folder: "76pt" },
      { name: "80pt", size: 80, folder: "80pt" },
      { name: "87pt", size: 87, folder: "87pt" },
      { name: "120pt", size: 120, folder: "120pt" },
      { name: "152pt", size: 152, folder: "152pt" },
      { name: "167pt", size: 167, folder: "167pt" },
      { name: "180pt", size: 180, folder: "180pt" },
      { name: "1024pt", size: 1024, folder: "1024pt" },
    ],
  },
  windows: {
    name: "Windows",
    icon: <Monitor className="h-5 w-5" />,
    sizes: [
      { name: "16x16", size: 16, folder: "16x16" },
      { name: "24x24", size: 24, folder: "24x24" },
      { name: "32x32", size: 32, folder: "32x32" },
      { name: "48x48", size: 48, folder: "48x48" },
      { name: "64x64", size: 64, folder: "64x64" },
      { name: "128x128", size: 128, folder: "128x128" },
      { name: "256x256", size: 256, folder: "256x256" },
    ],
  },
  mac: {
    name: "macOS",
    icon: <Laptop className="h-5 w-5" />,
    sizes: [
      { name: "16x16", size: 16, folder: "16x16" },
      { name: "32x32", size: 32, folder: "32x32" },
      { name: "64x64", size: 64, folder: "64x64" },
      { name: "128x128", size: 128, folder: "128x128" },
      { name: "256x256", size: 256, folder: "256x256" },
      { name: "512x512", size: 512, folder: "512x512" },
      { name: "1024x1024", size: 1024, folder: "1024x1024" },
    ],
  },
  linux: {
    name: "Linux",
    icon: <Monitor className="h-5 w-5" />,
    sizes: [
      { name: "16x16", size: 16, folder: "16x16" },
      { name: "24x24", size: 24, folder: "24x24" },
      { name: "32x32", size: 32, folder: "32x32" },
      { name: "48x48", size: 48, folder: "48x48" },
      { name: "64x64", size: 64, folder: "64x64" },
      { name: "128x128", size: 128, folder: "128x128" },
      { name: "256x256", size: 256, folder: "256x256" },
    ],
  },
  web: {
    name: "Web",
    icon: <Globe className="h-5 w-5" />,
    sizes: [
      { name: "16x16", size: 16, folder: "16x16" },
      { name: "32x32", size: 32, folder: "32x32" },
      { name: "48x48", size: 48, folder: "48x48" },
      { name: "64x64", size: 64, folder: "64x64" },
      { name: "128x128", size: 128, folder: "128x128" },
      { name: "256x256", size: 256, folder: "256x256" },
      { name: "512x512", size: 512, folder: "512x512" },
      { name: "favicon.ico", size: 32, folder: "favicon", format: "ico" },
    ],
  },
};

function AppIconGeneratorContent() {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [appName, setAppName] = useState("");
  const [appDescription, setAppDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([
    "android",
    "ios",
  ]);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [padding, setPadding] = useState([10]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIcons, setGeneratedIcons] = useState<
    { platform: string; files: File[] }[]
  >([]);
  const [generationProgress, setGenerationProgress] = useState({
    current: 0,
    total: 0,
    platform: "",
  });

  // Manifest.json fields
  const [shortName, setShortName] = useState("");
  const [startUrl, setStartUrl] = useState("/");
  const [displayMode, setDisplayMode] = useState("standalone");
  const [themeColor, setThemeColor] = useState("#030712");
  const [orientation, setOrientation] = useState("any");
  const [scope, setScope] = useState("/");
  const [lang, setLang] = useState("en");
  const [categories, setCategories] = useState<string[]>([
    "productivity",
    "utilities",
  ]);
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

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const generateIcons = async () => {
    if (!selectedFile) {
      showToast("Please select an image file", "error");
      return;
    }

    if (selectedPlatforms.length === 0) {
      showToast("Please select at least one platform", "error");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress({
      current: 0,
      total: selectedPlatforms.length,
      platform: "",
    });
    setGeneratedIcons([]);

    try {
      const results: { platform: string; files: File[] }[] = [];

      for (let i = 0; i < selectedPlatforms.length; i++) {
        const platform = selectedPlatforms[i];
        const platformConfig = PLATFORMS[platform as keyof typeof PLATFORMS];

        setGenerationProgress({
          current: i + 1,
          total: selectedPlatforms.length,
          platform: platformConfig.name,
        });

        const platformFiles: File[] = [];

        for (const sizeConfig of platformConfig.sizes) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
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
          const imageSize = sizeConfig.size - paddingPixels * 2;

          // Apply border radius if specified
          if (borderRadius[0] > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.roundRect(
              0,
              0,
              sizeConfig.size,
              sizeConfig.size,
              borderRadius[0]
            );
            ctx.clip();
          }

          // Draw image
          ctx.drawImage(
            img,
            paddingPixels,
            paddingPixels,
            imageSize,
            imageSize
          );

          // Convert to blob and create file
          const format = (sizeConfig as any).format || "png";
          const mimeType = format === "ico" ? "image/x-icon" : "image/png";

          const blob = await new Promise<Blob>((resolve) => {
            canvas.toBlob((blob) => resolve(blob!), mimeType);
          });

          const fileName =
            format === "ico"
              ? `${sizeConfig.name}`
              : `${appName || "app-icon"}-${sizeConfig.name}.${format}`;
          const file = new File([blob], fileName, { type: mimeType });
          platformFiles.push(file);

          URL.revokeObjectURL(img.src);
        }

        results.push({ platform, files: platformFiles });
      }

      setGeneratedIcons(results);
      showToast(
        `Generated icons for ${selectedPlatforms.length} platform(s)`,
        "success"
      );
      scrollToElement(resultsRef);
    } catch (error) {
      showToast(
        "Icon generation failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const generateManifest = () => {
    const manifest = {
      name: appName || "My App",
      short_name: shortName || appName || "MyApp",
      description: appDescription || "A Progressive Web App",
      start_url: startUrl,
      display: displayMode,
      background_color: backgroundColor,
      theme_color: themeColor,
      orientation: orientation,
      scope: scope,
      lang: lang,
      categories: categories,
      icons: generatedIcons.flatMap(({ platform, files }) => {
        const platformConfig = PLATFORMS[platform as keyof typeof PLATFORMS];
        return files.map((file, index) => {
          const sizeConfig = platformConfig.sizes[index];
          const size = sizeConfig?.size;
          const format = (sizeConfig as any).format || "png";

          return {
            src: `${platform}/${file.name}`,
            sizes: `${size}x${size}`,
            type: format === "ico" ? "image/x-icon" : "image/png",
            purpose: format === "ico" ? "any" : "any maskable",
          };
        });
      }),
      // Additional fields for production use
      id: startUrl,
      version: "1.0.0",
      dir: "ltr",
      prefer_related_applications: false,
      related_applications: [],
      screenshots: [],
      shortcuts: [],
    };

    return JSON.stringify(manifest, null, 2);
  };

  const downloadAllIcons = async () => {
    if (generatedIcons.length === 0) {
      showToast("No icons available for download", "error");
      return;
    }

    try {
      // Prepare icon files for the new ZIP utility
      const iconFiles: IconFile[] = [];

      generatedIcons.forEach(({ platform, files }) => {
        files.forEach((file) => {
          iconFiles.push({
            file,
            platform: platform,
          });
        });
      });

      // Generate manifest content
      const manifestContent = generateManifest();

      // Create ZIP with simplified structure
      const zipBlob = await createIconZip(iconFiles, {
        zipName: `${appName || "app-icons"}-icons.zip`,
        manifestContent: manifestContent,
      });

      // Download the ZIP file
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadIconZip(
        zipBlob,
        `${watermark}-${appName || "app-icons"}-icons.zip`
      );
      showToast("Icons downloaded successfully!", "success");
    } catch (error) {
      showToast(
        "Download failed: " +
          (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    }
  };

  const downloadPlatformIcons = async (platform: string) => {
    const platformData = generatedIcons.find((p) => p.platform === platform);
    if (!platformData) return;

    platformData.files.forEach((file) => {
      downloadFile(file, file.name);
    });
  };

  const platformCards = Object.entries(PLATFORMS).map(([key, config]) => ({
    key,
    ...config,
  }));

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
          App Icon Generator
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Generate app icons for all platforms with Toolspy's advanced icon
          generator. Create icons for Android, iOS, Windows, macOS, Linux, and
          Web.
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
                      <CardDescription>
                        Source image for icon generation
                      </CardDescription>
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

              {/* Platform Selection */}
              <Card className="">
                <CardHeader>
                  <CardTitle>Target Platforms</CardTitle>
                  <CardDescription>
                    Select platforms for icon generation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {platformCards.map(({ key, name, icon }) => (
                      <Card
                        key={key}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedPlatforms.includes(key)
                            ? "ring-1 ring-primary bg-primary/10"
                            : "hover:shadow-md hover:ring-1 hover:ring-primary"
                        }`}
                        onClick={() => togglePlatform(key)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-2">
                            {icon}
                            <span className="font-semibold text-sm">
                              {name}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* App Information */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>App Information</CardTitle>
                <CardDescription>Basic app details</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="app-name">App Name</Label>
                  <Input
                    id="app-name"
                    placeholder="My App"
                    value={appName}
                    onChange={(e) => setAppName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-description">Description</Label>
                  <Input
                    id="app-description"
                    placeholder="App description"
                    value={appDescription}
                    onChange={(e) => setAppDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="short-name">Short Name</Label>
                  <Input
                    id="short-name"
                    placeholder="MyApp"
                    value={shortName}
                    onChange={(e) => setShortName(e.target.value)}
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
                  <Label htmlFor="theme-color">Theme Color</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="theme-color"
                      type="color"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      placeholder="#030712"
                      value={themeColor}
                      onChange={(e) => setThemeColor(e.target.value)}
                    />
                  </div>
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
              </div>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="space-y-4">
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
              )}

              {/* Generate Button */}
              <Button
                onClick={generateIcons}
                disabled={
                  !selectedFile ||
                  selectedPlatforms.length === 0 ||
                  isGenerating
                }
                size="lg"
                className="w-full"
              >
                {isGenerating
                  ? "Generating Icons..."
                  : `Generate Icons for ${selectedPlatforms.length} Platform(s)`}
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
                <CardTitle>Generated Icons</CardTitle>
                <CardDescription>
                  {generatedIcons.length} platform(s) with{" "}
                  {generatedIcons.reduce((sum, p) => sum + p.files.length, 0)}{" "}
                  total icons
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
            <div className="space-y-6">
              {generatedIcons.map(({ platform, files }) => {
                const platformConfig =
                  PLATFORMS[platform as keyof typeof PLATFORMS];
                return (
                  <div key={platform} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        {platformConfig.icon}
                        <h4 className="font-semibold">{platformConfig.name}</h4>
                        <Badge variant="secondary">{files.length} icons</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadPlatformIcons(platform)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {files.map((file, index) => {
                        const sizeConfig = platformConfig.sizes[index];
                        return (
                          <div key={index} className="text-center">
                            <div className="w-16 h-16 mx-auto mb-2 border rounded-lg overflow-hidden">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`${sizeConfig.name} icon`}
                                className="w-full h-full object-cover"
                                onLoad={(e) => {
                                  setTimeout(() => {
                                    URL.revokeObjectURL(
                                      (e.target as HTMLImageElement).src
                                    );
                                  }, 100);
                                }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {sizeConfig.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {sizeConfig.size}×{sizeConfig.size}
                            </p>
                          </div>
                        );
                      })}
                    </div>
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
        title="Generating App Icons"
        current={generationProgress.current}
        total={generationProgress.total}
        currentFile={generationProgress.platform}
        description="Please wait while we generate your app icons..."
      />
</div>
  );
}

export default function AppIconGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="app-icon-generator">
      <ToastProvider>
        <AppIconGeneratorContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
