
import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
        img.onerror = () => setError(true);
    }, [src]);

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Shimmer/Skeleton Placeholder */}
            <AnimatePresence>
                {!isLoaded && !error && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-white/5 animate-pulse flex items-center justify-center"
                    >
                        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-shimmer"
                            style={{
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s infinite'
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Actual Image */}
            <motion.img
                src={src}
                alt={alt}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{
                    opacity: isLoaded ? 1 : 0,
                    scale: isLoaded ? 1 : 1.1
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                className={`w-full h-full object-cover ${isLoaded ? '' : 'invisible'}`}
            />

            {/* Error State */}
            {error && (
                <div className="absolute inset-0 bg-white/5 flex items-center justify-center text-xs text-white/30">
                    Failed to load image
                </div>
            )}

            {/* Style for Shimmer Animation */}
            <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
        </div>
    );
};

export default OptimizedImage;
