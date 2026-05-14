import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface SlideConfig {
  id: string;
  visible: boolean;
  order: number;
}

const STORAGE_KEY = 'presentation-slide-config-atdld-v90'; // LD7.5 multi-QR (LinkedIn, site, slides, email)

export const useSlideConfig = (initialSlides: { id: string }[]) => {
  const [config, setConfig] = useState<SlideConfig[]>(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as SlideConfig[];
        const parsedIds = new Set(parsed.map((c) => c.id));
        const expectedIds = new Set(initialSlides.map((s) => s.id));
        const sameSize = parsed.length === initialSlides.length;
        const sameIds = sameSize && [...expectedIds].every((id) => parsedIds.has(id));
        
        if (sameIds) {
          // Detect if base slide order changed in code and reset if so
          const defaultOrderIds = initialSlides.map((s) => s.id);
          const storedOrderedIds = [...parsed]
            .sort((a, b) => a.order - b.order)
            .map((c) => c.id);
          if (JSON.stringify(storedOrderedIds) !== JSON.stringify(defaultOrderIds)) {
            console.warn('Base slide order changed. Resetting configuration to defaults.');
          } else {
            return parsed;
          }
        }
        // Fallback if mismatch (new slides added/removed)
        console.warn('Slide config mismatch detected. Resetting to defaults.');
      } catch (e) {
        console.error('Failed to parse slide config:', e);
      }
    }
    
    // Initialize with all slides visible in original order
    return initialSlides.map((slide, index) => ({
      id: slide.id,
      visible: true,
      order: index,
    }));
  });

  // Save to localStorage whenever config changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    // Don't show toast on initial load (check against default state)
    const isInitialLoad = config.every((c, i) => c.visible && c.order === i);
    if (!isInitialLoad) {
      toast.success('Slide configuration saved', {
        description: 'Your changes will persist across sessions'
      });
    }
  }, [config]);

  const toggleVisibility = (slideId: string) => {
    setConfig(prev =>
      prev.map(c =>
        c.id === slideId ? { ...c, visible: !c.visible } : c
      )
    );
  };

  const moveSlide = (slideId: string, direction: 'up' | 'down') => {
    setConfig(prev => {
      const sorted = [...prev].sort((a, b) => a.order - b.order);
      const currentIndex = sorted.findIndex(c => c.id === slideId);
      
      if (currentIndex === -1) return prev;
      
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex < 0 || newIndex >= sorted.length) return prev;
      
      // Swap orders
      const newConfig = [...prev];
      const currentSlide = newConfig.find(c => c.id === slideId);
      const targetSlide = newConfig.find(c => c.id === sorted[newIndex].id);
      
      if (currentSlide && targetSlide) {
        const tempOrder = currentSlide.order;
        currentSlide.order = targetSlide.order;
        targetSlide.order = tempOrder;
      }
      
      return newConfig;
    });
  };

  const resetToDefaults = () => {
    const defaultConfig = initialSlides.map((slide, index) => ({
      id: slide.id,
      visible: true,
      order: index,
    }));
    setConfig(defaultConfig);
  };

  const showAll = () => {
    setConfig(prev => prev.map(c => ({ ...c, visible: true })));
  };

  const hideAll = () => {
    setConfig(prev => prev.map(c => ({ ...c, visible: false })));
  };

  return {
    config,
    toggleVisibility,
    moveSlide,
    resetToDefaults,
    showAll,
    hideAll,
  };
};
