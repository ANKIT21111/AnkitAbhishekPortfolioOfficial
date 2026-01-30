
import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#050505] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Ankit Abhishek</h3>
            <p className="text-gray-400 text-sm max-w-xs">
              Engineering cloud-native data platforms that turn raw data into dependable systems.
              Based in New Delhi, India.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Status</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span className="text-sm text-gray-300">Available for Work</span>
              </div>
              <div className="text-sm text-gray-300 font-mono">
                Local Time: {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          <div className="space-y-4 flex flex-col items-start md:items-end">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><Github size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-sky-400 hover:scale-110 transition-all"><Twitter size={20} /></a>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-4 flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors group"
            >
              BACK TO TOP <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Ankit Abhishek. Built with React & Tailwind.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
