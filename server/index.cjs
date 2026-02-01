require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'blogs.json');

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
let isConnected = false;

if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
            isConnected = true;
        })
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn('MONGODB_URI not found. Using local JSON file (NOT persistent on Vercel).');
}

// Blog Schema
const blogSchema = new mongoose.Schema({
    id: String,
    title: { type: String, required: true },
    content: { type: String, required: true },
    snippet: String,
    category: String,
    readTime: String,
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

// In-memory OTP storage (expires after 5 minutes)
const otps = {};

// Transporter for nodemailer (safe initialization)
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
}

// Helper function to read blogs (Fallback for local)
const readBlogsLocal = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
};

// GET all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        if (isConnected) {
            const blogs = await Blog.find().sort({ _id: -1 }); // Newest first
            return res.json(blogs);
        }
        res.json(readBlogsLocal());
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// GET a single blog
app.get('/api/blogs/:id', async (req, res) => {
    try {
        if (isConnected) {
            const blog = await Blog.findOne({ id: req.params.id });
            if (!blog) return res.status(404).json({ error: 'Blog not found' });
            return res.json(blog);
        }
        const blogs = readBlogsLocal();
        const blog = blogs.find(b => b.id === req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching blog' });
    }
});

// POST a new blog
app.post('/api/blogs', async (req, res) => {
    const { title, content, category, snippet, readTime } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const blogData = {
        title,
        content,
        category,
        snippet,
        readTime,
        id: Date.now().toString()
    };

    try {
        if (isConnected) {
            const newBlog = new Blog(blogData);
            await newBlog.save();
            return res.status(201).json(newBlog);
        }

        // Fallback for local
        const blogs = readBlogsLocal();
        const blogToSave = {
            ...blogData,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        blogs.unshift(blogToSave);
        fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf8');
        res.status(201).json(blogToSave);
    } catch (err) {
        res.status(500).json({ error: 'Failed to save blog' });
    }
});

// POST request-delete (generate OTP)
app.post('/api/blogs/request-delete', async (req, res) => {
    const { blogId } = req.body;
    if (!blogId) return res.status(400).json({ error: 'Blog ID is required' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otps[blogId] = {
        otp,
        expiry: Date.now() + 300000 // 5 minutes
    };

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ankitabhishek1005@gmail.com',
        subject: 'OTP for Blog Deletion - Insights Lab',
        text: `Your OTP for deleting the blog post is: ${otp}. This code will expire in 5 minutes.`
    };

    if (!transporter) {
        console.error('Delete OTP failed: Transporter not configured');
        return res.status(503).json({ error: 'Email service is offline. Please check server configuration.' });
    }

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send OTP.' });
    }
});

// DELETE a blog (verify OTP)
app.post('/api/blogs/delete-confirm', async (req, res) => {
    const { blogId, otp } = req.body;

    if (!otps[blogId] || Date.now() > otps[blogId].expiry) {
        return res.status(400).json({ error: 'OTP expired or not requested' });
    }

    if (otps[blogId].otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    try {
        if (isConnected) {
            await Blog.findOneAndDelete({ id: blogId });
        } else {
            let blogs = readBlogsLocal();
            blogs = blogs.filter(b => b.id !== blogId);
            fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf8');
        }
        delete otps[blogId];
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

// POST contact form submission
app.post('/api/contact', async (req, res) => {
    const { identifier, email, message } = req.body;
    if (!identifier || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ankitabhishek1005@gmail.com',
        subject: `New Contact Form Submission from ${identifier}`,
        text: `Name: ${identifier}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
                <h2 style="color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${identifier}</p>
                <p><strong>Email:</strong> ${email}</p>
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; margin-top: 20px;">
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <hr style="margin-top: 30px; border: 0; border-top: 1px solid #eee;" />
                <p style="font-size: 12px; color: #6b7280; text-align: center;">Sent from Ankit Abhishek Portfolio</p>
            </div>
        `
    };

    if (!transporter) {
        console.error('Contact failed: Transporter not configured');
        return res.status(503).json({ error: 'Email service is offline. Please try again later.' });
    }

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = app;

