
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, ArrowUp, Mail, MapPin, Briefcase, Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [timezone, setTimezone] = useState('');
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get timezone abbreviation with custom mapping
    const getTimezoneAbbreviation = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZoneName: 'short'
      });
      const parts = formatter.formatToParts(new Date());
      const timeZonePart = parts.find(part => part.type === 'timeZoneName');
      const tzName = timeZonePart ? timeZonePart.value : '';
      
      // Custom mapping for specific timezones
      const timezoneMapping: { [key: string]: string } = {
        'GMT+5:30': 'IST',
        'GMT+05:30': 'IST',
        'India Standard Time': 'IST',
      };
      
      return timezoneMapping[tzName] || tzName;
    };
    setTimezone(getTimezoneAbbreviation());
  }, []);

  useEffect(() => {
    // Animate footer on scroll
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 100;
      
      if (scrolledToBottom) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/ANKIT21111',
      color: 'hover:text-gray-400',
      gradient: 'from-gray-600 to-gray-400'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/ankitabhishekdataengineering/',
      color: 'hover:text-blue-400',
      gradient: 'from-blue-600 to-blue-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/humankitabhishek/',
      color: 'hover:text-pink-400',
      gradient: 'from-pink-600 to-pink-400'
    }
  ];

  return (
    <footer className={`mt-auto relative bg-[var(--bg-card)] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Gradient Border */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--accent-blue)] to-transparent opacity-50"></div>
      
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-[url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")] opacity-30'></div>
      
      <div className="responsive-container relative z-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Ankit Abhishek</h3>
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed max-w-md">
                Engineering cloud-native data platforms that transform raw data into dependable systems. 
                Passionate about scalable infrastructure and elegant solutions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-[var(--text-dim)]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[var(--accent-blue)]" />
                <span>New Delhi, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-[var(--accent-purple)]" />
                <span>Available for Work</span>
              </div>
            </div>
          </div>

          {/* Status Section */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-morphism border border-[var(--border-color)] rounded-2xl p-6 space-y-4 bg-[var(--glass-bg)] backdrop-blur-sm">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--accent-blue)]" />
                Live Status
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-lg shadow-emerald-500/50"></span>
                    </span>
                    <span className="text-sm text-[var(--text-secondary)] font-medium">Available</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-medium">Open to opportunities</span>
                </div>
                <div className="pt-3 border-t border-[var(--border-color)]">
                  <div className="text-xs text-[var(--text-muted)] mb-1">Local Time</div>
                  <div className="text-sm text-[var(--text-secondary)] font-mono font-medium">
                    {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} 
                    <span className="text-[var(--text-dim)] ml-2">({timezone})</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connect Section */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-muted)]">Connect</h4>
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setIsHovered(social.name)}
                      onMouseLeave={() => setIsHovered(null)}
                      className={`group relative flex flex-col items-center gap-2 p-3 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] backdrop-blur-sm transition-all duration-300 ${social.color} hover:scale-105 hover:shadow-lg`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${social.gradient} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}></div>
                      <Icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-xs text-[var(--text-dim)] group-hover:text-[var(--text-primary)] transition-colors">
                        {social.name}
                      </span>
                      {isHovered === social.name && (
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded text-xs text-[var(--text-primary)] whitespace-nowrap z-20">
                          {social.name}
                        </div>
                      )}
                    </a>
                  );
                })}
              </div>
              
              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--nav-hover)] border border-[var(--border-color)] rounded-xl transition-all duration-300 group"
              >
                <span>Back to Top</span>
                <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-[var(--text-subtle)]">
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} Ankit Abhishek</span>
                <Heart size={14} className="text-red-500 animate-pulse" />
                <span>Built with passion for Data Engineering</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link 
                to="/privacy" 
                className="text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors duration-300 relative group"
              >
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-blue)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/terms" 
                className="text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors duration-300 relative group"
              >
                Terms of Service
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--accent-purple)] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <a 
                href="mailto:ankit.abhishek@example.com"
                className="flex items-center gap-2 text-[var(--text-subtle)] hover:text-[var(--text-primary)] transition-colors duration-300"
              >
                <Mail size={14} />
                <span>Contact</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
