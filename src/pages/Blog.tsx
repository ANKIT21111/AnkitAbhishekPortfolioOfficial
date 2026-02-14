
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Edit3,
    Trash2,
    FileText,
    Send,
    Calendar,
    Clock,
    ChevronRight,
    Terminal,
    Save,
    CheckCircle,
    X,
    Activity,
    Image as ImageIcon,
    Bold,
    Italic,
    Code,
    List
} from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    date: string;
    time: string;
    timestamp: number;
}

const Blog: React.FC = () => {
    // Local State for "Database"
    const [posts, setPosts] = useState<BlogPost[]>(() => {
        const saved = localStorage.getItem('portfolio_blogs');
        if (saved) return JSON.parse(saved);
        return [
            {
                id: '1',
                title: 'Optimizing Apache Spark Pipelines',
                description: 'Deep dive into memory management and executor tuning for large-scale data processing.',
                content: 'Full content here...',
                date: '2025-05-15',
                time: '14:30',
                timestamp: 1715764200000
            },
            {
                id: '2',
                title: 'Real-time Analytics with Kafka',
                description: 'Building robust streaming architectures for financial data ingestion.',
                content: 'Full content here...',
                date: '2025-04-22',
                time: '09:15',
                timestamp: 1713774900000
            },
            {
                id: '3',
                title: 'The Future of Data Governance',
                description: 'Why metadata management is becoming the cornerstone of modern data engineering.',
                content: 'Full content here...',
                date: '2025-03-10',
                time: '16:45',
                timestamp: 1710078300000
            }
        ];
    });

    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', content: '' });
    const [notification, setNotification] = useState<{ type: 'success' | 'dev'; message: string } | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        localStorage.setItem('portfolio_blogs', JSON.stringify(posts));
    }, [posts]);

    // Sorting: Newest first
    const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);
    const top3Posts = sortedPosts.slice(0, 3);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const insertFormat = (format: 'bold' | 'italic' | 'code' | 'list' | 'image') => {
        if (!textareaRef.current) return;

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const text = formData.content;
        let newText = text;
        let newCursorPos = end;

        switch (format) {
            case 'bold':
                newText = text.substring(0, start) + `**${text.substring(start, end)}**` + text.substring(end);
                newCursorPos = end + 4;
                break;
            case 'italic':
                newText = text.substring(0, start) + `*${text.substring(start, end)}*` + text.substring(end);
                newCursorPos = end + 2;
                break;
            case 'code':
                newText = text.substring(0, start) + `\`\`\`\n${text.substring(start, end)}\n\`\`\`` + text.substring(end);
                newCursorPos = end + 8;
                break;
            case 'list':
                newText = text.substring(0, start) + `\n- ${text.substring(start, end)}` + text.substring(end);
                newCursorPos = end + 3;
                break;
            case 'image':
                const url = prompt("Enter Image URL:");
                if (url) {
                    const alt = prompt("Enter Alt Text:", "Image Description");
                    newText = text.substring(0, start) + `![${alt}](${url})` + text.substring(end);
                    newCursorPos = start + url.length + (alt?.length || 0) + 4;
                }
                break;
        }

        setFormData(prev => ({ ...prev, content: newText }));

        // Restore focus and cursor
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date();
        const newPost: BlogPost = {
            id: currentId || Math.random().toString(36).substr(2, 9),
            title: formData.title,
            description: formData.description,
            content: formData.content,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: now.getTime()
        };

        if (currentId) {
            setPosts(prev => prev.map(p => p.id === currentId ? newPost : p));
            showNotification('success', 'PACKET_UPDATED_SUCCESSFULLY');
        } else {
            setPosts(prev => [newPost, ...prev]);
            showNotification('success', 'PACKET_DEPLOYED_SUCCESSFULLY');
        }

        resetForm();
    };

    const handleEdit = (post: BlogPost) => {
        setFormData({
            title: post.title,
            description: post.description,
            content: post.content
        });
        setCurrentId(post.id);
        setIsEditing(true);
        // Scroll to editor
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Confirm deletion of this data packet?')) {
            setPosts(prev => prev.filter(p => p.id !== id));
            showNotification('dev', 'PACKET_PURGED');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', content: '' });
        setCurrentId(null);
        setIsEditing(false);
    };

    const showNotification = (type: 'success' | 'dev', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Decorative Background - Aligned with Contact.tsx */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* LEFT COLUMN: Top 3 Blogs */}
                <div className="lg:col-span-5 space-y-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono"
                        >
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            KNOWLEDGE_BASE // ACTIVE
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            Latest <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                                Insights.
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gray-400 text-lg max-w-md font-light leading-relaxed"
                        >
                            Exploring the frontiers of data engineering, distributed systems, and real-time analytics.
                        </motion.p>
                    </div>

                    <div className="space-y-6">
                        {top3Posts.map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/[0.07] glass"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-mono text-blue-500/80 uppercase tracking-widest flex items-center gap-2">
                                            <Calendar size={10} /> {post.date}
                                        </span>
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={10} /> {post.time}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => handleEdit(post)}
                                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Edit3 size={14} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                                    {post.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <button className="text-[10px] font-mono font-bold text-white flex items-center gap-2 group/btn hover:text-blue-400 transition-colors">
                                        READ_PACKET <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="text-gray-600 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {top3Posts.length === 0 && (
                            <div className="p-8 rounded-2xl border border-dashed border-white/10 text-center">
                                <p className="text-gray-500 font-mono text-xs">NO_DATA_PACKETS_FOUND</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN: Blog Posting Studio */}
                <div className="lg:col-span-7">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#050505] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col min-h-[700px]"
                    >
                        {/* Studio Header */}
                        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                                    Studio_Core.v1
                                </span>
                            </div>
                        </div>

                        {/* Notification Banner */}
                        <AnimatePresence>
                            {notification && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`border-b ${notification.type === 'success' ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                                >
                                    <div className="px-6 py-2 flex items-center justify-center gap-2 text-[10px] font-mono tracking-widest uppercase">
                                        {notification.type === 'success' ? <CheckCircle size={12} /> : <Trash2 size={12} />}
                                        {notification.message}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex-grow p-8 relative">
                            <form onSubmit={handlePublish} className="space-y-6 h-full flex flex-col">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <Terminal size={12} /> Packet_Title
                                        </label>
                                        <input
                                            required
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter title..."
                                            className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-bold text-lg text-white placeholder:text-gray-700"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <FileText size={12} /> Short_Description
                                        </label>
                                        <input
                                            required
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Brief overview..."
                                            className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm text-gray-300 placeholder:text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 flex-grow flex flex-col">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                            <FileText size={12} /> Content_Body
                                        </label>

                                        {/* Documentation Toolbar */}
                                        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                                            {[
                                                { icon: Bold, action: () => insertFormat('bold'), label: "Bold" },
                                                { icon: Italic, action: () => insertFormat('italic'), label: "Italic" },
                                                { icon: Code, action: () => insertFormat('code'), label: "Code" },
                                                { icon: List, action: () => insertFormat('list'), label: "List" },
                                                { type: 'separator' },
                                                { icon: ImageIcon, action: () => insertFormat('image'), label: "Image" },
                                            ].map((tool, i) => (
                                                tool.type === 'separator' ? (
                                                    <div key={i} className="w-px h-3 bg-white/10 mx-1" />
                                                ) : (
                                                    <button
                                                        key={i}
                                                        type="button"
                                                        onClick={(tool as any).action}
                                                        className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                                                        title={(tool as any).label}
                                                    >
                                                        {React.createElement((tool as any).icon, { size: 12 })}
                                                    </button>
                                                )
                                            ))}
                                        </div>
                                    </div>

                                    <textarea
                                        required
                                        ref={textareaRef}
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        placeholder="Write your article here..."
                                        className="w-full flex-grow bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all min-h-[300px] text-gray-300 font-light leading-relaxed resize-none placeholder:text-gray-700 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent font-mono text-sm"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={resetForm}
                                            className="px-6 py-3 rounded-xl border border-white/10 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center gap-2 uppercase tracking-wider"
                                        >
                                            <X size={14} /> Cancel
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-3 uppercase tracking-wider text-xs"
                                    >
                                        {isEditing ? (
                                            <>
                                                <Save size={16} /> Save_Packet
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} /> Initialize_Packet
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-4 bg-black/50 border-t border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
                                <span className="flex items-center gap-1"><CheckCircle size={10} /> AUTO_SAVE: DISABLED</span>
                                <span>MODE: MARKDOWN_SUPPORT</span>
                            </div>
                            <div className="text-[10px] font-mono text-gray-600">
                                CMS_VERSION_1.0.4
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Blog;
