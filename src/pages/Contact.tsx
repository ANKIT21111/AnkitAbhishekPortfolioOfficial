
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
  Linkedin
} from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'form' | 'logs'>('form');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const initialLogs = [
      '[SYSTEM] Initializing contact module...',
      '[AUTH] Secure connection established.',
      '[INFRA] Database nodes: ONLINE',
      '[VIBE] Professionalism: MAXIMIZED'
    ];
    setLogs(initialLogs);
  }, []);

  const addLog = (message: string) => {
    setLogs(prev => [...prev.slice(-10), `[${new Date().toLocaleTimeString()}] ${message}`]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const identifier = formData.get('identifier') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    addLog(`POST /api/contact -> Processing data from ${identifier}...`);

    try {
      const apiUrl = import.meta.env.PROD
        ? '/api/contact'
        : 'http://localhost:5000/api/contact';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, email, message }),
      });

      if (response.ok) {
        addLog('DATA_INJECTION: VALIDATED');
        addLog('PIPELINE: EXECUTED SUCCESSFULLY');
        setIsSubmitted(true);

        // Reset after some time
        setTimeout(() => {
          setIsSubmitted(false);
          setActiveTab('form');
        }, 5000);
      } else {
        const errorData = await response.json();
        addLog(`ERROR: ${errorData.error || 'Failed to transmit data'}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      addLog('ERROR: CONNECTION_FAILED');
    }
  };

  const stats = [
    { label: 'Uptime', value: '99.9%', icon: Activity },
    { label: 'Latency', value: '14ms', icon: Cpu },
    { label: 'Region', value: 'Global', icon: Globe },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Decorative Data Flow Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-7xl font-bold leading-tight"
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
                <a href="mailto:ankitabhishek1005@gmail.com" className="flex items-center gap-4 text-xl font-medium hover:text-blue-400 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail size={18} className="text-blue-500" />
                  </div>
                  ankitabhishek1005@gmail.com
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
              initial={{ opacity: 0, scale: 0.95 }}
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
                <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                  <button
                    onClick={() => setActiveTab('form')}
                    className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${activeTab === 'form' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500'}`}
                  >
                    INPUT.EXE
                  </button>
                  <button
                    onClick={() => setActiveTab('logs')}
                    className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all ${activeTab === 'logs' ? 'bg-white/10 text-white shadow-lg' : 'text-gray-500'}`}
                  >
                    SYSTEM_LOGS
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-grow p-8 relative">
                <AnimatePresence mode="wait">
                  {activeTab === 'form' ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="h-full"
                    >
                      {isSubmitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            className="w-24 h-24 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex items-center justify-center mb-8"
                          >
                            <CheckCircle className="text-emerald-500" size={48} />
                          </motion.div>
                          <h2 className="text-3xl font-bold mb-4 font-display">Data Transmitted.</h2>
                          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
                            Pipeline status: SUCCESS [200 OK]
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
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
                                <Mail size={12} /> Contact_Endpoint
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
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm font-mono">
                              Execute Handshake <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </span>
                          </button>
                        </form>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="logs"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-mono text-[13px] text-gray-400 space-y-2 h-full overflow-y-auto"
                    >
                      <div className="flex items-center gap-4 text-gray-600 mb-6 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>KERNAL: OK</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-500" />
                          <span>DB: CONNECTED</span>
                        </div>
                      </div>
                      {logs.map((log, i) => (
                        <motion.div
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={i}
                          className={log.includes('SUCCESS') || log.includes('GRANTED') ? 'text-emerald-400' : ''}
                        >
                          <span className="text-gray-600 pr-3">{'>'}</span>
                          {log}
                        </motion.div>
                      ))}
                      <motion.div
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-gray-500 ml-1 translate-y-0.5"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
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

export default Contact;
