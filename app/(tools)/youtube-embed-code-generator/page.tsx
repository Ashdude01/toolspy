"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Code2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { YouTubeEmbedCodeGeneratorSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

function extractYouTubeId(input: string): string | null {
  const urlMatch = input.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  if (urlMatch) return urlMatch[1];
  return /^[\w-]{11}$/.test(input) ? input : null;
}

export default function YouTubeEmbedCodeGeneratorPage() {
  return (
    <ToolPageWrapper toolSlug="youtube-embed-code-generator">
      (
    <ToastProvider>
      <Content />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
}

function Content() {
  const { showToast } = useToast();
  const params = useSearchParams();
  const [input, setInput] = useState("");
  const [autoplay, setAutoplay] = useState(false);
  const [controls, setControls] = useState(true);
  const [loop, setLoop] = useState(false);
  const [ratio, setRatio] = useState<'16:9'|'4:3'|'1:1'|'21:9'>("16:9");
  const videoId = useMemo(() => extractYouTubeId(input || ''), [input]);

  useEffect(() => {
    const v = params?.get('v') || params?.get('id');
    if (v) setInput(v);
  }, [params]);

  const embedSrc = useMemo(() => {
    if (!videoId) return '';
    const q = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      controls: controls ? '1' : '0',
      loop: loop ? '1' : '0',
      playlist: loop ? videoId : '',
      modestbranding: '1',
      rel: '0',
    });
    return `https://www.youtube.com/embed/${videoId}?${q.toString()}`;
  }, [videoId, autoplay, controls, loop]);

  const paddingTop = useMemo(() => {
    const map: Record<string, string> = {
      '16:9': '56.25%',
      '4:3': '75%',
      '1:1': '100%',
      '21:9': '42.85%'
    };
    return map[ratio];
  }, [ratio]);

  const code = useMemo(() => {
    if (!embedSrc) return '';
    return `<div style="position:relative;width:100%;padding-top:${paddingTop}"><iframe src="${embedSrc}" title="YouTube video" style="position:absolute;inset:0;width:100%;height:100%" frameborder="0" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe></div>`;
  }, [embedSrc, paddingTop]);

  const copy = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    showToast('Embed code copied!', 'success');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 space-y-3">
        <Badge variant="outline">Responsive • Clean HTML</Badge>
        <h1 className="text-3xl font-bold">YouTube Embed Code Generator</h1>
        <p className="text-muted-foreground">Create responsive embeds with customizable options. Copy and paste directly into your page.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Video & Options</CardTitle>
          <CardDescription>Paste a video URL/ID and set preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="yt">YouTube URL/ID</Label>
            <Input id="yt" placeholder="https://youtu.be/VIDEO_ID" value={input} onChange={(e) => setInput(e.target.value)} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2"><input type="checkbox" checked={autoplay} onChange={(e) => setAutoplay(e.target.checked)} /><span>Autoplay</span></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} /><span>Show Controls</span></div>
            <div className="flex items-center gap-2"><input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} /><span>Loop</span></div>
            <div>
              <Label>Aspect Ratio</Label>
              <select className="w-full border rounded h-10 px-3" value={ratio} onChange={(e) => setRatio(e.target.value as any)}>
                <option>16:9</option>
                <option>4:3</option>
                <option>1:1</option>
                <option>21:9</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {embedSrc && (
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
            <CardDescription>Responsive container with your options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div style={{ position:'relative', width:'100%', paddingTop }}>
              <iframe src={embedSrc} title="YouTube video" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={copy}><Copy className="h-4 w-4 mr-2"/>Copy Embed Code</Button>
              <code className="text-xs break-all bg-muted px-2 py-1 rounded">{code.slice(0, 120)}…</code>
            </div>
          </CardContent>
        </Card>
      )}

      <YouTubeEmbedCodeGeneratorSEOContent />
    </div>
  );
}


