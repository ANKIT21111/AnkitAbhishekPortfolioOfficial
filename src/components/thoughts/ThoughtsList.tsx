
import React from 'react';
import { motion } from 'framer-motion';
import BlogPostCard from './BlogPostCard';

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

interface ThoughtsListProps {
    posts: BlogPost[];
    isLoading: boolean;
    isAdmin: boolean;
    onEdit: (post: BlogPost) => void;
    onDelete: (id: string) => void;
    onRead: (post: BlogPost) => void;
    isMobile: boolean;
}

const SkeletonCard: React.FC<{ delay: number }> = ({ delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
        className="shimmer-card group relative p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-premium glass overflow-hidden"
    >
        {/* Scan-beam sweeping line */}
        <div className="scan-beam" />

        {/* Corner accent */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-40">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        <div className="relative z-10 w-full flex flex-col">
            {/* Date badge */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-blue-500/40" />
                <div className="w-24 h-2.5 rounded-full bg-blue-500/15" />
            </div>

            {/* Cover image placeholder */}
            <div className="mb-6 rounded-xl h-44 bg-gradient-to-br from-[var(--border-color)] via-blue-950/20 to-[var(--border-color)] w-full" />

            {/* Title lines */}
            <div className="w-4/5 h-6 rounded-lg bg-[var(--border-color)] mb-3" />
            <div className="w-1/2 h-4 rounded-lg bg-[var(--border-color)] mb-6" />

            {/* Body lines */}
            <div className="space-y-2 mb-8">
                <div className="w-full h-3 rounded-full bg-[var(--border-color)]" />
                <div className="w-11/12 h-3 rounded-full bg-[var(--border-color)]" />
                <div className="w-3/4 h-3 rounded-full bg-[var(--border-color)]" />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center pt-5 border-t border-[var(--border-color)]">
                <div className="w-28 h-2.5 rounded-full bg-blue-500/20" />
                <div className="w-14 h-2.5 rounded-full bg-[var(--border-color)]" />
            </div>
        </div>
    </motion.div>
);

const ThoughtsList: React.FC<ThoughtsListProps> = ({ posts, isLoading, isAdmin, onEdit, onDelete, onRead, isMobile }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[0, 1, 2, 3].map((idx) => (
                    <SkeletonCard key={`skeleton-${idx}`} delay={idx * 0.12} />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="p-12 rounded-[2rem] border border-dashed border-[var(--border-color)] text-center bg-[var(--bg-card)] glass">
                <p className="text-[var(--text-muted)] font-mono text-sm uppercase tracking-widest">NO_DATA_PACKETS_FOUND_IN_STREAM</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {posts.map((post) => (
                <BlogPostCard
                    key={post.id}
                    post={post}
                    isAdmin={isAdmin}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRead={onRead}
                    isMobile={isMobile}
                />
            ))}
        </div>
    );
};

export default ThoughtsList;
