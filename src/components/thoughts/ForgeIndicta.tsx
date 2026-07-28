
import React from 'react';
import { motion } from 'framer-motion';
import { Youtube } from 'lucide-react';

const ForgeIndicta: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="relative group p-4 sm:p-8 lg:p-4 xl:p-8 rounded-[1.5rem] sm:rounded-[3rem] bg-[var(--bg-card)] border border-blue-500/20 overflow-hidden hover:border-blue-500/40 transition-all duration-700 shadow-premium w-full"
        >
            {/* Animated Background Elements */}
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-1000" />
            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-purple-600/10 blur-[100px] rounded-full group-hover:bg-purple-600/20 transition-all duration-1000" />

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                {/* Enhanced Logo Container */}
                <div className="relative">
                    <div className="w-28 h-28 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-1 shadow-[0_0_50px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_70px_rgba(59,130,246,0.4)] transition-all duration-700">
                        <div className="w-full h-full rounded-full overflow-hidden border border-[var(--border-color)] relative">
                            <img
                                src="/forgeindicta_logo.webp"
                                alt="ForgeIndicta"
                                className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-1000"
                            />

                            {/* Reflection Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--border-color)] to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Badge */}
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-1 -right-4 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-[8px] font-bold text-white uppercase tracking-[0.2em] shadow-xl border border-blue-400/30"
                    >
                        OFFICIAL
                    </motion.div>

                    {/* Glow Ring */}
                    <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2 w-full flex flex-col items-center">
                        <div className="text-2xl sm:text-3xl lg:text-2xl xl:text-3xl font-black tracking-tighter text-[var(--text-primary)] group-hover:scale-105 transition-transform duration-500 w-full text-center whitespace-nowrap">
                            Forge<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Indicta</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 w-full">
                            <div className="h-px flex-1 max-w-[2rem] bg-gradient-to-r from-transparent to-orange-500/50" />
                            <p className="text-[8px] sm:text-[10px] lg:text-[8px] xl:text-[9px] font-mono text-orange-400 tracking-[0.1em] sm:tracking-[0.2em] uppercase font-bold text-center">
                                Forging India’s Future with Data
                            </p>
                            <div className="h-px flex-1 max-w-[2rem] bg-gradient-l from-transparent to-orange-500/50" />
                        </div>
                    </div>

                    <p className="text-sm text-[var(--text-dim)] leading-relaxed font-light max-w-sm mx-auto">
                        Empowering the next generation of engineers through
                        <span className="text-[var(--text-primary)] font-medium"> deep technical insights</span>,
                        real-world data engineering, and the
                        <span className="text-blue-500 font-bold"> AI revolution</span>.
                    </p>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                        {['Data Engineering', 'AI & Cloud', 'Indic Heritage'].map((tag) => (
                            <motion.span
                                key={tag}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(59,130,246,0.1)' }}
                                className="px-4 py-1.5 rounded-full bg-[var(--nav-hover)] border border-[var(--border-color)] text-[9px] font-mono text-[var(--text-dim)] hover:text-blue-400 hover:border-blue-500/30 transition-all cursor-default"
                            >
                                #{tag.toUpperCase()}
                            </motion.span>
                        ))}
                    </div>
                </div>

                <div className="w-full pt-6 space-y-6">
                    <button
                        onClick={() => window.open('https://youtube.com/@ForgeIndicta', '_blank')}
                        className="w-full group/btn relative p-[2px] rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-95 shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse" />
                        <div className="relative bg-[var(--bg-card)] rounded-[14px] px-8 py-4 transition-colors group-hover/btn:bg-transparent">
                            <span className="flex items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] font-mono font-black text-[var(--text-primary)] tracking-[0.2em] group-hover/btn:text-white">
                                <Youtube size={16} className="text-red-500 group-hover/btn:text-white transition-colors" />
                                JOIN THE DATA REVOLUTION
                            </span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Decorative Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

            {/* Scanline Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
        </motion.div>
    );
};

export default ForgeIndicta;
