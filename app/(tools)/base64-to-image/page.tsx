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

function Base64ToImageContent() {
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
          "Invalid Base64 string",
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
        showToast("No text found in clipboard", "error");
      }
    } catch (error) {
      showToast(
        "Failed to paste from clipboard. Please allow clipboard permissions.",
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
      showToast("Please enter a valid Base64 string", "error");
      return;
    }

    const validation = validateBase64Image(base64Input);
    if (!validation.valid) {
      showToast(validation.error || "Invalid Base64 string", "error");
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

      showToast("Base64 decoded successfully!", "success");

      // Show format-specific warnings
      if (format === "AVIF") {
        showToast(
          "AVIF format detected. Ensure browser compatibility.",
          "warning",
          4000
        );
      } else if (["HEIC", "HEIF"].includes(format)) {
        showToast(
          "HEIC/HEIF format detected. Mainly supported on Apple devices.",
          "warning",
          4000
        );
      }
    } catch (error) {
      console.error("Decode error:", error);
      showToast(
        "Failed to decode Base64 string. Please check the format.",
        "error"
      );
    } finally {
      setIsDecoding(false);
    }
  };

  const handleDownload = () => {
    if (!decodedImage) {
      showToast("No image to download", "error");
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
      showToast("No image to copy", "error");
      return;
    }

    try {
      await copyImageToClipboard(decodedImage.blob);
      showToast("Image copied to clipboard!", "success");
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
              showToast("Image copied to clipboard!", "success");
            } catch {
              showToast(
                'Copy failed. Try right-clicking the image and selecting "Copy Image".',
                "error"
              );
            }
          }
        }, "image/png");
      } catch {
        showToast(
          'Copy failed. Try right-clicking the image and selecting "Copy Image".',
          "error"
        );
      }
    }
  };

  const handleShare = async () => {
    if (!decodedImage || !navigator.share) {
      showToast("Sharing not supported on this browser", "error");
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
        showToast("Failed to share image", "error");
      }
    }
  };

  const handleStartNew = () => {
    setBase64Input("");
    setDecodedImage(null);
    if (decodedImage) {
      URL.revokeObjectURL(decodedImage.url);
    }
    showToast("Ready for new conversion", "info");
  };

  const inputLength = base64Input.length;
  const isValidInput = base64Input.trim() && isValidBase64(base64Input);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
          Base64 to Image Converter
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          Convert Base64 encoded strings back to image files with Toolspy's
          secure converter. Supports all major image formats with instant
          processing.
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-6 sm:mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Base64 Input</span>
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Paste your Base64 string (with or without data URL prefix)
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
                Paste
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearInput} className="flex-1 sm:flex-initial">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA... or just the Base64 string"
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
                  {getBase64ImageFormat(base64Input)} format detected
                </Badge>
              )}
            </div>
            <Button
              onClick={handleDecode}
              disabled={!isValidInput || isDecoding}
              className="px-4 sm:px-6 text-sm sm:text-base w-full sm:w-auto"
              size="sm"
            >
              {isDecoding ? "Decoding..." : "Decode to Image"}
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
                  <span>Decoded Image</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Successfully decoded {decodedImage.format} image
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="flex-1 sm:flex-initial">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" onClick={handleCopyImage} className="flex-1 sm:flex-initial">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button size="sm" onClick={handleDownload} className="flex-1 sm:flex-initial">
                  <Download className="h-4 w-4 mr-2" />
                  Download
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
                <span className="text-muted-foreground block mb-1">Format:</span>
                <div className="font-medium text-sm sm:text-base">{decodedImage.format}</div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Dimensions:</span>
                <div className="font-medium text-sm sm:text-base">
                  {decodedImage.dimensions.width} ×{" "}
                  {decodedImage.dimensions.height}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">File Size:</span>
                <div className="font-medium text-sm sm:text-base">
                  {formatFileSize(decodedImage.size)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">Input Length:</span>
                <div className="font-medium text-sm sm:text-base">
                  {inputLength.toLocaleString()} chars
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleDownload} className="flex-1">
                <Download className="h-4 w-4 mr-2" />
                Download Image
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyImage}
                className="flex-1"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
              <Button variant="outline" onClick={handleStartNew}>
                <RotateCcw className="h-4 w-4 mr-2" />
                New Conversion
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
