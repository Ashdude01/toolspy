"use client";

import { useState, useRef, useEffect } from "react";
import {
  Lock,
  Unlock,
  Copy,
  Check,
  X,
  GripVertical,
  Palette,
  Plus,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ColorItem } from "@/hooks/useColorPalette";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface ColorCardProps {
  color: ColorItem;
  contrast: "light" | "dark";
  colorName: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
  onToggleLock: () => void;
  onUpdateColor: (hex: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  isDragging?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;
  showAddButton?: boolean;
  onAddBetween?: () => void;
  isFirst?: boolean;
}

export const ColorCard = ({
  color,
  contrast,
  colorName,
  hsl,
  rgb,
  onToggleLock,
  onUpdateColor,
  onRemove,
  canRemove,
  isDragging,
  dragHandleProps,
  showAddButton,
  onAddBetween,
  isFirst,
}: ColorCardProps) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(color.hex);
  const [showShades, setShowShades] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shadesRef = useRef<HTMLDivElement>(null);

  const textColor = contrast === "light" ? "text-white" : "text-gray-900";
  const textColorMuted =
    contrast === "light" ? "text-white/60" : "text-gray-900/60";
  const buttonStyles =
    contrast === "light"
      ? "hover:bg-white/20 text-white border-white/20"
      : "hover:bg-black/10 text-gray-900 border-gray-900/20";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleEditSubmit = () => {
    const hex = editValue.startsWith("#") ? editValue : `#${editValue}`;
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onUpdateColor(hex.toUpperCase());
    }
    setIsEditing(false);
  };

  // Generate color shades (varying lightness) - more shades for smoother gradient
  const generateShades = (): string[] => {
    const shades: string[] = [];
    // Generate more shades for smoother gradient from very light to very dark
    const shadeCount = 50; // More shades = smoother gradient
    for (let i = 0; i < shadeCount; i++) {
      const lightness = 98 - (i * (93 / (shadeCount - 1))); // From 98% to 5%
      const shadeHsl = { h: hsl.h, s: hsl.s, l: Math.max(5, Math.min(98, lightness)) };
      const shadeHex = hslToHex(shadeHsl.h, shadeHsl.s, shadeHsl.l);
      shades.push(shadeHex);
    }
    return shades;
  };

  // Find current shade index
  const getCurrentShadeIndex = (): number => {
    const currentL = hsl.l;
    const shades = generateShades();
    let closestIndex = 0;
    let minDiff = Infinity;
    
    shades.forEach((shade, index) => {
      const shadeHsl = hexToHSL(shade);
      const diff = Math.abs(shadeHsl.l - currentL);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });
    
    return closestIndex;
  };

  // Convert Hex to HSL
  const hexToHSL = (hex: string): { h: number; s: number; l: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };
    
    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // Handle shade strip click
  const handleShadeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!shadesRef.current) return;
    const rect = shadesRef.current.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
    
    const shades = generateShades();
    const index = Math.floor((percentage / 100) * (shades.length - 1));
    const selectedShade = shades[index];
    
    if (selectedShade) {
      onUpdateColor(selectedShade);
    }
  };

  // Convert HSL to Hex
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
  };

  const shades = generateShades();

  // Helper to get contrast color for shade borders
  const getContrastColor = (hex: string): 'light' | 'dark' => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 'dark';
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? 'dark' : 'light';
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative flex-1 min-h-36 h-full flex flex-col items-center justify-center transition-all duration-300 group",
          isDragging && "opacity-50 scale-[1.02] z-10"
        )}
        style={{ backgroundColor: color.hex }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, 
            rgba(255,255,255,0.08) 0%, 
            transparent 30%, 
            transparent 70%, 
            rgba(0,0,0,0.12) 100%)`,
          }}
        />

        {showAddButton && !isFirst && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onAddBetween}
                className={cn(
                  "absolute z-20",
                  "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
                  "md:left-0 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2",
                  "h-10 w-10 sm:h-8 sm:w-8 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200",
                  "bg-white shadow-lg border-4 border-white",
                  "hover:bg-gray-300 hover:scale-110"
                )}
              >
                <Plus className="w-5 h-5 sm:w-4 sm:h-4 text-gray-700" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add color</TooltipContent>
          </Tooltip>
        )}

        {/* Shades Gradient Strip */}
        {showShades && (
          <>
            <div
              ref={shadesRef}
              className={cn(
                "absolute inset-0 z-30 cursor-pointer",
                "flex items-center justify-center"
              )}
              onClick={handleShadeClick}
              style={{
                background: `linear-gradient(to bottom, ${generateShades().join(', ')})`,
              }}
            >
              {/* Black dot indicator for current shade */}
              <div
                className="absolute left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                style={{
                  top: `${(getCurrentShadeIndex() / (generateShades().length - 1)) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="w-2.5 h-2.5 bg-black rounded-full shadow-lg border-2 border-white" />
              </div>
            </div>

            {/* Close button overlay - click to close shades */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowShades(false);
              }}
              className={cn(
                "absolute top-4 right-2 z-50",
                "h-6 w-6 sm:h-8 sm:w-8 rounded-full flex justify-center items-center",
                buttonStyles
              )}
              aria-label="Close shades"
            >
              <X className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </>
        )}

        <div className="hidden absolute z-10 sm:top-64 md:top-[15rem] lg:top-[25rem] xl:top-10 2xl:top-[16%] left-1/2 -translate-x-1/2 invisible group-hover:visible transition-all duration-200 sm:flex flex-col gap-3 items-center justify-center">
          {canRemove && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  className={cn(
                    "h-6 w-6 sm:h-8 sm:w-8 rounded-full",
                    buttonStyles
                  )}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="">Remove</TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <div
                {...dragHandleProps}
                className={cn(
                  "cursor-grab active:cursor-grabbing",
                  textColorMuted
                )}
              >
                <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>Move</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className={cn(
                  "h-6 w-6 sm:h-8 sm:w-8 rounded-full hover:scale-110",
                  buttonStyles
                )}
              >
                {copied ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                ) : (
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy HEX</TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full border border-dashed opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110",
                  buttonStyles
                )}
              >
                <Palette className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-4" sideOffset={8}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Pick a color</label>
                  <Input
                    type="color"
                    value={color.hex}
                    onChange={(e) => onUpdateColor(e.target.value)}
                    className="h-20 w-full cursor-pointer rounded-lg border-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Or enter HEX</label>
                  <Input
                    value={color.hex}
                    onChange={(e) => onUpdateColor(e.target.value)}
                    placeholder="#FFFFFF"
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowShades(!showShades)}
                className={cn(
                  "h-8 w-8 rounded-full border border-dashed opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110",
                  showShades && "bg-white/20 opacity-100",
                  buttonStyles
                )}
              >
                <Layers className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Shades</TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleLock}
              className={cn(
                "hidden sm:flex h-6 w-6 sm:h-8 sm:w-8 rounded-full my-3 transition-all duration-200 hover:scale-110",
                color.locked &&
                  (contrast === "light" ? "bg-white/20" : "bg-black/10"),
                color.locked
                  ? "visible"
                  : "invisible group-hover:visible",
                buttonStyles
              )}
            >
              {color.locked ? (
                <Lock className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <Unlock className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Lock</TooltipContent>
        </Tooltip>

        {color.locked && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={cn(
                "absolute inset-0",
                contrast === "light" ? "bg-white/5" : "bg-black/5"
              )}
            />
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-3 py-4 sm:py-0">
          {/* Mobile layout */}
          <div className="flex sm:hidden items-center justify-center gap-3">
         
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all duration-200",
                      buttonStyles
                    )}
                  >
                    {copied ? (
                      <Check className="w-3 h-3 animate-bounce" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full border border-dashed transition-all duration-200",
                      buttonStyles
                    )}
                  >
                    <Palette className="w-3 h-3" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-3" sideOffset={8}>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="text-xs font-medium">
                        Pick a color
                      </label>
                      <Input
                        type="color"
                        value={color.hex}
                        onChange={(e) => onUpdateColor(e.target.value)}
                        className="h-16 w-full cursor-pointer rounded-lg border-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium">
                        Or enter HEX
                      </label>
                      <Input
                        value={color.hex}
                        onChange={(e) => onUpdateColor(e.target.value)}
                        placeholder="#FFFFFF"
                        className="font-mono text-sm"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowShades(!showShades)}
                    className={cn(
                      "h-8 w-8 rounded-full border border-dashed transition-all duration-200",
                      showShades && "bg-white/20",
                      buttonStyles
                    )}
                  >
                    <Layers className="w-3 h-3" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Show shades</TooltipContent>
              </Tooltip>
            </div>

            {isEditing ? (
              <Input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                onBlur={handleEditSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
                className={cn(
                  "w-20 text-center font-mono text-base font-bold bg-transparent border-b-2 border-t-0 border-x-0 rounded-none focus:ring-0",
                  textColor
                )}
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  setEditValue(color.hex);
                  setIsEditing(true);
                }}
                className={cn(
                  "font-mono text-base font-bold tracking-wider hover:scale-105 transition-transform cursor-text drop-shadow-sm",
                  textColor
                )}
              >
                {color.hex.replace("#", "")}
              </button>
            )}

            <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleLock}
                    className={cn(
                      "h-8 w-8 rounded-full transition-all duration-200",
                      color.locked &&
                        (contrast === "light" ? "bg-white/20" : "bg-black/10"),
                      buttonStyles
                    )}
                  >
                    {color.locked ? (
                      <Lock className="w-3 h-3" />
                    ) : (
                      <Unlock className="w-3 h-3" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Lock</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    {...dragHandleProps}
                    className={cn(
                      "cursor-grab active:cursor-grabbing",
                      textColorMuted
                    )}
                  >
                    <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>Move</TooltipContent>
              </Tooltip>
              {canRemove && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRemove}
                  className={cn(
                    "h-6 w-6 sm:h-8 sm:w-8 rounded-full",
                    buttonStyles
                  )}
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="">Remove</TooltipContent>
            </Tooltip>
          )}
             
            </div>
            
          </div>
          
          <span
            className={cn(
              "sm:hidden text-[10px] font-medium tracking-wide text-center px-2 mt-1",
              textColorMuted
            )}
          >
            {colorName}
          </span>

          {/* Desktop layout */}
          <div className="hidden sm:flex flex-col items-center gap-3">
            <span
              className={cn(
                "hidden sm:block text-xs md:text-sm font-medium tracking-wide text-center px-2 mb-1",
                textColorMuted
              )}
            >
              {colorName}
            </span>
            {isEditing ? (
              <Input
                ref={inputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value.toUpperCase())}
                onBlur={handleEditSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleEditSubmit()}
                className={cn(
                  "w-28 text-center font-mono text-xl font-bold bg-transparent border-b-2 border-t-0 border-x-0 rounded-none focus:ring-0",
                  textColor
                )}
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  setEditValue(color.hex);
                  setIsEditing(true);
                }}
                className={cn(
                  "font-mono text-xl md:text-2xl font-bold tracking-wider hover:scale-105 transition-transform cursor-text drop-shadow-sm",
                  textColor
                )}
              >
                {color.hex.replace("#", "")}
              </button>
            )}

            <div
              className={cn(
                "text-xs font-mono space-y-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 text-center",
                textColorMuted
              )}
            >
              <div>
                RGB({rgb.r}, {rgb.g}, {rgb.b})
              </div>
              <div>
                HSL({hsl.h}°, {hsl.s}%, {hsl.l}%)
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        {/* <div className="hidden sm:flex absolute bottom-28 md:bottom-48 left-1/2 -translate-x-1/2 items-center gap-2 z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyToClipboard}
                className={cn(
                  "h-9 w-9 md:h-10 md:w-10 rounded-full transition-all duration-200 hover:scale-110",
                  buttonStyles
                )}
              >
                {copied ? (
                  <Check className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                ) : (
                  <Copy className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleLock}
                className={cn(
                  "h-9 w-9 md:h-10 md:w-10 rounded-full transition-all duration-200 hover:scale-110",
                  color.locked &&
                    (contrast === "light" ? "bg-white/20" : "bg-black/10"),
                  buttonStyles
                )}
              >
                {color.locked ? (
                  <Lock className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Unlock className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>Lock</TooltipContent>
          </Tooltip>
        </div> */}
      </div>
    </TooltipProvider>
  );
};
