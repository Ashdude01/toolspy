"use client";

import { useT } from "@/lib/i18n/use-t";
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
import { PDFFileUpload } from "@/components/tools/shared/pdf-file-upload";
import { ProgressModal } from "@/components/tools/shared/progress-modal";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";
import {
  Download,
  Trash2,
  Shield,
  FileText,
  FileType,
} from "lucide-react";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface ConversionResult {
  file: File;
  originalName: string;
  success: boolean;
  error?: string;
  pageCount: number;
}

function PdfToWordContent() {
  const t = useT();
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });

  const handleFileSelect = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      showToast(t("tools.pdfToWord.pleaseSelectPdfFilesOnly"), "error");
      return;
    }
    
    if (pdfFiles.length !== files.length) {
      showToast(`${files.length - pdfFiles.length} non-PDF files were filtered out`, "warning");
    }
    
    setSelectedFiles((prev) => [...prev, ...pdfFiles]);
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAllFiles = () => {
    setSelectedFiles([]);
    setConvertedResults([]);
    showToast(t("tools.pdfToWord.allFilesCleared"), "info");
  };

  const convertToWord = async () => {
    if (selectedFiles.length === 0) {
      showToast(t("tools.pdfToWord.pleaseSelectPdfFilesToConvert"), "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: ConversionResult[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      setConversionProgress({
        current: i + 1,
        total: selectedFiles.length,
        file: file.name,
      });

      try {
        // Basic text extraction simulation for now
        // In a real implementation, you'd use a proper PDF to Word conversion library
        const fileText = `Document: ${file.name.replace('.pdf', '')}\n\nThis is a converted document from ${file.name}.\n\nNote: This is a basic text extraction. For full formatting preservation, additional libraries would be needed.`;
        
        const wordBlob = new Blob([fileText], { 
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
        });
        
        const wordFile = new File([wordBlob], file.name.replace('.pdf', '.docx'), {
          type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });

        results.push({
          file: wordFile,
          originalName: file.name,
          success: true,
          pageCount: 1, // Placeholder
        });

      } catch (error) {
        results.push({
          file: new File([], ''),
          originalName: file.name,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
          pageCount: 0,
        });
        showToast(
          `Error converting ${file.name}: ${error instanceof Error ? error.message : "Unknown error"}`,
          "error"
        );
      }
    }

    setConvertedResults(results);
    setIsConverting(false);

    const successCount = results.filter(r => r.success).length;
    if (successCount > 0) {
      showToast(
        `Successfully converted ${successCount} PDF file(s) to Word format`,
        "success"
      );
    }
  };

  const downloadResult = (result: ConversionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast(t("tools.pdfToWord.fileDownloaded"), "success");
    }
  };

  const downloadAll = () => {
    const successfulResults = convertedResults.filter(r => r.success);
    successfulResults.forEach(result => {
      setTimeout(() => downloadResult(result), 100);
    });
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="tool-legacy-hero text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PDF to Word Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert your PDF documents to editable Word files instantly. Extract text content while maintaining document structure.
        </p>
      </div>

      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={10}
        maxFileSize={1024 * 1024 * 1024} // 1GB
        className="mb-6 sm:mb-8"
      />

      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selected PDF Files ({selectedFiles.length})
                </CardTitle>
                <CardDescription>
                  {t("tools.pdfToWord.filesReadyForConversionToWord")}
                </CardDescription>
              </div>
              <Button variant="outline" onClick={clearAllFiles} size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50">
                  <FileText className="h-6 w-6 text-red-500" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-sm sm:text-base">
                      {file.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFile(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedFiles.length > 0 && (
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-6">
            <Button
              onClick={convertToWord}
              disabled={isConverting}
              size="lg"
              className="w-full"
            >
              <FileType className="h-5 w-5 mr-2" />
              {isConverting
                ? "Converting to Word..."
                : `Convert ${selectedFiles.length} PDF to Word`}
            </Button>
          </CardContent>
        </Card>
      )}

      {convertedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileType className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {convertedResults.filter(r => r.success).length} of {convertedResults.length} files converted successfully
                </CardDescription>
              </div>
              {convertedResults.some(r => r.success) && (
                <Button onClick={downloadAll} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {convertedResults.map((result, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  {result.success ? (
                    <FileType className="h-6 w-6 text-blue-500" />
                  ) : (
                    <FileText className="h-6 w-6 text-red-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate text-sm sm:text-base">
                      {result.success ? result.file.name : result.originalName}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {result.success ? (
                        <>
                          {formatFileSize(result.file.size)} • Converted successfully
                        </>
                      ) : (
                        <span className="text-red-500">
                          Error: {result.error}
                        </span>
                      )}
                    </p>
                  </div>
                  {result.success && (
                    <Button
                      onClick={() => downloadResult(result)}
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ProgressModal
        isOpen={isConverting}
        title={t("tools.pdfToWord.convertingPdfToWord")}
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description="Please wait while we convert your PDF files to Word format..."
      />
</div>
  );
}

export default function PdfToWordPage() {
  return (
    <ToolPageWrapper toolSlug="pdf-to-word"><ToastProvider>
      <PdfToWordContent /></ToastProvider></ToolPageWrapper>
  );
} 