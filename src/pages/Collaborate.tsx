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
  Code,
  Flame,
  Laugh,
  Share2,
  Trash2,
  RefreshCw,
  Video,
  Calendar,
  Users,
  Monitor,
  Clock
} from 'lucide-react';

const ROASTS = [
  "Your animations are smoother than most startups’ funding rounds. 💸",
  "This portfolio is so futuristic, I'm waiting for it to ask me for my neural link. 🧠",
  "The UI is cleaner than my search history after a suspicious click. 🧼",
  "I've seen slower load times in a 56k modem era. Oh wait, this is actually fast. Dammit. 🏎️",
  "Your code probably has more 'TODO' comments than actual logic, but the UI hides it well. 🤫",
  "If this portfolio was a person, it would definitely wear turtleneck sweaters and talk about 'synergy'. 🐢",
  "The glassmorphism is so strong I accidentally tried to clean my monitor. 🧽",
  "You used Framer Motion like it was free. Wait, it is. Carry on. 🎢",
  "This site is so dark mode, I had to turn on my actual lights just to find my mouse. 🔦",
  "Your 'About Me' section is basically a LinkedIn post that went to private school. 🎓"
];

const RoastModal = ({ isOpen, onClose, roast, onAgain }: { isOpen: boolean; onClose: () => void; roast: string | null; onAgain: () => void }) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setAnalyzing(true);
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setAnalyzing(false), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-orange-500/30 rounded-[2.5rem] p-8 shadow-[0_0_50px_rgba(249,115,22,0.15)] overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
              <Flame size={200} className="text-orange-500" />
            </div>

            {analyzing ? (
              <div key="analyzing" className="space-y-8 py-10 relative z-10">
                <div className="flex flex-col items-center gap-6">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 rounded-full border-t-2 border-orange-500 border-r-2 border-transparent"
                    />
                    <Flame className="absolute inset-0 m-auto text-orange-500" size={32} />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold font-display text-white">Neural Roast Engine</h3>
                    <p className="text-orange-500/60 font-mono text-[10px] mt-2 uppercase tracking-widest">Scanning structural vulnerabilities...</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between font-mono text-[10px] text-orange-400">
                    <span>TOXICITY_LEVEL</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-orange-600 to-red-600"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div key="result" className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                    <Laugh className="text-orange-500" size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-orange-500/60 uppercase tracking-widest">Evaluation_Complete</p>
                    <h3 className="text-lg font-bold text-white uppercase italic">Critical Hit.</h3>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group min-h-[120px] flex items-center justify-center">
                  <div className="absolute -top-3 -left-3 bg-orange-500 text-black px-2 py-0.5 text-[9px] font-black rounded-lg transform -rotate-12 group-hover:rotate-0 transition-transform">
                    ROASTED
                  </div>
                  <p className="text-xl md:text-2xl font-display font-medium leading-[1.3] text-white italic text-center">
                    "{roast || "No vulnerabilities detected. You're too clean."}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onAgain}
                    className="flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 text-[10px] font-bold uppercase tracking-widest"
                  >
                    <RefreshCw size={14} /> Again
                  </button>
                  <button
                    onClick={() => {
                      const text = `I just got roasted by Ankit's Portfolio AI: "${roast}"`;
                      if (navigator.share) {
                        navigator.share({ title: 'Portfolio Roast', text, url: window.location.href });
                      } else {
                        navigator.clipboard.writeText(text);
                        alert("Roast copied to clipboard!");
                      }
                    }}
                    className="flex items-center justify-center gap-2 py-4 bg-orange-500 hover:bg-orange-600 text-black rounded-2xl transition-all shadow-[0_10px_20px_rgba(249,115,22,0.3)] text-[10px] font-bold uppercase tracking-widest"
                  >
                    <Share2 size={14} /> Share
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="w-full text-center text-gray-500 hover:text-white text-[9px] font-mono uppercase tracking-[0.4em] transition-colors"
                >
                  [ Terminate_Roast ]
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AVAILABLE_TIMES = [
  "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const getNextDays = () => {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const next = new Date();
    next.setDate(today.getDate() + i);
    days.push(next);
  }
  return days;
};

const ScheduleModal = ({ isOpen, onClose, onSubmit, isSending }: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSending: boolean;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const days = getNextDays();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0a0a0a] border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_80px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex justify-between items-start mb-10">
              <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                <Video className="text-blue-500" size={24} />
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-blue-500/60 uppercase tracking-widest">Protocol: Direct_Sync</p>
                <h3 className="text-2xl font-bold text-white font-display">Schedule Meetup</h3>
              </div>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget as HTMLFormElement);
              onSubmit({
                identifier: formData.get('name') as string,
                email: formData.get('email') as string,
                message: formData.get('message') as string,
                meetingDate: selectedDate?.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                meetingTime: selectedTime
              });
            }} className="space-y-8 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">01 // Identity</label>
                  <input required name="name" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700 font-light text-white" placeholder="Enter Name" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">02 // Endpoint</label>
                  <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500/50 outline-none transition-all placeholder:text-gray-700 font-light text-white" placeholder="Email Address" />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">03 // Temporal Alignment (Date)</label>
                <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                  {days.map((day, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedDate(day)}
                      className={`flex-shrink-0 w-20 py-4 rounded-2xl border transition-all flex flex-col items-center gap-1 ${selectedDate?.toDateString() === day.toDateString()
                        ? 'bg-blue-500 border-blue-400 text-black'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                        }`}
                    >
                      <span className={`text-[10px] font-bold uppercase ${selectedDate?.toDateString() === day.toDateString() ? 'text-black/60' : 'text-gray-500'}`}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                      <span className="text-lg font-black">{day.getDate()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {selectedDate && (
                  <motion.div initial={{ opacity: 0, y: 10, height: 0 }} animate={{ opacity: 1, y: 0, height: 'auto' }} exit={{ opacity: 0, y: 10, height: 0 }} className="space-y-4 overflow-hidden">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">04 // Slot Reservation (Time)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {AVAILABLE_TIMES.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-3 rounded-xl border text-[11px] font-bold transition-all ${selectedTime === time
                            ? 'bg-blue-500 border-blue-400 text-black'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">05 // Briefing_Payload</label>
                <textarea required name="message" rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500/50 outline-none transition-all resize-none placeholder:text-gray-700 font-light text-white" placeholder="What are we architecturalizing?"></textarea>
              </div>

              <button
                type="submit"
                disabled={isSending || !selectedDate || !selectedTime}
                className="w-full py-5 rounded-2xl bg-white text-black font-display font-black text-xs tracking-[0.2em] uppercase hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
              >
                {isSending ? "Initiating Handshake..." : "Confirm Sync Sequence"}
              </button>

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Collaborate: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lastTransmission, setLastTransmission] = useState<{
    id: string;
    identifier: string;
    email: string;
    timestamp: string;
    meetingDate?: string;
    meetingTime?: string;
  } | null>(null);

  const [isRoastOpen, setIsRoastOpen] = useState(false);
  const [activeRoast, setActiveRoast] = useState<string | null>(null);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleRoast = () => {
    const randomRoast = ROASTS[Math.floor(Math.random() * ROASTS.length)];
    setActiveRoast(randomRoast);
    setIsRoastOpen(true);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "contact@ankitabhishek.com";

  const handleTransmission = async (data: any) => {
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
            id: transmissionId,
            targetEmail: contactEmail,
            timestamp,
            userAgent: navigator.userAgent,
            ...data
          }),
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      setLastTransmission({
        id: transmissionId,
        identifier: data.identifier,
        email: data.email,
        timestamp,
        meetingDate: data.meetingDate,
        meetingTime: data.meetingTime
      });
      setIsSending(false);
      setIsSubmitted(true);
      setIsScheduleOpen(false);

      setTimeout(() => {
        setIsSubmitted(false);
      }, 30000);

    } catch (error) {
      setIsSending(false);
      console.error('Transmission failed:', error);
      alert('Handshake failed. Please check your network connection.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    handleTransmission({
      identifier: formData.get('identifier') as string,
      email: formData.get('email') as string,
      message: formData.get('message') as string,
    });
    form.reset();
  };

  // Handshake sequence constants
  const PING_LATENCY_MIN = 10;
  const PING_LATENCY_MAX = 50;


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

                    {data?.meetingDate && (
                      <div className="w-full p-6 bg-blue-500/5 border border-blue-500/10 rounded-[2rem] flex flex-col items-center gap-2">
                        <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                          <Calendar size={10} /> Scheduled_Sync_Window
                        </span>
                        <span className="text-lg font-bold text-white font-display tracking-tight">
                          {data.meetingDate} @ {data.meetingTime}
                        </span>
                      </div>
                    )}

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

      <RoastModal
        isOpen={isRoastOpen}
        onClose={() => setIsRoastOpen(false)}
        roast={activeRoast}
        onAgain={handleRoast}
      />

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onSubmit={handleTransmission}
        isSending={isSending}
      />

      <div className="responsive-container pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24">

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
                  className="text-[var(--text-secondary)] text-lg md:text-xl max-w-2xl font-light leading-relaxed"
                >
                  Bridging the gap between raw data and actionable intelligence through elite engineering.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4 flex flex-wrap gap-4"
                >
                  <button
                    onClick={handleRoast}
                    className="px-8 py-4 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-500 font-display font-bold flex items-center gap-3 group transition-all"
                  >
                    <Flame size={20} className="group-hover:scale-125 transition-transform" />
                    Roast My Portfolio
                  </button>

                  <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="px-8 py-4 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-display font-bold flex items-center gap-3 group transition-all"
                  >
                    <Video size={20} className="group-hover:scale-125 transition-transform" />
                    Schedule Meetup
                  </button>
                </motion.div>
              </div>
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

        {/* Fully Aligned Video Meetup Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 lg:mt-32"
        >
          <div className="relative group/meetup">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-[3rem] blur-2xl" />

            <div className="relative p-8 md:p-16 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[3.5rem] shadow-premium overflow-hidden glass shimmer-premium">
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-10">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">
                    <Video size={12} /> Sync_Status: Uplink_Active
                  </div>

                  <div className="space-y-6">
                    <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white leading-[0.95]">
                      Synchronized <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500">
                        Collaboration.
                      </span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-xl font-light leading-relaxed max-w-xl">
                      Establish a direct, low-latency video link for deep technical architectural reviews and strategic engineering sessions.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4">
                    <button
                      onClick={() => setIsScheduleOpen(true)}
                      className="px-10 py-5 rounded-2xl bg-white text-black font-display font-black text-[10px] tracking-[0.2em] uppercase hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl flex items-center gap-4 group"
                    >
                      Initialize Sync <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--text-muted)] border-l border-[var(--border-color)] pl-8">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-[var(--bg-card)] bg-blue-500/10 flex items-center justify-center">
                            <Users size={12} className="text-blue-400" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="text-white font-bold text-xs">4.2h Avg Response</div>
                        <div className="opacity-50 text-[9px] uppercase tracking-tighter">Global Priority Sync</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-8 rounded-[2rem] bg-[var(--bg-primary)]/40 border border-[var(--border-color)] group/item hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                      <Calendar size={22} className="text-emerald-500" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display uppercase tracking-wider mb-2">Priority Prep</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light mb-4">Calendar-synced scheduling.</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-[var(--bg-primary)]/40 border border-[var(--border-color)] group/item hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                      <Monitor size={22} className="text-blue-500" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display uppercase tracking-wider mb-2">Live Arch</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light mb-4">Interactive whiteboarding.</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-[var(--bg-primary)]/40 border border-[var(--border-color)] group/item hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                      <Users size={22} className="text-purple-500" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display uppercase tracking-wider mb-2">1-on-1 Sync</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light mb-4">Direct 1:1 engineering access.</p>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-[var(--bg-primary)]/40 border border-[var(--border-color)] group/item hover:border-white/20 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-blue-400/10 border border-blue-400/20 flex items-center justify-center mb-6">
                      <Shield size={22} className="text-blue-400" />
                    </div>
                    <h4 className="text-base font-bold text-white font-display uppercase tracking-wider mb-2">Secure P2P</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light mb-4">End-to-end encrypted.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Collaborate;
