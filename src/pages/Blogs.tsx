import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../types/types';
import { Database, Sparkles, Zap, Globe } from 'lucide-react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { blogs as staticBlogs } from '../data/blogs';

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [blogs] = useState<BlogPost[]>(staticBlogs);

  // 7D Animation States
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [0, window.innerHeight], [5, -5]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [0, window.innerWidth], [-5, 5]), { damping: 20, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative min-h-screen pt-32 px-6 pb-24 max-w-7xl mx-auto overflow-hidden">
      {/* 7D Parallax Background System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{
            x: useTransform(mouseX, [0, 1920], [20, -20]),
            y: useTransform(mouseY, [0, 1080], [20, -20]),
          }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
        </motion.div>

        <motion.div
          style={{
            x: useTransform(mouseX, [0, 1920], [-40, 40]),
            y: useTransform(mouseY, [0, 1080], [-40, 40]),
          }}
          className="absolute inset-0 opacity-10"
        >
          <div className="grid-bg h-full w-full" />
        </motion.div>
      </div>

      <div className="relative z-10">
        <div className="mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="flex items-center gap-8"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/40 blur-[30px] rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
              <div className="relative p-6 rounded-[2rem] bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 text-blue-400 shadow-2xl backdrop-blur-xl">
                <Database size={44} />
              </div>
            </div>
            <div>
              <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter leading-none bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
                Insights Lab
              </h1>
              <div className="flex items-center gap-4">
                <div className="h-px w-12 bg-blue-500/50" />
                <p className="text-blue-500/80 font-mono text-sm tracking-widest uppercase">Neural Documentation System v7.0</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, ease: "anticipate" }}
          className="grid lg:grid-cols-12 gap-16"
        >
          <div className="lg:col-span-8 space-y-12">
            <div className="grid gap-8">
              {blogs.map((blog, idx) => (
                <motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8 }}
                  style={{ rotateX, rotateY }}
                  className="group relative p-10 rounded-[3rem] bg-white/[0.01] border border-white/5 hover:border-blue-500/50 hover:bg-blue-600/[0.03] transition-colors duration-700 perspective-1000"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[3rem]" />

                  <div onClick={() => navigate(`/blogs/${blog.id}`)} className="relative z-10 cursor-pointer">
                    <div className="flex items-center gap-4 mb-8">
                      <span className="text-[10px] font-black px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 uppercase tracking-[0.3em] border border-blue-500/20 shadow-lg">
                        {blog.category || 'Module'}
                      </span>
                      <div className="h-1 w-1 rounded-full bg-white/20" />
                      <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest flex items-center gap-2">
                        <Zap size={10} /> {blog.readTime}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 leading-relaxed mb-10 line-clamp-3 text-lg font-light tracking-wide group-hover:text-gray-300 transition-colors">
                      {blog.snippet}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-black text-blue-500 tracking-[0.2em] uppercase group-hover:gap-8 transition-all duration-500">
                      Access Node Content <Globe size={16} className="animate-spin-slow" />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-12">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-10 rounded-[3rem] bg-[#0a0a0a] border border-white/5 relative overflow-hidden shadow-2xl group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-600/20 transition-colors duration-700" />

                <h3 className="text-xl font-black mb-10 flex items-center gap-3">
                  <Sparkles className="text-blue-500" size={20} />
                  Lab Metrics
                </h3>

                <div className="space-y-6">
                  {[
                    { label: 'Neural Capacity', value: '100%', color: 'text-blue-400' },
                    { label: 'Active Clusters', value: blogs.length, color: 'text-white' },
                    { label: 'Signal Strength', value: 'High', color: 'text-emerald-500' }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center p-5 rounded-2xl bg-white/[0.02] border border-white/5">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                      <span className={`font-mono font-black ${stat.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <div className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-md">
                <h3 className="text-xs font-black text-gray-600 uppercase tracking-[0.3em] mb-10">Neural Architecture Nodes</h3>
                <div className="flex flex-wrap gap-3">
                  {['Distributed Systems', 'Cloud Native', 'Data Ops', 'Parallelization', 'Edge Computing', 'Cybernetics'].map((tech, i) => (
                    <motion.span
                      key={tech}
                      whileHover={{ scale: 1.1, translateY: -5 }}
                      className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] text-gray-400 font-bold hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all cursor-crosshair uppercase tracking-widest"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .grid-bg {
          background-image: radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 0);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Blogs;
