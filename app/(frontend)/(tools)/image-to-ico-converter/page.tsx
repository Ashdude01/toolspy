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
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

// ICO size configurations
const ICO_SIZES = [
  { name: "16x16", size: 16, folder: "16x16" },
  { name: "24x24", size: 24, folder: "24x24" },
  { name: "32x32", size: 32, folder: "32x32" },
  { name: "48x48", size: 48, folder: "48x48" },
  { name: "64x64", size: 64, folder: "64x64" },
  { name: "96x96", size: 96, folder: "96x96" },
  { name: "128x128", size: 128, folder: "128x128" },
  { name: "256x256", size: 256, folder: "256x256" },
];

function ImageToICOConverterContent() {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["16x16", "32x32", "48x48"]);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [padding, setPadding] = useState([10]);
  const [borderRadius, setBorderRadius] = useState([0]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [convertedIcons, setConvertedIcons] = useState<File[]>([]);
  const [conversionProgress, setConversionProgress] = useState({
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
    setConvertedIcons([]);
    showToast("File cleared", "info");
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const convertToICO = async () => {
    if (!selectedFile) {
      showToast("Please select an image file", "error");
      return;
    }

    if (selectedSizes.length === 0) {
      showToast("Please select at least one size", "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({ current: 0, total: selectedSizes.length, size: "" });
    setConvertedIcons([]);

    try {
      const results: File[] = [];

      for (let i = 0; i < selectedSizes.length; i++) {
        const sizeName = selectedSizes[i];
        const sizeConfig = ICO_SIZES.find(s => s.name === sizeName);
        if (!sizeConfig) continue;
        
        setConversionProgress({ 
          current: i + 1, 
          total: selectedSizes.length, 
          size: sizeName 
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

        const fileName = `icon-${sizeName}.ico`;
        const file = new File([blob], fileName, { type: 'image/x-icon' });
        results.push(file);

        URL.revokeObjectURL(img.src);
      }

      setConvertedIcons(results);
      showToast(`Converted ${results.length} ICO file(s)`, "success");
      scrollToElement(resultsRef);
    } catch (error) {
      showToast("ICO conversion failed: " + (error instanceof Error ? error.message : "Unknown error"), "error");
    } finally {
      setIsConverting(false);
    }
  };

  const downloadAllICOs = async () => {
    if (convertedIcons.length === 0) {
      showToast("No ICO files available for download", "error");
      return;
    }

    try {
      const allFiles: File[] = [...convertedIcons];

      // Create README file
      const readmeContent = `# ICO Files Generated by Toolspy

This package contains ICO files generated from your image.

## Files Included:
${convertedIcons.map(file => `- ${file.name}`).join('\n')}

## How to Use:
1. Extract all files to your project directory
2. Use the appropriate ICO file for your application
3. For Windows applications, use the 32x32 or 48x48 size
4. For web applications, use the 16x16 or 32x32 size

## Generated by Toolspy
Visit https://toolspy.net for more free online tools.

Generated on: ${new Date().toLocaleString()}
`;

      const readmeFile = new File([readmeContent], "README.txt", { type: "text/plain" });
      allFiles.push(readmeFile);

      const zipBlob = await createZipFromFiles(allFiles, "ico-files.zip");
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      downloadZip(zipBlob, `${watermark}-ico-files.zip`);
    } catch (error) {
      showToast(`ZIP Error: ${error instanceof Error ? error.message : "Failed to create ZIP file"}`, "error");
    }
  };

  const downloadSingleICO = (file: File) => {
    downloadFile(file, file.name);
  };

  const sizeCards = ICO_SIZES.map(size => ({
    key: size.name,
    ...size,
  }));

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        {/* Main Heading */}
        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Professional Image to ICO Converter
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
          Convert images to ICO format with Toolspy's advanced converter. 
          Create ICO files for Windows applications and web use with complete privacy protection.
        </p>
      </div>

      {/* File Upload */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={false}
        maxFiles={1}
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
                    <CardDescription>Source image for ICO conversion</CardDescription>
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
                  className="w-full object-cover rounded-lg"
                />
              </CardContent>
            </Card>

            {/* ICO Size Selection */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>ICO Sizes</CardTitle>
                <CardDescription>Select sizes for ICO conversion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {sizeCards.map(({ key, name, size }) => (
                    <Card
                      key={key}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedSizes.includes(key)
                          ? "ring-1 ring-primary bg-primary/10"
                          : "hover:shadow-md hover:ring-1 hover:ring-primary"
                      }`}
                      onClick={() => toggleSize(key)}
                    >
                      <CardContent className="p-3">
                        <div className="text-center">
                          <div className="text-lg font-semibold">{name}</div>
                          <div className="text-xs text-muted-foreground">{size}×{size}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ICO Settings */}
          <Card className="mb-6 sm:mb-8">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle>ICO Settings</CardTitle>
                  <CardDescription>Customize ICO appearance</CardDescription>
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

              {/* Convert Button */}
              <Button
                onClick={convertToICO}
                disabled={!selectedFile || selectedSizes.length === 0 || isConverting}
                size="lg"
                className="w-full"
              >
                {isConverting
                  ? "Converting to ICO..."
                  : `Convert to ICO (${selectedSizes.length} sizes)`}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Converted ICO Files */}
      {convertedIcons.length > 0 && (
        <Card ref={resultsRef}>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Converted ICO Files</CardTitle>
                <CardDescription>
                  {convertedIcons.length} ICO file(s) converted successfully
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button onClick={downloadAllICOs} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Download All ZIP</span>
                  <span className="sm:hidden">All ZIP</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {convertedIcons.map((file, index) => {
                const sizeName = selectedSizes[index];
                const sizeConfig = ICO_SIZES.find(s => s.name === sizeName);
                return (
                  <div key={index} className="text-center">
                    <div className="w-20 h-20 mx-auto mb-2 border rounded-lg overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`${sizeName} ICO`}
                        className="w-full h-full object-cover"
                        onLoad={(e) => {
                          setTimeout(() => {
                            URL.revokeObjectURL((e.target as HTMLImageElement).src);
                          }, 100);
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{sizeName}</p>
                    <p className="text-xs text-muted-foreground">{sizeConfig?.size}×{sizeConfig?.size}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadSingleICO(file)}
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
        isOpen={isConverting}
        title="Converting to ICO"
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.size}
        description="Please wait while we convert your image to ICO format..."
      />
</div>
  );
}

export default function ImageToICOConverterPage() {
  return (
    <ToolPageWrapper toolSlug="image-to-ico-converter"><ToastProvider>
      <ImageToICOConverterContent /></ToastProvider></ToolPageWrapper>
  );
}
