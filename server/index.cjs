require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'blogs.json');

app.use(cors());
app.use(bodyParser.json());

// In-memory OTP storage (expires after 5 minutes)
const otps = {};

// Transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Helper function to read blogs
const readBlogs = () => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading blogs file:', err);
        return [];
    }
};

// Helper function to write blogs
const writeBlogs = (blogs) => {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(blogs, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to blogs file:', err);
    }
};

// GET all blogs
app.get('/api/blogs', (req, res) => {
    const blogs = readBlogs();
    res.json(blogs);
});

// GET a single blog
app.get('/api/blogs/:id', (req, res) => {
    const blogs = readBlogs();
    const blog = blogs.find(b => b.id === req.params.id);
    if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
});

// POST a new blog
app.post('/api/blogs', (req, res) => {
    const newBlog = req.body;
    if (!newBlog.title || !newBlog.content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const blogs = readBlogs();
    const blogToSave = {
        ...newBlog,
        id: Date.now().toString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.ceil(newBlog.content.split(' ').length / 200)} min read`
    };

    blogs.unshift(blogToSave);
    writeBlogs(blogs);
    res.status(201).json(blogToSave);
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

    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP ${otp} sent to ankitabhishek1005@gmail.com`);
        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        // For development purposes, if email fails, we might still want to know the OTP
        // In production, this should always fail properly.
        res.status(500).json({ error: 'Failed to send OTP. Check server logs or .env configuration.' });
    }
});

// DELETE a blog (verify OTP)
app.post('/api/blogs/delete-confirm', (req, res) => {
    const { blogId, otp } = req.body;

    if (!otps[blogId]) {
        return res.status(400).json({ error: 'No OTP requested for this blog' });
    }

    const saved = otps[blogId];
    if (Date.now() > saved.expiry) {
        delete otps[blogId];
        return res.status(400).json({ error: 'OTP expired' });
    }

    if (saved.otp !== otp) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    // OTP Valid - Proceed to delete
    let blogs = readBlogs();
    const initialLength = blogs.length;
    blogs = blogs.filter(b => b.id !== blogId);

    if (blogs.length === initialLength) {
        return res.status(404).json({ error: 'Blog not found' });
    }

    writeBlogs(blogs);
    delete otps[blogId]; // Cleanup
    res.json({ message: 'Blog deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
