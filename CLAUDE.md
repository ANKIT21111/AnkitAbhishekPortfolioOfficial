# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and Antigravity IDE agents when working with code in this repository.

---

## Common Development Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start the Vite dev server at `http://localhost:3000` |
| `npm run dev:functions` | Start frontend + Netlify Functions together via `netlify dev` at `http://localhost:8888` (recommended) |
| `npm run serve:functions` | Serve Netlify Functions only at `http://localhost:9999` (for debugging) |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint on `src/` |
| `npm run type-check` | Run TypeScript type-checking without emitting files |
| `npm run test` | Run all Vitest tests once |

> **Note:** Always prefer `npm run dev:functions` when working with backend logic (OTP, blog, subscribe, auth) so the Vite proxy correctly forwards `/api/*` requests to the local Netlify CLI environment.

---

## High-Level Architecture

### Frontend

- **Framework:** React 19 with TypeScript 5.8, bundled by Vite 6.
- **Styling:** Tailwind CSS v4 configured via `@tailwindcss/vite` plugin. Global styles and design tokens live in `src/styles/globals.css`.
- **Routing:** `react-router-dom` v7 with fully lazy-loaded page components (`src/pages/*`) wrapped in `AnimatePresence` page transitions.
- **State & Context:**
  - `ThemeContext` (`src/context/ThemeContext.tsx`) provides `light | dark | system` theme toggling.
  - Theme cycles: light → dark → system → light, persisted to `localStorage`.
  - `getSystemTheme()` / `setupThemeListener()` in `src/utils/themeUtils.ts` mirror the OS `prefers-color-scheme` media query.
- **Custom Cursor System:** `App.tsx` implements a multi-layer spring-animated cursor (outer ring, inner dot, hover glow, ambient glow) using Framer Motion springs — only shown on desktop with fine pointer input via `useDevice()`.
- **Content Protection:** Right-click, keyboard shortcuts (Ctrl+C, Ctrl+U, F12, DevTools), and image drag are blocked globally in `App.tsx`.
- **Scroll Progress Bar:** A fixed gradient bar tied to `useScroll()` from Framer Motion.
- **Page Loader:** CSS-animation-based spinner (no Framer Motion dependency) shown during lazy-load Suspense fallback.

### Pages (all lazy-loaded)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/Hero.tsx` | Landing page with animated hero section, timeline, and stats |
| `/thoughts` | `src/pages/Thoughts.tsx` | Markdown CMS blog with pagination, ToC, and deep-linking |
| `/solutions` | `src/pages/Solutions.tsx` | Project showcase with AI-powered architecture explainer |
| `/collaborate` | `src/pages/Collaborate.tsx` | Interactive contact form + AI roast/feedback engine |
| `/privacy` | `src/pages/PrivacyPolicy.tsx` | GDPR/CCPA Privacy Policy page |
| `/terms` | `src/pages/TermsOfService.tsx` | Terms of Service page |
| `/unsubscribe` | `src/pages/Unsubscribe.tsx` | One-click unsubscribe from blog notifications |

### Components

```
src/components/
├── layout/
│   ├── Navbar.tsx          # Responsive sticky navbar with mobile menu
│   └── Footer.tsx          # Footer with links and social profiles
├── ui/
│   ├── PortfolioBot.tsx    # AI-powered portfolio chatbot (knowledge-base driven, 500+ lines)
│   ├── CookieConsent.tsx   # GDPR/CCPA cookie consent toast (localStorage-backed)
│   ├── OptimizedImage.tsx  # Lazy-loading image with shimmer placeholder + blur-in reveal
│   └── ThemeToggle.tsx     # Three-state theme toggle button (light/dark/system)
├── SkipLink.tsx             # Accessibility skip-to-content link
├── hero/                    # (reserved, currently empty)
├── thoughts/                # (reserved, currently empty)
└── careerflow/              # (reserved, currently empty)
```

### Hooks

| Hook | File | Purpose |
|------|------|---------|
| `useDevice` | `src/hooks/useDevice.ts` | Tracks viewport dimensions, input type (mouse/touch), pointer capability, and derives `showCustomCursor` |
| `useReducedMotion` | `src/hooks/useReducedMotion.ts` | Reads `prefers-reduced-motion` media query |

### Data Layer — Constants & Types

- **`src/constants/constants.ts`:** All static content — `TIMELINE_DATA` (career/education history), `PROJECTS_DATA` (portfolio projects with architecture metadata), `HERO_STATS`.
- **`src/types/types.ts`:** Shared TypeScript interfaces — `TimelineItem`, `Project`, `HeroStat`.

### Backend — Netlify Functions (`netlify/functions/`)

All functions are TypeScript Netlify serverless handlers using `@netlify/functions`.

| Function | Route | Description |
|----------|-------|-------------|
| `otp.ts` | `/api/otp` | Generates a 6-digit OTP, stores in MongoDB `otps` collection (TTL 5 min), sends via Google Apps Script email microservice |
| `blog.ts` | `/api/blog` | Full CRUD for Thoughts posts (`GET`/`POST`/`PUT`/`DELETE`). Admin actions are OTP-protected. Rate-limited (100 GET / 10 write per 15 min) |
| `subscribe.ts` | `/api/subscribe` | Adds subscriber email to MongoDB `subscribers` collection; triggers welcome email |
| `unsubscribe.ts` | `/api/unsubscribe` | Removes subscriber from collection via signed token |
| `auth.ts` | `/api/auth` | Handles JWT-based admin session management |
| `collaborate.ts` | `/api/collaborate` | Processes collaboration/contact form submissions, sends notification email |

**Function Utilities (`netlify/functions/utils/`):**

| File | Purpose |
|------|---------|
| `db.ts` | MongoDB Atlas connection helper with connection pooling |
| `emailTemplates.ts` | Rich HTML email templates for OTP, subscription, blog notifications |
| `rateLimit.ts` | IP-based rate limiting stored in MongoDB `rateLimits` collection |
| `validation.ts` | Input sanitization and validation utilities (ObjectId, OTP strings, content) |

### Edge Functions (`netlify/edge-functions/`)

| Function | Trigger | Description |
|----------|---------|-------------|
| `og-meta.ts` | `/thoughts?id=*` | Intercepts social media bot requests to inject dynamic Open Graph + Twitter Card meta tags per blog post |

### Google Apps Script (`google-apps-script/Code.gs`)

Acts as an email microservice. The Netlify Functions call the deployed Apps Script URL to send emails (OTP, subscription confirmations, blog notifications) via Gmail. URL is configured via `APPS_SCRIPT_URL` env variable.

---

## Project Layout

```
AnkitAbhishekPortfolioOfficial/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI: lint, type-check, OWASP dep-check, audit, test, build, smoke-test
│       └── deploy.yml          # CD: build + deploy to Netlify (prod on main, preview on PRs)
├── google-apps-script/
│   └── Code.gs                 # Gmail-based email microservice
├── netlify/
│   ├── edge-functions/
│   │   └── og-meta.ts          # Dynamic OG meta tags for social crawlers
│   └── functions/
│       ├── utils/
│       │   ├── db.ts
│       │   ├── emailTemplates.ts
│       │   ├── rateLimit.ts
│       │   └── validation.ts
│       ├── auth.ts
│       ├── blog.ts
│       ├── collaborate.ts
│       ├── otp.ts
│       ├── subscribe.ts
│       └── unsubscribe.ts
├── public/                     # Static assets (PWA manifest, favicon, resume, icons)
├── src/
│   ├── assets/                 # Images, logos (webp, png, jpg)
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── ui/                 # PortfolioBot, CookieConsent, OptimizedImage, ThemeToggle
│   │   └── SkipLink.tsx
│   ├── constants/
│   │   └── constants.ts        # All static data (timeline, projects, stats)
│   ├── context/
│   │   └── ThemeContext.tsx    # light/dark/system theme provider
│   ├── hooks/
│   │   ├── useDevice.ts        # Viewport, input-type, cursor detection
│   │   └── useReducedMotion.ts # OS reduced-motion preference
│   ├── pages/
│   │   ├── Hero.tsx
│   │   ├── Thoughts.tsx
│   │   ├── Solutions.tsx
│   │   ├── Collaborate.tsx
│   │   ├── PrivacyPolicy.tsx
│   │   ├── TermsOfService.tsx
│   │   └── Unsubscribe.tsx
│   ├── styles/
│   │   └── globals.css         # Tailwind v4 config + design tokens + animations
│   ├── tests/
│   │   ├── example.test.ts
│   │   └── setup.ts
│   ├── types/
│   │   └── types.ts            # TimelineItem, Project, HeroStat interfaces
│   ├── utils/
│   │   └── themeUtils.ts       # getSystemTheme, setupThemeListener, getSunsetSunrise
│   ├── App.tsx                 # Router, cursor system, scroll progress, content protection
│   ├── index.tsx               # App entry — mounts <ThemeProvider><App />
│   └── vite-env.d.ts
├── .env                        # Local secrets (never commit real values)
├── .gitignore
├── eslint.config.js
├── index.html                  # SPA shell + SEO meta tags + PWA manifest link
├── netlify.toml                # Build config, redirects, edge function bindings
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite plugins, proxy, manual chunks, gzip/brotli
└── vitest.config.ts            # Vitest + jsdom test environment
```

---

## Environment Variables

Create a `.env` file in the root. Variables prefixed with `VITE_` are exposed to the frontend bundle.

| Variable | Used By | Description |
|----------|---------|-------------|
| `MONGODB_URI` | Functions | MongoDB Atlas connection string |
| `VITE_CONTACT_EMAIL` | Functions + Client | Admin/contact email address |
| `CONTACT_EMAIL` | Functions | Server-side alias for the contact email |
| `APPS_SCRIPT_URL` | Functions | Google Apps Script deployment URL (email microservice) |
| `JWT_SECRET` | `auth.ts` | Secret key for JWT session signing |

> **Vite Proxy:** In dev mode, `/api/*` is proxied from port 3000 to `http://localhost:9999/.netlify/functions`. Use `npm run dev:functions` to start both simultaneously.

---

## Build & Performance

- **Minification:** esbuild with `drop_console` and `drop_debugger` in production.
- **Code Splitting:** Manual chunks — `vendor-react` (React, ReactDOM, React Router), `vendor-framer` (Framer Motion), `vendor-icons` (Lucide React).
- **Compression:** Both gzip (`.gz`) and Brotli (`.br`) via `vite-plugin-compression`. Original files retained.
- **CSS:** Tailwind v4 with `cssCodeSplit: true`. Token-based design system defined in `globals.css`.
- **Path Alias:** `@` maps to `./src` for clean imports.
- **Target:** `es2020` for broad browser compatibility.

---

## CI/CD Pipeline

### CI (`ci.yml`) — runs on push/PR to `main`
1. Install deps (`npm ci --legacy-peer-deps`)
2. OWASP Dependency-Check (JSON report uploaded as artifact)
3. Fail if any CVSS ≥ 9 vulnerability is found
4. `npm audit --audit-level=critical`
5. ESLint (`npm run lint`)
6. TypeScript type check (`npm run type-check`)
7. Vitest tests (`npm test`)
8. Production build (`npm run build`)
9. Smoke test — serve `dist/` and `curl` localhost

### Deploy (`deploy.yml`) — runs on push/PR to `main`
- Builds and deploys via Netlify CLI.
- Push to `main` → `--prod` deploy.
- PR → preview/draft deploy.
- Requires `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` GitHub Secrets.

---

## Key Design Patterns

1. **Lazy Loading:** All pages are loaded via `React.lazy()` + `Suspense` with a CSS-animated fallback loader (no Framer Motion overhead on initial load).
2. **Reduced Motion Awareness:** All animations check `prefersReducedMotion` and degrade gracefully. The custom cursor throttle interval doubles from 16ms → 50ms under reduced motion.
3. **OTP-Gated Admin Actions:** Blog mutations (POST/PUT/DELETE) require a valid OTP token retrieved from the `otps` MongoDB collection (5-minute TTL, single-use).
4. **Rate Limiting:** IP-based rate limits stored in MongoDB. GET endpoints: 100 req/15 min. Write endpoints: 10 req/15 min.
5. **Content Protection:** Context menu, select-all, copy, view-source, F12/DevTools shortcuts, and image dragging are disabled at the document level.
6. **Theme System:** Three-state cycle (light → dark → system). `data-theme` attribute on `<html>` drives all CSS custom property values defined in `globals.css`.

---

## Agent Description

The **Antigravity** / **Claude Code** agent is responsible for maintaining and enhancing this portfolio platform. Core responsibilities:

- Maintaining the React 19 + TypeScript + Vite codebase and ensuring build integrity.
- Managing Tailwind v4 design tokens and animation systems in `globals.css`.
- Handling Netlify Functions for OTP, blog CRUD, subscriptions, and JWT auth.
- Updating static content (timeline, projects, stats) in `src/constants/constants.ts`.
- Deploying via Netlify CI/CD and ensuring GitHub Secrets are correctly configured.
- Optimizing performance via code-splitting, compression, and Framer Motion best practices.
- Ensuring accessibility (skip links, reduced motion support, semantic HTML).
- Keeping CLAUDE.md and README.md in sync with actual codebase changes.
