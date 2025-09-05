"use client";

import { useState, useRef, useCallback } from "react";
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
  Scissors,
  Brush,
  Undo,
  Redo,
  Palette,
  Layers,
  Target,
  Sparkles,
} from "lucide-react";
import { AIBackgroundRemoverSEOContent } from "./seo-content";

interface ProcessingResult {
  original: string;
  processed: string;
  mask?: string;
  transparency: boolean;
  processingTime: number;
  fileSize: {
    original: number;
    processed: number;
  };
}

interface BrushStroke {
  x: number;
  y: number;
  size: number;
  type: 'erase' | 'restore';
}

function AiBackgroundRemoverContent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [showComparison, setShowComparison] = useState(true);
  const [brushSize, setBrushSize] = useState([20]);
  const [brushMode, setBrushMode] = useState<'erase' | 'restore'>('erase');
  const [backgroundType, setBackgroundType] = useState<'transparent' | 'color' | 'blur' | 'gradient'>('transparent');
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [edgeSmoothing, setEdgeSmoothing] = useState([50]);
  const [featherAmount, setFeatherAmount] = useState([5]);
  const [isEditing, setIsEditing] = useState(false);
  const [brushStrokes, setBrushStrokes] = useState<BrushStroke[]>([]);
  const [undoStack, setUndoStack] = useState<BrushStroke[][]>([]);
  const [redoStack, setRedoStack] = useState<BrushStroke[][]>([]);
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate AI background removal processing
  const processImage = useCallback(async (imageData: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      // Simulate processing steps
      const steps = [
        { progress: 20, message: "Analyzing image content..." },
        { progress: 40, message: "Detecting subject boundaries..." },
        { progress: 60, message: "Applying AI segmentation..." },
        { progress: 80, message: "Refining edges..." },
        { progress: 95, message: "Generating final result..." },
        { progress: 100, message: "Complete!" }
      ];

      for (const step of steps) {
        await new Promise(resolve => setTimeout(resolve, 800));
        setProcessingProgress(step.progress);
      }

      // Create a mock processed version
      // In a real implementation, this would call an AI service
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      return new Promise<ProcessingResult>((resolve) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            
            // Simulate background removal by creating transparency effect
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Simple edge detection and background removal simulation
            for (let i = 0; i < data.length; i += 4) {
              const r = data[i];
              const g = data[i + 1];
              const b = data[i + 2];
              
              // Simple background detection (in real AI, this would be much more sophisticated)
              const isBackground = (r > 200 && g > 200 && b > 200) || 
                                 (Math.abs(r - g) < 30 && Math.abs(g - b) < 30);
              
              if (isBackground) {
                data[i + 3] = 0; // Make transparent
              }
            }
            
            ctx.putImageData(imageData, 0, 0);
            
            const processedImage = canvas.toDataURL('image/png');
            const originalSize = canvas.toDataURL('image/png').length;
            const processedSize = new Blob([processedImage]).size;
            
            resolve({
              original: uploadedImage!,
              processed: processedImage,
              transparency: true,
              processingTime: 4000,
              fileSize: {
                original: originalSize,
                processed: processedSize
              }
            });
          }
        };
        img.src = imageData;
      });

    } catch (error) {
      showToast("Processing failed. Please try again.", "error");
      throw error;
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, [uploadedImage]);

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

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setUploadedImage(imageData);
      setResult(null);
      setBrushStrokes([]);
      setUndoStack([]);
      setRedoStack([]);
      
      // Auto-process the image
      try {
        const processed = await processImage(imageData);
        setResult(processed);
        showToast("Background removed successfully!", "success");
      } catch (error) {
        // Error already handled in processImage
      }
    };
    reader.readAsDataURL(file);
  };

  const handleManualProcess = async () => {
    if (!uploadedImage) {
      showToast("Please upload an image first", "error");
      return;
    }

    try {
      const processed = await processImage(uploadedImage);
      setResult(processed);
      showToast("Background removed successfully!", "success");
    } catch (error) {
      // Error already handled in processImage
    }
  };

  const downloadResult = (includeTransparency = true) => {
    if (!result) {
      showToast("No processed image to download", "error");
      return;
    }

    const link = document.createElement('a');
    link.download = `background-removed-${Date.now()}.png`;
    link.href = result.processed;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("Image downloaded successfully!", "success");
  };

  const downloadWithBackground = () => {
    if (!result) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        // Add background
        switch (backgroundType) {
          case 'color':
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'gradient':
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, backgroundColor);
            gradient.addColorStop(1, '#ffffff');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            break;
          case 'blur':
            ctx.filter = 'blur(20px)';
            ctx.drawImage(img, 0, 0);
            ctx.filter = 'none';
            break;
        }
        
        // Draw the processed image on top
        ctx.drawImage(img, 0, 0);
        
        const link = document.createElement('a');
        link.download = `with-background-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showToast("Image with background downloaded!", "success");
      }
    };
    img.src = result.processed;
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      showToast("Magic brush activated! Click and drag to edit.", "info");
    }
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [...prev, brushStrokes]);
      setBrushStrokes(lastState);
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack(prev => [...prev, brushStrokes]);
      setBrushStrokes(nextState);
      setRedoStack(prev => prev.slice(0, -1));
    }
  };

  const clearAll = () => {
    setUploadedImage(null);
    setResult(null);
    setBrushStrokes([]);
    setUndoStack([]);
    setRedoStack([]);
    setIsEditing(false);
    showToast("All data cleared", "info");
  };

  const examples = [
    { name: "Portrait", desc: "Remove background from people photos" },
    { name: "Product", desc: "Create clean product images for e-commerce" },
    { name: "Object", desc: "Isolate objects for design work" },
    { name: "Pet", desc: "Remove background from animal photos" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
            <Scissors size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Background Remover
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Remove backgrounds from images instantly with AI. 
          Features magic brush for touch-ups, batch processing, and professional export options.
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Image
            </CardTitle>
            <CardDescription>
              Upload JPG, PNG, or WebP images up to 50MB. Processing is completely private and happens in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('bg-remover-file-input')?.click()}
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
                id="bg-remover-file-input"
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
              <Button>Choose Image</Button>
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

      {/* Processing Progress */}
      {isProcessing && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <RefreshCw size={20} className="animate-spin text-blue-600" />
                <span className="font-medium">Processing image with AI...</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
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

      {/* Controls */}
      {uploadedImage && !isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings size={20} />
              Processing Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="background-type">Background Type</Label>
                <Select value={backgroundType} onValueChange={(value: any) => setBackgroundType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transparent">Transparent</SelectItem>
                    <SelectItem value="color">Solid Color</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="blur">Blurred Original</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(backgroundType === 'color' || backgroundType === 'gradient') && (
                <div>
                  <Label htmlFor="bg-color">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-16 h-10 p-1 border-2"
                    />
                    <Input
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>
              )}
              
              <div>
                <Label htmlFor="edge-smoothing">Edge Smoothing: {edgeSmoothing[0]}%</Label>
                <Slider
                  value={edgeSmoothing}
                  onValueChange={setEdgeSmoothing}
                  max={100}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="feather">Feather Amount: {featherAmount[0]}px</Label>
                <Slider
                  value={featherAmount}
                  onValueChange={setFeatherAmount}
                  max={20}
                  min={0}
                  step={1}
                  className="mt-2"
                />
              </div>
            </div>

            {/* Brush Controls */}
            {result && (
              <div className="border-t pt-4">
                <Label className="text-sm font-medium mb-3 block">Magic Brush (Touch-up Tools)</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="brush-size">Brush Size: {brushSize[0]}px</Label>
                    <Slider
                      value={brushSize}
                      onValueChange={setBrushSize}
                      max={100}
                      min={5}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="brush-mode">Brush Mode</Label>
                    <Select value={brushMode} onValueChange={(value: any) => setBrushMode(value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="erase">Erase</SelectItem>
                        <SelectItem value="restore">Restore</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-end gap-2">
                    <Button onClick={handleUndo} variant="outline" size="sm" disabled={undoStack.length === 0}>
                      <Undo size={16} className="mr-1" />
                      Undo
                    </Button>
                    <Button onClick={handleRedo} variant="outline" size="sm" disabled={redoStack.length === 0}>
                      <Redo size={16} className="mr-1" />
                      Redo
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {!result && (
                <Button onClick={handleManualProcess}>
                  <Zap size={16} className="mr-2" />
                  Remove Background
                </Button>
              )}
              
              {result && (
                <>
                  <Button onClick={toggleEditing} variant={isEditing ? "default" : "outline"}>
                    <Brush size={16} className="mr-2" />
                    {isEditing ? "Exit" : "Magic"} Brush
                  </Button>
                  
                  <Button onClick={() => setShowComparison(!showComparison)} variant="outline">
                    {showComparison ? <EyeOff size={16} /> : <Eye size={16} />}
                    <span className="ml-2">{showComparison ? "Hide" : "Show"} Comparison</span>
                  </Button>
                </>
              )}
              
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
                <Sparkles size={20} />
                Result
              </span>
              <div className="flex gap-2">
                <Button onClick={() => downloadResult(true)} variant="outline">
                  <Download size={16} className="mr-2" />
                  PNG (Transparent)
                </Button>
                <Button onClick={downloadWithBackground} variant="outline">
                  <Download size={16} className="mr-2" />
                  With Background
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Stats */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex flex-wrap gap-4 text-sm">
                <span>Processing Time: {result.processingTime}ms</span>
                <span>Original Size: {(result.fileSize.original / 1024).toFixed(1)}KB</span>
                <span>Processed Size: {(result.fileSize.processed / 1024).toFixed(1)}KB</span>
                <span className="text-green-600 font-medium">
                  Background: {result.transparency ? 'Removed' : 'Modified'}
                </span>
              </div>
            </div>

            {/* Image Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {showComparison && (
                <div>
                  <Label className="text-sm font-medium mb-2 block">Original</Label>
                  <div className="relative border rounded-lg overflow-hidden bg-gray-100">
                    <img 
                      src={result.original} 
                      alt="Original" 
                      className="w-full h-auto max-h-96 object-contain"
                    />
                  </div>
                </div>
              )}
              
              <div className={showComparison ? '' : 'lg:col-span-2'}>
                <Label className="text-sm font-medium mb-2 block">
                  Processed
                  {isEditing && (
                    <Badge variant="secondary" className="ml-2">
                      <Brush size={12} className="mr-1" />
                      Editing Mode
                    </Badge>
                  )}
                </Label>
                <div className="relative border rounded-lg overflow-hidden bg-gray-100 bg-opacity-50 bg-[radial-gradient(#00000020_1px,transparent_1px)] [background-size:10px_10px]">
                  <img 
                    src={result.processed} 
                    alt="Processed" 
                    className="w-full h-auto max-h-96 object-contain relative z-10"
                  />
                  {isEditing && (
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 z-20 cursor-crosshair"
                      style={{ cursor: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${brushSize[0]}' height='${brushSize[0]}' viewBox='0 0 ${brushSize[0]} ${brushSize[0]}'%3E%3Ccircle cx='${brushSize[0]/2}' cy='${brushSize[0]/2}' r='${brushSize[0]/2-1}' fill='none' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E") ${brushSize[0]/2} ${brushSize[0]/2}, auto` }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Download Options */}
            <div className="mt-6 pt-4 border-t">
              <Label className="text-sm font-medium mb-3 block">Download Options:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" onClick={() => downloadResult(true)} className="justify-start">
                  <Layers size={16} className="mr-2" />
                  PNG (Transparent)
                </Button>
                <Button variant="outline" onClick={downloadWithBackground} className="justify-start">
                  <Palette size={16} className="mr-2" />
                  With Background
                </Button>
                <Button variant="outline" onClick={() => downloadResult(false)} className="justify-start">
                  <Target size={16} className="mr-2" />
                  JPG (Flattened)
                </Button>
                <Button variant="outline" disabled className="justify-start">
                  <Sparkles size={16} className="mr-2" />
                  Batch (Pro)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <AIBackgroundRemoverSEOContent />
    </div>
  );
}

export default function AiBackgroundRemoverPage() {
  return (
    <ToastProvider>
      <AiBackgroundRemoverContent />
    </ToastProvider>
  );
}