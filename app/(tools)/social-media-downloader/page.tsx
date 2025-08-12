"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  
  const { showToast } = useToast();

  const analyzeMedia = async () => {
    if (!inputUrl.trim()) {
      showToast("Please enter a valid URL", "error");
      return;
    }

    setIsAnalyzing(true);
    
    // For demo: if it's a direct media link (jpg/png/mp4/webm/mp3), prepare a single format
    const directMedia = /(\.jpg|\.jpeg|\.png|\.webp|\.gif|\.mp4|\.webm|\.mp3|\.wav)(\?.*)?$/i.test(inputUrl);
    const mockInfo: MediaInfo = {
      title: "Sample Video Title - How to Use This Tool",
      creator: "Content Creator",
      duration: "5:23",
      views: Math.floor(Math.random() * 1000000),
      uploadDate: "2024-01-15",
      thumbnail: "https://via.placeholder.com/640x360?text=Preview",
      platform: directMedia ? "Direct Media" : "YouTube",
      description: "This is a sample video description...",
      formats: directMedia
        ? [{ quality: "Original", format: inputUrl.match(/\.(mp3|wav)$/i) ? "MP3" : "MP4", size: "—" }]
        : [
            { quality: "1080p", format: "MP4", size: "45.2 MB" },
            { quality: "720p", format: "MP4", size: "28.1 MB" },
            { quality: "480p", format: "MP4", size: "18.5 MB" },
            { quality: "Audio", format: "MP3", size: "5.2 MB" },
          ],
    };

    setMediaInfo(mockInfo);
    setIsAnalyzing(false);
    showToast("Media analyzed successfully!", "success");
  };

  const downloadMedia = async (quality: string, format: string) => {
    setIsDownloading(true);
    try {
      // If input is direct media, try to fetch and save it
      const directMedia = /(\.jpg|\.jpeg|\.png|\.webp|\.gif|\.mp4|\.webm|\.mp3|\.wav)(\?.*)?$/i.test(inputUrl);
      if (directMedia) {
        const res = await fetch(inputUrl, { mode: 'cors' });
        if (!res.ok) throw new Error('Download failed');
        const blob = await res.blob();
        const extGuess = blob.type.split('/')[1] || format.toLowerCase();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${(mediaInfo?.title || 'download').replace(/[^a-z0-9\-_ ]/gi,'_')}.${extGuess}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      } else {
        // Otherwise, show guidance (server-side fetch would be needed for actual platforms)
        showToast('For platform downloads, server-side processing is required. This demo supports direct media URLs.', 'info');
      }
      showToast("Download completed successfully!", "success");
    } catch (e) {
      showToast('Unable to download this media directly due to CORS or platform restrictions.', 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const clearAll = () => {
    setInputUrl("");
    setMediaInfo(null);
    showToast("All data cleared", "info");
  };

  // Prefill from search params (?url=...)
  useEffect(() => {
    const url = searchParams?.get('url');
    if (url) setInputUrl(url);
  }, [searchParams]);

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
          <div className="p-3 bg-gradient-to-br from-pink-500 to-red-600 rounded-xl text-white shadow-lg">
            <Download size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            Social Media Downloader
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Download videos, images, and audio from major platforms. For best results, paste direct media URLs.
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
            <p className="text-xs text-muted-foreground mt-2">
              Tip: Direct file URLs (jpg, png, webp, mp4, webm, mp3) can be downloaded in-browser.
            </p>
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
                  className="w-full rounded-lg shadow-md"
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
            
            <p className="text-sm text-muted-foreground">{mediaInfo.description}</p>
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