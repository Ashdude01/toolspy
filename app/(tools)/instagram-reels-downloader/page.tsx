"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Video } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { fetchThirdPartyMedia } from "@/lib/third-party/media-downloader";
import { InstagramReelsDownloaderSEOContent } from "./seo-content";

export default function InstagramReelsDownloaderPage() {
  return (
    <ToastProvider>
      <Content />
    </ToastProvider>
  );
}

function Content() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = params?.get('url');
    if (u) setUrl(u);
  }, [params]);

  const analyze = async () => {
    if (!url.trim()) {
      showToast('Paste an Instagram reel URL', 'error');
      return;
    }
    setLoading(true);
    try {
      // Prefer third-party API for real reel links
      const info = await fetchThirdPartyMedia(url);
      const mp4 = info.formats.find(f => (f.format || '').toLowerCase().includes('mp4') && f.url);
      if (mp4 && mp4.url) {
        setVideoUrl(mp4.url);
        showToast('Reel detected', 'success');
      } else {
        showToast('Could not extract a downloadable reel URL.', 'error');
      }
    } catch {
      showToast('Unable to analyze this URL with current provider.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const download = () => {
    if (!videoUrl) return;
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = 'instagram-reel.mp4';
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8 space-y-3">
        <Badge variant="outline">Fast • Free • Secure</Badge>
        <h1 className="text-3xl font-bold">Instagram Reels Downloader</h1>
        <p className="text-muted-foreground">Save Instagram Reels and short videos in high quality. Paste a reel URL and download fast.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Paste Reel URL</CardTitle>
          <CardDescription>We recommend public reels for best compatibility</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="reel">Reel URL</Label>
          <div className="flex gap-2">
            <Input id="reel" placeholder="https://www.instagram.com/reel/..." value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button onClick={analyze} disabled={loading}>
              {loading ? 'Analyzing...' : (<><Search className="h-4 w-4 mr-2"/>Analyze</>)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {videoUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Preview & Download</CardTitle>
            <CardDescription>Click download to save the reel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <video src={videoUrl} controls className="w-full rounded border" />
            <Button onClick={download}><Download className="h-4 w-4 mr-2"/>Download MP4</Button>
          </CardContent>
        </Card>
      )}

      <InstagramReelsDownloaderSEOContent />
    </div>
  );
}


