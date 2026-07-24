"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Video, Loader2, AlertCircle, CheckCircle2, X, Play, ExternalLink } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { extractInstagramReel, type InstagramReelInfo } from "@/lib/utils/instagram-extractor";
import { formatFileSize } from "@/lib/utils/file-utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function InstagramReelsDownloaderPage() {
  return (
    <ToolPageWrapper toolSlug="instagram-reels-downloader">
      <ToastProvider>
        <Content />
      </ToastProvider>
    </ToolPageWrapper>
  );
}

function Content() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [url, setUrl] = useState("");
  const [reelInfo, setReelInfo] = useState<InstagramReelInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<string>("");

  useEffect(() => {
    const u = params?.get('url');
    if (u) setUrl(u);
  }, [params]);

  useEffect(() => {
    // Auto-select first format when reel info loads
    if (reelInfo?.formats && reelInfo.formats.length > 0 && !selectedFormat) {
      setSelectedFormat(reelInfo.formats[0].url);
    } else if (reelInfo?.videoUrl && !selectedFormat) {
      setSelectedFormat(reelInfo.videoUrl);
    }
  }, [reelInfo, selectedFormat]);

  const analyze = async () => {
    if (!url.trim()) {
      showToast('Please paste an Instagram reel URL', 'error');
      return;
    }

    setLoading(true);
    setReelInfo(null);
    setSelectedFormat("");
    setDownloading(false);

    try {
      const result = await extractInstagramReel(url);
      setReelInfo(result);

      if (result.videoUrl) {
        showToast('Reel extracted successfully!', 'success');
      } else {
        showToast(result.error || 'Could not extract reel', 'error');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to extract reel';
      setReelInfo({ videoUrl: null, error: errorMessage });
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  const download = async () => {
    const videoUrl = selectedFormat || reelInfo?.videoUrl;
    if (!videoUrl) {
      showToast('No video URL available', 'error');
      return;
    }

    setDownloading(true);
    try {
      // Try to fetch and download via blob
      const response = await fetch(videoUrl, {
        mode: 'cors',
        headers: {
          'Referer': 'https://www.instagram.com/',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `instagram-reel-${Date.now()}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast("Reel downloaded successfully!", "success");
    } catch (error) {
      // Fallback: direct download link
      showToast("Direct download failed. Opening video in new tab...", "info");
      window.open(videoUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      analyze();
    }
  };

  const currentVideoUrl = selectedFormat || reelInfo?.videoUrl;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-3">
        <Badge variant="outline" className="text-xs sm:text-sm">
          Fast • Free • Secure
        </Badge>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Instagram Reels Downloader
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Save Instagram Reels and short videos in high quality. Paste a reel URL and download fast.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Paste Reel URL</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Supports public reels and Instagram video posts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reel" className="text-sm font-medium">Reel URL</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="reel"
                placeholder="https://www.instagram.com/reel/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={loading}
              />
              <Button
                onClick={analyze}
                disabled={loading || !url.trim()}
                className="w-full sm:w-auto min-w-[120px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* URL Examples */}
          <div className="text-xs sm:text-sm text-muted-foreground space-y-1">
            <p className="font-medium">Supported URL formats:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>https://www.instagram.com/reel/...</li>
              <li>https://www.instagram.com/p/...</li>
              <li>https://www.instagram.com/tv/...</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="mb-6 sm:mb-8">
          <CardContent className="py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">Analyzing Reel...</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Extracting video from Instagram
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {reelInfo && !reelInfo.videoUrl && reelInfo.error && (
        <Card className="mb-6 sm:mb-8 border-destructive">
          <CardContent className="py-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Unable to Extract Reel</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{reelInfo.error}</p>
                <div className="pt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p className="font-medium">Tips:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Ensure the reel is public and accessible</li>
                    <li>Try copying the URL directly from Instagram</li>
                    <li>Check if the URL is correct and complete</li>
                    <li>Some private reels cannot be accessed</li>
                    <li>Configure an API for better results (see documentation)</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State - Reel Found */}
      {reelInfo && reelInfo.videoUrl && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Reel Ready to Download</span>
                </CardTitle>
                {reelInfo.title && (
                  <CardDescription className="text-xs sm:text-sm mt-1">
                    {reelInfo.title}
                  </CardDescription>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setReelInfo(null);
                  setUrl("");
                  setSelectedFormat("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Video Preview */}
            <div className="relative rounded-lg overflow-hidden border bg-muted">
              <video
                src={currentVideoUrl || undefined}
                controls
                className="w-full max-h-[500px]"
                poster={reelInfo.thumbnail}
                onError={(e) => {
                  showToast("Video preview failed. You can still download it.", "warning");
                }}
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Format Selection */}
            {reelInfo.formats && reelInfo.formats.length > 1 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Select Quality</Label>
                <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select video quality" />
                  </SelectTrigger>
                  <SelectContent>
                    {reelInfo.formats.map((format, idx) => (
                      <SelectItem key={idx} value={format.url}>
                        {format.quality} ({format.format})
                        {format.size && ` - ${format.size}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Reel Information */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {reelInfo.duration && (
                <div>
                  <span className="text-muted-foreground block text-xs">Duration</span>
                  <div className="font-medium text-sm sm:text-base">{reelInfo.duration}</div>
                </div>
              )}
              {reelInfo.formats && reelInfo.formats.length > 0 && (
                <div>
                  <span className="text-muted-foreground block text-xs">Formats</span>
                  <div className="font-medium text-sm sm:text-base">{reelInfo.formats.length}</div>
                </div>
              )}
              {reelInfo.thumbnail && (
                <div>
                  <span className="text-muted-foreground block text-xs">Thumbnail</span>
                  <Badge variant="secondary" className="text-xs">Available</Badge>
                </div>
              )}
              <div>
                <span className="text-muted-foreground block text-xs">Status</span>
                <Badge variant="default" className="text-xs">Ready</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={download}
                disabled={downloading || !currentVideoUrl}
                className="flex-1"
                size="lg"
              >
                {downloading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download MP4
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(currentVideoUrl || undefined, '_blank')}
                disabled={!currentVideoUrl}
                className="flex-1 sm:flex-initial"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            </div>

            {/* Thumbnail Preview */}
            {reelInfo.thumbnail && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Thumbnail</Label>
                <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border">
                  <img
                    src={reelInfo.thumbnail}
                    alt="Reel thumbnail"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <div className="mt-8">
</div>
    </div>
  );
}
