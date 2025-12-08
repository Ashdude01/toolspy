"use client";

import { Undo2, Redo2, Download, Share2, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { cn, scrollToElement } from '@/lib/utils';

interface ToolbarProps {
  onGenerate: () => void;
  onUndo: () => void;
  onRedo: () => void;
  onExport: () => void;
  onShare: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar = ({
  onGenerate,
  onUndo,
  onRedo,
  onExport,
  onShare,
  canUndo,
  canRedo,
}: ToolbarProps) => {
  return (
    <TooltipProvider>
      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50">
        <div 
          className={cn(
            "bg-card/95 backdrop-blur-xl border border-border/50 rounded-2xl p-2 md:p-3",
            "shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]",
            "flex items-center gap-1 md:gap-2"
          )}
        >
          <div className="flex items-center gap-0.5 md:gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onUndo}
                  disabled={!canUndo}
                  className="rounded-xl h-9 w-9 md:h-10 md:w-10"
                >
                  <Undo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onRedo}
                  disabled={!canRedo}
                  className="rounded-xl h-9 w-9 md:h-10 md:w-10"
                >
                  <Redo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Shift+Z)</TooltipContent>
            </Tooltip>
          </div>

          <div className="w-px h-6 bg-border/50 mx-1" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => {onGenerate(); window.scrollTo({ top: 0, behavior: 'smooth' });}}
                className={cn(
                  "relative overflow-hidden rounded-xl px-4 md:px-6 h-10 md:h-11 font-semibold text-sm md:text-base",
                  "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500",
                  "hover:from-violet-600 hover:via-purple-600 hover:to-pink-600",
                  "text-white shadow-lg shadow-purple-500/30",
                  "transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/40",
                  "group"
                )}
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-1.5 md:mr-2 group-hover:animate-spin" />
                <span className="hidden sm:inline">Generate</span>
                <span className="hidden lg:inline ml-2 text-xs opacity-70 font-normal">Space</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Press Spacebar to generate new colors</TooltipContent>
          </Tooltip>

          <div className="w-px h-6 bg-border/50 mx-1" />

          <div className="flex items-center gap-0.5 md:gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onExport} className="rounded-xl h-9 w-9 md:h-10 md:w-10">
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export palette</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={onShare} className="rounded-xl h-9 w-9 md:h-10 md:w-10">
                  <Share2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share palette</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

