# Deploying to Netlify

Your blog management system is fully integrated with MongoDB and ready for production deployment on Netlify.

## 1. Prerequisites
- A GitHub repository connected to your project.
- A MongoDB Atlas account with a database named `portfolio-blog`.
- A Netlify account.

## 2. Configuration Check
Your project is ALREADY configured for Netlify:
- **`netlify.toml`**: Configures the build command (`npm run build`), publish directory (`dist`), and functions directory (`netlify/functions`).
- **`src/pages/Blog.tsx`**: Uses `/api/blog` which Netlify automatically redirects to your serverless functions.
- **`netlify/functions/`**: Contains your backend logic.

## 3. Deployment Steps

### Step 1: Push to GitHub
Commit and push your changes to your GitHub repository.
```bash
git add .
git commit -m "Integrated MongoDB for blog management"
git push origin main
```

### Step 2: Create Site on Netlify
1. Log in to Netlify.
2. Click "Add new site" > "Import an existing project".
3. Select GitHub and choose your repository.

### Step 3: Set Environment Variables (CRITICAL)
In the Netlify dashboard for your site, go to **Site settings > Environment variables** and add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your full MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster...`) |
| `VITE_CONTACT_EMAIL` | Your contact email (if used elsewhere) |
| `VITE_APPS_SCRIPT_URL`| Your Google Apps Script URL (if used elsewhere) |

### Step 4: Deploy
Click **Deploy site**. Netlify will:
1. install dependencies.
2. Build your React app.
3. Bundle your serverless functions.

## 4. Troubleshooting
- **Logs**: If the blog isn't loading, check the **Function Logs** in the Netlify dashboard under the "Functions" tab.
- **Database Connection**: Ensure your MongoDB Atlas Network Access allows connections from anywhere (`0.0.0.0/0`) since Netlify IP addresses change.
