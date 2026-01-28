
import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_DATA } from '../constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const wordVariants = {
  hidden: { y: 30, opacity: 0, rotate: 2 },
  visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", damping: 15 } },
};

const Home: React.FC = () => {
  const quote = "SYSTEMS. ARCHITECTURE. LOGIC. VISION.";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl w-full"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 font-mono text-[10px] tracking-[0.2em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            ACTIVE SESSION: PORTFOLIO_V2.0
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-bold mb-10 tracking-tighter uppercase">
            {quote.split(" ").map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="inline-block mr-6 text-white"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1.2 }}
             className="flex flex-col md:flex-row items-center justify-center gap-12 mt-4"
          >
            <div className="flex flex-col items-center md:items-end text-right">
                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Expertise</span>
                <span className="text-white font-medium">Distributed Systems</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden md:block"></div>
            <div className="flex flex-col items-center md:items-start text-left">
                <span className="text-gray-500 font-mono text-xs uppercase tracking-widest mb-1">Philosophy</span>
                <span className="text-white font-medium">Minimalism x Performance</span>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-3"
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5">
             <motion.div 
               animate={{ y: [0, 12, 0] }}
               transition={{ repeat: Infinity, duration: 1.5 }}
               className="w-1 h-1 bg-white rounded-full"
             />
          </div>
          <span className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">Initializing Scroll</span>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-32 px-6 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center mb-24">
            <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">Linear Progression</span>
            <h2 className="text-4xl md:text-6xl font-bold text-center italic">The Professional Stack</h2>
          </div>
          
          <div className="relative space-y-24">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-blue-500/50 via-white/10 to-transparent -translate-x-1/2"></div>
            
            {TIMELINE_DATA.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className={`relative flex items-center justify-between w-full ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                <div className="hidden md:block w-[42%]"></div>
                
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 glass border border-white/20 rounded-full z-10 flex items-center justify-center">
                   <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></div>
                </div>
                
                <div className={`w-[calc(100%-4rem)] md:w-[42%] pl-12 md:pl-0 ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                  <div className="mb-4 inline-block">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-mono text-blue-400">
                      {item.period}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-blue-500/60 text-xs font-mono mb-4 uppercase tracking-widest">{item.subtitle}</p>
                  <p className="text-gray-400 text-sm leading-relaxed border-l-2 md:border-l-0 md:border-r-2 border-white/5 px-4 md:px-0">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
               <span className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase">Executive Summary</span>
               <h2 className="text-5xl font-bold leading-tight">Engineering refined <br/>digital solutions.</h2>
            </div>
            
            <p className="text-gray-400 leading-relaxed text-lg">
              Specializing in the intersection of high-performance backend systems and ultra-refined frontend experiences. My approach is data-driven, yet aesthetically focused.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-8 border-y border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[1px] bg-blue-500"></div>
                   <h4 className="text-white font-bold text-sm tracking-widest uppercase">Technical</h4>
                </div>
                <ul className="space-y-2 text-xs font-mono text-gray-500">
                  <li>_DISTRIBUTED_SYSTEMS</li>
                  <li>_REACT_ECOSYSTEM</li>
                  <li>_CLOUD_ARCHITECTURE</li>
                </ul>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-[1px] bg-purple-500"></div>
                   <h4 className="text-white font-bold text-sm tracking-widest uppercase">Creative</h4>
                </div>
                <ul className="space-y-2 text-xs font-mono text-gray-500">
                  <li>_MOTION_DESIGN</li>
                  <li>_BRAND_IDENTITY</li>
                  <li>_USER_PSYCHOLOGY</li>
                </ul>
              </div>
            </div>
            
            <button className="group flex items-center gap-4 text-xs font-mono tracking-widest text-white uppercase">
              Download Manifest <span className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">↓</span>
            </button>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-[100px]"></div>
            <div className="relative rounded-[40px] overflow-hidden border border-white/10 p-4 glass">
               <div className="rounded-[28px] overflow-hidden aspect-[3/4] border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
                  <img 
                    src="https://picsum.photos/seed/portrait-elite/600/800" 
                    alt="Engineering Lead" 
                    className="w-full h-full object-cover"
                  />
               </div>
               
               {/* Floating Data Badge */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                 className="absolute bottom-10 -right-4 p-4 glass border border-white/10 rounded-2xl shadow-2xl"
               >
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-mono text-gray-500">SYSTEM_STATUS</span>
                    <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                       SYNCED
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
