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
  const [isSending, setIsSending] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const identifier = formData.get('identifier') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    setIsSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier,
          email,
          message,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        }),
      });

      if (!response.ok) {
        throw new Error('Transmission failed');
      }

      setIsSending(false);
      setIsSubmitted(true);
      form.reset();

      // Reset success screen after some time
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);

    } catch (error) {
      setIsSending(false);
      console.error('Email sending failed:', error);

      // Silent fallback
      const subject = encodeURIComponent(`🚀 Portfolio Handshake: ${identifier}`);
      const body = encodeURIComponent(
        `[HANDSHAKE_PROTOCOL_INITIALIZED]\n\n` +
        `IDENTIFIER: ${identifier}\n` +
        `ENDPOINT: ${email}\n\n` +
        `PAYLOAD_MESSAGE:\n` +
        `${message}`
      );
      window.location.href = `mailto:ankitabhishek1005@gmail.com?subject=${subject}&body=${body}`;
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
                <div className="flex bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                  <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">
                    Secure_Input_Portal.v2
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-grow p-8 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSubmitted ? "success" : "form"}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    className="h-full"
                  >
                    {isSubmitted ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12">
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          className="relative"
                        >
                          <div className="w-24 h-24 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="text-emerald-500" size={48} />
                          </div>
                          <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 bg-emerald-500/20 rounded-3xl blur-xl -z-10"
                          />
                        </motion.div>

                        <div className="space-y-4">
                          <h2 className="text-4xl font-bold font-display tracking-tight text-white">Handshake Confirmed.</h2>
                          <div className="flex flex-col items-center gap-2">
                            <p className="text-gray-500 font-mono text-[10px] uppercase tracking-[0.3em]">
                              Connection status: <span className="text-emerald-500 uppercase">ESTABLISHED</span>
                            </p>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                            <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">
                              TRANSMISSION_ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
                            </p>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsSubmitted(false)}
                          className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                        >
                          INITIATE_NEW_HANDSHAKE
                        </motion.button>
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
                          disabled={isSending}
                          className={`w-full py-5 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 group relative overflow-hidden ${isSending ? 'bg-gray-800 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:brightness-110'}`}
                        >
                          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                          <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase text-sm font-mono">
                            Execute Handshake <ArrowRight size={18} className={isSending ? 'opacity-50' : 'group-hover:translate-x-1 transition-transform'} />
                          </span>
                        </button>
                      </form>
                    )}
                  </motion.div>
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
