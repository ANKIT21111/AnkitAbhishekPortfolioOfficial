
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className, priority = false }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    return (
        <div className={`relative overflow-hidden bg-white/5 ${className}`}>
            {/* Shimmer Placeholder */}
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer"
                            style={{
                                backgroundSize: '200% 100%',
                            }}
                        />
                        {/* Static placeholder while waiting */}
                        <div className="w-full h-full bg-[#1a1a1a]" />
                    </motion.div>
                )}
            </AnimatePresence>


            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, filter: 'blur(4px)', scale: 1.02 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    filter: isLoaded ? 'blur(0px)' : 'blur(4px)',
                    scale: isLoaded ? 1 : 1.02
                }}
                onLoad={() => setIsLoaded(true)}
                onError={() => setError(true)}
                transition={{ duration: 0.4, ease: "easeOut" }}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover"
            />

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 bg-white/5 flex flex-col items-center justify-center text-[10px] text-white/20 p-4 text-center">
                    <svg className="w-6 h-6 mb-2 opacity-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Image Unavailable
                </div>
            )}

            {/* Style for Shimmer Animation */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .animate-shimmer {
                    animation: shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default OptimizedImage;
