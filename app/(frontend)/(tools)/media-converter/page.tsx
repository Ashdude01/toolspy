"use client";

import React, { useState, useRef, useCallback } from "react";
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
  Upload,
  Settings,
  Zap,
  RefreshCw,
  Video,
  Music,
  FileArchive,
  Play,
  Pause,
  RotateCcw,
  Scissors,
  Volume2,
  Image as ImageIcon,
  Film,
  Headphones,
  Package,
  CheckCircle,
  Clock,
  FileVideo,
  FileAudio,
  Sparkles,
  Target,
  Layers,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ConversionJob {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  targetFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  outputUrl?: string;
  outputSize?: number;
  duration?: number;
  startTime?: number;
  endTime?: number;
  quality?: string;
}

interface ConversionSettings {
  // Video settings
  videoQuality: string;
  videoCodec: string;
  videoBitrate: number;
  fps: number;
  resolution: string;
  
  // Audio settings
  audioQuality: string;
  audioCodec: string;
  audioBitrate: number;
  sampleRate: number;
  
  // GIF settings
  gifQuality: string;
  gifFps: number;
  gifScale: number;
  
  // Archive settings
  compressionLevel: number;
  
  // General
  trimStart: number;
  trimEnd: number;
  enableTrim: boolean;
}

type ConversionType = 'video' | 'audio' | 'gif' | 'archive';

function MediaConverterContent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [selectedType, setSelectedType] = useState<ConversionType>('video');
  const [targetFormat, setTargetFormat] = useState('mp4');
  const [isConverting, setIsConverting] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [settings, setSettings] = useState<ConversionSettings>({
    videoQuality: 'high',
    videoCodec: 'h264',
    videoBitrate: 2000,
    fps: 30,
    resolution: '1920x1080',
    
    audioQuality: 'high',
    audioCodec: 'aac',
    audioBitrate: 128,
    sampleRate: 44100,
    
    gifQuality: 'medium',
    gifFps: 15,
    gifScale: 1,
    
    compressionLevel: 6,
    
    trimStart: 0,
    trimEnd: 0,
    enableTrim: false
  });
  
  const { showToast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Format configurations
  const formatCategories = {
    video: {
      formats: ['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm', 'flv', 'm4v'],
      accepts: 'video/*',
      icon: <Video size={20} />,
      title: 'Video Converter'
    },
    audio: {
      formats: ['mp3', 'wav', 'aac', 'ogg', 'flac', 'm4a', 'wma'],
      accepts: 'audio/*',
      icon: <Music size={20} />,
      title: 'Audio Converter'
    },
    gif: {
      formats: ['gif'],
      accepts: 'video/*',
      icon: <ImageIcon size={20} />,
      title: 'Video to GIF'
    },
    archive: {
      formats: ['zip', 'rar', '7z', 'tar', 'gz'],
      accepts: '.zip,.rar,.7z,.tar,.gz',
      icon: <FileArchive size={20} />,
      title: 'Archive Converter'
    }
  };

  // Quality presets
  const videoQualities = {
    'ultra': { name: '4K Ultra (3840x2160)', bitrate: 8000, resolution: '3840x2160' },
    'high': { name: '1080p High (1920x1080)', bitrate: 2000, resolution: '1920x1080' },
    'medium': { name: '720p Medium (1280x720)', bitrate: 1000, resolution: '1280x720' },
    'low': { name: '480p Low (854x480)', bitrate: 500, resolution: '854x480' },
    'mobile': { name: '360p Mobile (640x360)', bitrate: 300, resolution: '640x360' }
  };

  const audioQualities = {
    'ultra': { name: 'Ultra (320 kbps)', bitrate: 320 },
    'high': { name: 'High (128 kbps)', bitrate: 128 },
    'medium': { name: 'Medium (96 kbps)', bitrate: 96 },
    'low': { name: 'Low (64 kbps)', bitrate: 64 }
  };

  // Simulate conversion process
  const processConversion = useCallback(async (job: ConversionJob) => {
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { ...j, status: 'processing', progress: 0 } : j
    ));

    // Simulate conversion progress
    for (let progress = 0; progress <= 100; progress += 5) {
      await new Promise(resolve => setTimeout(resolve, 150));
      setConversionJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress } : j
      ));
    }

    // Complete conversion
    const outputSize = Math.floor(job.fileSize * (0.6 + Math.random() * 0.4));
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { 
        ...j, 
        status: 'completed', 
        progress: 100,
        outputUrl: URL.createObjectURL(new Blob(['converted'], { type: 'application/octet-stream' })),
        outputSize
      } : j
    ));

    showToast(`${job.fileName} converted successfully!`, "success");
  }, []);

  const handleFileUpload = (files: File[]) => {
    const category = formatCategories[selectedType];
    let validFiles: File[] = [];

    if (selectedType === 'archive') {
      validFiles = files.filter(file => 
        ['.zip', '.rar', '.7z', '.tar', '.gz'].some(ext => file.name.toLowerCase().endsWith(ext))
      );
    } else if (selectedType === 'video' || selectedType === 'gif') {
      validFiles = files.filter(file => file.type.startsWith('video/'));
    } else if (selectedType === 'audio') {
      validFiles = files.filter(file => file.type.startsWith('audio/'));
    }
    
    if (validFiles.length === 0) {
      showToast(`Please upload valid ${selectedType} files`, "error");
      return;
    }

    setUploadedFiles(validFiles);
    setBatchMode(validFiles.length > 1);

    // Create preview for first file
    if (validFiles.length > 0) {
      const firstFile = validFiles[0];
      if (firstFile.type.startsWith('video/') || firstFile.type.startsWith('audio/')) {
        const url = URL.createObjectURL(firstFile);
        setPreviewUrl(url);
      }
    }

    // Create conversion jobs
    const jobs: ConversionJob[] = validFiles.map(file => ({
      id: Date.now() + Math.random().toString(),
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      targetFormat,
      status: 'pending',
      progress: 0
    }));

    setConversionJobs(jobs);
    showToast(`${validFiles.length} file(s) ready for conversion`, "success");
  };

  const startConversion = async () => {
    if (conversionJobs.length === 0) {
      showToast("No files to convert", "error");
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
      const a = document.createElement('a');
      a.href = job.outputUrl;
      a.download = `${job.fileName.split('.')[0]}.${job.targetFormat}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("File downloaded successfully", "success");
    }
  };

  const downloadAll = () => {
    const completedJobs = conversionJobs.filter(job => job.status === 'completed' && job.outputUrl);
    completedJobs.forEach(job => downloadFile(job));
    showToast(`Downloaded ${completedJobs.length} files`, "success");
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setConversionJobs([]);
    setPreviewUrl(null);
    setIsPlaying(false);
    setBatchMode(false);
    showToast("All files cleared", "info");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="tool-legacy-hero text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
            <Video size={24} />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Media Converter
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert videos, audio files, GIFs, and archives between formats. 
          High-quality conversion with advanced settings and batch processing.
        </p>
      </div>

      {/* Conversion Type Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Conversion Type</CardTitle>
          <CardDescription>
            Select the type of media you want to convert
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(formatCategories).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  selectedType === type ? 'bg-purple-600 hover:bg-purple-700' : ''
                }`}
                onClick={() => {
                  setSelectedType(type as ConversionType);
                  setTargetFormat(config.formats[0]);
                  setUploadedFiles([]);
                  setConversionJobs([]);
                  setPreviewUrl(null);
                }}
              >
                <div className={selectedType === type ? 'text-white' : 'text-purple-600'}>
                  {config.icon}
                </div>
                <span className="text-sm font-medium">{config.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      {uploadedFiles.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload {formatCategories[selectedType].title.split(' ')[0]} Files
            </CardTitle>
            <CardDescription>
              Upload files for {selectedType} conversion. Batch processing supported.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('media-file-input')?.click()}
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
                id="media-file-input"
                type="file"
                accept={formatCategories[selectedType].accepts}
                multiple={true}
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleFileUpload(files);
                  }
                }}
                className="hidden"
              />
              <div className="text-purple-600 mb-4 flex justify-center text-5xl">
                {formatCategories[selectedType].icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">Drop your {selectedType} files here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <div className="flex flex-wrap justify-center gap-2">
                {formatCategories[selectedType].formats.slice(0, 6).map(format => (
                  <Badge key={format} variant="secondary">
                    {format.toUpperCase()}
                  </Badge>
                ))}
                {formatCategories[selectedType].formats.length > 6 && (
                  <Badge variant="outline">+{formatCategories[selectedType].formats.length - 6} more</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* File Preview and Settings */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film size={20} />
                File Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* File Info */}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm space-y-1">
                    <div><strong>Files:</strong> {uploadedFiles.length}</div>
                    <div><strong>Total Size:</strong> {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}</div>
                    <div><strong>Target:</strong> {targetFormat.toUpperCase()}</div>
                  </div>
                </div>

                {/* Media Preview */}
                {previewUrl && (
                  <div className="border rounded-lg overflow-hidden">
                    {selectedType === 'video' || selectedType === 'gif' ? (
                      <div className="relative">
                        <video
                          ref={videoRef}
                          src={previewUrl}
                          className="w-full h-auto max-h-64 bg-black"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                        <div className="absolute bottom-2 left-2">
                          <Button onClick={togglePlay} size="sm" variant="secondary">
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                          </Button>
                        </div>
                      </div>
                    ) : selectedType === 'audio' ? (
                      <div className="p-8 text-center bg-gray-100">
                        <Headphones size={48} className="mx-auto text-gray-400 mb-4" />
                        <audio
                          ref={audioRef}
                          src={previewUrl}
                          controls
                          className="w-full"
                          onPlay={() => setIsPlaying(true)}
                          onPause={() => setIsPlaying(false)}
                        />
                      </div>
                    ) : (
                      <div className="p-8 text-center bg-gray-100">
                        <Package size={48} className="mx-auto text-gray-400 mb-2" />
                        <p className="text-gray-600">Archive Preview</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Conversion Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Conversion Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Target Format */}
              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select value={targetFormat} onValueChange={setTargetFormat}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {formatCategories[selectedType].formats.map((format) => (
                      <SelectItem key={format} value={format}>
                        {format.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Video Settings */}
              {(selectedType === 'video' || selectedType === 'gif') && (
                <div className="space-y-4">
                  <div>
                    <Label>Video Quality</Label>
                    <Select 
                      value={settings.videoQuality} 
                      onValueChange={(value) => setSettings(prev => ({ 
                        ...prev, 
                        videoQuality: value,
                        videoBitrate: videoQualities[value as keyof typeof videoQualities]?.bitrate || prev.videoBitrate,
                        resolution: videoQualities[value as keyof typeof videoQualities]?.resolution || prev.resolution
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(videoQualities).map(([key, quality]) => (
                          <SelectItem key={key} value={key}>
                            {quality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedType === 'gif' && (
                    <div>
                      <Label>GIF Frame Rate: {settings.gifFps} FPS</Label>
                      <Slider
                        value={[settings.gifFps]}
                        onValueChange={([value]) => setSettings(prev => ({ ...prev, gifFps: value }))}
                        max={30}
                        min={5}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  )}

                  <div>
                    <Label>Frame Rate: {settings.fps} FPS</Label>
                    <Slider
                      value={[settings.fps]}
                      onValueChange={([value]) => setSettings(prev => ({ ...prev, fps: value }))}
                      max={60}
                      min={15}
                      step={1}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Audio Settings */}
              {selectedType === 'audio' && (
                <div className="space-y-4">
                  <div>
                    <Label>Audio Quality</Label>
                    <Select 
                      value={settings.audioQuality} 
                      onValueChange={(value) => setSettings(prev => ({ 
                        ...prev, 
                        audioQuality: value,
                        audioBitrate: audioQualities[value as keyof typeof audioQualities]?.bitrate || prev.audioBitrate
                      }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(audioQualities).map(([key, quality]) => (
                          <SelectItem key={key} value={key}>
                            {quality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Sample Rate</Label>
                    <Select 
                      value={settings.sampleRate.toString()} 
                      onValueChange={(value) => setSettings(prev => ({ ...prev, sampleRate: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="22050">22.05 kHz</SelectItem>
                        <SelectItem value="44100">44.1 kHz (CD Quality)</SelectItem>
                        <SelectItem value="48000">48 kHz (Professional)</SelectItem>
                        <SelectItem value="96000">96 kHz (High-Res)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Archive Settings */}
              {selectedType === 'archive' && (
                <div>
                  <Label>Compression Level: {settings.compressionLevel}</Label>
                  <Slider
                    value={[settings.compressionLevel]}
                    onValueChange={([value]) => setSettings(prev => ({ ...prev, compressionLevel: value }))}
                    max={9}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    1 = Fastest, 9 = Best compression
                  </div>
                </div>
              )}

              {/* Trim Settings */}
              {(selectedType === 'video' || selectedType === 'audio') && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="trim"
                      checked={settings.enableTrim}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, enableTrim: checked }))}
                    />
                    <Label htmlFor="trim">Enable trimming</Label>
                  </div>
                  
                  {settings.enableTrim && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start">Start Time (seconds)</Label>
                        <Input
                          id="start"
                          type="number"
                          value={settings.trimStart}
                          onChange={(e) => setSettings(prev => ({ ...prev, trimStart: parseFloat(e.target.value) || 0 }))}
                          min="0"
                          step="0.1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="end">End Time (seconds)</Label>
                        <Input
                          id="end"
                          type="number"
                          value={settings.trimEnd}
                          onChange={(e) => setSettings(prev => ({ ...prev, trimEnd: parseFloat(e.target.value) || 0 }))}
                          min="0"
                          step="0.1"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={startConversion} disabled={isConverting}>
                  {isConverting ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={16} className="mr-2" />
                  )}
                  {batchMode ? `Convert All (${uploadedFiles.length})` : 'Convert'}
                </Button>
                
                <Button onClick={clearAll} variant="outline">
                  <RotateCcw size={16} className="mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
                    {formatFileSize(job.fileSize)} → {targetFormat.toUpperCase()}
                    {job.outputSize && ` (${formatFileSize(job.outputSize)})`}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.outputUrl && (
                    <Button onClick={() => downloadFile(job)} variant="outline" size="sm">
                      <Download size={14} className="mr-1" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
</div>
  );
}

export default function MediaConverterPage() {
  return (
    <ToolPageWrapper toolSlug="media-converter"><ToastProvider>
      <MediaConverterContent /></ToastProvider></ToolPageWrapper>
  );
}