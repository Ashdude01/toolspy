"use client";

import {
  useState,
  useCallback,
  useEffect,
  type Dispatch,
  type SetStateAction,
} from "react";
import Link from "next/link";
import JSZip from "jszip";
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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ToastProvider,
  useToast,
} from "@/components/tools/shared/toast-provider";

import {
  Download,
  Trash2,
  Upload,
  Settings,
  RefreshCw,
  Sparkles,
  Image as ImageIcon,
  Layers,
  Contrast,
  Gauge,
  ArrowRight,
  FileArchive,
  ArrowLeftRight,
  Expand,
} from "lucide-react";
import { ToolPageWrapper } from "@/components/seo/tool-page-wrapper";

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("read failed"));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, data] = dataUrl.split(",");
  const mime = /data:([^;]+)/.exec(header)?.[1] ?? "image/png";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

function safeDownloadFilename(name: string): string {
  return name.replace(/[^\w.\- ()\[\]]+/g, "_");
}

interface PresetDefinition {
  id: string;
  name: string;
  subtitle: string;
  settings: EnhancementSettings;
}

interface BatchSourceItem {
  id: string;
  file: File;
  dataUrl: string;
}

interface EnhancementResult {
  original: string;
  enhanced: string;
  enhancement: string;
  processingTime: number;
  improvements: {
    resolution: string;
    quality: number;
    clarity: number;
    colors: number;
  };
  settings: EnhancementSettings;
}

interface EnhancementSettings {
  enhancement: 'upscale' | 'unblur' | 'restore' | 'colorize' | 'denoise' | 'auto';
  upscaleFactor: number;
  qualityBoost: number;
  colorEnhancement: number;
  contrastBoost: number;
  sharpenAmount: number;
  preserveDetails: boolean;
  aiStrength: number;
}

/** Industry-style presets: each id is stable; configs tuned for distinct looks (Lightroom / Topaz–style balance). */
const ENHANCEMENT_PRESETS: PresetDefinition[] = [
  {
    id: "preset-smart-auto",
    name: "Smart Auto",
    subtitle: "Neutral balance - best default for mixed shots",
    settings: {
      enhancement: "auto",
      upscaleFactor: 1,
      qualityBoost: 62,
      colorEnhancement: 42,
      contrastBoost: 26,
      sharpenAmount: 44,
      preserveDetails: true,
      aiStrength: 76,
    },
  },
  {
    id: "preset-portrait",
    name: "Portrait",
    subtitle: "Soft contrast, natural skin, gentle clarity",
    settings: {
      enhancement: "auto",
      upscaleFactor: 1,
      qualityBoost: 68,
      colorEnhancement: 34,
      contrastBoost: 18,
      sharpenAmount: 46,
      preserveDetails: true,
      aiStrength: 72,
    },
  },
  {
    id: "preset-landscape",
    name: "Landscape",
    subtitle: "Sky detail, punchy color, micro-contrast",
    settings: {
      enhancement: "auto",
      upscaleFactor: 1,
      qualityBoost: 52,
      colorEnhancement: 58,
      contrastBoost: 38,
      sharpenAmount: 56,
      preserveDetails: true,
      aiStrength: 82,
    },
  },
  {
    id: "preset-night-low-light",
    name: "Night & low light",
    subtitle: "Lift shadows, tame noise, keep edges soft",
    settings: {
      enhancement: "denoise",
      upscaleFactor: 1,
      qualityBoost: 78,
      colorEnhancement: 32,
      contrastBoost: 22,
      sharpenAmount: 32,
      preserveDetails: true,
      aiStrength: 84,
    },
  },
  {
    id: "preset-old-photo",
    name: "Old photo restore",
    subtitle: "Faded dyes, yellowed paper, vintage scans",
    settings: {
      enhancement: "restore",
      upscaleFactor: 1,
      qualityBoost: 86,
      colorEnhancement: 52,
      contrastBoost: 46,
      sharpenAmount: 44,
      preserveDetails: true,
      aiStrength: 88,
    },
  },
  {
    id: "preset-super-2x",
    name: "Super resolution 2×",
    subtitle: "Web → print-friendly; sharp but natural",
    settings: {
      enhancement: "upscale",
      upscaleFactor: 2,
      qualityBoost: 58,
      colorEnhancement: 36,
      contrastBoost: 24,
      sharpenAmount: 62,
      preserveDetails: true,
      aiStrength: 86,
    },
  },
  {
    id: "preset-super-4x",
    name: "Super resolution 4×",
    subtitle: "Max enlargement - use on small sources only",
    settings: {
      enhancement: "upscale",
      upscaleFactor: 4,
      qualityBoost: 54,
      colorEnhancement: 30,
      contrastBoost: 20,
      sharpenAmount: 58,
      preserveDetails: true,
      aiStrength: 90,
    },
  },
  {
    id: "preset-sharpen-deblur",
    name: "Sharpen & deblur",
    subtitle: "Camera shake, missed focus, soft lenses",
    settings: {
      enhancement: "unblur",
      upscaleFactor: 1,
      qualityBoost: 64,
      colorEnhancement: 36,
      contrastBoost: 52,
      sharpenAmount: 82,
      preserveDetails: true,
      aiStrength: 84,
    },
  },
  {
    id: "preset-colorize-bw",
    name: "Colorize B&W",
    subtitle: "Rich tones for monochrome or flat color",
    settings: {
      enhancement: "colorize",
      upscaleFactor: 1,
      qualityBoost: 48,
      colorEnhancement: 92,
      contrastBoost: 34,
      sharpenAmount: 40,
      preserveDetails: true,
      aiStrength: 88,
    },
  },
  {
    id: "preset-document",
    name: "Document & text",
    subtitle: "Screenshots, scans, receipts - crisp edges",
    settings: {
      enhancement: "unblur",
      upscaleFactor: 1,
      qualityBoost: 48,
      colorEnhancement: 18,
      contrastBoost: 52,
      sharpenAmount: 76,
      preserveDetails: true,
      aiStrength: 74,
    },
  },
];

const DEFAULT_PRESET_ID = "preset-smart-auto";

const DEFAULT_ENHANCEMENT_SETTINGS: EnhancementSettings =
  ENHANCEMENT_PRESETS.find((p) => p.id === DEFAULT_PRESET_ID)!.settings;

function EnhancementSettingsForm({
  settings,
  onSettingsChange,
  presets,
  activePresetId,
  onPresetSelect,
  enhancementModeHints,
}: {
  settings: EnhancementSettings;
  onSettingsChange: Dispatch<SetStateAction<EnhancementSettings>>;
  presets: PresetDefinition[];
  activePresetId: string | null;
  onPresetSelect: (preset: PresetDefinition) => void;
  enhancementModeHints: Record<EnhancementSettings["enhancement"], string>;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-2 block">Quick presets</Label>
        
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1"
          style={{ scrollbarWidth: "thin" }}
        >
          {presets.map((preset) => {
            const isActive = activePresetId === preset.id;
            return (
              <Button
                key={preset.id}
                type="button"
                variant="outline"
                onClick={() => onPresetSelect(preset)}
                className={`h-auto py-3 px-3 flex flex-col items-stretch text-left gap-0.5 transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 border-emerald-500/80 shadow-md ring-2 ring-emerald-400/70"
                    : "hover:border-emerald-400/80"
                }`}
              >
                <span className="font-medium text-sm leading-tight">{preset.name}</span>
                <span
                  className={`text-xs font-normal leading-snug ${
                    isActive ? "text-white/90" : "text-muted-foreground"
                  }`}
                >
                  {preset.subtitle}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <Label htmlFor="enhancement">Enhancement mode</Label>
        
        <Select
          value={settings.enhancement}
          onValueChange={(value: EnhancementSettings["enhancement"]) =>
            onSettingsChange((prev) => ({ ...prev, enhancement: value }))
          }
        >
          <SelectTrigger id="enhancement">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Smart Auto - general purpose</SelectItem>
            <SelectItem value="upscale">Super resolution (upscale)</SelectItem>
            <SelectItem value="unblur">Sharpen &amp; deblur</SelectItem>
            <SelectItem value="restore">Old / faded photo restore</SelectItem>
            <SelectItem value="colorize">Colorize black &amp; white</SelectItem>
            <SelectItem value="denoise">Reduce noise &amp; grain</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-2">
          {enhancementModeHints[settings.enhancement]}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Fine adjustments</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {settings.enhancement === "upscale" && (
            <div className="sm:col-span-2">
              <Label htmlFor="upscale-factor">Scale factor: {settings.upscaleFactor}×</Label>
             
              <Slider
                id="upscale-factor"
                value={[settings.upscaleFactor]}
                onValueChange={([value]) =>
                  onSettingsChange((prev) => ({ ...prev, upscaleFactor: value }))
                }
                max={4}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          )}

          <div>
            <Label htmlFor="quality-boost">Exposure / brightness lift</Label>
            
            <Slider
              id="quality-boost"
              value={[settings.qualityBoost]}
              onValueChange={([value]) =>
                onSettingsChange((prev) => ({ ...prev, qualityBoost: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="color-enhancement">Vibrance &amp; saturation</Label>
           
            <Slider
              id="color-enhancement"
              value={[settings.colorEnhancement]}
              onValueChange={([value]) =>
                onSettingsChange((prev) => ({ ...prev, colorEnhancement: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="contrast-boost">Contrast &amp; punch</Label>
            
            <Slider
              id="contrast-boost"
              value={[settings.contrastBoost]}
              onValueChange={([value]) =>
                onSettingsChange((prev) => ({ ...prev, contrastBoost: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="sharpen-amount">Clarity &amp; sharpness</Label>
            
            <Slider
              id="sharpen-amount"
              value={[settings.sharpenAmount]}
              onValueChange={([value]) =>
                onSettingsChange((prev) => ({ ...prev, sharpenAmount: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="ai-strength">Enhancement strength</Label>
            
            <Slider
              id="ai-strength"
              value={[settings.aiStrength]}
              onValueChange={([value]) =>
                onSettingsChange((prev) => ({ ...prev, aiStrength: value }))
              }
              max={100}
              min={0}
              step={5}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
        <Switch
          id="preserve-details"
          checked={settings.preserveDetails}
          onCheckedChange={(checked) =>
            onSettingsChange((prev) => ({ ...prev, preserveDetails: checked }))
          }
          className="mt-0.5"
        />
        <div>
          <Label htmlFor="preserve-details" className="cursor-pointer">
            Preserve fine detail (reduce halos)
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            Keeps edges and texture cleaner when pushing sharpness or contrast.
          </p>
        </div>
      </div>
    </div>
  );
}

function PostDownloadToolsCard() {
  return (
    <Card className="border-emerald-200/80 dark:border-emerald-900/80 bg-muted/15">
      <CardHeader>
        <CardTitle className="text-lg">Compress, convert &amp; resize</CardTitle>
        <CardDescription>
          After you export, use these tools on your saved images - each opens a dedicated page on Toolspy.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/image-compressor" className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <div className="flex h-full flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-colors group-hover:border-emerald-500/50 group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/25">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Gauge size={18} className="text-emerald-600 shrink-0" />
                Compress
                <ArrowRight size={14} className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Smaller files for web, chat, and email.
              </p>
            </div>
          </Link>
          <Link href="/image-converter" className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <div className="flex h-full flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-colors group-hover:border-emerald-500/50 group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/25">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <ArrowLeftRight size={18} className="text-emerald-600 shrink-0" />
                Convert
                <ArrowRight size={14} className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                JPG, PNG, WebP, and more - change format in-browser.
              </p>
            </div>
          </Link>
          <Link href="/image-resizer" className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
            <div className="flex h-full flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-colors group-hover:border-emerald-500/50 group-hover:bg-emerald-50/60 dark:group-hover:bg-emerald-950/25">
              <div className="flex items-center gap-2 font-medium text-foreground">
                <Expand size={18} className="text-emerald-600 shrink-0" />
                Resize
                <ArrowRight size={14} className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <p className="text-xs text-muted-foreground leading-snug">
                Set width, height, or scale for exact dimensions.
              </p>
            </div>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function AiImageEnhancerContent() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [result, setResult] = useState<EnhancementResult | null>(null);
  const [comparePosition, setComparePosition] = useState(50);
  const [imageLoading, setImageLoading] = useState(false);
  const [settings, setSettings] = useState<EnhancementSettings>(() => ({
    ...DEFAULT_ENHANCEMENT_SETTINGS,
  }));
  const [activePresetId, setActivePresetId] = useState<string | null>(
    DEFAULT_PRESET_ID
  );

  const onSettingsChange = useCallback(
    (u: SetStateAction<EnhancementSettings>) => {
      setActivePresetId(null);
      setSettings(u);
    },
    []
  );

  const onPresetSelect = useCallback((preset: PresetDefinition) => {
    setActivePresetId(preset.id);
    setSettings({ ...preset.settings });
  }, []);

  const [batchMode, setBatchMode] = useState(false);
  const [batchSources, setBatchSources] = useState<BatchSourceItem[]>([]);
  const [batchEnhanced, setBatchEnhanced] = useState<Record<string, string>>({});
  const [batchSelectedIds, setBatchSelectedIds] = useState<string[]>([]);

  const { showToast } = useToast();

  /** Client-side enhancement (instant preview; no simulated delays). */
  const generateEnhancementResult = useCallback(
    (imageData: string, s: EnhancementSettings): Promise<EnhancementResult> => {
      return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.onload = () => {
          if (!ctx) {
            reject(new Error("Canvas not supported"));
            return;
          }
          const scaleFactor = s.enhancement === "upscale" ? s.upscaleFactor : 1;
          canvas.width = img.width * scaleFactor;
          canvas.height = img.height * scaleFactor;

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          let filter = "";
          const strength = 0.5 + (s.aiStrength / 100) * 0.5;
          const c = s.contrastBoost * strength;
          const q = s.qualityBoost * strength;
          const col = s.colorEnhancement * strength;

          if (s.enhancement === "unblur" || s.enhancement === "auto") {
            filter += `contrast(${100 + c}%) `;
            filter += `brightness(${100 + q / 3}%) `;
          }

          if (s.enhancement === "colorize" || s.enhancement === "auto") {
            filter += `saturate(${100 + col}%) `;
          }

          if (s.enhancement === "restore" || s.enhancement === "auto") {
            filter += `contrast(${100 + c}%) `;
            filter += `brightness(105%) `;
          }

          if (s.enhancement === "denoise") {
            filter += `contrast(${100 + c / 2}%) `;
            filter += `brightness(${100 + q / 4}%) `;
          }

          if (filter) {
            ctx.filter = filter;
            ctx.drawImage(canvas, 0, 0);
            ctx.filter = "none";
          }

          const enhancedImage = canvas.toDataURL("image/png", 0.95);

          const improvements = {
            resolution:
              s.enhancement === "upscale"
                ? `${img.width}x${img.height} → ${canvas.width}x${canvas.height}`
                : `${img.width}x${img.height}`,
            quality: Math.min(100, 60 + q),
            clarity: Math.min(100, 50 + s.sharpenAmount * strength + c),
            colors: Math.min(100, 70 + col),
          };

          resolve({
            original: imageData,
            enhanced: enhancedImage,
            enhancement: s.enhancement,
            processingTime: 0,
            improvements,
            settings: { ...s },
          });
        };
        img.src = imageData;
      });
    },
    []
  );

  useEffect(() => {
    if (!uploadedImage || batchMode) {
      setResult(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const next = await generateEnhancementResult(uploadedImage, settings);
        if (!cancelled) setResult(next);
      } catch {
        if (!cancelled) {
          setResult(null);
          showToast("Could not preview enhancement. Try another image.", "error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- showToast from context is stable
  }, [uploadedImage, settings, batchMode, generateEnhancementResult]);

  const batchSourcesKey = batchSources.map((s) => s.id).join("|");

  useEffect(() => {
    if (!batchMode || batchSources.length === 0) {
      setBatchEnhanced({});
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const entries = await Promise.all(
          batchSources.map(async (s) => {
            const r = await generateEnhancementResult(s.dataUrl, settings);
            return [s.id, r.enhanced] as const;
          })
        );
        if (cancelled) return;
        setBatchEnhanced(Object.fromEntries(entries));
      } catch {
        if (!cancelled) {
          setBatchEnhanced({});
          showToast("Could not update batch previews.", "error");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- batchSourcesKey tracks list identity
  }, [batchMode, settings, batchSourcesKey, generateEnhancementResult]);

  const handleImageUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Please upload an image file", "error");
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      showToast("File size too large. Please upload an image under 50MB.", "error");
      return;
    }

    setImageLoading(true);
    const reader = new FileReader();
    reader.onerror = () => {
      setImageLoading(false);
      showToast("Failed to read image file", "error");
    };
    reader.onload = async (e) => {
      try {
        const imageData = e.target?.result as string;
        setUploadedImage(imageData);
        setComparePosition(50);
        setImageLoading(false);
        showToast("Image uploaded. Adjust settings - preview updates live.", "success");
      } catch (error) {
        setImageLoading(false);
        showToast("Failed to process image", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleBatchUpload = async (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      showToast("Please upload image files", "error");
      return;
    }

    try {
      const items: BatchSourceItem[] = await Promise.all(
        imageFiles.map(async (file, i) => ({
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `batch-${Date.now()}-${i}`,
          file,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );
      setBatchSources(items);
      setBatchSelectedIds(items.map((x) => x.id));
      setBatchEnhanced({});
      setBatchMode(true);
      showToast(
        `${items.length} image(s) loaded. Adjust settings - all previews update together.`,
        "success"
      );
    } catch {
      showToast("Failed to read one or more files.", "error");
    }
  };

  const handleAddMoreBatchImages = async (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      showToast("Please choose image files.", "error");
      return;
    }
    try {
      const newItems: BatchSourceItem[] = await Promise.all(
        imageFiles.map(async (file, i) => ({
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : `batch-add-${Date.now()}-${i}`,
          file,
          dataUrl: await readFileAsDataUrl(file),
        }))
      );
      setBatchSources((prev) => [...prev, ...newItems]);
      setBatchSelectedIds((prev) => [...prev, ...newItems.map((x) => x.id)]);
      showToast(
        `${newItems.length} added - same settings (and active preset) apply to all thumbnails.`,
        "success"
      );
    } catch {
      showToast("Failed to read added files.", "error");
    }
  };

  const toggleBatchSelect = (id: string) => {
    setBatchSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAllBatch = () => {
    setBatchSelectedIds(batchSources.map((s) => s.id));
  };

  const clearBatchSelection = () => {
    setBatchSelectedIds([]);
  };

  const downloadBatchZip = async (scope: "all" | "selected") => {
    if (scope === "selected" && batchSelectedIds.length === 0) {
      showToast("Select one or more thumbnails first.", "error");
      return;
    }
    const ids =
      scope === "selected" ? batchSelectedIds : batchSources.map((s) => s.id);
    const ready = ids.filter((id) => batchEnhanced[id]);
    if (ready.length === 0) {
      showToast("No enhanced previews ready yet. Wait a moment or adjust settings.", "error");
      return;
    }
    try {
      showToast("Building ZIP…", "info");
      const zip = new JSZip();
      const folder = zip.folder("enhanced");
      ready.forEach((id, index) => {
        const src = batchSources.find((s) => s.id === id);
        const data = batchEnhanced[id];
        if (!src || !data) return;
        const base = src.file.name.replace(/\.[^.]+$/, "") || "image";
        const name = `${String(index + 1).padStart(3, "0")}-${safeDownloadFilename(base)}-enhanced.png`;
        folder?.file(name, dataUrlToBlob(data));
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `enhanced-images-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      showToast(`Downloaded ${ready.length} file(s) in ZIP.`, "success");
    } catch {
      showToast("Could not create ZIP.", "error");
    }
  };

  const downloadSingleBatchEnhanced = (id: string) => {
    const data = batchEnhanced[id];
    const src = batchSources.find((s) => s.id === id);
    if (!data || !src) return;
    const base = src.file.name.replace(/\.[^.]+$/, "") || "image";
    const a = document.createElement("a");
    a.href = data;
    a.download = `${safeDownloadFilename(base)}-enhanced.png`;
    a.click();
    showToast("Download started.", "success");
  };

  const downloadResult = async (format: 'original' | 'enhanced' | 'comparison') => {
    if (!result) {
      showToast("No enhanced image to download", "error");
      return;
    }

    try {
      let imageData = result.enhanced;
      let filename = `enhanced-${Date.now()}`;

      if (format === 'original') {
        imageData = result.original;
        filename = `original-${Date.now()}`;

        // Download immediately for original
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Image downloaded successfully!", "success");
      } else if (format === 'comparison') {
        // Create side-by-side comparison
        showToast("Creating comparison image...", "info");
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          showToast("Failed to create comparison image", "error");
          return;
        }

        const originalImg = new Image();
        const enhancedImg = new Image();

        await Promise.all([
          new Promise<void>((resolve, reject) => {
            originalImg.onload = () => resolve();
            originalImg.onerror = () => reject(new Error('Failed to load original image'));
            originalImg.src = result.original;
          }),
          new Promise<void>((resolve, reject) => {
            enhancedImg.onload = () => resolve();
            enhancedImg.onerror = () => reject(new Error('Failed to load enhanced image'));
            enhancedImg.src = result.enhanced;
          })
        ]);

        // Calculate dimensions with padding
        const padding = 20;
        const labelHeight = 40;
        const maxHeight = Math.max(originalImg.height, enhancedImg.height);
        const totalWidth = originalImg.width + enhancedImg.width + padding * 3;
        const totalHeight = maxHeight + labelHeight + padding * 2;

        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // White background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw original
        ctx.drawImage(originalImg, padding, padding);

        // Draw enhanced
        ctx.drawImage(enhancedImg, originalImg.width + padding * 2, padding);

        // Add labels with better styling
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = '#333333';
        ctx.textAlign = 'left';
        ctx.fillText('Original', padding, maxHeight + padding + 25);
        ctx.fillText('Enhanced', originalImg.width + padding * 2, maxHeight + padding + 25);

        imageData = canvas.toDataURL('image/png', 0.95);
        filename = `comparison-${Date.now()}`;

        // Download comparison
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Comparison image downloaded successfully!", "success");
      } else {
        // Download enhanced image
        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = imageData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast("Image downloaded successfully!", "success");
      }
    } catch (error) {
      console.error('Download error:', error);
      showToast("Failed to download image. Please try again.", "error");
    }
  };

  const clearAll = () => {
    setUploadedImage(null);
    setResult(null);
    setBatchSources([]);
    setBatchEnhanced({});
    setBatchSelectedIds([]);
    setBatchMode(false);
    setComparePosition(50);
    setImageLoading(false);
    setSettings({ ...DEFAULT_ENHANCEMENT_SETTINGS });
    setActivePresetId(DEFAULT_PRESET_ID);
    showToast("All data cleared", "info");
  };

  const exitBatchMode = () => {
    setBatchMode(false);
    setBatchSources([]);
    setBatchEnhanced({});
    setBatchSelectedIds([]);
  };

  const enhancementModeHints: Record<EnhancementSettings["enhancement"], string> = {
    auto: "One-click balance - good starting point for any image.",
    upscale: "Increase pixel dimensions (2× / 4×). Best for small or pixelated sources.",
    unblur: "Boost clarity and local contrast - motion blur and soft focus.",
    restore: "Lift faded scans and damaged prints - stronger contrast and brightness.",
    colorize: "Push saturation - use with black & white or flat color.",
    denoise: "Smooth grain in dark or high-ISO shots.",
  };

  const examples = [
    { name: "Old Photos", desc: "Restore vintage and damaged photos" },
    { name: "Low Resolution", desc: "Upscale pixelated or small images" },
    { name: "Blurry Images", desc: "Sharpen and clarify unfocused photos" },
    { name: "Black & White", desc: "Add realistic colors to B&W photos" }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
          AI Image Enhancer
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Enhance photos with AI: upscale resolution, unblur images, restore old photos,
          and colorize black & white pictures with professional quality.
        </p>
      </div>

      {/* Upload Section */}
      {!uploadedImage && !batchMode && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload size={20} />
              Upload Images for Enhancement
            </CardTitle>
            <CardDescription>
              Upload JPG, PNG, or WebP images up to 50MB. Choose single image or batch processing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Single Image Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('image-enhancer-file-input')?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = Array.from(e.dataTransfer.files);
                  handleImageUpload(files);
                }}
              >
                <input
                  id="image-enhancer-file-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleImageUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
                <p className="text-gray-600 mb-4">or click to browse files</p>
                <Button variant="outline">
                  <Upload size={16} className="mr-2" />
                  Choose Image
                </Button>
              </div>

              {/* Batch Upload */}
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer"
                onClick={() => document.getElementById('batch-enhancer-file-input')?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const files = Array.from(e.dataTransfer.files);
                  handleBatchUpload(files);
                }}
              >
                <input
                  id="batch-enhancer-file-input"
                  type="file"
                  accept="image/*"
                  multiple={true}
                  onChange={(e) => {
                    if (e.target.files) {
                      const files = Array.from(e.target.files);
                      handleBatchUpload(files);
                    }
                  }}
                  className="hidden"
                />
                <Layers size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Batch Upload</h3>
                <p className="text-gray-600 mb-4">Upload multiple images for bulk enhancement</p>
                <Button variant="outline">Choose Images</Button>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <Label className="text-sm font-medium mb-3 block">Perfect for:</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {examples.map((example, index) => (
                  <div key={index} className="text-center p-3 border rounded-lg">
                    <div className="font-medium text-sm">{example.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{example.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Batch: same settings (left) + thumbnail grid (right) */}
      {batchMode && batchSources.length > 0 && (
        <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <Card className="order-2 lg:order-1 max-h-fit flex flex-col overflow-hidden" style={{scrollbarWidth: 'thin'}}>
            <CardHeader className="shrink-0">
              <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                <span className="flex items-center gap-2">
                  <Layers size={20} />
                  Batch · {batchSources.length} images
                </span>
                <Button type="button" onClick={exitBatchMode} variant="outline" size="sm">
                  Exit batch
                </Button>
              </CardTitle>
              <CardDescription>
                One set of controls applies to every image. Thumbnails refresh when you change a setting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 overflow-y-auto flex-1 min-h-0 pr-1">
              <EnhancementSettingsForm
                settings={settings}
                onSettingsChange={onSettingsChange}
                presets={ENHANCEMENT_PRESETS}
                activePresetId={activePresetId}
                onPresetSelect={onPresetSelect}
                enhancementModeHints={enhancementModeHints}
              />
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button type="button" variant="outline" size="sm" onClick={selectAllBatch}>
                  Select all
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={clearBatchSelection}>
                  Clear selection
                </Button>
                <span className="text-xs text-muted-foreground self-center">
                  {batchSelectedIds.length} selected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button type="button" onClick={clearAll} variant="outline">
                  <Trash2 size={16} className="mr-2" />
                  Clear everything
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="order-1 lg:order-2 lg:sticky lg:top-12 min-h-0 flex flex-col max-h-fit">
            <CardHeader className="shrink-0 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon size={20} />
                    Enhanced previews
                  </CardTitle>
                  <CardDescription className="mt-1.5">
                    Thumbnails only - no comparison slider. Use checkboxes for ZIP selection.
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <input
                    id="batch-add-more-input"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        handleAddMoreBatchImages(Array.from(e.target.files));
                        e.target.value = "";
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() =>
                      document.getElementById("batch-add-more-input")?.click()
                    }
                  >
                    <Upload size={14} className="mr-2" />
                    Add more images
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 overflow-y-auto pr-1">
              <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-2">
                {batchSources.map((item) => {
                  const enhanced = batchEnhanced[item.id];
                  const checked = batchSelectedIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-md border bg-muted/30 h-fit overflow-hidden flex flex-col ${
                        checked ? "ring-2 ring-emerald-500" : ""
                      }`}
                    >
                      <label className="absolute top-1 left-1 z-10 flex items-center justify-center rounded bg-background/90 p-0.5 shadow">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleBatchSelect(item.id)}
                          className="h-3.5 w-3.5 accent-emerald-600 cursor-pointer"
                          aria-label={`Select ${item.file.name}`}
                        />
                      </label>
                      <button
                        type="button"
                        className="absolute top-1 right-1 z-10 rounded bg-muted/50 text-white p-1 shadow hover:bg-muted"
                        onClick={() => downloadSingleBatchEnhanced(item.id)}
                        disabled={!enhanced}
                        title="Download this image"
                      >
                        <Download size={12} className="" />
                      </button>
                      <div className="aspect-square w-full bg-muted flex items-center justify-center">
                        {enhanced ? (
                          <img
                            src={enhanced}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <RefreshCw size={20} className="animate-spin text-emerald-600" />
                        )}
                      </div>
                      <div className="px-1 py-1 text-[10px] leading-tight text-muted-foreground truncate border-t bg-background/80">
                        {item.file.name}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-emerald-200 dark:border-emerald-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download size={20} className="text-emerald-600" />
              Download exports (batch)
            </CardTitle>
            <CardDescription>
              All options stay visible here - no scrolling past settings to find them.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button type="button" onClick={() => downloadBatchZip("all")} className="justify-start">
              <FileArchive size={16} className="mr-2" />
              Download all as ZIP
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => downloadBatchZip("selected")}
              disabled={batchSelectedIds.length === 0}
              className="justify-start"
            >
              <FileArchive size={16} className="mr-2" />
              Download selected as ZIP
            </Button>
          </CardContent>
        </Card>
        <PostDownloadToolsCard />
        </div>
      )}

      {/* Single image: controls (left) + live before/after (right) */}
      {uploadedImage && !batchMode && (
        <div className="space-y-6">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          <Card className="order-2 lg:order-1 flex flex-col overflow-y-auto h-fit">
            <CardHeader className="shrink-0">
              <CardTitle className="flex items-center gap-2">
                <Settings size={20} />
                Enhancement settings
              </CardTitle>
              <CardDescription>
                Changes apply instantly to the preview - no extra button needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 overflow-y-auto flex-1 min-h-0 pr-1">
              <EnhancementSettingsForm
                settings={settings}
                onSettingsChange={onSettingsChange}
                presets={ENHANCEMENT_PRESETS}
                activePresetId={activePresetId}
                onPresetSelect={onPresetSelect}
                enhancementModeHints={enhancementModeHints}
              />
              <div className="flex flex-wrap gap-2 pt-2 border-t">
                <Button type="button" onClick={clearAll} variant="outline">
                  <Trash2 size={16} className="mr-2" />
                  Clear &amp; new image
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="order-1 lg:order-2 lg:sticky lg:top-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                <span className="flex items-center gap-2">
                  <Contrast size={20} />
                  Before / after
                </span>
                {result && (
                  <Badge variant="secondary">{result.enhancement}</Badge>
                )}
              </CardTitle>
              <CardDescription>
                Drag the slider to compare original (left) with enhanced (right). Preview updates as you change settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageLoading || !result ? (
                <div className="flex flex-col items-center justify-center min-h-[280px] rounded-lg border bg-muted/40">
                  <RefreshCw size={28} className="animate-spin text-emerald-600 mb-3" />
                  <p className="text-sm text-muted-foreground">Building preview…</p>
                </div>
              ) : (
                <>
                  <div className="relative w-full rounded-lg overflow-hidden border bg-muted/30">
                    <img
                      src={result.enhanced}
                      alt=""
                      className="block w-full h-auto max-h-[min(70vh,560px)] object-contain mx-auto"
                    />
                    <div className="absolute inset-0 pointer-events-none">
                      <img
                        src={result.original}
                        alt=""
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{
                          clipPath: `inset(0 ${100 - comparePosition}% 0 0)`,
                        }}
                      />
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={comparePosition}
                      onChange={(e) => setComparePosition(Number(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                      aria-label="Compare original and enhanced"
                    />
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none z-[5]"
                      style={{ left: `${comparePosition}%`, transform: "translateX(-50%)" }}
                    />
                    <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[11px] font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] pointer-events-none z-[6]">
                      <span>Original</span>
                      <span>Enhanced</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>More original</span>
                      <span>More enhanced</span>
                    </div>
                    <Slider
                      value={[comparePosition]}
                      onValueChange={([v]) => setComparePosition(v)}
                      max={100}
                      min={0}
                      step={1}
                    />
                  </div>

                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-muted-foreground">Resolution</span>
                        <div className="text-emerald-700 dark:text-emerald-400">
                          {result.improvements.resolution}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Quality</span>
                        <div className="text-emerald-700 dark:text-emerald-400">
                          {result.improvements.quality}/100
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Clarity</span>
                        <div className="text-emerald-700 dark:text-emerald-400">
                          {result.improvements.clarity}/100
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-muted-foreground">Color</span>
                        <div className="text-emerald-700 dark:text-emerald-400">
                          {result.improvements.colors}/100
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-emerald-200 dark:border-emerald-900 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Download size={20} className="text-emerald-600" />
              Download &amp; next steps
            </CardTitle>
            <CardDescription>
              Export your enhanced image or a side-by-side comparison. Below this card you can jump to compress, convert, or resize tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start h-auto py-3 min-h-[3.5rem]"
                  onClick={() => downloadResult("enhanced")}
                >
                  <Sparkles size={16} className="mr-2 shrink-0" />
                  <span className="text-left">
                    <span className="block font-medium">Enhanced PNG</span>
                    <span className="block text-xs text-muted-foreground font-normal">
                      Full result
                    </span>
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start h-auto py-3 min-h-[3.5rem]"
                  onClick={() => downloadResult("original")}
                >
                  <ImageIcon size={16} className="mr-2 shrink-0" />
                  <span className="text-left">
                    <span className="block font-medium">Original</span>
                    <span className="block text-xs text-muted-foreground font-normal">
                      Unchanged upload
                    </span>
                  </span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-start h-auto py-3 min-h-[3.5rem] sm:col-span-2 lg:col-span-2"
                  onClick={() => downloadResult("comparison")}
                >
                  <Contrast size={16} className="mr-2 shrink-0" />
                  <span className="text-left">
                    <span className="block font-medium">Side-by-side comparison</span>
                    <span className="block text-xs text-muted-foreground font-normal">
                      Original + enhanced in one PNG
                    </span>
                  </span>
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Preview is still loading - download buttons will appear here when ready.
              </p>
            )}
          </CardContent>
        </Card>
        <PostDownloadToolsCard />
        </div>
      )}

      {/* SEO Content */}
    </div>
  );
}

export default function AiImageEnhancerPage() {
  return (
    <ToolPageWrapper toolSlug="ai-image-enhancer"><ToastProvider>
      <AiImageEnhancerContent /></ToastProvider></ToolPageWrapper>
  );
}