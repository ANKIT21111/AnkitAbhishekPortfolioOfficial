import { describe, it, expect, beforeEach, vi } from "vitest";

import {
    getSunsetSunrise,
    getSuggestedTheme,
    getSystemTheme,
    setupThemeListener,
} from "./themeUtils";

const setMatchMedia = (matches: boolean) => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
        matches,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    }));
};

describe("getSunsetSunrise", () => {
    it("returns sunrise and sunset dates", () => {
        const date = new Date("2026-01-01");

        const result = getSunsetSunrise(
            date,
            28.6139,
            77.2090
        );

        expect(result).toHaveProperty("sunrise");
        expect(result).toHaveProperty("sunset");

        expect(result.sunrise).toBeInstanceOf(Date);
        expect(result.sunset).toBeInstanceOf(Date);

        expect(result.sunrise.getTime()).toBe(date.getTime());
        expect(result.sunset.getTime()).toBe(date.getTime());
    });
});

describe("getSystemTheme", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns dark when system prefers dark mode", () => {

        setMatchMedia(true);

        expect(getSystemTheme()).toBe("dark");

    });

    it("returns light when system prefers light mode", () => {

        setMatchMedia(false);

        expect(getSystemTheme()).toBe("light");

    });

    it("calls matchMedia", () => {

        const matchMediaSpy = vi.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));

        window.matchMedia = matchMediaSpy;

        getSystemTheme();

        expect(matchMediaSpy).toHaveBeenCalledWith(
            "(prefers-color-scheme: dark)"
        );

    });

});

describe("setupThemeListener", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("registers change listener", () => {

        const addEventListener = vi.fn();

        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            media: "",
            onchange: null,
            addEventListener,
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        });

        setupThemeListener(() => { });

        expect(addEventListener).toHaveBeenCalledWith(
            "change",
            expect.any(Function)
        );

    });

    it("removes listener during cleanup", () => {

        const removeEventListener = vi.fn();

        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            media: "",
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        });

        const cleanup = setupThemeListener(() => { });

        cleanup();

        expect(removeEventListener).toHaveBeenCalledWith(
            "change",
            expect.any(Function)
        );

    });

});

describe("getSuggestedTheme", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("returns dark", async () => {

        setMatchMedia(true);

        await expect(
            getSuggestedTheme()
        ).resolves.toBe("dark");

    });

    it("returns light", async () => {

        setMatchMedia(false);

        await expect(
            getSuggestedTheme()
        ).resolves.toBe("light");

    });

});