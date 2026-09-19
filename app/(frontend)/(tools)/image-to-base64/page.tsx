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
import { FileUpload } from "@/components/tools/shared/file-upload";
import { ImagePreview } from "@/components/tools/shared/image-preview";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Copy,
  RotateCcw,
  Image as ImageIcon,
  FileText,
  ArrowRight,
} from "lucide-react";
import { fileToBase64 } from "@/lib/utils/base64-utils";
import {
  formatFileSize,
  downloadFile,
  copyToClipboard,
  generateTimestamp,
  addWatermarkToFilename,
} from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { useT } from "@/lib/i18n/use-t";

function ImageToBase64Content() {
  const t = useT();
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [base64Result, setBase64Result] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setBase64Result("");
    }
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      showToast(t("tools.imageToBase64.selectImageFirst"), "error");
      return;
    }

    setIsConverting(true);

    try {
      // Add delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));

      const base64String = await fileToBase64(selectedFile);
      setBase64Result(base64String);

      const sizeReduction =
        ((base64String.length - selectedFile.size) / selectedFile.size) * 100;

      showToast(t("tools.imageToBase64.convertSuccess"), "success");

      if (sizeReduction > 33) {
        showToast(
          t("tools.imageToBase64.sizeIncreaseNote"),
          "info",
          4000
        );
      }
    } catch (error) {
      console.error("Conversion error:", error);
      showToast(t("tools.imageToBase64.convertError"), "error");
    } finally {
      setIsConverting(false);
    }
  };

  const handleCopyBase64 = async () => {
    if (!base64Result) {
      showToast(t("tools.imageToBase64.noDataToCopy"), "error");
      return;
    }

    try {
      await copyToClipboard(base64Result);
      showToast(t("tools.imageToBase64.copiedToClipboard"), "success");
    } catch (error) {
      showToast(t("tools.imageToBase64.copyFailed"), "error");
    }
  };

  const handleDownloadTxt = () => {
    if (!base64Result) {
      showToast(t("tools.imageToBase64.noDataToDownload"), "error");
      return;
    }

    try {
      const watermark = process.env.NEXT_PUBLIC_FILE_WATERMARK || "toolspy";
      const filename = `${watermark}-base64.txt`;
      const blob = new Blob([base64Result], { type: "text/plain" });

      downloadFile(blob, filename);
      showToast(t("tools.imageToBase64.downloadSuccess"), "success");
    } catch (error) {
      showToast(t("tools.imageToBase64.downloadFailed"), "error");
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setBase64Result("");
    showToast(t("tools.imageToBase64.cleared"), "success");
  };

  const base64Size = base64Result ? new Blob([base64Result]).size : 0;
  const compressionRatio =
    selectedFile && base64Size
      ? (((base64Size - selectedFile.size) / selectedFile.size) * 100).toFixed(
          1
        )
      : "0";

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
      {/* Header */}
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">{t("tools.imageToBase64.title")}</h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          {t("tools.imageToBase64.subtitle")}
        </p>
      </div>

      {/* Upload Section */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={false}
        maxFiles={1}
      />

      {/* Preview Section */}
      {selectedFile && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t("tools.imageToBase64.previewTitle")}</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("tools.imageToBase64.previewDescription")}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="px-4 sm:px-6 text-sm sm:text-base flex-1 sm:flex-initial"
                  size="sm"
                >
                  {isConverting ? (
                    <>{t("tools.imageToBase64.converting")}</>
                  ) : (
                    <>
                      <span className="hidden sm:inline">{t("tools.imageToBase64.convert")}</span>
                      <span className="sm:hidden">{t("tools.imageToBase64.convertShort")}</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={handleClear} size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t("toolCommon.clear")}</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ImagePreview file={selectedFile} showMetadata={true} />
          </CardContent>
        </Card>
      )}

      {/* Conversion Loading */}
      {isConverting && (
        <Card className="mb-6 sm:mb-8">
          <CardContent className="py-8 sm:py-12">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary mx-auto"></div>
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-medium">{t("tools.imageToBase64.convertingTitle")}</h3>
                <p className="text-sm sm:text-base text-muted-foreground px-4">
                  {t("tools.imageToBase64.convertingHint")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {base64Result && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>{t("tools.imageToBase64.resultTitle")}</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {t("tools.imageToBase64.resultDescription")}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 flex-wrap gap-2">
                <Button variant="outline" onClick={handleCopyBase64} size="sm" className="flex-1 sm:flex-initial">
                  <Copy className="h-4 w-4 mr-2" />
                  {t("toolCommon.copy")}
                </Button>
                <Button onClick={handleDownloadTxt} size="sm" className="flex-1 sm:flex-initial">
                  <Download className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">{t("tools.imageToBase64.downloadTxt")}</span>
                  <span className="sm:hidden">{t("toolCommon.download")}</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Base64 Output */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <span className="text-sm font-medium">{t("tools.imageToBase64.base64StringLabel")}</span>
                <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground">
                  <span>{base64Result.length.toLocaleString()} characters</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{formatFileSize(base64Size)}</span>
                  {parseFloat(compressionRatio) > 0 && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <Badge variant="outline" className="text-xs">
                        {t("tools.imageToBase64.sizeIncreaseBadge", { ratio: compressionRatio })}
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              <Textarea
                value={base64Result}
                readOnly
                className="min-h-32 font-mono text-xs sm:text-sm resize-none"
                placeholder={t("tools.imageToBase64.outputPlaceholder")}
                rows={6}
              />
            </div>

            {/* Usage Examples */}
            <div className="space-y-4">
              <h4 className="font-medium text-sm sm:text-base">{t("tools.imageToBase64.usageExamples")}</h4>

              <div className="space-y-3">
                <div className="p-2 sm:p-3 bg-muted rounded-lg">
                  <div className="text-xs sm:text-sm font-medium mb-1">
                    {t("tools.imageToBase64.htmlImg")}
                  </div>
                  <code className="text-[10px] sm:text-xs break-all block overflow-x-auto">
                    &lt;img src="{base64Result.substring(0, 50)}..." alt="Image"
                    /&gt;
                  </code>
                </div>

                <div className="p-2 sm:p-3 bg-muted rounded-lg">
                  <div className="text-xs sm:text-sm font-medium mb-1">
                    {t("tools.imageToBase64.cssBackground")}
                  </div>
                  <code className="text-[10px] sm:text-xs break-all block overflow-x-auto">
                    background-image: url('{base64Result.substring(0, 50)}...');
                  </code>
                </div>

                <div className="p-2 sm:p-3 bg-muted rounded-lg">
                  <div className="text-xs sm:text-sm font-medium mb-1">{t("tools.imageToBase64.jsonData")}</div>
                  <code className="text-[10px] sm:text-xs break-all block overflow-x-auto">
                    "image": "{base64Result.substring(0, 50)}..."
                  </code>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm border-t pt-4">
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.imageToBase64.originalSize")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {formatFileSize(selectedFile?.size || 0)}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.imageToBase64.base64Size")}</span>
                <div className="font-medium text-sm sm:text-base">{formatFileSize(base64Size)}</div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.imageToBase64.characters")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {base64Result.length.toLocaleString()}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground block mb-1">{t("tools.imageToBase64.format")}</span>
                <div className="font-medium text-sm sm:text-base">
                  {selectedFile
                    ? selectedFile.type.split("/")[1]?.toUpperCase() ||
                      "Unknown"
                    : "N/A"}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleCopyBase64} className="flex-1">
                <Copy className="h-4 w-4 mr-2" />
                {t("tools.imageToBase64.copyBase64String")}
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadTxt}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                {t("tools.imageToBase64.downloadAsTxt")}
              </Button>
              <Button variant="outline" onClick={handleClear}>
                <RotateCcw className="h-4 w-4 mr-2" />
                {t("toolCommon.clearAll")}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="mt-6 sm:mt-8">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">{t("tools.imageToBase64.aboutTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs sm:text-sm">
          <div>
            <strong>{t("tools.imageToBase64.whatIsBase64")}</strong>{" "}
            {t("tools.imageToBase64.whatIsBase64Body")}
          </div>

          <div>
            <strong>{t("tools.imageToBase64.useCases")}</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>{t("tools.imageToBase64.useCase1")}</li>
              <li>{t("tools.imageToBase64.useCase2")}</li>
              <li>{t("tools.imageToBase64.useCase3")}</li>
              <li>{t("tools.imageToBase64.useCase4")}</li>
            </ul>
          </div>

          <div>
            <strong>{t("tools.imageToBase64.importantNotes")}</strong>
            <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
              <li>{t("tools.imageToBase64.note1")}</li>
              <li>{t("tools.imageToBase64.note2")}</li>
              <li>{t("tools.imageToBase64.note3")}</li>
              <li>{t("tools.imageToBase64.note4")}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Seo Content */}
</div>
  );
}

export default function ImageToBase64Page() {
  return (
    <ToolPageWrapper toolSlug="image-to-base64">
      <ToastProvider>
        <ImageToBase64Content />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
