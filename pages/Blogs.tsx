
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BLOGS_DATA } from '../constants';
import { BlogPost } from '../types';
import { PlusCircle, Edit3, Trash2, Database, Terminal, Cpu } from 'lucide-react';

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>(BLOGS_DATA);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Architecture');

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const newBlog: BlogPost = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      readTime: '3 min read',
      snippet: content.substring(0, 100) + '...',
      category,
    };

    setBlogs([newBlog, ...blogs]);
    setTitle('');
    setContent('');
    setCategory('Architecture');
  };

  return (
    <div className="min-h-screen pt-32 px-6 pb-24 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-[70%] space-y-12">
          <div className="mb-12 flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500">
              <Database size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Engineering Insights</h1>
              <p className="text-gray-500 max-w-xl">
                Technical deep dives into data orchestration, distributed systems,
                scalable architecture, and the evolution of the modern data stack.
              </p>
            </div>
          </div>

          <div className="grid gap-8">
            <AnimatePresence mode="popLayout">
              {blogs.map((blog) => (
                <motion.article
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3 items-center">
                      <span className="text-[10px] font-bold px-2 py-1 rounded bg-blue-500/10 text-blue-500 uppercase tracking-wider border border-blue-500/20">
                        {blog.category || 'General'}
                      </span>
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">{blog.date} • {blog.readTime}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{blog.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{blog.snippet}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-4 transition-all">
                    Read Article <span className="text-blue-500">→</span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Admin UI (30%) */}
        <div className="md:w-[30%]">
          <div className="sticky top-32 p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Terminal className="text-blue-500" size={20} />
              <h3 className="text-lg font-bold">Insights Lab</h3>
            </div>

            <form onSubmit={handlePublish} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Article Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Scaling Kinesis Consumers"
                  className="w-full bg-[#151515] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#151515] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="Architecture">Architecture</option>
                  <option value="Streaming">Streaming</option>
                  <option value="Optimization">Optimization</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Security">Security</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Technical Abstract</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Key takeaways and summary..."
                  className="w-full bg-[#151515] border border-white/5 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white text-sm font-bold py-3 rounded-lg hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]"
                >
                  Deploy Blog
                </button>
                <button
                  type="button"
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-gray-400"
                  title="Drafts"
                >
                  <Edit3 size={18} />
                </button>
              </div>
            </form>

            <div className="mt-8 pt-8 border-t border-white/5">
              <h4 className="text-xs font-mono text-gray-600 uppercase mb-4">System Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Drafts</span>
                  <span className="text-white">4</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Live Posts</span>
                  <span className="text-white">{blogs.length}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Avg. Engagement</span>
                  <span className="text-emerald-500">+12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
