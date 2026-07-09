import { useState, useEffect } from 'react';

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  activeInput: 'mouse' | 'touch';
  showCustomCursor: boolean;
  width: number;
  height: number;
}

export const useDevice = (): DeviceInfo => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [height, setHeight] = useState<number>(typeof window !== 'undefined' ? window.innerHeight : 800);
  const [activeInput, setActiveInput] = useState<'mouse' | 'touch'>('mouse');
  const [hasFinePointer, setHasFinePointer] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect fine pointer capability (mouse/trackpad)
    const finePointerMatch = window.matchMedia('(pointer: fine)');
    setHasFinePointer(finePointerMatch.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setHasFinePointer(e.matches);
    };

    // Set initial input type based on touch availability & pointer capability
    const initialFine = finePointerMatch.matches;
    setActiveInput(initialFine ? 'mouse' : 'touch');

    finePointerMatch.addEventListener('change', handlePointerChange);

    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const handleTouchStart = () => {
      setActiveInput(prev => (prev !== 'touch' ? 'touch' : prev));
    };

    const handleMouseMove = () => {
      setActiveInput(prev => (prev !== 'mouse' ? 'mouse' : prev));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      finePointerMatch.removeEventListener('change', handlePointerChange);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const showCustomCursor = activeInput === 'mouse' && hasFinePointer;

  return {
    isMobile,
    isTablet,
    isDesktop,
    activeInput,
    showCustomCursor,
    width,
    height,
  };
};
