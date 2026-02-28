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
        response: `🎓 **Academic Journey**\n\n• **M.Sc. in Data Science** *(Liverpool John Moores University, 2024 – Present)*\n• **Executive PG in Data Science** *(IIIT Bangalore, 2023 – 2024)*\n• **B.Tech in Computer Science** *(2017 – 2021)*\n\nMy studies focus on bridging the gap between raw data engineering and advanced machine learning models.`,
        category: 'education',
    },
    {
        keywords: ['work', 'experience', 'profession', 'career', 'job', 'employment', 'tech mahindra', 'software engineer', 'role', 'developer'],
        response: `💼 **Professional Journey**\n\n**Software Engineer @ Tech Mahindra (2021 – 2024)**\nBuilt scalable, enterprise-grade data solutions. Key focus areas:\n\n🚀 High-performance Data Infrastructure\n⚙️ Complex ETl/ELT Pipeline Engineering\n🔐 Backend System Reliability`,
        category: 'profession',
    },
    {
        keywords: ['skills', 'technologies', 'tech stack', 'tools', 'programming', 'languages', 'python', 'javascript', 'typescript', 'spark', 'kafka', 'airflow', 'sql', 'mongodb'],
        response: `🛠️ **My Tech Arsenal**\n\n• **Data Engineering:** Apache Spark, Kafka, Airflow, PySpark, MapReduce\n• **Databases:** SQL, HBase, MongoDB\n• **Languages:** Python, JavaScript, TypeScript, Java\n• **Web & UI:** React, Vite, Framer Motion, Tailwind CSS\n\nI believe in picking the right tool for the job to build robust systems!`,
        category: 'skills',
    },
    {
        keywords: ['all projects', 'show projects', 'portfolio', 'work samples', 'github repos', 'list projects', 'what have you built'],
        response: `🚀 **Featured Projects**\n\nHere are some of my top builds:\n1. 🏥 **Patient Alert ETL** - Real-time IoT Monitoring\n2. 🏦 **SparNord ATM Analytics** - Cash Flow Optimization\n3. 🎬 **Filmytics** - BI for RSVP Movies\n4. 🚗 **Car Price Prediction** - ML Regression Model\n5. 🚕 **NYC Taxi Analytics** - Big Data Patterns\n\n_Ask me about any specific project (e.g. "Tell me about Filmytics")!_`,
        category: 'projects',
    },
    {
        keywords: ['patient alert', 'patient etl', 'iot health', 'medical project', 'vital monitoring', 'hbase kafka'],
        response: `🏥 **Patient Alert ETL**\n\n**Mission:** Architect a real-time health monitoring system via IoT devices.\n**Tech Stack:** Kafka, Apache Spark, HBase.\n\n**Impact:** Mastered handling high-velocity streaming data & designing NoSQL schemas for millisecond-latency medical interventions!`,
        category: 'projects',
    },
    {
        keywords: ['sparnord', 'atm analytics', 'bank project', 'cash management', 'refilling'],
        response: `🏦 **SparNord ATM Analytics**\n\n**Mission:** Optimize ATM refilling schedules across Europe.\n**Tech Stack:** PySpark, Apache Airflow.\n\n**Impact:** Orchestrated complex data workflows processing massive cross-border financial logs, leading to direct operational cost reductions.`,
        category: 'projects',
    },
    {
        keywords: ['filmytics', 'rsvp movies', 'movie analysis', 'cinema analytics'],
        response: `🎬 **Filmytics**\n\n**Mission:** Drive strategic Business Intelligence for RSVP Movies.\n**Tech Stack:** Advanced SQL, Excel BI.\n\n**Impact:** Executed complex data cleaning and advanced querying to unlock growth strategies and talent performance insights from raw cinema data.`,
        category: 'projects',
    },
    {
        keywords: ['car price', 'prediction model', 'linear regression'],
        response: `🚗 **Car Price Predictor**\n\n**Mission:** Develop an ML model to predict vehicle prices.\n**Tech Stack:** Python, Scikit-Learn, Pandas.\n\n**Impact:** Achieved 84% predictive accuracy. Deep-dived into feature engineering, managing outliers, and ensuring model reliability.`,
        category: 'projects',
    },
    {
        keywords: ['nyc taxi', 'taxi analytics', 'new york taxi', 'mapreduce taxi'],
        response: `🚕 **NYC Taxi Analytics**\n\n**Mission:** Analyze large-scale urban mobility patterns.\n**Tech Stack:** Hadoop ecosystem, MapReduce.\n\n**Impact:** Processed terabytes of trip records using MapReduce to identify urban mobility flow patterns. Big data in action!`,
        category: 'projects',
    },
    {
        keywords: ['instagram', 'insta', 'social media', 'ig', 'connect', 'dm'],
        response: `📸 **Let's Connect on Instagram!**\n\nI'm very active on Instagram for tech discussions or casual chats. Reach out here:\n\n🔗 [instagram.com/humankitabhishek](https://www.instagram.com/humankitabhishek/)`,
        category: 'social',
    },
    {
        keywords: ['collaborate', 'contact', 'hire', 'work together', 'freelance', 'email', 'get in touch'],
        response: `🤝 **Let's Build Together!**\n\nI'm open to exciting opportunities in Data Engineering and Software Development.\n\n📬 **Action:** Visit the [Collaborate Page](/collaborate) or shoot me a DM on [Instagram](https://www.instagram.com/humankitabhishek/).`,
        category: 'collaborate',
    },
    {
        keywords: ['who are you', 'about ankit', 'introduce', 'biography', 'background', 'tell me about yourself', 'your story'],
        response: `👋 **Hi! I'm Ankit Abhishek**\n\nI'm a Data Engineer & Software Developer focused on distributed systems and polished user interfaces. \n\nI worked at **Tech Mahindra** for 3 years, and I'm currently finishing my **M.Sc. in Data Science** at LJMU.\n\nI build systems that don't just work—they perform!`,
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
    if (normalizedInput.match(/hi|hello|hey|greetings|sup|howdy/)) {
        return `👋 **Hello there! Connection Established.**\n\nI am Ankit's personal AI interface. You can ask me about his **Projects**, **Skills**, **Work Experience**, or how to **Collaborate**!`;
    }

    return `🤔 **Hmm... I couldn't find an exact match for that.**\n\nTry asking me something like:\n• "Tell me about your experience"\n• "What are your core skills?"\n• "Show me your projects"\n• "How can we collaborate?"`;
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
        content: `⚡ **ANKIT_OS // Neural Link Active**\n\nWelcome! I am Ankit's AI assistant. I can help you explore his **Experience**, **Tech Stack**, and **Projects**. How can I assist you today?`,
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
                        <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between flex-shrink-0 relative overflow-hidden bg-gradient-to-r from-blue-500/10 via-purple-500/5 to-transparent">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent" />
                            <div className="flex items-center gap-4 relative">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/30 blur-md rounded-full animate-pulse" />
                                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-500/20 to-purple-500/10 border border-blue-500/30 flex items-center justify-center relative backdrop-blur-sm">
                                        <Bot size={22} className="text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-[var(--text-primary)] font-bold text-[15px] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 drop-shadow-sm">Ankit_Assistant</h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                                        <span className="text-[10px] font-mono text-emerald-400/80 uppercase tracking-widest font-semibold">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={clearChat}
                                title="Reset Chat"
                                className="p-2.5 rounded-xl hover:bg-white/5 text-[var(--text-dim)] hover:text-blue-400 transition-all border border-transparent hover:border-white/10"
                            >
                                <RefreshCw size={16} />
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

                            {/* Suggestions */}
                            {!isThinking && messages.length > 0 && messages[messages.length - 1].role === 'bot' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-2 pt-2 px-1"
                                >
                                    {["Tell me about your experience", "What are your core skills?", "Show me your projects"].map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(suggestion)}
                                            className="px-3.5 py-2 text-[12px] bg-[var(--bg-secondary)] hover:bg-blue-500/10 text-[var(--text-dim)] hover:text-blue-400 border border-[var(--border-color)] hover:border-blue-500/40 rounded-[14px] transition-all duration-300 font-medium tracking-wide shadow-sm"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
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
