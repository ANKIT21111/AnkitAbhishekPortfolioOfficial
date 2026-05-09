
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Lock as LockIcon,
    Shield as ShieldIcon,
} from 'lucide-react';

interface OtpModalProps {
    show: boolean;
    otpValue: string;
    setOtpValue: (val: string) => void;
    idToDelete: string | null;
    isProcessing: boolean;
    isSending: boolean;
    action: 'CREATE' | 'UPDATE' | 'DELETE' | 'ADMIN_ACCESS' | null;
    onConfirm: () => void;
    onResend: () => void;
    onClose: () => void;
}

const OtpModal = ({
    show, otpValue, setOtpValue, idToDelete,
    isProcessing, isSending, action, onConfirm, onResend, onClose
}: OtpModalProps) => {
    useEffect(() => {
        if (!show) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isProcessing) onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [show, isProcessing, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6 bg-[var(--bg-primary)]/80 backdrop-blur-2xl"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="bg-[var(--bg-card)] w-full max-w-sm rounded-[3rem] border border-[var(--border-color)] p-0 shadow-2xl relative overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Status Header */}
                        <div className="bg-red-500/10 px-6 py-4 flex items-center justify-between border-b border-red-500/20">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-red-500/30" />
                                <div className="w-2 h-2 rounded-full bg-red-500/30" />
                            </div>
                            <span className="text-[10px] font-mono text-red-400 tracking-[0.3em] uppercase font-bold">
                                {action === 'DELETE' ? 'SECURITY_OVERRIDE' : (action === 'ADMIN_ACCESS' ? 'ADMIN_UPLINK_REQUIRED' : 'AUTHORIZATION_REQUIRED')}
                            </span>
                        </div>

                    {/* Modal Body */}
                    <div className="p-6 sm:p-8 relative space-y-6 sm:space-y-8">
                        {/* Decorative Grid/Noise */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/20 animate-[scanning_3s_linear_infinite] shadow-[0_0_15px_rgba(239,68,68,0.5)]" style={{ animationName: 'scanning' }} />

                        <style>{`
                            @keyframes scanning {
                                0% { top: 0; opacity: 0; }
                                50% { opacity: 1; }
                                100% { top: 100%; opacity: 0; }
                            }
                        `}</style>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10 text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-red-500/5 rounded-full border border-red-500/10 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(239,68,68,0.05)]">
                                <LockIcon size={32} className="text-red-500 mb-1" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] tracking-tight">Authorization Required</h3>
                                <p className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-widest">
                                    {action === 'DELETE' ? `Target_Packet: ${idToDelete?.substring(0, 12)}...` : (action === 'ADMIN_ACCESS' ? 'Target_Node: ADMIN_CONSOLE' : 'Target_Stream: SYSTEM_STORAGE')}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-6 relative z-10"
                        >
                            <p className="text-[var(--text-dim)] text-xs text-center leading-relaxed">
                                {action === 'DELETE' 
                                    ? 'Administrative privileges required for data purging. Enter the 6-digit transmission code sent to your terminal.'
                                    : (action === 'ADMIN_ACCESS' 
                                        ? 'Establishing administrative uplink require primary node authorization. Enter the code sent to your terminal.'
                                        : 'Administrative privileges required for system modification. Enter the 6-digit transmission code sent to your terminal.')}
                            </p>

                            <div className="space-y-3">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        maxLength={6}
                                        value={otpValue}
                                        onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, ''))}
                                        placeholder="••••••"
                                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-4 md:px-6 py-4 md:py-5 text-center text-xl md:text-4xl font-mono tracking-[0.2em] md:tracking-[0.4em] focus:outline-none focus:border-red-500/40 transition-all text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] shadow-inner"
                                        autoFocus
                                    />
                                    {isProcessing && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                            <div className="flex gap-2">
                                                <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0s' }} />
                                                <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                                                <div className="w-2 h-2 rounded-full bg-red-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <button
                                        onClick={onResend}
                                        disabled={isSending}
                                        className="text-[9px] font-mono text-blue-400/60 hover:text-blue-400 transition-colors uppercase tracking-widest disabled:opacity-30"
                                    >
                                        {isSending ? 'SENDING_STREAM...' : 'RESEND_CODE'}
                                    </button>
                                    <div className="flex items-center gap-1 text-[9px] font-mono text-gray-600">
                                        <ShieldIcon size={10} /> ENCRYPTED_V2
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 pt-4">
                                <button
                                    onClick={onConfirm}
                                    disabled={otpValue.length !== 6 || isProcessing}
                                    className="w-full py-4 sm:py-5 bg-[var(--text-primary)] text-[var(--bg-primary)] font-bold rounded-2xl hover:bg-black dark:hover:bg-white transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed text-[10px] sm:text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-red-500/20 overflow-hidden relative group"
                                >
                                    <span className="relative z-10">
                                        {isProcessing 
                                            ? (action === 'DELETE' ? 'PURGING_DATA_STREAM...' : 'SYNCING_DATA_STREAM...') 
                                            : (action === 'DELETE' ? 'CONFIRM_PURGE' : 'CONFIRM_MODIFICATION')}
                                    </span>
                                    <div className={`absolute inset-0 ${action === 'DELETE' ? 'bg-red-600' : 'bg-blue-600'} translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none`} />
                                </button>
                                <button
                                    onClick={onClose}
                                    disabled={isProcessing}
                                    className="w-full py-2 text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors uppercase tracking-[0.2em] disabled:opacity-0"
                                >
                                    ABORT_SESSION
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Terminal Footer */}
                    <div className="px-8 py-3 bg-[var(--nav-hover)] border-t border-[var(--border-color)] flex justify-between items-center text-[8px] font-mono text-[var(--text-subtle)]">
                        <span>AUTH_LEVEL: ADMIN</span>
                        <span>NODE_VERIFIED_V2</span>
                    </div>
                </motion.div>
            </motion.div>
            )}
        </AnimatePresence>
    );
};

export default OtpModal;
