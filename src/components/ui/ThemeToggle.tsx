import React from 'react';
import { Sun, Moon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Theme } from '../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    const nextTheme = (): Theme => {
        if (theme === 'light') return 'dark';
        if (theme === 'dark') return 'system';
        return 'light';
    };

    const ariaLabel = `Current theme is ${theme}. Click to switch to ${nextTheme()}.`;

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-blue-500/50 transition-colors shadow-2xl flex items-center justify-center focus-visible:ring-2 focus-visible:ring-indigo-500"
            aria-label={ariaLabel}
            aria-pressed={theme !== 'system'}
            role="checkbox"
            data-testid="theme-toggle"
        >
            <AnimatePresence mode="wait" initial={false}>
                {theme === 'light' ? (
                    <motion.div
                        key="sun"
                        initial={{ rotate: -90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: 90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Sun size={20} className="text-amber-500" />
                    </motion.div>
                ) : theme === 'dark' ? (
                    <motion.div
                        key="moon"
                        initial={{ rotate: 90, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -90, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Moon size={20} className="text-blue-400" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="settings"
                        initial={{ rotate: 45, scale: 0, opacity: 0 }}
                        animate={{ rotate: 0, scale: 1, opacity: 1 }}
                        exit={{ rotate: -45, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <Settings size={20} className="text-green-400" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default ThemeToggle;
