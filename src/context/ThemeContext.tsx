import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getSystemTheme, setupThemeListener } from '../utils/themeUtils';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Initialise from localStorage; default to 'system' if not set
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem('theme') as Theme;
        return stored || 'system';
    });

    const applyTheme = useCallback((newTheme: Theme) => {
        const root = document.documentElement;

        root.classList.add('theme-transition');

        const finalTheme =
            newTheme === 'system'
                ? getSystemTheme()
                : newTheme;

        root.setAttribute('data-theme', finalTheme);

        setThemeState(newTheme);

        const timeout = window.setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 500);

        return () => {
            window.clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        // Apply the stored or default theme on first load
        applyTheme(theme);
        // If theme is system, set up a listener to react to OS preference changes
        if (theme === 'system') {
            const cleanup = setupThemeListener(() => {
                // When OS changes, re‑apply system theme to update data-theme attr
                applyTheme('system');
            });
            return cleanup;
        }
        // Else no listener needed
        return undefined;
    }, [theme, applyTheme]);

    const toggleTheme = () => {
        const newTheme = (() => {
            if (theme === 'light') return 'dark';
            if (theme === 'dark') return 'system';
            if (theme === 'system') return 'light';
            return 'light';
        })() as Theme;
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
