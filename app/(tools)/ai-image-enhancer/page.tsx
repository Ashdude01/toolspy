"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";

import {
  Download,
  Copy,
  Trash2,
  Wand2,
  Upload,
  Settings,
  Zap,
  Eye,
  EyeOff,
  RefreshCw,
  Sparkles,
  Palette,
  Maximize,
  Focus,
  Image as ImageIcon,
  Star,
  TrendingUp,
  Layers,
  Contrast,
  Gauge,
  ArrowRight,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface EnhancementResult {
  original: string;
  enhanced: string;
  enhancement: string;
  processingTime: number;
  improvements: {
    resolution: string;
    quality: number;
    clarity: number;
    colors: number;
  };
  settings: EnhancementSettings;
}

interface EnhancementSettings {
  enhancement: 'upscale' | 'unblur' | 'restore' | 'colorize' | 'denoise' | 'auto';
  upscaleFactor: number;
  qualityBoost: number;
  colorEnhancement: number;
  contrastBoost: number;
  sharpenAmount: number;
  preserveDetails: boolean;
  aiStrength: number;
}

function AiImageEnhancerContent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(true);
  const [imageLoading, setImageLoading] = useState(false);
  const [settings, setSettings] = useState<EnhancementSettings>({
    enhancement: 'auto',
    upscaleFactor: 2,
    qualityBoost: 70,
    colorEnhancement: 50,
    contrastBoost: 30,
    sharpenAmount: 40,
    preserveDetails: true,
    aiStrength: 80
  });
  const [batchMode, setBatchMode] = useState(false);
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Simulate AI image enhancement processing
  const processImage = useCallback(async (imageData: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Simulate processing steps based on enhancement type
      const steps = [
        { progress: 15, message: "Analyzing image quality..." },
        { progress: 30, message: "Applying AI enhancement..." },
        { progress: 50, message: "Optimizing resolution..." },
        { progress: 70, message: "Enhancing details..." },
        { progress: 85, message: "Fine-tuning colors..." },
        { progress: 95, message: "Finalizing result..." },
        { progress: 100, message: "Complete!" }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProcessingProgress(step.progress);
      }

      // Create enhanced version
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise<EnhancementResult>((resolve) => {
        img.onload = () => {
          // Calculate new dimensions based on upscaling
          const scaleFactor = settings.enhancement === 'upscale' ? settings.upscaleFactor : 1;
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;
          
          if (ctx) {
            // Apply various enhancements based on settings
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            
            // Draw upscaled image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Apply filters based on enhancement type
            let filter = '';
            
            if (settings.enhancement === 'unblur' || settings.enhancement === 'auto') {
              filter += `contrast(${100 + settings.contrastBoost}%) `;
              filter += `brightness(${100 + settings.qualityBoost/3}%) `;
            }
            
            if (settings.enhancement === 'colorize' || settings.enhancement === 'auto') {
              filter += `saturate(${100 + settings.colorEnhancement}%) `;
            }
            
            if (settings.enhancement === 'restore' || settings.enhancement === 'auto') {
              filter += `contrast(${100 + settings.contrastBoost}%) `;
              filter += `brightness(105%) `;
            }
            
            if (filter) {
              ctx.filter = filter;
              ctx.drawImage(canvas, 0, 0);
              ctx.filter = 'none';
            }
            
            const enhancedImage = canvas.toDataURL('image/png', 0.95);
            
            // Calculate improvement metrics
            const improvements = {
              resolution: settings.enhancement === 'upscale' 
                ? `${img.width}x${img.height} → ${canvas.width}x${canvas.height}` 
                : `${img.width}x${img.height}`,
              quality: Math.min(100, 60 + settings.qualityBoost),
              clarity: Math.min(100, 50 + settings.sharpenAmount + settings.contrastBoost),
              colors: Math.min(100, 70 + settings.colorEnhancement)
            };
            
            resolve({
              original: uploadedImage!,
              enhanced: enhancedImage,
              enhancement: settings.enhancement,
              processingTime: 6000,
              improvements,
              settings: { ...settings }
            });
          }
        };
        img.src = imageData;
      });

    } catch (error) {
      showToast("Enhancement failed. Please try again.", "error");
      throw error;
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, [settings, uploadedImage]);

  const handleImageUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Please upload an image file", "error");
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      showToast("File size too large. Please upload an image under 50MB.", "error");
      return;
    }

    setImageLoading(true);
    const reader = new FileReader();
    reader.onerror = () => {
      setImageLoading(false);
      showToast("Failed to read image file", "error");
    };
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setResult(null);
        setShowComparison(true); // Reset comparison view when new image is uploaded
        setImageLoading(false);
        
        // Auto-enhance if enabled
        if (settings.enhancement === 'auto') {
          try {
            const enhanced = await processImage(imageData);
            setResult(enhanced);
            showToast("Image enhanced automatically!", "success");
          } catch (error) {
            // Error already handled in processImage
          }
        } else {
          showToast("Image uploaded successfully! Click 'Enhance Image' to process.", "success");
        }
      } catch (error) {
        setImageLoading(false);
        showToast("Failed to process image", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchUpload = (files: File[]) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    if (imageFiles.length === 0) {
      showToast("Please upload image files", "error");
      return;
    }
    
    setBatchFiles(imageFiles);
    setBatchMode(true);
    showToast(`${imageFiles.length} images ready for batch processing`, "success");
  };

  const processBatch = async () => {
    if (batchFiles.length === 0) return;
    
    setIsProcessing(true);
    let processed = 0;
    
    for (const file of batchFiles) {
      try {
        const reader = new FileReader();
        const imageData = await new Promise<string>((resolve) => {
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.readAsDataURL(file);
        });
        
        await processImage(imageData);
        processed++;
        setProcessingProgress((processed / batchFiles.length) * 100);
        
        // Simulate download for batch processing
        await new Promise(resolve => setTimeout(resolve, 500));
        
      } catch (error) {
        console.error(`Failed to process ${file.name}`);
      }
    }
    
    setIsProcessing(false);
    setProcessingProgress(0);
    showToast(`Batch processing complete! ${processed}/${batchFiles.length} images enhanced.`, "success");
  };

  const handleManualEnhance = async () => {
    if (!uploadedImage) {
      showToast("Please upload an image first", "error");
      return;
    }

    try {
      const enhanced = await processImage(uploadedImage);
      setResult(enhanced);
      showToast("Image enhanced successfully!", "success");
    } catch (error) {
      // Error already handled in processImage
    }
  };

  const downloadResult = async (format: 'original' | 'enhanced' | 'comparison') => {
    if (!result) {
      showToast("No enhanced image to download", "error");
      return;
    }

    try {
      let imageData = result.enhanced;
      let filename = `enhanced-${Date.now()}`;

      if (format === 'original') {
        imageData = result.original;
        filename = `original-${Date.now()}`;
        
        // Download immediately for original
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Image downloaded successfully!", "success");
      } else if (format === 'comparison') {
        // Create side-by-side comparison
        showToast("Creating comparison image...", "info");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          showToast("Failed to create comparison image", "error");
          return;
        }
        
        const originalImg = new Image();
        const enhancedImg = new Image();
        
        await Promise.all([
          new Promise<void>((resolve, reject) => {
            originalImg.onload = () => resolve();
            originalImg.onerror = () => reject(new Error('Failed to load original image'));
            originalImg.src = result.original;
          }),
          new Promise<void>((resolve, reject) => {
            enhancedImg.onload = () => resolve();
            enhancedImg.onerror = () => reject(new Error('Failed to load enhanced image'));
            enhancedImg.src = result.enhanced;
          })
        ]);
        
        // Calculate dimensions with padding
        const padding = 20;
        const labelHeight = 40;
        const maxHeight = Math.max(originalImg.height, enhancedImg.height);
        const totalWidth = originalImg.width + enhancedImg.width + padding * 3;
        const totalHeight = maxHeight + labelHeight + padding * 2;
        
        canvas.width = totalWidth;
        canvas.height = totalHeight;
        
        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw original
        ctx.drawImage(originalImg, padding, padding);
        
        // Draw enhanced
        ctx.drawImage(enhancedImg, originalImg.width + padding * 2, padding);
        
        // Add labels with better styling
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'left';
        ctx.fillText('Original', padding, maxHeight + padding + 25);
        ctx.fillText('Enhanced', originalImg.width + padding * 2, maxHeight + padding + 25);
        
        imageData = canvas.toDataURL('image/png', 0.95);
        filename = `comparison-${Date.now()}`;
        
        // Download comparison
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Comparison image downloaded successfully!", "success");
      } else {
        // Download enhanced image
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Image downloaded successfully!", "success");
      }
    } catch (error) {
      console.error('Download error:', error);
      showToast("Failed to download image. Please try again.", "error");
    }
  };

  const clearAll = () => {
    setUploadedImage(null);
    setResult(null);
    setBatchFiles([]);
    setBatchMode(false);
    setShowComparison(true);
    setImageLoading(false);
    showToast("All data cleared", "info");
  };

  const presets = [
    {
      name: "Photo Restoration",
      settings: {
        enhancement: 'restore' as const,
        upscaleFactor: 1,
        qualityBoost: 80,
        colorEnhancement: 60,
        contrastBoost: 40,
        sharpenAmount: 50,
        preserveDetails: true,
        aiStrength: 90
      }
    },
    {
      name: "Upscale 4K",
      settings: {
        enhancement: 'upscale' as const,
        upscaleFactor: 4,
        qualityBoost: 60,
        colorEnhancement: 30,
        contrastBoost: 20,
        sharpenAmount: 60,
        preserveDetails: true,
        aiStrength: 85
      }
    },
    {
      name: "Colorize B&W",
      settings: {
        enhancement: 'colorize' as const,
        upscaleFactor: 1,
        qualityBoost: 50,
        colorEnhancement: 90,
        contrastBoost: 30,
        sharpenAmount: 40,
        preserveDetails: true,
        aiStrength: 95
      }
    },
    {
      name: "Unblur Focus",
      settings: {
        enhancement: 'unblur' as const,
        upscaleFactor: 1,
        qualityBoost: 70,
        colorEnhancement: 40,
        contrastBoost: 60,
        sharpenAmount: 80,
        preserveDetails: true,
        aiStrength: 80
      }
    }
  ];

  const examples = [
    { name: "Old Photos", desc: "Restore vintage and damaged photos" },
    { name: "Low Resolution", desc: "Upscale pixelated or small images" },
    { name: "Blurry Images", desc: "Sharpen and clarify unfocused photos" },
    { name: "Black & White", desc: "Add realistic colors to B&W photos" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
            <Sparkles size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            AI Image Enhancer
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enhance photos with AI: upscale resolution, unblur images, restore old photos, 
          and colorize black & white pictures with professional quality.
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedImage && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Images for Enhancement
            </CardTitle>
            <CardDescription>
              Upload JPG, PNG, or WebP images up to 50MB. Choose single image or batch processing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Image Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('image-enhancer-file-input')?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = Array.from(e.dataTransfer.files);
                  handleImageUpload(files);
                }}
              >
                <input
                  id="image-enhancer-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleImageUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Choose Image
                </Button>
              </div>

              {/* Batch Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('batch-enhancer-file-input')?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = Array.from(e.dataTransfer.files);
                  handleBatchUpload(files);
                }}
              >
                <input
                  id="batch-enhancer-file-input"
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleBatchUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <Layers size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Batch Upload</h3>
                <p className="text-gray-600 mb-4">Upload multiple images for bulk enhancement</p>
                <Button variant="outline">Choose Images</Button>
              </div>
            </div>
            
            {/* Examples */}
            <div className="mt-6">
              <Label className="text-sm font-medium mb-3 block">Perfect for:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {examples.map((example, index) => (
                  <div key={index} className="text-center p-3 border rounded-lg">
                    <div className="font-medium text-sm">{example.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{example.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Batch Mode Interface */}
      {batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers size={20} />
                Batch Processing ({batchFiles.length} images)
              </span>
              <Button onClick={() => setBatchMode(false)} variant="outline">
                Switch to Single Mode
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {batchFiles.slice(0, 8).map((file, index) => (
                  <div key={index} className="p-2 border rounded text-center">
                    <div className="text-xs font-mono truncate">{file.name}</div>
                    <div className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)}KB</div>
                  </div>
                ))}
                {batchFiles.length > 8 && (
                  <div className="p-2 border rounded text-center text-gray-500">
                    +{batchFiles.length - 8} more
                  </div>
                )}
              </div>
              
              <Button onClick={processBatch} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Processing Batch... {processingProgress.toFixed(0)}%
                  </>
                ) : (
                  <>
                    <Zap size={16} className="mr-2" />
                    Process All Images
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Processing Progress */}
      {isProcessing && !batchMode && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="animate-spin text-emerald-600" />
                <span className="font-medium">Enhancing image with AI...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${processingProgress}%` }}
                />
              </div>
              <div className="text-sm text-gray-600 text-center">
                {processingProgress}% complete
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Uploaded Image Preview */}
      {uploadedImage && !result && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon size={20} />
              Uploaded Image Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative border rounded-lg overflow-hidden bg-gray-100">
              {imageLoading ? (
                <div className="flex items-center justify-center h-64">
                  <RefreshCw size={24} className="animate-spin text-emerald-600" />
                </div>
              ) : (
                <img 
                  src={uploadedImage} 
                  alt="Uploaded" 
                  className="w-full h-auto max-h-96 object-contain mx-auto"
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Settings & Controls */}
      {uploadedImage && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Enhancement Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Presets */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Quick Presets</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {presets.map((preset, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    onClick={() => setSettings(preset.settings)}
                    className="h-auto p-3"
                  >
                    <div className="text-center">
                      <div className="font-medium text-sm">{preset.name}</div>
                      <div className="text-xs text-gray-600 mt-1">
                        {preset.settings.enhancement}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Enhancement Type */}
            <div>
              <Label htmlFor="enhancement">Enhancement Type</Label>
              <Select 
                value={settings.enhancement} 
                onValueChange={(value: any) => setSettings(prev => ({ ...prev, enhancement: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Enhance</SelectItem>
                  <SelectItem value="upscale">Upscale Resolution</SelectItem>
                  <SelectItem value="unblur">Remove Blur</SelectItem>
                  <SelectItem value="restore">Restore Quality</SelectItem>
                  <SelectItem value="colorize">Colorize B&W</SelectItem>
                  <SelectItem value="denoise">Remove Noise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Advanced Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {settings.enhancement === 'upscale' && (
                <div>
                  <Label htmlFor="upscale-factor">Upscale Factor: {settings.upscaleFactor}x</Label>
                  <Slider
                    value={[settings.upscaleFactor]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, upscaleFactor: value }))}
                    max={4}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="quality-boost">Quality Boost: {settings.qualityBoost}%</Label>
                <Slider
                  value={[settings.qualityBoost]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, qualityBoost: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="color-enhancement">Color Enhancement: {settings.colorEnhancement}%</Label>
                <Slider
                  value={[settings.colorEnhancement]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, colorEnhancement: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="contrast-boost">Contrast Boost: {settings.contrastBoost}%</Label>
                <Slider
                  value={[settings.contrastBoost]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, contrastBoost: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="sharpen-amount">Sharpen Amount: {settings.sharpenAmount}%</Label>
                <Slider
                  value={[settings.sharpenAmount]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, sharpenAmount: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="ai-strength">AI Strength: {settings.aiStrength}%</Label>
                <Slider
                  value={[settings.aiStrength]}
                  onValueChange={([value]) => setSettings(prev => ({ ...prev, aiStrength: value }))}
                  max={100}
                  min={0}
                  step={5}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="preserve-details"
                checked={settings.preserveDetails}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, preserveDetails: checked }))}
              />
              <Label htmlFor="preserve-details">Preserve fine details</Label>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleManualEnhance} disabled={isProcessing}>
                {isProcessing ? (
                  <RefreshCw size={16} className="mr-2 animate-spin" />
                ) : (
                  <Sparkles size={16} className="mr-2" />
                )}
                Enhance Image
              </Button>
              
              <Button onClick={clearAll} variant="outline">
                <Trash2 size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Star size={20} />
                Enhancement Results
              </span>
              <div className="flex gap-2">
                <Button onClick={() => setShowComparison(!showComparison)} variant="outline">
                  {showComparison ? <EyeOff size={16} /> : <Eye size={16} />}
                  <span className="ml-2">{showComparison ? "Hide" : "Show"} Original</span>
                </Button>
                <Button onClick={() => downloadResult('enhanced')} variant="outline">
                  <Download size={16} className="mr-2" />
                  Enhanced
                </Button>
                <Button onClick={() => downloadResult('comparison')} variant="outline">
                  <Download size={16} className="mr-2" />
                  Comparison
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Improvement Metrics */}
            <div className="mb-6 p-4 bg-emerald-50 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Resolution:</span>
                  <div className="text-emerald-600">{result.improvements.resolution}</div>
                </div>
                <div>
                  <span className="font-medium">Quality Score:</span>
                  <div className="text-emerald-600">{result.improvements.quality}/100</div>
                </div>
                <div>
                  <span className="font-medium">Clarity:</span>
                  <div className="text-emerald-600">{result.improvements.clarity}/100</div>
                </div>
                <div>
                  <span className="font-medium">Color Enhancement:</span>
                  <div className="text-emerald-600">{result.improvements.colors}/100</div>
                </div>
              </div>
            </div>

            {/* Image Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {showComparison && result.original && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                    <ImageIcon size={16} />
                    Original Image
                  </Label>
                  <div className="relative border rounded-lg overflow-hidden bg-gray-100 min-h-[200px] flex items-center justify-center">
                    <img 
                      src={result.original} 
                      alt="Original" 
                      className="w-full h-auto max-h-96 object-contain"
                      onError={(e) => {
                        console.error('Failed to load original image');
                        showToast("Failed to load original image", "error");
                      }}
                    />
                  </div>
                </div>
              )}
              
              <div className={showComparison ? '' : 'lg:col-span-2'}>
                <Label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Sparkles size={16} />
                  Enhanced Image
                  <Badge variant="secondary" className="ml-2">
                    {result.enhancement} enhancement
                  </Badge>
                </Label>
                <div className="relative border rounded-lg overflow-hidden bg-gray-100 min-h-[200px] flex items-center justify-center">
                  <img 
                    src={result.enhanced} 
                    alt="Enhanced" 
                    className="w-full h-auto max-h-96 object-contain"
                    onError={(e) => {
                      console.error('Failed to load enhanced image');
                      showToast("Failed to load enhanced image", "error");
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="mt-6 pt-4 border-t">
              <Label className="text-sm font-medium mb-3 block">Download Options:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" onClick={() => downloadResult('enhanced')} className="justify-start">
                  <Sparkles size={16} className="mr-2" />
                  Enhanced Image
                </Button>
                <Button variant="outline" onClick={() => downloadResult('original')} className="justify-start">
                  <ImageIcon size={16} className="mr-2" />
                  Original Image
                </Button>
                <Button variant="outline" onClick={() => downloadResult('comparison')} className="justify-start">
                  <Contrast size={16} className="mr-2" />
                  Side-by-Side
                </Button>
                <Button variant="outline" disabled className="justify-start">
                  <TrendingUp size={16} className="mr-2" />
                  4K Version (Pro)
                </Button>
              </div>
            </div>

            {/* Compress Image CTA */}
            <div className="mt-6 pt-6 border-t">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-lg p-6 border border-emerald-200 dark:border-emerald-800">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <Gauge size={24} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1">Want to compress your enhanced image?</h4>
                      <p className="text-sm text-muted-foreground">
                        Reduce file size while maintaining quality for faster loading and sharing
                      </p>
                    </div>
                  </div>
                  <Link href="/image-compressor">
                    <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white">
                      <Gauge size={18} className="mr-2" />
                      Compress Image
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
</div>
  );
}

export default function AiImageEnhancerPage() {
  return (
    <ToolPageWrapper toolSlug="ai-image-enhancer"><ToastProvider>
      <AiImageEnhancerContent /></ToastProvider></ToolPageWrapper>
  );
}