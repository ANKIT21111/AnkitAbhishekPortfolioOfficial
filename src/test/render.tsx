import React, { ReactElement } from "react";
import { render as rtlRender, RenderOptions } from "@testing-library/react";

import { ThemeProvider } from "../context/ThemeContext";

const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
};

const render = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) =>
    rtlRender(ui, {
        wrapper: AllProviders,
        ...options,
    });

export * from "@testing-library/react";

export { render };