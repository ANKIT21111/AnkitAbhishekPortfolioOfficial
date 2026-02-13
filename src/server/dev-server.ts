import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// @ts-ignore
import handler from '../../api/blogs.ts';

const app = express();
app.use(cors());
app.use(express.json());

// Remove restrictive CSP headers that Express 5 might add on error pages
app.use((_req, res, next) => {
    res.removeHeader('Content-Security-Policy');
    next();
});

// Handle Chrome DevTools requests to avoid 404s and CSP issues
app.get('/.well-known/appspecific/com.chrome.devtools.json', (_req, res) => {
    res.json({});
});

// Proxy all requests to /api/blogs to the Vercel handler
app.all('/api/blogs', async (req, res) => {
    try {
        // @ts-ignore
        await handler(req, res);
    } catch (e: any) {
        console.error('API Error:', e);
        res.status(500).json({ error: e.message });
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`
🚀 Local API Server running on http://localhost:${PORT}
🔗 API Endpoint: http://localhost:${PORT}/api/blogs
    `);
});
