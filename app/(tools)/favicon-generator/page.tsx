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
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";

// Import SEO Content Component
import { FaviconGeneratorSEOContent } from "./seo-content";

// Favicon configurations
const FAVICON_SIZES = [
  { name: "16x16", size: 16, folder: "16x16" },
  { name: "32x32", size: 32, folder: "32x32" },
  { name: "48x48", size: 48, folder: "48x48" },
  { name: "64x64", size: 64, folder: "64x64" },
  { name: "96x96", size: 96, folder: "96x96" },
  { name: "128x128", size: 128, folder: "128x128" },
  { name: "144x144", size: 144, folder: "144x144" },
  { name: "152x152", size: 152, folder: "152x152" },
  { name: "180x180", size: 180, folder: "180x180" },
  { name: "192x192", size: 192, folder: "192x192" },
  { name: "256x256", size: 256, folder: "256x256" },
  { name: "512x512", size: 512, folder: "512x512" },
];

function FaviconGeneratorContent() {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [siteName, setSiteName] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [themeColor, setThemeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [padding, setPadding] = useState([10]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFavicons, setGeneratedFavicons] = useState<File[]>([]);
  const [generationProgress, setGenerationProgress] = useState({
    current: 0,
    total: 0,
    size: "",
  });
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
    setGeneratedFavicons([]);
    showToast("File cleared", "info");
  };

  const generateFavicons = async () => {
    if (!selectedFile) {
      showToast("Please select an image file", "error");
      return;
    }

    setIsGenerating(true);
    setGenerationProgress({ current: 0, total: FAVICON_SIZES.length, size: "" });
    setGeneratedFavicons([]);

    try {
      const results: File[] = [];

      for (let i = 0; i < FAVICON_SIZES.length; i++) {
        const sizeConfig = FAVICON_SIZES[i];
        
        setGenerationProgress({ 
          current: i + 1, 
          total: FAVICON_SIZES.length, 
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

        const fileName = `favicon-${sizeConfig.name}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });
        results.push(file);

        URL.revokeObjectURL(img.src);
      }

      setGeneratedFavicons(results);
      showToast(`Generated ${results.length} favicons`, "success");
      scrollToElement(resultsRef);
    } catch (error) {
      showToast("Favicon generation failed: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAllFavicons = async () => {
    if (generatedFavicons.length === 0) {
      showToast("No favicons available for download", "error");
      return;
    }

    try {
      const allFiles: File[] = [...generatedFavicons];

      // Create HTML file with favicon links
      const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteName || "Website"}</title>
    <meta name="description" content="${siteDescription || "Website description"}">
    <meta name="theme-color" content="${themeColor}">
    
    <!-- Favicon Links -->
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48.png">
    <link rel="icon" type="image/png" sizes="64x64" href="favicon-64x64.png">
    <link rel="icon" type="image/png" sizes="96x96" href="favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="128x128" href="favicon-128x128.png">
    <link rel="icon" type="image/png" sizes="144x144" href="favicon-144x144.png">
    <link rel="icon" type="image/png" sizes="152x152" href="favicon-152x152.png">
    <link rel="icon" type="image/png" sizes="180x180" href="favicon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="favicon-192x192.png">
    <link rel="icon" type="image/png" sizes="256x256" href="favicon-256x256.png">
    <link rel="icon" type="image/png" sizes="512x512" href="favicon-512x512.png">
    
    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" sizes="180x180" href="favicon-180x180.png">
    <link rel="apple-touch-icon" sizes="152x152" href="favicon-152x152.png">
    <link rel="apple-touch-icon" sizes="144x144" href="favicon-144x144.png">
    <link rel="apple-touch-icon" sizes="128x128" href="favicon-128x128.png">
    <link rel="apple-touch-icon" sizes="96x96" href="favicon-96x96.png">
    <link rel="apple-touch-icon" sizes="64x64" href="favicon-64x64.png">
    <link rel="apple-touch-icon" sizes="48x48" href="favicon-48x48.png">
    <link rel="apple-touch-icon" sizes="32x32" href="favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="16x16" href="favicon-16x16.png">
</head>
<body>
    <h1>${siteName || "Website"}</h1>
    <p>${siteDescription || "Website description"}</p>
</body>
</html>`;

      const htmlFile = new File([htmlContent], "index.html", { type: "text/html" });
      allFiles.push(htmlFile);

      const zipBlob = await createZipFromFiles(allFiles, "favicons.zip");
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadZip(zipBlob, `${watermark}-favicons.zip`);
    } catch (error) {
      showToast(`ZIP Error: ${error instanceof Error ? error.message : "Failed to create ZIP file"}`, "error");
    }
  };

  const downloadSingleFavicon = (file: File) => {
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
        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Professional Favicon Generator
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Generate favicons for your website with Toolspy's advanced favicon generator. 
          Create favicons for all devices and browsers with complete privacy protection.
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 sm:mb-8">
            {/* Selected File Preview */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle>Selected Image</CardTitle>
                    <CardDescription>Source image for favicon generation</CardDescription>
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
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p><strong>Name:</strong> {selectedFile.name}</p>
                  <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
                  <p><strong>Type:</strong> {selectedFile.type}</p>
                </div>
              </CardContent>
            </Card>

            {/* Website Information */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Website Information</CardTitle>
                <CardDescription>Basic website details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input
                    id="site-name"
                    placeholder="My Website"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Description</Label>
                  <Input
                    id="site-description"
                    placeholder="Website description"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Website Colors */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Website Colors</CardTitle>
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

          {/* Favicon Settings */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>Favicon Settings</CardTitle>
                  <CardDescription>Customize favicon appearance</CardDescription>
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
                onClick={generateFavicons}
                disabled={!selectedFile || isGenerating}
                size="lg"
                className="w-full"
              >
                {isGenerating
                  ? "Generating Favicons..."
                  : "Generate Favicons"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Generated Favicons */}
      {generatedFavicons.length > 0 && (
        <Card ref={resultsRef}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Generated Favicons</CardTitle>
                <CardDescription>
                  {generatedFavicons.length} favicons with HTML file
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAllFavicons} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download All ZIP</span>
                  <span className="sm:hidden">All ZIP</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {generatedFavicons.map((file, index) => {
                const sizeConfig = FAVICON_SIZES[index];
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 border rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`${sizeConfig.name} favicon`}
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
                      onClick={() => downloadSingleFavicon(file)}
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
        title="Generating Favicons"
        current={generationProgress.current}
        total={generationProgress.total}
        currentFile={generationProgress.size}
        description="Please wait while we generate your favicons..."
      />

      {/* SEO Content Section */}
      <FaviconGeneratorSEOContent />
    </div>
  );
}

export default function FaviconGeneratorPage() {
  return (
    <ToastProvider>
      <FaviconGeneratorContent />
    </ToastProvider>
  );
}
