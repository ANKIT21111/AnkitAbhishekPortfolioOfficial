
import React, { useEffect, useState, useCallback, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, Variants } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

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

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
    <div className="relative">
      <div className="w-14 h-14 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse rounded-full"></div>
      <motion.div
        className="absolute inset-0 rounded-full border border-blue-500/10"
        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  </div>
);

// Page transition wrapper
const pageVariants: Variants = {
  initial: { opacity: 0, y: 12, filter: 'blur(4px)' },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    y: -8, 
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
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

const App: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'click' | 'text'>('default');
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Outer ring — springy, laggy trail
  const outerSpring = { damping: 28, stiffness: 120, mass: 0.5 };
  const outerX = useSpring(mouseX, outerSpring);
  const outerY = useSpring(mouseY, outerSpring);

  // Inner dot — snappy, precise
  const innerSpring = { damping: 35, stiffness: 400 };
  const innerX = useSpring(mouseX, innerSpring);
  const innerY = useSpring(mouseY, innerSpring);

  // Background glow — very laggy for ambient effect
  const glowSpring = { damping: 25, stiffness: 80 };
  const glowX = useSpring(mouseX, glowSpring);
  const glowY = useSpring(mouseY, glowSpring);

  useEffect(() => {
    // Check if it's a mobile device
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkMobile();

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    // Cursor hover detection for interactive elements
    const handleElementEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, [contenteditable]')) {
        setCursorVariant('text');
      } else {
        setCursorVariant('hover');
      }
    };

    const handleElementLeave = () => {
      setCursorVariant('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // --- Content Protection Guardrails ---

    // 1. Prevent Right-Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Prevent Keyboard Shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12, Ctrl+Shift+I/J)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+U, Ctrl+S
      if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
        e.preventDefault();
        return false;
      }

      // Disable F12 and Ctrl+Shift+I/J/C (DevTools)
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
        (e.metaKey && e.altKey && e.key === 'i') // Mac DevTools
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Prevent Image Dragging
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    // Attach listeners
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);

      // Attach hover detection to interactive elements
      const interactiveSelector = 'a, button, [role="button"], input, textarea, select, [data-cursor-hover]';
      const attachHoverListeners = () => {
        document.querySelectorAll(interactiveSelector).forEach(el => {
          el.addEventListener('mouseenter', handleElementEnter);
          el.addEventListener('mouseleave', handleElementLeave);
        });
      };

      // Initial attach + MutationObserver for dynamic elements
      attachHoverListeners();
      const observer = new MutationObserver(() => {
        attachHoverListeners();
      });
      observer.observe(document.body, { childList: true, subtree: true });

      // Hide native cursor via CSS
      document.documentElement.style.cursor = 'none';
      const cursorStyle = document.createElement('style');
      cursorStyle.id = 'custom-cursor-hide';
      cursorStyle.textContent = '*, *::before, *::after { cursor: none !important; }';
      document.head.appendChild(cursorStyle);

      document.addEventListener('contextmenu', handleContextMenu);
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('dragstart', handleDragStart);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('contextmenu', handleContextMenu);
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('dragstart', handleDragStart);
        observer.disconnect();
        document.documentElement.style.cursor = '';
        const style = document.getElementById('custom-cursor-hide');
        if (style) style.remove();
      };
    }

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, [mouseX, mouseY, isMobile]);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-500/30 overflow-x-hidden">
        {/* Elite Background Layer */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          
          {/* Aurora gradient mesh background */}
          <div className="absolute inset-0 aurora-mesh opacity-60"></div>

          {/* Ambient cursor glow — deep background layer */}
          {!isMobile && (
            <motion.div
              style={{ x: glowX, y: glowY, translateX: '-50%', translateY: '-50%', willChange: 'transform' }}
              className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full"
            >
              <div className="w-full h-full bg-blue-600 rounded-full blur-[100px]" style={{ opacity: 0.12, transform: 'translateZ(0)' }} />
              <motion.div 
                className="absolute inset-6 bg-blue-400 rounded-full blur-[50px]"
                animate={{ opacity: [0.04, 0.1, 0.04], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transform: 'translateZ(0)' }}
              />
            </motion.div>
          )}

          {/* CSS-based noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
          
          {/* Liquid morphing blobs */}
          <div className="absolute top-[20%] right-[10%] w-[280px] h-[280px] bg-purple-600 blob-morph blur-[60px]" style={{ opacity: 'var(--glow-opacity)' }}></div>
          <div className="absolute bottom-[10%] left-[5%] w-[380px] h-[380px] bg-blue-900 blob-morph blur-[90px]" style={{ opacity: 'var(--glow-opacity)', animationDelay: '3s' }}></div>
          <div className="absolute top-[60%] right-[30%] w-[200px] h-[200px] bg-indigo-700 blob-morph blur-[70px]" style={{ opacity: 'calc(var(--glow-opacity) * 0.7)', animationDelay: '5s' }}></div>
        </div>

        {/* ═══ CUSTOM CURSOR SYSTEM ═══ */}
        {!isMobile && (
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

            {/* Hover glow ring — only on interactive elements */}
            <AnimatePresence>
              {cursorVariant === 'hover' && (
                <motion.div
                  style={{ x: outerX, y: outerY, translateX: '-50%', translateY: '-50%' }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="fixed top-0 left-0 w-[56px] h-[56px] rounded-full pointer-events-none z-[9997]"
                >
                  <div className="w-full h-full rounded-full border border-blue-500/20 bg-blue-500/5 blur-[2px]" />
                  <motion.div 
                    className="absolute inset-0 rounded-full border border-blue-400/10"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
