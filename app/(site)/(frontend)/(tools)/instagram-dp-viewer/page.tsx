"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Loader2,
  RotateCcw,
  Search,
  Shield,
  UserRound,
} from "lucide-react";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n/use-t";
import { parseInstagramUsername } from "@/lib/utils/instagram-dp";

type Status = "idle" | "loading" | "done" | "error";

type DpPayload = {
  username: string;
  fullName?: string | null;
  biography?: string | null;
  isPrivate?: boolean | null;
  followersText?: string | null;
  profilePicUrl: string;
  profilePicUrlHd: string;
};

const IG_BTN = cn(
  buttonVariants({ size: "lg" }),
  "h-12 shrink-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-8 font-semibold text-white hover:opacity-95 hover:text-white",
);

function Content() {
  const t = useT();
  const { showToast } = useToast();
  const params = useSearchParams();
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DpPayload | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const u = params?.get("u") || params?.get("user") || params?.get("url");
    if (u) setInput(u);
  }, [params]);

  const lookup = useCallback(
    async (override?: string) => {
      const value = (override ?? input).trim();
      const username = parseInstagramUsername(value);
      if (!username) {
        setError(t("tools.instagramDpViewer.enterAnInstagramUsername"));
        setStatus("error");
        showToast(t("tools.instagramDpViewer.enterAnInstagramUsername"), "error");
        return;
      }

      setStatus("loading");
      setError(null);
      setResult(null);
      setCopied(false);

      try {
        const res = await fetch(
          `/api/instagram-dp?username=${encodeURIComponent(username)}`,
          { cache: "no-store" },
        );
        const data = await res.json();
        if (!res.ok || !data?.profilePicUrl) {
          const msg =
            typeof data?.error === "string"
              ? data.error
              : t("tools.instagramDpViewer.lookupFailed");
          setError(msg);
          setStatus("error");
          showToast(msg, "error");
          return;
        }

        setResult({
          username: data.username,
          fullName: data.fullName,
          biography: data.biography,
          isPrivate: data.isPrivate,
          followersText: data.followersText,
          profilePicUrl: data.profilePicUrl,
          profilePicUrlHd: data.profilePicUrlHd || data.profilePicUrl,
        });
        setStatus("done");
        showToast(t("tools.instagramDpViewer.dpLoaded"), "success");
      } catch {
        const msg = t("tools.instagramDpViewer.lookupFailed");
        setError(msg);
        setStatus("error");
        showToast(msg, "error");
      }
    },
    [input, showToast, t],
  );

  const download = async () => {
    if (!result) return;
    setDownloading(true);
    try {
      const imageUrl = result.profilePicUrlHd || result.profilePicUrl;
      const proxy = `/api/instagram-image-proxy?url=${encodeURIComponent(imageUrl)}&filename=${encodeURIComponent(`${result.username}-dp.jpg`)}`;
      const res = await fetch(proxy);
      if (!res.ok) throw new Error("proxy failed");
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${result.username}-instagram-dp.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
      showToast(t("tools.instagramDpViewer.downloadStarted"), "success");
    } catch {
      showToast(t("tools.instagramDpViewer.unableToDownloadDueToCors"), "error");
      window.open(result.profilePicUrlHd || result.profilePicUrl, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  };

  const copyUrl = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.profilePicUrlHd || result.profilePicUrl);
      setCopied(true);
      showToast(t("tools.instagramDpViewer.urlCopied"), "success");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast(t("tools.instagramDpViewer.copyFailed"), "error");
    }
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError(null);
    setStatus("idle");
    setCopied(false);
  };

  return (
    <div id="tool" className="container mx-auto max-w-3xl scroll-mt-24 px-4 py-6 sm:py-8">
      {/* Intentionally no page hero — CmsToolHero in layout owns H1/description */}

      <Card className="overflow-hidden border-border/80 shadow-sm">
        <CardContent className="space-y-5 p-5 sm:p-6">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <h3> {t("tools.instagramDpViewer.instagramUsername")}</h3>
            <Badge
              variant="outline"
              className="border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/40 dark:text-green-200"
            >
              <Shield className="mr-1.5 h-3.5 w-3.5" aria-hidden />
              {t("tools.instagramDpViewer.dpOnlyPrivacyFriendly")}
            </Badge>
            {/* <Badge variant="secondary" className="font-normal">
              {t("tools.instagramDpViewer.noLogin")}
            </Badge> */}
          </div>

          <div className="space-y-2">
            {/* <Label htmlFor="ig-username" className="text-sm font-medium">
             
            </Label> */}
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative min-w-0 flex-1">
                <UserRound
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="ig-username"
                  className="h-12 pl-10 placeholder:text-muted/8 dark:placeholder:text-muted/8"
                  placeholder={t("tools.instagramDpViewer.inputPlaceholder")}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void lookup();
                  }}
                  autoComplete="off"
                  spellCheck={false}
                  aria-invalid={status === "error"}
                  aria-describedby="ig-username-hint"
                />
              </div>
              <Button
                type="button"
                className={IG_BTN}
                onClick={() => void lookup()}
                disabled={status === "loading" || !input.trim()}
              >
                {status === "loading" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                ) : (
                  <Search className="mr-2 h-4 w-4" aria-hidden />
                )}
                {status === "loading"
                  ? t("tools.instagramDpViewer.loading")
                  : t("tools.instagramDpViewer.viewDp")}
              </Button>
            </div>
            <p id="ig-username-hint" className="text-xs text-muted-foreground">
              {t("tools.instagramDpViewer.usePublicAccountsForBestCompatibility")}
            </p>
          </div>

          {status === "error" && error && (
            <div
              role="alert"
              className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden />
              <div className="space-y-1">
                <p className="font-medium text-destructive">{t("tools.instagramDpViewer.couldNotLoad")}</p>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          )}

          {status === "loading" && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed bg-muted/30 px-4 py-12">
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" aria-hidden />
              <p className="text-sm text-muted-foreground">
                {t("tools.instagramDpViewer.fetchingHd")}
              </p>
            </div>
          )}

          {status === "done" && result && (
            <div className="space-y-5 rounded-xl border bg-gradient-to-b from-muted/40 to-background p-4 sm:p-6">
              <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] p-[3px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={result.profilePicUrlHd || result.profilePicUrl}
                      alt={`@${result.username} profile picture`}
                      className="h-40 w-40 rounded-full border-4 border-background object-cover sm:h-44 sm:w-44"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {result.isPrivate ? (
                    <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2" variant="secondary">
                      {t("tools.instagramDpViewer.privateAccount")}
                    </Badge>
                  ) : null}
                </div>

                <div className="min-w-0 flex-1 space-y-3 text-center sm:text-left">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      {result.username === "download" ? t("tools.instagramDpViewer.directImage") : `@${result.username}`}
                    </h2>
                    {result.fullName ? (
                      <p className="text-muted-foreground">{result.fullName}</p>
                    ) : null}
                    {result.followersText ? (
                      <p className="mt-1 text-xs text-muted-foreground">{result.followersText}</p>
                    ) : null}
                  </div>
                  {result.biography ? (
                    <p className="line-clamp-3 text-sm text-muted-foreground">{result.biography}</p>
                  ) : null}

                  <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                    <Button type="button" className={IG_BTN} onClick={() => void download()} disabled={downloading}>
                      {downloading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
                      ) : (
                        <Download className="mr-2 h-4 w-4" aria-hidden />
                      )}
                      {t("tools.instagramDpViewer.downloadHd")}
                    </Button>
                    <Button type="button" variant="outline" className="h-12" onClick={() => void copyUrl()}>
                      {copied ? (
                        <CheckCircle2 className="mr-2 h-4 w-4 text-green-600" aria-hidden />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" aria-hidden />
                      )}
                      {copied
                        ? t("tools.instagramDpViewer.copied")
                        : t("tools.instagramDpViewer.copyImageUrl")}
                    </Button>
                    <a
                      href={result.profilePicUrlHd || result.profilePicUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12")}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" aria-hidden />
                      {t("tools.instagramDpViewer.openFullSize")}
                    </a>
                    <Button type="button" variant="ghost" className="h-12" onClick={reset}>
                      <RotateCcw className="mr-2 h-4 w-4" aria-hidden />
                      {t("tools.instagramDpViewer.reset")}
                    </Button>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs text-muted-foreground sm:text-left">
                {t("tools.instagramDpViewer.respectRights")}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {[
          {
            step: "1",
            title: t("tools.instagramDpViewer.step1Title"),
            body: t("tools.instagramDpViewer.step1Body"),
          },
          {
            step: "2",
            title: t("tools.instagramDpViewer.step2Title"),
            body: t("tools.instagramDpViewer.step2Body"),
          },
          {
            step: "3",
            title: t("tools.instagramDpViewer.step3Title"),
            body: t("tools.instagramDpViewer.step3Body"),
          },
        ].map((item) => (
          <div
            key={item.step}
            className="rounded-xl border bg-card p-4 text-sm shadow-sm"
          >
            <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#F58529] to-[#8134AF] text-xs font-bold text-white">
              {item.step}
            </div>
            <p className="font-semibold">{item.title}</p>
            <p className="mt-1 text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InstagramDPViewerPage() {
  return (
    <ToolPageWrapper toolSlug="instagram-dp-viewer">
      <ToastProvider>
        <Content />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
