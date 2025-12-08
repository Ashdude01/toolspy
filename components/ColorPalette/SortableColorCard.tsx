"use client";

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColorCard } from './ColorCard';
import { ColorItem } from '@/hooks/useColorPalette';

interface SortableColorCardProps {
  color: ColorItem;
  contrast: 'light' | 'dark';
  colorName: string;
  hsl: { h: number; s: number; l: number };
  rgb: { r: number; g: number; b: number };
  onToggleLock: () => void;
  onUpdateColor: (hex: string) => void;
  onRemove: () => void;
  canRemove: boolean;
  showAddButton: boolean;
  onAddBetween: () => void;
  isFirst: boolean;
}

export const SortableColorCard = (props: SortableColorCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.color.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex-1 min-w-0 max-h-36 sm:max-h-full">
      <ColorCard
        {...props}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
};

