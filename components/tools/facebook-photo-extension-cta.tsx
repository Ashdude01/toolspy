"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Internal route for Toolspy “Facebook Photo Downloader” extension landing + zips. */
export const FACEBOOK_PHOTO_EXTENSION_PAGE = "/extensions/facebook-photo-downloader";

type Variant = "persistent" | "recovery" | "download-fail";

interface FacebookPhotoExtensionCtaProps {
  variant: Variant;
  className?: string;
  /** Used with download-fail for stable `aria-labelledby` ids. */
  imageIndex?: number;
}

export function FacebookPhotoExtensionCta({
  variant,
  className,
  imageIndex = 0,
}: FacebookPhotoExtensionCtaProps) {
  if (variant === "download-fail") {
    const headingId = `fb-photo-ext-dlfail-${imageIndex}`;
    return (
      <div
        role="region"
        aria-labelledby={headingId}
        className={cn(
          "mt-2 rounded-md border border-border bg-muted/40 px-3 py-2.5",
          className,
        )}
      >
        <p id={headingId} className="text-xs text-foreground font-medium">
          Save failed in the browser?
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Grab our free extension-it downloads straight from Facebook.
        </p>
        <Button asChild variant="link" className="h-auto min-h-11 p-0 mt-1 text-xs sm:text-sm">
          <Link href={FACEBOOK_PHOTO_EXTENSION_PAGE}>Download Facebook Photo Downloader</Link>
        </Button>
      </div>
    );
  }

  if (variant === "recovery") {
    return (
      <section
        role="region"
        aria-labelledby="fb-photo-ext-recovery-title"
        className={cn(
          "mt-4 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 sm:px-4 sm:py-4",
          className,
        )}
      >
        <div className="flex gap-3">
          <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2 min-w-0">
            <h4 id="fb-photo-ext-recovery-title" className="font-semibold text-sm sm:text-base">
              Need those photos anyway?
            </h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Free extension: scan the Facebook tab, pick images, download or ZIP.
            </p>
            <Button asChild size="sm" className="w-full sm:w-auto mt-1 min-h-11">
              <Link href={FACEBOOK_PHOTO_EXTENSION_PAGE}>Download free extension</Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  /* persistent */
  return (
    <aside
      aria-labelledby="fb-photo-ext-aside-title"
      className={cn("mt-6 sm:mt-8", className)}
    >
      <Card className="border bg-muted/20 shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between sm:items-center">
            <div className="flex gap-4 items-center">


              <Image
                src="/logo/facebook_photo_downloader.png"
                alt=""
                width={100}
                height={100}
                className="object-cover w-16 md:w-20 shrink-0 self-start"
              />
              <div className="flex flex-col justify-start items-start ">
                <h2 className="text-base sm:text-lg font-semibold">
                Facebook Photo Downloader
                </h2>
                <p className="text-sm sm:text-sm text-muted-foreground text-start">
                  Free one click to scan and download images from facebook.
                </p>
              </div>
            </div>
            <Button asChild variant="secondary" className="w-fit px-4 py-2 mx-auto sm:mx-0 font-semibold bg-[#1877F2] text-white hover:bg-[#166FE5]">
              <Link href={FACEBOOK_PHOTO_EXTENSION_PAGE}>Download extension</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
