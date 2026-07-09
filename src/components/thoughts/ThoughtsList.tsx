
import React from 'react';
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

const ThoughtsList: React.FC<ThoughtsListProps> = ({ posts, isLoading, isAdmin, onEdit, onDelete, onRead, isMobile }) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {[1, 2, 3, 4].map((idx) => (
                    <div
                        key={`skeleton-${idx}`}
                        className="group relative p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] bg-[var(--bg-card)] border border-[var(--border-color)] shadow-premium overflow-hidden glass animate-pulse"
                    >
                        <div className="relative z-10 w-full h-full flex flex-col">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3 w-1/3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                                    <div className="w-full h-3 rounded-full bg-blue-500/10" />
                                </div>
                            </div>
                            <div className="mb-6 rounded-xl h-48 bg-[var(--border-color)] w-full" />
                            <div className="w-3/4 h-8 rounded-lg bg-[var(--border-color)] mb-4" />
                            <div className="w-full h-4 rounded-full bg-[var(--border-color)] mb-2" />
                            <div className="w-5/6 h-4 rounded-full bg-[var(--border-color)] mb-8" />
                            <div className="flex justify-between items-center pt-6 border-t border-[var(--border-color)] mt-auto">
                                <div className="w-32 h-3 rounded-full bg-blue-500/20" />
                                <div className="w-16 h-3 rounded-full bg-[var(--border-color)]" />
                            </div>
                        </div>
                    </div>
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
