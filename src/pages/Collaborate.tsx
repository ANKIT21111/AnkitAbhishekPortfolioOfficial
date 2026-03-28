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
  Clock,
  X
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
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-orange-500/20 rounded-[2.5rem] p-6 sm:p-10 shadow-[0_0_80px_rgba(249,115,22,0.1)] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all z-20"
              aria-label="Close"
            >
              <X size={24} className="text-white/60 hover:text-white transition-colors" />
            </button>

            <div className="absolute -top-20 -right-20 opacity-[0.05] pointer-events-none">
              <Flame size={400} className="text-orange-500" />
            </div>

            {analyzing ? (
              <div key="analyzing" className="space-y-10 py-8 relative z-10">
                <div className="flex flex-col items-center gap-8">
                  <div className="relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-24 h-24 rounded-full border-t-2 border-orange-500 border-r-2 border-transparent"
                    />
                    <div className="absolute inset-0 m-auto w-12 h-12 flex items-center justify-center">
                      <Flame className="text-orange-500 animate-pulse" size={32} />
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-black font-display text-white uppercase tracking-tight">Neural Roast Engine</h3>
                    <p className="text-orange-500/60 font-mono text-[10px] uppercase tracking-[0.3em]">Scanning structural vulnerabilities...</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-[10px] text-orange-400/80">
                    <span>TOXICITY_THRESHOLD</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div key="result" className="space-y-10 relative z-10">
                <div className="flex justify-between items-center">
                  <div className="p-4 bg-orange-500/10 rounded-2xl border border-orange-500/20">
                    <Laugh className="text-orange-500" size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-mono text-orange-500/60 uppercase tracking-[0.2em]">Evaluation_status: Complete</p>
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Critical Hit.</h3>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 relative group min-h-[160px] flex items-center justify-center shadow-inner">
                  <div className="absolute -top-3 -left-3 bg-orange-600 text-white px-3 py-1 text-[10px] font-black rounded-lg transform -rotate-6 shadow-xl uppercase tracking-widest">
                    ROASTED
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-display font-medium leading-[1.3] text-white italic text-center">
                    "{roast || "No vulnerabilities detected. You're too clean."}"
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={onAgain}
                    className="flex items-center justify-center gap-3 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] group"
                  >
                    <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" /> Another One
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
                    className="flex items-center justify-center gap-3 py-5 bg-orange-500 hover:bg-orange-600 text-black rounded-2xl transition-all shadow-[0_15px_30px_rgba(249,115,22,0.2)] text-[10px] font-bold uppercase tracking-[0.2em] group"
                  >
                    <Share2 size={16} className="group-hover:scale-125 transition-transform" /> Share Roast
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="w-full text-center text-gray-600 hover:text-white text-[9px] font-mono uppercase tracking-[0.5em] transition-colors py-2"
                >
                  [ Terminate_Roast_Sequence ]
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
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 md:p-8 overflow-y-auto bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-3xl min-h-full md:min-h-0 bg-[#060606] border-x md:border border-white/10 md:rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.1)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/30"
              aria-label="Close"
            >
              <X size={24} className="text-white" />
            </button>

            <div className="p-6 sm:p-10 md:p-16 relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-12">
              <div className="p-4 bg-blue-500/10 rounded-3xl border border-blue-500/20 shadow-inner">
                <Video className="text-blue-500" size={32} />
              </div>
              <div className="text-left sm:text-right space-y-2">
                <p className="text-[10px] font-medium text-blue-400 uppercase tracking-[0.1em]">Schedule a Video Call</p>
                <h3 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-[0.9]">Pick Your Time</h3>
                <p className="text-gray-500 text-sm font-light">Let's find a time that works for both of us.</p>
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
                meetingTime: selectedTime,
                isMeeting: true
              });
            }} className="space-y-10 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                    <Users size={14} className="text-blue-500 inline mr-2" /> Your Name *
                  </label>
                  <input
                    required
                    name="name"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600 font-light text-white shadow-inner"
                    placeholder="e.g., Jane Doe"
                  />
                  <p className="text-xs text-gray-500 mt-2">How should we address you?</p>
                </div>
                <div className="space-y-4">
                  <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                    <Mail size={14} className="text-blue-500 inline mr-2" /> Email Address *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none transition-all placeholder:text-gray-600 font-light text-white shadow-inner"
                    placeholder="your.email@example.com"
                  />
                  <p className="text-xs text-gray-500 mt-2">We'll send you meeting details here</p>
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                  <Calendar size={14} className="text-blue-500 inline mr-2" /> Pick a Date *
                </label>
                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
                  {days.map((day, i) => {
                    const isSelected = selectedDate?.toDateString() === day.toDateString();
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedDate(day)}
                        className={`flex-shrink-0 w-24 py-5 rounded-[2rem] border transition-all flex flex-col items-center gap-2 ${isSelected
                          ? 'bg-blue-500 border-blue-400 text-black shadow-[0_10px_25px_rgba(59,130,246,0.3)]'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                          }`}
                      >
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isSelected ? 'text-black/60' : 'text-gray-600'}`}>
                          {day.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-2xl font-black">{day.getDate()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                      <Clock size={14} className="text-blue-500 inline mr-2" /> Choose a Time *
                    </label>
                    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-3">
                      {AVAILABLE_TIMES.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={`py-4 rounded-2xl border text-[11px] font-black tracking-widest transition-all ${isSelected
                              ? 'bg-blue-500 border-blue-400 text-black shadow-[0_10px_20px_rgba(59,130,246,0.2)]'
                              : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/[0.08]'
                              }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-4">
                <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                  <MessageSquare size={14} className="text-blue-500 inline mr-2" /> What to Discuss *
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] px-8 py-6 focus:border-blue-500/50 focus:bg-white/[0.05] outline-none transition-all resize-none placeholder:text-gray-600 font-light text-white shadow-inner custom-scrollbar"
                  placeholder="Tell us what you'd like to discuss. What are your goals for this meeting?"
                ></textarea>
                <p className="text-xs text-gray-500 mt-2">This helps us prepare and make the most of our time together</p>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSending || !selectedDate || !selectedTime}
                  className="w-full py-6 rounded-[2rem] bg-white text-black font-display font-black text-[13px] tracking-[0.1em] uppercase hover:scale-[1.01] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(255,255,255,0.05)] relative overflow-hidden group flex items-center justify-center gap-3"
                >
                  <span className="relative z-10">{isSending ? "Scheduling..." : "Schedule Meeting"}</span>
                  {!isSending && <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform relative z-10" />}
                  <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2 text-[11px] font-medium text-gray-600 hover:text-white uppercase tracking-[0.2em] transition-colors"
                >
                  Cancel
                </button>
              </div>

            </form>
            </div>
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

  /* SEO */
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    document.title = "Collaborate | Ankit Abhishek - Let's Build Architecture";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Establish a high-bandwidth technical uplink with Ankit Abhishek. Schedule a sync, roast his portfolio, or start a collaboration on scalable data systems.");
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDescription);
    };
  }, []);

  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || "contact@ankitabhishek.com";

  const handleTransmission = async (data: any) => {
    setIsSending(true);
    const transmissionId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const timestamp = new Date().toISOString();

    try {
      setLastTransmission(null);
      const response = await fetch('/api/collaborate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: transmissionId,
          timestamp,
          ...data
        }),
      });

      if (!response.ok) throw new Error('API_TRANSMISSION_FAILED');
      const result = await response.json();


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
      isMeeting: false
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-xl bg-[#080808] border md:border-white/10 rounded-t-[2.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.15)]"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-all z-20 md:z-30"
                aria-label="Close"
              >
                <X size={24} className="text-white/60 hover:text-white transition-colors" />
              </button>

              {/* Terminal Title Bar */}
              <div className="bg-white/5 px-8 py-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold">
                  <Lock size={12} className="text-blue-500" /> SECURE_TRANSMISSION_PROTOCOL
                </div>
              </div>

              <div className="p-8 md:p-12 min-h-[450px] flex flex-col justify-center bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03),transparent)]">
                {stage < 3 ? (
                  <div className="space-y-12">
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <div className="w-28 h-28 rounded-full border border-blue-500/10 flex items-center justify-center shadow-inner">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-blue-500 rounded-full"
                          />
                          <Activity className="text-blue-500 animate-pulse" size={36} />
                        </div>
                      </div>
                      <h3 className="mt-8 text-2xl font-black font-display tracking-tight text-white uppercase">Establishing Uplink</h3>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-mono text-blue-400 font-bold uppercase tracking-widest">
                        <span>DATA_STREAM_SYNC</span>
                        <span>{Math.min(100, (stage + 1) * 33)}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(100, (stage + 1) * 33)}%` }}
                          className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-400"
                        />
                      </div>
                    </div>

                    <div className="bg-black/60 rounded-[1.5rem] p-6 border border-white/5 font-mono text-[11px] text-gray-400 space-y-2 h-44 overflow-hidden shadow-inner custom-scrollbar">
                      {logs.map((log, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex gap-3"
                        >
                          <span className="text-blue-500/40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                          <span className={`${log.includes('established') ? 'text-emerald-400' : 'text-gray-300'}`}>{log}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center space-y-10"
                  >
                    <div className="relative">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                        className="w-28 h-28 bg-emerald-500/5 rounded-full border border-emerald-500/10 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.05)]"
                      >
                        <Shield className="text-emerald-500" size={56} />
                      </motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute inset-0 rounded-full border border-emerald-400/20"
                      />
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white uppercase">Handshake Successful</h2>
                      <p className="text-[var(--text-dim)] max-w-xs mx-auto text-sm font-light leading-relaxed">Your transmission has been encrypted and successfully queued for priority architectural processing.</p>
                    </div>

                    <div className="w-full grid grid-cols-2 gap-4">
                      <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col items-start gap-2 shadow-inner group transition-colors hover:bg-white/[0.05]">
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Session_ID</span>
                        <span className="text-xs font-mono text-blue-400 font-bold">#{data?.id || 'UNK-772'}</span>
                      </div>
                      <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex flex-col items-start gap-2 shadow-inner group transition-colors hover:bg-white/[0.05]">
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest font-bold">Latency</span>
                        <span className="text-xs font-mono text-emerald-400 font-bold">{latency}ms</span>
                      </div>
                    </div>

                    {data?.meetingDate && (
                      <div className="w-full p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] flex flex-col items-center gap-4 shadow-inner relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/20" />
                        <span className="text-[9px] font-mono text-blue-500 uppercase tracking-[0.3em] font-black flex items-center gap-3">
                          <Calendar size={12} /> Scheduled_Sync_Window
                        </span>
                        <span className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                          {data.meetingDate} <span className="text-blue-500/60 ml-2">@</span> {data.meetingTime}
                        </span>
                      </div>
                    )}

                    <div className="w-full flex flex-col gap-4">
                      <button
                        onClick={onClose}
                        className="w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-[1.01] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.05)] font-display text-xs tracking-[0.3em] uppercase overflow-hidden group relative"
                      >
                        <span className="relative z-10">Terminate Connection</span>
                        <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </button>
                      <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em]">Secure_session_end_required</p>
                    </div>
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

      <div className="responsive-container pt-20 sm:pt-32 pb-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 xl:gap-32">

          {/* Left Column: Context & Identity */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-center space-y-16">
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 text-blue-400 text-[11px] font-medium tracking-[0.1em] uppercase"
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </div>
                I'm online and ready to chat
              </motion.div>

              <div className="space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl xl:text-9xl font-black font-display tracking-tight leading-[0.85] text-white"
                >
                  Let's Build <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 animate-gradient pb-2 block">
                    Architecture.
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-[var(--text-secondary)] text-xl sm:text-2xl max-w-2xl font-light leading-relaxed border-l-2 border-blue-500/30 pl-4 sm:pl-8 italic"
                >
                  Whether you're building something cool or want fresh perspectives on your project, I'm here to help and collaborate.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-6 flex flex-col sm:flex-row gap-5"
                >
                  <button
                    onClick={handleRoast}
                    className="group relative px-8 py-5 rounded-2xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-500 font-display font-black flex items-center justify-center gap-4 transition-all text-xs tracking-widest uppercase overflow-hidden"
                  >
                    <Flame size={18} className="group-hover:scale-125 group-hover:rotate-12 transition-transform flex-shrink-0" />
                    Roast My Portfolio
                  </button>

                  <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="group relative px-8 py-5 rounded-2xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 font-display font-black flex items-center justify-center gap-4 transition-all text-xs tracking-widest uppercase overflow-hidden"
                  >
                    <Video size={18} className="group-hover:scale-125 transition-transform flex-shrink-0" />
                    Schedule Sync
                  </button>
                </motion.div>
              </div>
            </div>


            {/* Digital Contact Nodes */}
            <div className="space-y-12 pt-6">
              <div className="group relative">
                <div className="absolute -inset-6 bg-blue-500/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
                <div className="relative space-y-4">
                  <span className="text-[10px] font-mono text-blue-500/60 uppercase tracking-[0.4em] font-black flex items-center gap-3">
                    <span className="w-8 h-px bg-blue-500/20" /> 01 // DIRECT_MAIL
                  </span>
                  <a href={`mailto:${contactEmail}`} className="flex items-center gap-6 text-xl sm:text-2xl md:text-3xl font-black hover:text-blue-400 transition-all text-[var(--text-primary)] font-display overflow-hidden group/link">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 rounded-[1.25rem] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                      <Mail size={24} className="text-blue-500" />
                    </div>
                    <span className="truncate tracking-tighter group-hover:scale-[1.02] origin-left transition-transform">{contactEmail}</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-16">
                <div className="group relative">
                  <div className="absolute -inset-6 bg-white/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
                  <div className="relative space-y-4">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black flex items-center gap-3">
                      <span className="w-8 h-px bg-white/10" /> 02 // SOURCE
                    </span>
                    <a href="https://github.com/ANKIT21111" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-lg sm:text-xl font-black hover:text-blue-400 transition-all text-[var(--text-primary)] font-display overflow-hidden">
                      <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-[var(--nav-hover)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-blue-500/40 group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <Github size={24} className="text-[var(--text-primary)]" />
                      </div>
                      <span className="truncate tracking-tighter">ANKIT21111</span>
                    </a>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute -inset-6 bg-blue-500/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-all duration-700 blur-xl" />
                  <div className="relative space-y-4">
                    <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em] font-black flex items-center gap-3">
                      <span className="w-8 h-px bg-blue-500/10" /> 03 // INDEX
                    </span>
                    <a href="https://www.linkedin.com/in/ankitabhishekdataengineering/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 text-lg sm:text-xl font-black hover:text-blue-400 transition-all text-[var(--text-primary)] font-display overflow-hidden">
                      <div className="w-12 h-12 flex-shrink-0 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                        <Linkedin size={24} className="text-blue-500" />
                      </div>
                      <span className="truncate tracking-tighter">ANKIT-ABHISHEK</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Command Center */}
          <div className="lg:col-span-12 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] shadow-2xl relative overflow-hidden flex flex-col min-h-[650px] shadow-premium group/card"
            >
              {/* Animated Border Gradient */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent group-hover/card:via-blue-500 transition-all duration-700" />

              {/* Terminal Header */}
              <div className="px-6 sm:px-10 py-5 sm:py-7 bg-white/[0.03] border-b border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/30 border border-green-500/20" />
                </div>
                <div className="flex bg-black/40 px-5 py-2.5 rounded-2xl border border-white/5 shadow-inner">
                  <span className="text-[11px] font-medium text-blue-400 tracking-[0.1em] uppercase">
                    Let's Collaborate
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="flex-grow p-6 sm:p-10 md:p-14 relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <div className="space-y-4">
                      <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                        <Users size={14} className="text-blue-500 inline mr-2" /> Your Name *
                      </label>
                      <input
                        required
                        name="identifier"
                        type="text"
                        autoComplete="off"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-light text-white placeholder:text-gray-600 shadow-inner"
                        placeholder="e.g., John Smith"
                      />
                      <p className="text-xs text-gray-500 mt-2">How should we address you?</p>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                        <Mail size={14} className="text-blue-500 inline mr-2" /> Email Address *
                      </label>
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-light text-white placeholder:text-gray-600 shadow-inner"
                        placeholder="your.email@example.com"
                      />
                      <p className="text-xs text-gray-500 mt-2">We'll use this to get back to you</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[13px] font-semibold text-blue-400 uppercase tracking-[0.05em]">
                      <MessageSquare size={14} className="text-blue-500 inline mr-2" /> Project Details *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={6}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] px-8 py-6 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all font-light resize-none text-white placeholder:text-gray-600 shadow-inner custom-scrollbar"
                      placeholder="Tell me about your project, ideas, or collaboration proposal. What's on your mind?"
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-2">Be as detailed as you'd like—the more info, the better we can help</p>
                  </div>

                  <div className="relative pt-6">
                    <button
                      type="submit"
                      disabled={isSending}
                      className={`w-full py-6 rounded-[2rem] transition-all flex items-center justify-center gap-5 group relative overflow-hidden font-display text-xs tracking-[0.4em] uppercase ${isSending
                        ? 'bg-white/5 text-gray-600 cursor-not-allowed'
                        : 'bg-white text-black hover:scale-[1.01] active:scale-[0.98] shadow-[0_30px_60px_rgba(255,255,255,0.05)]'
                        }`}
                    >
                      {isSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                          <span className="animate-pulse">TRANSMITTING...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} className="text-blue-600 group-hover:scale-125 transition-transform" />
                          <span className="relative z-10">Send Message</span>
                          <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                          <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </>
                      )}
                    </button>

                    {!isSending && (
                      <div className="absolute -bottom-12 left-0 w-full text-center">
                        <span className="text-[10px] font-medium text-gray-600 uppercase tracking-[0.2em]">
                          Your message is safe and encrypted
                        </span>
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Decorative Terminal Footer */}
              <div className="px-10 py-6 bg-[var(--nav-hover)]/30 border-t border-[var(--border-color)] flex items-center justify-between">
                <div className="flex items-center gap-6 text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  <span className="flex items-center gap-2"><CheckCircle size={12} className="text-emerald-500/60" /> Ready</span>
                  <span className="hidden sm:flex items-center gap-2"><Mail size={12} className="text-blue-500/60" /> Response Time: Quick</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-slow" />
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">Online</span>
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
          className="mt-24 lg:mt-32"
        >
          <div className="relative group/meetup">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-[3.5rem] blur-3xl opacity-50" />

            <div className="relative p-8 md:p-16 lg:p-20 bg-[var(--bg-card)] border border-white/5 rounded-[3.5rem] shadow-premium overflow-hidden glass shimmer-premium">
              <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                <div className="lg:col-span-7 space-y-12">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium tracking-[0.1em] uppercase shadow-inner">
                    <Video size={14} className="animate-pulse" /> Let's schedule a video chat
                  </div>

                  <div className="space-y-8">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black font-display tracking-tight text-white leading-[0.85]">
                      Live Video <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500">
                        Meeting.
                      </span>
                    </h2>
                    <p className="text-[var(--text-secondary)] text-xl sm:text-2xl font-light leading-relaxed max-w-2xl border-l-2 border-emerald-500/20 pl-8 italic">
                      Let's hop on a video call and discuss your project in detail. I love working through ideas together!
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-8 pt-6">
                    <button
                      onClick={() => setIsScheduleOpen(true)}
                      className="w-full sm:w-auto px-12 py-6 rounded-2xl bg-white text-black font-display font-black text-[10px] tracking-[0.4em] uppercase hover:scale-[1.05] active:scale-[0.95] transition-all shadow-xl flex items-center justify-center gap-5 group relative overflow-hidden"
                    >
                      <span className="relative z-10">Initialize Sync</span>
                      <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-blue-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>

                    <div className="flex items-center gap-6 text-[10px] font-mono text-[var(--text-muted)] sm:border-l border-white/10 sm:pl-10">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-[#050505] bg-blue-500/10 flex items-center justify-center shadow-lg">
                            <Users size={14} className="text-blue-400" />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <div className="text-white font-black text-xs tracking-tight">4.2h Avg Response</div>
                        <div className="opacity-40 text-[9px] uppercase tracking-[0.2em] font-bold">Global Priority Sync</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/item hover:border-emerald-500/30 transition-all duration-500 shadow-inner group">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center mb-8 group-hover/item:scale-110 group-hover/item:bg-emerald-500/10 transition-all duration-500">
                      <Calendar size={24} className="text-emerald-500" />
                    </div>
                    <h4 className="text-lg font-black text-white font-display uppercase tracking-wider mb-3">Priority Prep</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light font-mono uppercase tracking-widest opacity-60">Calendar-synced scheduling matrix.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/item hover:border-blue-500/30 transition-all duration-500 shadow-inner group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center mb-8 group-hover/item:scale-110 group-hover/item:bg-blue-500/10 transition-all duration-500">
                      <Monitor size={24} className="text-blue-500" />
                    </div>
                    <h4 className="text-lg font-black text-white font-display uppercase tracking-wider mb-3">Live Arch</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light font-mono uppercase tracking-widest opacity-60">Interactive technical whiteboarding.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/item hover:border-purple-500/30 transition-all duration-500 shadow-inner group">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/5 border border-purple-500/10 flex items-center justify-center mb-8 group-hover/item:scale-110 group-hover/item:bg-purple-500/10 transition-all duration-500">
                      <Users size={24} className="text-purple-500" />
                    </div>
                    <h4 className="text-lg font-black text-white font-display uppercase tracking-wider mb-3">1-on-1 Sync</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light font-mono uppercase tracking-widest opacity-60">Direct administrative engineering access.</p>
                  </div>
                  <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 group/item hover:border-blue-400/30 transition-all duration-500 shadow-inner group">
                    <div className="w-14 h-14 rounded-2xl bg-blue-400/5 border border-blue-400/10 flex items-center justify-center mb-8 group-hover/item:scale-110 group-hover/item:bg-blue-400/10 transition-all duration-500">
                      <Shield size={24} className="text-blue-400" />
                    </div>
                    <h4 className="text-lg font-black text-white font-display uppercase tracking-wider mb-3">Secure P2P</h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light font-mono uppercase tracking-widest opacity-60">End-to-end encrypted transmission.</p>
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
