# Ankit Abhishek | Personal Portfolio

<div align="center">
  <img width="1000" src="src/assets/home.png" alt="Portfolio Preview" />
  <br/>
  <br/>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white)](https://vitejs.dev/)
  [![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

## 🚀 Overview

Welcome to the official source code for **Ankit Abhishek's Portfolio**. This project represents a modern, high-performance personal brand platform built with a **serverless architecture**.

It goes beyond a static site, featuring a **fully functional CMS** for blog management, a secure handshake simulation for contact, and a narrative-driven experience—all wrapped in a premium, glassmorphism-inspired design.

## ✨ Key Features

- **🎨 Premium UI/UX:** Glassmorphism, fluid Framer Motion animations, and a responsive design that feels alive.
- **📝 Full-Stack Blog System:** Custom-built CMS using React, Netlify Functions, and MongoDB. Supports CRUD operations.
- **🔐 Secure Architecture:** Serverless backend ensures database credentials remain secure.
- **📖 Narrative Timeline:** An interactive journey through my professional career and education.
- **🤝 Interactive Contact:** "Handshake" simulation providing a unique user engagement experience.

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | React 19, TypeScript, Tailwind CSS, Framer Motion |
| **Build Tool** | Vite |
| **Backend** | Netlify Functions (Node.js Serverless) |
| **Database** | MongoDB Atlas |
| **Deployment** | Netlify (CI/CD) |

## 📂 Project Structure

```bash
AnkitAbhishekPortfolioOfficial/
├── netlify/functions/  # Serverless backend logic (API)
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route views (Home, Blog, Contact, etc.)
│   ├── hooks/          # Custom React hooks
│   └── styles/         # Tailwind & Global CSS
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
Create a `.env` file in the root directory linked to your MongoDB cluster:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/?appName=Portfolio
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
4.  **Environment Variables (CRITICAL):**
    -   Go to **Site Settings > Environment Variables**.
    -   Add `MONGODB_URI`, `VITE_CONTACT_EMAIL`, `VITE_APPS_SCRIPT_URL` etc.
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
