
export interface LocationData {
    latitude: number;
    longitude: number;
}

export const getSunsetSunrise = (date: Date, latitude: number, longitude: number) => {
    // This is a simplified version of the sunrise/sunset calculation.
    // For more precision, a library like SunCalc would be better.
    // But this approximation is usually good within 10-15 minutes.

    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000);
    const zenith = 90.833; // Standard zenith for sunrise/sunset
    const D2R = Math.PI / 180;
    const R2D = 180 / Math.PI;

    // 1. calculate the day of the year
    // (already done)

    // 2. convert the longitude to hour value and calculate an approximate time
    const lnHour = longitude / 15;
    const tSunrise = dayOfYear + ((6 - lnHour) / 24);
    const tSunset = dayOfYear + ((18 - lnHour) / 24);

    const calculateTime = (t: number, isSunrise: boolean) => {
        // 3. calculate the Sun's mean anomaly
        const M = (0.9856 * t) - 3.289;

        // 4. calculate the Sun's true longitude
        let L = M + (1.916 * Math.sin(M * D2R)) + (0.020 * Math.sin(2 * M * D2R)) + 282.634;
        L = (L + 360) % 360;

        // 5a. calculate the Sun's right ascension
        let RA = R2D * Math.atan(0.91764 * Math.tan(L * D2R));
        RA = (RA + 360) % 360;

        // 5b. right ascension value needs to be in the same quadrant as L
        const Lquadrant = (Math.floor(L / 90)) * 90;
        const RAquadrant = (Math.floor(RA / 90)) * 90;
        RA = RA + (Lquadrant - RAquadrant);

        // 5c. right ascension value needs to be converted into hours
        RA = RA / 15;

        // 6. calculate the Sun's declination
        const sinDec = 0.39782 * Math.sin(L * D2R);
        const cosDec = Math.cos(Math.asin(sinDec));

        // 7a. calculate the Sun's local hour angle
        const cosH = (Math.cos(zenith * D2R) - (sinDec * Math.sin(latitude * D2R))) / (cosDec * Math.cos(latitude * D2R));

        if (cosH > 1) return null; // Sun never rises
        if (cosH < -1) return null; // Sun never sets

        // 7b. finish calculating H and convert into hours
        let H: number;
        if (isSunrise) {
            H = 360 - R2D * Math.acos(cosH);
        } else {
            H = R2D * Math.acos(cosH);
        }
        H = H / 15;

        // 8. calculate local mean time of rising/setting
        const T = H + RA - (0.06571 * t) - 6.622;

        // 9. adjust back to UTC
        let UT = T - lnHour;
        UT = (UT + 24) % 24;

        // 10. convert UT value to local time zone of date
        const localOffset = -date.getTimezoneOffset() / 60;
        let localTime = UT + localOffset;
        localTime = (localTime + 24) % 24;

        return localTime;
    };

    const sunrise = calculateTime(tSunrise, true);
    const sunset = calculateTime(tSunset, false);

    return { sunrise, sunset };
};

export const getSuggestedTheme = async (): Promise<'light' | 'dark'> => {
    try {
        // Fallback to time-only if geolocation is not available
        const defaultDayStart = 6; // 6 AM
        const defaultDayEnd = 18; // 6 PM
        const now = new Date();
        const currentHour = now.getHours() + now.getMinutes() / 60;

        // Try to get location from IP (more reliable, no permission needed)
        const response = await fetch('https://ipapi.co/json/').catch(() => null);
        if (response && response.ok) {
            const data = await response.json();
            const { latitude, longitude } = data;
            if (latitude && longitude) {
                const { sunrise, sunset } = getSunsetSunrise(now, latitude, longitude);
                if (sunrise !== null && sunset !== null) {
                    // Check if current hour is between sunrise and sunset
                    if (currentHour >= sunrise && currentHour < sunset) {
                        return 'light';
                    } else {
                        return 'dark';
                    }
                }
            }
        }

        // Default time-based fallback if IP geolocation fails
        if (currentHour >= defaultDayStart && currentHour < defaultDayEnd) {
            return 'light';
        } else {
            return 'dark';
        }
    } catch (error) {
        console.error('Error determining suggested theme:', error);
        // Default to dark mode if everything fails
        return 'dark';
    }
};
