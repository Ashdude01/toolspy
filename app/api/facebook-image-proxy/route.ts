import { NextRequest, NextResponse } from "next/server";

const BROWSER_LIKE_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

function isAllowedImageUrl(u: URL): boolean {
  const h = u.hostname.toLowerCase();
  if (u.protocol !== "https:" && u.protocol !== "http:") return false;
  return (
    h.endsWith(".fbcdn.net") ||
    h.endsWith(".facebook.com") ||
    h.includes("fbcdn") ||
    h.startsWith("scontent.") ||
    h.startsWith("external.")
  );
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  if (!raw) {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (!isAllowedImageUrl(target)) {
    return NextResponse.json({ error: "URL host not allowed" }, { status: 400 });
  }

  try {
    const upstream = await fetch(target.href, {
      headers: {
        "User-Agent": BROWSER_LIKE_UA,
        Referer: "https://www.facebook.com/",
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(30000),
    });

    if (!upstream.ok) {
      return NextResponse.json({ error: "Image fetch failed" }, { status: 502 });
    }

    const contentType = upstream.headers.get("content-type") || "application/octet-stream";
    const buf = await upstream.arrayBuffer();

    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, max-age=3600",
        "Content-Disposition": 'attachment; filename="facebook-image"',
      },
    });
  } catch {
    return NextResponse.json({ error: "Image fetch failed" }, { status: 502 });
  }
}
