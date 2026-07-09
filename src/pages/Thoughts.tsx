
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Layout,
    Search,
    Image as ImageIcon,
    X,
    Link as LinkIcon,
    Upload
} from 'lucide-react';

// Sub-components
import ThoughtsReader from '../components/thoughts/ThoughtsReader';
import OtpModal from '../components/thoughts/OtpModal';
import ThoughtsList from '../components/thoughts/ThoughtsList';
import ThoughtsStudio from '../components/thoughts/ThoughtsStudio';
import Newsletter from '../components/thoughts/Newsletter';
import ForgeIndicta from '../components/thoughts/ForgeIndicta';
import { useDevice } from '../hooks/useDevice';

interface BlogPost {
    id: string;
    title: string;
    description: string;
    content?: string;
    coverImage?: string;
    date: string;
    time: string;
    timestamp: number;
}

const Thoughts: React.FC = () => {
    // Local State for "Database"
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const { isMobile } = useDevice();
    const [isLoading, setIsLoading] = useState(true);

    // View States
    const [viewMode, setViewMode] = useState<'reader' | 'studio'>('reader');
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Editor State
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: '', description: '', content: '', coverImage: '' });
    const [notification, setNotification] = useState<{ type: 'success' | 'dev'; message: string } | null>(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [insertType, setInsertType] = useState<'content' | 'cover'>('content');
    const [editFlash, setEditFlash] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // OTP State
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otpValue, setOtpValue] = useState('');
    const [idToDelete, setIdToDelete] = useState<string | null>(null);
    const [isProcessingDelete, setIsProcessingDelete] = useState(false);
    const [isSendingOtp, setIsSendingOtp] = useState(false);
    const [otpAction, setOtpAction] = useState<'CREATE' | 'UPDATE' | 'DELETE' | 'ADMIN_ACCESS' | null>(null);

    // Subscription State
    const [subEmail, setSubEmail] = useState('');
    const [isSubscribing, setIsSubscribing] = useState(false);

    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        return sessionStorage.getItem('admin_access') === 'true';
    });

    const fetchPosts = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Deep Linking Support: Open post if ID is in URL
    useEffect(() => {
        const handleDeepLink = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const postId = urlParams.get('id');
            if (postId && selectedPost?.id !== postId) {
                const localPost = posts.find(p => p.id === postId);
                if (localPost) {
                    handleReadPacket(localPost);
                } else if (!isLoading && posts.length > 0) {
                    try {
                        const response = await fetch(`/api/blog?id=${postId}`);
                        if (response.ok) {
                            const fullPost = await response.json();
                            handleReadPacket(fullPost);
                        }
                    } catch (error) {
                        console.error('Deep link fetch failed:', error);
                    }
                }
            }
        };

        if (!isLoading) {
            handleDeepLink();
        }
    }, [posts, isLoading, selectedPost?.id]);

    // Sorting & Filtering
    const filteredPosts = posts
        .filter(post => 
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            post.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => b.timestamp - a.timestamp);

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
        const cleanAlt = alt.replace(/[[\]()\n\r]/g, '').trim();
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

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            handleImageInsert(base64String, file.name);
        };
        reader.readAsDataURL(file);
    };

    const insertFormat = (format: 'bold' | 'italic' | 'code' | 'list' | 'image' | 'h1' | 'h2' | 'quote' | 'link') => {
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
            case 'h1':
                newText = text.substring(0, start) + `\n# ${text.substring(start, end)}` + text.substring(end);
                newCursorPos = end + 3;
                break;
            case 'h2':
                newText = text.substring(0, start) + `\n## ${text.substring(start, end)}` + text.substring(end);
                newCursorPos = end + 4;
                break;
            case 'quote':
                newText = text.substring(0, start) + `\n> ${text.substring(start, end)}` + text.substring(end);
                newCursorPos = end + 3;
                break;
            case 'link':
                newText = text.substring(0, start) + `[${text.substring(start, end)}](url)` + text.substring(end);
                newCursorPos = start + text.substring(start, end).length + 3;
                break;
            case 'image':
                openImageModal('content');
                return;
        }

        setFormData(prev => ({ ...prev, content: newText }));

        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        }, 0);
    };

    const handlePublish = (e: React.FormEvent) => {
        e.preventDefault();
        const action = currentId ? 'UPDATE' : 'CREATE';
        setOtpAction(action);
        setShowOtpModal(true);
        sendOtp(action);
    };

    const executePublish = async () => {
        const now = new Date();
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
                const response = await fetch(`/api/blog?otp=${otpValue}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...basePostData, id: currentId })
                });

                if (response.ok) {
                    showNotification('success', 'PACKET_UPDATED_SUCCESSFULLY');
                    fetchPosts();
                    resetForm();
                    setShowOtpModal(false);
                    setOtpValue('');
                } else {
                    const errorData = await response.json();
                    showNotification('dev', `UPDATE_FAILED: ${errorData.error || 'Unknown'}`);
                }
            } else {
                const response = await fetch(`/api/blog?otp=${otpValue}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(basePostData)
                });

                if (response.ok) {
                    showNotification('success', 'PACKET_DEPLOYED_SUCCESSFULLY');
                    fetchPosts();
                    resetForm();
                    setShowOtpModal(false);
                    setOtpValue('');
                } else {
                    const errorData = await response.json();
                    showNotification('dev', `DEPLOY_FAILED: ${errorData.error || 'Unknown'}`);
                }
            }
        } catch (error) {
            console.error('Publish error:', error);
            showNotification('dev', 'NETWORK_ERROR');
        }
    };

    const handleEdit = async (post: BlogPost) => {
        setFormData({
            title: post.title,
            description: post.description,
            content: post.content || '',
            coverImage: post.coverImage || ''
        });
        setCurrentId(post.id);
        setIsEditing(true);
        setViewMode('studio');
        setPreviewMode(false);
        setEditFlash(true);
        setTimeout(() => setEditFlash(false), 1200);

        if (!post.content) {
            try {
                const response = await fetch(`/api/blog?id=${post.id}`);
                if (response.ok) {
                    const fullPost = await response.json();
                    setFormData(prev => ({
                        ...prev,
                        content: fullPost.content || ''
                    }));
                    setPosts(prev => prev.map(p => p.id === post.id ? fullPost : p));
                }
            } catch (error) {
                console.error('Failed to fetch full post for editing:', error);
                showNotification('dev', 'FAILED_TO_LOAD_CONTENT');
            }
        }
    };

    const handleDelete = (id: string) => {
        setIdToDelete(id);
        setOtpAction('DELETE');
        setShowOtpModal(true);
        sendOtp('DELETE');
    };

    const sendOtp = async (action: string | null = otpAction) => {
        setIsSendingOtp(true);
        try {
            const response = await fetch('/api/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: action || 'VERIFY' })
            });
            if (response.ok) {
                showNotification('success', 'AUTHORIZATION_CODE_TRANSMITTED');
            } else {
                showNotification('dev', 'OTP_TRANSMISSION_FAILED');
            }
        } catch (error) {
            console.error('OTP Error:', error);
            showNotification('dev', 'NETWORK_ERROR');
        } finally {
            setIsSendingOtp(false);
        }
    };

    const handleOtpConfirm = async () => {
        if (!otpValue || otpValue.length !== 6) return;

        setIsProcessingDelete(true);
        try {
            if (otpAction === 'DELETE') {
                await confirmDelete();
            } else if (otpAction === 'ADMIN_ACCESS') {
                await verifyAdminAccess();
            } else {
                await executePublish();
            }
        } finally {
            setIsProcessingDelete(false);
        }
    };

    const initiateAdminLogin = () => {
        setOtpAction('ADMIN_ACCESS');
        setShowOtpModal(true);
        sendOtp('ADMIN_ACCESS');
    };

    const verifyAdminAccess = async () => {
        setIsVerifyingAdmin(true);
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp: otpValue })
            });

            if (response.ok) {
                setIsAdmin(true);
                sessionStorage.setItem('admin_access', 'true');
                showNotification('success', 'ADMIN_ACCESS_GRANTED');
                setShowOtpModal(false);
                setOtpValue('');
            } else {
                const errorData = await response.json();
                showNotification('dev', `ACCESS_DENIED: ${errorData.error || 'Invalid OTP'}`);
            }
        } catch (error) {
            console.error('Admin Auth Error:', error);
            showNotification('dev', 'AUTH_SYSTEM_OFFLINE');
        } finally {
            setIsVerifyingAdmin(false);
        }
    };

    const confirmDelete = async () => {
        if (!idToDelete || !otpValue) return;

        try {
            const response = await fetch(`/api/blog?id=${idToDelete}&otp=${otpValue}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setPosts(prev => prev.filter(p => p.id !== idToDelete));
                showNotification('dev', 'PACKET_PURGED_SUCCESSFULLY');
                setShowOtpModal(false);
                setOtpValue('');
                setIdToDelete(null);
            } else {
                const errorData = await response.json();
                showNotification('dev', `ACCESS_DENIED: ${errorData.error || 'Invalid OTP'}`);
            }
        } catch (error) {
            console.error('Delete error:', error);
            showNotification('dev', 'NETWORK_ERROR');
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', content: '', coverImage: '' });
        setCurrentId(null);
        setIsEditing(false);
        setViewMode('reader');
    };

    const handleAdminLogout = () => {
        setIsAdmin(false);
        sessionStorage.removeItem('admin_access');
        showNotification('success', 'ADMIN_SESSION_TERMINATED');
        setViewMode('reader');
    };

    const showNotification = (type: 'success' | 'dev', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleReadPacket = async (post: BlogPost) => {
        setSelectedPost(post);
        document.body.style.overflow = 'hidden';

        if (!post.content) {
            try {
                const response = await fetch(`/api/blog?id=${post.id}`);
                if (response.ok) {
                    const fullPost = await response.json();
                    setSelectedPost(current => {
                        if (current && current.id === post.id) return fullPost;
                        return current;
                    });
                    setPosts(prev => prev.map(p => p.id === post.id ? fullPost : p));
                }
            } catch (error) {
                console.error("Failed to load post content:", error);
            }
        }
    };

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!subEmail || !subEmail.includes('@')) {
            showNotification('dev', 'INVALID_EMAIL_FORMAT');
            return;
        }

        setIsSubscribing(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: subEmail })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === 'ALREADY_SUBSCRIBED') {
                    showNotification('success', 'ALREADY_SYNCHRONIZED');
                } else {
                    showNotification('success', 'TRANSMISSION_LINKED_SUCCESSFULLY');
                }
                setSubEmail('');
            } else {
                showNotification('dev', 'SUBSCRIPTION_LINK_FAILED');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            showNotification('dev', 'NETWORK_LATENCY_ERROR');
        } finally {
            setIsSubscribing(false);
        }
    };

    const closeReader = () => {
        setSelectedPost(null);
        document.body.style.overflow = 'unset';
        const url = new URL(window.location.href);
        if (url.searchParams.has('id')) {
            url.searchParams.delete('id');
            window.history.pushState({}, '', url.toString());
        }
    };

    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-16 md:pb-24 px-4 sm:px-6 relative overflow-hidden">
            <OtpModal
                show={showOtpModal}
                otpValue={otpValue}
                setOtpValue={setOtpValue}
                idToDelete={idToDelete}
                isProcessing={isProcessingDelete}
                isSending={isSendingOtp}
                action={otpAction}
                onConfirm={handleOtpConfirm}
                onResend={sendOtp}
                onClose={() => {
                    if (!isProcessingDelete) {
                        setShowOtpModal(false);
                        setOtpValue('');
                        setIdToDelete(null);
                        setOtpAction(null);
                    }
                }}
            />

            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
                <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>

            <div className="responsive-container">
                {/* HERO SECTION */}
                <div className="mb-12 md:mb-20 space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono"
                            >
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                KNOWLEDGE_STREAM // V2.0
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[0.9] tracking-tighter overflow-hidden"
                            >
                                <span className="block text-reveal">Thoughts</span>
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 shimmer-premium text-reveal" style={{ animationDelay: '0.2s' }}>
                                    & Insights.
                                </span>
                            </motion.h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {isAdmin && (
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (viewMode === 'studio') setViewMode('reader');
                                        else setViewMode('studio');
                                    }}
                                    className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-[10px] font-mono font-bold transition-all border magnetic-hover spring-press ${viewMode === 'studio' ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-blue-500/30'}`}
                                >
                                    {viewMode === 'studio' ? <Layout size={16} /> : <Plus size={16} />}
                                    {viewMode === 'studio' ? 'EXIT_STUDIO' : 'NEW_TRANSMISSION'}
                                </motion.button>
                            )}
                            <div className="relative group flex-grow md:flex-grow-0">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] group-focus-within:text-blue-400 transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    placeholder="Search packets..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full md:w-64 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl pl-12 pr-6 py-4 text-sm font-mono focus:outline-none focus:border-blue-500/40 transition-all glass-premium shadow-premium input-glow"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-[var(--text-dim)] text-xl max-w-2xl font-light leading-relaxed border-l-2 border-blue-500/30 pl-6"
                    >
                        Exploring the architecture of distributed systems, the elegance of data engineering, 
                        and the evolution of AI through technical deep-dives and philosophical musings.
                    </motion.p>
                </div>

                <AnimatePresence mode="wait">
                    {viewMode === 'reader' ? (
                        <motion.div
                            key="reader-view"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12"
                        >
                            {/* MAIN FEED */}
                            <div className="lg:col-span-8 space-y-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.3em]">
                                        Buffer_Stream // {filteredPosts.length} Packets
                                    </h2>
                                    <div className="h-px flex-grow mx-6 bg-gradient-to-r from-blue-500/20 to-transparent" />
                                </div>
                                <ThoughtsList
                                    posts={filteredPosts}
                                    isLoading={isLoading}
                                    isAdmin={isAdmin}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                    onRead={handleReadPacket}
                                    isMobile={isMobile}
                                />
                            </div>

                            {/* SIDEBAR */}
                            <div className="lg:col-span-4 space-y-8">
                                <Newsletter
                                    subEmail={subEmail}
                                    setSubEmail={setSubEmail}
                                    isSubscribing={isSubscribing}
                                    handleSubscribe={handleSubscribe}
                                />
                                <div className="glass-premium rounded-[2.5rem] overflow-hidden">
                                    <ForgeIndicta />
                                </div>
                                
                                {!isAdmin && (
                                    <div className="p-8 rounded-[2.5rem] bg-[var(--bg-card)] border border-[var(--border-color)] glass flex flex-col items-center text-center space-y-4">
                                        <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Administrative Uplink</div>
                                        <button 
                                            onClick={initiateAdminLogin}
                                            className="text-[9px] font-mono text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-[0.2em] underline underline-offset-4"
                                        >
                                            Initialize_Studio_Access
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="studio-view"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                        >
                            <ThoughtsStudio
                                isAdmin={isAdmin}
                                isEditing={isEditing}
                                formData={formData as BlogPost}
                                handleInputChange={handleInputChange}
                                handlePublish={handlePublish}
                                resetForm={resetForm}
                                previewMode={previewMode}
                                setPreviewMode={setPreviewMode}
                                notification={notification}
                                openImageModal={openImageModal}
                                insertFormat={insertFormat}
                                handleAdminLogout={handleAdminLogout}
                                initiateAdminLogin={initiateAdminLogin}
                                editFlash={editFlash}
                                textareaRef={textareaRef}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Modals & Overlays */}
            <AnimatePresence>
                {selectedPost && (
                    <ThoughtsReader
                        post={selectedPost}
                        onClose={closeReader}
                        showNotification={showNotification}
                    />
                )}
            </AnimatePresence>

            {/* Image Insertion Modal */}
            <AnimatePresence>
                {showImageModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--bg-primary)]/80 backdrop-blur-xl"
                        onClick={() => setShowImageModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-[var(--bg-card)] w-full max-w-md rounded-[2rem] border border-[var(--border-color)] p-8 shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-[var(--text-primary)]">
                                    <ImageIcon className="text-blue-500" />
                                    Insert Media
                                </h3>
                                <button onClick={() => setShowImageModal(false)} className="p-2 rounded-full hover:bg-[var(--nav-hover)] transition-colors">
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
                                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 transition-all text-sm font-light text-[var(--text-primary)] placeholder:text-[var(--text-subtle)]"
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
                                    <div className="h-px flex-grow bg-[var(--border-color)]" />
                                    <span className="text-[10px] font-mono text-[var(--text-muted)]">OR</span>
                                    <div className="h-px flex-grow bg-[var(--border-color)]" />
                                </div>

                                {/* Option 2: Upload */}
                                <div
                                    className="border-2 border-dashed border-[var(--border-color)] rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all cursor-pointer group"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border-color)] group-hover:scale-110 transition-transform">
                                        <Upload size={24} className="text-[var(--text-dim)] group-hover:text-blue-400 transition-colors" />
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
        </div>
    );
};

export default Thoughts;
