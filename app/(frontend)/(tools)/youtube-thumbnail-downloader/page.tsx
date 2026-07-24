"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Image as ImageIcon, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

function extractYouTubeId(input: string): string | null {
  // Supports full URL, youtu.be, or raw ID
  const urlMatch = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (urlMatch) return urlMatch[1];
  return /^[\w-]{11}$/.test(input) ? input : null;
}

const THUMB_VARIANTS = [
  { key: 'maxresdefault', label: 'Max Resolution' },
  { key: 'sddefault', label: 'SD' },
  { key: 'hqdefault', label: 'HQ' },
  { key: 'mqdefault', label: 'MQ' },
  { key: 'default', label: 'Default' },
];

export default function YouTubeThumbnailDownloaderPage() {
  return (
    <ToolPageWrapper toolSlug="youtube-thumbnail-downloader">
      <ToastProvider>
        <Content />
      </ToastProvider>
    </ToolPageWrapper>
  );
}

function Content() {
  const params = useSearchParams();
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const videoId = useMemo(() => extractYouTubeId(input || ''), [input]);

  useEffect(() => {
    const q = params?.get('v') || params?.get('id');
    if (q) setInput(q);
  }, [params]);

  const thumbs = useMemo(() => {
    if (!videoId) return [] as { url: string; label: string }[];
    return THUMB_VARIANTS.map(v => ({ url: `https://img.youtube.com/vi/${videoId}/${v.key}.jpg`, label: v.label }));
  }, [videoId]);

  const download = async (url: string, label: string) => {
    try {
      const res = await fetch(url, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${videoId}-${label.replace(/\s+/g,'-').toLowerCase()}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch {
      showToast('Could not download due to CORS. Open the image and save manually.', 'error');
    }
  };

  return (
    <div id="tool" className="container mx-auto scroll-mt-24 px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 space-y-3">
        <Badge variant="outline">Free • No watermark</Badge>
        <h2 className="text-3xl font-bold">YouTube Thumbnail Downloader</h2>
        <p className="text-muted-foreground">Get YouTube video thumbnails in max resolution (4K/HD). Paste a URL or ID and save instantly.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Enter Video URL or ID</CardTitle>
          <CardDescription>We support full links, youtu.be, shorts, and raw IDs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="yt">YouTube URL/ID</Label>
          <div className="flex gap-2">
            <Input id="yt" placeholder="https://www.youtube.com/watch?v=VIDEO_ID" value={input} onChange={(e) => setInput(e.target.value)} />
            <Button disabled={!input}>
              <Search className="h-4 w-4 mr-2"/>Fetch
            </Button>
          </div>
        </CardContent>
      </Card>

      {thumbs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Available Thumbnails</CardTitle>
            <CardDescription>Click Download to save the image</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {thumbs.map((t) => (
              <div key={t.url} className="space-y-2">
                <img src={t.url} alt={t.label} className="w-full rounded border shadow-sm" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><ImageIcon className="h-4 w-4"/>{t.label}</div>
                  <Button size="sm" onClick={() => download(t.url, t.label)}>
                    <Download className="h-4 w-4 mr-2"/>Download
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
</div>
  );
}


