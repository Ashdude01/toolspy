"use client";

import { useT } from "@/lib/i18n/use-t";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Download, Search, UserCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ToastProvider, useToast } from "@/components/tools/shared/toast-provider";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

export default function InstagramDPViewerPage() {
  return (
    <ToolPageWrapper toolSlug="instagram-dp-viewer"><ToastProvider>
      <Content /></ToastProvider></ToolPageWrapper>
  );
}

function Content() {
  const t = useT();
  const params = useSearchParams();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [dpUrl, setDpUrl] = useState<string | null>(null);

  useEffect(() => {
    const u = params?.get('u') || params?.get('user');
    if (u) setUsername(u.replace(/^@/,''));
  }, [params]);

  const fetchDP = async () => {
    if (!username.trim()) {
      showToast(t("tools.instagramDpViewer.enterAnInstagramUsername"), 'error');
      return;
    }
    // Public DP URL pattern (best-effort): https://www.instagram.com/<user>/?__a=1 is blocked now.
    // We provide a pragmatic approach: try common CDN pattern by size hints (may not work for private)
    const tentative = `https://www.instagram.com/${username}/profilepic`;
    setDpUrl(tentative);
    showToast(t("tools.instagramDpViewer.ifThePreviewDoesNotLoad"), 'info');
  };

  const download = async () => {
    if (!dpUrl) return;
    try {
      const res = await fetch(dpUrl, { mode: 'cors' });
      if (!res.ok) throw new Error('Failed');
      const blob = await res.blob();
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `${username}-profile.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1500);
    } catch {
      showToast(t("tools.instagramDpViewer.unableToDownloadDueToCors"), 'error');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8 space-y-3">
        <Badge variant="outline">{t("tools.instagramDpViewer.dpOnlyPrivacyFriendly")}</Badge>
        <h2 className="text-3xl font-bold">Instagram Profile Picture Viewer</h2>
        <p className="text-muted-foreground">View and download Instagram profile pictures in full size. For private accounts, only DP may be accessible when allowed.</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t("tools.instagramDpViewer.enterUsername")}</CardTitle>
          <CardDescription>{t("tools.instagramDpViewer.usePublicAccountsForBestCompatibility")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="username">{t("tools.instagramDpViewer.instagramUsername")}</Label>
          <div className="flex gap-2">
            <Input id="username" placeholder={t("tools.instagramDpViewer.eGNatgeo")} value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button onClick={fetchDP}><Search className="h-4 w-4 mr-2"/>View</Button>
          </div>
        </CardContent>
      </Card>

      {dpUrl && (
        <Card>
          <CardHeader>
            <CardTitle>{t("tools.instagramDpViewer.profilePicture")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4">
              <img src={dpUrl} alt="Profile" className="w-36 h-36 object-cover rounded-full border" />
              <Button onClick={download}><Download className="h-4 w-4 mr-2"/>Download</Button>
            </div>
          </CardContent>
        </Card>
      )}
</div>
  );
}


