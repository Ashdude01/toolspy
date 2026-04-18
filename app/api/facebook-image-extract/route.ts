import { NextRequest, NextResponse } from "next/server";
import {
  facebookUrlVariants,
  parseOgDescriptionFromHtml,
  parseOgImagesFromHtml,
  parseOgTitleFromHtml,
} from "@/lib/utils/facebook-extractor";

const BROWSER_LIKE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function isFacebookHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h === "facebook.com" || h.endsWith(".facebook.com") || h === "fb.com" || h.endsWith(".fb.com");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawUrl = body?.url;
    if (!rawUrl || typeof rawUrl !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(rawUrl.trim());
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!isFacebookHost(parsed.hostname)) {
      return NextResponse.json({ error: "URL must be a Facebook link" }, { status: 400 });
    }

    const variants = facebookUrlVariants(rawUrl.trim());

    for (const pageUrl of variants) {
      try {
        const res = await fetch(pageUrl, {
          headers: {
            "User-Agent": BROWSER_LIKE_UA,
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
          },
          redirect: "follow",
          signal: AbortSignal.timeout(12000),
        });

        if (!res.ok) continue;

        const html = await res.text();
        const images = parseOgImagesFromHtml(html);
        if (images.length === 0) continue;

        return NextResponse.json({
          images,
          title: parseOgTitleFromHtml(html),
          description: parseOgDescriptionFromHtml(html),
        });
      } catch {
        continue;
      }
    }

    return NextResponse.json({
      images: [],
      error:
        "No preview image found. The post may be private, age-restricted, or Facebook may be blocking automated access.",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
