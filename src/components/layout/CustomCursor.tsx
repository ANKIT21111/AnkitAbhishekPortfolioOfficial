import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useDevice } from '../../hooks/useDevice';

const CustomCursor: React.FC = () => {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const { showCustomCursor } = useDevice();
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized spring configs - smoother cursor with reduced micro-stutter
  const outerSpring = prefersReducedMotion
    ? { damping: 35, stiffness: 500, mass: 0.3 }
    : { damping: 30, stiffness: 180, mass: 0.4 };
  const outerX = useSpring(mouseX, outerSpring);
  const outerY = useSpring(mouseY, outerSpring);

  // Inner dot — snappy, precise
  const innerSpring = prefersReducedMotion 
    ? { damping: 40, stiffness: 600 }
    : { damping: 35, stiffness: 400 };
  const innerX = useSpring(mouseX, innerSpring);
  const innerY = useSpring(mouseY, innerSpring);

  // Disable glow spring when reduced motion is preferred
  const glowSpring = prefersReducedMotion
    ? { damping: 50, stiffness: 500 }
    : { damping: 28, stiffness: 180 };
  const glowX = useSpring(mouseX, glowSpring);
  const glowY = useSpring(mouseY, glowSpring);

  const mouseMoveAnimationFrame = useRef<number | null>(null);
  const pendingMousePos = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    if (!showCustomCursor) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    // Add CSS class to hide default cursor
    document.documentElement.classList.add('custom-cursor-active');

    // Throttle mouse move events for better performance
    const THROTTLE_INTERVAL = prefersReducedMotion ? 50 : 16; // 16ms ≈ 60fps, 50ms for reduced motion

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastUpdateTime.current < THROTTLE_INTERVAL) {
        pendingMousePos.current = { x: e.clientX, y: e.clientY };
        return;
      }

      lastUpdateTime.current = now;
      pendingMousePos.current = { x: e.clientX, y: e.clientY };

      if (mouseMoveAnimationFrame.current === null) {
        mouseMoveAnimationFrame.current = window.requestAnimationFrame(() => {
          mouseX.set(pendingMousePos.current.x);
          mouseY.set(pendingMousePos.current.y);
          mouseMoveAnimationFrame.current = null;
        });
      }
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, [contenteditable], [data-cursor-hover]');
      if (!interactive) return;
      if (interactive.closest('input, textarea, [contenteditable]')) {
        setCursorVariant('text');
      } else {
        setCursorVariant('hover');
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a, button, [role="button"], input, textarea, select, [contenteditable], [data-cursor-hover]')) {
        setCursorVariant('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handlePointerOver);
    document.addEventListener('mouseout', handlePointerOut);

    return () => {
      if (mouseMoveAnimationFrame.current !== null) {
        window.cancelAnimationFrame(mouseMoveAnimationFrame.current);
        mouseMoveAnimationFrame.current = null;
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handlePointerOver);
      document.removeEventListener('mouseout', handlePointerOut);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [mouseX, mouseY, showCustomCursor, prefersReducedMotion]);

  if (!showCustomCursor) {
    return null;
  }

  return (
    <>
      {/* Outer Ring — springy trail with gradient border */}
      <motion.div
        ref={cursorRef}
        style={{ x: outerX, y: outerY, translateX: '-50%', translateY: '-50%', willChange: 'transform, width, height, border-color, background-color' }}
        animate={{
          width: cursorVariant === 'hover' ? 56 : cursorVariant === 'text' ? 4 : isClicking ? 28 : 40,
          height: cursorVariant === 'hover' ? 56 : cursorVariant === 'text' ? 32 : isClicking ? 28 : 40,
          borderRadius: cursorVariant === 'text' ? '2px' : '50%',
          borderColor: cursorVariant === 'hover' 
            ? 'rgba(59, 130, 246, 0.6)' 
            : cursorVariant === 'text'
            ? 'rgba(59, 130, 246, 0.8)'
            : 'var(--border-color)',
          backgroundColor: cursorVariant === 'hover'
            ? 'rgba(59, 130, 246, 0.06)'
            : cursorVariant === 'text'
            ? 'rgba(59, 130, 246, 0.15)'
            : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.3 }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] border"
      />

      {/* Inner Dot — precise, solid */}
      <motion.div
        style={{ x: innerX, y: innerY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
        animate={{
          width: cursorVariant === 'hover' ? 6 : cursorVariant === 'text' ? 2 : isClicking ? 12 : 6,
          height: cursorVariant === 'hover' ? 6 : cursorVariant === 'text' ? 20 : isClicking ? 12 : 6,
          borderRadius: cursorVariant === 'text' ? '1px' : '50%',
          opacity: cursorVariant === 'text' ? 0.9 : 1,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        className="fixed top-0 left-0 bg-white pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Hover glow ring — only on interactive elements, simplified for performance */}
      {!prefersReducedMotion && (
        <AnimatePresence>
          {cursorVariant === 'hover' && (
            <motion.div
              style={{ x: outerX, y: outerY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.3 }}
              className="fixed top-0 left-0 w-[56px] h-[56px] rounded-full pointer-events-none z-[9997]"
            >
              <div className="w-full h-full rounded-full border border-blue-500/20 bg-blue-500/5" />
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {!prefersReducedMotion && (
        <motion.div
          style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
          className="fixed top-0 left-0 w-[180px] h-[180px] rounded-full pointer-events-none z-[9995] cursor-ambient"
        />
      )}
    </>
  );
};

export default CustomCursor;
