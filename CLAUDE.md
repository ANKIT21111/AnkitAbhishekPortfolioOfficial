# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

- **Install dependencies**: `npm install`
- **Start development server** (Vite): `npm run dev`
- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run Netlify Functions locally**: `npm run dev:functions`
- **Serve Netlify Functions without Netlify CLI** (for debugging): `npm run serve:functions`
- **Run a single test**: *No test suite configured* (add a test runner if needed).

## High‑Level Architecture

- **Framework**: React 19 with TypeScript, bundled by Vite.
- **Styling**: Tailwind CSS (configured via `tailwindcss` and `@tailwindcss/vite`).
- **Routing**: `react-router-dom` with lazy‑loaded page components (`src/pages/*`).
- **State & Context**: `ThemeContext` provides a light/dark theme toggle and auto‑detects the preferred theme based on IP‑derived sunrise/sunset times (`src/utils/themeUtils.ts`).
- **UI Components**: Shared UI under `src/components/*` (e.g., Navbar, Footer, ThemeToggle, PortfolioBot, CookieConsent).
- **Animations**: `framer‑motion` for cursor effects and page transitions.
- **Build Optimisation**: Vite splits vendor bundles (`vendor-react`, `vendor-framer`, `vendor-icons`) and compresses assets with gzip and brotli via `vite-plugin-compression`.
- **Backend**: Netlify Functions located in `netlify/functions/*`. The Vite dev server proxies `/api/*` to the local Netlify Functions (`http://localhost:9999/.netlify/functions`). Functions include:
  - `otp.ts`: Generates a 6‑digit OTP, stores it in MongoDB, and sends an email via a Google Apps Script.
  - `blog.ts`: Handles CRUD operations for Thoughts.
  - `subscribe.ts` / `unsubscribe.ts`: Manages blog subscription ecosystem.
  - `auth.ts` / `collaborate.ts`: Handles external communication interactions.
  - Helper functions for the database (`utils/db.ts`).
- **Environment Variables** (prefixed with `VITE_` for client exposure, used in functions):
  - `VITE_CONTACT_EMAIL`
  - `VITE_APPS_SCRIPT_URL`
- **Entry Point**: `src/index.tsx` mounts `<App />` inside `<ThemeProvider>`.
- **App Structure**: `src/App.tsx` sets up global mouse cursor effects, mobile detection, and renders the router with lazy‑loaded routes.

## Project Layout (high level)

```
├─ src/
│  ├─ components/      # UI components (layout, ui)
│  ├─ context/        # React context (Theme)
│  ├─ pages/          # Route components (Hero, Thoughts, Solutions, etc.)
│  ├─ utils/          # Helper functions (themeUtils)
│  ├─ styles/         # Tailwind globals
│  └─ index.tsx, App.tsx
├─ netlify/functions/ # Serverless functions (OTP, blog, auth, subscriptions, DB utils)
├─ vite.config.ts    # Vite configuration, plugins, proxy
├─ tailwind.config.ts (if present)
└─ package.json      # Scripts, dependencies
```

Use the above commands and architecture overview to efficiently develop, debug, and extend this portfolio project.

## Agent Description

The **Ultrathink** agent is responsible for managing and enhancing the portfolio website. Its duties include:
- Maintaining the React/TypeScript codebase and ensuring build integrity with Vite.
- Managing theme toggling via `ThemeContext` and sunrise/sunset calculations.
- Handling Netlify Functions for OTP generation, blog content, subscriptions, and database interactions.
- Deploying the site via Netlify, ensuring environment variables (`VITE_CONTACT_EMAIL`, `VITE_APPS_SCRIPT_URL`) are correctly configured.
- Optimising performance with code‑splitting, gzip/brotli compression, and framer‑motion animations.
- Providing clear development commands (install, dev, build, preview) and troubleshooting guidance.

This description helps Claude Code understand the high‑level responsibilities when assisting with this portfolio project.
