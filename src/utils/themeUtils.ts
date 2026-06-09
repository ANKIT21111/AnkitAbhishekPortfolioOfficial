export interface LocationData {
    latitude: number;
    longitude: number;
}

export const getSunsetSunrise = (date: Date, latitude: number, longitude: number) => {
    // Placeholder implementation: returns the same date for both sunrise and sunset.
    const sunrise = new Date(date);
    const sunset = new Date(date);
    return { sunrise, sunset };
};

export const getSuggestedTheme = async (): Promise<'light' | 'dark'> => {
    // For now, suggest theme based on system preference.
    return getSystemTheme();
};

// --- New helpers ---

export const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const setupThemeListener = (callback: () => void) => {
    if (typeof window === 'undefined') return () => {};
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => callback();
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
};
