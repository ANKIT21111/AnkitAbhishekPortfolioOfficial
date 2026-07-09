# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Install dependencies**: `npm install`
- **Start development server** (Vite): `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run Netlify Functions locally**: `npm run dev:functions`
- **Serve Netlify Functions without Netlify CLI** (for debugging): `npm run serve:functions`
- **Run tests**: `npm run test` (uses Vitest).

## High‑Level Architecture

- **Framework**: React 19 with TypeScript, bundled by Vite.
- **Styling**: Tailwind CSS (configured via `tailwindcss` and `@tailwindcss/vite`).
- **Routing**: `react-router-dom` with lazy‑loaded page components (`src/pages/*`).
- **State & Context**: `ThemeContext` provides a light/dark theme toggle and auto‑detects the preferred theme based on IP‑derived sunrise/sunset times (`src/utils/themeUtils.ts`).
- **UI Components**: `src/components` holds reusable UI elements organized by domain (`layout`, `ui`, `thoughts`, `careerflow`, `hero`).
- **Context & Hooks**: `src/context` contains React context providers (currently Theme). `src/hooks` holds custom hooks such as `useDevice`, `useReducedMotion`, and others.
- **Pages**: `src/pages` hosts route components (Hero, Thoughts, Solutions, etc.) that are lazily imported.
- **Helpers & Types**: `src/utils` (theme utilities), `src/types` (shared TypeScript types), and `src/constants` (app‑wide constants).
- **Global Styling**: `src/styles` stores Tailwind global styles.
- **Entry Point**: `src/index.tsx` mounts `<App />` within `<ThemeProvider>`.
- **App Structure**: `src/App.tsx` configures global mouse cursor effects, mobile detection, and renders the router with lazy‑loaded routes.
- **Animations**: `framer‑motion` provides cursor effects and page transitions.
- **Build Optimisation**: Vite splits vendor bundles (`vendor-react`, `vendor-framer`, `vendor-icons`) and compresses assets with gzip and brotli via `vite-plugin-compression`.
- **Backend**: Netlify Functions located in `netlify/functions/*`. The Vite dev server proxies `/api/*` to the local Netlify Functions (`http://localhost:9999/.netlify/functions`). Functions include:
  - `otp.ts`: Generates a 6‑digit OTP, stores it in MongoDB, and sends an email via a Google Apps Script.
  - `blog.ts`: Handles CRUD operations for Thoughts.
  - `subscribe.ts` / `unsubscribe.ts`: Manages blog subscription ecosystem.
  - `auth.ts` / `collaborate.ts`: Handles external communication interactions.
  - Helper utilities: database helpers (`utils/db.ts`), email templates (`utils/emailTemplates.ts`), validation (`utils/validation.ts`), rate limiting (`utils/rateLimit.ts`).
- **Environment Variables** (prefixed with `VITE_` for client exposure, used in functions):
  - `VITE_CONTACT_EMAIL`
  - `VITE_APPS_SCRIPT_URL`
- **Vite Configuration**: `vite.config.ts` includes plugins (`@vitejs/plugin-react`, `@tailwindcss/vite`) and proxy settings for `/api/*`.
- **Tailwind Configuration**: Tailwind v4 is configured via CSS in `src/styles/globals.css`.
- **Project Scripts**: See `package.json` for available npm scripts.

## Project Layout (high level)

```text
├─ src/
│  ├─ context/        # React context providers (e.g., ThemeContext)
│  ├─ components/     # Reusable UI components organized by domain
│  ├─ hooks/          # Custom hooks (useDevice, useReducedMotion, etc.)
│  ├─ pages/          # Route components (Hero, Thoughts, Solutions, etc.)
│  ├─ styles/         # Tailwind globals and overrides
│  ├─ tests/          # Vitest test files and configurations
│  ├─ types/          # Shared TypeScript types
│  ├─ utils/          # Helper functions (themeUtils, constants, etc.)
│  ├─ index.tsx       # App entry point
│  └─ App.tsx          # Router configuration and global effects
├─ netlify/functions/   # Serverless functions (OTP, blog, auth, etc.)
├─ netlify/functions/utils/  # Function‑side utilities
├─ vite.config.ts          # Vite configuration and plugins
├─ vitest.config.ts        # Vitest configuration for unit testing
└─ package.json            # Scripts and dependencies
```

## Agent Description

The **Ultrathink** agent is responsible for managing and enhancing the portfolio website. Its duties include:
- Maintaining the React/TypeScript codebase and ensuring build integrity with Vite.
- Managing theme toggling via `ThemeContext` and sunrise/sunset calculations.
- Handling Netlify Functions for OTP generation, blog content, subscriptions, and database interactions.
- Deploying the site via Netlify, ensuring environment variables (`VITE_CONTACT_EMAIL`, `VITE_APPS_SCRIPT_URL`) are correctly configured.
- Optimising performance with code‑splitting, gzip/brotli compression, and framer‑motion animations.
- Providing clear development commands (install, dev, build, preview) and troubleshooting guidance.

This description helps Claude Code understand the high‑level responsibilities when assisting with this portfolio project.
