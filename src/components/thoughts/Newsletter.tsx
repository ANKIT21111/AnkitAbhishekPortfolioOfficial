
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ChevronRight } from 'lucide-react';

interface NewsletterProps {
    subEmail: string;
    setSubEmail: (email: string) => void;
    isSubscribing: boolean;
    handleSubscribe: (e: React.FormEvent) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ subEmail, setSubEmail, isSubscribing, handleSubscribe }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] bg-gradient-to-br from-blue-600/10 to-indigo-600/5 border border-blue-500/20 glass shadow-premium relative overflow-hidden group"
        >
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-all duration-1000" />
            
            <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                        <Mail size={24} className="text-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-lg font-bold text-[var(--text-primary)]">Sync with Transmission</h4>
                        <p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Newsletter_v2.0 // Active</p>
                    </div>
                </div>

                <p className="text-sm text-[var(--text-dim)] font-light leading-relaxed">
                    Subscribe to receive low-latency updates on new technical insights, architectural deep-dives, and system design patterns.
                </p>

                <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            value={subEmail}
                            onChange={(e) => setSubEmail(e.target.value)}
                            placeholder="enter_terminal_email@domain.com"
                            className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl px-6 py-4 text-sm font-mono text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-blue-500/40 transition-all shadow-inner"
                            required
                        />
                        <button
                            type="submit"
                            disabled={isSubscribing}
                            className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-mono font-bold transition-all disabled:opacity-50 active:scale-95 flex items-center gap-2"
                        >
                            {isSubscribing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>LINK_STREAM <ChevronRight size={14} /></>
                            )}
                        </button>
                    </div>
                    <p className="text-[8px] font-mono text-[var(--text-muted)] text-center uppercase tracking-widest">
                        NO_SPAM // ONE_CLICK_UNSUBSCRIBE
                    </p>
                </form>
            </div>
        </motion.div>
    );
};

export default Newsletter;
