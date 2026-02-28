"use client";

import { useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  FileSpreadsheet,
} from "lucide-react";
import { formatFileSize, downloadFile } from "@/lib/utils/file-utils";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";
import { scrollToElement } from "@/lib/utils";

interface ConversionResult {
  file: File;
  originalName: string;
  success: boolean;
  error?: string;
  pageCount: number;
  rowCount: number;
}

type OutputFormat = "csv" | "xls" | "xlsx";

function PdfToExcelContent() {
  const { showToast } = useToast();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [convertedResults, setConvertedResults] = useState<ConversionResult[]>(
    []
  );
  const [isConverting, setIsConverting] = useState(false);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("xlsx");
  const [conversionProgress, setConversionProgress] = useState({
    current: 0,
    total: 0,
    file: "",
  });
  const afterUploadRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (files: File[]) => {
    const pdfFiles = files.filter((file) => file.type === "application/pdf");

    if (pdfFiles.length === 0) {
      showToast("Please select PDF files only", "error");
      return;
    }

    if (pdfFiles.length !== files.length) {
      showToast(
        `${files.length - pdfFiles.length} non-PDF files were filtered out`,
        "warning"
      );
    }

    setSelectedFiles((prev) => [...prev, ...pdfFiles]);
    scrollToElement(afterUploadRef, 50);
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
    showToast("All files cleared", "info");
  };

  // Extract text from PDF with position information for table detection
  const extractTextFromPdf = async (
    file: File
  ): Promise<{ textItems: any[]; pageCount: number }> => {
    const pdfjsLib = await import("pdfjs-dist");

    // Configure worker - use local file if available, otherwise use CDN
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      // Try local file first (copied from node_modules during setup)
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
    }

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;
    const pageCount = pdf.numPages;

    const allTextItems: any[] = [];
    const maxPages = Math.min(pageCount, 50); // Limit to 50 pages for performance

    for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const viewport = page.getViewport({ scale: 1.0 });

      // Extract text items with their positions
      textContent.items.forEach((item: any) => {
        if (item.str && item.str.trim()) {
          // Get transform matrix to calculate actual position
          const transform = item.transform || [1, 0, 0, 1, 0, 0];
          const x = transform[4];
          const y = viewport.height - transform[5]; // Invert Y coordinate

          allTextItems.push({
            text: item.str.trim(),
            x: x,
            y: y,
            width: item.width || 0,
            height: item.height || 0,
            page: pageNum,
          });
        }
      });
    }

    return { textItems: allTextItems, pageCount };
  };

  // Convert text items with positions to structured table data (rows and columns)
  const parseTextItemsToRows = (textItems: any[]): string[][] => {
    if (textItems.length === 0) {
      return [["No extractable data found"]];
    }

    // Group items by Y position (rows) - items with similar Y coordinates are in the same row
    const rowTolerance = 5; // Pixels tolerance for considering items in the same row
    const rowsMap = new Map<number, any[]>();

    // Group items by approximate Y position
    textItems.forEach((item) => {
      let foundRow = false;
      const entries = Array.from(rowsMap.entries());
      for (let i = 0; i < entries.length; i++) {
        const [rowY, items] = entries[i];
        if (Math.abs(item.y - rowY) <= rowTolerance) {
          items.push(item);
          foundRow = true;
          break;
        }
      }
      if (!foundRow) {
        rowsMap.set(item.y, [item]);
      }
    });

    // Convert map to array and sort by Y position (top to bottom)
    const rows: any[][] = Array.from(rowsMap.values()).sort((a, b) => {
      const avgY1 = a.reduce((sum, item) => sum + item.y, 0) / a.length;
      const avgY2 = b.reduce((sum, item) => sum + item.y, 0) / b.length;
      return avgY2 - avgY1; // Higher Y first (top of page)
    });

    // Sort items within each row by X position (left to right)
    rows.forEach((row) => {
      row.sort((a, b) => a.x - b.x);
    });

    // Convert to string array and detect table structure
    const tableData: string[][] = [];
    let maxColumns = 0;

    // Detect common column positions across all rows (for better alignment)
    const columnPositions = new Set<number>();
    rows.forEach((row) => {
      row.forEach((item) => {
        // Round to nearest 10 for column alignment
        const alignedX = Math.round(item.x / 10) * 10;
        columnPositions.add(alignedX);
      });
    });
    const sortedColumnPositions = Array.from(columnPositions).sort(
      (a, b) => a - b
    );

    // Process each row
    rows.forEach((row) => {
      const rowData: string[] = [];
      const columnTolerance = 30; // Minimum X distance to consider a new column

      // If we have detected column positions, use them for alignment
      if (sortedColumnPositions.length > 1) {
        // Group items by nearest column position
        const columnGroups: { [key: number]: string[] } = {};

        row.forEach((item) => {
          // Find nearest column position
          let nearestCol = sortedColumnPositions[0];
          let minDist = Math.abs(item.x - nearestCol);

          for (let i = 1; i < sortedColumnPositions.length; i++) {
            const dist = Math.abs(item.x - sortedColumnPositions[i]);
            if (dist < minDist) {
              minDist = dist;
              nearestCol = sortedColumnPositions[i];
            }
          }

          // If close enough to a column, add to that column group
          if (minDist <= columnTolerance) {
            if (!columnGroups[nearestCol]) {
              columnGroups[nearestCol] = [];
            }
            columnGroups[nearestCol].push(item.text);
          }
        });

        // Build row data based on column positions
        sortedColumnPositions.forEach((colX) => {
          if (columnGroups[colX]) {
            rowData.push(columnGroups[colX].join(" ").trim());
          } else {
            rowData.push("");
          }
        });
      } else {
        // Fallback: detect columns by X position gaps
        let currentCell = "";
        let lastX = -1;

        row.forEach((item) => {
          // If X position is significantly different, start a new column
          if (lastX >= 0 && item.x - lastX > columnTolerance) {
            if (currentCell.trim()) {
              rowData.push(currentCell.trim());
              currentCell = "";
            }
          }

          // Add space if needed (items close together are likely same cell)
          if (currentCell && lastX >= 0 && item.x - lastX < columnTolerance) {
            currentCell += " ";
          }

          currentCell += item.text;
          lastX = item.x + (item.width || 0);
        });

        // Add the last cell
        if (currentCell.trim()) {
          rowData.push(currentCell.trim());
        }
      }

      // If row has multiple columns, it's likely a table row
      if (rowData.length > 1) {
        tableData.push(rowData);
        maxColumns = Math.max(maxColumns, rowData.length);
      } else if (rowData.length === 1 && rowData[0].trim()) {
        // Single column row - might be header or text
        tableData.push(rowData);
      }
    });

    // Normalize rows to have same number of columns
    if (maxColumns > 1) {
      return tableData.map((row) => {
        while (row.length < maxColumns) {
          row.push("");
        }
        return row;
      });
    }

    // If no table structure detected, return as single column
    if (tableData.length === 0 || maxColumns <= 1) {
      const singleColumn: string[][] = [];
      rows.forEach((row) => {
        const text = row
          .map((item) => item.text)
          .join(" ")
          .trim();
        if (text) {
          singleColumn.push([text]);
        }
      });
      return singleColumn.length > 0
        ? singleColumn
        : [["No extractable data found"]];
    }

    return tableData.length > 0 ? tableData : [["No extractable data found"]];
  };

  // Generate file based on format
  const generateFile = async (
    data: string[][],
    originalFileName: string,
    format: OutputFormat
  ): Promise<File> => {
    const baseName = originalFileName.replace(/\.pdf$/i, "");

    if (format === "csv") {
      // Generate CSV
      const csvRows = data.map((row) =>
        row
          .map((cell) => {
            // Escape quotes and wrap in quotes if contains comma, newline, or quote
            const escaped = cell.replace(/"/g, '""');
            if (
              cell.includes(",") ||
              cell.includes("\n") ||
              cell.includes('"')
            ) {
              return `"${escaped}"`;
            }
            return escaped;
          })
          .join(",")
      );
      const csvContent = csvRows.join("\n");
      const csvBlob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;",
      });
      return new File([csvBlob], `${baseName}.csv`, { type: "text/csv" });
    } else {
      // Generate XLS or XLSX using xlsx library
      const XLSX = await import("xlsx");
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Auto-size columns
      const colWidths =
        data[0]?.map((_, colIndex) => {
          const maxLength = Math.max(
            ...data.map((row) => (row[colIndex] || "").toString().length),
            10
          );
          return { wch: Math.min(maxLength + 2, 50) };
        }) || [];
      worksheet["!cols"] = colWidths;

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      const fileExtension = format === "xls" ? "xls" : "xlsx";
      const mimeType =
        format === "xls"
          ? "application/vnd.ms-excel"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const excelBuffer = XLSX.write(workbook, {
        type: "array",
        bookType: format === "xls" ? "xls" : "xlsx",
      });

      const excelBlob = new Blob([excelBuffer], { type: mimeType });
      return new File([excelBlob], `${baseName}.${fileExtension}`, {
        type: mimeType,
      });
    }
  };

  const convertToExcel = async () => {
    if (selectedFiles.length === 0) {
      showToast("Please select PDF files to convert", "error");
      return;
    }

    setIsConverting(true);
    setConversionProgress({
      current: 0,
      total: selectedFiles.length,
      file: "",
    });

    const results: ConversionResult[] = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        setConversionProgress({
          current: i + 1,
          total: selectedFiles.length,
          file: file.name,
        });

        try {
          // Extract text from PDF with position information
          const { textItems, pageCount } = await extractTextFromPdf(file);

          // Parse text items to structured table rows and columns
          const rows = parseTextItemsToRows(textItems);

          // Generate file in selected format
          const outputFile = await generateFile(rows, file.name, outputFormat);

          results.push({
            file: outputFile,
            originalName: file.name,
            success: true,
            pageCount,
            rowCount: rows.length,
          });
        } catch (error) {
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          results.push({
            file: new File([], ""),
            originalName: file.name,
            success: false,
            error: errorMessage,
            pageCount: 0,
            rowCount: 0,
          });
          showToast(`Error converting ${file.name}: ${errorMessage}`, "error");
        }
      }
    } catch (error) {
      showToast(
        `Conversion failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "error"
      );
    }

    setConvertedResults(results);
    setIsConverting(false);

    const successCount = results.filter((r) => r.success).length;
    if (successCount > 0) {
      const formatName = outputFormat.toUpperCase();
      showToast(
        `Successfully converted ${successCount} PDF file(s) to ${formatName} format`,
        "success"
      );
    }
  };

  const downloadResult = (result: ConversionResult) => {
    if (result.success) {
      downloadFile(result.file, result.file.name);
      showToast("File downloaded", "success");
    }
  };

  const downloadAll = () => {
    const successfulResults = convertedResults.filter((r) => r.success);
    successfulResults.forEach((result) => {
      setTimeout(() => downloadResult(result), 100);
    });
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

        <h2 className="bg-gradient-to-r from-red-500 dark:from-red-600 to-blue-700 dark:to-blue-500 bg-clip-text pb-1 text-transparent text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          PDF to Excel Converter
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
          Convert PDF documents to Excel spreadsheets instantly. Extract tabular
          data and make it editable in Excel format.
        </p>
      </div>

      <PDFFileUpload
        onFileSelect={handleFileSelect}
        onError={handleError}
        multiple={true}
        maxFiles={10}
        maxFileSize={50 * 1024 * 1024}
        className="mb-6 sm:mb-8"
      />

      {selectedFiles.length > 0 && (
        <div ref={afterUploadRef}>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <Card className="mb-6 sm:mb-8 md:grow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Selected PDF Files ({selectedFiles.length})
                    </CardTitle>
                    <CardDescription>
                      Files ready for conversion to Excel format
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
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border rounded-lg bg-muted/50"
                    >
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

            <Card className="mb-6 sm:mb-8 w-fit">
              <CardHeader>
                <CardTitle>Conversion Settings</CardTitle>
                <CardDescription>
                  Select the output format for your converted files
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="output-format">Output Format</Label>
                  <Select
                    value={outputFormat}
                    onValueChange={(value: OutputFormat) =>
                      setOutputFormat(value)
                    }
                  >
                    <SelectTrigger
                      id="output-format"
                      className="w-full sm:w-[300px]"
                    >
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          <span>Excel (XLSX) - Modern format</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="xls">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="h-4 w-4" />
                          <span>Excel (XLS) - Legacy format</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="csv">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>CSV - Comma separated values</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={convertToExcel}
                  disabled={isConverting}
                  size="lg"
                  className="w-full"
                >
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  {isConverting
                    ? `Converting to ${outputFormat.toUpperCase()}...`
                    : `Convert ${
                        selectedFiles.length
                      } PDF to ${outputFormat.toUpperCase()}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {convertedResults.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  Conversion Results
                </CardTitle>
                <CardDescription>
                  {convertedResults.filter((r) => r.success).length} of{" "}
                  {convertedResults.length} files converted successfully
                </CardDescription>
              </div>
              {convertedResults.some((r) => r.success) && (
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
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  {result.success ? (
                    <FileSpreadsheet className="h-6 w-6 text-green-500" />
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
                          {formatFileSize(result.file.size)} •{" "}
                          {result.pageCount} page(s) • {result.rowCount} row(s)
                          extracted
                        </>
                      ) : (
                        <span className="text-red-500">
                          Error: {result.error}
                        </span>
                      )}
                    </p>
                  </div>
                  {result.success && (
                    <Button onClick={() => downloadResult(result)} size="sm">
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
        title={`Converting PDF to ${outputFormat.toUpperCase()}`}
        current={conversionProgress.current}
        total={conversionProgress.total}
        currentFile={conversionProgress.file}
        description={`Please wait while we extract and convert your PDF files to ${outputFormat.toUpperCase()} format...`}
      />
</div>
  );
}

export default function PdfToExcelPage() {
  return (
    <ToolPageWrapper toolSlug="pdf-to-excel">
      <ToastProvider>
        <PdfToExcelContent />
      </ToastProvider>
    </ToolPageWrapper>
  );
}
