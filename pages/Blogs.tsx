
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost } from '../types';
import { PlusCircle, Edit3, Trash2, Database, Terminal, Cpu, Loader2, Feather, LayoutGrid, X, Sparkles, Zap, Shield, Globe, Layers, Activity, Brain, Plus, Tag } from 'lucide-react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import BlogEditor from '../components/BlogEditor';

const API_URL = import.meta.env.PROD
  ? '/api/blogs'
  : 'http://localhost:5000/api/blogs';

const Blogs: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Architecture');
  const [publishing, setPublishing] = useState(false);
  const [viewMode, setViewMode] = useState<'feed' | 'editor'>('feed');

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

  // Delete/OTP State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [otpStep, setOtpStep] = useState<'request' | 'verify'>('request');

  const [availableCategories, setAvailableCategories] = useState([
    { id: 'Architecture', label: 'Infrastructure Architecture', icon: Layers, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'Streaming', label: 'Real-time Streaming', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
    { id: 'Optimization', label: 'Performance Optimization', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { id: 'DataEngineering', label: 'Modern Data Engineering', icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'Security', label: 'Systems Security', icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { id: 'AI', label: 'Artificial Intelligence', icon: Brain, color: 'text-cyan-500', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  ]);

  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryLabel, setNewCategoryLabel] = useState('');

  const handleAddCategory = () => {
    if (!newCategoryLabel.trim()) return;
    const id = newCategoryLabel.trim().replace(/\s+/g, '');
    const newCat = {
      id,
      label: newCategoryLabel,
      icon: Tag,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/20'
    };
    setAvailableCategories([...availableCategories, newCat]);
    setCategory(id);
    setNewCategoryLabel('');
    setIsAddingCategory(false);
  };

  const handleDeleteCategoryOption = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = availableCategories.filter(cat => cat.id !== id);
    setAvailableCategories(updated);
    if (category === id && updated.length > 0) {
      setCategory(updated[0].id);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Failed to fetch blogs');
      const data = await response.json();
      setBlogs(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the server. Please make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setPublishing(true);
    try {
      const plainText = stripHtml(content);
      const newBlogData = {
        title,
        readTime: `${Math.ceil(plainText.split(/\s+/).length / 200)} min read`,
        snippet: plainText.substring(0, 150) + '...',
        category,
        content,
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBlogData),
      });

      if (!response.ok) throw new Error('Failed to publish blog');

      const savedBlog = await response.json();
      setBlogs([savedBlog, ...blogs]);
      setTitle('');
      setContent('');
      setCategory('Architecture');
      setViewMode('feed');
    } catch (err) {
      console.error(err);
      alert('Failed to publish blog. Is the server running?');
    } finally {
      setPublishing(false);
    }
  };

  const initiateDelete = async (blogId: string) => {
    setSelectedBlogId(blogId);
    setOtpStep('request');
    setIsOtpModalOpen(true);
    setVerifying(true);

    try {
      const response = await fetch(`${API_URL}/request-delete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId }),
      });

      if (!response.ok) throw new Error('Failed to send OTP');

      setOtpStep('verify');
    } catch (err) {
      console.error(err);
      alert('Error sending OTP. Please check backend server/logs.');
      setIsOtpModalOpen(false);
    } finally {
      setVerifying(false);
    }
  };

  const confirmDelete = async () => {
    if (!otpInput || !selectedBlogId) return;

    setVerifying(true);
    try {
      const response = await fetch(`${API_URL}/delete-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogId: selectedBlogId, otp: otpInput }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Invalid OTP');
      }

      setBlogs(blogs.filter(b => b.id !== selectedBlogId));
      setIsOtpModalOpen(false);
      setOtpInput('');
      setSelectedBlogId(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setVerifying(false);
    }
  };

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

      <AnimatePresence>
        {isOtpModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: -20 }}
              className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[2.5rem] w-full max-w-md shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <h3 className="text-2xl font-black mb-6 tracking-tighter flex items-center gap-3">
                <Shield className="text-blue-500" />
                Security Gateway
              </h3>

              {otpStep === 'request' ? (
                <div className="flex flex-col items-center py-12 gap-6">
                  <div className="relative">
                    <Loader2 className="animate-spin text-blue-500" size={48} />
                    <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                  </div>
                  <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">Initializing Handshake...</p>
                </div>
              ) : (
                <div className="space-y-8">
                  <p className="text-sm text-gray-400 leading-relaxed">
                    A secure 6-digit cluster key has been dispatched to:
                    <span className="block text-white font-bold text-lg mt-1">ankitabhishek1005@gmail.com</span>
                  </p>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="000 000"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-6 text-center text-4xl font-black tracking-[0.3em] focus:outline-none focus:border-blue-500/50 transition-all text-blue-500"
                  />
                  <div className="flex gap-4">
                    <button
                      onClick={() => setIsOtpModalOpen(false)}
                      className="flex-1 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-gray-500 font-bold hover:bg-white/10 transition-all uppercase text-xs tracking-widest"
                    >
                      Abort
                    </button>
                    <button
                      onClick={confirmDelete}
                      disabled={verifying || otpInput.length < 6}
                      className="flex-1 py-4 px-4 bg-red-600 text-white font-black rounded-2xl hover:bg-red-500 transition-all disabled:opacity-20 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(220,38,38,0.3)]"
                    >
                      {verifying ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} />}
                      Authorize
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-2xl shadow-2xl"
          >
            <button
              onClick={() => setViewMode('feed')}
              className={`group flex items-center gap-3 px-10 py-5 rounded-[1.5rem] transition-all duration-500 font-black text-sm tracking-widest uppercase ${viewMode === 'feed' ? 'bg-blue-600 text-white shadow-[0_10px_40px_rgba(37,99,235,0.4)] scale-105' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <LayoutGrid size={20} className={viewMode === 'feed' ? 'animate-pulse' : ''} /> Feed
            </button>
            <button
              onClick={() => setViewMode('editor')}
              className={`group flex items-center gap-3 px-10 py-5 rounded-[1.5rem] transition-all duration-500 font-black text-sm tracking-widest uppercase ${viewMode === 'editor' ? 'bg-blue-600 text-white shadow-[0_10px_40px_rgba(37,99,235,0.4)] scale-105' : 'text-gray-500 hover:text-white hover:bg-white/5'
                }`}
            >
              <Feather size={20} className={viewMode === 'editor' ? 'animate-bounce' : ''} /> Studio
            </button>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'feed' ? (
            <motion.div
              key="feed"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
              transition={{ duration: 0.6, ease: "anticipate" }}
              className="grid lg:grid-cols-12 gap-16"
            >
              <div className="lg:col-span-8 space-y-12">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-48 gap-8">
                    <div className="relative w-24 h-24">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 border-t-2 border-r-2 border-blue-500 rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-4 border-b-2 border-l-2 border-purple-500 rounded-full"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      </div>
                    </div>
                    <p className="font-mono text-xs tracking-[0.5em] text-blue-500 uppercase animate-pulse">Syncing Neural Nodes...</p>
                  </div>
                ) : error ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="p-16 rounded-[3rem] bg-red-500/5 border border-red-500/20 text-red-500 text-center backdrop-blur-xl"
                  >
                    <X size={64} className="mx-auto mb-6 opacity-30" />
                    <p className="text-2xl font-black mb-4 tracking-tighter">Connection Interrupted</p>
                    <p className="text-sm font-mono opacity-60 uppercase">{error}</p>
                  </motion.div>
                ) : (
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

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            initiateDelete(blog.id);
                          }}
                          className="absolute top-10 right-10 p-3 rounded-2xl bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-red-500 hover:text-white shadow-2xl hover:scale-110 z-20"
                        >
                          <Trash2 size={20} />
                        </button>

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
                )}
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
                        { label: 'Neural Capacity', value: '98.4%', color: 'text-blue-400' },
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
          ) : (
            <motion.div
              key="editor"
              initial={{ opacity: 0, x: 20, filter: 'blur(20px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(20px)' }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="grid lg:grid-cols-12 gap-16"
            >
              <div className="lg:col-span-8 space-y-12">
                <div className="space-y-12">
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 ml-4">Documentation Subject</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Transmission Title..."
                      className="w-full bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] px-12 py-10 text-4xl font-black focus:outline-none focus:border-blue-500/30 transition-all placeholder:text-white/5 shadow-2xl leading-none"
                    />
                    <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-700" />
                  </div>

                  <div className="relative">
                    <label className="block text-[10px] font-black text-purple-500 uppercase tracking-[0.4em] mb-6 ml-4">Neural Buffer Content</label>
                    <div className="rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                      <BlogEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Synthesize information stream..."
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-32 space-y-12">
                  <div className="p-10 rounded-[3rem] bg-[#0a0a0a] border border-white/5 shadow-[0_0_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none" />

                    <div className="flex items-center gap-4 pb-10 border-b border-white/5 mb-10">
                      <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                        <Terminal size={24} />
                      </div>
                      <h3 className="text-xl font-black tracking-tight">Deployment UI</h3>
                    </div>

                    <div className="space-y-10">
                      <div>
                        <div className="flex justify-between items-center mb-6">
                          <label className="block text-[10px] font-black text-gray-600 uppercase tracking-[0.3em] ml-2">Category Routing</label>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsAddingCategory(!isAddingCategory)}
                            className="p-2 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500/20 transition-all"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>

                        <AnimatePresence>
                          {isAddingCategory && (
                            <motion.div
                              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                              animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={newCategoryLabel}
                                  onChange={(e) => setNewCategoryLabel(e.target.value)}
                                  placeholder="New Category..."
                                  className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs font-bold focus:outline-none focus:border-blue-500/50 transition-all text-white"
                                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                                />
                                <button
                                  onClick={handleAddCategory}
                                  className="px-4 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all"
                                >
                                  Add
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid gap-4">
                          {availableCategories.map((cat) => (
                            <motion.button
                              key={cat.id}
                              whileHover={{ scale: 1.02, x: 5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setCategory(cat.id)}
                              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group relative overflow-hidden ${category === cat.id
                                ? `${cat.bg} ${cat.border} ${cat.color} shadow-lg shadow-black/20`
                                : 'bg-white/[0.02] border-white/5 text-gray-500 hover:border-white/10 hover:bg-white/[0.04]'
                                }`}
                            >
                              {category === cat.id && (
                                <motion.div
                                  layoutId="activeCategory"
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
                                />
                              )}

                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileHover={{ opacity: 1, x: 0 }}
                                onClick={(e) => handleDeleteCategoryOption(cat.id, e)}
                                className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all z-20"
                              >
                                <Trash2 size={12} />
                              </motion.div>

                              <div className={`p-2.5 rounded-xl border transition-colors ${category === cat.id ? `${cat.border} ${cat.bg}` : 'bg-white/5 border-white/5'
                                }`}>
                                <cat.icon size={18} className={category === cat.id ? cat.color : 'text-gray-600'} />
                              </div>
                              <div className="flex-1">
                                <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{cat.label}</p>
                                <p className="text-[8px] font-mono opacity-50 uppercase tracking-tighter">Routing: /{cat.id.toLowerCase()}</p>
                              </div>
                              {category === cat.id && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-1.5 h-1.5 rounded-full bg-current shadow-[0_0_10px_currentColor]"
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 space-y-6">
                        <div className="flex justify-between items-center text-[10px] font-black">
                          <span className="text-gray-600 uppercase tracking-widest">Compute Time</span>
                          <span className="text-blue-500 font-mono tracking-widest">{Math.ceil(stripHtml(content).split(/\s+/).length / 200)}m/read</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-black">
                          <span className="text-gray-600 uppercase tracking-widest">Buffer Status</span>
                          <span className="text-amber-500 uppercase tracking-[0.2em] flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Finalizing
                          </span>
                        </div>
                      </div>

                      <div className="grid gap-6 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handlePublish}
                          disabled={publishing || !title || !content}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-black py-8 rounded-[2rem] transition-all shadow-[0_20px_60px_rgba(37,99,235,0.4)] disabled:opacity-20 flex items-center justify-center gap-4 text-sm tracking-[0.3em] uppercase"
                        >
                          {publishing ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                          {publishing ? 'Broadcasting...' : 'Deploy Channel'}
                        </motion.button>
                        <button
                          onClick={() => { setTitle(''); setContent(''); setCategory('Architecture'); setViewMode('feed'); }}
                          className="flex items-center justify-center gap-3 py-6 px-10 bg-white/5 border border-white/10 rounded-[2rem] text-gray-500 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-500 text-[10px] font-black tracking-widest uppercase"
                        >
                          <X size={20} /> Purge Buffer
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-gray-700 font-mono uppercase tracking-[0.5em] leading-loose">
                      Neural Interface Protocol Active<br />EST. 2026 / LAB-09
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
