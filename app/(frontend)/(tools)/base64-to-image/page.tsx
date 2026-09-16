"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Copy,
  Clipboard,
  RotateCcw,
  Image as ImageIcon,
  FileText,
  Share2,
} from "lucide-react";
import {
  validateBase64Image,
  base64ToBlob,
  getBase64ImageFormat,
  getBase64Size,
  base64ToFile,
  createImageFromBase64,
  isValidBase64,
} from "@/lib/utils/base64-utils";
import {
  formatFileSize,
  downloadFile,
  copyImageToClipboard,
  pasteFromClipboard,
  addWatermarkToFilename,
} from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useT } from "@/lib/i18n/use-t";

function Base64ToImageContent() {
  const t = useT();
  const { showToast } = useToast();
  const [base64Input, setBase64Input] = useState("");
  const [decodedImage, setDecodedImage] = useState<{
    url: string;
    blob: Blob;
    format: string;
    dimensions: { width: number; height: number };
    size: number;
  } | null>(null);
  const [isDecoding, setIsDecoding] = useState(false);

  const handleInputChange = (value: string) => {
    setBase64Input(value);

    if (value.trim() && isValidBase64(value) === false) {
        showToast(
          t("tools.base64ToImage.invalidBase64"),
          "error",
          1500
        );
    }
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await pasteFromClipboard();
      if (text) {
        setBase64Input(text);
        handleInputChange(text);
      } else {
        showToast(t("tools.base64ToImage.noClipboardText"), "error");
      }
    } catch (error) {
      showToast(
        t("tools.base64ToImage.pasteFailed"),
        "error"
      );
    }
  };

  const handleClearInput = () => {
    setBase64Input("");
    setDecodedImage(null);
  };

  const handleDecode = async () => {
    if (!base64Input.trim()) {
      showToast(t("tools.base64ToImage.enterValidBase64"), "error");
      return;
    }

    const validation = validateBase64Image(base64Input);
    if (!validation.valid) {
      showToast(validation.error || t("tools.base64ToImage.invalidBase64"), "error");
      return;
    }

    setIsDecoding(true);

    try {
      // Add delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 300));

      const blob = base64ToBlob(base64Input);
      const url = URL.createObjectURL(blob);
      const format = getBase64ImageFormat(base64Input);
      const size = getBase64Size(base64Input);

      // Get image dimensions
      const img = await createImageFromBase64(base64Input);
      const dimensions = { width: img.width, height: img.height };

      setDecodedImage({
        url,
        blob,
        format,
        dimensions,
        size,
      });

      showToast(t("tools.base64ToImage.decodeSuccess"), "success");

      // Show format-specific warnings
      if (format === "AVIF") {
        showToast(
          t("tools.base64ToImage.avifWarning"),
          "warning",
          4000
        );
      } else if (["HEIC", "HEIF"].includes(format)) {
        showToast(
          t("tools.base64ToImage.heicWarning"),
          "warning",
          4000
        );
      }
    } catch (error) {
      console.error("Decode error:", error);
      showToast(
        t("tools.base64ToImage.decodeFailed"),
        "error"
      );
    } finally {
      setIsDecoding(false);
    }
  };

  const handleDownload = () => {
    if (!decodedImage) {
      showToast(t("tools.base64ToImage.noImageToDownload"), "error");
      return;
    }

    const file = base64ToFile(base64Input);
    const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
    const extension = file.name.split(".").pop() || "png";
    const filename = `${watermark}-decoded.${extension}`;

    downloadFile(file, filename);
  };

  const handleCopyImage = async () => {
    if (!decodedImage) {
      showToast(t("tools.base64ToImage.noImageToCopy"), "error");
      return;
    }

    try {
      await copyImageToClipboard(decodedImage.blob);
      showToast(t("tools.base64ToImage.imageCopied"), "success");
    } catch (error) {
      // Fallback: try to copy as canvas
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = await createImageFromBase64(base64Input);

        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
          if (blob) {
            try {
              await copyImageToClipboard(blob);
              showToast(t("tools.base64ToImage.imageCopied"), "success");
            } catch {
              showToast(
                t("tools.base64ToImage.copyFailedHint"),
                "error"
              );
            }
          }
        }, "image/png");
      } catch {
        showToast(
          t("tools.base64ToImage.copyFailedHint"),
          "error"
        );
      }
    }
  };

  const handleShare = async () => {
    if (!decodedImage || !navigator.share) {
      showToast(t("tools.base64ToImage.sharingNotSupported"), "error");
      return;
    }

    try {
      const file = base64ToFile(base64Input);
      await navigator.share({
        title: "Decoded Image",
        text: "Check out this decoded image",
        files: [file],
      });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        showToast(t("tools.base64ToImage.shareFailed"), "error");
      }
    }
  };

  const handleStartNew = () => {
    setBase64Input("");
    setDecodedImage(null);
    if (decodedImage) {
      URL.revokeObjectURL(decodedImage.url);
    }
    showToast(t("tools.base64ToImage.readyForNew"), "info");
  };

  const inputLength = base64Input.length;
  const isValidInput = base64Input.trim() && isValidBase64(base64Input);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          {t("tools.base64ToImage.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          {t("tools.base64ToImage.subtitle")}
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>{t("tools.base64ToImage.inputTitle")}</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {t("tools.base64ToImage.inputDescription")}
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePasteFromClipboard}
                className="flex-1 sm:flex-initial"
              >
                <Clipboard className="h-4 w-4 mr-2" />
                {t("toolCommon.paste")}
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearInput} className="flex-1 sm:flex-initial">
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolCommon.clear")}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder={t("tools.base64ToImage.inputPlaceholder")}
            value={base64Input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="min-h-32 font-mono text-xs sm:text-sm"
            rows={6}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center flex-wrap gap-2 sm:gap-4">
              <span>{inputLength.toLocaleString()} characters</span>
              {inputLength > 0 && (
                <span>~{formatFileSize(getBase64Size(base64Input))}</span>
              )}
              {isValidInput && (
                <Badge variant="secondary" className="text-xs">
                  {t("tools.base64ToImage.formatDetected", { format: getBase64ImageFormat(base64Input) })}
                </Badge>
              )}
            </div>
            <Button
              onClick={handleDecode}
              disabled={!isValidInput || isDecoding}
              className="px-4 sm:px-6 text-sm sm:text-base w-full sm:w-auto"
              size="sm"
            >
              {isDecoding ? t("tools.base64ToImage.decoding") : t("tools.base64ToImage.decodeToImage")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {decodedImage && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t("tools.base64ToImage.resultTitle")}</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("tools.base64ToImage.resultDescription", { format: decodedImage.format })}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-initial">
                  <Share2 className="h-4 w-4 mr-2" />
                  {t("tools.base64ToImage.share")}
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyImage} className="flex-1 sm:flex-initial">
                  <Copy className="h-4 w-4 mr-2" />
                  {t("toolCommon.copy")}
                </Button>
                <Button size="sm" onClick={handleDownload} className="flex-1 sm:flex-initial">
                  <Download className="h-4 w-4 mr-2" />
                  {t("toolCommon.download")}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Display */}
            <div className="relative">
              <img
                src={decodedImage.url}
                alt="Decoded image"
                className="w-full max-h-96 object-contain rounded-lg border bg-muted"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, #f1f5f9 25%, transparent 25%), 
                    linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #f1f5f9 75%), 
                    linear-gradient(-45deg, transparent 75%, #f1f5f9 75%)
                  `,
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }}
              />
            </div>

            {/* Image Information */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.base64ToImage.format")}</span>
                <div className="font-medium text-sm sm:text-base">{decodedImage.format}</div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.base64ToImage.dimensions")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {decodedImage.dimensions.width} ×{" "}
                  {decodedImage.dimensions.height}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.base64ToImage.fileSize")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {formatFileSize(decodedImage.size)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.base64ToImage.inputLength")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {inputLength.toLocaleString()} chars
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                {t("tools.base64ToImage.downloadImage")}
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyImage}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                {t("tools.base64ToImage.copyToClipboard")}
              </Button>
              <Button variant="outline" onClick={handleStartNew}>
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("tools.base64ToImage.newConversion")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="mt-6 sm:mt-8">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">How to Use</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-xs sm:text-sm">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
              1
            </div>
            <div>
              <strong>Paste Base64 String:</strong> Paste your Base64 string
              into the textarea. Supports both data URLs
              (data:image/png;base64,...) and raw Base64 strings.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
              2
            </div>
            <div>
              <strong>Decode:</strong> Click "Decode to Image" to convert the
              Base64 string back to an image. Format detection is automatic.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
              3
            </div>
            <div>
              <strong>Download or Copy:</strong> Save the decoded image to your
              device or copy it to your clipboard for use in other applications.
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Seo Content */}
</div>
  );
}

export default function Base64ToImagePage() {
  return (
    <ToolPageWrapper toolSlug="base64-to-image"><ToastProvider>
      <Base64ToImageContent /></ToastProvider></ToolPageWrapper>
  );
}
