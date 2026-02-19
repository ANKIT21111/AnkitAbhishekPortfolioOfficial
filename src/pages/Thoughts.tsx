
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
    List,
    Maximize2,
    Minimize2,
    Plus,
    Upload,
    Eye,
    Layout,
    Camera,
    ImagePlus,
    Link as LinkIcon
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
    id: string;
    title: string;
    description: string;
    content: string;
    coverImage?: string;
    date: string;
    time: string;
    timestamp: number;
}


const Thoughts: React.FC = () => {
    // Local State for "Database"
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/blog');
            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error('Failed to fetch posts');
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts();

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', content: '', coverImage: '' });
    const [notification, setNotification] = useState<{ type: 'success' | 'dev'; message: string } | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [insertType, setInsertType] = useState<'content' | 'cover'>('content');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reader State
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);



    // Sorting: Newest first
    const sortedPosts = [...posts].sort((a, b) => b.timestamp - a.timestamp);
    const top3Posts = sortedPosts.slice(0, 3);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const openImageModal = (type: 'content' | 'cover') => {
        setInsertType(type);
        setShowImageModal(true);
    };

    const handleImageInsert = (url: string, alt: string = 'Blog Image') => {
        const cleanUrl = url.trim().replace(/\n/g, '').replace(/\r/g, '');
        const cleanAlt = alt.replace(/[\[\]\(\)\n\r]/g, '').trim();
        const markdownImage = `\n\n![${cleanAlt}](${cleanUrl})\n\n`;

        if (insertType === 'cover') {
            setFormData(prev => ({ ...prev, coverImage: cleanUrl }));
        } else {
            if (!textareaRef.current) return;
            const start = textareaRef.current.selectionStart;
            const end = textareaRef.current.selectionEnd;
            const text = formData.content;
            const newText = text.substring(0, start) + markdownImage + text.substring(end);
            setFormData(prev => ({ ...prev, content: newText }));

            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.focus();
                    const newPos = start + markdownImage.length;
                    textareaRef.current.setSelectionRange(newPos, newPos);
                }
            }, 0);
        }
        setShowImageModal(false);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Implementation of technical design: Local preview using Base64
        // In a production environment, this would upload to Cloudinary/S3
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            handleImageInsert(base64String, file.name);
        };
        reader.readAsDataURL(file);
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
                if (start === end) {
                    newText = text.substring(0, start) + '****' + text.substring(end);
                    newCursorPos = start + 2;
                } else {
                    newText = text.substring(0, start) + `**${text.substring(start, end)}**` + text.substring(end);
                    newCursorPos = end + 4;
                }
                break;
            case 'italic':
                if (start === end) {
                    newText = text.substring(0, start) + '**' + text.substring(end);
                    newCursorPos = start + 1;
                } else {
                    newText = text.substring(0, start) + `*${text.substring(start, end)}*` + text.substring(end);
                    newCursorPos = end + 2;
                }
                break;
            case 'code':
                newText = text.substring(0, start) + `\n\`\`\`\n${text.substring(start, end)}\n\`\`\`\n` + text.substring(end);
                newCursorPos = end + 8;
                break;
            case 'list':
                newText = text.substring(0, start) + `\n- ${text.substring(start, end)}` + text.substring(end);
                newCursorPos = end + 3;
                break;
            case 'image':
                openImageModal('content');
                return; // Modal will handle restoration
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

    const handlePublish = async (e: React.FormEvent) => {
        e.preventDefault();

        const now = new Date();
        // Base post data
        const basePostData = {
            title: formData.title,
            description: formData.description,
            content: formData.content,
            coverImage: formData.coverImage,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: now.getTime()
        };

        try {
            if (currentId) {
                // Update existing post
                const response = await fetch('/api/blog', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...basePostData, id: currentId })
                });

                if (response.ok) {
                    showNotification('success', 'PACKET_UPDATED_SUCCESSFULLY');
                    fetchPosts(); // Refresh list to get updated data
                } else {
                    const errorData = await response.json();
                    showNotification('dev', `UPDATE_FAILED: ${errorData.error || 'Unknown'}`);
                }
            } else {
                // Create new post
                const response = await fetch('/api/blog', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(basePostData)
                });

                if (response.ok) {
                    showNotification('success', 'PACKET_DEPLOYED_SUCCESSFULLY');
                    fetchPosts(); // Refresh list to include new post
                } else {
                    const errorData = await response.json();
                    showNotification('dev', `DEPLOY_FAILED: ${errorData.error || 'Unknown'}`);
                }
            }
            resetForm();
        } catch (error) {
            console.error('Publish error:', error);
            showNotification('dev', 'NETWORK_ERROR');
        }
    };

    const handleEdit = (post: BlogPost) => {
        setFormData({
            title: post.title,
            description: post.description,
            content: post.content,
            coverImage: post.coverImage || ''
        });
        setCurrentId(post.id);
        setIsEditing(true);
        // Scroll to editor
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Confirm deletion of this data packet?')) {
            try {
                const response = await fetch(`/api/blog?id=${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    setPosts(prev => prev.filter(p => p.id !== id));
                    showNotification('dev', 'PACKET_PURGED');
                } else {
                    const errorData = await response.json();
                    showNotification('dev', `DELETE_FAILED: ${errorData.error || 'Unknown'}`);
                }
            } catch (error) {
                console.error('Delete error:', error);
                showNotification('dev', 'NETWORK_ERROR');
            }
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', content: '', coverImage: '' });
        setCurrentId(null);
        setIsEditing(false);
    };

    const showNotification = (type: 'success' | 'dev', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReadPacket = (post: BlogPost) => {
        setSelectedPost(post);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeReader = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'unset';
    };

    // Reader Component
    const ThoughtsReader = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#0a0a0a] w-full max-w-4xl max-h-[90vh] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                            PACKET_ID: {post.id.substring(0, 8)}...
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
                    {post.coverImage && (
                        <div className="w-full h-64 md:h-80 overflow-hidden">
                            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div className="p-8 md:p-12">
                        <div className="space-y-8 max-w-3xl mx-auto">
                            {/* Meta */}
                            <div className="flex flex-wrap gap-4 text-xs font-mono text-blue-400/80">
                                <span className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                    <Calendar size={12} /> {post.date}
                                </span>
                                <span className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                                    <Clock size={12} /> {post.time}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                                {post.title}
                            </h1>

                            {/* Decorative Line */}
                            <div className="h-px w-full bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-transparent" />

                            {/* Body */}
                            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-img:rounded-xl prose-strong:text-white prose-strong:font-bold prose-em:text-blue-400 prose-em:italic">
                                <ReactMarkdown
                                    urlTransform={(uri) => uri} // Explicitly allow all URIs including data:
                                    components={{
                                        img: ({ ...props }) => (
                                            <span className="block my-8 max-w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-white/5">
                                                <img
                                                    {...props}
                                                    className="w-full h-auto object-contain hover:scale-[1.01] transition-transform duration-500"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.style.display = 'none';
                                                        if (target.parentElement) {
                                                            target.parentElement.innerHTML = `<div class="p-8 text-center text-xs font-mono text-white/20">IMAGE_DECODING_ERROR: BUFFER_SIZE_EXCEEDED</div>`;
                                                        }
                                                    }}
                                                />
                                            </span>
                                        )
                                    }}
                                >
                                    {post.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-white/10 bg-black/50 flex justify-between items-center text-[10px] font-mono text-gray-600">
                    <span>READ_MODE: ACTIVE</span>
                    <span>END_OF_PACKET</span>
                </div>
            </motion.div>
        </motion.div>
    );

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
                            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight"
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
                                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={isMobile ? { duration: 0.3 } : { delay: idx * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/[0.07] glass"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex flex-col gap-1.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                                            <span className="text-[10px] font-mono text-blue-500/80 uppercase tracking-[0.2em]">
                                                {post.date}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-2 rounded-xl hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-all"
                                            title="Edit Packet"
                                        >
                                            <Edit3 size={14} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2 rounded-xl hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all"
                                            title="Purge Packet"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>

                                {post.coverImage && (
                                    <div className="mb-4 rounded-xl overflow-hidden h-32 border border-white/5">
                                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-gray-400 text-xs leading-relaxed mb-6 line-clamp-2 font-light">
                                    {post.description}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <button
                                        onClick={() => handleReadPacket(post)}
                                        className="text-[10px] font-mono font-bold text-white/50 flex items-center gap-2 group/btn hover:text-blue-400 transition-colors tracking-[0.2em]"
                                    >
                                        OPEN_DATA_STREAM <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                    <div className="flex items-center gap-2 text-[8px] font-mono text-gray-700">
                                        <Clock size={8} /> {post.time}
                                    </div>
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
                        initial={isMobile ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#050505]/80 backdrop-blur-xl rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col min-h-[800px] glass-morphism"
                    >
                        {/* Editor Top Bar - LinkedIn Style */}
                        <div className="px-8 py-4 bg-white/[0.02] border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                                </div>
                                <div className="h-4 w-px bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <Layout size={14} className="text-blue-500" />
                                    <span className="text-[10px] font-mono text-gray-400 tracking-[0.2em] uppercase">
                                        Studio_Core
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setPreviewMode(!previewMode)}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-mono transition-all border ${previewMode ? 'bg-blue-500/20 border-blue-500/40 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}
                                >
                                    {previewMode ? <Edit3 size={12} /> : <Eye size={12} />}
                                    {previewMode ? 'EDIT_MODE' : 'PREVIEW_MODE'}
                                </button>
                            </div>
                        </div>

                        {/* Notification Banner */}
                        <AnimatePresence>
                            {notification && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`border-b ${notification.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}
                                >
                                    <div className="px-8 py-2.5 flex items-center gap-3 text-[10px] font-mono tracking-widest uppercase">
                                        {notification.type === 'success' ? <CheckCircle size={14} /> : <Activity size={14} />}
                                        {notification.message}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex-grow flex flex-col overflow-y-auto custom-scrollbar">
                            <form onSubmit={handlePublish} className="flex flex-col flex-grow">
                                {/* Cover Image Area */}
                                <div
                                    className="relative h-48 md:h-64 bg-white/[0.02] border-b border-white/5 group cursor-pointer overflow-hidden"
                                    onClick={() => openImageModal('cover')}
                                >
                                    {formData.coverImage ? (
                                        <>
                                            <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <div className="flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/20 text-xs font-mono text-white">
                                                    <Camera size={14} /> CHANGE_COVER
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-500 group-hover:text-blue-400 transition-colors">
                                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
                                                <ImagePlus size={24} />
                                            </div>
                                            <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Add Cover Image</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 md:p-12 space-y-8 flex-grow">
                                    {!previewMode ? (
                                        <>
                                            {/* Title Group */}
                                            <div className="space-y-4">
                                                <textarea
                                                    required
                                                    name="title"
                                                    value={formData.title}
                                                    onChange={handleInputChange}
                                                    placeholder="Article Title..."
                                                    rows={1}
                                                    className="w-full bg-transparent border-none text-4xl md:text-5xl font-bold text-white placeholder:text-white/10 focus:outline-none resize-none leading-tight"
                                                    onInput={(e) => {
                                                        const target = e.target as HTMLTextAreaElement;
                                                        target.style.height = 'auto';
                                                        target.style.height = target.scrollHeight + 'px';
                                                    }}
                                                />
                                                <input
                                                    required
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleInputChange}
                                                    placeholder="Add a short subtitle or description..."
                                                    className="w-full bg-transparent border-none text-lg text-gray-400 placeholder:text-white/10 focus:outline-none font-light"
                                                />
                                                <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-transparent" />
                                            </div>

                                            {/* Toolbar - Floating Style */}
                                            <div className="sticky top-0 z-10 py-4 bg-[#050505]/80 backdrop-blur-sm -mx-2 px-2 flex items-center justify-between border-b border-white/5">
                                                <div className="flex items-center gap-1">
                                                    {[
                                                        { icon: Bold, action: () => insertFormat('bold'), label: "Bold" },
                                                        { icon: Italic, action: () => insertFormat('italic'), label: "Italic" },
                                                        { icon: Code, action: () => insertFormat('code'), label: "Code" },
                                                        { icon: List, action: () => insertFormat('list'), label: "List" },
                                                        { type: 'separator' },
                                                        { icon: ImageIcon, action: () => insertFormat('image'), label: "Add Media" },
                                                    ].map((tool, i) => (
                                                        tool.type === 'separator' ? (
                                                            <div key={i} className="w-px h-4 bg-white/10 mx-2" />
                                                        ) : (
                                                            <button
                                                                key={i}
                                                                type="button"
                                                                onClick={(tool as any).action}
                                                                className="p-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all outline-none group"
                                                                title={(tool as any).label}
                                                            >
                                                                {React.createElement((tool as any).icon, { size: 16, className: "group-hover:scale-110 transition-transform" })}
                                                            </button>
                                                        )
                                                    ))}
                                                </div>
                                                <div className="text-[10px] font-mono text-gray-600 hidden md:block">
                                                    MARKDOWN_READY
                                                </div>
                                            </div>

                                            {/* Content Area */}
                                            <textarea
                                                required
                                                ref={textareaRef}
                                                name="content"
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                placeholder="Begin your story here..."
                                                className="w-full flex-grow bg-transparent border-none focus:outline-none text-gray-300 text-xl font-light leading-relaxed min-h-[400px] resize-none placeholder:text-white/5 custom-scrollbar"
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    const files = e.dataTransfer.files;
                                                    if (files && files[0]) {
                                                        const event = { target: { files: [files[0]] } } as any;
                                                        handleFileUpload(event);
                                                    }
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <div className="prose prose-invert prose-xl max-w-none animate-in fade-in slide-in-from-bottom-4 duration-500 prose-strong:text-white prose-strong:font-bold prose-em:text-blue-400 prose-em:italic">
                                            <h1 className="text-5xl font-bold mb-4">{formData.title || 'Untitled Article'}</h1>
                                            {formData.description && <p className="text-xl text-gray-400 font-light mb-8 italic">{formData.description}</p>}
                                            <div className="h-px w-full bg-white/10 mb-12" />
                                            <ReactMarkdown
                                                urlTransform={(uri) => uri}
                                                components={{
                                                    img: ({ ...props }) => (
                                                        <span className="block my-8 max-w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-white/5">
                                                            <img {...props} className="w-full h-auto object-contain" />
                                                        </span>
                                                    )
                                                }}
                                            >
                                                {formData.content || '_No content yet..._'}
                                            </ReactMarkdown>
                                        </div>
                                    )}
                                </div>

                                {/* Editor Footer */}
                                <div className="px-8 py-6 bg-white/[0.02] border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            CLOUD_SYNC: READY
                                        </div>
                                        <div>WORDS: {formData.content.trim().split(/\s+/).filter(x => x).length}</div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        {isEditing && (
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-white/5 text-[10px] font-mono text-gray-400 hover:text-white hover:bg-white/10 border border-white/10 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                                            >
                                                <X size={14} /> Abort
                                            </button>
                                        )}
                                        <button
                                            type="submit"
                                            className="flex-1 md:flex-none px-10 py-3 bg-white text-black text-[10px] font-mono font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                                        >
                                            {isEditing ? <Save size={14} /> : <Send size={14} />}
                                            {isEditing ? 'Sync_Packet' : 'Deploy_Packet'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Image Insertion Modal */}
            <AnimatePresence>
                {showImageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl"
                        onClick={() => setShowImageModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[#0a0a0a] w-full max-w-md rounded-[2rem] border border-white/10 p-8 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-3">
                                    <ImageIcon className="text-blue-500" />
                                    Insert Media
                                </h3>
                                <button onClick={() => setShowImageModal(false)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Option 1: URL */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Image URL</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            placeholder="https://images.unsplash.com/..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-light"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleImageInsert((e.target as HTMLInputElement).value);
                                                }
                                            }}
                                        />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-blue-400 transition-colors">
                                            <LinkIcon size={16} />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 py-2">
                                    <div className="h-px flex-grow bg-white/5" />
                                    <span className="text-[10px] font-mono text-gray-700">OR</span>
                                    <div className="h-px flex-grow bg-white/5" />
                                </div>

                                {/* Option 2: Upload */}
                                <div
                                    className="border-2 border-dashed border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                                        <Upload size={24} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium">Upload from device</p>
                                        <p className="text-[10px] font-mono text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileUpload}
                                    />
                                </div>

                                <p className="text-[10px] text-gray-600 font-mono leading-relaxed mt-4">
                                    TECHNICAL_DESIGN_NOTICE: For production build, this module is architected to interface with Cloudinary CDN for optimal asset delivery. Currently running in LOCAL_BUFFER mode.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reader Modal */}
            <AnimatePresence>
                {selectedPost && (
                    <ThoughtsReader post={selectedPost} onClose={closeReader} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Thoughts;
