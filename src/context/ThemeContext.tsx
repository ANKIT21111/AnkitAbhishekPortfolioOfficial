
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { getSuggestedTheme } from '../utils/themeUtils';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        // Use stored theme as initial value to avoid flash
        const stored = localStorage.getItem('theme') as Theme;
        return stored || 'dark';
    });

    const applyTheme = useCallback((newTheme: Theme) => {
        const root = window.document.documentElement;
        root.classList.add('theme-transition');
        root.setAttribute('data-theme', newTheme);
        setThemeState(newTheme);

        const timeout = setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 500);
        return () => clearTimeout(timeout);
    }, []);

    // On first load: if user has never manually set a theme, auto-detect from location & time
    useEffect(() => {
        const initializeTheme = async () => {
            const hasManualPreference = localStorage.getItem('theme');

            if (!hasManualPreference) {
                // First visit — auto-detect based on location & time
                const suggested = await getSuggestedTheme();
                applyTheme(suggested);
            } else {
                // Returning user — apply their saved preference
                applyTheme(hasManualPreference as Theme);
            }
        };

        initializeTheme();
    }, [applyTheme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
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
