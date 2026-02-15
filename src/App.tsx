
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy load components for better performance
const Hero = lazy(() => import('./pages/Hero'));
const Thoughts = lazy(() => import('./pages/Thoughts'));
const Solutions = lazy(() => import('./pages/Solutions'));
const Collaborate = lazy(() => import('./pages/Collaborate'));

const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#020202]">
    <div className="relative">
      <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse rounded-full"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

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

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isMobile]);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen bg-[#020202] text-white selection:bg-blue-500/30">
        {/* Elite Background Layer */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute inset-0 grid-bg opacity-20"></div>


          {/* Animated Glows - Only active and simpler on desktop */}
          {!isMobile && (
            <motion.div
              style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
              className="absolute top-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[60px]"
            />
          )}
          <div className="absolute top-[20%] right-[10%] w-[250px] h-[250px] bg-purple-600/5 rounded-full blur-[50px] animate-pulse"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] bg-blue-900/5 rounded-full blur-[80px]"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/thoughts" element={<Thoughts />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/collaborate" element={<Collaborate />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
