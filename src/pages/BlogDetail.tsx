import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Loader2 } from 'lucide-react';
import { BlogPost } from '../types/types';
import { blogs as staticBlogs } from '../data/blogs';

const BlogDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for effect, or just set it immediately.
        // Since we are moving to static, immediate is better, but maybe a small delay feels smoother?
        // Let's just do it immediately.
        const found = staticBlogs.find(b => b.id === id);
        setBlog(found || null);
        setLoading(false);
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={48} />
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen pt-32 px-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">Article not found.</h1>
                <button
                    onClick={() => navigate('/blogs')}
                    className="text-blue-500 flex items-center gap-2 hover:underline"
                >
                    <ArrowLeft size={20} /> Back to Blogs
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 px-6 pb-24 max-w-4xl mx-auto">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/blogs')}
                className="mb-12 text-gray-400 flex items-center gap-2 hover:text-white transition-colors group"
            >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Back to Engineering Insights
            </motion.button>

            <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect p-8 md:p-12 rounded-3xl border border-white/10"
            >
                <div className="flex flex-wrap gap-4 items-center mb-8">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold border border-blue-500/20 uppercase tracking-widest">
                        {blog.category}
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                        <Calendar size={14} /> {blog.date}
                    </span>
                    <span className="flex items-center gap-2 text-gray-500 text-xs font-mono">
                        <Clock size={14} /> {blog.readTime}
                    </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                    {blog.title}
                </h1>

                <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 text-xl leading-relaxed mb-12 font-light italic border-l-4 border-blue-500/30 pl-6">
                        {blog.snippet}
                    </p>

                    <div
                        className="blog-content-render text-gray-300 leading-[1.8] text-lg font-light"
                        dangerouslySetInnerHTML={{ __html: blog.content || "Full documentation transmission pending..." }}
                    />
                </div>

                <style>{`
                    .blog-content-render h1 { font-size: 2.5rem; font-weight: 800; margin-top: 3rem; margin-bottom: 1.5rem; color: white; line-height: 1.2; }
                    .blog-content-render h2 { font-size: 2rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1.2rem; color: white; line-height: 1.3; }
                    .blog-content-render h3 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 1rem; color: white; }
                    .blog-content-render p { margin-bottom: 1.5rem; }
                    .blog-content-render ul, .blog-content-render ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                    .blog-content-render li { margin-bottom: 0.5rem; }
                    .blog-content-render blockquote { 
                        border-left: 4px solid #3b82f6; 
                        padding: 1rem 1.5rem; 
                        background: rgba(59,130,246,0.05); 
                        border-radius: 0 1rem 1rem 0;
                        margin: 2rem 0;
                        font-style: italic;
                    }
                    .blog-content-render code { 
                        background: #1a1a1a; 
                        color: #60a5fa; 
                        padding: 0.2rem 0.4rem; 
                        border-radius: 0.4rem; 
                        font-family: 'JetBrains Mono', monospace;
                        font-size: 0.9em;
                    }
                    .blog-content-render pre {
                        background: #0a0a0a !important;
                        padding: 2rem !important;
                        border-radius: 1.5rem !important;
                        border: 1px solid rgba(255,255,255,0.05) !important;
                        margin: 2.5rem 0 !important;
                        overflow-x: auto;
                    }
                    .blog-content-render img {
                        border-radius: 1.5rem;
                        margin: 3rem 0;
                        border: 1px solid rgba(255,255,255,0.1);
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    }
                    .blog-content-render a {
                        color: #3b82f6;
                        text-decoration: underline;
                        text-underline-offset: 4px;
                    }
                    .blog-content-render a:hover {
                        color: #60a5fa;
                    }
                `}</style>
            </motion.article>
        </div>
    );
};

export default BlogDetail;
