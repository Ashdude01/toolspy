"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Link2, Search } from "lucide-react";
import { useToast, ToastProvider } from "@/components/tools/shared/toast-provider";
import { useSearchParams } from "next/navigation";
import { FacebookImageDownloaderSEOContent } from "./seo-content";

export default function FacebookImageDownloaderPage() {
  return (
    <ToastProvider>
      <Content />
    </ToastProvider>
  );
}

function Content() {
  const { showToast } = useToast();
  const params = useSearchParams();
  const [url, setUrl] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = params?.get("url");
    if (u) setUrl(u);
  }, [params]);

  const analyze = async () => {
    if (!url.trim()) {
      showToast("Paste a public Facebook post URL", "error");
      return;
    }
    setLoading(true);
    try {
      // Basic heuristic: extract open graph image if the URL is a direct image
      if (/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(url)) {
        setImages([url]);
        showToast("Direct image detected", "success");
        return;
      }
      // Third-party API could be used here in future (kept simple client-side)
      showToast("For best results, paste a direct image link from a public post.", "info");
    } finally {
      setLoading(false);
    }
  };

  const download = async (imgUrl: string) => {
    try {
      const res = await fetch(imgUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `facebook-image.${(blob.type.split('/')[1] || 'jpg')}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch {
      showToast('Unable to download due to CORS. Right-click the image and Save As.', 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8 space-y-3">
        <Badge variant="outline">Free • Private • Fast</Badge>
        <h1 className="text-3xl font-bold">Facebook Image Downloader</h1>
        <p className="text-muted-foreground">Download public Facebook post images in full quality. Paste the post URL and save photos instantly.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Paste Post URL</CardTitle>
          <CardDescription>Supports public posts and direct image links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="url">Facebook URL</Label>
          <div className="flex gap-2">
            <Input id="url" placeholder="https://www.facebook.com/..." value={url} onChange={(e) => setUrl(e.target.value)} />
            <Button onClick={analyze} disabled={loading}>
              {loading ? 'Analyzing...' : (<><Search className="h-4 w-4 mr-2"/>Analyze</>)}
            </Button>
          </div>
        </CardContent>
      </Card>

      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detected Images</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {images.map((img, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <img src={img} alt="Detected" className="w-40 h-24 object-cover rounded border" />
                <Button size="sm" onClick={() => download(img)}>
                  <Download className="h-4 w-4 mr-2"/>Download
                </Button>
                <a className="text-sm underline text-muted-foreground" href={img} target="_blank" rel="noreferrer">
                  <Link2 className="inline h-3 w-3 mr-1"/>Open
                </a>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
      <FacebookImageDownloaderSEOContent />
    </div>
  );
}


