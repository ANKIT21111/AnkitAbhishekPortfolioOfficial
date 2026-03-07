import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Shield, Sparkles, RefreshCw, Instagram, Cpu, Activity, Zap, Terminal } from 'lucide-react';

// ─── Knowledge Base ───────────────────────────────────────────────
interface KnowledgeEntry {
    keywords: string[];
    response: string;
    category: 'resume' | 'projects' | 'interview' | 'skills' | 'general' | 'social';
}

const KNOWLEDGE_BASE: KnowledgeEntry[] = [
    {
        keywords: ['resume', 'cv', 'experience', 'background', 'education', 'study', 'work', 'job', 'employment', 'tech mahindra', 'degree', 'university', 'college'],
        response: `📄 **Professional Resume Overview**\n\n**Education:**\n• **M.Sc. in Data Science** (LJMU, 2024-Present)\n• **Exec PG in Data Science** (IIIT Bangalore, 2023-2024)\n• **B.Tech in CSE** (2017-2021)\n\n**Experience:**\n• **Software Engineer @ Tech Mahindra** (2021-2024): Architected enterprise data solutions and high-performance pipelines.\n\n_Type "tell me more about work" or "education details" for specifics._`,
        category: 'resume',
    },
    {
        keywords: ['work details', 'tech mahindra', 'professional experience'],
        response: `💼 **Work Experience: Tech Mahindra (2021-2024)**\n\nAs a Software Engineer, I focused on:\n• **Data Infrastructure:** Building scalable foundation for enterprise apps.\n• **Pipeline Engineering:** Designing complex ETL/ELT flows.\n• **System Reliability:** Ensuring 99.9% uptime for backend services.\n\nMy role bridged the gap between raw data and actionable business intelligence.`,
        category: 'resume',
    },
    {
        keywords: ['skills', 'tech stack', 'languages', 'tools', 'python', 'spark', 'kafka', 'hadoop', 'sql', 'react'],
        response: `🛠️ **My Tech Arsenal**\n\n• **Data Engineering:** Spark, Kafka, Airflow, Hadoop, Hive, Sqoop\n• **Databases:** SQL, HBase, MongoDB, Redshift\n• **Languages:** Python, Java, JavaScript, TypeScript, SQL\n• **Frontend:** React, Vite, Tailwind CSS, Framer Motion\n\nI specialize in distributed systems and high-performance data architectures.`,
        category: 'skills',
    },
    {
        keywords: ['projects', 'portfolio', 'builds', 'what have you made', 'list projects'],
        response: `🚀 **Featured Projects**\n\nI've built several high-impact systems:\n1. 🏥 **Patient Alert ETL**: Real-time IoT health monitoring (Kafka/Spark/HBase).\n2. 🏦 **SparNord ATM Analytics**: Financial flow optimization (PySpark/Airflow).\n3. 🎬 **Filmytics**: BI for RSVP Movies (SQL/Excel).\n4. 🚗 **Car Price Predictor**: ML Regression (Python/Scikit-Learn).\n5. 🚕 **NYC Taxi Analytics**: Big Data Patterns (MapReduce/Hadoop).\n\n_Ask me "Tell me about Patient Alert" to dive deeper!_`,
        category: 'projects',
    },
    {
        keywords: ['patient alert', 'iot health', 'medical project'],
        response: `🏥 **Patient Alert ETL**\n\n**Mission:** Real-time health monitoring via IoT.\n**Tech Stack:** Kafka, Spark, HBase, AWS SNS.\n**Impact:** Handled high-velocity streaming data for millisecond-latency medical alerts. Demonstrated mastery in NoSQL schema design and event-driven architecture.`,
        category: 'projects',
    },
    {
        keywords: ['sparnord', 'atm analytics', 'bank project'],
        response: `🏦 **SparNord ATM Analytics**\n\n**Mission:** Optimize ATM refilling across Europe.\n**Tech Stack:** PySpark, Sqoop, Hive, Redshift, Airflow.\n**Impact:** Orchestrated complex workflows processing massive financial logs, reducing operational costs for Spar Nord Bank.`,
        category: 'projects',
    },
    {
        keywords: ['filmytics', 'movie analysis'],
        response: `🎬 **Filmytics**\n\n**Mission:** BI for movie production strategy.\n**Tech Stack:** Advanced SQL, Excel BI.\n**Impact:** Provided talent performance insights and growth strategies from raw cinema data using complex querying and cleaning techniques.`,
        category: 'projects',
    },
    {
        keywords: ['car price', 'prediction model', 'ml project'],
        response: `🚗 **Car Price Predictor**\n\n**Mission:** ML model for vehicle pricing.\n**Tech Stack:** Python, Scikit-Learn, Pandas.\n**Impact:** Achieved 84% accuracy with Ridge Regression, focusing on robust feature engineering and outlier management.`,
        category: 'projects',
    },
    {
        keywords: ['nyc taxi', 'big data project', 'hadoop'],
        response: `🚕 **NYC Taxi Analytics**\n\n**Mission:** Urban mobility pattern analysis.\n**Tech Stack:** Hadoop, MapReduce, HBase.\n**Impact:** Processed terabytes of trip records to identify mobility flows. A testament to handling true big data scale!`,
        category: 'projects',
    },
    {
        keywords: ['interview', 'assistant', 'practice', 'questions', 'hire', 'quiz'],
        response: `👨‍🏫 **Interview Assistant Mode**\n\nI can help you prepare for an interview or simulate one for Ankit's profile!\n\n**Would you like to:**\n• "Start Interview Simulation"\n• "Common Interview Questions"\n• "Why hire Ankit?"`,
        category: 'interview',
    },
    {
        keywords: ['why hire', 'benefits', 'value'],
        response: `⭐ **Why hire Ankit?**\n\n1. **High-Velocity Data Expert:** Proven track record with Kafka & Spark.\n2. **Full-Stack Proficiency:** Bridging the gap between Data Eng and Modern UI.\n3. **Continuous Learner:** Currently doing M.Sc. in Data Science to stay at the cutting edge.\n4. **Scalability Mindset:** Focused on building systems that grow with the business.`,
        category: 'general',
    },
    {
        keywords: ['contact', 'social', 'instagram', 'linkedin', 'connect'],
        response: `🔗 **Let's Connect!**\n\n• **LinkedIn:** [Ankit Abhishek](https://www.linkedin.com/in/ankitabhishekdataengineering/)\n• **GitHub:** [ANKIT21111](https://github.com/ANKIT21111)\n• **Instagram:** [@humankitabhishek](https://www.instagram.com/humankitabhishek/)\n\nFeel free to reach out for collaborations or a quick tech chat!`,
        category: 'social',
    },
];

// ─── Interview Simulation Data ────────────────────────────────────
const INTERVIEW_QUESTIONS = [
    "Tell me about your journey as a Data Engineer. What sparked your interest in distributed systems?",
    "Explain a challenging project you've worked on. What was the biggest bottleneck, and how did you solve it?",
    "How do you ensure data reliability and quality in a real-time streaming pipeline?",
    "Kafka vs RabbitMQ: When would you choose one over the other for a data architecture?",
    "Describe your experience with Apache Spark. How do you optimize Spark jobs for better performance?",
    "Where do you see the future of Data Engineering heading in the next 3-5 years?"
];

// ─── Identity Guardrails ──────────────────────────────────────────
const BLOCKED_KEYWORDS = [
    'age', 'birthday', 'born', 'address', 'home', 'house', 'salary', 'income', 'money', 'family', 'ssn', 'aadhaar', 'pan card', 'passport', 'phone', 'number', 'whatsapp', 'mobile', 'password', 'secret', 'private'
];

const isBlocked = (input: string) => {
    const normalized = input.toLowerCase();
    return BLOCKED_KEYWORDS.some(blocked => normalized.includes(blocked.toLowerCase()));
};

const GUARDRAIL_RESPONSE = `🔒 **PROTOCOL_SECURE // IDENTITY_PROTECTED**\n\nI am authorized to share professional expertise only. I cannot disclose personal identification, financial data, or private contact details.\n\n✅ [LinkedIn](https://www.linkedin.com/in/ankitabhishekdataengineering/) | [GitHub](https://github.com/ANKIT21111)`;

// ─── Refined Response Logic ───────────────────────────────────────
function getResponse(input: string, isInterviewMode: boolean, interviewStep: number): { response: string, nextStep?: number, endInterview?: boolean } {
    const normalizedInput = input.toLowerCase().trim();
    if (isBlocked(normalizedInput)) return { response: GUARDRAIL_RESPONSE };

    // Handle Interview Mode
    if (isInterviewMode) {
        if (normalizedInput.includes('exit') || normalizedInput.includes('stop') || normalizedInput.includes('quit')) {
            return { response: "🔚 **Interview Mode Terminated.** Returning to standard assistance. How else can I help?", endInterview: true };
        }

        if (interviewStep < INTERVIEW_QUESTIONS.length) {
            const feedback = "✅ Interesting perspective! Moving to the next question:\n\n";
            return {
                response: feedback + `❓ **Question ${interviewStep + 1}:** ${INTERVIEW_QUESTIONS[interviewStep]}`,
                nextStep: interviewStep + 1
            };
        } else {
            return { response: "🎉 **Simulation Complete!** You've answered all my questions. Based on your responses, you're ready to tackle real-world data challenges! Type 'exit' to return to normal mode.", nextStep: interviewStep };
        }
    }

    // Trigger Interview Mode
    if (normalizedInput.includes('start interview simulation') || (normalizedInput.includes('interview') && normalizedInput.includes('start'))) {
        return {
            response: "🚀 **Neural Interview Link Established.**\n\nI will now simulate an interview for a Senior Data Engineering role. Type 'exit' at any time to quit.\n\n❓ **Question 1:** " + INTERVIEW_QUESTIONS[0],
            nextStep: 1
        };
    }

    // Phase 1: Direct Entity Matching
    const scoredEntries = KNOWLEDGE_BASE.map(entry => {
        let score = 0;
        for (const kw of entry.keywords) {
            const kwLower = kw.toLowerCase();
            if (normalizedInput.includes(kwLower)) {
                const isExact = new RegExp(`\\b${kwLower}\\b`).test(normalizedInput);
                score += isExact ? kwLower.length * 3 : kwLower.length;
            }
        }
        return { entry, score };
    });

    scoredEntries.sort((a, b) => b.score - a.score);
    const bestMatch = scoredEntries[0];

    if (bestMatch && bestMatch.score > 2) {
        return { response: bestMatch.entry.response };
    }

    // Phase 2: Conversational Fallback
    if (normalizedInput.match(/hi|hello|hey|greetings|sup|howdy/)) {
        return { response: `👋 **Hello! Welcome to Ankit's Developer Hub.**\n\nI'm his upgraded AI Assistant. You can now use these features:\n\n📄 **"Resume Summary"** - Quick career overview\n🚀 **"Show Projects"** - Detailed tech exploration\n👨‍🏫 **"Start Interview"** - Practice simulation` };
    }

    return { response: `🤔 **Hmm... I couldn't find an exact match.**\n\nTry asking about my **Resume**, **Projects**, or type **"Start Interview"** for a practice session!` };
}

// ─── Component ────────────────────────────────────────────────────
const PortfolioBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [isInterviewMode, setIsInterviewMode] = useState(false);
    const [interviewStep, setInterviewStep] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

    const WELCOME_MESSAGE: Message = {
        id: 'welcome',
        role: 'bot',
        content: `⚡ **ANKIT_OS // Portfolio Hub Active**\n\nWelcome! I am Ankit's specialized AI Assistant. Explore my **Resume**, **Projects**, or challenge yourself with the **Interview Assistant**.\n\nWhat would you like to explore?`,
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
            const result = getResponse(messageText, isInterviewMode, interviewStep);

            if (result.nextStep !== undefined) {
                setIsInterviewMode(true);
                setInterviewStep(result.nextStep);
            }

            if (result.endInterview) {
                setIsInterviewMode(false);
                setInterviewStep(0);
            }

            const botMsg: Message = { id: `b-${Date.now()}`, role: 'bot', content: result.response, timestamp: new Date() };
            setMessages(prev => [...prev, botMsg]);
            setIsThinking(false);
        }, 600 + Math.random() * 600);
    }, [input, isThinking, isInterviewMode, interviewStep]);

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
            <motion.div className="fixed bottom-6 right-6 md:right-10 z-[9998] flex items-center gap-5">
                {!isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        className="hidden lg:flex flex-col items-end"
                    >
                        <div className="px-4 py-2 rounded-2xl bg-[var(--bg-card)]/40 backdrop-blur-2xl border border-white/5 shadow-2xl flex items-center gap-3 group border-l-blue-500/50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-blue-400 tracking-[0.2em] uppercase font-bold">Neural_Link</span>
                                <span className="text-[11px] text-[var(--text-dim)] font-medium">Assistant Online</span>
                            </div>
                            <div className="relative w-2 h-2">
                                <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-40" />
                                <div className="absolute inset-0 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                    style={{ x: springX, y: springY }}
                    className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center group pointer-events-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Multi-layered glow backgrounds */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-[24px] blur-2xl group-hover:opacity-100 transition-opacity opacity-50" />
                    <div className="absolute inset-0 bg-blue-500/10 rounded-[24px] group-hover:bg-blue-500/20 transition-all duration-500" />

                    {/* Animated Border */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none scale-105">
                        <circle cx="50%" cy="50%" r="46%" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/5" />
                        <motion.circle
                            cx="50%" cy="50%" r="46%"
                            stroke="currentColor" strokeWidth="2"
                            fill="transparent"
                            strokeDasharray="100 100"
                            animate={{
                                strokeDashoffset: isOpen ? 0 : 100,
                                opacity: isOpen ? 1 : 0.4,
                                stroke: isOpen ? '#3b82f6' : '#6366f1'
                            }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="transition-all duration-500"
                        />
                    </svg>

                    <div className="absolute inset-0 rounded-[24px] bg-[var(--bg-card)] border border-white/10 flex items-center justify-center overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl group-hover:border-blue-500/40 transition-all duration-500">
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.div key="c" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }}>
                                    <X size={28} className="text-[var(--text-primary)]" />
                                </motion.div>
                            ) : (
                                <motion.div key="o" initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -180 }} className="relative">
                                    <Bot size={34} className="text-blue-500 drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                                    <motion.div
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full blur-[2px]"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(15px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 40, scale: 0.92, filter: 'blur(15px)' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed bottom-28 right-4 md:right-10 z-[9998] w-[calc(100vw-2rem)] max-w-[440px] h-[min(85vh,640px)] flex flex-col rounded-[36px] overflow-hidden bg-[#050505]/80 border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.8)] backdrop-blur-[50px] saturate-[180%]"
                    >
                        {/* Glass Overlay Texture */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay" />
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

                        {/* Header */}
                        <div className="px-8 py-7 border-b border-white/5 flex items-center justify-between flex-shrink-0 relative z-10">
                            <div className="flex items-center gap-5">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                                    <div className="w-14 h-14 rounded-[20px] bg-gradient-to-tr from-blue-600/30 to-purple-600/20 border border-white/10 flex items-center justify-center relative backdrop-blur-md shadow-inner">
                                        <Bot size={28} className="text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#050505] border-2 border-white/5 flex items-center justify-center">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-bold text-[15px] tracking-tight">Portfolio Assistant</span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px] font-mono text-blue-400/80 uppercase tracking-widest font-bold opacity-80">ANKIT_AI // v2.1</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={clearChat}
                                className="p-3 rounded-2xl hover:bg-white/5 text-[var(--text-muted)] hover:text-blue-400 transition-all border border-transparent hover:border-white/10 shadow-sm active:scale-90"
                            >
                                <RefreshCw size={18} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-8 py-10 space-y-8 custom-scrollbar relative z-10">
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex gap-5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center flex-shrink-0 mt-1 shadow-lg border ${msg.role === 'bot'
                                            ? 'bg-blue-600/10 border-blue-500/20 text-blue-400'
                                            : 'bg-white/5 border-white/10 text-white/50'
                                            }`}>
                                            {msg.role === 'bot' ? <Cpu size={18} /> : <User size={18} />}
                                        </div>
                                        <div className={`max-w-[82%] space-y-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            <div className={`px-6 py-4 rounded-[24px] text-[14px] leading-relaxed relative border shadow-2xl transition-all ${msg.role === 'user'
                                                ? 'bg-gradient-to-tr from-blue-600/20 to-blue-500/10 border-blue-500/30 text-white rounded-tr-none'
                                                : 'bg-white/[0.03] border-white/5 text-[var(--text-dim)] rounded-tl-none backdrop-blur-sm'
                                                }`}>
                                                {renderMarkdown(msg.content)}
                                            </div>
                                            <div className={`px-2 flex items-center gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                                <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest font-bold">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {isThinking && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                                    <div className="w-10 h-10 rounded-[14px] bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                                        <Activity size={18} className="text-blue-400 animate-pulse" />
                                    </div>
                                    <div className="bg-white/[0.03] border border-white/5 rounded-[24px] rounded-tl-none px-6 py-4 shadow-xl backdrop-blur-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex gap-1.5">
                                                {[0, 1, 2].map(i => (
                                                    <motion.div
                                                        key={i}
                                                        animate={{ y: [0, -6, 0], opacity: [0.3, 1, 0.3] }}
                                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                        className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                                                    />
                                                ))}
                                            </div>
                                            <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-[0.3em] font-extrabold">Processing</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Suggestions */}
                            {!isThinking && messages.length > 0 && messages[messages.length - 1].role === 'bot' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-wrap gap-2.5 pt-4"
                                >
                                    {(isInterviewMode
                                        ? ["Next Question", "Exit Simulation"]
                                        : ["Resume Summary", "Show Projects", "Start Interview Simulation"]
                                    ).map((suggestion, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleSend(suggestion)}
                                            className="px-5 py-2.5 text-[12px] bg-white/[0.04] hover:bg-blue-600/20 text-[var(--text-dim)] hover:text-white border border-white/5 hover:border-blue-500/40 rounded-full transition-all duration-300 font-semibold tracking-wide shadow-lg group active:scale-95"
                                        >
                                            <span className="flex items-center gap-2">
                                                <Zap size={12} className="group-hover:text-yellow-400 transition-colors" />
                                                {suggestion}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-black/40 border-t border-white/5 relative z-10">
                            <div className="relative group/input">
                                {/* Glowing ambient background for input */}
                                <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-600/30 via-purple-600/20 to-blue-600/30 rounded-3xl opacity-0 group-focus-within/input:opacity-100 blur-lg transition-all duration-1000" />

                                <div className="relative flex gap-2 items-center bg-[#0a0a0a] border border-white/10 rounded-2xl focus-within:border-blue-500/50 transition-all duration-500 p-2 shadow-inner">
                                    <div className="pl-4 text-white/20 group-focus-within/input:text-blue-500/50 transition-colors">
                                        <Terminal size={18} />
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Type a sequence..."
                                        className="flex-1 bg-transparent border-none px-4 py-4 text-white text-[15px] focus:outline-none placeholder:text-white/10 font-mono"
                                    />
                                    <motion.button
                                        onClick={() => handleSend()}
                                        disabled={!input.trim() || isThinking}
                                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(37, 99, 235, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center hover:bg-blue-500 shadow-xl disabled:opacity-10 transition-all flex-shrink-0 mx-1 group/btn"
                                    >
                                        <Send size={22} className="text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </motion.button>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between px-2">
                                <div className="flex items-center gap-3 opacity-30 group">
                                    <Shield size={12} className="text-blue-400 group-hover:animate-pulse" />
                                    <span className="text-[9px] font-mono text-[var(--text-dim)] tracking-[0.4em] uppercase font-bold">Protocol_AES_256</span>
                                </div>
                                <div className="flex items-center gap-1.5 opacity-20">
                                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                                    <div className="w-1 h-1 rounded-full bg-blue-400" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(59, 130, 246, 0.3);
                }
                .blend-overlay {
                    mix-blend-mode: overlay;
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
