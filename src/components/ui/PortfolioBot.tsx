import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Shield, Sparkles, RefreshCw, Instagram, Cpu, Activity, Zap, Terminal } from 'lucide-react';

// ─── Knowledge Base ───────────────────────────────────────────────
interface KnowledgeEntry {
    keywords: string[];
    response: string;
    category: 'education' | 'profession' | 'projects' | 'collaborate' | 'skills' | 'general' | 'social';
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    {
        keywords: ['education', 'study', 'degree', 'university', 'college', 'qualification', 'academic', 'masters', 'msc', 'btech', 'schooling', 'graduated'],
        response: `📚 **Academic Record:**\n\n• **M.Sc. in Data Science** (Liverpool John Moores University, 2024 – Present)\n• **Executive PG in Data Science** (IIIT Bangalore, 2023 – 2024)\n• **Bachelor of Technology** (2017 – 2021)\n\nAnkit focuses on bridging the gap between raw data engineering and advanced analytical research.`,
        category: 'education',
    },
    {
        keywords: ['work', 'experience', 'profession', 'career', 'job', 'employment', 'tech mahindra', 'software engineer', 'role', 'developer'],
        response: `💼 **Professional Background:**\n\n**Software Engineer @ Tech Mahindra (2021 – 2024)**\nServed as an Application Developer building enterprise-grade solutions. Specialized in:\n\n→ High-performance Data Infrastructure\n→ Scalable Pipeline Engineering\n→ API & Backend Reliability`,
        category: 'profession',
    },
    {
        keywords: ['skills', 'technologies', 'tech stack', 'tools', 'programming', 'languages', 'python', 'javascript', 'typescript', 'spark', 'kafka', 'airflow', 'sql', 'mongodb'],
        response: `🛠️ **Technical Stack:**\n\n• **Data Eng:** Spark, Kafka, Airflow, PySpark, MapReduce\n• **Databases:** SQL, HBase, MongoDB\n• **Web:** React, Vite, Framer Motion, Tailwind\n• **Languages:** Python, JavaScript, TypeScript`,
        category: 'skills',
    },
    {
        keywords: ['all projects', 'show projects', 'portfolio', 'work samples', 'github repos', 'list projects'],
        response: `🚀 **Featured Projects:**\n\n1. **Patient Alert ETL** (Real-time IoT Monitoring)\n2. **SparNord ATM Analytics** (Cash Flow Optimization)\n3. **Filmytics** (BI for RSVP Movies)\n4. **Car Price Prediction** (ML Regression)\n5. **NYC Taxi Analytics** (Big Data Patterns)\n\n_Ask me about a specific project to see deep-dives and learnings!_`,
        category: 'projects',
    },
    {
        keywords: ['patient alert', 'patient etl', 'iot health', 'medical project', 'vital monitoring', 'hbase kafka'],
        response: `🏥 **Patient Alert ETL Deep-Dive:**\n\n**Mission:** Real-time health monitoring via IoT devices.\n**Stack:** Kafka, Spark, HBase.\n**Learned:** I mastered handling high-velocity streaming data and architecting NoSQL schemas for millisecond-latency medical interventions.`,
        category: 'projects',
    },
    {
        keywords: ['sparnord', 'atm analytics', 'bank project', 'cash management', 'refilling'],
        response: `🏦 **SparNord ATM Analytics Deep-Dive:**\n\n**Mission:** Optimize ATM refilling frequency across Europe.\n**Stack:** PySpark, Airflow.\n**Learned:** I learned to orchestrate complex data workflows with Airflow and use PySpark to process massive cross-border financial logs for cost reduction.`,
        category: 'projects',
    },
    {
        keywords: ['filmytics', 'rsvp movies', 'movie analysis', 'cinema analytics'],
        response: `🎬 **Filmytics Deep-Dive:**\n\n**Mission:** Strategic BI for RSVP Movies.\n**Stack:** SQL, Excel.\n**Learned:** I mastered complex data cleaning and advanced SQL querying to derive growth strategies and talent performance insights for production houses.`,
        category: 'projects',
    },
    {
        keywords: ['car price', 'prediction model', 'linear regression'],
        response: `🚗 **Car Price Prediction Deep-Dive:**\n\n**Mission:** ML model with 84% accuracy.\n**Stack:** Python, Scikit-Learn.\n**Learned:** I learned the intricacies of feature engineering and the impact of outlier handling on predictive model reliability.`,
        category: 'projects',
    },
    {
        keywords: ['nyc taxi', 'taxi analytics', 'new york taxi', 'mapreduce taxi'],
        response: `🚕 **NYC Taxi Analytics Deep-Dive:**\n\n**Mission:** Large-scale mobility pattern analysis.\n**Stack:** MapReduce.\n**Learned:** I mastered the MapReduce paradigm to process terabytes of trip records and identify urban mobility flow patterns.`,
        category: 'projects',
    },
    {
        keywords: ['instagram', 'insta', 'social media', 'ig', 'connect', 'dm'],
        response: `📸 **Instagram Connectivity:**\n\nYou can reach Ankit directly on Instagram for creative discussions or casual pings:\n\n🔗 [instagram.com/humankitabhishek](https://www.instagram.com/humankitabhishek/)`,
        category: 'social',
    },
    {
        keywords: ['collaborate', 'contact', 'hire', 'work together', 'freelance'],
        response: `🤝 **Let's Build Together:**\n\nAnkit is open to opportunities in Data Engineering and Software Development.\n\n📬 **Action:** Visit the [Collaborate Page](/collaborate) or message via [Instagram](https://www.instagram.com/humankitabhishek/).`,
        category: 'collaborate',
    },
    {
        keywords: ['who are you', 'about ankit', 'introduce', 'biography', 'background', 'tell me about yourself'],
        response: `👋 **Ankit Abhishek // Technical Profile:**\n\nI am a Data Engineer & Software Developer focused on distributed systems and refined user interfaces. \n\nGraduated from **Tech Mahindra** (3y Exp) and currently finishing my **M.Sc. in Data Science** at LJMU. I build systems that don't just work—they perform.`,
        category: 'general',
    },
];

// ─── Identity Guardrails ──────────────────────────────────────────
const BLOCKED_KEYWORDS = [
    'age', 'birthday', 'born', 'address', 'home', 'house', 'salary', 'income', 'money', 'family', 'ssn', 'aadhaar', 'pan card', 'passport', 'phone', 'number', 'whatsapp', 'mobile', 'password', 'secret', 'private'
];

const isBlocked = (input: string) => {
    const normalized = input.toLowerCase();
    // Block identity probing immediately
    return BLOCKED_KEYWORDS.some(blocked => normalized.includes(blocked.toLowerCase()));
};

const GUARDRAIL_RESPONSE = `🔒 **PROTOCOL_SECURE // IDENTITY_PROTECTED**\n\nI am authorized to share professional expertise only. I cannot disclose personal identification, financial data, or private contact details.\n\n✅ [LinkedIn](https://www.linkedin.com/in/ankitabhishekdataengineering/) | [GitHub](https://github.com/ANKIT21111)`;

// ─── Refined Response Logic ───────────────────────────────────────
function getResponse(input: string): string {
    const normalizedInput = input.toLowerCase().trim();
    if (isBlocked(normalizedInput)) return GUARDRAIL_RESPONSE;

    // Phase 1: Direct Entity Matching (Exact Phrases)
    const scoredEntries = KNOWLEDGE_BASE.map(entry => {
        let score = 0;
        for (const kw of entry.keywords) {
            const kwLower = kw.toLowerCase();
            if (normalizedInput.includes(kwLower)) {
                // Strategic Scoring: Exact phrase match gets higher priority than partial
                const isExact = new RegExp(`\\b${kwLower}\\b`).test(normalizedInput);
                score += isExact ? kwLower.length * 3 : kwLower.length;
            }
        }
        return { entry, score };
    });

    scoredEntries.sort((a, b) => b.score - a.score);
    const bestMatch = scoredEntries[0];

    // Priority Check: If we have a clear intent winner
    if (bestMatch && bestMatch.score > 2) {
        return bestMatch.entry.response;
    }

    // Phase 2: Conversational Fallback
    if (normalizedInput.match(/hi|hello|hey|greetings/)) {
        return `👋 **Connection Established.**\n\nHow can I help you? Ask about my **Projects**, **Technical Stack**, or **Academic Record**.`;
    }

    return `🤔 **QUERY_NOT_RECOGNIZED**\n\nTo provide the exact technical requirements you need, please specify a topic:\n\n• **Education**\n• **Profession**\n• **Specific Project Name** (e.g., "Filmytics")\n• **Skills**`;
}

// ─── Component ────────────────────────────────────────────────────
const PortfolioBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const WELCOME_MESSAGE: Message = {
        id: 'welcome',
        role: 'bot',
        content: `⚡ **ANKIT_PROTOCOL // v3.5**\n\nNeural link active. I am ready to process your queries regarding projects and technical specifications.`,
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

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
        mouseY.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
    };

    const renderMarkdown = (text: string) => {
        return text.split('\n').map((line, i) => {
            let formatted = line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-primary)] font-semibold">$1</strong>')
                .replace(/_(.*?)_/g, '<em class="text-[var(--text-dim)] italic">$1</em>')
                .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-400 underline underline-offset-4 decoration-blue-500/30 transition-colors">$1</a>');
            return <span key={i} className="block leading-relaxed" dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
        });
    };

    return (
        <>
            <motion.div className="fixed bottom-6 right-6 md:right-8 z-[9998] flex items-center gap-4">
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        className="hidden md:flex flex-col items-end pointer-events-none"
                    >
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] backdrop-blur-xl border border-[var(--border-color)] shadow-xl">
                            <span className="text-[10px] font-mono text-blue-500 tracking-widest uppercase font-bold">Bot_Active</span>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse" />
                        </div>
                    </motion.div>
                )}
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                    style={{ x: springX, y: springY }}
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center group pointer-events-auto"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                >
                    {/* Pulsing ring when closed */}
                    {!isOpen && <div className="absolute inset-[-4px] rounded-[22px] border-2 border-blue-500/20 animate-ping opacity-30 pointer-events-none" />}

                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible scale-110">
                        <motion.circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-blue-500/10" />
                        <motion.circle
                            cx="32" cy="32" r="30"
                            stroke="currentColor" strokeWidth="2"
                            fill="transparent"
                            strokeDasharray="188.5"
                            animate={{
                                strokeDashoffset: isOpen ? 0 : 188.5,
                                opacity: isOpen ? 1 : 0.6,
                                rotate: isOpen ? 90 : 0
                            }}
                            className="text-blue-500 transition-all duration-500"
                        />
                    </svg>

                    <div className="absolute inset-0 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:border-blue-500/30 transition-colors">
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="c" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                                    <X size={24} className="text-[var(--text-primary)]" />
                                </motion.div>
                            ) : (
                                <motion.div key="o" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -180 }}>
                                    <Bot size={28} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' }}
                        className="fixed bottom-24 right-4 md:right-8 z-[9998] w-[calc(100vw-2.5rem)] max-w-[430px] h-[min(82vh,580px)] flex flex-col rounded-[32px] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-color)] shadow-[0_40px_100px_rgba(0,0,0,0.5)] glass-container"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between flex-shrink-0 relative overflow-hidden bg-gradient-to-r from-blue-500/5 to-transparent">
                            <div className="flex items-center gap-4 relative">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Cpu size={20} className="text-blue-500" />
                                </div>
                                <div>
                                    <h3 className="text-[var(--text-primary)] font-bold text-[14px] tracking-tight">Ankit_Assistant</h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[9px] font-mono text-[var(--text-dim)] uppercase tracking-wider">Neural_Link_Active</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={clearChat}
                                title="Reset Core"
                                className="p-2.5 rounded-xl hover:bg-[var(--bg-secondary)] text-[var(--text-dim)] hover:text-blue-500 transition-all border border-transparent hover:border-[var(--border-color)]"
                            >
                                <RefreshCw size={14} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 custom-scrollbar relative">
                            {/* Subtle background tech pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
                                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,var(--text-primary)_1px,transparent_0)] bg-[length:32px_32px]" />
                            </div>

                            <AnimatePresence mode="popLayout">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                        className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border shadow-sm ${msg.role === 'bot' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' : 'bg-[var(--bg-secondary)] border-[var(--border-color)] text-[var(--text-dim)]'}`}>
                                            {msg.role === 'bot' ? <Sparkles size={14} /> : <User size={14} />}
                                        </div>
                                        <div className={`max-w-[85%] space-y-1 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            <div className={`px-5 py-3.5 rounded-2xl text-[13px] leading-relaxed relative border transition-all ${msg.role === 'user'
                                                    ? 'bg-blue-500/10 border-blue-500/20 text-[var(--text-primary)] rounded-tr-sm'
                                                    : 'bg-[var(--nav-hover)] border border-[var(--border-color)] text-[var(--text-dim)] rounded-tl-sm'
                                                }`}>
                                                {renderMarkdown(msg.content)}
                                            </div>
                                            <span className="px-2 text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-tighter">
                                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
                                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Activity size={14} className="text-blue-500 animate-pulse" />
                                    </div>
                                    <div className="bg-[var(--nav-hover)] border border-[var(--border-color)] rounded-2xl px-5 py-3.5 shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="flex gap-1">
                                                {[0, 1, 2].map(i => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                        className="w-1.5 h-1.5 rounded-full bg-blue-500"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[9px] font-mono text-blue-500/60 uppercase tracking-[0.2em] font-bold">Initializing...</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-black/20 border-t border-white/5 space-y-4">
                            <div className="relative group/input">
                                <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-focus-within/input:opacity-100 blur-[2px] transition-all duration-500" />
                                <div className="relative flex gap-1 items-center bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl focus-within:border-blue-500/50 transition-all px-2">
                                    <div className="pl-3 text-[var(--text-muted)]">
                                        <Terminal size={14} />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter search sequence..."
                                        className="flex-1 bg-transparent border-none rounded-2xl px-3 py-4 text-[var(--text-primary)] text-[13px] focus:outline-none placeholder:text-[var(--text-muted)] font-mono"
                                    />
                                    <motion.button
                                        onClick={() => handleSend()}
                                        disabled={!input.trim() || isThinking}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 shadow-[0_4px_20px_rgba(59,130,246,0.3)] disabled:opacity-20 transition-all flex-shrink-0 mx-1"
                                    >
                                        <Send size={18} className="text-white" />
                                    </motion.button>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-2 opacity-30 select-none">
                                <Shield size={9} className="text-blue-500" />
                                <span className="text-[8px] font-mono text-[var(--text-dim)] tracking-[0.3em] uppercase">Secured_Identity_Layer_v4</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: var(--border-color);
                    border-radius: 10px;
                    transition: all 0.2s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: var(--text-muted);
                }
                .glass-container {
                    backdrop-filter: blur(40px) saturate(180%);
                    -webkit-backdrop-filter: blur(40px) saturate(180%);
                }
            ` }} />
        </>
    );
};

interface Message {
    id: string;
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

export default PortfolioBot;
