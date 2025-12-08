"use client";

import { useState, useCallback, useEffect } from 'react';

export interface ColorItem {
  id: string;
  hex: string;
  locked: boolean;
}

const generateRandomHex = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

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

const hexToRGB = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
};

const getContrastColor = (hex: string): 'light' | 'dark' => {
  const { r, g, b } = hexToRGB(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'dark' : 'light';
};

const getColorName = (hex: string): string => {
  const { h, s, l } = hexToHSL(hex);
  
  if (s < 10) {
    if (l < 20) return 'Charcoal';
    if (l < 40) return 'Gray';
    if (l < 60) return 'Silver';
    if (l < 80) return 'Pearl';
    return 'Snow';
  }
  
  const hueNames: { [key: number]: string } = {
    0: 'Rose', 15: 'Coral', 30: 'Tangerine', 45: 'Amber',
    60: 'Lemon', 75: 'Lime', 90: 'Chartreuse', 105: 'Mint',
    120: 'Emerald', 135: 'Jade', 150: 'Teal', 165: 'Cyan',
    180: 'Azure', 195: 'Sky', 210: 'Cobalt', 225: 'Sapphire',
    240: 'Indigo', 255: 'Violet', 270: 'Purple', 285: 'Orchid',
    300: 'Magenta', 315: 'Fuchsia', 330: 'Raspberry', 345: 'Crimson',
    360: 'Rose'
  };
  
  const hueKey = Math.round(h / 15) * 15;
  let baseName = hueNames[hueKey] || 'Color';
  
  if (l < 30) baseName = 'Dark ' + baseName;
  else if (l > 70) baseName = 'Light ' + baseName;
  
  return baseName;
};

const generateId = (): string => Math.random().toString(36).substring(2, 9);

export const useColorPalette = (initialCount: number = 5) => {
  const [colors, setColors] = useState<ColorItem[]>(() => 
    Array.from({ length: initialCount }, () => ({
      id: generateId(),
      hex: generateRandomHex(),
      locked: false,
    }))
  );
  const [history, setHistory] = useState<ColorItem[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const generateNewColors = useCallback(() => {
    setColors(prev => {
      const currentState = prev.map(c => ({ ...c }));
      const newColors = prev.map(color => 
        color.locked ? color : { ...color, hex: generateRandomHex() }
      );
      
      // Update history and index together
      setHistoryIndex(currentIndex => {
        setHistory(h => {
          const trimmedHistory = h.slice(0, currentIndex + 1);
          const newHistory = [...trimmedHistory, currentState];
          return newHistory;
        });
        // Return the new index (which will be the last index of the new history)
        return currentIndex + 1;
      });
      
      return newColors;
    });
  }, []);

  const toggleLock = useCallback((id: string) => {
    setColors(prev => prev.map(color => 
      color.id === id ? { ...color, locked: !color.locked } : color
    ));
  }, []);

  const updateColor = useCallback((id: string, hex: string) => {
    setColors(prev => prev.map(color => 
      color.id === id ? { ...color, hex: hex.toUpperCase() } : color
    ));
  }, []);

  const addColor = useCallback(() => {
    if (colors.length >= 10) return;
    setColors(prev => [...prev, { id: generateId(), hex: generateRandomHex(), locked: false }]);
  }, [colors.length]);

  const addColorAtIndex = useCallback((index: number) => {
    if (colors.length >= 10) return;
    setColors(prev => {
      const newColors = [...prev];
      newColors.splice(index, 0, { id: generateId(), hex: generateRandomHex(), locked: false });
      return newColors;
    });
  }, [colors.length]);

  const removeColor = useCallback((id: string) => {
    if (colors.length <= 2) return;
    setColors(prev => prev.filter(color => color.id !== id));
  }, [colors.length]);

  const reorderColors = useCallback((fromIndex: number, toIndex: number) => {
    setColors(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  const undo = useCallback(() => {
    setHistoryIndex(currentIndex => {
      if (currentIndex >= 0) {
        setHistory(h => {
          if (h && Array.isArray(h) && h.length > 0 && currentIndex < h.length && h[currentIndex]) {
            const previousState = h[currentIndex];
            if (previousState && Array.isArray(previousState)) {
              setColors([...previousState.map(c => ({ ...c }))]);
            }
          }
          return h;
        });
        return currentIndex - 1;
      }
      return currentIndex;
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(h => {
      if (!h || !Array.isArray(h) || h.length === 0) return h;
      
      setHistoryIndex(currentIndex => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < h.length && h[nextIndex] && Array.isArray(h[nextIndex])) {
          const nextState = h[nextIndex];
          setColors([...nextState.map(c => ({ ...c }))]);
          return nextIndex;
        }
        return currentIndex;
      });
      return h;
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      if (e.code === 'Space') {
        e.preventDefault();
        generateNewColors();
      } else if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewColors, undo, redo]);

  return {
    colors,
    generateNewColors,
    toggleLock,
    updateColor,
    addColor,
    addColorAtIndex,
    removeColor,
    reorderColors,
    undo,
    redo,
    canUndo: historyIndex >= 0,
    canRedo: historyIndex < history.length - 1,
    getContrastColor,
    getColorName,
    hexToHSL,
    hexToRGB,
  };
};

