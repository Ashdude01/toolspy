"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Video,
  Play,
  Eye,
  Calendar,
  User,
  RotateCcw,
  Search,
  Headphones,
} from "lucide-react";
import { SocialMediaDownloaderSEOContent } from "./seo-content";

interface MediaInfo {
  title: string;
  creator: string;
  duration: string;
  views: number;
  uploadDate: string;
  thumbnail: string;
  platform: string;
  description: string;
  formats: Array<{
    quality: string;
    format: string;
    size: string;
  }>;
}

const SocialMediaDownloaderContent = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { showToast } = useToast();

  const analyzeMedia = async () => {
    if (!inputUrl.trim()) {
      showToast("Please enter a valid URL", "error");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock media info
    const mockInfo: MediaInfo = {
      title: "Sample Video Title - How to Use This Tool",
      creator: "Content Creator",
      duration: "5:23",
      views: Math.floor(Math.random() * 1000000),
      uploadDate: "2024-01-15",
      thumbnail: "https://via.placeholder.com/320x180?text=Video+Thumbnail",
      platform: "YouTube",
      description: "This is a sample video description...",
      formats: [
        { quality: "1080p", format: "MP4", size: "45.2 MB" },
        { quality: "720p", format: "MP4", size: "28.1 MB" },
        { quality: "480p", format: "MP4", size: "18.5 MB" },
        { quality: "Audio", format: "MP3", size: "5.2 MB" }
      ]
    };

    setMediaInfo(mockInfo);
    setIsAnalyzing(false);
    showToast("Media analyzed successfully!", "success");
  };

  const downloadMedia = async (quality: string, format: string) => {
    setIsDownloading(true);
    
    // Simulate download
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Create mock download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${mediaInfo?.title}.${format.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setIsDownloading(false);
    showToast("Download completed successfully!", "success");
  };

  const clearAll = () => {
    setInputUrl("");
    setMediaInfo(null);
    showToast("All data cleared", "info");
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl text-white">
            <Download size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            Social Media Downloader
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Download videos, images, and audio from YouTube, Instagram, TikTok, Twitter, and Facebook. 
          High quality downloads with no registration required.
        </p>
      </div>

      {/* URL Input */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Media URL</CardTitle>
          <CardDescription>
            Paste the URL of the video or post you want to download
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="url-input">Media URL</Label>
            <div className="flex gap-2">
              <Input
                id="url-input"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1"
              />
              <Button onClick={analyzeMedia} disabled={isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search size={16} className="mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={clearAll} variant="outline">
              <RotateCcw size={16} className="mr-2" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Media Info */}
      {mediaInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Media Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Thumbnail */}
              <div>
                <img 
                  src={mediaInfo.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full rounded-lg"
                />
              </div>
              
              {/* Details */}
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">{mediaInfo.title}</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{mediaInfo.creator}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play size={16} />
                    <span>{mediaInfo.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{formatNumber(mediaInfo.views)} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(mediaInfo.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Badge variant="secondary">{mediaInfo.platform}</Badge>
              </div>
            </div>
            
            <p className="text-sm text-gray-600">{mediaInfo.description}</p>
          </CardContent>
        </Card>
      )}

      {/* Download Options */}
      {mediaInfo && (
        <Card>
          <CardHeader>
            <CardTitle>Download Options</CardTitle>
            <CardDescription>
              Choose your preferred quality and format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mediaInfo.formats.map((format, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded">
                      {format.format === 'MP3' ? (
                        <Headphones size={16} />
                      ) : (
                        <Video size={16} />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{format.quality}</div>
                      <div className="text-sm text-gray-600">{format.format} • {format.size}</div>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => downloadMedia(format.quality, format.format)}
                    disabled={isDownloading}
                    size="sm"
                  >
                    {isDownloading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                    ) : (
                      <>
                        <Download size={16} className="mr-1" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <SocialMediaDownloaderSEOContent />
    </div>
  );
};

export default function SocialMediaDownloaderPage() {
  return (
    <ToastProvider>
      <SocialMediaDownloaderContent />
    </ToastProvider>
  );
}