
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, FileText, Globe, Server, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <Shield className="text-blue-400" size={24} />,
            title: "Our Commitment",
            content: "At Ankit Abhishek's Portfolio, privacy is not an afterthought—it's the foundation. We believe your data belongs to you. This site is designed to be a transparent showcase of work without intrusive tracking."
        },
        {
            icon: <EyeOff className="text-purple-400" size={24} />,
            title: "Data Collection",
            content: "We do not sell, rent, or trade your personal information. Any data collected (such as through contact forms or interaction metrics) is used strictly to improve user experience and facilitate professional collaboration."
        },
        {
            icon: <Lock className="text-emerald-400" size={24} />,
            title: "Content Protection",
            content: "To protect the integrity of the intellectual property displayed here, we implement advanced guardrails including right-click prevention, keyboard shortcut restrictions, and automated threat detection."
        },
        {
            icon: <Globe className="text-orange-400" size={24} />,
            title: "Cookie Usage",
            content: "We use essential cookies to maintain site performance and remember your preferences. These cookies do not track you across other websites or build a profile of your browsing habits."
        },
        {
            icon: <Server className="text-pink-400" size={24} />,
            title: "Security Infrastructure",
            content: "Our platform is built on cloud-native architectures that prioritize security. We employ industry-standard encryption and security protocols to ensure that your interaction with this site remains private."
        },
        {
            icon: <UserCheck className="text-blue-500" size={24} />,
            title: "Your Rights",
            content: "You have the right to request access to any data we might have, request corrections, or ask for total deletion of your interaction history. We are committed to GDPR and CCPA compliances."
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <div className="responsive-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
                        <Lock size={12} /> Privacy First
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                        Privacy <span className="text-gradient">Policy</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
                        I value your trust above everything else. This policy outlines how I handle your data and protect the content of this professional portfolio.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-morphism p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group"
                        >
                            <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform duration-500">
                                {section.icon}
                            </div>
                            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{section.title}</h3>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="glass-morphism p-10 rounded-3xl border border-blue-500/20 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-blue-500/5 -z-10"></div>
                    <FileText size={48} className="mx-auto mb-6 text-blue-400 opacity-50" />
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Questions or Concerns?</h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
                        If you have any questions about this Privacy Policy or how your data is handled, feel free to reach out through the Collaborate portal.
                    </p>
                    <a
                        href="/collaborate"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold hover:scale-105 transition-all"
                    >
                        Contact Me
                    </a>
                    <div className="mt-8 text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em]">
                        Last Updated: February 2026
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
