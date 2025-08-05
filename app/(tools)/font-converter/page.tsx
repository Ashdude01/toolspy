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
import { Textarea } from "@/components/ui/textarea";
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
  Upload,
  Settings,
  Zap,
  RefreshCw,
  Type,
  Eye,
  Info,
  RotateCcw,
  Layers,
  CheckCircle,
  Clock,
  Sparkles,
  Palette,
  Heart,
  Target,
  Globe,
  Code,
  Smartphone,
  Monitor,
  Brain,
  Star,
} from "lucide-react";
import { FontConverterSEOContent } from "./seo-content";

interface FontInfo {
  family: string;
  style: string;
  weight: string;
  version: string;
  format: string;
  size: number;
  license: string;
  designer: string;
  foundry: string;
  glyphCount: number;
  unicodeRanges: string[];
}

interface ConversionJob {
  id: string;
  fileName: string;
  fileSize: number;
  originalFormat: string;
  targetFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  outputUrl?: string;
  outputSize?: number;
  fontInfo?: FontInfo;
  processingTime?: number;
}

interface ConversionSettings {
  webOptimize: boolean;
  subsetting: boolean;
  compression: boolean;
  hinting: boolean;
  includeMetadata: boolean;
  compressionLevel: number;
  unicodeRanges: string[];
  outputQuality: string;
}

interface FontPairing {
  primary: string;
  secondary: string;
  category: string;
  description: string;
  useCase: string;
  example: string;
}

function FontConverterContent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<ConversionJob | null>(null);
  const [targetFormat, setTargetFormat] = useState('woff2');
  const [isConverting, setIsConverting] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [previewSize, setPreviewSize] = useState(24);
  const [showPairings, setShowPairings] = useState(false);
  const [fontPairings, setFontPairings] = useState<FontPairing[]>([]);
  
  const [settings, setSettings] = useState<ConversionSettings>({
    webOptimize: true,
    subsetting: false,
    compression: true,
    hinting: true,
    includeMetadata: true,
    compressionLevel: 80,
    unicodeRanges: ['latin'],
    outputQuality: 'high'
  });
  
  const { showToast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Font format configurations
  const fontFormats = {
    ttf: {
      name: 'TrueType',
      extension: '.ttf',
      description: 'Universal desktop format',
      features: ['Desktop apps', 'Print design', 'High quality'],
      webCompatible: false
    },
    otf: {
      name: 'OpenType',
      extension: '.otf',
      description: 'Advanced typography features',
      features: ['Professional design', 'Advanced features', 'Vector curves'],
      webCompatible: false
    },
    woff: {
      name: 'WOFF',
      extension: '.woff',
      description: 'Web font standard',
      features: ['Web optimized', 'Compressed', 'Browser support'],
      webCompatible: true
    },
    woff2: {
      name: 'WOFF2',
      extension: '.woff2',
      description: 'Modern web font format',
      features: ['Best compression', 'Modern browsers', 'Fast loading'],
      webCompatible: true
    },
    eot: {
      name: 'EOT',
      extension: '.eot',
      description: 'Legacy Internet Explorer',
      features: ['IE compatibility', 'Legacy support', 'Basic features'],
      webCompatible: true
    },
    svg: {
      name: 'SVG Font',
      extension: '.svg',
      description: 'Vector-based font format',
      features: ['Scalable', 'Vector graphics', 'Legacy iOS'],
      webCompatible: true
    }
  };

  const qualityPresets = {
    ultra: { name: 'Ultra (100%)', compression: 100, hinting: true, metadata: true },
    high: { name: 'High (80%)', compression: 80, hinting: true, metadata: true },
    medium: { name: 'Medium (60%)', compression: 60, hinting: false, metadata: false },
    web: { name: 'Web Optimized', compression: 40, hinting: false, metadata: false }
  };

  const unicodeRanges = [
    { code: 'latin', name: 'Latin (A-Z, a-z)', description: 'Basic Latin characters' },
    { code: 'latin-ext', name: 'Latin Extended', description: 'Extended Latin with accents' },
    { code: 'cyrillic', name: 'Cyrillic', description: 'Russian, Bulgarian, Serbian' },
    { code: 'greek', name: 'Greek', description: 'Greek alphabet' },
    { code: 'hebrew', name: 'Hebrew', description: 'Hebrew script' },
    { code: 'arabic', name: 'Arabic', description: 'Arabic script' },
    { code: 'chinese', name: 'Chinese', description: 'Chinese characters' },
    { code: 'japanese', name: 'Japanese', description: 'Hiragana, Katakana, Kanji' },
    { code: 'korean', name: 'Korean', description: 'Hangul script' }
  ];

  // Generate mock font info
  const generateFontInfo = (fileName: string): FontInfo => {
    const families = ['Arial', 'Helvetica', 'Times', 'Georgia', 'Roboto', 'Open Sans', 'Lato', 'Montserrat'];
    const styles = ['Regular', 'Italic', 'Bold', 'Light', 'Medium', 'Black'];
    const weights = ['400', '300', '500', '600', '700', '900'];
    const foundries = ['Google Fonts', 'Adobe', 'Monotype', 'FontShop', 'MyFonts', 'Font Bureau'];
    
    return {
      family: families[Math.floor(Math.random() * families.length)],
      style: styles[Math.floor(Math.random() * styles.length)],
      weight: weights[Math.floor(Math.random() * weights.length)],
      version: `${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
      format: fileName.split('.').pop()?.toUpperCase() || 'TTF',
      size: Math.floor(Math.random() * 500) + 50, // 50-550 KB
      license: ['SIL OFL', 'Commercial', 'GPL', 'MIT', 'Proprietary'][Math.floor(Math.random() * 5)],
      designer: ['John Doe', 'Jane Smith', 'Design Studio', 'Typography Inc.'][Math.floor(Math.random() * 4)],
      foundry: foundries[Math.floor(Math.random() * foundries.length)],
      glyphCount: Math.floor(Math.random() * 1000) + 200,
      unicodeRanges: ['Latin', 'Latin Extended', 'Punctuation', 'Numbers']
    };
  };

  // Generate AI font pairings
  const generateFontPairings = (fontFamily: string): FontPairing[] => {
    const pairings = [
      {
        primary: fontFamily,
        secondary: 'Georgia',
        category: 'Editorial',
        description: 'Perfect for article headlines and body text',
        useCase: 'Blogs, magazines, news sites',
        example: 'Header + readable body text'
      },
      {
        primary: fontFamily,
        secondary: 'Roboto',
        category: 'Modern',
        description: 'Clean, contemporary design pairing',
        useCase: 'Corporate websites, apps',
        example: 'Professional and accessible'
      },
      {
        primary: fontFamily,
        secondary: 'Playfair Display',
        category: 'Elegant',
        description: 'Sophisticated contrast for luxury brands',
        useCase: 'Fashion, lifestyle, premium',
        example: 'Elegant headers with serif body'
      },
      {
        primary: fontFamily,
        secondary: 'Source Sans Pro',
        category: 'Technical',
        description: 'Ideal for documentation and interfaces',
        useCase: 'Documentation, dashboards',
        example: 'Clear hierarchy and readability'
      }
    ];
    
    return pairings.slice(0, 3);
  };

  // Simulate font conversion
  const processConversion = useCallback(async (job: ConversionJob) => {
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { ...j, status: 'processing', progress: 0 } : j
    ));

    // Simulate conversion progress
    const steps = [
      { progress: 15, message: "Loading font file..." },
      { progress: 30, message: "Analyzing font structure..." },
      { progress: 45, message: "Extracting glyphs..." },
      { progress: 60, message: "Applying optimization..." },
      { progress: 75, message: "Converting to target format..." },
      { progress: 90, message: "Finalizing compression..." },
      { progress: 100, message: "Conversion complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      setConversionJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: step.progress } : j
      ));
    }

    // Complete conversion
    const compressionRatio = settings.webOptimize ? 0.6 : 0.8;
    const outputSize = Math.floor(job.fileSize * compressionRatio);
    const processingTime = Math.floor(Math.random() * 3000) + 2000;
    
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { 
        ...j, 
        status: 'completed', 
        progress: 100,
        outputUrl: URL.createObjectURL(new Blob(['converted-font'], { type: 'font/woff2' })),
        outputSize,
        processingTime
      } : j
    ));

    showToast(`${job.fileName} converted successfully to ${job.targetFormat.toUpperCase()}!`, "success");
  }, [settings]);

  const handleFileUpload = (files: File[]) => {
    const validExtensions = ['.ttf', '.otf', '.woff', '.woff2', '.eot'];
    const validFiles = files.filter(file => 
      validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    
    if (validFiles.length === 0) {
      showToast("Please upload valid font files (TTF, OTF, WOFF, WOFF2, EOT)", "error");
      return;
    }

    setUploadedFiles(validFiles);
    setBatchMode(validFiles.length > 1);

    // Create conversion jobs
    const jobs: ConversionJob[] = validFiles.map(file => {
      const originalFormat = file.name.split('.').pop()?.toLowerCase() || 'ttf';
      const fontInfo = generateFontInfo(file.name);
      
      return {
        id: Date.now() + Math.random().toString(),
        fileName: file.name,
        fileSize: file.size,
        originalFormat,
        targetFormat,
        status: 'pending',
        progress: 0,
        fontInfo
      };
    });

    setConversionJobs(jobs);
    
    // Generate font pairings for single file
    if (validFiles.length === 1 && jobs[0].fontInfo) {
      const pairings = generateFontPairings(jobs[0].fontInfo.family);
      setFontPairings(pairings);
      setSelectedJob(jobs[0]);
    }

    showToast(`${validFiles.length} font(s) ready for conversion`, "success");
  };

  const startConversion = async () => {
    if (conversionJobs.length === 0) {
      showToast("No fonts to convert", "error");
      return;
    }

    setIsConverting(true);

    if (batchMode) {
      // Process all files
      for (const job of conversionJobs) {
        if (job.status === 'pending') {
          await processConversion(job);
        }
      }
    } else {
      // Process single file
      const pendingJob = conversionJobs.find(job => job.status === 'pending');
      if (pendingJob) {
        await processConversion(pendingJob);
      }
    }

    setIsConverting(false);
  };

  const downloadFile = (job: ConversionJob) => {
    if (job.outputUrl) {
      const extension = fontFormats[job.targetFormat as keyof typeof fontFormats]?.extension || `.${job.targetFormat}`;
      const a = document.createElement('a');
      a.href = job.outputUrl;
      a.download = `${job.fileName.split('.')[0]}${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("Font downloaded successfully", "success");
    }
  };

  const downloadAll = () => {
    const completedJobs = conversionJobs.filter(job => job.status === 'completed' && job.outputUrl);
    completedJobs.forEach(job => downloadFile(job));
    showToast(`Downloaded ${completedJobs.length} fonts`, "success");
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setConversionJobs([]);
    setSelectedJob(null);
    setBatchMode(false);
    setShowPreview(false);
    setShowPairings(false);
    setFontPairings([]);
    showToast("All fonts cleared", "info");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateWebFontCSS = (job: ConversionJob) => {
    if (!job.fontInfo) return '';
    
    return `@font-face {
  font-family: '${job.fontInfo.family}';
  src: url('${job.fileName.split('.')[0]}.${job.targetFormat}') format('${job.targetFormat}');
  font-weight: ${job.fontInfo.weight};
  font-style: ${job.fontInfo.style.toLowerCase()};
  font-display: swap;
}

/* Usage example */
.custom-font {
  font-family: '${job.fontInfo.family}', sans-serif;
}`;
  };

  const copyCSS = async (job: ConversionJob) => {
    const css = generateWebFontCSS(job);
    try {
      await navigator.clipboard.writeText(css);
      showToast("CSS code copied to clipboard", "success");
    } catch (error) {
      showToast("Failed to copy CSS", "error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl text-white">
            <Type size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Font Converter
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert fonts between TTF, OTF, WOFF, WOFF2 formats with preview functionality, 
          AI-powered font pairings, and web optimization features.
        </p>
      </div>

      {/* Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Font Format Selection</CardTitle>
          <CardDescription>
            Choose your target format and see compatibility information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(fontFormats).map(([format, config]) => (
              <Button
                key={format}
                variant={targetFormat === format ? "default" : "outline"}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  targetFormat === format ? 'bg-pink-600 hover:bg-pink-700' : ''
                }`}
                onClick={() => setTargetFormat(format)}
              >
                <div className={`text-lg font-bold ${targetFormat === format ? 'text-white' : 'text-pink-600'}`}>
                  {config.name}
                </div>
                <div className={`text-xs ${targetFormat === format ? 'text-pink-100' : 'text-gray-600'}`}>
                  {config.description}
                </div>
                {config.webCompatible && (
                  <Badge 
                    variant={targetFormat === format ? "secondary" : "outline"} 
                    className="text-xs"
                  >
                    Web
                  </Badge>
                )}
              </Button>
            ))}
          </div>
          
          {/* Format Features */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium mb-2">
              {fontFormats[targetFormat as keyof typeof fontFormats]?.name} Features:
            </div>
            <div className="flex flex-wrap gap-2">
              {fontFormats[targetFormat as keyof typeof fontFormats]?.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      {uploadedFiles.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Font Files
            </CardTitle>
            <CardDescription>
              Upload TTF, OTF, WOFF, WOFF2, or EOT font files for conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-pink-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('font-file-input')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload(files);
              }}
            >
              <input
                id="font-file-input"
                type="file"
                accept=".ttf,.otf,.woff,.woff2,.eot"
                multiple={true}
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleFileUpload(files);
                  }
                }}
                className="hidden"
              />
              <Type size={48} className="mx-auto text-pink-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your font files here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(fontFormats).slice(0, 4).map(format => (
                  <Badge key={format.name} variant="secondary">
                    {format.name}
                  </Badge>
                ))}
                <Badge variant="outline">+2 more</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Area */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings and Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Conversion Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Info */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm space-y-1">
                  <div><strong>Files:</strong> {uploadedFiles.length}</div>
                  <div><strong>Total Size:</strong> {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}</div>
                  <div><strong>Target Format:</strong> {fontFormats[targetFormat as keyof typeof fontFormats]?.name}</div>
                </div>
              </div>

              {/* Quality Preset */}
              <div>
                <Label>Quality Preset</Label>
                <Select 
                  value={settings.outputQuality} 
                  onValueChange={(value) => {
                    const preset = qualityPresets[value as keyof typeof qualityPresets];
                    setSettings(prev => ({ 
                      ...prev, 
                      outputQuality: value,
                      compressionLevel: preset.compression,
                      hinting: preset.hinting,
                      includeMetadata: preset.metadata
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(qualityPresets).map(([key, preset]) => (
                      <SelectItem key={key} value={key}>
                        {preset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Optimization Settings */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="webOptimize"
                      checked={settings.webOptimize}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, webOptimize: checked }))}
                    />
                    <Label htmlFor="webOptimize" className="text-sm">Web optimize</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="subsetting"
                      checked={settings.subsetting}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, subsetting: checked }))}
                    />
                    <Label htmlFor="subsetting" className="text-sm">Subsetting</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="compression"
                      checked={settings.compression}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, compression: checked }))}
                    />
                    <Label htmlFor="compression" className="text-sm">Compression</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="hinting"
                      checked={settings.hinting}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, hinting: checked }))}
                    />
                    <Label htmlFor="hinting" className="text-sm">Hinting</Label>
                  </div>
                </div>

                {/* Compression Level */}
                <div>
                  <Label>Compression Level: {settings.compressionLevel}%</Label>
                  <Slider
                    value={[settings.compressionLevel]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, compressionLevel: value }))}
                    max={100}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={startConversion} disabled={isConverting}>
                  {isConverting ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={16} className="mr-2" />
                  )}
                  {batchMode ? `Convert All (${uploadedFiles.length})` : 'Convert Font'}
                </Button>
                
                {!batchMode && selectedJob && (
                  <>
                    <Button 
                      onClick={() => setShowPreview(!showPreview)} 
                      variant="outline"
                    >
                      <Eye size={16} className="mr-2" />
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </Button>
                    
                    <Button 
                      onClick={() => setShowPairings(!showPairings)} 
                      variant="outline"
                    >
                      <Sparkles size={16} className="mr-2" />
                      AI Pairings
                    </Button>
                  </>
                )}
                
                <Button onClick={clearAll} variant="outline">
                  <RotateCcw size={16} className="mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Font Info and Preview */}
          {selectedJob && selectedJob.fontInfo && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info size={20} />
                  Font Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Font Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-gray-700">Family</div>
                    <div>{selectedJob.fontInfo.family}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Style</div>
                    <div>{selectedJob.fontInfo.style}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Weight</div>
                    <div>{selectedJob.fontInfo.weight}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Format</div>
                    <div>{selectedJob.fontInfo.format}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Glyphs</div>
                    <div>{selectedJob.fontInfo.glyphCount}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">License</div>
                    <div>{selectedJob.fontInfo.license}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Designer</div>
                    <div>{selectedJob.fontInfo.designer}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-700">Foundry</div>
                    <div>{selectedJob.fontInfo.foundry}</div>
                  </div>
                </div>

                {/* Unicode Ranges */}
                <div>
                  <div className="font-semibold text-gray-700 mb-2">Unicode Support</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedJob.fontInfo.unicodeRanges.map((range, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {range}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Font Preview */}
                {showPreview && (
                  <div className="space-y-3">
                    <div className="font-semibold text-gray-700">Preview</div>
                    
                    {/* Preview Controls */}
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="previewText" className="text-sm">Preview Text</Label>
                        <Input
                          id="previewText"
                          value={previewText}
                          onChange={(e) => setPreviewText(e.target.value)}
                          placeholder="Enter preview text"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-sm">Font Size: {previewSize}px</Label>
                        <Slider
                          value={[previewSize]}
                          onValueChange={([value]) => setPreviewSize(value)}
                          max={72}
                          min={12}
                          step={2}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    {/* Preview Display */}
                    <div 
                      className="p-4 border rounded-lg bg-white"
                      style={{ 
                        fontFamily: selectedJob.fontInfo.family + ', sans-serif',
                        fontSize: `${previewSize}px`,
                        fontWeight: selectedJob.fontInfo.weight,
                        fontStyle: selectedJob.fontInfo.style.toLowerCase()
                      }}
                    >
                      {previewText}
                    </div>
                    
                    {/* Size Samples */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-700">Size Samples</div>
                      {[16, 24, 32, 48].map(size => (
                        <div 
                          key={size}
                          className="flex items-center gap-3"
                        >
                          <span className="text-xs text-gray-500 w-8">{size}px</span>
                          <div 
                                                        style={{
                              fontFamily: selectedJob.fontInfo?.family ? selectedJob.fontInfo.family + ', sans-serif' : 'sans-serif',
                              fontSize: `${size}px`,
                              fontWeight: selectedJob.fontInfo?.weight || 'normal'
                            }}
                          >
                            The quick brown fox
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* AI Font Pairings */}
      {showPairings && fontPairings.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain size={20} />
              AI-Powered Font Pairings
            </CardTitle>
            <CardDescription>
              Discover perfect font combinations suggested by AI for your design projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fontPairings.map((pairing, index) => (
                <Card key={index} className="border-2 hover:border-pink-200 transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart size={16} className="text-pink-500" />
                      {pairing.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="text-2xl font-bold" style={{ fontFamily: pairing.primary + ', sans-serif' }}>
                        {pairing.primary}
                      </div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: pairing.secondary + ', serif' }}>
                        paired with {pairing.secondary}
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      {pairing.description}
                    </div>
                    
                    <div>
                      <Badge variant="secondary" className="text-xs">
                        {pairing.useCase}
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Example: {pairing.example}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Conversion Progress */}
      {conversionJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers size={20} />
                Conversion Progress
              </span>
              {conversionJobs.some(job => job.status === 'completed') && (
                <Button onClick={downloadAll} variant="outline" size="sm">
                  <Download size={16} className="mr-1" />
                  Download All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{job.fileName}</div>
                    <div className="flex items-center gap-2">
                      {job.status === 'pending' && (
                        <Badge variant="secondary">
                          <Clock size={12} className="mr-1" />
                          Pending
                        </Badge>
                      )}
                      {job.status === 'processing' && (
                        <Badge className="bg-blue-500">
                          <RefreshCw size={12} className="mr-1 animate-spin" />
                          Processing
                        </Badge>
                      )}
                      {job.status === 'completed' && (
                        <Badge className="bg-green-500">
                          <CheckCircle size={12} className="mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {formatFileSize(job.fileSize)} → {fontFormats[job.targetFormat as keyof typeof fontFormats]?.name}
                    {job.outputSize && ` (${formatFileSize(job.outputSize)})`}
                    {job.processingTime && ` • ${(job.processingTime / 1000).toFixed(1)}s`}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.outputUrl && (
                    <div className="flex gap-2">
                      <Button onClick={() => downloadFile(job)} variant="outline" size="sm">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                      <Button onClick={() => copyCSS(job)} variant="outline" size="sm">
                        <Code size={14} className="mr-1" />
                        Copy CSS
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <FontConverterSEOContent />
    </div>
  );
}

export default function FontConverterPage() {
  return (
    <ToastProvider>
      <FontConverterContent />
    </ToastProvider>
  );
}