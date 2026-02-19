# Ankit Abhishek | Personal Portfolio

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

## 🚀 Overview

Welcome to the official source code for **Ankit Abhishek's Portfolio**. This project is a modern, high-performance personal brand platform built with a **serverless architecture** and premium design aesthetics.

It goes beyond a static site, featuring an interactive **Portfolio Bot** assistant, an **OTP-secured CMS** for blog management, and a unique **Collaborate** experience—all wrapped in a glassmorphism-inspired design.

## ✨ Key Features & Recent Updates

- **🎨 Premium UI/UX:** Glassmorphism, fluid Framer Motion animations, and a responsive design powered by **Tailwind CSS 4**.
- **🤖 Portfolio Bot:** A technical and interactive assistant integrated directly into the UI to guide users and improve engagement.
- **📝 "Thoughts" CMS:** A full-stack blog system with markdown support, technical image insertion workflow, and mobile-optimized editor.
- **🔐 Secure Operations:** **OTP (One-Time Password)** verification system for administrative actions, ensuring secure data management.
- **📖 Narrative Timeline:** An interactive journey through professional milestones and education.
- **🤝 "Collaborate" Handshake:** A unique "execute handshake" simulation for professional contact and connection.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS 4, Framer Motion |
| **Build Tool** | Vite 6 |
| **Backend** | Netlify Functions (Node.js Serverless) |
| **Security** | MongoDB-backed OTP Verification |
| **Database** | MongoDB Atlas |
| **Deployment** | Netlify (CI/CD) |

## 📂 Project Structure

```bash
AnkitAbhishekPortfolioOfficial/
├── netlify/functions/  # Serverless backend logic (API, OTP, Blog CRUD)
├── src/
│   ├── components/
│   │   ├── ui/         # PortfolioBot, OptimizedImage, etc.
│   │   └── ...         # Feature-specific components
│   ├── pages/
│   │   ├── Hero.tsx         # Modern landing experience
│   │   ├── Thoughts.tsx     # Blog CMS with Markdown & Images
│   │   ├── Solutions.tsx    # Professional Project Showcase
│   │   └── Collaborate.tsx  # Interactive Contact & Handshake
│   ├── hooks/          # Custom React hooks
│   └── styles/         # Global & Tailwind CSS
├── public/             # Static assets
└── netlify.toml        # Netlify build & dev configuration
```

## ⚙️ Getting Started (Local Development)

Follow these steps to run the complete full-stack application locally.

### 1. Prerequisites
- **Node.js** (v18+)
- **MongoDB Atlas** Cluster (You need a connection string)
- **Netlify CLI** (Global install recommended: `npm i -g netlify-cli`)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial.git
cd AnkitAbhishekPortfolioOfficial

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory linked to your MongoDB cluster and Google Apps Script:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Portfolio
VITE_CONTACT_EMAIL=your-email@example.com
VITE_APPS_SCRIPT_URL=your-google-script-url
```

### 4. Running the App
We use **Netlify Dev** to simulate the production serverless environment locally.

**Option 1: Split Terminal (Recommended for Debugging)**
Run frontend and backend in separate terminals for better log visibility.

*Terminal 1 (Backend):*
```bash
npm run serve:functions
# Runs Netlify Functions on http://localhost:9999
```

*Terminal 2 (Frontend):*
```bash
npm run dev
# Runs Vite Frontend on http://localhost:5173 (proxies API requests to backend)
```

**Option 2: All-in-One**
```bash
npm run dev:functions
# Runs everything at http://localhost:8888
```

## ☁️ Deployment Guide

This project is optimized for **Netlify**.

1.  **Repo Config:** Push your code to GitHub.
2.  **New Site:** In Netlify, "Account" -> "Add new site" -> "Import an existing project".
3.  **Build Settings:**
    -   **Build Command:** `npm run build`
    -   **Publish Directory:** `dist`
    -   **Functions Directory:** `netlify/functions` (Auto-detected)
4.  **Environment Variables:**
    -   Go to **Site Settings > Environment Variables**.
    -   Add `MONGODB_URI`, `VITE_CONTACT_EMAIL`, `VITE_APPS_SCRIPT_URL`, etc.
5.  **Deploy:** Click "Deploy Site".

### 🚑 Troubleshooting
-   **MongoDB Error?** Ensure your MongoDB Atlas **Network Access** whitelist allows access from anywhere (`0.0.0.0/0`) as Netlify IPs change.
-   **White Screen?** Check the browser console for errors. Ensure your environment variables are set correctly in Netlify.

## 📬 Connect with Me

- **LinkedIn:** [Ankit Abhishek](https://www.linkedin.com/in/ankitabhishekdataengineering/)
- **Email:** [ankitabhishek1005@gmail.com](mailto:ankitabhishek1005@gmail.com)
- **GitHub:** [@ANKIT21111](https://github.com/ANKIT21111)
- **Instagram:** [@humankitabhishek](https://www.instagram.com/humankitabhishek/)

---
<div align="center">
  <small>Designed & Built by Ankit Abhishek</small>
</div>
