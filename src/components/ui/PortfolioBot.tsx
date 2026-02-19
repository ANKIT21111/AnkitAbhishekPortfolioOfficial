
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Shield, Sparkles, RefreshCw, Instagram, Cpu, Activity, Zap } from 'lucide-react';

// ─── Knowledge Base ───────────────────────────────────────────────
interface KnowledgeEntry {
    keywords: string[];
    response: string;
    category: 'education' | 'profession' | 'projects' | 'collaborate' | 'skills' | 'general' | 'social';
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    {
        keywords: ['education', 'study', 'degree', 'university', 'college', 'qualification', 'academic', 'school', 'learning', 'masters', 'bachelor', 'msc', 'btech'],
        response: `📚 **Ankit's Education Journey:**\n\n• **M.Sc. in Data Science** — Liverpool John Moores University (2024 – Present)\n  Currently pursuing advanced analytical techniques and data-driven research.\n\n• **Executive Post-Graduation** — IIIT Bangalore (2023 – 2024)\n  Specialized in Data Science with a focus on Data Engineering.\n\n• **Bachelor of Technology** (2017 – 2021)\n  Built a strong foundation in data structures, algorithms, and software engineering.`,
        category: 'education',
    },
    {
        keywords: ['work', 'experience', 'profession', 'career', 'job', 'employment', 'company', 'role', 'professional', 'tech mahindra'],
        response: `💼 **Professional Experience:**\n\n• **Software Engineer — Tech Mahindra** (2021 – 2024)\n  Served as an Application Developer, contributing to various software solutions and enterprise applications.\n\n**Core Focus Areas:**\n→ Data Infrastructure & Streaming Systems\n→ Scalable Pipelines & Distributed Processing\n→ Data Reliability & Governance`,
        category: 'profession',
    },
    {
        keywords: ['skills', 'technologies', 'tech stack', 'tools', 'programming', 'languages', 'framework'],
        response: `🛠️ **Technical Skills & Stack:**\n\n**Technical:**\n• Distributed Systems, React, Cloud Architecture\n• Kafka, Spark, PySpark, Airflow, SQL, MongoDB\n\n**Creative:**\n• Motion Design, User Psychology, Modern Web Dev`,
        category: 'skills',
    },
    {
        keywords: ['project', 'projects', 'portfolio', 'work samples', 'solutions', 'built', 'created', 'developed'],
        response: `🚀 **Featured Projects:**\n\n📌 **Patient Alert ETL** — Real-time data pipeline using Kafka, Spark, and HBase.\n📌 **SparNord ATM Analytics** — ETL Pipeline using PySpark and Airflow.\n📌 **Filmytics** — Data analytics for RSVP Movies using SQL.\n\n🔹 **Car Price Prediction** — ML model with 84% accuracy.\n🔹 **Portfolio Website** — This very site!`,
        category: 'projects',
    },
    {
        keywords: ['instagram', 'insta', 'social media', 'ig'],
        response: `📸 **Instagram Profile:**\n\nYou can connect with Ankit on Instagram:\n\n🔗 [instagram.com/humankitabhishek](https://www.instagram.com/humankitabhishek/)\n\nFeel free to connect and send a DM!`,
        category: 'social',
    },
    {
        keywords: ['collaborate', 'contact', 'hire', 'work together', 'connect'],
        response: `🤝 **Collaboration & Contact:**\n\nAnkit is open to Full-time opportunities, Freelance projects, and Open-source contributions.\n\n📬 **Reach out directly via:**\n• [Instagram](https://www.instagram.com/humankitabhishek/)\n• [Collaborate Page](/collaborate)`,
        category: 'collaborate',
    },
    {
        keywords: ['who', 'about', 'introduce', 'tell me about', 'yourself', 'ankit'],
        response: `👋 **About Ankit Abhishek:**\n\nAnkit is a Data Engineer & Software Developer specializing in high-performance backend systems and refined frontend experiences.\n\n🎓 LJMU (M.Sc.) | IIITB (PG) | Tech Mahindra (3y Exp)`,
        category: 'general',
    },
    {
        keywords: ['hello', 'hi', 'hey', 'help'],
        response: `👋 **Hello! I'm Ankit's Portfolio Assistant.**\n\nI can help you with:\n🎓 Education & Profession\n🚀 Featured Projects\n🛠️ Technical Skills\n📸 Instagram\n\nHow can I help you?`,
        category: 'general',
    },
];

const BLOCKED_KEYWORDS = [
    'address', 'home', 'location', 'age', 'birthday', 'salary', 'income',
    'married', 'relationship', 'family', 'ssn', 'bank', 'password', 'phone', 'number', 'whatsapp', 'mobile'
];

const isBlocked = (input: string) => {
    const normalized = input.toLowerCase();
    const socialKeywords = ['instagram', 'ig', 'ping', 'message'];
    const hasSocialKeyword = socialKeywords.some(k => normalized.includes(k));
    if (hasSocialKeyword) return false;
    return BLOCKED_KEYWORDS.some(blocked => normalized.includes(blocked));
};

const GUARDRAIL_RESPONSE = `🔒 **Privacy Protected**\n\nI cannot share sensitive personal details. You can contact Ankit via:\n\n✅ [Instagram](https://www.instagram.com/humankitabhishek/)\n✅ [Collaborate Page](/collaborate)`;

const SUGGESTED_PROMPTS = [
    { text: 'Education', icon: '🎓' },
    { text: 'Projects', icon: '🚀' },
    { text: 'Skills', icon: '🛠️' },
    { text: 'Instagram', icon: '📸' },
];

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

function getResponse(input: string): string {
    const normalizedInput = input.toLowerCase().trim();
    if (isBlocked(normalizedInput)) return GUARDRAIL_RESPONSE;

    let bestMatch: KnowledgeEntry | null = null;
    let bestScore = 0;

    for (const entry of KNOWLEDGE_BASE) {
        let score = 0;
        for (const keyword of entry.keywords) {
            if (normalizedInput.includes(keyword.toLowerCase())) {
                score += keyword.length;
            }
        }
        if (score > bestScore) {
            bestScore = score;
            bestMatch = entry;
        }
    }

    if (bestMatch && bestScore > 0) return bestMatch.response;
    return `🤔 I'm not sure about that. Try asking about my **Education**, **Projects**, or how to connect via **Instagram**!`;
}

// ─── Component ────────────────────────────────────────────────────
const PortfolioBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [hasNewMessage, setHasNewMessage] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Magnetic interaction values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const WELCOME_MESSAGE: Message = {
        id: 'welcome',
        role: 'bot',
        content: `⚡ **ANKIT_PROTOCOL // v2.2**\n\nNeural link established. How can I assist you today?\n\n🎓 Education | 🚀 Projects | 📸 Instagram`,
        timestamp: new Date(),
    };

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        if (isOpen && messages.length === 0) setMessages([WELCOME_MESSAGE]);
        if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
    }, [isOpen, messages.length]);

    const handleSend = useCallback((text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || isThinking) return;

        const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: messageText, timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsThinking(true);

        setTimeout(() => {
            const response = getResponse(messageText);
            const botMsg: Message = { id: `b-${Date.now()}`, role: 'bot', content: response, timestamp: new Date() };
            setMessages(prev => [...prev, botMsg]);
            setIsThinking(false);
        }, 600 + Math.random() * 600);
    }, [input, isThinking]);

    const clearChat = () => {
        setMessages([WELCOME_MESSAGE]);
        setInput('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    useEffect(() => {
        setHasNewMessage(!isOpen && messages.length > 0);
    }, [isOpen, messages.length]);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        // Magnetic pull factor
        mouseX.set(x * 0.35);
        mouseY.set(y * 0.35);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            let formatted = line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                .replace(/_(.*?)_/g, '<em class="text-gray-400 italic">$1</em>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-400 hover:text-blue-300 underline">$1</a>');
            return <span key={i} className="block" dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
        });
    };

    return (
        <>
            {/* ── Technical Bot Toggle Button ── */}
            <motion.div
                className="fixed bottom-6 right-6 z-[9998] flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
            >
                {/* Status Indicator */}
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="hidden md:flex flex-col items-end pointer-events-none"
                    >
                        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/5">
                            <span className="text-[10px] font-mono text-blue-400 tracking-tighter uppercase font-medium">System_Online</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                        </div>
                        <div className="text-[8px] font-mono text-gray-500 tracking-widest mt-1 uppercase mr-1">Ankit_Protocol_v2.2</div>
                    </motion.div>
                )}

                <motion.button
                    id="portfolio-bot-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ x: springX, y: springY }}
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center group overflow-visible"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Animated Outer Technical Ring */}
                    <div className="absolute inset-[-4px] rounded-[22px] border border-blue-500/0 group-hover:border-blue-500/30 transition-colors duration-500" />

                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible">
                        <motion.circle
                            cx="32" cy="32" r="30"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="transparent"
                            className="text-blue-500/20"
                        />
                        <motion.circle
                            cx="32" cy="32" r="30"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="transparent"
                            strokeDasharray="188.5"
                            animate={{
                                strokeDashoffset: isOpen ? 0 : 188.5,
                                opacity: isOpen ? 1 : 0.4
                            }}
                            className="text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        />
                        {/* Spinning Technical Segments */}
                        {!isOpen && (
                            <motion.circle
                                cx="32" cy="32" r="34"
                                stroke="currentColor"
                                strokeWidth="1"
                                fill="transparent"
                                strokeDasharray="10 40"
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                className="text-white/10"
                            />
                        )}
                    </svg>

                    {/* Main Button Body */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] border border-white/10 group-hover:border-blue-500/40 transition-colors duration-500 flex items-center justify-center overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                        {/* Button Background Visuals */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent)]" />

                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="close" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: 90 }}>
                                    <X size={22} className="text-white" />
                                </motion.div>
                            ) : (
                                <motion.div key="open" initial={{ scale: 0, rotate: 90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -90 }} className="relative">
                                    <Bot size={24} className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                                    {/* Scan Line Animation */}
                                    <motion.div
                                        className="absolute -inset-2 bg-blue-500/10 h-[1px] top-1/2 -translate-y-1/2 pointer-events-none"
                                        animate={{ top: ['10%', '90%', '10%'] }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Notification Alert */}
                    {hasNewMessage && !isOpen && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-[#050505] z-10 flex items-center justify-center"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        </motion.div>
                    )}

                    {/* Hover Glow */}
                    <div className="absolute inset-[-20px] bg-blue-500/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </motion.button>
            </motion.div>

            {/* ── Chat Window ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        id="portfolio-bot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-4 md:right-8 z-[9998] w-[calc(100vw-2rem)] max-w-[420px] h-[min(80vh,600px)] flex flex-col rounded-3xl overflow-hidden glass border border-white/10 shadow-[0_32px_128px_rgba(0,0,0,0.8)]"
                    >
                        {/* Technical Window Header */}
                        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between flex-shrink-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
                            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

                            <div className="flex items-center gap-3 relative">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group/bot">
                                    <Bot size={20} className="text-blue-400 group-hover/bot:rotate-12 transition-transform" />
                                    <motion.div
                                        className="absolute inset-0 border border-blue-400/30 rounded-xl"
                                        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 3 }}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                                        Ankit_Protocol
                                        <span className="text-[10px] font-mono font-medium text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20">LIVE</span>
                                    </h3>
                                    <div className="flex items-center gap-1.5">
                                        <Activity size={10} className="text-emerald-400" />
                                        <span className="text-[9px] font-mono text-emerald-400/80 tracking-widest uppercase">Encryption_Enabled</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 relative">
                                <button onClick={clearChat} title="Clear Terminal" className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-blue-400 transition-all border border-transparent hover:border-white/5 active:scale-95"><RefreshCw size={15} /></button>
                                <div className="w-[1px] h-4 bg-white/10 mx-1" />
                                <a href="https://www.instagram.com/humankitabhishek/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl hover:bg-white/5 text-gray-400 hover:text-pink-400 transition-all border border-transparent hover:border-white/5 active:scale-95"><Instagram size={15} /></a>
                            </div>
                        </div>

                        {/* Messages Area with Code/Tech feel */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 custom-scrollbar relative">
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

                            {messages.map(msg => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border ${msg.role === 'bot'
                                            ? 'bg-blue-500/5 border-blue-500/20 text-blue-400'
                                            : 'bg-white/5 border-white/10 text-gray-400'
                                        }`}>
                                        {msg.role === 'bot' ? <Sparkles size={16} /> : <User size={16} />}
                                    </div>
                                    <div className={`max-w-[85%] px-5 py-4 rounded-2xl text-[13px] leading-relaxed relative ${msg.role === 'user'
                                            ? 'bg-blue-600/20 border border-blue-500/20 text-white rounded-tr-sm'
                                            : 'bg-white/[0.04] border border-white/[0.08] text-gray-300 rounded-tl-sm'
                                        }`}>
                                        {renderMarkdown(msg.content)}
                                        {/* Timestamp Label */}
                                        <div className={`text-[8px] font-mono mt-3 opacity-30 tracking-widest uppercase ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            [{msg.timestamp.getHours().toString().padStart(2, '0')}:{msg.timestamp.getMinutes().toString().padStart(2, '0')} // NODE_SYS]
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3.5">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Cpu size={16} className="text-blue-400 animate-pulse" />
                                    </div>
                                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm px-5 py-4 flex gap-2 items-center">
                                        <div className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest flex items-center gap-2">
                                            Processing
                                            <span className="flex gap-1">
                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                                                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Interactive Command Center (Input) */}
                        <div className="p-5 flex-shrink-0 space-y-4 bg-black/40 border-t border-white/5 relative">
                            <div className="flex flex-wrap gap-2">
                                {SUGGESTED_PROMPTS.map(p => (
                                    <motion.button
                                        key={p.text}
                                        onClick={() => handleSend(p.text)}
                                        whileHover={{ y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-3.5 py-1.5 rounded-lg text-[10px] font-mono tracking-tighter bg-white/[0.02] border border-white/5 text-gray-400 hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all flex items-center gap-2 group"
                                    >
                                        <span className="grayscale group-hover:grayscale-0 transition-all">{p.icon}</span>
                                        {p.text.toUpperCase()}
                                    </motion.button>
                                ))}
                            </div>
                            <div className="relative group/input">
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 rounded-xl opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-opacity duration-500" />
                                <div className="relative flex gap-2">
                                    <div className="flex-1 relative flex items-center">
                                        <div className="absolute left-4 text-blue-500/50">
                                            <Zap size={14} className="animate-pulse" />
                                        </div>
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Execute command or ask something..."
                                            className="w-full bg-[#080808] border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-white text-[13px] focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-700"
                                        />
                                    </div>
                                    <motion.button
                                        onClick={() => handleSend()}
                                        disabled={!input.trim() || isThinking}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)] disabled:opacity-20 disabled:shadow-none transition-all"
                                    >
                                        <Send size={18} className="text-white ml-0.5" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-1.5 opacity-20 hover:opacity-100 transition-opacity">
                                <Shield size={8} className="text-gray-400" />
                                <span className="text-[7px] font-mono text-gray-400 tracking-[0.2em] uppercase">Security_Protocol_Active // End_to_End_Encryption</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioBot;
