
import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, Variants, useScroll } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/layout/CustomCursor';

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
    <Suspense fallback={<PageLoader />}>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/thoughts" element={<Thoughts />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/collaborate" element={<Collaborate />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Routes>
      </PageTransition>
    </Suspense>
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
  useEffect(() => {
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

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

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
        <CustomCursor />

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
