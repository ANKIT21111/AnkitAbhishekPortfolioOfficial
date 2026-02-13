
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, Variants } from 'framer-motion';
import { BLOG_DATA } from '../constants/constants';
import { BlogPost } from '../types/types';

// Optimized 4D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={`relative ${className}`}
        >
            <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

const Blog: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [content, setContent] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

    // Fetch blogs from API on mount
    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blogs');
            if (response.ok) {
                const data = await response.json();
                setBlogs(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !content) return;

        const now = new Date();
        const blogData = {
            title,
            description,
            content,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            id: editingBlog ? editingBlog.id : Date.now().toString(),
        };

        try {
            const method = editingBlog ? 'PUT' : 'POST';
            const body = editingBlog ? { ...blogData, _id: editingBlog._id } : blogData;

            const response = await fetch('/api/blogs', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-key': import.meta.env.VITE_BLOG_ADMIN_KEY
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                await fetchBlogs();
                setTitle('');
                setDescription('');
                setContent('');
                setEditingBlog(null);
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Failed to publish blog:', error);
            alert('Failed to publish transmission. Check console for details.');
        }
    };

    const handleEdit = (blog: BlogPost) => {
        setEditingBlog(blog);
        setTitle(blog.title);
        setDescription(blog.description);
        setContent(blog.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string, mongoId?: string) => {
        if (!confirm('Are you sure you want to delete this transmission?')) return;

        try {
            const response = await fetch(`/api/blogs?id=${mongoId}`, {
                method: 'DELETE',
                headers: {
                    'x-admin-key': import.meta.env.VITE_BLOG_ADMIN_KEY
                }
            });

            if (response.ok) {
                await fetchBlogs();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Failed to delete blog:', error);
            alert('Failed to delete transmission.');
        }
    };

    const topBlogs = blogs.slice(0, 3);

    const cardVariants: Variants = {
        hidden: { opacity: 0, scale: 0.9, y: 50, rotateX: 20 },
        visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            y: 0,
            rotateX: 0,
            transition: {
                delay: i * 0.1,
                type: "spring",
                damping: 20,
                stiffness: 100,
            }
        })
    };

    const word3DVariants: Variants = {
        hidden: { rotateX: -90, y: 30, opacity: 0 },
        visible: {
            rotateX: 0, y: 0, opacity: 1,
            transition: { type: "spring", damping: 12, stiffness: 100, duration: 0.8 }
        },
    };

    return (
        <div ref={containerRef} className="pt-40 pb-20 px-6 max-w-7xl mx-auto overflow-visible min-h-screen">
            {/* Header Section aligned with Home style */}
            <motion.div
                style={{ opacity: headerOpacity, y: headerY }}
                className="mb-32 relative z-10"
            >
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-[10px] tracking-[0.3em] mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
                    ACTIVE ARCHIVE // DATA_STREAM_V2
                </motion.div>

                <div className="flex flex-col gap-2">
                    <motion.h1
                        variants={word3DVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic text-white leading-none"
                    >
                        Insights
                    </motion.h1>
                    <motion.h1
                        variants={word3DVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.2 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter uppercase italic leading-none text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                    >
                        Transmission
                    </motion.h1>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative z-10 items-start">
                {/* Left Column: Top 3 Blogs */}
                <div className="space-y-16">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-16 h-[1px] bg-blue-500/50"></div>
                        <h2 className="text-[10px] font-mono font-bold tracking-[0.5em] uppercase text-gray-500">Live_Update_Thread</h2>
                    </div>

                    <div className="space-y-12">
                        <AnimatePresence mode="popLayout">
                            {topBlogs.map((blog, idx) => (
                                <TiltCard key={blog.id}>
                                    <motion.div
                                        custom={idx}
                                        variants={cardVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true, margin: "-50px" }}
                                        className="group relative p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:bg-blue-500/[0.05] backdrop-blur-md overflow-hidden"
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-mono text-blue-400 uppercase tracking-widest">TRN_ID: {blog.id.slice(-4)}</span>
                                                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{blog.date} // {blog.time}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleEdit(blog); }}
                                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); handleDelete(blog.id, blog._id); }}
                                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-red-400 hover:border-red-500/50 transition-all"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    </button>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight tracking-tight">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-400 text-base leading-relaxed mb-8 font-light line-clamp-2">
                                                {blog.description}
                                            </p>

                                            <motion.button
                                                whileHover={{ x: 5 }}
                                                onClick={() => setSelectedBlog(blog)}
                                                className="text-[10px] font-mono text-white uppercase tracking-[0.4em] flex items-center gap-3"
                                            >
                                                READ_TRANSMISSION <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white group-hover:text-black transition-all font-bold">→</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            ))}
                        </AnimatePresence>

                        {isLoading ? (
                            <div className="py-32 text-center border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.02]">
                                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Synchronizing_Stream...</p>
                            </div>
                        ) : blogs.length === 0 && (
                            <div className="py-32 text-center border border-dashed border-white/10 rounded-[2.5rem] bg-white/[0.02]">
                                <p className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Buffer_Empty: Waiting for data...</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Studio Core */}
                <div className="lg:sticky lg:top-32 h-fit">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="p-1 glass rounded-[3rem] border border-blue-500/20 shadow-2xl relative"
                    >
                        <div className="p-10 md:p-12 rounded-[2.9rem] bg-black/40 backdrop-blur-xl overflow-hidden">
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-4">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                                    <h2 className="text-xl font-bold uppercase tracking-tight">Studio_Core</h2>
                                </div>
                                <span className="text-[9px] font-mono text-blue-500 uppercase tracking-widest">System_Active</span>
                            </div>

                            <form onSubmit={handlePublish} className="space-y-8 text-sm">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest px-1">Descriptor_Tag</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter Title..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all font-bold"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest px-1">Abstract_Layer</label>
                                    <textarea
                                        rows={3}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Brief summary..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-light"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-mono text-gray-500 uppercase tracking-widest px-1">Content_Buffer</label>
                                    <textarea
                                        rows={6}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Raw content stream..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 transition-all resize-none font-mono text-xs leading-relaxed"
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-bold py-5 rounded-2xl transition-all uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4"
                                >
                                    {editingBlog ? 'Push_Sync' : 'Initialize_Packet'}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </motion.button>

                                {editingBlog && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingBlog(null); setTitle(''); setDescription(''); setContent(''); }}
                                        className="w-full text-center text-[9px] font-mono text-gray-500 hover:text-red-400 uppercase tracking-widest transition-colors"
                                    >
                                        [ Nullify_Operation ]
                                    </button>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Read Modal */}
            <AnimatePresence>
                {selectedBlog && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 backdrop-blur-2xl bg-black/80"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="w-full max-w-4xl bg-[#080808] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col h-[85vh]"
                        >
                            <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Packet_Decrypted</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">{selectedBlog.title}</h2>
                                    <div className="flex gap-6 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                                        <span>{selectedBlog.date} // {selectedBlog.time}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedBlog(null)}
                                    className="w-12 h-12 rounded-full glass border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            </div>

                            <div className="flex-grow overflow-y-auto p-8 md:p-16 custom-scrollbar">
                                <div className="max-w-2xl mx-auto space-y-12">
                                    <p className="text-xl text-blue-400 font-light leading-relaxed italic border-l-2 border-blue-500/30 pl-8">
                                        {selectedBlog.description}
                                    </p>
                                    <div className="text-gray-300 text-lg leading-relaxed font-light space-y-8 whitespace-pre-line">
                                        {selectedBlog.content}
                                    </div>
                                    <div className="pt-16 pb-8 border-t border-white/5 text-center">
                                        <p className="text-[9px] font-mono text-gray-700 uppercase tracking-[1em]">END_OF_TRANSMISSION</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blog;
