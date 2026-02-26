import React, { useState, useEffect, useRef, Fragment } from 'react';
import {
  motion,
  Variants,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useMotionTemplate
} from 'framer-motion';
import { TIMELINE_DATA, PORTRAIT_URL } from '../constants/constants';
import OptimizedImage from '../components/ui/OptimizedImage';
import PortfolioBot from '../components/ui/PortfolioBot';
import {
  Briefcase,
  GraduationCap,
  Sparkles,
  Cpu,
  Calendar,
  ArrowRight,
  Database,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const word3DVariants: Variants = {
  hidden: {
    y: 30,
    opacity: 0,
    rotateX: -20,
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 100,
      duration: 0.6
    }
  },
};

const statItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    rotateX: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    }
  },
};

const timelineItemVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: typeof window !== 'undefined' && window.innerWidth < 768 ? 40 : (index % 2 === 0 ? 100 : -100),
    y: 50,
    rotateY: index % 2 === 0 ? -25 : 25,
    rotateX: 10,
    z: -100,
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    rotateX: 0,
    z: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 60,
      duration: 1.2,
      mass: 1.2
    },
  },
};

const TimelineCard: React.FC<{ item: any; color: string; isEven: boolean; isMobile: boolean }> = ({ item, color, isEven, isMobile }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 120, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 120, damping: 25 });
  const translateZ = useSpring(0, { stiffness: 100, damping: 20 });
  const contentZ = useSpring(0, { stiffness: 100, damping: 20 });

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
    translateZ.set(20);
    contentZ.set(40);
  }

  function onMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    translateZ.set(0);
    contentZ.set(0);
  }

  const spotlightX = useSpring(useTransform(mouseX, [-0.5, 0.5], [0, 100]), { stiffness: 100, damping: 30 });
  const spotlightY = useSpring(useTransform(mouseY, [-0.5, 0.5], [0, 100]), { stiffness: 100, damping: 30 });
  const background = useMotionTemplate`radial-gradient(800px circle at ${spotlightX}% ${spotlightY}%, rgba(255,255,255,0.08), transparent 80%)`;

  return (
    <motion.div
      onMouseMove={isMobile ? undefined : onMouseMove}
      onMouseLeave={isMobile ? undefined : onMouseLeave}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        z: isMobile ? 0 : translateZ,
        transformStyle: "preserve-3d",
      }}
      className="relative group/card cursor-pointer"
    >
      <motion.div
        className="absolute inset-x-0 inset-y-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-[2.5rem]"
        style={{ background }}
      />

      <div className={`relative p-8 md:p-14 rounded-[2.5rem] bg-[var(--bg-card)] md:bg-[var(--glass-bg)] backdrop-blur-3xl border border-[var(--border-color)] group-hover/card:border-${color}-500/40 transition-all duration-700 overflow-hidden shadow-[var(--shadow-premium)]`}>
        {/* Floating Background Glow */}
        <motion.div
          style={{ z: -20 }}
          className={`absolute -top-32 -right-32 w-64 h-64 bg-${color}-500 rounded-full blur-[100px] opacity-10 group-hover/card:opacity-30 transition-all duration-1000`}
        />

        <motion.div style={{ z: isMobile ? 0 : contentZ, transformStyle: "preserve-3d" }}>
          <div className={`flex flex-wrap items-center gap-4 mb-10 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className={`px-5 py-2 bg-${color}-500/10 border border-${color}-500/20 rounded-full text-[10px] font-mono text-${color}-500 dark:text-${color}-400 tracking-widest shadow-sm flex items-center gap-3 backdrop-blur-sm`}>
              <Calendar size={12} className="opacity-70" />
              {item.period}
            </div>
            <div className="h-1 w-1 rounded-full bg-[var(--border-color)] hidden sm:block"></div>
            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-[0.4em]">{item.type}</span>
          </div>

          <motion.h3
            style={{ z: isMobile ? 0 : 20 }}
            className="text-3xl md:text-4xl mb-6 font-black tracking-tight text-[var(--text-primary)] transition-all duration-500"
          >
            {item.title}
          </motion.h3>

          <div className={`flex items-center gap-4 mb-10 ${isEven ? '' : 'md:flex-row-reverse'}`}>
            <div className={`w-12 h-[2px] bg-gradient-to-r ${isEven ? `from-${color}-500/50 to-transparent` : `from-transparent to-${color}-500/50`}`}></div>
            <p className={`text-${color}-500 dark:text-${color}-400 text-sm font-mono uppercase tracking-[0.3em] font-black`}>
              {item.subtitle}
            </p>
          </div>

          <p className={`text-[var(--text-dim)] text-base md:text-xl leading-relaxed font-light ${!isEven ? 'md:text-right' : 'md:text-left'} max-w-2xl relative`}>
            {item.description}
          </p>

          {!isMobile && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className={`mt-12 flex items-center gap-3 text-[10px] font-mono tracking-[0.5em] uppercase text-${color}-500/80 ${!isEven ? 'justify-end' : ''}`}
            >
              Access Protocol <ArrowRight size={12} className="animate-pulse" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const TimelineItemRow: React.FC<{ item: any; index: number; isMobile: boolean }> = ({ item, index, isMobile }) => {
  const isEven = index % 2 === 0;
  const iconMap = {
    work: <Briefcase size={isMobile ? 18 : 22} className="text-blue-400" />,
    education: <GraduationCap size={isMobile ? 18 : 22} className="text-purple-400" />,
    life: <Sparkles size={isMobile ? 18 : 22} className="text-emerald-400" />
  };
  const colorMap = { work: 'blue', education: 'purple', life: 'emerald' };
  const color = colorMap[item.type as keyof typeof colorMap] || 'blue';

  return (
    <motion.div
      custom={index}
      variants={isMobile ? { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } } : timelineItemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`relative flex items-center justify-between w-full flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      <div className="hidden md:block w-[42%]"></div>

      <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center z-20">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Animated 3D Ring */}
          {!isMobile && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className={`absolute inset-0 rounded-full border border-dashed border-${color}-500/20`}
            />
          )}

          <motion.div
            whileInView={{
              scale: [1, 1.1, 1],
              rotateY: [0, 180, 360],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d" }}
            className="w-14 h-14 md:w-16 md:h-16 rounded-2xl glass border border-white/10 flex items-center justify-center shadow-2xl relative"
          >
            <div className={`absolute inset-0 bg-${color}-500/10 blur-xl rounded-full animate-pulse`}></div>
            <div className="relative z-10 filter drop-shadow(0 0 8px currentColor)">
              {iconMap[item.type as keyof typeof iconMap] || <Cpu size={24} />}
            </div>

            {/* Front & Back depth effect */}
            <div className="absolute inset-0 rounded-2xl border border-white/5 translate-z-[2px]"></div>
            <div className="absolute inset-0 rounded-2xl border border-white/5 -translate-z-[2px]"></div>
          </motion.div>
        </div>
      </div>

      <div className={`w-full md:w-[42%] pl-20 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
        <TimelineCard item={item} color={color} isEven={isEven} isMobile={isMobile} />
      </div>
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const words = ["DATA ENGINEERING.", "INSIGHT.", "INTELLIGENCE"];
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const yParallax = useTransform(scrollY, [0, 500], [0, isMobile ? 0 : -100]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center responsive-container relative overflow-hidden bg-transparent pt-32 pb-20">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

        <motion.div
          variants={isMobile ? { visible: { opacity: 1 } } : containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yParallax, perspective: "1200px", willChange: "transform" }}
          className="w-full z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-500 dark:text-blue-400 font-mono text-[10px] tracking-[0.3em] mb-12 backdrop-blur-sm shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
            ESTABLISHING SECURE PROTOCOL // ANKIT_ABHISHEK_V2
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-12">
            {words.map((word, idx) => (
              <motion.div
                key={idx}
                variants={isMobile ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } } : word3DVariants}
                whileHover={isMobile ? {} : {
                  scale: 1.05,
                  rotateY: idx % 2 === 0 ? 10 : -10,
                  z: 50,
                  transition: { duration: 0.2 }
                }}
                className="relative group cursor-default"
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
              >
                <h1 className={`text-[clamp(2rem,10vw,8rem)] font-black tracking-tighter uppercase transition-all duration-500 ${idx === words.length - 1
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-[var(--text-primary)] to-purple-500"
                  : "text-[var(--text-primary)] group-hover:text-blue-400"
                  }`}>
                  {word}
                </h1>

                {!isMobile && (
                  <span className="absolute -bottom-4 left-0 w-full text-[clamp(2rem,10vw,8rem)] font-black tracking-tighter uppercase text-white/5 blur-sm select-none pointer-events-none transform scale-y-[-0.5] origin-top opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {word}
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-24"
            style={{ perspective: isMobile ? "none" : "2000px" }}
          >
            {[
              { label: "Core Specialization", value: "Data Infrastructure & Streaming Systems", color: "blue", delay: isMobile ? 0.4 : 1.6, icon: <Database size={16} /> },
              { label: "Architecting Scalability", value: "Scalable Pipelines & Distributed Processing", color: "purple", delay: isMobile ? 0.5 : 1.7, icon: <Layers size={16} /> },
              { label: "Design Ethics", value: "Data Reliability & Governance", color: "emerald", delay: isMobile ? 0.6 : 1.8, icon: <ShieldCheck size={16} /> },
              { label: "Functional Aesthetics", value: "Performance-Driven Architecture", color: "blue", delay: isMobile ? 0.7 : 1.9, icon: <Zap size={16} /> }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={isMobile ? { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } } : statItemVariants}
                transition={{ delay: item.delay }}
                whileHover={isMobile ? {} : {
                  scale: 1.05,
                  rotateY: idx % 2 === 0 ? 15 : -15,
                  rotateX: 5,
                  z: 50,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="flex flex-col items-center text-center group cursor-default relative p-6 rounded-[2rem] glass border-transparent hover:border-[var(--border-color)] transition-all duration-500 overflow-hidden"
                style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
              >
                <div className={`absolute -inset-4 bg-${item.color}-500 blur-2xl rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center text-${item.color}-500 dark:text-${item.color}-400 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  {item.icon}
                </div>

                <span className={`relative text-[var(--text-muted)] font-mono text-[9px] uppercase tracking-[0.3em] mb-4 group-hover:text-${item.color}-500 dark:group-hover:text-${item.color}-400 transition-colors duration-300`}>
                  {item.label}
                </span>

                <div className="relative flex flex-col items-center">
                  <span className="text-[var(--text-primary)] font-bold tracking-tight text-sm leading-snug transition-colors">
                    {item.value.split(" & ").map((part, i, arr) => (
                      <Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <br className="hidden md:block" />}
                      </Fragment>
                    ))}
                  </span>

                  <motion.div
                    className={`h-[1px] bg-gradient-to-r from-transparent via-${item.color}-500 to-transparent mt-5 w-8 group-hover:w-full transition-all duration-700 opacity-20 group-hover:opacity-100`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isMobile ? 1.5 : 2.5, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-blue-500 via-[var(--border-color)] to-transparent relative">
            <motion.div
              animate={{ y: [0, 80, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"
            />
          </div>
          <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-[0.5em] uppercase animate-pulse">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section id="professional-stack" className="section-padding bg-transparent relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

        <div className="responsive-container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center mb-32 relative"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.4em] mb-8 uppercase backdrop-blur-md"
            >
              <Cpu size={14} className="animate-spin-slow" />
              Temporal Matrix_v2.0
            </motion.div>
            <h2 className="text-center mb-8 font-black tracking-tighter">
              Professional <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 animate-gradient">Evolution</span>
            </h2>
            <div className="relative w-32 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: [-128, 128] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              />
            </div>
          </motion.div>

          <div className="relative" ref={timelineRef}>
            {/* Central Timeline Line */}
            <div className="absolute left-6 md:left-1/2 -top-12 bottom-0 w-[1px] bg-white/5 -translate-x-1/2"></div>

            <motion.div
              style={{ scaleY: lineScale, opacity: lineOpacity, transformOrigin: 'top' }}
              className="absolute left-6 md:left-1/2 -top-12 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-blue-600 -translate-x-1/2 z-0"
            >
              <motion.div
                animate={{ y: ["0%", "100%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent blur-md"
              />
            </motion.div>

            <div className="space-y-24 md:space-y-48 relative z-10">
              {TIMELINE_DATA.map((item, index) => (
                <TimelineItemRow key={item.id} item={item} index={index} isMobile={isMobile} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Ecosystem Section */}
      <section id="ecosystem" className="section-padding bg-transparent border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <div className="responsive-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-purple-500 font-mono text-[10px] tracking-[0.4em] uppercase mb-6 block">Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter leading-tight text-[var(--text-primary)]">
                Engineering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Ecosystem_</span>
              </h2>
              <p className="text-[var(--text-dim)] text-lg font-light leading-relaxed max-w-md">
                A specialized toolkit focused on distributed data systems, high-performance computing, and resilient cloud architectures.
              </p>

              <div className="mt-12 flex flex-col gap-4">
                {[
                  { label: "Data Pipeline Orchestration", value: "95%" },
                  { label: "Distributed Storage Design", value: "90%" },
                  { label: "Real-time Stream Processing", value: "88%" }
                ].map((skill, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
                      <span>{skill.label}</span>
                      <span>{skill.value}</span>
                    </div>
                    <div className="h-1 bg-[var(--border-color)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.value }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Infrastructure",
                  tools: ["Apache Kafka", "Kubernetes", "Hadoop", "AWS S3", "Azure Data Factory"],
                  icon: <Cpu size={24} className="text-blue-500" />,
                  color: "blue"
                },
                {
                  title: "Processing",
                  tools: ["Apache Spark", "Python", "SQL", "Hive", "Pyspark", "MapReduce"],
                  icon: <Sparkles size={24} className="text-purple-500" />,
                  color: "purple"
                },
                {
                  title: "Storage & DB",
                  tools: ["HBase", "Redshift", "DynamoDB", "MongoDB", "Snowflake"],
                  icon: <Briefcase size={24} className="text-emerald-500" />,
                  color: "emerald"
                },
                {
                  title: "Analytics",
                  tools: ["PowerBI", "Tableau", "Excel", "Data Visualization", "ETL Patterns"],
                  icon: <Calendar size={24} className="text-blue-500" />,
                  color: "blue"
                }
              ].map((group, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-[2.5rem] bg-[var(--bg-card)] md:bg-[var(--glass-bg)] border border-[var(--border-color)] hover:border-[var(--border-color)] transition-all duration-500 group relative overflow-hidden"
                >
                  <div className={`absolute -top-12 -right-12 w-32 h-32 bg-${group.color}-500 rounded-full blur-[60px] opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>

                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[var(--border-color)] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 text-[var(--text-primary)]">
                      {group.icon}
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">{group.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.tools.map((tool, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all duration-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-transparent border-t border-[var(--border-color)]">
        <div className="responsive-container lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-8 md:space-y-12">
              <div className="space-y-4">
                <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Executive Summary</span>
                <h2 className="leading-tight tracking-tighter">Engineering refined <br />digital solutions.</h2>
              </div>

              <p className="text-[var(--text-dim)] leading-relaxed text-base md:text-xl font-light">
                Specializing in the intersection of high-performance backend systems and ultra-refined frontend experiences. My approach is data-driven, yet aesthetically focused.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-10 border-y border-[var(--border-color)]">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-blue-500"></div>
                    <h4 className="text-[var(--text-primary)] font-bold text-xs tracking-[0.3em] uppercase">Technical</h4>
                  </div>
                  <ul className="space-y-3 text-[10px] font-mono text-[var(--text-muted)]">
                    <li>_DISTRIBUTED_SYSTEMS</li>
                    <li>_REACT_ECOSYSTEM</li>
                    <li>_CLOUD_ARCHITECTURE</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-purple-500"></div>
                    <h4 className="text-[var(--text-primary)] font-bold text-xs tracking-[0.3em] uppercase">Creative</h4>
                  </div>
                  <ul className="space-y-3 text-[10px] font-mono text-[var(--text-muted)]">
                    <li>_MOTION_DESIGN</li>
                    <li>_BRAND_IDENTITY</li>
                    <li>_USER_PSYCHOLOGY</li>
                  </ul>
                </div>
              </div>

              <motion.button
                whileHover={isMobile ? {} : { x: 10 }}
                className="group flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-[var(--text-primary)] uppercase"
              >
                Download Manifest <span className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-primary)] transition-all duration-500">↓</span>
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]"></div>
              <div className="relative rounded-[40px] overflow-hidden border border-[var(--border-color)] p-4 md:p-8 glass">
                <div className="relative rounded-[28px] overflow-hidden aspect-[3/4] border border-[var(--border-color)] grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                  <OptimizedImage
                    src={PORTRAIT_URL}
                    alt="Ankit Abhishek Portrait"
                    className="w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
                    priority={true}
                  />
                </div>

                <motion.div
                  animate={isMobile ? {} : { y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                  className="absolute bottom-12 -right-4 md:-right-8 p-5 glass border border-[var(--border-color)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">System_Status</span>
                    <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                      LIVE_SYNC_READY
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <PortfolioBot />
    </div>
  );
};

export default Hero;
