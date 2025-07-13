"use client";

import { useState, useRef } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
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
} from "lucide-react";
import { ImageResizerSEOContent } from "./seo-content";

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
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

function ImageResizerContent() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(0);
  const [resizeMode, setResizeMode] = useState<'percentage' | 'pixels'>('percentage');
  const [percentage, setPercentage] = useState([100]);
  const [customWidth, setCustomWidth] = useState<number | ''>('');
  const [customHeight, setCustomHeight] = useState<number | ''>('');
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [quality, setQuality] = useState(90);
  const [format, setFormat] = useState('original');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFiles = 10;

  const handleFileSelect = (selectedFiles: File[]) => {
    const newFiles: ProcessedFile[] = [];
    
    selectedFiles.forEach(file => {
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
            newWidth: Math.round(img.width * (percentage[0] / 100)),
            newHeight: Math.round(img.height * (percentage[0] / 100)),
            status: 'pending'
          };
          newFiles.push(processedFile);
          
          if (newFiles.length === selectedFiles.length) {
            setFiles(prev => [...prev, ...newFiles]);
            showToast(`${selectedFiles.length} image(s) added`, "success");
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
    setFiles(prev => prev.filter(file => file.id !== id));
    showToast("File removed", "success");
  };

  const clearAllFiles = () => {
    files.forEach(file => {
      if (file.resizedUrl) {
        URL.revokeObjectURL(file.resizedUrl);
      }
      URL.revokeObjectURL(file.previewUrl);
    });
    setFiles([]);
    showToast("All files cleared", "success");
  };

  const updateDimensions = (fileId: string, width: number, height: number) => {
    setFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, newWidth: width, newHeight: height }
        : file
    ));
  };

  const handleWidthChange = (fileId: string, width: number) => {
    const file = files.find(f => f.id === fileId);
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
    const file = files.find(f => f.id === fileId);
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
    setFiles(prev => prev.map(file => ({
      ...file,
      newWidth: Math.round(file.originalWidth * newPercentage),
      newHeight: Math.round(file.originalHeight * newPercentage)
    })));
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
          file.status = 'processing';
          setFiles([...updatedFiles]);

          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            throw new Error('Could not get canvas context');
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

          // Draw resized image
          ctx.drawImage(img, 0, 0, file.newWidth, file.newHeight);

          // Get output format
          const outputFormat = format === 'original' ? file.originalFile.type : `image/${format}`;
          const outputQuality = quality / 100;

          // Convert to blob
          const resizedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Could not create blob'));
              }
            }, outputFormat, outputQuality);
          });

          const resizedUrl = URL.createObjectURL(resizedBlob);
          
          file.resizedBlob = resizedBlob;
          file.resizedUrl = resizedUrl;
          file.status = 'completed';
          
        } catch (error) {
          console.error('Error resizing image:', error);
          file.status = 'error';
          file.error = `Failed to resize: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        
        setFiles([...updatedFiles]);
      }
      
      showToast("Images resized successfully!", "success");
      
    } catch (error) {
      console.error('Resize error:', error);
      showToast("Resize failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: ProcessedFile) => {
    if (!file.resizedUrl) return;
    
    const link = document.createElement('a');
    link.href = file.resizedUrl;
    
    // Create filename with dimensions
    const nameParts = file.name.split('.');
    const extension = nameParts.pop() || 'jpg';
    const baseName = nameParts.join('.');
    const formatExt = format === 'original' ? extension : format;
    
    link.download = `${baseName}_${file.newWidth}x${file.newHeight}.${formatExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${file.name} downloaded`, "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(file => file.status === 'completed' && file.resizedUrl);
    
    if (completedFiles.length === 0) {
      showToast("No resized images to download", "error");
      return;
    }

    completedFiles.forEach(file => downloadFile(file));
  };

  const resetAll = () => {
    clearAllFiles();
    setResizeMode('percentage');
    setPercentage([100]);
    setCustomWidth('');
    setCustomHeight('');
    setMaintainAspectRatio(true);
    setQuality(90);
    setFormat('original');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Download className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <FileImage className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-blue-500 dark:from-blue-600 to-purple-600 dark:to-purple-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Image Resizer
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Resize images to specific dimensions or percentages. Maintain aspect ratio, 
          adjust quality, and convert formats with professional results.
        </p>
      </div>

      {/* File Upload */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileImage className="h-5 w-5" />
            Upload Images
          </CardTitle>
          <CardDescription>
            Select images to resize (max {maxFiles} files)
          </CardDescription>
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

      {/* Resize Settings */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Maximize2 className="h-5 w-5" />
            Resize Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Resize Mode</Label>
                <Select value={resizeMode} onValueChange={(value: 'percentage' | 'pixels') => setResizeMode(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="pixels">Custom Dimensions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {resizeMode === 'percentage' && (
                <div className="space-y-2">
                  <Label>Scale: {percentage[0]}%</Label>
                  <Slider
                    value={percentage}
                    onValueChange={setPercentage}
                    max={300}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={applyPercentageToAll}
                    className="w-full"
                  >
                    Apply to All Images
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="original">Original Format</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Quality: {quality}%</Label>
                <Slider
                  value={[quality]}
                  onValueChange={(value) => setQuality(value[0])}
                  max={100}
                  min={10}
                  step={5}
                  className="w-full"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="aspectRatio"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="aspectRatio">Maintain aspect ratio</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image List */}
      {files.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Images to Resize</CardTitle>
            <CardDescription>
              {files.length} image(s) selected, {completedCount} completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {files.map((file) => (
                <div key={file.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={file.previewUrl}
                        alt={file.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(file.status)}
                        <span className="font-medium">{file.name}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Original:</span>
                          <span className="ml-2">{file.originalWidth} × {file.originalHeight}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">New:</span>
                          <span className="ml-2">{file.newWidth} × {file.newHeight}</span>
                        </div>
                      </div>

                      {resizeMode === 'pixels' && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`width-${file.id}`} className="text-xs">Width</Label>
                            <Input
                              id={`width-${file.id}`}
                              type="number"
                              value={file.newWidth}
                              onChange={(e) => handleWidthChange(file.id, parseInt(e.target.value) || 0)}
                              className="h-8"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`height-${file.id}`} className="text-xs">Height</Label>
                            <Input
                              id={`height-${file.id}`}
                              type="number"
                              value={file.newHeight}
                              onChange={(e) => handleHeightChange(file.id, parseInt(e.target.value) || 0)}
                              className="h-8"
                            />
                          </div>
                        </div>
                      )}

                      {file.error && (
                        <p className="text-red-500 text-sm">{file.error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && file.resizedUrl && (
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

      {/* Action Buttons */}
      <Card className="mb-6 sm:mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={resizeImages}
              disabled={files.length === 0 || isProcessing}
              className="flex-1"
            >
              <Maximize2 className="h-4 w-4 mr-2" />
              {isProcessing ? 'Resizing...' : `Resize Images${files.length > 1 ? ` (${files.length})` : ''}`}
            </Button>
            
            {completedCount > 0 && (
              <Button
                variant="outline"
                onClick={downloadAllFiles}
                disabled={isProcessing}
                className="flex-1 sm:flex-initial"
              >
                <Download className="h-4 w-4 mr-2" />
                Download All ({completedCount})
              </Button>
            )}
            
            <Button
              variant="outline"
              onClick={resetAll}
              disabled={isProcessing}
              className="flex-1 sm:flex-initial"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
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
        description="Processing your images, please wait..."
        currentFile={files[currentFile]?.name}
      />

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About Image Resizing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Aspect Ratio</div>
              <div className="text-muted-foreground">
                Maintain original proportions to prevent distortion
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Quality Control</div>
              <div className="text-muted-foreground">
                Adjust compression to balance file size and quality
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Batch Processing</div>
              <div className="text-muted-foreground">
                Resize multiple images with the same settings
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Format Support</div>
              <div className="text-muted-foreground">
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