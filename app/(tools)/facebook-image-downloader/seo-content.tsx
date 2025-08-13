"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RelatedTools } from "@/components/tools/related-tools";

export function FacebookImageDownloaderSEOContent() {
  return (
    <div className="space-y-8 mt-10">
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Save Facebook Photos in Full Quality</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-center">
          Paste a public Facebook post URL and download images quickly. Perfect for collecting references, archiving your own posts, or saving shared memories.
        </p>
      </section>
      <RelatedTools currentToolSlug="facebook-image-downloader" />
    </div>
  );
}


