import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render } from "../test/render";
import { render as rtlRender, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./ThemeContext";

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <p data-testid="theme">{theme}</p>

            <button
                data-testid="toggle"
                onClick={toggleTheme}
            >
                Toggle
            </button>
        </>
    );
};
const ErrorComponent = () => {
    useTheme();

    return <div>Error Test</div>;
};
describe("ThemeProvider", () => {
    beforeEach(() => {
        localStorage.clear();

        vi.useRealTimers();

        vi.stubGlobal(
            "matchMedia",
            vi.fn().mockImplementation(() => ({
                matches: false,
                media: "",
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }))
        );

        document.documentElement.className = "";
        document.documentElement.removeAttribute("data-theme");
    });
    it("renders the provider", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(
            screen.getByTestId("theme")
        ).toBeInTheDocument();
    });

    it("uses system theme by default", () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(
            screen.getByTestId("theme")
        ).toHaveTextContent("system");
    });

    it("loads theme from localStorage", () => {
        localStorage.setItem("theme", "dark");

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(
            screen.getByTestId("theme")
        ).toHaveTextContent("dark");
    });
    it("changes system theme to light when toggle is clicked", async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("system");

        await user.click(screen.getByTestId("toggle"));

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("light");
    });
    it("cycles through all themes", async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("system");

        await user.click(screen.getByTestId("toggle"));

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("light");

        await user.click(screen.getByTestId("toggle"));

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("dark");

        await user.click(screen.getByTestId("toggle"));

        expect(screen.getByTestId("theme"))
            .toHaveTextContent("system");
    });

    it("updates localStorage when theme changes", async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        await user.click(screen.getByTestId("toggle"));

        expect(localStorage.getItem("theme"))
            .toBe("light");

        await user.click(screen.getByTestId("toggle"));

        expect(localStorage.getItem("theme"))
            .toBe("dark");

        await user.click(screen.getByTestId("toggle"));

        expect(localStorage.getItem("theme"))
            .toBe("system");
    });

    it("updates document data-theme attribute", async () => {
        const user = userEvent.setup();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        await user.click(screen.getByTestId("toggle"));

        expect(
            document.documentElement
        ).toHaveAttribute(
            "data-theme",
            "light"
        );

        await user.click(screen.getByTestId("toggle"));

        expect(
            document.documentElement
        ).toHaveAttribute(
            "data-theme",
            "dark"
        );
    });
    it("adds theme-transition class when theme changes", async () => {
        vi.useFakeTimers();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );


        const button = screen.getByRole("button");

        fireEvent.click(button);


        expect(
            document.documentElement
        ).toHaveClass("theme-transition");


        vi.advanceTimersByTime(500);


        expect(
            document.documentElement
        ).not.toHaveClass("theme-transition");


        vi.useRealTimers();
    });
    it("removes theme-transition class after timeout", () => {
        vi.useFakeTimers();

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        screen.getByTestId("toggle").click();

        expect(
            document.documentElement
        ).toHaveClass("theme-transition");

        vi.advanceTimersByTime(500);

        expect(
            document.documentElement
        ).not.toHaveClass("theme-transition");

        vi.useRealTimers();
    });
    it("throws error when useTheme is used outside ThemeProvider", () => {
        expect(() => {
            rtlRender(<ErrorComponent />);
        }).toThrow(
            "useTheme must be used within a ThemeProvider"
        );
    });

    it("sets data-theme attribute on initial render", () => {
        localStorage.setItem("theme", "dark");

        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );

        expect(
            document.documentElement
        ).toHaveAttribute(
            "data-theme",
            "dark"
        );
    });
});