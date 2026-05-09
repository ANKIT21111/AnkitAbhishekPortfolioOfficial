
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    X,
    Clock,
    Calendar,
    Linkedin,
    Instagram,
    Link as LinkIcon,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

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

interface ThoughtsReaderProps {
    post: BlogPost;
    onClose: () => void;
    showNotification?: (type: 'success' | 'dev', msg: string) => void;
}

const ThoughtsReader: React.FC<ThoughtsReaderProps> = ({ post, onClose, showNotification }) => {
    const shareUrl = `${window.location.origin}/thoughts?id=${post.id}`;
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        const handleScroll = () => {
            if (contentRef.current) {
                const element = contentRef.current;
                const totalHeight = element.scrollHeight - element.clientHeight;
                const windowScrollTop = element.scrollTop;
                if (totalHeight === 0) return;
                const scrollPercent = (windowScrollTop / totalHeight) * 100;
                setScrollProgress(scrollPercent);
            }
        };

        const element = contentRef.current;
        if (element) {
            element.addEventListener('scroll', handleScroll);
            return () => element.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        const originalTitle = document.title;
        const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
        
        document.title = `${post.title} | Ankit Abhishek's Thoughts`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.setAttribute('content', post.description);

        return () => {
            document.title = originalTitle;
            if (metaDesc) metaDesc.setAttribute('content', originalDescription);
        };
    }, [post]);

    const calculateReadingTime = (text: string) => {
        if (!text) return 0;
        const wordsPerMinute = 200;
        const noOfWords = text.split(/\s+/).length;
        const minutes = noOfWords / wordsPerMinute;
        return Math.ceil(minutes);
    };

    const handleShare = (platform: 'linkedin' | 'substack' | 'instagram' | 'copy') => {
        if (platform === 'linkedin') {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(shareUrl);
            showNotification?.('success', 'LINK_COPIED_TO_CLIPBOARD');
        } else if (platform === 'instagram') {
            navigator.clipboard.writeText(shareUrl);
            showNotification?.('success', 'LINK_COPIED_FOR_INSTAGRAM');
            window.open('https://www.instagram.com/', '_blank');
        } else if (platform === 'substack') {
            navigator.clipboard.writeText(shareUrl);
            showNotification?.('success', 'LINK_COPIED_FOR_SUBSTACK');
            window.open('https://substack.com/', '_blank');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="bg-[var(--bg-primary)] w-full max-w-7xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-[2.5rem] border border-[var(--border-color)] shadow-premium overflow-hidden flex flex-col relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Scroll Progress Bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-[60]">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600"
                        style={{ width: `${scrollProgress}%` }}
                    />
                </div>

                {/* Header */}
                <div className="px-4 md:px-10 py-4 md:py-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)] backdrop-blur-md sticky top-0 z-[160]">
                    <div className="flex items-center gap-3 md:gap-6">
                        <div className="hidden xs:flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                        </div>
                        <div className="h-4 w-px bg-[var(--border-color)] hidden sm:block" />
                        <div className="flex flex-col">
                            <span className="text-[8px] md:text-[9px] font-mono text-blue-400 uppercase tracking-[0.2em] font-bold">
                                KNOWLEDGE_STREAM // 0x{post.id.substring(0, 4)}
                            </span>
                            <span className="text-[9px] md:text-[10px] text-[var(--text-muted)] font-mono">
                                AUTHOR: ANKIT_ABHISHEK
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 md:gap-4">
                        <div className="hidden lg:flex items-center gap-4 px-4 py-1.5 rounded-full bg-[var(--nav-hover)] border border-[var(--border-color)]">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-[var(--text-dim)]">
                                <Clock size={12} className="text-blue-500" />
                                {calculateReadingTime(post.content || '')} MIN READ
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--nav-hover)] hover:bg-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-all border border-[var(--border-color)] hover:border-blue-500/30 active:scale-95 shadow-lg relative z-[170]"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div
                    ref={contentRef}
                    className="flex-grow overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.03),transparent)]"
                >
                    {post.coverImage && (
                        <div className="w-full h-[300px] md:h-[450px] relative overflow-hidden">
                            <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                        </div>
                    )}

                    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 md:py-16 max-w-5xl mx-auto">
                        {/* Meta Tags */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 md:mb-12">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] sm:text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                                <Calendar size={12} /> {post.date}
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-[9px] sm:text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                                <Clock size={12} /> {post.time}
                            </div>
                            <div className="h-px w-8 sm:w-12 bg-[var(--border-color)]" />
                            <div className="text-[9px] sm:text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em]">
                                STATUS: DEPLOYED
                            </div>
                        </div>

                        {/* Article Header */}
                        <div className="space-y-4 md:space-y-6 mb-12 md:mb-16">
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[var(--text-primary)] leading-[1.2] md:leading-[1.1] tracking-tight">
                                {post.title}
                            </h1>
                            {post.description && (
                                <p className="text-lg md:text-xl lg:text-2xl text-[var(--text-dim)] font-light leading-relaxed border-l-2 border-blue-500/30 pl-4 md:pl-8 italic">
                                    {post.description}
                                </p>
                            )}
                        </div>

                        {/* Body Content */}
                        <article className="prose dark:prose-invert prose-base sm:prose-lg lg:prose-xl max-w-none 
                            prose-headings:text-[var(--text-primary)] prose-headings:font-black prose-headings:tracking-tight
                            prose-p:text-[var(--text-dim)] prose-p:leading-[1.8] prose-p:font-light
                            prose-strong:text-[var(--text-primary)] prose-strong:font-bold
                            prose-a:text-blue-400 prose-a:transition-colors hover:prose-a:text-blue-300
                            prose-code:text-blue-300 prose-code:bg-blue-900/20 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none
                            prose-pre:bg-[var(--bg-secondary)] prose-pre:border prose-pre:border-[var(--border-color)] prose-pre:rounded-2xl prose-pre:shadow-2xl
                            prose-blockquote:border-l-4 prose-blockquote:border-blue-500/50 prose-blockquote:bg-blue-500/5 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic
                            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-[var(--border-color)]
                            text-[var(--text-dim)]"
                        >
                            <ReactMarkdown
                                urlTransform={(uri) => uri}
                                components={{
                                    img: ({ ...props }) => (
                                        <div className="my-12 relative group">
                                            <div className="absolute -inset-4 bg-blue-500/10 rounded-[2.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                            <img
                                                {...props}
                                                className="w-full h-auto object-contain relative z-10 rounded-[2rem] border border-[var(--border-color)] shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.style.display = 'none';
                                                    if (target.parentElement) {
                                                        const errorDiv = document.createElement('div');
                                                        errorDiv.className = "p-12 text-center rounded-[2rem] bg-[var(--nav-hover)] border border-dashed border-[var(--border-color)]";
                                                        errorDiv.innerHTML = `<p class="text-[10px] font-mono text-[var(--text-subtle)] uppercase tracking-[0.2em]">PACKET_DECODING_ERROR: BUFFER_OVERFLOW</p>`;
                                                        target.parentElement.appendChild(errorDiv);
                                                    }
                                                }}
                                            />
                                        </div>
                                    ),
                                    h2: ({ ...props }) => <h2 className="text-2xl md:text-3xl mt-16 mb-8 flex items-center gap-4" {...props}>
                                        <span className="w-8 h-1 bg-blue-500/30 rounded-full" />
                                        {props.children}
                                    </h2>
                                }}
                            >
                                {post.content || 'Decrypting_Data_Stream...'}
                            </ReactMarkdown>

                        </article>

                        {/* Post Footer / Sharing */}
                        <div className="mt-20 pt-10 border-t border-[var(--border-color)] flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/30">
                                    <img src="/forgeindicta_logo.webp" alt="Ankit Abhishek" className="w-full h-full object-cover" />
                                </div>

                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-[var(--text-primary)]">Ankit Abhishek</span>
                                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Data Engineer & Content Architect</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] mr-2">Spread the Insight:</span>
                                <button
                                    onClick={() => handleShare('linkedin')}
                                    className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all active:scale-95"
                                >
                                    <Linkedin size={18} />
                                </button>
                                <button
                                    onClick={() => handleShare('substack')}
                                    className="p-3 rounded-2xl bg-[#FF6719]/10 border border-[#FF6719]/20 text-[#FF6719] hover:bg-[#FF6719] hover:text-white transition-all active:scale-95"
                                >
                                    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
                                        <path d="M22.539 8.242H1.46V5.405h21.079v2.837zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.837h21.079V0z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleShare('instagram')}
                                    className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#E1306C]/10 border border-[#E1306C]/20 text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-all active:scale-95"
                                >
                                    <Instagram size={18} />
                                </button>
                                <button
                                    onClick={() => handleShare('copy')}
                                    className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--nav-hover)] border border-[var(--border-color)] text-[var(--text-dim)] hover:text-[var(--text-primary)] hover:border-blue-500/50 transition-all active:scale-95"
                                >
                                    <LinkIcon size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="px-10 py-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] backdrop-blur-md flex justify-between items-center text-[9px] font-mono text-[var(--text-muted)] tracking-[0.2em]">
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                        CONNECTION_STABLE // STREAM_COMPLETED
                    </div>
                    <div className="flex items-center gap-4">
                        <span>EST_LATENCY: 14MS</span>
                        <span>NODE: SOUTHEAST_ASIA_1</span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ThoughtsReader;
