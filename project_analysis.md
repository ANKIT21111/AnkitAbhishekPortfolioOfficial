# 📂 Complete Per-File Analysis — AnkitAbhishekPortfolioOfficial

> Full-stack React 19 + TypeScript + Vite portfolio with Netlify serverless backend and MongoDB.

---

## 1. Root Configuration Files

### [index.html](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/index.html)
| Property | Value |
|---|---|
| Size | 10.7 KB · 201 lines |
| Purpose | App entry HTML — mounts React into `#root` |
| Key Details | • Extensive SEO: OG tags (Facebook/LinkedIn), Twitter Card tags, JSON-LD structured data (Person, WebSite, ProfilePage, Organization) • Google Site Verification meta tag • Fonts loaded from Google Fonts: Inter, Outfit, JetBrains Mono • Preconnect hints for `fonts.googleapis.com`, `images.unsplash.com`, `grainy-gradients.vercel.app` • PWA manifest linked • Favicon set to `/logo.jpg` |

---

### [package.json](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/package.json)
| Property | Value |
|---|---|
| Size | 1.8 KB · 61 lines |
| Purpose | NPM project config — dependencies, scripts, and metadata |
| Key Details | • 10 scripts: `dev`, `build`, `preview`, `dev:functions`, `serve:functions`, `lint`, `type-check`, `test`, `test:ui`, `test:watch`, `test:coverage` • **Runtime deps**: React 19, Framer Motion, Lucide React, React Router v7, React Markdown, MongoDB, canvas-confetti, TailwindCSS Typography • **Dev deps**: Vite 6, Vitest, Testing Library (React + DOM + user-event), ESLint, TypeScript 5.8, jsdom, vite-plugin-compression |

---

### [vite.config.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/vite.config.ts)
| Property | Value |
|---|---|
| Size | 2.2 KB · 85 lines |
| Purpose | Vite build configuration |
| Key Details | • Dev server on port 3000, host `0.0.0.0` • Proxy: `/api` → `http://localhost:9999/.netlify/functions` • Plugins: `@vitejs/plugin-react`, `@tailwindcss/vite`, gzip + brotli compression • Path alias: `@` → `./src` • Manual chunks: `vendor-react`, `vendor-framer`, `vendor-icons` • Production: drops console/debugger, esbuild target `es2020` |

> [!WARNING]
> Contains an inline `test` block pointing to `./src/test/setup.ts` (singular) — but the actual file is at `./src/tests/setup.ts`. This block is overridden by `vitest.config.ts`.

---

### [vitest.config.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/vitest.config.ts)
| Property | Value |
|---|---|
| Size | 430 B · 18 lines |
| Purpose | Standalone Vitest test configuration |
| Key Details | • Environment: `jsdom` with globals enabled • Setup file: `./src/tests/setup.ts` (correct path) • Test pattern: `src/**/*.{test,spec}.{ts,tsx}` • Coverage: v8 provider, JSON + text reporters |

---

### [tsconfig.json](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/tsconfig.json)
| Property | Value |
|---|---|
| Size | 665 B · 34 lines |
| Purpose | TypeScript compiler options |
| Key Details | • Target: ES2022, module: ESNext, JSX: `react-jsx` • Path alias: `@/*` → `./src/*` • Types: `node`, `vite/client`, `@testing-library/jest-dom` • `noEmit: true` (type-checking only, Vite handles transpilation) • Includes only `src/` |

---

### [eslint.config.js](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/eslint.config.js)
| Property | Value |
|---|---|
| Size | 1.1 KB · 44 lines |
| Purpose | ESLint flat config |
| Key Details | • Extends: `js.configs.recommended` + `tseslint.configs.recommended` • Plugins: `eslint-plugin-react`, `eslint-plugin-react-hooks` • Notable rules: `react-in-jsx-scope: off`, hooks rules enforced, `no-explicit-any: warn`, unused vars with `_` prefix ignored |

---

### [netlify.toml](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify.toml)
| Property | Value |
|---|---|
| Size | 434 B · 28 lines |
| Purpose | Netlify deployment configuration |
| Key Details | • Build: `npm run build` → publish `dist/` • Functions directory: `netlify/functions` • Node 20 • Redirects: `/api/*` → `/.netlify/functions/:splat` (200), `/*` → `/index.html` (200, SPA fallback) • Edge function: `/thoughts` path → `og-meta` function |

---

### [.gitignore](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/.gitignore)
| Property | Value |
|---|---|
| Size | 342 B · 31 lines |
| Purpose | Git ignore rules |
| Key Details | Ignores `node_modules`, `dist`, `.env`, `.netlify`, editor files, log files |

---

### [CLAUDE.md](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/CLAUDE.md)
| Property | Value |
|---|---|
| Size | 13.6 KB |
| Purpose | AI coding assistant documentation and project guidelines |

---

### [README.md](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/README.md)
| Property | Value |
|---|---|
| Size | 13.3 KB |
| Purpose | Project documentation — features, setup instructions, architecture |

---

## 2. `src/` — Application Source

### [src/index.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/index.tsx)
| Property | Value |
|---|---|
| Size | 501 B · 21 lines |
| Purpose | React DOM entry point |
| Key Details | • Mounts `<App />` inside `<React.StrictMode>` + `<ThemeProvider>` • Imports `globals.css` • Finds `#root` element or throws |

---

### [src/App.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/App.tsx)
| Property | Value |
|---|---|
| Size | 15.5 KB · 373 lines |
| Purpose | Root application component — routing, layout, custom cursor, content protection |
| Exports | `App` (default) |
| Key Details | • **Lazy-loaded pages**: Hero, Thoughts, Solutions, Collaborate, PrivacyPolicy, TermsOfService, Unsubscribe • **Always loaded**: Navbar, Footer, CookieConsent, PortfolioBot • **`AnimatedRoutes`**: Wraps `<Routes>` with Framer Motion `PageTransition` (fade + slide) inside `<Suspense>` with a custom `PageLoader` • **`ScrollProgress`**: Scroll-linked gradient bar at top of page • **Custom cursor system** (desktop only): 3-layer cursor (outer ring, inner dot, glow) with spring physics; detects hover/text/click states • **Content protection**: Blocks right-click, Ctrl+C/U/S/A, F12, DevTools shortcuts, image drag |
| Routes | `/` → Hero, `/thoughts` → Thoughts, `/solutions` → Solutions, `/collaborate` → Collaborate, `/privacy` → PrivacyPolicy, `/terms` → TermsOfService, `/unsubscribe` → Unsubscribe |

---

### [src/vite-env.d.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/vite-env.d.ts)
| Property | Value |
|---|---|
| Size | 376 B · 22 lines |
| Purpose | TypeScript ambient declarations for image imports |
| Key Details | Declares modules for `*.png`, `*.jpg`, `*.jpeg`, `*.svg` so they can be imported as strings |

---

## 3. `src/pages/` — Page Components

### [src/pages/Hero.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/Hero.tsx)
| Property | Value |
|---|---|
| Size | 54.8 KB · 1,132 lines |
| Purpose | Main landing/hero page — bio, stats, career timeline |
| Key Details | • Uses `TIMELINE_DATA`, `PORTRAIT_URL`, `HERO_STATS` from constants • Renders animated career timeline with work/education items, expandable details, tags, highlights, and company logos • Features: parallax scrolling, 3D word reveal animations, motion-tracked gradients, responsive stat cards • Imports `OptimizedImage`, `useDevice`, React Router `Link` • Extensive Framer Motion variants for staggered reveals |

---

### [src/pages/Solutions.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/Solutions.tsx)
| Property | Value |
|---|---|
| Size | 49.9 KB · 1,183 lines |
| Purpose | Projects/solutions showcase with filterable grid |
| Key Details | • Category filter: All, ETL, ML, Analytics, BigData, Web, Learning • Each category has a unique color pill and gradient • Features: project cards with hover effects, expandable detail modals with architecture/tech explanation/problem solved, carousel navigation • Imports `PROJECTS_DATA` from constants • Custom `Tag` atom component for tech labels |

---

### [src/pages/Collaborate.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/Collaborate.tsx)
| Property | Value |
|---|---|
| Size | 59.8 KB · 1,125 lines |
| Purpose | Contact/collaboration page — message + meeting scheduling form |
| Key Details | • 3D tilt card component (`TiltCard`) with mouse-tracked rotation • Contact form with name, email, message fields • Meeting scheduler with date/time picker • Sends data to `/api/collaborate` • Social links: GitHub, LinkedIn, YouTube, email • Features: form validation, submission animation, confetti on success |

---

### [src/pages/Thoughts.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/Thoughts.tsx)
| Property | Value |
|---|---|
| Size | 36.2 KB · 801 lines |
| Purpose | Blog/thoughts CMS — reading + admin studio |
| Key Details | • **Reader mode**: Lists blog posts, search, full-post reader • **Studio mode**: Admin blog editor (create/edit/delete posts with OTP verification) • State: posts, view mode, selected post, search query, form data, OTP modal, image upload modal, preview mode • Fetches from `/api/blog` on mount • Composes 6 sub-components: ThoughtsReader, OtpModal, ThoughtsList, ThoughtsStudio, Newsletter, ForgeIndicta |

---

### [src/pages/PrivacyPolicy.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/PrivacyPolicy.tsx)
| Property | Value |
|---|---|
| Size | 6.8 KB · ~170 lines |
| Purpose | Static privacy policy page |

---

### [src/pages/TermsOfService.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/TermsOfService.tsx)
| Property | Value |
|---|---|
| Size | 6.5 KB · ~160 lines |
| Purpose | Static terms of service page |

---

### [src/pages/Unsubscribe.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/pages/Unsubscribe.tsx)
| Property | Value |
|---|---|
| Size | 8.2 KB · ~200 lines |
| Purpose | Newsletter unsubscribe flow |
| Key Details | Reads email from URL query param, calls `/api/unsubscribe` |

---

### `src/pages/__lazy__/`
| Property | Value |
|---|---|
| Status | **Empty directory** — reserved for lazy-loaded page wrapper components |

---

## 4. `src/components/` — Reusable Components

### [src/components/SkipLink.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/SkipLink.tsx)
| Property | Value |
|---|---|
| Size | 416 B · 14 lines |
| Purpose | Accessibility skip-to-content link |
| Key Details | Screen-reader-only `<a href="#main">` that becomes visible on focus |

---

### `src/components/ui/` — UI Primitives

#### [ThemeToggle.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/ui/ThemeToggle.tsx)
| Property | Value |
|---|---|
| Size | 2.8 KB · 66 lines |
| Purpose | Dark/light/system theme toggle button |
| Exports | `ThemeToggle` (default) |
| Key Details | • Cycles: light (☀️ amber) → dark (🌙 blue) → system (⚙️ green) → light • Animated icon swap via `AnimatePresence` with rotation transitions • Uses `useTheme()` from ThemeContext • `role="checkbox"`, `data-testid="theme-toggle"`, descriptive `aria-label` • Glassmorphism styling with hover scale effect |

---

#### [CookieConsent.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/ui/CookieConsent.tsx)
| Property | Value |
|---|---|
| Size | 4.7 KB · 93 lines |
| Purpose | GDPR/CCPA cookie consent banner |
| Exports | `CookieConsent` (default) |
| Key Details | • Auto-shows after 2s delay if no `cookie-consent` in localStorage • Accept All / Decline buttons • Stores `'accepted'` or `'declined'` in localStorage • Spring-animated slide-up from bottom • Links to `/privacy` for policy review • "GDPR & CCPA COMPLIANT" footer badge |

---

#### [OptimizedImage.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/ui/OptimizedImage.tsx)
| Property | Value |
|---|---|
| Size | 3.3 KB · 81 lines |
| Purpose | Lazy-loading image with shimmer placeholder and blur-up reveal |
| Exports | `OptimizedImage` (default) |
| Props | `src`, `alt`, `className?`, `priority?` (eager vs lazy loading) |
| Key Details | • 3 states: loading (shimmer animation), loaded (blur→sharp transition), error (fallback UI) • Uses native `loading="lazy"` and `decoding="async"` • Framer Motion for opacity + blur + scale transitions |

---

#### [PortfolioBot.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/ui/PortfolioBot.tsx)
| Property | Value |
|---|---|
| Size | 33.9 KB · 501 lines |
| Purpose | AI-powered portfolio chatbot assistant |
| Exports | `PortfolioBot` (default) |
| Key Details | • **Knowledge base**: 10+ entries covering resume, projects, skills, social links, interview simulation • **Keyword matching**: Scans user input against keyword arrays to find the best response • **Categories**: `resume`, `projects`, `interview`, `skills`, `general`, `social` • **UI**: Floating bot icon → expandable chat panel with message history, input field, suggested queries • **Features**: Typing simulation, markdown-rendered responses, animated messages, glassmorphism design • **Icons used**: Bot, User, Shield, RefreshCw, Cpu, Activity, Zap, Terminal |

---

### `src/components/layout/` — Layout Components

#### [Navbar.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/layout/Navbar.tsx)
| Property | Value |
|---|---|
| Size | 15.0 KB |
| Purpose | Responsive navigation bar |
| Key Details | Desktop + mobile hamburger menu, active link highlighting, logo, ThemeToggle integration, glassmorphism blur |

---

#### [Footer.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/layout/Footer.tsx)
| Property | Value |
|---|---|
| Size | 16.8 KB |
| Purpose | Site footer |
| Key Details | Social links, quick navigation, newsletter signup call-to-action, copyright, links to Privacy/Terms |

---

### `src/components/thoughts/` — Blog Feature Components

#### [BlogPostCard.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/BlogPostCard.tsx)
| Property | Value |
|---|---|
| Size | 5.5 KB |
| Purpose | Card preview for a single blog post |
| Key Details | Cover image, title, description, date, click handler |

---

#### [ForgeIndicta.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/ForgeIndicta.tsx)
| Property | Value |
|---|---|
| Size | 7.4 KB |
| Purpose | Forge Indicta brand/YouTube section |
| Key Details | YouTube channel promotion section within the Thoughts page |

---

#### [Newsletter.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/Newsletter.tsx)
| Property | Value |
|---|---|
| Size | 3.7 KB |
| Purpose | Newsletter email subscription form |
| Key Details | Email input → calls `/api/subscribe` → shows success/error states |

---

#### [OtpModal.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/OtpModal.tsx)
| Property | Value |
|---|---|
| Size | 11.1 KB |
| Purpose | OTP verification modal for admin blog operations |
| Key Details | 6-digit code input, sends OTP to admin email via `/api/otp`, verifies via `/api/auth` |

---

#### [ThoughtsList.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/ThoughtsList.tsx)
| Property | Value |
|---|---|
| Size | 3.3 KB |
| Purpose | Grid/list view of blog post cards |

---

#### [ThoughtsReader.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/ThoughtsReader.tsx)
| Property | Value |
|---|---|
| Size | 18.5 KB |
| Purpose | Full blog post reader/viewer |
| Key Details | Renders selected post's markdown content via `react-markdown`, cover image, metadata, navigation between posts |

---

#### [ThoughtsStudio.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/components/thoughts/ThoughtsStudio.tsx)
| Property | Value |
|---|---|
| Size | 21.6 KB |
| Purpose | Admin CMS editor for creating/editing blog posts |
| Key Details | Markdown editor with live preview, cover image upload (base64), title/description fields, OTP-protected save/update/delete |

---

### `src/components/hero/` and `src/components/careerflow/`
| Status | **Empty directories** — reserved for future sub-components |

---

## 5. `src/context/` — React Context

### [ThemeContext.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/context/ThemeContext.tsx)
| Property | Value |
|---|---|
| Size | 2.5 KB · 83 lines |
| Purpose | Dark/light/system theme state management |
| Exports | `ThemeProvider`, `useTheme()`, `Theme` type (`'light' | 'dark' | 'system'`) |
| Key Details | • Initializes from `localStorage` (default: `'system'`) • `applyTheme()`: sets `data-theme` attribute on `<html>`, adds `theme-transition` class for smooth CSS transitions (managed via window-level timeout) • `toggleTheme()`: cycles light→dark→system→light, persists to `localStorage` • System mode: listens to `prefers-color-scheme` changes via `setupThemeListener()` |

---

## 6. `src/hooks/` — Custom Hooks

### [useDevice.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/hooks/useDevice.ts)
| Property | Value |
|---|---|
| Size | 2.4 KB · 76 lines |
| Purpose | Device type detection and input method tracking |
| Exports | `useDevice()` → `DeviceInfo` |
| Returns | `{ isMobile, isTablet, isDesktop, activeInput, showCustomCursor, width, height }` |
| Key Details | • Breakpoints: mobile `<768`, tablet `768–1024`, desktop `≥1024` • Tracks `activeInput`: switches between `'mouse'` and `'touch'` on `mousemove`/`touchstart` events • `showCustomCursor`: true only when mouse is active + fine pointer detected • Listens to `resize`, `touchstart`, `mousemove`, `(pointer: fine)` media query |

---

### [useReducedMotion.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/hooks/useReducedMotion.ts)
| Property | Value |
|---|---|
| Size | 1.1 KB · 34 lines |
| Purpose | Respects OS `prefers-reduced-motion` accessibility preference |
| Exports | `useReducedMotion()` → `boolean` |
| Key Details | Returns `true` if user prefers reduced motion. Listens for changes. Supports both modern (`addEventListener`) and legacy (`addListener`) APIs. |

---

## 7. `src/constants/` — Static Data

### [constants.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/constants/constants.ts)
| Property | Value |
|---|---|
| Size | 14.9 KB · 241 lines |
| Purpose | All static application data |
| Exports | `AVATAR_URL`, `PORTRAIT_URL`, `TIMELINE_DATA`, `PROJECTS_DATA`, `HERO_STATS` |
| Key Details | |

**`TIMELINE_DATA`** (6 items):
| ID | Title | Type | Period |
|---|---|---|---|
| `today` | Data Engineer / AI Engineer | work | Present |
| `ljmu` | M.Sc. Data Science (LJMU) | education | 2025–2026 |
| `cvpl` | Data Analyst (Competence Virtual) | work | Aug 2024–Oct 2025 |
| `iiitb` | Exec PG Data Science (IIIT Bangalore) | education | Jul 2023–Jul 2024 |
| `techm` | Software Engineer (Tech Mahindra) | work | Sep 2021–Mar 2024 |
| `btech` | B.Tech CSE (Jagannath University) | education | 2017–2021 |

**`PROJECTS_DATA`** (7 projects): Patient Alert ETL, SparNord ATM Analytics, Filmytics, Car Price Prediction, NYC Taxi Analytics, MapReduce Explained, Portfolio Website.

**`HERO_STATS`** (4 stats): Experience, Delivery Record, Education, Tech Ecosystem.

---

## 8. `src/types/` — TypeScript Definitions

### [types.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/types/types.ts)
| Property | Value |
|---|---|
| Size | 816 B · 39 lines |
| Purpose | Shared TypeScript interfaces |
| Exports | `TimelineItem`, `Project`, `HeroStat` |
| Key Details | • `TimelineItem`: id, title, subtitle, description, period, type (`work`/`education`/`life`), optional tags, highlights, achievement, logo • `Project`: id, title, description, imageUrl, link, pinned, optional category/architecture/techExplanation/problemSolved • `HeroStat`: label, value (string[]), color, icon |

---

## 9. `src/utils/` — Utility Functions

### [themeUtils.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/utils/themeUtils.ts)
| Property | Value |
|---|---|
| Size | 1.1 KB · 32 lines |
| Purpose | Theme helper functions |
| Exports | `LocationData`, `getSunsetSunrise()`, `getSuggestedTheme()`, `getSystemTheme()`, `setupThemeListener()` |
| Key Details | • `getSystemTheme()`: reads `prefers-color-scheme: dark` media query • `setupThemeListener()`: adds change listener for OS theme preference • `getSuggestedTheme()`: async wrapper (currently delegates to `getSystemTheme()`) • `getSunsetSunrise()`: placeholder — returns same date for both (future: location-based auto theme) |

---

## 10. `src/styles/` — Stylesheets

### [globals.css](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/styles/globals.css)
| Property | Value |
|---|---|
| Size | 24.3 KB · 909 lines |
| Purpose | Global design system — CSS custom properties, animations, utilities |
| Key Details | • Imports TailwindCSS v4 (`@import "tailwindcss"`) + typography plugin • **Dark theme** (`:root`): `--bg-primary: #020202`, `--text-primary: #ffffff`, blue/purple accent colors • **Light theme** (`[data-theme='light']`): `--bg-primary: #fafafa`, `--text-primary: #111827` • **Design tokens**: Fluid spacing, fluid typography scale (`clamp`-based), safe area insets • **Glassmorphism**: `.glass`, `.glass-morphism`, `.glass-premium` classes with backdrop blur • **Theme transition**: Smooth 400ms transitions on bg/color/border when `.theme-transition` is active (disabled on mobile to avoid performance issues) • **Animations**: Shimmer, aurora mesh, ambient field, page vignette, grid background • **Accessibility**: `prefers-reduced-motion: reduce` disables all animations • **Utilities**: `.sr-only`, scrollbar styling, custom cursor ambient glow |

---

## 11. `src/test/` — Shared Test Utilities & Mocks

### [src/test/setup.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/test/setup.ts)
| Property | Value |
|---|---|
| Size | 61 B · 2 lines |
| Purpose | Vitest test environment initialization |
| Key Details | Imports `@testing-library/jest-dom/vitest` for DOM assertions and `./mocks` for browser API mocks. |

---

### [src/test/mocks.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/test/mocks.ts)
| Property | Value |
|---|---|
| Size | 1.1 KB · 49 lines |
| Purpose | Browser API mocks for virtual DOM execution environment |
| Key Details | Mocks `window.matchMedia`, `window.scrollTo`, `window.localStorage` (stubbed spy implementation), `ResizeObserver`, and `IntersectionObserver`. |

---

### [src/test/render.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/test/render.tsx)
| Property | Value |
|---|---|
| Size | 601 B · 25 lines |
| Purpose | Custom React Testing Library render function |
| Exports | Custom `render` wrapper, and all exports from `@testing-library/react` |
| Key Details | Wraps components in `<ThemeProvider>` automatically, reducing boilerplate in unit tests. |

---

### [src/test/fixtures.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/test/fixtures.ts)
| Property | Value |
|---|---|
| Size | 269 B · 13 lines |
| Purpose | Shared test data fixtures |
| Exports | `themes`, `lightTheme`, `darkTheme`, `systemTheme` |

---

## 12. `src/tests/` — Test Suite

### [setup.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/tests/setup.ts)
| Property | Value |
|---|---|
| Size | 36 B · 2 lines |
| Purpose | Legacy Vitest global setup (overridden by standalone vitest.config pointing here) |
| Content | `import '@testing-library/jest-dom';` |

---

### [example.test.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/tests/example.test.ts)
| Property | Value |
|---|---|
| Size | 164 B · 8 lines |
| Purpose | Sanity check test |
| Content | Single test: `expect(true).toBe(true)` |

---

### [ThemeToggle.test.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/tests/ThemeToggle.test.tsx)
| Property | Value |
|---|---|
| Size | 1.6 KB · 80 lines |
| Purpose | Unit tests for the ThemeToggle component |
| Key Details | Refactored to import custom test `render` from `../test/render` to eliminate inline `<ThemeProvider>` wrappers. Verifies button rendering, aria-label attributes, checkbox role, and click handlers. |

---

### [ThemeContext.test.tsx](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/context/ThemeContext.test.tsx)
| Property | Value |
|---|---|
| Size | 7.3 KB · 263 lines |
| Purpose | Unit test suite for theme provider context |
| Key Details | Exhaustive tests verifying default system theme, local storage loading and updates, transition styles timing (utilizing Vitest fake timers), and exception behavior when context hook is consumed outside provider boundary. |

---

### [themeUtils.test.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/utils/themeUtils.test.ts)
| Property | Value |
|---|---|
| Size | 3.7 KB · 175 lines |
| Purpose | Unit test suite for pure theme utility helpers |
| Key Details | Validates sunset/sunrise calculation mock return structure, system dark/light theme checks, listener registration/cleanup callbacks, and suggested theme resolution. |

---

## 13. `src/assets/` — Bundled Static Assets

| File | Size | Description |
|---|---|---|
| [home.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/home.png) | 1.36 MB | Homepage screenshot (⚠️ should be converted to WebP) |
| [G12.webp](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/G12.webp) | 3.5 KB | Avatar/profile graphic |
| [G19.webp](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/G19.webp) | 23.7 KB | Portrait photo |
| [cvpl_logo.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/cvpl_logo.png) | 5.6 KB | Competence Virtual Pvt. Ltd. logo |
| [iiitb_logo.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/iiitb_logo.png) | 9.9 KB | IIIT Bangalore logo |
| [jagannath_logo.jpg](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/jagannath_logo.jpg) | 10.1 KB | Jagannath University logo |
| [ljmu_logo.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/ljmu_logo.png) | 17.6 KB | Liverpool John Moores University logo |
| [techm_logo.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/src/assets/techm_logo.png) | 5.3 KB | Tech Mahindra logo |
| `animations/` | — | **Empty directory** — reserved for Lottie/animation files |

---

## 14. `public/` — Static Public Files

| File | Size | Description |
|---|---|---|
| [Ankit Abhishek.pdf](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/Ankit%20Abhishek.pdf) | 106 KB | Downloadable resume/CV |
| [logo.jpg](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/logo.jpg) | 302 KB | Primary site logo (used for OG image, favicon) |
| [favicon.png](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/favicon.png) | 26.7 KB | PNG favicon |
| [forgeindicta_logo.webp](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/forgeindicta_logo.webp) | 7.8 KB | Forge Indicta YouTube brand logo |
| [robots.txt](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/robots.txt) | 178 B | Allows `/`, `/thoughts`, `/solutions`, `/collaborate`; disallows `/node_modules/`; sitemap reference |
| [sitemap.xml](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/sitemap.xml) | 1.2 KB | 4 URLs: homepage (priority 1.0), thoughts (0.9), solutions (0.8), collaborate (0.6) |
| [site.webmanifest](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/site.webmanifest) | 654 B | PWA manifest: `display: standalone`, dark background (#020202), logo.jpg icon |
| [_redirects](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/public/_redirects) | 256 B | Netlify: `/api/*` → functions, `/*` → `/index.html` (SPA) |

---

## 15. `netlify/functions/` — Serverless API

### [netlify/functions/utils/db.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/utils/db.ts)
| Property | Value |
|---|---|
| Size | 598 B · 26 lines |
| Purpose | MongoDB connection singleton |
| Exports | `connectToDatabase()` → `{ client, db }` |
| Key Details | • Reads `MONGODB_URI` from env vars • Caches `MongoClient` and `Db` across warm function invocations • Database name: `portfolio-blog` |

---

### [netlify/functions/utils/rateLimit.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/utils/rateLimit.ts)
| Property | Value |
|---|---|
| Size | 2.6 KB · 91 lines |
| Purpose | MongoDB-backed API rate limiting |
| Exports | `getClientIp()`, `checkRateLimit()` |
| Key Details | • Extracts client IP from `x-forwarded-for` headers • Tracks rate limits per IP + endpoint in `rate_limits` collection • Returns `{ success, headers, error? }` with `X-RateLimit-*` and `Retry-After` headers • Sliding window reset: resets count when current time > resetTime |

---

### [netlify/functions/utils/validation.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/utils/validation.ts)
| Property | Value |
|---|---|
| Size | 2.8 KB · 81 lines |
| Purpose | Input validation and sanitization |
| Exports | `validateObjectId()`, `validateString()`, `validateEmail()`, `validateOtpStr()`, `validateContent()`, `validateNumber()` |
| Key Details | • `validateObjectId`: 24-char hex string • `validateString`: length check, XSS prevention (rejects `<script>`, `javascript:`, `data:text/html`), optional HTML rejection • `validateEmail`: RFC-ish regex, max 254 chars, lowercased • `validateOtpStr`: exactly 6 digits • `validateContent`: rich text up to 5MB, rejects `<script>`, inline event handlers, `eval(` • `validateNumber`: parses from string/number, optional min/max bounds |

---

### [netlify/functions/utils/emailTemplates.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/utils/emailTemplates.ts)
| Property | Value |
|---|---|
| Size | 14.3 KB · 199 lines |
| Purpose | HTML email templates for all notification types |
| Exports | `getEmailTemplate()`, `getOtpContent()`, `getBlogContent()`, `getCollaborateContent()`, `getMeetingContent()`, `getWelcomeContent()` |
| Key Details | • `getEmailTemplate()`: Outer wrapper with dark-mode branded header ("ANKITABHISHEK"), footer with Portfolio + YouTube links, optional unsubscribe link • `getOtpContent()`: 6-digit code display with 5-min expiry notice • `getBlogContent()`: New post notification with "READ FULL ARTICLE" CTA • `getCollaborateContent()`: Incoming inquiry display with name/email/message/reference ID • `getMeetingContent()`: Meeting confirmation with date/time, coordinator details • `getWelcomeContent()`: Newsletter welcome with "View knowledge_base" CTA |

---

### [netlify/functions/blog.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/blog.ts)
| Property | Value |
|---|---|
| Size | 12.3 KB · 263 lines |
| Purpose | Full CRUD API for blog posts |
| Key Details | |

| Method | Behavior |
|---|---|
| `GET ?id=<ObjectId>` | Returns single post with content |
| `GET` (no id) | Returns all posts (content excluded for performance) sorted by timestamp desc |
| `POST ?otp=<6-digit>` | Creates new post (OTP-protected), notifies all active subscribers via email |
| `PUT ?otp=<6-digit>` | Updates existing post fields (OTP-protected) |
| `DELETE ?id=<ObjectId>&otp=<6-digit>` | Deletes post (OTP-protected) |

Rate limit: 100 GET / 10 write requests per 15 minutes.

---

### [netlify/functions/auth.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/auth.ts)
| Property | Value |
|---|---|
| Size | 2.6 KB · 78 lines |
| Purpose | Admin OTP-based authentication |
| Key Details | • POST only • Validates OTP against `otps` collection for admin email • 5-minute expiry, single-use (deleted after verification) • Rate limit: 5 attempts per 15 minutes • Returns `ADMIN_ACCESS_GRANTED` on success |

---

### [netlify/functions/otp.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/otp.ts)
| Property | Value |
|---|---|
| Size | 4.2 KB · 116 lines |
| Purpose | OTP generation and email delivery |
| Key Details | • POST only, accepts `action` param (CREATE, UPDATE, DELETE, ADMIN_ACCESS) • Generates random 6-digit code, stores in MongoDB `otps` collection • Sends OTP via Google Apps Script email endpoint • Action-specific email subjects • Rate limit: 5 attempts per 10 minutes |

---

### [netlify/functions/collaborate.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/collaborate.ts)
| Property | Value |
|---|---|
| Size | 3.9 KB · 94 lines |
| Purpose | Contact form submission handler |
| Key Details | • POST only • Validates: identifier, email, message, optional meeting date/time • Generates transmission ID • Builds HTML email (collaboration or meeting template) • Sends via Google Apps Script • Rate limit: 5 per day |

---

### [netlify/functions/subscribe.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/subscribe.ts)
| Property | Value |
|---|---|
| Size | 4.0 KB · 109 lines |
| Purpose | Newsletter email subscription |
| Key Details | • POST only • Validates email, checks `subscribers` collection • If new: inserts with `active: true` • If previously unsubscribed: reactivates • If already active: returns `ALREADY_SUBSCRIBED` • Sends welcome email on new/reactivated subscription • Rate limit: 3 per day |

---

### [netlify/functions/unsubscribe.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/functions/unsubscribe.ts)
| Property | Value |
|---|---|
| Size | 2.9 KB · 81 lines |
| Purpose | Newsletter unsubscription |
| Key Details | • POST only with CORS headers • Sets `active: false` and `unsubscribedAt` timestamp • Case-insensitive email matching • Rate limit: 5 per day |

---

## 15. `netlify/edge-functions/` — Edge Functions

### [og-meta.ts](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/netlify/edge-functions/og-meta.ts)
| Property | Value |
|---|---|
| Size | 2.7 KB · 62 lines |
| Purpose | Dynamic Open Graph meta tag injection for social media previews |
| Key Details | • Runs only on `/thoughts?id=<postId>` requests • Bot detection: only activates for Facebook, LinkedIn, Twitter, Slack, WhatsApp, Telegram, Discord crawlers • Fetches post data from blog API, then rewrites `<title>`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:*` tags in the HTML response • Falls through to default for non-bot requests |

---

## 16. `google-apps-script/` — Google Workspace Integration

### [Code.gs](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/google-apps-script/Code.gs)
| Property | Value |
|---|---|
| Size | 10.4 KB · 190 lines |
| Purpose | Google Apps Script web app — email delivery + calendar integration |
| Functions | `doPost(e)`, `doGet(e)`, `logToSheet()` |
| Key Details | • **`doPost(e)`**: Receives JSON payload, sends email via `GmailApp.sendEmail()` with HTML body • **Meeting support**: Creates Google Calendar events with auto-generated Google Meet links via Calendar API • **HTML support**: If `isHtml: true`, uses the message directly as HTML body; otherwise wraps in a premium-themed dark email template • **Logging**: Appends all submissions to a "Contact Submissions" Google Sheet • **`doGet(e)`**: Health check endpoint returning `{ status: "ok" }` • **Setup**: Must enable Google Calendar API v3, deploy as web app with "Anyone" access |

---

## 17. `.github/workflows/` — CI/CD

### [ci.yml](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/.github/workflows/ci.yml)
| Property | Value |
|---|---|
| Size | 2.5 KB · 82 lines |
| Purpose | Continuous Integration pipeline |
| Trigger | Push/PR to `main` |
| Steps | 1. Checkout → 2. Cache npm → 3. `npm ci --legacy-peer-deps` → 4. OWASP Dependency-Check (fail on CVSS ≥ 9) → 5. `npm audit --audit-level=critical` → 6. Lint → 7. Type check → 8. Test → 9. Build → 10. Smoke test (serve `dist/` + `curl http://localhost:5000`) |

---

### [deploy.yml](file:///c:/Users/ANKIT%20ABHISHEK/Downloads/Revision/Devlopments/AnkitAbhishekPortfolioOfficial/.github/workflows/deploy.yml)
| Property | Value |
|---|---|
| Size | 1.1 KB · 45 lines |
| Purpose | Continuous Deployment to Netlify |
| Trigger | Push to `main`, PR opened/synced/reopened |
| Steps | 1. Checkout → 2. Setup Node 20 → 3. `npm ci --legacy-peer-deps` → 4. `npm run build` → 5. Deploy via Netlify CLI (`--prod` on main, draft/preview on PRs) |
| Secrets | `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID` |

---

## 📊 Project Statistics Summary

| Metric | Value |
|---|---|
| Total source files (excl. `node_modules`, `dist`) | **~61 files** |
| Frontend components | **14 React components** |
| Pages | **7 routes** |
| Serverless functions | **6 API endpoints** |
| Utility modules | **4 shared utils** |
| Test configuration files | **4 files under `src/test/`** |
| Test files | **5 tests** |
| CI/CD workflows | **2 pipelines** |
| CSS lines | **909 lines** |
| Largest component | `Collaborate.tsx` (59.8 KB, 1,125 lines) |
| Largest asset | `home.png` (1.36 MB) |
