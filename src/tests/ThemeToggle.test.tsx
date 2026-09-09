import { describe, it, expect, beforeAll } from "vitest";
import { screen } from "@testing-library/react";
import { render } from "../test/render";
import userEvent from "@testing-library/user-event";

import ThemeToggle from "../components/ui/ThemeToggle";

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
        render(<ThemeToggle />);

        expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    });

    it("has an aria-label", () => {
        render(<ThemeToggle />);

        const button = screen.getByTestId("theme-toggle");

        expect(button).toHaveAttribute("aria-label");
    });

    it("toggles when clicked", async () => {
        render(<ThemeToggle />);
        const button = screen.getByTestId("theme-toggle");

        await userEvent.click(button);

        expect(button).toBeInTheDocument();
    });

    it("has checkbox role", () => {
        render(<ThemeToggle />);

        expect(screen.getByRole("checkbox")).toBeInTheDocument();
    });

    it("has data-testid", () => {
        render(<ThemeToggle />);

        expect(screen.getByTestId("theme-toggle")).toBeVisible();
    });
});