
import React, { useEffect, useState, useCallback, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants, useScroll, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { useDevice } from './hooks/useDevice';

// Lazy load components for better performance
const Hero = lazy(() => import('./pages/Hero'));
const Thoughts = lazy(() => import('./pages/Thoughts'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Collaborate = lazy(() => import('./pages/Collaborate'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
import CookieConsent from './components/ui/CookieConsent';
import PortfolioBot from './components/ui/PortfolioBot';
const Unsubscribe = lazy(() => import('./pages/Unsubscribe'));

// Optimized PageLoader with CSS animations instead of Framer Motion
// Use the style injector only once
let loaderStyleInjected = false;
const PageLoaderStyleInjector = () => {
  useEffect(() => {
    if (!loaderStyleInjected) {
      loaderStyleInjected = true;
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spinLoader {
          to { transform: rotate(360deg); }
        }
        @keyframes pulseLoader {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes loaderSweep {
          0% { transform: translateX(-110%); }
          100% { transform: translateX(110%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .loader-spin { animation: none !important; }
          .loader-pulse { animation: none !important; opacity: 0.7; }
          .loader-sweep { animation: none !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  return null;
};

const PageLoader = () => (
  <>
    <PageLoaderStyleInjector />
    <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="relative flex flex-col items-center gap-6 px-8">
        <div className="relative">
          <div className="w-16 h-16 border border-blue-500/20 border-t-blue-400 rounded-full loader-spin" style={{ animation: 'spinLoader 1s linear infinite' }}></div>
          <div className="absolute inset-2 border border-purple-500/10 border-b-purple-400 rounded-full loader-spin" style={{ animation: 'spinLoader 1.8s linear infinite reverse' }}></div>
          <div className="absolute inset-0 bg-blue-500/15 rounded-full blur-xl loader-pulse" style={{ animation: 'pulseLoader 2s ease-in-out infinite' }}></div>
        </div>
        <div className="w-48 h-px overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent loader-sweep" style={{ animation: 'loaderSweep 1.25s ease-in-out infinite' }} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-[var(--text-muted)]">Warming interface</span>
      </div>
    </div>
  </>
);

// Page transition wrapper with reduced motion support
const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] }
  }
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Animated routes component that has access to useLocation
const AnimatedRoutes: React.FC = () => {
  return (
    <PageTransition>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
      className="fixed left-0 top-0 z-[9996] h-[2px] w-full bg-gradient-to-r from-blue-400 via-emerald-300 to-purple-400 shadow-[0_0_24px_rgba(59,130,246,0.6)]"
    />
  );
};

const App: React.FC = () => {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { showCustomCursor } = useDevice();
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Optimized spring configs - reduce damping for better performance
  const outerSpring = prefersReducedMotion 
    ? { damping: 35, stiffness: 500, mass: 0.3 }
    : { damping: 28, stiffness: 120, mass: 0.5 };
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
    : { damping: 25, stiffness: 80 };
  const glowX = useSpring(mouseX, glowSpring);
  const glowY = useSpring(mouseY, glowSpring);

  const mouseMoveAnimationFrame = useRef<number | null>(null);
  const pendingMousePos = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);

  useEffect(() => {
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
      if (target.closest('a, button, [role="button"], input, textarea, select, [contenteditable], [data-cursor-hover]')) {
        setCursorVariant('default');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // --- Content Protection Guardrails ---
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
        return false;
      }
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.altKey && e.key === 'i')
      ) {
        e.preventDefault();
        return false;
      }
    };

    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    if (showCustomCursor) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseover', handlePointerOver);
      document.addEventListener('mouseout', handlePointerOut);

      document.documentElement.style.cursor = 'none';
      const cursorStyle = document.createElement('style');
      cursorStyle.id = 'custom-cursor-hide';
      cursorStyle.textContent = '*, *::before, *::after { cursor: none !important; }';
      document.head.appendChild(cursorStyle);
    }

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

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
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.documentElement.style.cursor = '';
      const style = document.getElementById('custom-cursor-hide');
      if (style) style.remove();
    };
  }, [mouseX, mouseY, showCustomCursor]);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500/30 overflow-x-hidden">
        <ScrollProgress />

        {/* Ambient Background Layer */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute inset-0 aurora-mesh opacity-55"></div>
          <div className="absolute inset-0 ambient-field opacity-80" />
          <div className="absolute inset-0 page-vignette" />
        </div>

        {/* ═══ CUSTOM CURSOR SYSTEM ═══ */}
        {showCustomCursor && (
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
                  : 'rgba(255, 255, 255, 0.15)',
                backgroundColor: cursorVariant === 'hover'
                  ? 'rgba(59, 130, 246, 0.06)'
                  : cursorVariant === 'text'
                  ? 'rgba(59, 130, 246, 0.15)'
                  : 'transparent',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
              className="fixed top-0 left-0 pointer-events-none z-[9998] border mix-blend-difference"
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
                    transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.2 }}
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
        )}

        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
          <CookieConsent />
          <PortfolioBot />
        </div>
      </div>
    </Router>
  );
};

export default App;
