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
import { useT } from "@/lib/i18n/use-t";

function extractYouTubeId(input: string): string | null {
  // Supports full URL, youtu.be, or raw ID
  const urlMatch = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (urlMatch) return urlMatch[1];
  return /^[\w-]{11}$/.test(input) ? input : null;
}

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
  const t = useT();
  const params = useSearchParams();
  const { showToast } = useToast();
  const [input, setInput] = useState("");
  const videoId = useMemo(() => extractYouTubeId(input || ''), [input]);

  const thumbVariants = useMemo(
    () => [
      { key: 'maxresdefault', label: t('tools.youtubeThumbnailDownloader.thumbMaxResolution') },
      { key: 'sddefault', label: t('tools.youtubeThumbnailDownloader.thumbSd') },
      { key: 'hqdefault', label: t('tools.youtubeThumbnailDownloader.thumbHq') },
      { key: 'mqdefault', label: t('tools.youtubeThumbnailDownloader.thumbMq') },
      { key: 'default', label: t('tools.youtubeThumbnailDownloader.thumbDefault') },
    ],
    [t]
  );

  useEffect(() => {
    const q = params?.get('v') || params?.get('id');
    if (q) setInput(q);
  }, [params]);

  const thumbs = useMemo(() => {
    if (!videoId) return [] as { url: string; label: string }[];
    return thumbVariants.map(v => ({ url: `https://img.youtube.com/vi/${videoId}/${v.key}.jpg`, label: v.label }));
  }, [videoId, thumbVariants]);

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
      showToast(t('tools.youtubeThumbnailDownloader.corsDownloadError'), 'error');
    }
  };

  return (
    <div id="tool" className="container mx-auto scroll-mt-24 px-4 py-8 max-w-7xl">

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('tools.youtubeThumbnailDownloader.inputCardTitle')}</CardTitle>
          <CardDescription>{t('tools.youtubeThumbnailDownloader.inputCardDescription')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="yt">{t('tools.youtubeThumbnailDownloader.urlLabel')}</Label>
          <div className="flex gap-2">
            <Input id="yt" placeholder={t('tools.youtubeThumbnailDownloader.urlPlaceholder')} value={input} onChange={(e) => setInput(e.target.value)} />
            <Button disabled={!input}>
              <Search className="h-4 w-4 mr-2"/>{t('tools.youtubeThumbnailDownloader.fetch')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {thumbs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>{t('tools.youtubeThumbnailDownloader.thumbnailsTitle')}</CardTitle>
            <CardDescription>{t('tools.youtubeThumbnailDownloader.thumbnailsDescription')}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            {thumbs.map((thumb) => (
              <div key={thumb.url} className="space-y-2">
                <img src={thumb.url} alt={thumb.label} className="w-full rounded border shadow-sm" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><ImageIcon className="h-4 w-4"/>{thumb.label}</div>
                  <Button size="sm" onClick={() => download(thumb.url, thumb.label)}>
                    <Download className="h-4 w-4 mr-2"/>{t('toolCommon.download')}
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


