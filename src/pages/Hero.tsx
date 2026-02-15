
import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_DATA, PORTRAIT_URL } from '../constants/constants';
import OptimizedImage from '../components/ui/OptimizedImage';
import { Briefcase, GraduationCap, Sparkles, Cpu, Clock, Calendar } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const word3DVariants: Variants = {
  hidden: {
    rotateX: -90,
    y: 50,
    opacity: 0,
    z: -100
  },
  visible: {
    rotateX: 0,
    y: 0,
    opacity: 1,
    z: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
      duration: 0.8
    }
  },
};

const statItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: -45,
    z: -100
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    z: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 80,
    }
  },
};

// Refined variants for the professional stack items to support bi-directional scroll animations
// Enhanced 4D variants for the professional stack items
const timelineItemVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: typeof window !== 'undefined' && window.innerWidth < 768 ? 50 : (index % 2 === 0 ? 100 : -100),
    y: 50,
    rotateY: index % 2 === 0 ? -25 : 25,
    rotateX: 15,
    z: -100,
    filter: "blur(10px)",
    scale: 0.9,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotateY: 0,
    rotateX: 0,
    z: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 70,
      duration: 1,
      mass: 1.1
    },
  },
};

const Hero: React.FC = () => {
  const words = ["DATA ENGINEERING.", "INSIGHT.", "INTELLIGENCE"];
  const { scrollY } = useScroll();
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const yParallax = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none"></div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: yParallax, perspective: "1200px" }}
          className="max-w-7xl w-full z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "circOut" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-[10px] tracking-[0.3em] mb-12 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_#3b82f6]"></span>
            ESTABLISHING SECURE PROTOCOL // ANKIT_ABHISHEK_V2
          </motion.div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {words.map((word, idx) => (
              <motion.div
                key={idx}
                variants={word3DVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: idx % 2 === 0 ? 10 : -10,
                  z: 50,
                  transition: { duration: 0.2 }
                }}
                className="relative group cursor-default"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h1 className={`text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase transition-all duration-500 ${idx === words.length - 1
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  : "text-white group-hover:text-blue-400"
                  }`}>
                  {word}
                </h1>

                {/* 3D Reflection Effect */}
                <span className="absolute -bottom-4 left-0 w-full text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter uppercase text-white/5 blur-sm select-none pointer-events-none transform scale-y-[-0.5] origin-top opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-10 mt-20 max-w-6xl mx-auto"
            style={{ perspective: "2000px" }}
          >
            {[
              {
                label: "Core Specialization",
                value: "Data Infrastructure & Streaming Systems",
                color: "blue",
                delay: 1.6
              },
              {
                label: "Architecting Scalability",
                value: "Scalable Pipelines & Distributed Processing",
                color: "purple",
                delay: 1.7
              },
              {
                label: "Design Ethics",
                value: "Data Reliability & Governance",
                color: "blue",
                delay: 1.8
              },
              {
                label: "Functional Aesthetics",
                value: "Performance-Driven Architecture",
                color: "purple",
                delay: 1.9
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={statItemVariants}
                transition={{ delay: item.delay }}
                whileHover={{
                  scale: 1.05,
                  rotateY: idx % 2 === 0 ? 15 : -15,
                  rotateX: 5,
                  z: 50,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
                className="flex flex-col items-center text-center group cursor-default relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className={`absolute -inset-4 bg-${item.color}-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <span className={`relative text-gray-500 font-mono text-[9px] uppercase tracking-[0.3em] mb-3 group-hover:text-${item.color}-400 transition-colors duration-300`}>
                  {item.label}
                </span>

                <div className="relative flex flex-col items-center">
                  <span className="text-white font-bold tracking-tight text-sm md:text-[15px] leading-tight group-hover:text-white transition-colors">
                    {item.value.split(" & ").map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <span className={`text-${item.color}-500 mx-1`}>&</span>}
                      </React.Fragment>
                    ))}
                  </span>

                  <motion.div
                    className={`h-[1px] bg-gradient-to-r from-transparent via-${item.color}-500 to-transparent mt-4 w-12 group-hover:w-full transition-all duration-700 opacity-30 group-hover:opacity-100`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="absolute bottom-12 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-blue-500 via-white/10 to-transparent relative">
            <motion.div
              animate={{ y: [0, 96, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_#fff]"
            />
          </div>
          <span className="text-[9px] font-mono text-gray-500 tracking-[0.5em] uppercase animate-pulse">Scroll to explore</span>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-4 sm:px-6 relative overflow-hidden bg-transparent">
        {/* Abstract Background Accents */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center mb-24 relative"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.4em] mb-6 uppercase">
              <Clock size={12} className="animate-spin-slow" />
              Temporal Matrix
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center tracking-tighter leading-none mb-4">
              The Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Stack</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4"></div>
          </motion.div>

          <div className="relative" ref={timelineRef}>
            {/* Base Line - Centralized on desktop, Left side on mobile */}
            <div className="absolute left-8 md:left-1/2 -top-12 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2"></div>

            {/* Animated Progress Line */}
            <motion.div
              style={{ height: lineHeight, opacity: lineOpacity }}
              className="absolute left-8 md:left-1/2 -top-12 w-[2px] bg-gradient-to-b from-blue-500 via-blue-400 to-purple-600 -translate-x-1/2 z-0 origin-top shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 blur-md rounded-full"></div>
            </motion.div>

            <div className="space-y-24 relative z-10">
              {TIMELINE_DATA.map((item, index) => {
                const isEven = index % 2 === 0;
                const iconMap = {
                  work: <Briefcase size={18} className="text-blue-400" />,
                  education: <GraduationCap size={18} className="text-purple-400" />,
                  life: <Sparkles size={18} className="text-emerald-400" />
                };
                const colorMap = {
                  work: 'blue',
                  education: 'purple',
                  life: 'emerald'
                };
                const color = colorMap[item.type as keyof typeof colorMap] || 'blue';

                return (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={timelineItemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-50px", amount: 0.15 }}
                    className={`relative flex items-center justify-between w-full flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''
                      }`}
                  >
                    {/* Placeholder for centering on desktop */}
                    <div className="hidden md:block w-[45%]"></div>

                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center z-20">
                      <motion.div
                        whileInView={{
                          scale: [1, 1.2, 1],
                          boxShadow: [
                            "0 0 0 0px rgba(59, 130, 246, 0.2)",
                            "0 0 0 10px rgba(59, 130, 246, 0)",
                            "0 0 0 0px rgba(59, 130, 246, 0.2)"
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        className={`w-10 h-10 rounded-xl glass border border-white/20 flex items-center justify-center shadow-lg transform rotate-45 group-hover:rotate-0 transition-transform duration-500`}
                      >
                        <div className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                          {iconMap[item.type as keyof typeof iconMap] || <Cpu size={18} />}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-[45%] pl-20 md:pl-0 ${isEven ? 'md:text-left' : 'md:text-right'} group`}>
                      <motion.div
                        whileHover={{
                          y: -5,
                          scale: 1.02,
                          z: 20
                        }}
                        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                        className="relative p-1 rounded-3xl overflow-hidden group/card"
                      >
                        {/* Animated Border Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-${color}-500/20 via-white/5 to-transparent opacity-50 group-hover/card:opacity-100 transition-opacity duration-500`}></div>

                        <div className="relative p-6 sm:p-8 rounded-[22px] bg-[#050505]/80 backdrop-blur-xl border border-white/10 group-hover/card:border-white/20 transition-all duration-500 overflow-hidden">
                          {/* Inner Glow */}
                          <div className={`absolute -top-24 -right-24 w-48 h-48 bg-${color}-500/10 rounded-full blur-[60px] group-hover/card:bg-${color}-500/20 transition-all duration-700`}></div>

                          <div className={`flex items-center gap-3 mb-4 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                            <div className={`px-3 py-1 bg-${color}-500/10 border border-${color}-500/20 rounded-lg text-[10px] font-mono text-${color}-400 tracking-wider shadow-sm flex items-center gap-2`}>
                              <Calendar size={10} />
                              {item.period}
                            </div>
                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">{item.type}</span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight group-hover/card:text-blue-400 transition-colors duration-500 leading-tight">
                            {item.title}
                          </h3>

                          <p className={`text-${color}-500/90 text-xs font-mono mb-6 uppercase tracking-[0.2em] font-semibold flex items-center gap-2 ${isEven ? '' : 'md:justify-end'}`}>
                            {isEven && <span className={`w-6 h-[1px] bg-${color}-500/30`}></span>}
                            {item.subtitle}
                            {!isEven && <span className={`w-6 h-[1px] bg-${color}-500/30`}></span>}
                          </p>

                          <p className={`text-gray-400 text-sm sm:text-base leading-relaxed font-light ${!isEven ? 'md:pr-2' : 'md:pl-2'} relative`}>
                            {item.description}
                          </p>

                          {/* Decorative Scan Line */}
                          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent transform scale-x-0 group-hover/card:scale-x-100 transition-transform duration-1000"></div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Executive Summary</span>
              <h2 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tighter">Engineering refined <br />digital solutions.</h2>
            </div>

            <p className="text-gray-400 leading-relaxed text-lg font-light">
              Specializing in the intersection of high-performance backend systems and ultra-refined frontend experiences. My approach is data-driven, yet aesthetically focused.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-10 border-y border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-blue-500"></div>
                  <h4 className="text-white font-bold text-xs tracking-[0.3em] uppercase">Technical</h4>
                </div>
                <ul className="space-y-2 text-[10px] font-mono text-gray-500">
                  <li>_DISTRIBUTED_SYSTEMS</li>
                  <li>_REACT_ECOSYSTEM</li>
                  <li>_CLOUD_ARCHITECTURE</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-purple-500"></div>
                  <h4 className="text-white font-bold text-xs tracking-[0.3em] uppercase">Creative</h4>
                </div>
                <ul className="space-y-2 text-[10px] font-mono text-gray-500">
                  <li>_MOTION_DESIGN</li>
                  <li>_BRAND_IDENTITY</li>
                  <li>_USER_PSYCHOLOGY</li>
                </ul>
              </div>
            </div>

            <motion.button
              whileHover={{ x: 10 }}
              className="group flex items-center gap-4 text-[10px] font-mono tracking-[0.4em] text-white uppercase"
            >
              Download Manifest <span className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">↓</span>
            </motion.button>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]"></div>
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 p-6 glass">
              <div className="rounded-[28px] overflow-hidden aspect-[3/4] border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000 shadow-2xl">
                <OptimizedImage
                  src={PORTRAIT_URL}
                  alt="Ankit Abhishek Portrait"
                  className="w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
                  priority={true}
                />
              </div>

              {/* Floating Data Badge */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute bottom-12 -right-6 p-5 glass border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">System_Status</span>
                  <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></span>
                    LIVE_SYNC_READY
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Hero;