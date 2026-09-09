import { vi } from "vitest";

Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

Object.defineProperty(window, "scrollTo", {
    writable: true,
    value: vi.fn(),
});

class ResizeObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

(globalThis as any).ResizeObserver = ResizeObserverMock;

class IntersectionObserverMock {
    observe() { }
    unobserve() { }
    disconnect() { }
}

(globalThis as any).IntersectionObserver = IntersectionObserverMock;

const localStorageMock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
    writable: true,
    value: localStorageMock,
});