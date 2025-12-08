"use client";

import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColorItem } from '@/hooks/useColorPalette';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  colors: ColorItem[];
}

export const ExportDialog = ({ open, onOpenChange, colors }: ExportDialogProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const hexArray = colors.map(c => c.hex);

  const formats = {
    css: `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`,
    scss: colors.map((c, i) => `$color-${i + 1}: ${c.hex};`).join('\n'),
    tailwind: `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n        palette: {\n${colors.map((c, i) => `          '${i + 1}': '${c.hex}',`).join('\n')}\n        }\n      }\n    }\n  }\n}`,
    json: JSON.stringify(hexArray, null, 2),
    array: `[${hexArray.map(h => `"${h}"`).join(', ')}]`,
  };

  const copyToClipboard = async (format: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 1500);
  };

  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    const colorWidth = width / colors.length;
    colors.forEach((color, i) => {
      ctx.fillStyle = color.hex;
      ctx.fillRect(i * colorWidth, 0, colorWidth, height);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(color.hex, i * colorWidth + colorWidth / 2, height - 30);
    });

    const link = document.createElement('a');
    link.download = 'palette.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Palette
          </DialogTitle>
        </DialogHeader>

        <div className="flex rounded-xl overflow-hidden h-16 shadow-lg">
          {colors.map(color => (
            <div
              key={color.id}
              className="flex-1 transition-all hover:flex-[2]"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>

        <Tabs defaultValue="css" className="mt-4">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="scss">SCSS</TabsTrigger>
            <TabsTrigger value="tailwind">Tailwind</TabsTrigger>
            <TabsTrigger value="json">JSON</TabsTrigger>
            <TabsTrigger value="array">Array</TabsTrigger>
          </TabsList>

          {Object.entries(formats).map(([format, content]) => (
            <TabsContent key={format} value={format} className="mt-4">
              <div className="relative">
                <pre className="bg-muted rounded-lg p-4 text-sm overflow-x-auto max-h-48 font-mono">
                  {content}
                </pre>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => copyToClipboard(format, content)}
                  className="absolute top-2 right-2"
                >
                  {copied === format ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="flex gap-2 mt-4">
          <Button onClick={downloadPNG} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
          <Button 
            variant="outline" 
            onClick={() => copyToClipboard('url', window.location.href)}
            className="flex-1"
          >
            {copied === 'url' ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            Copy URL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

