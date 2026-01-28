
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-4 block"
          >
            Get in touch
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">legendary.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto"
          >
            Currently open to full-time roles, freelance collaborations, and technical discussions.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info Side */}
          <div className="md:col-span-1 space-y-12">
            <div>
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Email Me</h3>
              <a href="mailto:hello@devportfolio.com" className="text-xl font-bold hover:text-blue-500 transition-colors flex items-center gap-3">
                <Mail size={20} className="text-blue-500" /> hello@devportfolio.com
              </a>
            </div>
            <div>
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">Chat with Me</h3>
              <a href="#" className="text-xl font-bold hover:text-blue-500 transition-colors flex items-center gap-3">
                <MessageSquare size={20} className="text-blue-500" /> @dev_portfolio_social
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl relative overflow-hidden"
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="text-emerald-500" size={40} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Message Received!</h3>
                  <p className="text-gray-500">I'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full bg-[#151515] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        className="w-full bg-[#151515] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 uppercase mb-2">Message</label>
                    <textarea 
                      required
                      rows={5}
                      className="w-full bg-[#151515] border border-white/5 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      placeholder="Tell me about your project..."
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full py-5 bg-white text-black font-bold rounded-xl hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-3 group"
                  >
                    Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
