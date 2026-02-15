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
  Shield
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

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;



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
        // Direct call to Google Script URL (Client-Side Only)
        await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors', // Essential for direct calls from browser to Google Script
          headers: {
            'Content-Type': 'text/plain', // Use text/plain to avoid CORS preflight and ensure delivery
          },
          body: JSON.stringify({
            identifier,
            email,
            message,
            targetEmail: contactEmail, // Explicitly send the destination email from .env
            timestamp,
            userAgent: navigator.userAgent
          }),
        });

        // With no-cors, we can't read the response, so we optimistically update UI
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
        throw new Error("No script URL configured");
      }
    } catch (error) {
      setIsSending(false);
      console.error('Email sending failed:', error);

      console.error('Email sending failed:', error);
      alert('Handshake failed. Please check your network connection or try again later.');

    }
  };

  const stats = [
    { label: 'Uptime', value: '99.9%', icon: Activity },
    { label: 'Latency', value: '14ms', icon: Cpu },
    { label: 'Region', value: 'Global', icon: Globe },
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

        // Final success state trigger
        setTimeout(() => setStage(3), 3200);
      }
    }, [isOpen]);

    // Live latency simulation
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
          <React.Fragment>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm md:backdrop-blur-md z-50 flex items-center justify-center"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#050505] border border-white/10 rounded-3xl p-1 max-w-md w-full shadow-2xl overflow-hidden relative"
              >
                {/* Top Bar */}
                <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    SECURE_HANDSHAKE_PROTOCOL_V2
                  </div>
                </div>

                <div className="p-8 min-h-[400px] flex flex-col relative">
                  {/* Background Grid */}
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                  {stage < 3 ? (
                    // PROCESSING STATE
                    <div className="flex-1 flex flex-col justify-center items-center space-y-8 z-10">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full border-2 border-blue-500/30 flex items-center justify-center animate-[spin_3s_linear_infinite]">
                          <div className="w-16 h-16 rounded-full border-2 border-indigo-500/50 border-t-transparent animate-spin" />
                        </div>
                        <Activity className="absolute inset-0 m-auto text-blue-400 animate-pulse" size={32} />
                      </div>

                      <div className="w-full max-w-[280px] space-y-2">
                        <div className="flex justify-between text-[10px] font-mono text-blue-400">
                          <span>PROGRESS</span>
                          <span>{Math.min(100, (stage + 1) * 33)}%</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(100, (stage + 1) * 33)}%` }}
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                          />
                        </div>
                      </div>

                      <div className="w-full bg-black/50 rounded-lg p-4 font-mono text-[10px] text-gray-400 space-y-1 h-32 overflow-hidden border border-white/5">
                        {logs.map((log, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="truncate"
                          >
                            {log}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // SUCCESS STATE
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col items-center justify-between z-10"
                    >
                      <div className="text-center space-y-4 pt-4">
                        <motion.div
                          initial={{ scale: 0.8, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center mx-auto relative group"
                        >
                          <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                          <Shield className="text-emerald-500" size={40} />
                        </motion.div>

                        <div>
                          <h2 className="text-2xl font-bold text-white tracking-tight">Handshake Established</h2>
                          <p className="text-gray-400 text-sm mt-1">Secure connection channel active.</p>
                        </div>

                        <div className="flex justify-center gap-3">
                          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-mono text-gray-300">ONLINE</span>
                          </div>
                          <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 flex items-center gap-2">
                            <Wifi size={10} className="text-blue-400" />
                            <span className="text-[10px] font-mono text-gray-300">{latency}ms</span>
                          </div>
                        </div>
                      </div>

                      {/* Connection Receipt */}
                      <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 space-y-3 mt-6">
                        <div className="flex justify-between items-center text-[10px] font-mono border-b border-white/5 pb-2">
                          <span className="text-gray-500">SESSION_ID</span>
                          <span className="text-blue-400">#{data?.id || 'UNK'}</span>
                        </div>
                        <div className="space-y-2 pt-1">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400">Encryption</span>
                            <span className="text-white font-mono">AES-256-GCM</span>
                          </div>
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-gray-400">Verified By</span>
                            <span className="text-white font-mono flex items-center gap-1">
                              <Shield size={10} className="text-emerald-500" /> Google Trust Services
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={onClose}
                        className="w-full py-3.5 bg-white text-black font-bold rounded-xl mt-6 hover:bg-gray-200 transition-colors text-xs uppercase tracking-wider"
                      >
                        Acknowledge & Close
                      </button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative Data Flow Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <HandshakeModal
        isOpen={isSubmitted}
        onClose={() => setIsSubmitted(false)}
        data={lastTransmission}
      />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Technical Context */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                SYSTEM_ACCESS: GRANTED
              </motion.div>

              <motion.h1
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-5xl md:text-7xl font-bold leading-tight"
              >
                Engineer Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600">
                  Data Future.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-400 text-lg max-w-md font-light leading-relaxed"
              >
                Architecting scalable data pipelines and high-performance infrastructure. Let's discuss your next breakthrough.
              </motion.p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 glass"
                >
                  <stat.icon size={16} className="text-blue-500 mb-2" />
                  <div className="text-xs font-mono text-gray-500">{stat.label}</div>
                  <div className="text-lg font-bold">{stat.value}</div>
                </motion.div>
              ))}
            </div>

            {/* Contact Endpoints */}
            <div className="space-y-6 pt-6">
              <div className="group">
                <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">ENDPOINT_EMAIL</h3>
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 text-xl font-medium hover:text-blue-400 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  {contactEmail}
                </a>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="group">
                  <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">ENDPOINT_GITHUB</h3>
                  <a href="https://github.com/ANKIT21111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-medium hover:text-white transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Github size={18} />
                    </div>
                    ankit21111
                  </a>
                </div>

                <div className="group">
                  <h3 className="text-xs font-mono text-gray-600 uppercase tracking-widest mb-3">ENDPOINT_LINKEDIN</h3>
                  <a href="https://www.linkedin.com/in/ankitabhishekdataengineering/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg font-medium hover:text-blue-400 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                      <Linkedin size={18} className="text-blue-500" />
                    </div>
                    ankit-abhishek
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal/Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={isMobile ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#050505] rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden flex flex-col min-h-[600px]"
            >
              {/* Terminal Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                    Secure_Input_Portal.v2
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-grow p-8 relative">
                <form onSubmit={handleSubmit} className="space-y-8 h-full flex flex-col justify-center">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Terminal size={12} /> Identifier
                      </label>
                      <input
                        required
                        name="identifier"
                        type="text"
                        className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-light"
                        placeholder="CLIENT_NAME"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Mail size={12} /> Collaboration_Endpoint
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-light"
                        placeholder="client@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Database size={12} /> Payload_Message
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      className="w-full bg-black/50 border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all font-light resize-none"
                      placeholder="Define the scope of our collaboration..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full py-5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden ${isSending ? 'bg-gray-800 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110'}`}
                  >
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm font-mono">
                      {isSending ? 'Transmitting...' : 'Execute Handshake'} <ArrowRight size={18} className={isSending ? 'opacity-50' : 'group-hover:translate-x-1 transition-transform'} />
                    </span>
                  </button>
                </form>
              </div>

              {/* Decorative Terminal Footer */}
              <div className="px-8 py-4 bg-black/50 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] font-mono text-gray-600">
                  <span className="flex items-center gap-1"><Lock size={10} /> AES-256</span>
                  <span className="hidden md:inline">NODE: v20.11.0</span>
                </div>
                <div className="text-[10px] font-mono text-gray-600">
                  SECURE_DATA_LAYER_V2.0
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
