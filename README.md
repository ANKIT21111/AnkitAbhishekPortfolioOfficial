# Ankit Abhishek | Personal Portfolio

<div align="center">
<img width="1200" height="auto" alt="Portfolio Home" src="./components/pics/home.png" />
</div>

## 🚀 Overview
Welcome to my official portfolio! I am **Ankit Abhishek**, a passionate **Data Engineer** and **Software Engineer** specializing in building scalable data pipelines, cloud-native platforms, and high-performance web applications.

This repository contains the source code for my personal portfolio website, designed with a premium, modern aesthetic and fluid animations to showcase my professional journey, technical projects, and thoughts on data engineering.

## 🛠️ Tech Stack
This project is built using modern web technologies:
- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Backend:** [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **Database:** File-based JSON storage
- **Email Service:** [Nodemailer](https://nodemailer.com/) (for OTP verification)

## ✨ Key Features
- **Narrative Timeline:** A chronological walkthrough of my education and career, from school years to my current Master's in Data Science.
- **Project Showcase:** A curated list of technical projects with descriptions and visual previews.
- **Blog Section:** Insights and deep dives into Data Engineering topics like Scalable Data Lakes and Spark optimization.
- **Premium UI/UX:** Features glassmorphism, animated background glows, and responsive layouts for a top-tier user experience.
- **Real-time Status:** Dynamic local time tracking and availability status.

## 📂 Project Structure
```bash
AnkitAbhishekPortfolioOfficial/
├── components/         # Reusable UI components (Navbar, Footer, Section headers)
├── pages/              # Main page views (Home, Blogs, Projects, Contact)
├── server/             # Express backend server (API & data storage)
│   ├── index.cjs       # Main server entry and API routes
│   └── blogs.json      # JSON storage for blog posts
├── public/             # Static assets (PDFs, global images)
├── constants.ts        # Centralized data store (UI text, timeline, projects)
├── types.ts            # TypeScript interfaces and type definitions
├── App.tsx             # Main application entry and routing
└── index.tsx           # React DOM rendering
```

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AnkitAbhishekPortfolioOfficial
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally

This project requires both the frontend and backend to be running.

#### 1. Start the Backend Server
```bash
node server/index.cjs
```
The server will start on [http://localhost:5000](http://localhost:5000).

#### 2. Start the Frontend
In a new terminal window:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 🔑 Environment Variables
Create a `.env` file in the root directory for the backend to handle email notifications:
```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```
*(Note: For Gmail, you need to use an "App Password" if 2FA is enabled.)*

### Deployment
This project is configured for deployment on **Cloudflare Pages**. To deploy:
1. Build the project: `npm run build`
2. Deploy the `dist` folder using the Cloudflare Wrangler CLI or via GitHub integration.

## 📬 Connect with Me
- **LinkedIn:** [Ankit Abhishek](https://www.linkedin.com/in/ankitabhishekdataengineering/)
- **GitHub:** [@ANKIT21111](https://github.com/ANKIT21111)
- **Instagram:** [@humankitabhishek](https://www.instagram.com/humankitabhishek/)

---
<p align="center">Made with ❤️ by Ankit Abhishek</p>
