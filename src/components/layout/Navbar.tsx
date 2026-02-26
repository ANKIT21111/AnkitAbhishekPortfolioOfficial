
import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { AVATAR_URL } from '../../constants/constants';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

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
      document.body.classList.add('mobile-no-scroll');
    } else {
      document.body.classList.remove('mobile-no-scroll');
    }
    return () => {
      document.body.classList.remove('mobile-no-scroll');
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
            transition: { type: "spring", stiffness: 300, damping: 30 }
          },
          hidden: {
            y: -120,
            rotateX: -25,
            opacity: 0,
            transition: { type: "spring", stiffness: 300, damping: 30 }
          },
        }}
        animate={hidden ? "hidden" : "visible"}
        initial="visible"
        style={{ perspective: 1000 }}
        className="fixed top-0 left-0 right-0 z-[100] pt-6 pb-2 pointer-events-none"
      >
        <div className="responsive-container flex items-center justify-between pointer-events-auto">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-3 relative z-50">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--nav-hover)] p-0.5 group-hover:border-blue-500/50 transition-colors shadow-2xl"
            >
              <img
                src={AVATAR_URL}
                alt="Ankit Abhishek"
                className="w-full h-full object-cover rounded-lg grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-base md:text-lg font-bold tracking-tighter text-[var(--text-primary)] leading-none uppercase">
                ANKIT<span className="text-blue-500">_</span>ABHISHEK
              </span>
              <span className="text-[9px] md:text-[10px] font-mono text-[var(--text-secondary)] tracking-[0.2em] uppercase">DATA ENGINEER</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 p-1.5 glass border border-[var(--border-color)] rounded-full shadow-2xl relative">
            {navLinks.map((link, idx) => (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={({ isActive }) =>
                  `relative px-4 lg:px-6 py-2.5 text-xs lg:text-sm font-medium transition-colors duration-300 z-10 ${isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <AnimatePresence>
                      {hoveredIndex === idx && (
                        <motion.div
                          layoutId="navHover"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 bg-[var(--nav-hover)] rounded-full -z-10"
                          transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        />
                      )}
                    </AnimatePresence>

                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-[var(--border-color)] rounded-full -z-20"
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

            <div className="h-4 w-[1px] bg-[var(--border-color)] mx-2"></div>

            <div className="flex items-center gap-2 lg:gap-3">
              <ThemeToggle />
              <a href="/Ankit%20Abhishek.pdf" target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 lg:px-6 py-2.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] lg:text-xs font-bold rounded-full hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                >
                  CV / RÉSUMÉ
                </motion.button>
              </a>
            </div>
          </div>

          {/* Desktop Status Indicator - Hidden on smaller laptops */}
          <div className="hidden xl:flex items-center gap-4 pl-4 border-l border-[var(--border-color)]">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Latency</span>
                <span className="text-[10px] font-mono text-emerald-500">14ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--text-secondary)] uppercase">Uptime</span>
                <span className="text-[10px] font-mono text-blue-500">99.9%</span>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-xl bg-[var(--nav-hover)] border border-[var(--border-color)] text-[var(--text-primary)] z-50 relative hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-[var(--bg-primary)]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

            <div className="flex flex-col items-center gap-8 w-full px-8">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `text-4xl font-bold tracking-tighter transition-all duration-300 ${isActive
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 scale-110'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "60px" }}
                className="h-[1px] bg-[var(--border-color)] my-4"
              />

              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                href="/Ankit%20Abhishek.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full max-w-xs"
              >
                <button
                  className="w-full py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl uppercase tracking-widest"
                >
                  Download CV
                </button>
              </motion.a>
            </div>

            <div className="absolute bottom-12 text-[10px] font-mono text-gray-500 uppercase tracking-[0.5em] animate-pulse">
              System_Status // Online
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;