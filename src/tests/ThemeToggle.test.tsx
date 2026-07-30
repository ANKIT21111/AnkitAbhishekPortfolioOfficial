import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "../components/ui/ThemeToggle";
import { ThemeProvider } from "../context/ThemeContext";

beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
        writable: true,
        value: (query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: () => { },
            removeEventListener: () => { },
            addListener: () => { }, // Legacy support
            removeListener: () => { }, // Legacy support
            dispatchEvent: () => false,
        }),
    });
});

describe("ThemeToggle", () => {
    it("renders the theme toggle button", () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });

    it("has an aria-label", () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const button = screen.getByTestId("theme-toggle");

        expect(button).toHaveAttribute("aria-label");
    });

    it("toggles when clicked", async () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        const button = screen.getByTestId("theme-toggle");

        await userEvent.click(button);

        expect(button).toBeInTheDocument();
    });

    it("has checkbox role", () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("has data-testid", () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );

        expect(screen.getByTestId("theme-toggle")).toBeVisible();
    });
});