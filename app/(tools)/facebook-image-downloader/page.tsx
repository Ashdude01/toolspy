"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Link2, Search, Loader2, AlertCircle, CheckCircle2, Image as ImageIcon, X } from "lucide-react";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";
import { useSearchParams } from "next/navigation";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { extractFacebookImages, type FacebookImageInfo } from "@/lib/utils/facebook-extractor";
import { formatFileSize } from "@/lib/utils/file-utils";

export default function FacebookImageDownloaderPage() {
  return (
    <ToolPageWrapper toolSlug="facebook-image-downloader">
      <ToastProvider>
        <Content />
      </ToastProvider>
    </ToolPageWrapper>
  );
}

function Content() {
  const { showToast } = useToast();
  const params = useSearchParams();
  const [url, setUrl] = useState("");
  const [imageInfo, setImageInfo] = useState<FacebookImageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(null);

  useEffect(() => {
    const u = params?.get("url");
    if (u) setUrl(u);
  }, [params]);

  const analyze = async () => {
    if (!url.trim()) {
      showToast("Please paste a Facebook post URL", "error");
      return;
    }

    setLoading(true);
    setImageInfo(null);
    setDownloadingIndex(null);

    try {
      const result = await extractFacebookImages(url);
      setImageInfo(result);

      if (result.images.length > 0) {
        showToast(`Found ${result.images.length} image(s)`, "success");
      } else {
        showToast(result.error || "No images found", "error");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to extract images";
      setImageInfo({ images: [], error: errorMessage });
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = async (imgUrl: string, index: number) => {
    setDownloadingIndex(index);
    try {
      // Try direct download first
      const response = await fetch(imgUrl, { 
        mode: 'cors',
        headers: {
          'Referer': 'https://www.facebook.com/',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      // Get file extension from URL or blob type
      const urlExtension = imgUrl.match(/\.(jpg|jpeg|png|gif|webp|bmp)(\?|$)/i)?.[1] || 'jpg';
      const blobExtension = blob.type.split('/')[1] || urlExtension;
      const extension = blobExtension || urlExtension;
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `facebook-image-${Date.now()}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      showToast("Image downloaded successfully!", "success");
    } catch (error) {
      // Fallback: open in new tab
      showToast("Direct download failed. Opening image in new tab...", "info");
      window.open(imgUrl, '_blank');
    } finally {
      setDownloadingIndex(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) {
      analyze();
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8 space-y-3">
        <Badge variant="outline" className="text-xs sm:text-sm">
          Free • Private • Fast
        </Badge>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Facebook Image Downloader
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          Download public Facebook post images in full quality. Paste the post URL and save photos instantly.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Paste Post URL</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Supports public posts, photos, and direct image links
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium">Facebook URL</Label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                id="url"
                placeholder="https://www.facebook.com/photo/?fbid=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border"
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
              <li>https://www.facebook.com/photo/?fbid=...</li>
              <li>https://www.facebook.com/username/posts/...</li>
              <li>Direct image URLs (jpg, png, webp, etc.)</li>
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
                <h3 className="text-base sm:text-lg font-medium">Analyzing URL...</h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Extracting images from Facebook post
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {imageInfo && imageInfo.error && imageInfo.images.length === 0 && (
        <Card className="mb-6 sm:mb-8 border-destructive">
          <CardContent className="py-8">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-sm sm:text-base">Unable to Extract Images</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{imageInfo.error}</p>
                <div className="pt-2 space-y-1 text-xs sm:text-sm text-muted-foreground">
                  <p className="font-medium">Tips:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Ensure the post is public and accessible</li>
                    <li>Try copying the direct image URL instead</li>
                    <li>Check if the URL is correct and complete</li>
                    <li>Some private posts cannot be accessed</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State - Images Found */}
      {imageInfo && imageInfo.images.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg sm:text-xl flex items-center space-x-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <span>Detected Images ({imageInfo.images.length})</span>
                </CardTitle>
                {imageInfo.title && (
                  <CardDescription className="text-xs sm:text-sm mt-1">
                    {imageInfo.title}
                  </CardDescription>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setImageInfo(null);
                  setUrl("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {imageInfo.images.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative border rounded-lg overflow-hidden bg-muted/50 hover:shadow-lg transition-shadow"
                >
                  {/* Image Preview */}
                  <div className="relative aspect-square bg-muted">
                    <img
                      src={img}
                      alt={`Facebook image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%23ccc"/><text x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999">Image not available</text></svg>';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </div>

                  {/* Image Info & Actions */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <ImageIcon className="h-3 w-3" />
                        <span>Image {idx + 1}</span>
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        Full Quality
                      </Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => downloadImage(img, idx)}
                        disabled={downloadingIndex === idx}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        {downloadingIndex === idx ? (
                          <>
                            <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2 animate-spin" />
                            <span className="hidden sm:inline">Downloading...</span>
                            <span className="sm:hidden">...</span>
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                            Download
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(img, '_blank')}
                        className="flex-1 text-xs sm:text-sm"
                      >
                        <Link2 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                        Open
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            {imageInfo.description && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {imageInfo.description}
                </p>
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
