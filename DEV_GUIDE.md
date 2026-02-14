# Local Development Guide

This project uses Netlify Functions (serverless) connected to MongoDB. To run the full stack locally, including the API functions, we use the Netlify CLI.

## Prerequisites

1.  **Node.js**: Ensure Node.js is installed.
2.  **MongoDB Atlas**: Ensure your IP address is whitelisted in your MongoDB Atlas cluster network access settings.
3.  **Environment Variables**: Ensure `.env` exists in the root directory with `MONGODB_URI`.

## How to Run Locally

Instead of `npm run dev` (which only starts the Vite frontend), use the following command:

```bash
npm run dev:functions
```

or use the Netlify CLI directly if installed globally:

```bash
netlify dev
```

## What this does

1.  Starts the **Vite** development server on port 3000 (backend target).
2.  Starts a **Netlify Dev** server on port 8888.
3.  **Proxies** requests from `localhost:8888`:
    - `/api/*` requests are routed to your local serverless functions in `netlify/functions`.
    - All other requests are routed to the Vite frontend.
4.  **Injects Environment Variables**: Automatically loads variables from `.env` for use in your functions (`process.env.MONGODB_URI`).

## Accessing the App

Open your browser to:

**http://localhost:8888**

*Note: Do NOT use localhost:3000, as the API functions will not be available there.*

## API Endpoints

-   **Blog API**: `http://localhost:8888/api/blog`
    -   GET: List all blogs
    -   POST: Create a blog
    -   PUT: Update a blog
    -   DELETE: Delete a blog

## Troubleshooting

-   **MongoDB Connection Error**: Check your IP whitelist in MongoDB Atlas.
-   **Port Conflicts**: If port 8888 is in use, Netlify Dev will pick a random port. Check the terminal output.
