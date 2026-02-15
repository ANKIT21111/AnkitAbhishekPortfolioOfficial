
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { AVATAR_URL } from '../../constants/constants';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Monitor scroll direction to hide/show navbar
  useMotionValueEvent(scrollY, "change", (latest) => {
    const direction = latest > lastScrollY.current ? "down" : "up";
    if (latest > 100 && direction === "down") {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Hero', path: '/' },
    { name: 'Thoughts', path: '/thoughts' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Collaborate', path: '/collaborate' },
  ];

  return (
    <>
      <motion.nav
        variants={{
          visible: {
            y: 0,
            rotateX: 0,
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30
            }
          },
          hidden: {
            y: -120,
            rotateX: -25,
            opacity: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 30
            }
          },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial="visible"
        style={{ perspective: 1000 }}
        className="fixed top-0 left-0 right-0 z-[100] px-6 py-6 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-4 relative z-50">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 p-0.5 group-hover:border-blue-500/50 transition-colors shadow-2xl"
            >
              <img
                src={AVATAR_URL}
                alt="Ankit Abhishek"
                className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tighter text-white leading-none uppercase">
                ANKIT<span className="text-blue-500">_</span>ABHISHEK
              </span>
              <span className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase">DATA ENGINEER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 p-1.5 glass border border-white/10 rounded-full shadow-2xl relative">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={({ isActive }) =>
                  `relative px-5 py-2.5 text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Hover Backdrop */}
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          layoutId="navHover"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 bg-white/5 rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Active Backdrop */}
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-white/10 rounded-full -z-20"
                        transition={{ type: "spring", bounce: 0.3, duration: 0.8 }}
                      />
                    )}

                    <span className="relative flex items-center gap-2">
                      {link.name}
                      {isActive && <motion.div layoutId="dot" className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />}
                    </span>
                  </>
                )}
              </NavLink>
            ))}

            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

            <a href="/Ankit%20Abhishek.pdf" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
              >
                CV / RESUME
              </motion.button>
            </a>
          </div>

          {/* Desktop Status Indicator */}
          <div className="hidden lg:flex items-center gap-4 pl-4 border-l border-white/10">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Latency</span>
                <span className="text-[10px] font-mono text-emerald-500">14ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 uppercase">Uptime</span>
                <span className="text-[10px] font-mono text-blue-500">99.9%</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-3 rounded-full bg-white/10 border border-white/10 text-white z-50 relative hover:bg-white/20 transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-8"
          >
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

            <div className="flex flex-col items-center gap-6 w-full px-8">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-3xl font-bold tracking-tight transition-all duration-300 ${isActive
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 scale-110'
                      : 'text-gray-400 hover:text-white hover:scale-105'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "50px" }}
                className="h-[1px] bg-white/10 my-4"
              />

              <a
                href="/Ankit%20Abhishek.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 bg-white text-black text-sm font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-[0_10px_20px_rgba(255,255,255,0.1)] uppercase tracking-wider"
                >
                  CV / Resume
                </motion.button>
              </a>
            </div>

            <div className="absolute bottom-12 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
              System_Status // Online
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;