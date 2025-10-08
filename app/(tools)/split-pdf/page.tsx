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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Scissors,
  Settings,
} from "lucide-react";
import { formatFileSize, downloadFile, createZipFromFiles, downloadZip } from "@/lib/utils/file-utils";
import { SplitPdfSEOContent } from "./seo-content";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

interface SplitResult {
  files: File[];
  originalName: string;
  success: boolean;
  error?: string;
  totalPages: number;
}

function SplitPdfContent() {
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [splitResults, setSplitResults] = useState<SplitResult[]>([]);
  const [isSplitting, setIsSplitting] = useState(false);
  const [splitProgress, setSplitProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const [splitMode, setSplitMode] = useState("page-range");
  const [pageRanges, setPageRanges] = useState("");
  const [pagesPerFile, setPagesPerFile] = useState("1");

  const handleFileSelect = (files: File[]) => {
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length === 0) {
      showToast("Please select a PDF file", "error");
      return;
    }
    
    if (pdfFiles.length > 1) {
      showToast("Please select only one PDF file to split", "warning");
    }
    
    setSelectedFile(pdfFiles[0]);
  };

  const handleError = (error: string) => {
    showToast(error, "error");
  };

  const removeFile = () => {
    setSelectedFile(null);
    setSplitResults([]);
  };

  const splitPdf = async () => {
    if (!selectedFile) {
      showToast("Please select a PDF file to split", "error");
      return;
    }

    setIsSplitting(true);
    setSplitProgress({
      current: 0,
      total: 1,
      file: selectedFile.name,
    });

    try {
      // Import PDF library dynamically
      const { PDFDocument } = await import('pdf-lib');
      
      // Read PDF file
      const pdfBytes = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(pdfBytes);
      const totalPages = pdf.getPageCount();

      let ranges: Array<{ start: number; end: number; name: string }> = [];

      if (splitMode === "page-range") {
        // Parse page ranges (e.g., "1-3,5-7,9")
        if (!pageRanges.trim()) {
          showToast("Please specify page ranges (e.g., 1-3,5-7,9)", "error");
          setIsSplitting(false);
          return;
        }

        const rangeStrings = pageRanges.split(',').map(r => r.trim());
        for (const rangeStr of rangeStrings) {
          if (rangeStr.includes('-')) {
            const [start, end] = rangeStr.split('-').map(p => parseInt(p.trim()));
            if (start >= 1 && end <= totalPages && start <= end) {
              ranges.push({ start: start - 1, end: end - 1, name: `pages-${start}-${end}` });
            }
          } else {
            const page = parseInt(rangeStr.trim());
            if (page >= 1 && page <= totalPages) {
              ranges.push({ start: page - 1, end: page - 1, name: `page-${page}` });
            }
          }
        }
      } else if (splitMode === "pages-per-file") {
        const pagesPerChunk = parseInt(pagesPerFile);
        if (pagesPerChunk < 1) {
          showToast("Pages per file must be at least 1", "error");
          setIsSplitting(false);
          return;
        }

        for (let i = 0; i < totalPages; i += pagesPerChunk) {
          const end = Math.min(i + pagesPerChunk - 1, totalPages - 1);
          ranges.push({ 
            start: i, 
            end: end, 
            name: `pages-${i + 1}-${end + 1}` 
          });
        }
      } else if (splitMode === "each-page") {
        for (let i = 0; i < totalPages; i++) {
          ranges.push({ start: i, end: i, name: `page-${i + 1}` });
        }
      }

      if (ranges.length === 0) {
        showToast("No valid page ranges specified", "error");
        setIsSplitting(false);
        return;
      }

      setSplitProgress({
        current: 0,
        total: ranges.length,
        file: selectedFile.name,
      });

      const splitFiles: File[] = [];

      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        setSplitProgress({
          current: i + 1,
          total: ranges.length,
          file: `Creating ${range.name}...`,
        });

        // Create new PDF document
        const splitPdf = await PDFDocument.create();
        
        // Copy pages from original PDF
        const pageIndices = [];
        for (let pageNum = range.start; pageNum <= range.end; pageNum++) {
          pageIndices.push(pageNum);
        }
        
        const copiedPages = await splitPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach((page) => splitPdf.addPage(page));

        // Generate PDF bytes
        const splitPdfBytes = await splitPdf.save();
        const fileName = `${selectedFile.name.replace('.pdf', '')}-${range.name}.pdf`;
        const splitFile = new File([splitPdfBytes], fileName, {
          type: 'application/pdf'
        });

        splitFiles.push(splitFile);
      }

      setSplitResults([{
        files: splitFiles,
        originalName: selectedFile.name,
        success: true,
        totalPages: totalPages,
      }]);

      showToast(`Successfully split PDF into ${splitFiles.length} files`, "success");

    } catch (error) {
      setSplitResults([{
        files: [],
        originalName: selectedFile.name,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        totalPages: 0,
      }]);
      showToast(
        "Split failed: " + (error instanceof Error ? error.message : "Unknown error"),
        "error"
      );
    } finally {
      setIsSplitting(false);
    }
  };

  const downloadSingle = (file: File) => {
    downloadFile(file, file.name);
    showToast("File downloaded", "success");
  };

  const downloadAll = async () => {
    if (splitResults.length > 0 && splitResults[0].success) {
      const files = splitResults[0].files;
      if (files.length === 1) {
        downloadSingle(files[0]);
      } else {
        const zipName = `${selectedFile?.name.replace('.pdf', '')}-split.zip`;
        const zipBlob = await createZipFromFiles(files, zipName);
        downloadZip(zipBlob, zipName);
        showToast("All files downloaded as ZIP", "success");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
      <div className="text-center mb-6 sm:mb-8">
        <Badge
          variant="outline"
          className="font-bold text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900"
        >
          <Shield className="w-4 h-4 mr-2" />
          Privacy-First • No Data Collection
        </Badge>

        <h1 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          Split PDF Files
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Split large PDF documents into smaller files by page ranges, number of pages per file, or individual pages.
        </p>
      </div>

      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={false}
        maxFiles={1}
        maxFileSize={100 * 1024 * 1024}
        className="mb-6 sm:mb-8"
      />

      {selectedFile && (
        <Card className="mb-6 sm:mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Selected PDF File
                </CardTitle>
                <CardDescription>
                  Configure how you want to split this PDF document
                </CardDescription>
              </div>
              <Button variant="outline" onClick={removeFile} size="sm">
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50 mb-6">
              <FileText className="h-6 w-6 text-red-500" />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate text-sm sm:text-base">
                  {selectedFile.name}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="split-mode">Split Mode</Label>
                <Select value={splitMode} onValueChange={setSplitMode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page-range">Page Ranges</SelectItem>
                    <SelectItem value="pages-per-file">Pages per File</SelectItem>
                    <SelectItem value="each-page">Each Page Separate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {splitMode === "page-range" && (
                <div>
                  <Label htmlFor="page-ranges">Page Ranges</Label>
                  <Input
                    id="page-ranges"
                    placeholder="e.g., 1-3,5-7,9"
                    value={pageRanges}
                    onChange={(e) => setPageRanges(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Specify page ranges separated by commas. Examples: "1-3,5-7,9" or "1,3,5-10"
                  </p>
                </div>
              )}

              {splitMode === "pages-per-file" && (
                <div>
                  <Label htmlFor="pages-per-file">Pages per File</Label>
                  <Input
                    id="pages-per-file"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={pagesPerFile}
                    onChange={(e) => setPagesPerFile(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Number of pages to include in each split file
                  </p>
                </div>
              )}

              {splitMode === "each-page" && (
                <p className="text-sm text-muted-foreground">
                  Each page will be saved as a separate PDF file.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {selectedFile && (
        <Card className="mb-6 sm:mb-8">
          <CardContent className="pt-6">
            <Button
              onClick={splitPdf}
              disabled={isSplitting}
              size="lg"
              className="w-full"
            >
              <Scissors className="h-5 w-5 mr-2" />
              {isSplitting ? "Splitting PDF..." : "Split PDF"}
            </Button>
          </CardContent>
        </Card>
      )}

      {splitResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="h-5 w-5" />
                  Split Results
                </CardTitle>
                <CardDescription>
                  {splitResults[0].success ? 
                    `PDF split into ${splitResults[0].files.length} files` : 
                    "Split failed"}
                </CardDescription>
              </div>
              {splitResults[0].success && (
                <Button onClick={downloadAll} size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {splitResults[0].success ? (
              <div className="space-y-3">
                {splitResults[0].files.map((file, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
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
                      onClick={() => downloadSingle(file)}
                      size="sm"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">
                  {splitResults[0].error || "An error occurred during splitting"}
                </p>
                <Button onClick={() => setSplitResults([])} variant="outline">
                  Try Again
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <ProgressModal
        isOpen={isSplitting}
        title="Splitting PDF"
        current={splitProgress.current}
        total={splitProgress.total}
        currentFile={splitProgress.file}
        description="Please wait while we split your PDF file..."
      />

      <SplitPdfSEOContent />
    </div>
  );
}

export default function SplitPdfPage() {
  return (
    <ToolPageWrapper toolSlug="split-pdf">
      (
    <ToastProvider>
      <SplitPdfContent />
    </ToastProvider>
  )
    </ToolPageWrapper>
  );
} 