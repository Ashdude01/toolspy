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
import { Slider } from "@/components/ui/slider";
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
  Zap,
  TrendingUp,
  X,
} from "lucide-react";
import { ImageOptimizerSEOContent } from "./seo-content";

interface ProcessedFile {
  id: string;
  name: string;
  originalFile: File;
  previewUrl: string;
  optimizedBlob?: Blob;
  optimizedUrl?: string;
  originalSize: number;
  optimizedSize?: number;
  compressionRatio?: number;
  status: 'pending' | 'processing' | 'completed' | 'error';
  error?: string;
}

function ImageOptimizerContent() {
  const { showToast } = useToast();
  const [files, setFiles] = useState<ProcessedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentFile, setCurrentFile] = useState(0);
  const [quality, setQuality] = useState(85);
  const [format, setFormat] = useState('webp');
  const [resizeMode, setResizeMode] = useState('none');
  const [maxWidth, setMaxWidth] = useState(1920);
  const [maxHeight, setMaxHeight] = useState(1080);
  const [progressive, setProgressive] = useState(true);
  const [removeMetadata, setRemoveMetadata] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxFiles = 20;

  const handleFileSelect = (selectedFiles: File[]) => {
    const newFiles: ProcessedFile[] = [];
    
    selectedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const processedFile: ProcessedFile = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: file.name,
          originalFile: file,
          previewUrl: e.target?.result as string,
          originalSize: file.size,
          status: 'pending'
        };
        newFiles.push(processedFile);
        
        if (newFiles.length === selectedFiles.length) {
          setFiles(prev => [...prev, ...newFiles]);
          showToast(`${selectedFiles.length} image(s) added`, "success");
        }
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
      if (file.optimizedUrl) {
        URL.revokeObjectURL(file.optimizedUrl);
      }
      URL.revokeObjectURL(file.previewUrl);
    });
    setFiles([]);
    showToast("All files cleared", "success");
  };

  const optimizeImages = async () => {
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

          // Create canvas for optimization
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

          let { width, height } = img;

          // Apply resize if needed
          if (resizeMode !== 'none') {
            const aspectRatio = width / height;
            
            if (resizeMode === 'fit') {
              if (width > maxWidth || height > maxHeight) {
                if (width / maxWidth > height / maxHeight) {
                  width = maxWidth;
                  height = Math.round(maxWidth / aspectRatio);
                } else {
                  height = maxHeight;
                  width = Math.round(maxHeight * aspectRatio);
                }
              }
            } else if (resizeMode === 'cover') {
              if (width < maxWidth || height < maxHeight) {
                if (width / maxWidth < height / maxHeight) {
                  width = maxWidth;
                  height = Math.round(maxWidth / aspectRatio);
                } else {
                  height = maxHeight;
                  width = Math.round(maxHeight * aspectRatio);
                }
              }
            }
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Apply image smoothing for better quality
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Draw optimized image
          ctx.drawImage(img, 0, 0, width, height);

          // Get output format
          const outputFormat = format === 'original' ? file.originalFile.type : `image/${format}`;
          const outputQuality = quality / 100;

          // Convert to blob
          const optimizedBlob = await new Promise<Blob>((resolve, reject) => {
            canvas.toBlob((blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error('Could not create blob'));
              }
            }, outputFormat, outputQuality);
          });

          const optimizedUrl = URL.createObjectURL(optimizedBlob);
          const compressionRatio = ((file.originalSize - optimizedBlob.size) / file.originalSize) * 100;
          
          file.optimizedBlob = optimizedBlob;
          file.optimizedUrl = optimizedUrl;
          file.optimizedSize = optimizedBlob.size;
          file.compressionRatio = compressionRatio;
          file.status = 'completed';
          
        } catch (error) {
          console.error('Error optimizing image:', error);
          file.status = 'error';
          file.error = `Failed to optimize: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }
        
        setFiles([...updatedFiles]);
      }
      
      showToast("Images optimized successfully!", "success");
      
    } catch (error) {
      console.error('Optimization error:', error);
      showToast("Optimization failed. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (file: ProcessedFile) => {
    if (!file.optimizedUrl) return;
    
    const link = document.createElement('a');
    link.href = file.optimizedUrl;
    
    // Create filename with optimization info
    const nameParts = file.name.split('.');
    const extension = nameParts.pop() || 'jpg';
    const baseName = nameParts.join('.');
    const formatExt = format === 'original' ? extension : format;
    
    link.download = `${baseName}_optimized.${formatExt}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast(`${file.name} downloaded`, "success");
  };

  const downloadAllFiles = () => {
    const completedFiles = files.filter(file => file.status === 'completed' && file.optimizedUrl);
    
    if (completedFiles.length === 0) {
      showToast("No optimized images to download", "error");
      return;
    }

    completedFiles.forEach(file => downloadFile(file));
  };

  const resetAll = () => {
    clearAllFiles();
    setQuality(85);
    setFormat('webp');
    setResizeMode('none');
    setMaxWidth(1920);
    setMaxHeight(1080);
    setProgressive(true);
    setRemoveMetadata(true);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'processing':
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case 'error':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <FileImage className="h-4 w-4 text-gray-500" />;
    }
  };

  const completedCount = files.filter(f => f.status === 'completed').length;
  const totalSavings = files.reduce((acc, file) => {
    if (file.status === 'completed' && file.optimizedSize) {
      return acc + (file.originalSize - file.optimizedSize);
    }
    return acc;
  }, 0);

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
          Image Optimizer
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Optimize images for faster loading and better performance. Reduce file sizes 
          while maintaining visual quality with advanced compression algorithms.
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
            Select images to optimize (max {maxFiles} files)
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

      {/* Optimization Settings */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Optimization Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                <p className="text-xs text-muted-foreground">
                  Higher quality = larger files, lower quality = smaller files
                </p>
              </div>

              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="webp">WebP (Best compression)</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="original">Keep original format</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resize Mode</Label>
                <Select value={resizeMode} onValueChange={setResizeMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No resizing</SelectItem>
                    <SelectItem value="fit">Fit within dimensions</SelectItem>
                    <SelectItem value="cover">Cover dimensions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              {resizeMode !== 'none' && (
                <>
                  <div className="space-y-2">
                    <Label>Max Width: {maxWidth}px</Label>
                    <Slider
                      value={[maxWidth]}
                      onValueChange={(value) => setMaxWidth(value[0])}
                      max={3840}
                      min={100}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Height: {maxHeight}px</Label>
                    <Slider
                      value={[maxHeight]}
                      onValueChange={(value) => setMaxHeight(value[0])}
                      max={2160}
                      min={100}
                      step={10}
                      className="w-full"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="progressive"
                    checked={progressive}
                    onChange={(e) => setProgressive(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="progressive">Progressive JPEG</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Loads images progressively for better perceived performance
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="removeMetadata"
                    checked={removeMetadata}
                    onChange={(e) => setRemoveMetadata(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="removeMetadata">Remove metadata</Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Removes EXIF data to reduce file size
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image List */}
      {files.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <CardTitle>Images to Optimize</CardTitle>
            <CardDescription>
              {files.length} image(s) selected, {completedCount} optimized
              {totalSavings > 0 && (
                <span className="ml-2 text-green-600 font-medium">
                  • Total savings: {formatFileSize(totalSavings)}
                </span>
              )}
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
                          <span className="ml-2">{formatFileSize(file.originalSize)}</span>
                        </div>
                        {file.optimizedSize && (
                          <div>
                            <span className="text-muted-foreground">Optimized:</span>
                            <span className="ml-2">{formatFileSize(file.optimizedSize)}</span>
                          </div>
                        )}
                      </div>

                      {file.compressionRatio && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Compression:</span>
                          <span className="ml-2 text-green-600 font-medium">
                            {file.compressionRatio.toFixed(1)}% reduction
                          </span>
                        </div>
                      )}

                      {file.error && (
                        <p className="text-red-500 text-sm">{file.error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === 'completed' && file.optimizedUrl && (
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
              onClick={optimizeImages}
              disabled={files.length === 0 || isProcessing}
              className="flex-1"
            >
              <Zap className="h-4 w-4 mr-2" />
              {isProcessing ? 'Optimizing...' : `Optimize Images${files.length > 1 ? ` (${files.length})` : ''}`}
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
        title="Optimizing Images"
        description="Processing your images, please wait..."
        currentFile={files[currentFile]?.name}
      />

      {/* Info Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle>About Image Optimization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">WebP Format</div>
              <div className="text-muted-foreground">
                Modern format with 25-35% better compression than JPEG
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Quality Control</div>
              <div className="text-muted-foreground">
                Balance between file size and visual quality
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Progressive JPEG</div>
              <div className="text-muted-foreground">
                Loads images in multiple passes for better UX
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="font-medium text-primary">Metadata Removal</div>
              <div className="text-muted-foreground">
                Removes EXIF data to reduce file size
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SEO Content Section */}
      <ImageOptimizerSEOContent />
    </div>
  );
}

export default function ImageOptimizerPage() {
  return (
    <ToastProvider>
      <ImageOptimizerContent />
    </ToastProvider>
  );
} 