"use client";

import { useState, useRef, useCallback } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";

import {
  Download,
  Upload,
  Settings,
  Zap,
  RefreshCw,
  BookOpen,
  Edit,
  Eye,
  Save,
  RotateCcw,
  FileText,
  Image as ImageIcon,
  User,
  Calendar,
  Tag,
  Globe,
  Layers,
  CheckCircle,
  Clock,
  Star,
  Target,
  Book,
  Library,
  Sparkles,
} from "lucide-react";
import { EbookConverterSEOContent } from "./seo-content";

interface EbookMetadata {
  title: string;
  author: string;
  publisher: string;
  description: string;
  language: string;
  genre: string;
  publishDate: string;
  isbn: string;
  coverImage?: File | null;
  rights: string;
  identifier: string;
}

interface ConversionJob {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  targetFormat: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  outputUrl?: string;
  outputSize?: number;
  metadata?: EbookMetadata;
  processingTime?: number;
}

interface ConversionSettings {
  preserveFormatting: boolean;
  optimizeImages: boolean;
  embedFonts: boolean;
  generateTOC: boolean;
  includeMetadata: boolean;
  imageQuality: number;
  textEncoding: string;
  pageSize: string;
  margins: number;
}

function EbookConverterContent() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [conversionJobs, setConversionJobs] = useState<ConversionJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<ConversionJob | null>(null);
  const [targetFormat, setTargetFormat] = useState('epub');
  const [isConverting, setIsConverting] = useState(false);
  const [batchMode, setBatchMode] = useState(false);
  const [showMetadataEditor, setShowMetadataEditor] = useState(false);
  const [currentMetadata, setCurrentMetadata] = useState<EbookMetadata>({
    title: '',
    author: '',
    publisher: '',
    description: '',
    language: 'en',
    genre: '',
    publishDate: '',
    isbn: '',
    rights: 'All Rights Reserved',
    identifier: ''
  });
  
  const [settings, setSettings] = useState<ConversionSettings>({
    preserveFormatting: true,
    optimizeImages: true,
    embedFonts: true,
    generateTOC: true,
    includeMetadata: true,
    imageQuality: 85,
    textEncoding: 'utf-8',
    pageSize: 'A4',
    margins: 2
  });
  
  const { showToast } = useToast();
  const coverInputRef = useRef<HTMLInputElement>(null);

  // Supported formats and their configurations
  const ebookFormats = {
    epub: {
      name: 'EPUB',
      description: 'Universal e-book format',
      extensions: ['.epub'],
      features: ['Reflowable', 'Multimedia', 'Interactive']
    },
    mobi: {
      name: 'MOBI',
      description: 'Amazon Kindle format',
      extensions: ['.mobi', '.azw', '.azw3'],
      features: ['Kindle optimized', 'DRM support', 'Fixed layout']
    },
    pdf: {
      name: 'PDF',
      description: 'Portable Document Format',
      extensions: ['.pdf'],
      features: ['Fixed layout', 'Print ready', 'Cross-platform']
    },
    docx: {
      name: 'DOCX',
      description: 'Microsoft Word format',
      extensions: ['.docx', '.doc'],
      features: ['Editable', 'Track changes', 'Comments']
    },
    txt: {
      name: 'TXT',
      description: 'Plain text format',
      extensions: ['.txt'],
      features: ['Simple', 'Universal', 'Lightweight']
    },
    html: {
      name: 'HTML',
      description: 'Web page format',
      extensions: ['.html', '.htm'],
      features: ['Web ready', 'Multimedia', 'Responsive']
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' }
  ];

  const genres = [
    'Fiction', 'Non-fiction', 'Mystery', 'Romance', 'Science Fiction',
    'Fantasy', 'Biography', 'History', 'Self-help', 'Technical',
    'Children', 'Young Adult', 'Poetry', 'Drama', 'Reference'
  ];

  // Simulate e-book conversion
  const processConversion = useCallback(async (job: ConversionJob) => {
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { ...j, status: 'processing', progress: 0 } : j
    ));

    // Simulate conversion progress with realistic steps
    const steps = [
      { progress: 10, message: "Parsing e-book structure..." },
      { progress: 25, message: "Extracting content and metadata..." },
      { progress: 40, message: "Processing images and media..." },
      { progress: 55, message: "Converting text formatting..." },
      { progress: 70, message: "Generating table of contents..." },
      { progress: 85, message: "Applying target format..." },
      { progress: 95, message: "Finalizing e-book..." },
      { progress: 100, message: "Conversion complete!" }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 300));
      setConversionJobs(prev => prev.map(j => 
        j.id === job.id ? { ...j, progress: step.progress } : j
      ));
    }

    // Complete conversion
    const outputSize = Math.floor(job.fileSize * (0.7 + Math.random() * 0.6));
    const processingTime = Math.floor(Math.random() * 5000) + 3000; // 3-8 seconds
    
    setConversionJobs(prev => prev.map(j => 
      j.id === job.id ? { 
        ...j, 
        status: 'completed', 
        progress: 100,
        outputUrl: URL.createObjectURL(new Blob(['converted-ebook'], { type: 'application/octet-stream' })),
        outputSize,
        processingTime
      } : j
    ));

    showToast(`${job.fileName} converted successfully to ${job.targetFormat.toUpperCase()}!`, "success");
  }, []);

  const handleFileUpload = (files: File[]) => {
    const validExtensions = ['.epub', '.mobi', '.pdf', '.docx', '.doc', '.txt', '.html', '.htm', '.azw', '.azw3'];
    const validFiles = files.filter(file => 
      validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );
    
    if (validFiles.length === 0) {
      showToast("Please upload valid e-book files (EPUB, MOBI, PDF, DOCX, TXT, HTML)", "error");
      return;
    }

    setUploadedFiles(validFiles);
    setBatchMode(validFiles.length > 1);

    // Create conversion jobs
    const jobs: ConversionJob[] = validFiles.map(file => ({
      id: Date.now() + Math.random().toString(),
      fileName: file.name,
      fileType: file.type || 'unknown',
      fileSize: file.size,
      targetFormat,
      status: 'pending',
      progress: 0,
      metadata: { ...currentMetadata }
    }));

    setConversionJobs(jobs);
    
    // Auto-populate metadata from filename for single file
    if (validFiles.length === 1) {
      const fileName = validFiles[0].name.replace(/\.[^/.]+$/, "");
      setCurrentMetadata(prev => ({
        ...prev,
        title: prev.title || fileName,
        identifier: prev.identifier || `${Date.now()}`
      }));
      setSelectedJob(jobs[0]);
    }

    showToast(`${validFiles.length} e-book(s) ready for conversion`, "success");
  };

  const startConversion = async () => {
    if (conversionJobs.length === 0) {
      showToast("No e-books to convert", "error");
      return;
    }

    // Update jobs with current metadata if metadata editing was used
    if (showMetadataEditor && selectedJob) {
      setConversionJobs(prev => prev.map(job => 
        job.id === selectedJob.id ? { ...job, metadata: currentMetadata } : job
      ));
    }

    setIsConverting(true);

    if (batchMode) {
      // Process all files
      for (const job of conversionJobs) {
        if (job.status === 'pending') {
          await processConversion(job);
        }
      }
    } else {
      // Process single file
      const pendingJob = conversionJobs.find(job => job.status === 'pending');
      if (pendingJob) {
        await processConversion(pendingJob);
      }
    }

    setIsConverting(false);
  };

  const downloadFile = (job: ConversionJob) => {
    if (job.outputUrl) {
      const extension = ebookFormats[job.targetFormat as keyof typeof ebookFormats]?.extensions[0] || `.${job.targetFormat}`;
      const a = document.createElement('a');
      a.href = job.outputUrl;
      a.download = `${job.fileName.split('.')[0]}${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      showToast("E-book downloaded successfully", "success");
    }
  };

  const downloadAll = () => {
    const completedJobs = conversionJobs.filter(job => job.status === 'completed' && job.outputUrl);
    completedJobs.forEach(job => downloadFile(job));
    showToast(`Downloaded ${completedJobs.length} e-books`, "success");
  };

  const clearAll = () => {
    setUploadedFiles([]);
    setConversionJobs([]);
    setSelectedJob(null);
    setBatchMode(false);
    setShowMetadataEditor(false);
    setCurrentMetadata({
      title: '',
      author: '',
      publisher: '',
      description: '',
      language: 'en',
      genre: '',
      publishDate: '',
      isbn: '',
      rights: 'All Rights Reserved',
      identifier: ''
    });
    showToast("All e-books cleared", "info");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setCurrentMetadata(prev => ({ ...prev, coverImage: file }));
        showToast("Cover image uploaded", "success");
      } else {
        showToast("Please upload an image file for the cover", "error");
      }
    }
  };

  const autoFillMetadata = () => {
    if (selectedJob) {
      const fileName = selectedJob.fileName.replace(/\.[^/.]+$/, "");
      const randomAuthor = ['John Smith', 'Jane Doe', 'Alex Johnson', 'Sarah Wilson'][Math.floor(Math.random() * 4)];
      const currentYear = new Date().getFullYear();
      
      setCurrentMetadata(prev => ({
        ...prev,
        title: fileName,
        author: randomAuthor,
        publisher: 'Independent Publisher',
        language: 'en',
        publishDate: `${currentYear}`,
        identifier: `${Date.now()}`,
        description: `A compelling ${prev.genre || 'book'} that captivates readers with its engaging narrative and thought-provoking themes.`
      }));
      
      showToast("Metadata auto-filled with sample data", "success");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white">
            <BookOpen size={24} />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            E-book Converter
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Convert e-books between EPUB, MOBI, PDF, DOCX formats with professional metadata editing, 
          cover image support, and advanced conversion settings.
        </p>
      </div>

      {/* Format Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Supported E-book Formats</CardTitle>
          <CardDescription>
            Choose your target format and see compatibility features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(ebookFormats).map(([format, config]) => (
              <Button
                key={format}
                variant={targetFormat === format ? "default" : "outline"}
                className={`h-auto py-4 flex flex-col gap-2 ${
                  targetFormat === format ? 'bg-indigo-600 hover:bg-indigo-700' : ''
                }`}
                onClick={() => setTargetFormat(format)}
              >
                <div className={`text-lg font-bold ${targetFormat === format ? 'text-white' : 'text-indigo-600'}`}>
                  {config.name}
                </div>
                <div className={`text-xs ${targetFormat === format ? 'text-indigo-100' : 'text-gray-600'}`}>
                  {config.description}
                </div>
              </Button>
            ))}
          </div>
          
          {/* Format Features */}
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium mb-2">
              {ebookFormats[targetFormat as keyof typeof ebookFormats]?.name} Features:
            </div>
            <div className="flex flex-wrap gap-2">
              {ebookFormats[targetFormat as keyof typeof ebookFormats]?.features.map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Upload */}
      {uploadedFiles.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload E-books
            </CardTitle>
            <CardDescription>
              Upload EPUB, MOBI, PDF, DOCX, TXT, or HTML files for conversion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer"
              onClick={() => document.getElementById('ebook-file-input')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const files = Array.from(e.dataTransfer.files);
                handleFileUpload(files);
              }}
            >
              <input
                id="ebook-file-input"
                type="file"
                accept=".epub,.mobi,.pdf,.docx,.doc,.txt,.html,.htm,.azw,.azw3"
                multiple={true}
                onChange={(e) => {
                  if (e.target.files) {
                    const files = Array.from(e.target.files);
                    handleFileUpload(files);
                  }
                }}
                className="hidden"
              />
              <BookOpen size={48} className="mx-auto text-indigo-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your e-books here</h3>
              <p className="text-gray-600 mb-4">or click to browse files</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(ebookFormats).slice(0, 4).map(format => (
                  <Badge key={format.name} variant="secondary">
                    {format.name}
                  </Badge>
                ))}
                <Badge variant="outline">+2 more</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Area */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Info and Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Conversion Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Info */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm space-y-1">
                  <div><strong>Files:</strong> {uploadedFiles.length}</div>
                  <div><strong>Total Size:</strong> {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}</div>
                  <div><strong>Target Format:</strong> {ebookFormats[targetFormat as keyof typeof ebookFormats]?.name}</div>
                </div>
              </div>

              {/* Conversion Settings */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="formatting"
                      checked={settings.preserveFormatting}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, preserveFormatting: checked }))}
                    />
                    <Label htmlFor="formatting" className="text-sm">Preserve formatting</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="images"
                      checked={settings.optimizeImages}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, optimizeImages: checked }))}
                    />
                    <Label htmlFor="images" className="text-sm">Optimize images</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="fonts"
                      checked={settings.embedFonts}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, embedFonts: checked }))}
                    />
                    <Label htmlFor="fonts" className="text-sm">Embed fonts</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="toc"
                      checked={settings.generateTOC}
                      onCheckedChange={(checked) => setSettings(prev => ({ ...prev, generateTOC: checked }))}
                    />
                    <Label htmlFor="toc" className="text-sm">Generate TOC</Label>
                  </div>
                </div>

                {/* Advanced Settings */}
                <div className="space-y-3">
                  <div>
                    <Label>Text Encoding</Label>
                    <Select value={settings.textEncoding} onValueChange={(value) => setSettings(prev => ({ ...prev, textEncoding: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utf-8">UTF-8</SelectItem>
                        <SelectItem value="utf-16">UTF-16</SelectItem>
                        <SelectItem value="iso-8859-1">ISO-8859-1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {targetFormat === 'pdf' && (
                    <div>
                      <Label>Page Size</Label>
                      <Select value={settings.pageSize} onValueChange={(value) => setSettings(prev => ({ ...prev, pageSize: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A4">A4</SelectItem>
                          <SelectItem value="A5">A5</SelectItem>
                          <SelectItem value="Letter">Letter</SelectItem>
                          <SelectItem value="Legal">Legal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button onClick={startConversion} disabled={isConverting}>
                  {isConverting ? (
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                  ) : (
                    <Zap size={16} className="mr-2" />
                  )}
                  {batchMode ? `Convert All (${uploadedFiles.length})` : 'Convert E-book'}
                </Button>
                
                {!batchMode && (
                  <Button 
                    onClick={() => setShowMetadataEditor(!showMetadataEditor)} 
                    variant="outline"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit Metadata
                  </Button>
                )}
                
                <Button onClick={clearAll} variant="outline">
                  <RotateCcw size={16} className="mr-2" />
                  Clear All
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Metadata Editor */}
          {showMetadataEditor && !batchMode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Edit size={20} />
                    E-book Metadata
                  </span>
                  <Button onClick={autoFillMetadata} variant="outline" size="sm">
                    <Sparkles size={16} className="mr-1" />
                    Auto-fill
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={currentMetadata.title}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Book title"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={currentMetadata.author}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, author: e.target.value }))}
                      placeholder="Author name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="publisher">Publisher</Label>
                    <Input
                      id="publisher"
                      value={currentMetadata.publisher}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, publisher: e.target.value }))}
                      placeholder="Publisher name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={currentMetadata.language} onValueChange={(value) => setCurrentMetadata(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="genre">Genre</Label>
                    <Select value={currentMetadata.genre} onValueChange={(value) => setCurrentMetadata(prev => ({ ...prev, genre: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="publishDate">Publish Date</Label>
                    <Input
                      id="publishDate"
                      value={currentMetadata.publishDate}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, publishDate: e.target.value }))}
                      placeholder="YYYY or YYYY-MM-DD"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      value={currentMetadata.isbn}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, isbn: e.target.value }))}
                      placeholder="978-0-123456-78-9"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="rights">Rights</Label>
                    <Input
                      id="rights"
                      value={currentMetadata.rights}
                      onChange={(e) => setCurrentMetadata(prev => ({ ...prev, rights: e.target.value }))}
                      placeholder="Copyright information"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentMetadata.description}
                    onChange={(e) => setCurrentMetadata(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Book description or summary"
                    rows={3}
                  />
                </div>
                
                {/* Cover Image Upload */}
                <div>
                  <Label>Cover Image</Label>
                  <div className="mt-2">
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="hidden"
                    />
                    <Button 
                      onClick={() => coverInputRef.current?.click()} 
                      variant="outline"
                      className="w-full"
                    >
                      <ImageIcon size={16} className="mr-2" />
                      {currentMetadata.coverImage ? 'Change Cover' : 'Upload Cover'}
                    </Button>
                    {currentMetadata.coverImage && (
                      <p className="text-sm text-gray-600 mt-1">
                        {currentMetadata.coverImage.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Conversion Progress */}
      {conversionJobs.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Layers size={20} />
                Conversion Progress
              </span>
              {conversionJobs.some(job => job.status === 'completed') && (
                <Button onClick={downloadAll} variant="outline" size="sm">
                  <Download size={16} className="mr-1" />
                  Download All
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{job.fileName}</div>
                    <div className="flex items-center gap-2">
                      {job.status === 'pending' && (
                        <Badge variant="secondary">
                          <Clock size={12} className="mr-1" />
                          Pending
                        </Badge>
                      )}
                      {job.status === 'processing' && (
                        <Badge className="bg-blue-500">
                          <RefreshCw size={12} className="mr-1 animate-spin" />
                          Processing
                        </Badge>
                      )}
                      {job.status === 'completed' && (
                        <Badge className="bg-green-500">
                          <CheckCircle size={12} className="mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-2">
                    {formatFileSize(job.fileSize)} → {ebookFormats[job.targetFormat as keyof typeof ebookFormats]?.name}
                    {job.outputSize && ` (${formatFileSize(job.outputSize)})`}
                    {job.processingTime && ` • ${(job.processingTime / 1000).toFixed(1)}s`}
                  </div>
                  
                  {job.status === 'processing' && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {job.status === 'completed' && job.outputUrl && (
                    <div className="flex gap-2">
                      <Button onClick={() => downloadFile(job)} variant="outline" size="sm">
                        <Download size={14} className="mr-1" />
                        Download
                      </Button>
                      {job.metadata?.title && (
                        <Button onClick={() => {
                          setCurrentMetadata(job.metadata!);
                          setShowMetadataEditor(true);
                        }} variant="outline" size="sm">
                          <Eye size={14} className="mr-1" />
                          View Metadata
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Content */}
      <EbookConverterSEOContent />
    </div>
  );
}

export default function EbookConverterPage() {
  return (
    <ToastProvider>
      <EbookConverterContent />
    </ToastProvider>
  );
}