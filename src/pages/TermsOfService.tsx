
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scale, FileCode, AlertCircle, Ban, Hammer, Gavel } from 'lucide-react';

const TermsOfService: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        {
            icon: <FileCode className="text-blue-400" size={24} />,
            title: "Intellectual Property",
            content: "All content on this site including code, architecture designs, graphics, and written articles is the sole property of Ankit Abhishek unless otherwise stated. Unauthorized reproduction or use of these assets without explicit permission is strictly prohibited."
        },
        {
            icon: <Hammer className="text-orange-400" size={24} />,
            title: "Usage Rights",
            content: "This portfolio is provided for viewing and professional evaluation purposes. You are granted a limited, non-exclusive license to access and use the site for personal or professional recruitment reasons."
        },
        {
            icon: <Ban className="text-red-400" size={24} />,
            title: "Prohibited Acts",
            content: "Users are strictly prohibited from attempting to scrape data, circumventing security measures, or using the contact forms for unsolicited marketing (SPAM). Automated access to the platform without prior written consent is not allowed."
        },
        {
            icon: <AlertCircle className="text-amber-400" size={24} />,
            title: "Disclaimer",
            content: "The projects and information provided here are on an 'as is' basis. While I strive for accuracy, I make no warranties regarding the completeness or reliability of the technical demonstrations for production environments."
        },
        {
            icon: <Scale className="text-emerald-400" size={24} />,
            title: "Liability",
            content: "In no event shall Ankit Abhishek be liable for any damages arising out of the use or inability to use the materials on this website, even if notified orally or in writing of the possibility of such damage."
        },
        {
            icon: <Gavel className="text-purple-400" size={24} />,
            title: "Governing Law",
            content: "These terms are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in New Delhi."
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2"></div>

            <div className="responsive-container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-4">
                        <Scale size={12} /> Legal Framework
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-[var(--text-primary)] mb-6 tracking-tight">
                        Terms of <span className="text-gradient">Service</span>
                    </h1>
                    <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
                        Please read these terms carefully before exploring my professional works and technical demonstrations.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-morphism p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group"
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
                    className="glass-morphism p-10 rounded-3xl border border-purple-500/20 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-purple-500/5 -z-10"></div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Agreement to Terms</h2>
                    <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
                        By accessing this website, you agree to be bound by these terms. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                    </p>
                    <div className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em]">
                        Effective Date: February 2026
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfService;
