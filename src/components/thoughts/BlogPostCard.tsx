
import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Trash2, Clock, ChevronRight } from 'lucide-react';

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

interface BlogPostCardProps {
    post: BlogPost;
    isAdmin: boolean;
    onEdit: (post: BlogPost) => void;
    onDelete: (id: string) => void;
    onRead: (post: BlogPost) => void;
    isMobile: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, isAdmin, onEdit, onDelete, onRead, isMobile }) => {
    return (
        <motion.div
            layout
            initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={isMobile ? { duration: 0.3 } : { duration: 0.4 }}
            className="group relative p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-blue-500/30 transition-all duration-500 hover:bg-[var(--bg-secondary)] glass shadow-premium overflow-hidden h-full flex flex-col"
        >
            {/* Hover Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                            <span className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-[0.2em]">
                                {post.date}
                            </span>
                        </div>
                    </div>
                    {isAdmin && (
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); onEdit(post); }}
                                className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[var(--nav-hover)] border border-[var(--border-color)] hover:border-blue-500/30 text-[var(--text-muted)] hover:text-blue-400 transition-all active:scale-90"
                                title="Reconfig Packet"
                            >
                                <Edit3 size={isMobile ? 12 : 14} />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
                                className="p-2 sm:p-2.5 rounded-lg sm:rounded-xl bg-[var(--nav-hover)] border border-[var(--border-color)] hover:border-red-500/30 text-[var(--text-muted)] hover:text-red-400 transition-all active:scale-90"
                                title="Purge Stream"
                            >
                                <Trash2 size={isMobile ? 12 : 14} />
                            </button>
                        </div>
                    )}
                </div>

                {post.coverImage && (
                    <div className="mb-6 rounded-2xl overflow-hidden h-48 border border-[var(--border-color)] relative">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}

                <h3 className="text-xl sm:text-2xl font-black text-[var(--text-primary)] mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight tracking-tight">
                    {post.title}
                </h3>

                <p className="text-[var(--text-dim)] text-xs sm:text-sm leading-relaxed mb-8 line-clamp-3 font-light flex-grow">
                    {post.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)] mt-auto">
                    <button
                        onClick={() => onRead(post)}
                        className="text-[10px] font-mono font-black text-[var(--text-dim)] flex items-center gap-3 group/btn hover:text-blue-400 transition-all tracking-[0.3em] uppercase"
                    >
                        Infiltrate_Stream <ChevronRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform text-blue-500" />
                    </button>
                    <div className="flex items-center gap-2 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                        <Clock size={10} /> {post.time}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogPostCard;
