
import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { TIMELINE_DATA, PORTRAIT_URL } from '../constants';

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

// Refined variants for the professional stack items to support bi-directional scroll animations
const timelineItemVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: index % 2 === 0 ? 60 : -60,
    rotateY: index % 2 === 0 ? -30 : 30,
    z: -50,
    filter: "blur(8px)",
    scale: 0.9
  }),
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    z: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 90,
      duration: 0.8,
    },
  },
};

const Home: React.FC = () => {
  const words = ["SYSTEMS.", "ARCHITECTURE.", "LOGIC.", "VISION."];
  const { scrollY } = useScroll();
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
                <h1 className={`text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-500 ${idx === words.length - 1
                  ? "text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-white to-purple-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  : "text-white group-hover:text-blue-400"
                  }`}>
                  {word}
                </h1>

                {/* 3D Reflection Effect */}
                <span className="absolute -bottom-4 left-0 w-full text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white/5 blur-sm select-none pointer-events-none transform scale-y-[-0.5] origin-top opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {word}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-16 mt-16"
          >
            <div className="flex flex-col items-center md:items-end text-right group">
              <span className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-2 group-hover:text-blue-500 transition-colors">Core Specialization</span>
              <span className="text-white font-bold tracking-tight text-lg">Architecting Scalability</span>
            </div>
            <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden md:block"></div>
            <div className="flex flex-col items-center md:items-start text-left group">
              <span className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.3em] mb-2 group-hover:text-purple-500 transition-colors">Design Ethics</span>
              <span className="text-white font-bold tracking-tight text-lg">Functional Aesthetics</span>
            </div>
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
      <section className="py-32 px-6 relative overflow-hidden bg-transparent">
        <div className="max-w-5xl mx-auto" style={{ perspective: "1500px" }}>
          <div className="flex flex-col items-center mb-24">
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase mb-4">Linear Progression</span>
            <h2 className="text-4xl md:text-6xl font-bold text-center italic tracking-tighter">The Professional Stack</h2>
          </div>

          <div className="relative space-y-24">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-600 via-white/10 to-transparent -translate-x-1/2"></div>

            {TIMELINE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index}
                variants={timelineItemVariants}
                initial="hidden"
                whileInView="visible"
                // viewport once: false ensures it triggers on scroll up AND down
                viewport={{ once: false, margin: "-100px", amount: 0.2 }}
                className={`relative flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                  }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="hidden md:block w-[42%]"></div>

                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 glass border border-white/20 rounded-full z-10 flex items-center justify-center">
                  <motion.div
                    whileInView={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6]"
                  ></motion.div>
                </div>

                <div className={`w-[calc(100%-4rem)] md:w-[42%] pl-12 md:pl-0 ${index % 2 === 0 ? 'text-left' : 'md:text-right'} group`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-blue-500/30 transition-colors duration-500 group-hover:bg-blue-500/[0.02] backdrop-blur-sm"
                  >
                    <div className="mb-4 inline-block">
                      <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-blue-400 tracking-wider">
                        {item.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-blue-500/60 text-[10px] font-mono mb-4 uppercase tracking-[0.2em]">
                      {item.subtitle}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 md:border-l-0 md:border-r-2 border-white/5 px-4 md:px-0 group-hover:border-blue-500/20 transition-colors">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Executive Summary</span>
              <h2 className="text-5xl font-bold leading-tight tracking-tighter">Engineering refined <br />digital solutions.</h2>
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
                <img
                  src={PORTRAIT_URL}
                  alt="Ankit Abhishek Portrait"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
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

export default Home;