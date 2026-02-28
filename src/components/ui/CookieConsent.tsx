
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check } from 'lucide-react';

const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:max-w-md z-[100]"
                >
                    <div className="glass-morphism p-6 rounded-2xl border border-blue-500/20 shadow-2xl relative overflow-hidden group">
                        {/* Animated background glow */}
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500"></div>

                        <div className="relative z-10">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400">
                                    <Cookie size={24} />
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                                        Cookie & Privacy Settings
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                                        I use cookies to enhance your experience, analyze site traffic, and protect my creative assets.
                                        Your privacy is my topmost priority.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsVisible(false)}
                                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    onClick={handleAccept}
                                    className="flex-grow flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all active:scale-95 shadow-lg shadow-blue-500/25"
                                >
                                    <Check size={16} /> Accept All
                                </button>
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2.5 bg-transparent hover:bg-white/5 border border-white/10 text-[var(--text-secondary)] rounded-xl font-medium text-sm transition-all active:scale-95"
                                >
                                    Decline
                                </button>
                            </div>

                            <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                                <span>GDPR & CCPA COMPLIANT</span>
                                <a href="/privacy" className="hover:text-blue-400 underline decoration-blue-400/30 transition-all">REVIEWS POLICY</a>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
