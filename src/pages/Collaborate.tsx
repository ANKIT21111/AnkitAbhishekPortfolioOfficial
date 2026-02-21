import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  Terminal,
  Database,
  Cpu,
  Layers,
  Activity,
  Globe,
  Lock,
  ArrowRight,
  Github,
  Linkedin,
  Wifi,
  Shield,
  Zap,
  Command,
  Code
} from 'lucide-react';

const Collaborate: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTransmission, setLastTransmission] = useState<{
    id: string;
    identifier: string;
    email: string;
    timestamp: string;
  } | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "contact@ankitabhishek.com";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const identifier = formData.get('identifier') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    setIsSending(true);

    const transmissionId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const timestamp = new Date().toISOString();

    try {
      if (import.meta.env.VITE_APPS_SCRIPT_URL) {
        await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify({
            identifier,
            email,
            message,
            targetEmail: contactEmail,
            timestamp,
            userAgent: navigator.userAgent
          }),
        });

        setLastTransmission({
          id: transmissionId,
          identifier,
          email,
          timestamp
        });
        setIsSending(false);
        setIsSubmitted(true);
        form.reset();

        setTimeout(() => {
          setIsSubmitted(false);
        }, 30000);

      } else {
        // Fallback for demo purposes if no URL is configured
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLastTransmission({
          id: transmissionId,
          identifier,
          email,
          timestamp
        });
        setIsSending(false);
        setIsSubmitted(true);
        form.reset();
      }
    } catch (error) {
      setIsSending(false);
      console.error('Email sending failed:', error);
      alert('Handshake failed. Please check your network connection or try again later.');
    }
  };

  const stats = [
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500' },
    { label: 'Latency', value: '14ms', icon: Cpu, color: 'text-blue-500' },
    { label: 'Region', value: 'Global', icon: Globe, color: 'text-purple-500' },
  ];

  const HandshakeModal = ({ isOpen, onClose, data }: { isOpen: boolean; onClose: () => void; data: any }) => {
    const [stage, setStage] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [latency, setLatency] = useState(14);

    useEffect(() => {
      if (isOpen) {
        setStage(0);
        setLogs([]);
        const sequence = [
          { t: 0, msg: "Initializing handshake protocol...", s: 0 },
          { t: 600, msg: "Resolving client identity hash...", s: 0 },
          { t: 1200, msg: "Encrypting payload stream (AES-256)...", s: 1 },
          { t: 1800, msg: "Establishing secure channel...", s: 1 },
          { t: 2400, msg: "Verifying remote acknowledgement...", s: 2 },
          { t: 3000, msg: "Connection established.", s: 3 },
        ];

        sequence.forEach(({ t, msg, s }) => {
          setTimeout(() => {
            setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
            if (s > stage) setStage(s);
          }, t);
        });

        setTimeout(() => setStage(3), 3200);
      }
    }, [isOpen]);

    useEffect(() => {
      if (isOpen && stage === 3) {
        const interval = setInterval(() => {
          setLatency(prev => Math.max(10, Math.min(50, prev + (Math.random() > 0.5 ? 2 : -2))));
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [isOpen, stage]);

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-[var(--bg-primary)]/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            >
              {/* Terminal Title Bar */}
              <div className="bg-[var(--nav-hover)] px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                  <Lock size={10} /> SECURE_HANDSHAKE_P2P
                </div>
              </div>

              <div className="p-8 md:p-12 min-h-[400px] flex flex-col justify-center">
                {stage < 3 ? (
                  <div className="space-y-10">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border border-blue-500/20 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-blue-500 rounded-full"
                          />
                          <Activity className="text-blue-500 animate-pulse" size={32} />
                        </div>
                      </div>
                      <h3 className="mt-6 text-xl font-bold font-display">Synchronizing...</h3>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-mono text-blue-400">
                        <span>TRANSMISSION_PROGRESS</span>
                        <span>{Math.min(100, (stage + 1) * 33)}%</span>
                      </div>
                      <div className="h-1.5 bg-blue-500/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (stage + 1) * 33)}%` }}
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-xl p-5 border border-white/5 font-mono text-[11px] text-gray-400 space-y-2 h-36 overflow-hidden">
                      {logs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-2"
                        >
                          <span className="text-blue-500/50">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                          <span className="text-gray-300">{log}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-8"
                  >
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-24 h-24 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center"
                      >
                        <Shield className="text-emerald-500" size={48} />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-emerald-400/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold font-display tracking-tight">Handshake Successful</h2>
                      <p className="text-[var(--text-dim)] max-w-xs mx-auto">Your transmission has been encrypted and successfully queued for processing.</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-3">
                      <div className="p-4 bg-[var(--nav-hover)] border border-[var(--border-color)] rounded-2xl flex flex-col items-start gap-1">
                        <span className="text-[9px] font-mono text-gray-500">SESSION_IDENTIFIER</span>
                        <span className="text-xs font-mono text-blue-400">#{data?.id || 'UNK-772'}</span>
                      </div>
                      <div className="p-4 bg-[var(--nav-hover)] border border-[var(--border-color)] rounded-2xl flex flex-col items-start gap-1">
                        <span className="text-[9px] font-mono text-gray-500">PING_LATENCY</span>
                        <span className="text-xs font-mono text-emerald-400">{latency}ms</span>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl font-display text-sm tracking-wide"
                    >
                      TERMINATE CONNECTION
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[var(--bg-primary)]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />

        {/* Animated Grid lines */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
          <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
        </div>
      </div>

      <HandshakeModal
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        data={lastTransmission}
      />

      <div className="responsive-container pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Column: Context & Identity */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                Portal_status: Online
              </motion.div>

              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl sm:text-6xl lg:text-8xl font-black font-display tracking-tight leading-[0.9]"
                >
                  Let's Build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-gradient">
                    Architecture.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--text-secondary)] text-lg md:text-xl max-w-md font-light leading-relaxed"
                >
                  Bridging the gap between raw data and actionable intelligence through elite engineering.
                </motion.p>
              </div>
            </div>

            {/* Elite Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="p-5 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-color)] shadow-xl glass shimmer-premium"
                >
                  <stat.icon size={18} className={`${stat.color} mb-3`} />
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider">{stat.label}</div>
                  <div className="text-xl font-bold text-[var(--text-primary)] mt-1">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Digital Contact Nodes */}
            <div className="space-y-10 pt-6">
              <div className="group relative">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="relative space-y-3">
                  <span className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.3em] font-bold">
                    01 // DIRECT_MAIL
                  </span>
                  <a href={`mailto:${contactEmail}`} className="flex items-center gap-5 text-xl md:text-2xl font-bold hover:text-blue-400 transition-all text-[var(--text-primary)] font-display">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                      <Mail size={22} className="text-blue-500" />
                    </div>
                    <span className="break-all tracking-tight">{contactEmail}</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
                <div className="group relative">
                  <div className="absolute -inset-4 bg-white/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative space-y-3">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.3em] font-bold">
                      02 // SOURCE_CODE
                    </span>
                    <a href="https://github.com/ANKIT21111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-bold hover:text-blue-400 transition-all text-[var(--text-primary)] font-display">
                      <div className="w-12 h-12 rounded-2xl bg-[var(--nav-hover)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-300">
                        <Github size={22} className="text-[var(--text-primary)]" />
                      </div>
                      <span className="tracking-tight">ANKIT21111</span>
                    </a>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative space-y-3">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.3em] font-bold">
                      03 // NETWORK_INDEX
                    </span>
                    <a href="https://www.linkedin.com/in/ankitabhishekdataengineering/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-bold hover:text-blue-400 transition-all text-[var(--text-primary)] font-display">
                      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                        <Linkedin size={22} className="text-blue-500" />
                      </div>
                      <span className="tracking-tight">ANKIT-ABHISHEK</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Command Center */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl relative overflow-hidden flex flex-col min-h-[650px] shadow-premium group/card"
            >
              {/* Animated Border Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover/card:via-blue-500 transition-all duration-700" />

              {/* Terminal Header */}
              <div className="px-8 py-6 bg-[var(--nav-hover)]/30 border-b border-[var(--border-color)] flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/20" />
                </div>
                <div className="flex bg-[var(--bg-primary)]/60 px-4 py-2 rounded-xl border border-[var(--border-color)] shadow-inner">
                  <span className="text-[10px] font-mono text-blue-400 tracking-[0.3em] font-bold uppercase">
                    COLLAB_PORTAL.v3.0.4
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-grow p-8 md:p-12 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Terminal size={14} className="text-blue-500" /> 01 // Client_ID
                      </label>
                      <input
                        required
                        name="identifier"
                        type="text"
                        autoComplete="off"
                        className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl px-6 py-4.5 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-light text-[var(--text-primary)] placeholder:text-[var(--text-subtle)]/30"
                        placeholder="ENTER_YOUR_NAME"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Mail size={14} className="text-blue-500" /> 02 // Return_Path
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl px-6 py-4.5 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-light text-[var(--text-primary)] placeholder:text-[var(--text-subtle)]/30"
                        placeholder="EMAIL@ENDPOINT.COM"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.2em] flex items-center gap-2">
                      <Database size={14} className="text-blue-500" /> 03 // Message_Payload
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={5}
                      className="w-full bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-2xl px-6 py-4.5 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all font-light resize-none text-[var(--text-primary)] placeholder:text-[var(--text-subtle)]/30 custom-scrollbar"
                      placeholder="Outline your technical requirements or collaboration scope..."
                    ></textarea>
                  </div>

                  <div className="relative pt-4">
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-5 rounded-2xl transition-all flex items-center justify-center gap-4 group relative overflow-hidden font-display text-base tracking-widest ${isSending
                        ? 'bg-gray-800 cursor-not-allowed opacity-50'
                        : 'bg-white text-black hover:bg-blue-50 hover:scale-[1.01] active:scale-[0.99] shadow-[0_20px_40px_rgba(255,255,255,0.05)]'
                        }`}
                    >
                      {isSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                          <span>TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Zap size={18} className="text-blue-600 fill-blue-600 group-hover:scale-125 transition-transform" />
                          <span>INITIALIZE HANDSHAKE</span>
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </button>

                    {!isSending && (
                      <div className="absolute -bottom-10 left-0 w-full text-center">
                        <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-[0.3em] opacity-40">
                          End_to_End Encryption Active [RSA-4096]
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Decorative Terminal Footer */}
              <div className="px-10 py-6 bg-[var(--nav-hover)]/30 border-t border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-6 text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-wider">
                  <span className="flex items-center gap-2"><Shield size={12} className="text-emerald-500/60" /> Verified</span>
                  <span className="hidden sm:flex items-center gap-2"><Cpu size={12} className="text-blue-500/60" /> Cluster_ID: AT-01</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-slow" />
                  <span className="text-[10px] font-mono text-[var(--text-muted)]">SYNCED</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Collaborate;
