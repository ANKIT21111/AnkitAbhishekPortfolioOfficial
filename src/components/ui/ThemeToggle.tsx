
import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

const ThemeToggle: React.FC = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        (localStorage.getItem('theme') as 'light' | 'dark') || 'dark'
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-full glass border border-[var(--border-color)] text-[var(--text-primary)] hover:border-blue-500/50 transition-colors shadow-2xl flex items-center justify-center"
            aria-label="Toggle Theme"
        >
            {theme === 'light' ? (
                <Sun size={20} className="text-amber-500" />
            ) : (
                <Moon size={20} className="text-blue-400" />
            )}
        </motion.button>
    );
};

export default ThemeToggle;
