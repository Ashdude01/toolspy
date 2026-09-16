"use client";

import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useColorPalette } from '@/hooks/useColorPalette';
import { SortableColorCard } from './SortableColorCard';
import { Toolbar } from './Toolbar';
import { ExportDialog } from './ExportDialog';
import { useToast } from '@/components/tools/shared/toast-provider';
import { Keyboard } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useT } from '@/lib/i18n/use-t';

export const ColorPaletteGenerator = () => {
  const t = useT();
  const isMobile = useIsMobile();
  const { showToast } = useToast();
  
  const {
    colors,
    generateNewColors,
    toggleLock,
    updateColor,
    addColorAtIndex,
    removeColor,
    reorderColors,
    undo,
    redo,
    canUndo,
    canRedo,
    getContrastColor,
    getColorName,
    hexToHSL,
    hexToRGB,
  } = useColorPalette(5);

  const [exportOpen, setExportOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );


  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = colors.findIndex(c => c.id === active.id);
      const newIndex = colors.findIndex(c => c.id === over.id);
      reorderColors(oldIndex, newIndex);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}${window.location.pathname}?colors=${colors.map(c => c.hex.replace('#', '')).join('-')}`;
    await navigator.clipboard.writeText(url);
    showToast(t('tools.colorPaletteGenerator.paletteUrlCopied'), 'success');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlColors = params.get('colors');
      if (urlColors) {
        const hexCodes = urlColors.split('-').map(c => `#${c.toUpperCase()}`);
        hexCodes.forEach((hex, i) => {
          if (i < colors.length && /^#[0-9A-F]{6}$/.test(hex)) {
            updateColor(colors[i].id, hex);
          }
        });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-y-auto overflow-x-hidden md:overflow-hidden">
      

      <div className="flex-1 flex flex-col md:flex-row w-full h-full lg:min-h-screen">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={colors.map(c => c.id)}
            strategy={isMobile ? verticalListSortingStrategy : horizontalListSortingStrategy}
          >
            {colors.map((color, index) => (
              <SortableColorCard
                key={color.id}
                color={color}
                contrast={getContrastColor(color.hex)}
                colorName={getColorName(color.hex)}
                hsl={hexToHSL(color.hex)}
                rgb={hexToRGB(color.hex)}
                onToggleLock={() => toggleLock(color.id)}
                onUpdateColor={(hex) => updateColor(color.id, hex)}
                onRemove={() => removeColor(color.id)}
                canRemove={colors.length > 2}
                showAddButton={colors.length < 10}
                onAddBetween={() => addColorAtIndex(index)}
                isFirst={index === 0}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Toolbar
        onGenerate={generateNewColors}
        onUndo={undo}
        onRedo={redo}
        onExport={() => setExportOpen(true)}
        onShare={handleShare}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} colors={colors} />
    </div>
  );
};

