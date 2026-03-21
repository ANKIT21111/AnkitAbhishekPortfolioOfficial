# Ankit Abhishek | Full-Stack Data & Software Engineer

<div align="center">
  <img width="1000" src="src/assets/home.png" alt="Portfolio Preview" />
  <br/>
  <br/>
  
  [![React 19](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite 6](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

## 🚀 Professional Overview

This repository hosts the official source code for **Ankit Abhishek's Portfolio**—a high-performance, enterprise-grade personal brand platform. Built with a **Serverless-first architecture** and premium design aesthetics, this project demonstrates advanced engineering patterns in **Full-Stack Development, Security, and AI Integration**.

More than just a static showcase, this platform implements complex features usually found in production-level SaaS products, including an **AI-driven Project Architect**, a **Custom Markdown CMS**, and a **Secure Admin Gateway**.

## 🛡️ Core Engineering Achievements

### 1. Advanced Security & Abuse Protection
- **Hybrid Auth Flow**: Implemented a secure OTP (One-Time Password) verification system integrated with **JWT (JSON Web Token)** based session management for administrative actions.
- **AI Abuse Protection**: Built custom rate-limiting middleware to protect critical endpoints (login, AI generation, account creation) from automated bot attacks and scrapers.
- **Input Sanitization**: Developed a rigorous validation layer for all user-facing inputs to prevent SQL Injection (SQLi) and Cross-Site Scripting (XSS) attacks.

### 2. High-Performance CMS & Content Delivery
- **"Thoughts" Markdown Engine**: A custom-built blog platform with deep-linking, automated Table of Contents (ToC) generation, and optimized image handling.
- **Subscription Ecosystem**: Robust email notification system using **Google Apps Script** as a microservice, featuring secure one-click unsubscription and premium HTML templating.

### 3. Progressive Web Experience
- **PWA Integration**: Fully offline-capable and installable via Progressive Web App standards.
- **Micro-Animations & Glassmorphism**: Leverages **Framer Motion 12** for fluid, high-frame-rate interactions across all device form factors.
- **SEO Optimization**: Dynamically managed meta tags and keywords for superior search engine discoverability.

### 4. AI-Native Architecture
- **AI Project Architect**: Interactive project explainer that uses LLM reasoning to break down technical architectures and implementation logic.
- **Portfolio Roast Engine**: A playful engagement tool that demonstrates creative AI integration and persona-based response generation.

## 🛠️ Technical Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19 (Hooks, Context), TypeScript 5.7, Tailwind CSS 4, Framer Motion 12, React Router 7 |
| **Backend** | Node.js (Serverless), Netlify Functions, Custom Middleware (Rate Limiting, JWT Auth) |
| **Security** | MongoDB-backed OTP, JWT Session Management, Input Sanitization (Zod/Sanitize), BCrypt/Argon2 |
| **Data Layer** | MongoDB Atlas (Vector Search ready), Google Apps Script (Email Microservice Interface) |
| **Tooling** | Vite 6, PostCSS 8, Netlify CLI (Local Environment Emulation), ESLint |

## 📂 Architecture & Project Structure

```bash
 AnkitAbhishekPortfolioOfficial/
├── netlify/functions/  # Serverless backend logic (API, OTP, JWT Auth, Blog CRUD, Subscriptions)
├── src/
│   ├── components/
│   │   ├── ui/         # PortfolioBot, OptimizedImage, Glassmorphic components
│   │   └── layout/     # Fluid Navigation, Footer, CMS Wrapper
│   ├── pages/
│   │   ├── Hero.tsx         # Modern landing engine
│   │   ├── Thoughts.tsx     # Blog CMS with Markdown & Dynamic Pagination
│   │   ├── Solutions.tsx    # Professional Project Showcase with AI Explain
│   │   └── Collaborate.tsx  # Interactive Contact & AI Roast Engine
│   ├── hooks/          # Domain-specific custom hooks (Auth, CMS, AI)
│   ├── constants/      # Technical milestones & Project metadata
│   └── styles/         # Utility-first design tokens (Global & Tailwind)
├── public/             # Static assets (Resume, SEO Icons, PWA Manifest)
└── netlify.toml        # Production build & Serverless routing configuration
```

## ⚙️ Getting Started (Local Development)

This project uses **Netlify Dev** to emulate a production serverless environment locally.

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB Atlas** Account
- **Netlify CLI** (`npm i -g netlify-cli`)

### 2. Installation & Setup
```bash
git clone https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial.git
cd AnkitAbhishekPortfolioOfficial
npm install
```

### 3. Configuration
Create a `.env` file in the root:
```env
MONGODB_URI=your-mongodb-connection-string
VITE_CONTACT_EMAIL=your-professional-email@example.com
VITE_APPS_SCRIPT_URL=your-microservice-url
JWT_SECRET=your-secure-secret-key
```

### 4. Launching the Platform
```bash
# Recommended: One command to rule them all
npm run dev:functions
# Runs frontend + local serverless backend at http://localhost:8888
```

## 🚀 Deployment

The platform is optimized for **Global Edge Delivery** via Netlify.
- **CI/CD**: Automated deployments on every push to `main`.
- **Serverless**: Netlify Functions handle all dynamic compute without the overhead of a dedicated server.
- **Analytics**: Integrated visitor tracking and performance monitoring.

## 📬 Connect with Me

- **LinkedIn:** [Ankit Abhishek](https://www.linkedin.com/in/ankitabhishekdataengineering/)
- **Portfolio:** [Live Site](https://ankitabhishek.com) *(Optional)*
- **GitHub:** [@ANKIT21111](https://github.com/ANKIT21111)
- **Email:** [ankitabhishek1005@gmail.com](mailto:ankitabhishek1005@gmail.com)
- **Instagram:** [@humankitabhishek](https://www.instagram.com/humankitabhishek/)

---
<div align="center">
  <small>Architecture & Engineering by <b>Ankit Abhishek</b> &copy; 2026</small>
</div>
