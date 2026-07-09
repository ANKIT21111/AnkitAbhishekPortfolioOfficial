import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  motion, AnimatePresence, useScroll, useTransform,
  useMotionValue, useSpring, MotionValue
} from 'framer-motion';
import { PROJECTS_DATA } from '../constants/constants';
import {
  ExternalLink, ChevronRight, ChevronLeft,
  Github, Code2, Database, BarChart3, Cpu, Globe, BookOpen, Layers,
  Sparkles, X, Bot, Workflow, Zap
} from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';
import { useDevice } from '../hooks/useDevice';



/* ─── Types ─────────────────────────────────────────────────────────────── */
type Category = 'All' | 'ETL' | 'ML' | 'Analytics' | 'BigData' | 'Web' | 'Learning';

const CATEGORIES: { label: string; value: Category; Icon: React.ElementType }[] = [
  { label: 'All', value: 'All', Icon: Layers },
  { label: 'ETL', value: 'ETL', Icon: Database },
  { label: 'Analytics', value: 'Analytics', Icon: BarChart3 },
  { label: 'Big Data', value: 'BigData', Icon: Cpu },
  { label: 'ML', value: 'ML', Icon: BarChart3 },
  { label: 'Web', value: 'Web', Icon: Globe },
  { label: 'Learning', value: 'Learning', Icon: BookOpen },
];

/* ─── Per-category styling ──────────────────────────────────────────────── */
const CAT_PILL: Record<string, string> = {
  ETL: 'bg-sky-500/10   text-sky-400    border-sky-500/20',
  ML: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  Analytics: 'bg-amber-500/10 text-amber-400  border-amber-500/20',
  BigData: 'bg-teal-500/10  text-teal-400   border-teal-500/20',
  Web: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  Learning: 'bg-rose-500/10  text-rose-400   border-rose-500/20',
};

const CAT_GRAD: Record<string, string> = {
  ETL: 'from-sky-500    to-cyan-400',
  ML: 'from-violet-500 to-pink-400',
  Analytics: 'from-amber-500  to-orange-400',
  BigData: 'from-teal-500   to-emerald-400',
  Web: 'from-indigo-500 to-violet-400',
  Learning: 'from-rose-500   to-red-400',
};

/* ─── Easing shortcuts ──────────────────────────────────────────────────── */
const EASE_SMOOTH = [0.22, 1, 0.36, 1] as const;

/* ─── Reusable atoms ────────────────────────────────────────────────────── */
const Tag: React.FC<{ label: string }> = ({ label }) => (
  <span
    className="inline-flex items-center px-2.5 py-[5px] rounded-lg
      text-[10px] sm:text-[11px] font-mono tracking-wide leading-none select-none
      bg-[var(--bg-primary)] text-[var(--text-dim)] border border-[var(--border-color)]"
  >
    {label}
  </span>
);

const CatBadge: React.FC<{ cat: string }> = ({ cat }) => (
  <span
    className={`inline-flex items-center h-6 px-2.5 rounded-full
      text-[10px] font-bold uppercase tracking-widest border
      ${CAT_PILL[cat] ?? 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}
  >
    {cat === 'BigData' ? 'Big Data' : cat}
  </span>
);

/* ─── Slider progress dots ──────────────────────────────────────────────── */
const SliderDots: React.FC<{ total: number; current: number; onDot: (i: number) => void }> = ({
  total, current, onDot,
}) => (
  <div className="flex gap-2 items-center justify-center mt-6">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDot(i)}
        aria-label={`Go to slide ${i + 1}`}
        className="focus:outline-none transition-all duration-300 rounded-full"
      >
        <span
          className={`block rounded-full transition-all duration-300 ${i === current
            ? 'w-5 h-1.5 bg-blue-500'
            : 'w-1.5 h-1.5 bg-[var(--text-subtle)] hover:bg-[var(--text-dim)]'
            }`}
        />
      </button>
    ))}
  </div>
);

/* ─── Featured card ─────────────────────────────────────────────────────── */
const FeaturedCard: React.FC<{
  project: (typeof PROJECTS_DATA)[0];
  index: number;
  onExplain: (p: (typeof PROJECTS_DATA)[0]) => void;
}> = ({ project, index, onExplain }) => {
  const grad = project.category ? CAT_GRAD[project.category] : 'from-blue-500 to-purple-500';
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_SMOOTH }}
      className="relative flex-shrink-0 snap-center
        w-[86vw] sm:w-[68vw] md:w-[52vw] lg:w-[40vw] xl:w-[34vw]
        rounded-[2.25rem] overflow-hidden border border-[var(--border-color)]
        bg-[var(--bg-card)] shadow-2xl shadow-black/30 group
        hover:border-blue-500/15 hover:shadow-blue-500/5 transition-all duration-500 glass-premium card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <OptimizedImage
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out
            group-hover:scale-[1.05]"
          priority={index < 2}
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t
          from-[var(--bg-card)] via-[var(--bg-card)]/30 to-transparent" />
        {/* Badge */}
        {project.category && (
          <div className="absolute top-4 left-4">
            <CatBadge cat={project.category} />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 pt-4 pb-7 sm:px-8 sm:pt-5 sm:pb-8 flex flex-col gap-3.5">
        {/* Animated rule */}
        <div
          className={`h-px w-10 rounded-full bg-gradient-to-r ${grad}
            group-hover:w-[4.5rem] transition-all duration-500`}
        />

        <h3 className="text-[1.1rem] sm:text-2xl font-bold tracking-tight leading-snug
          text-[var(--text-primary)] group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-[var(--text-dim)] text-xs sm:text-sm leading-relaxed
          line-clamp-2 sm:line-clamp-3 font-light">
          {project.description}
        </p>

        {/* Tech tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map(t => <Tag key={t} label={t} />)}
          </div>
        )}

        {/* CTA */}
        <div className="mt-0.5 flex flex-wrap gap-3">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl min-h-[44px]
              bg-[var(--text-primary)] text-[var(--bg-primary)]
              text-[11px] font-bold uppercase tracking-[0.12em]
              hover:bg-blue-500 hover:text-white
              transition-all duration-250 shadow-lg magnetic-hover spring-press"
          >
            <Github size={13} />
            Repo
            <ExternalLink size={11} />
          </motion.a>

          <motion.button
            onClick={() => onExplain(project)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 inline-flex items-center gap-2
              px-5 py-2.5 rounded-xl min-h-[44px]
              bg-blue-600/10 text-blue-400 border border-blue-500/20
              text-[11px] font-bold uppercase tracking-[0.12em]
              hover:bg-blue-500 hover:text-white
              transition-all duration-250 shadow-lg magnetic-hover spring-press"
          >
            <Sparkles size={11} />
            AI Explain
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Grid card ─────────────────────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, delay: i * 0.06, ease: EASE_SMOOTH },
  }),
};

const GridCard: React.FC<{
  project: (typeof PROJECTS_DATA)[0];
  index: number;
  isMobile: boolean;
  onExplain: (p: (typeof PROJECTS_DATA)[0]) => void;
}> = ({ project, index, isMobile, onExplain }) => {
  const grad = project.category ? CAT_GRAD[project.category] : 'from-blue-500 to-purple-500';

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial={isMobile ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-color)]
        overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/20
        hover:border-blue-500/10 transition-all duration-400 flex flex-col group glass-premium card-lift"
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden relative flex-shrink-0">
        <OptimizedImage
          src={project.imageUrl}
          alt={project.title}
          className={`w-full h-full object-cover transition-all duration-700 ease-out
            ${isMobile
              ? 'opacity-85'
              : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.06]'
            }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-3/5
          bg-gradient-to-t from-[var(--bg-card)] to-transparent" />
        {project.category && (
          <div className="absolute top-3 right-3">
            <CatBadge cat={project.category} />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow px-5 pt-4 pb-5 sm:px-6 sm:pt-5 sm:pb-6 gap-3">
        {/* Accent rule */}
        <div
          className={`h-px rounded-full bg-gradient-to-r ${grad}
            w-7 group-hover:w-14 transition-all duration-500`}
        />

        <h3 className="text-[0.95rem] sm:text-lg font-bold tracking-tight leading-snug
          text-[var(--text-primary)] group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>

        <p className="text-[var(--text-muted)] text-[12px] sm:text-[13px] leading-relaxed
          line-clamp-3 font-light flex-grow">
          {project.description}
        </p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-[5px] rounded-lg
                text-[10px] font-mono text-[var(--text-subtle)] select-none">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 3, color: 'rgb(96, 165, 250)' }}
            className="inline-flex items-center gap-1.5 min-h-[40px]
              text-[11px] font-bold uppercase tracking-[0.13em]
              text-[var(--text-secondary)] hover:text-blue-400
              transition-colors duration-200 group/lnk magnetic-hover"
          >
            <Github size={12} />
            GitHub
            <ChevronRight
              size={12}
              className="group-hover/lnk:translate-x-0.5 transition-transform duration-200"
            />
          </motion.a>

          <motion.button
            onClick={() => onExplain(project)}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
              bg-blue-600/5 text-blue-400/80 hover:text-blue-400
              text-[9px] font-bold uppercase tracking-widest border border-blue-500/10
              transition-all duration-200 magnetic-hover"
          >
            <Sparkles size={10} />
            Explain
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Animated counter stat chip ───────────────────────────────────────── */
const StatChip: React.FC<{
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}> = ({ value, label, icon, onClick }) => {
  const isNum = typeof value === 'number';
  const motionVal = useMotionValue(0);
  const smoothVal = useSpring(motionVal, { stiffness: 60, damping: 18, restDelta: 0.5 });
  const [display, setDisplay] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-30, 30], [6, -6]), { stiffness: 160, damping: 20 });
  const rotY = useSpring(useTransform(mx, [-30, 30], [-6, 6]), { stiffness: 160, damping: 20 });

  useEffect(() => {
    if (!isNum) return;
    const unsubscribe = smoothVal.on('change', v => setDisplay(Math.round(v)));
    const timeout = setTimeout(() => motionVal.set(value as number), 300);
    return () => { unsubscribe(); clearTimeout(timeout); };
  }, [value, isNum, motionVal, smoothVal]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - rect.left - rect.width / 2);
    my.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.06, borderColor: 'rgba(59,130,246,0.45)' }}
      whileTap={{ scale: 0.95 }}
      className={`relative flex flex-col items-center sm:items-start gap-0.5 px-5 py-3
        rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]
        overflow-hidden cursor-pointer select-none transition-shadow duration-300
        hover:shadow-lg hover:shadow-blue-500/10 glass-premium magnetic-hover`}
    >
      {/* inner shimmer */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.12), transparent 70%)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {icon && <span className="mb-0.5 text-blue-400 opacity-60" style={{ transform: 'translateZ(8px)' }}>{icon}</span>}
      <span className="text-base sm:text-xl font-bold text-[var(--text-primary)] tracking-tight leading-none"
        style={{ transform: 'translateZ(8px)' }}>
        {isNum ? display : value}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)]"
        style={{ transform: 'translateZ(4px)' }}>
        {label}
      </span>
    </motion.div>
  );
};

/* ─── AI Explanation Overlay ─────────────────────────────────────────── */
const AIExplanationOverlay: React.FC<{
  project: (typeof PROJECTS_DATA)[0] | null;
  onClose: () => void;
}> = ({ project, onClose }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [scanStatus, setScanStatus] = useState('Initializing Neural Link...');

  useEffect(() => {
    if (!project) return;
    setIsScanning(true);

    const sequence = [
      { text: 'Retrieving Architecture Schematics...', delay: 600 },
      { text: 'Analyzing Tech Stack Efficiency...', delay: 1300 },
      { text: 'Extracting High-Impact Insights...', delay: 2000 },
      { text: 'Neural Sync Complete.', delay: 2600 }
    ];

    sequence.forEach((step, i) => {
      setTimeout(() => {
        setScanStatus(step.text);
        if (i === sequence.length - 1) {
          setTimeout(() => setIsScanning(false), 400);
        }
      }, step.delay);
    });
  }, [project]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <div className="px-6 sm:px-8 py-6 border-b border-white/5 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-400/20 blur-lg rounded-full animate-pulse" />
              <Sparkles size={24} className="text-blue-400 relative z-10" />
            </div>
            <div>
              <span className="block font-mono text-[10px] text-blue-500 uppercase tracking-[0.2em] font-bold">Neural_Explanation // v2.1</span>
              <h4 className="text-xl font-bold text-[var(--text-primary)]">{project.title}</h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl hover:bg-white/5 text-[var(--text-muted)] hover:text-white transition-all border border-transparent hover:border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 sm:py-8 space-y-8 sm:space-y-10 overflow-y-auto custom-scrollbar relative z-10">
          <AnimatePresence mode="wait">
            {isScanning ? (
              <motion.div
                key="scanning"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="py-12 flex flex-col items-center justify-center gap-6"
              >
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 border-2 border-blue-500/20 rounded-full" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-t-2 border-blue-500 rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Bot size={32} className="text-blue-400 animate-bounce" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-sm font-mono text-blue-400 animate-pulse">{scanStatus}</p>
                  <p className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-[0.15em]">Analyzing Datasets...</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-10"
              >
                {/* Architecture */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Workflow size={20} />
                    </div>
                    <h5 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[var(--text-primary)] font-bold">Project Architecture</h5>
                  </div>
                  <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-light pl-11">
                    {project.architecture ?? 'Architectural details unavailable.'}
                  </p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Cpu size={20} />
                    </div>
                    <h5 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[var(--text-primary)] font-bold">Technology Stack</h5>
                  </div>
                  <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-light pl-11">
                    {project.techExplanation ?? 'Technology stack overview unavailable.'}
                  </p>
                </motion.div>

                {/* Problem Solved */}
                <motion.div
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      <Bot size={20} />
                    </div>
                    <h5 className="text-[12px] font-mono uppercase tracking-[0.2em] text-[var(--text-primary)] font-bold">Solved Complexity</h5>
                  </div>
                  <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed font-light pl-11">
                    {project.problemSolved ?? 'Mission impact details unavailable.'}
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 border-t border-white/5 bg-white/[0.02] flex items-center justify-between relative z-10 mt-auto">
          <div className="flex items-center gap-2 opacity-30">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] font-mono text-[var(--text-dim)] uppercase tracking-widest font-bold">Realtime_Neural_Sync</span>
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[var(--text-primary)] text-[var(--bg-primary)] text-[11px] font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-lg active:scale-95 flex items-center gap-2"
          >
            Close Insight
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   HERO SECTION COMPONENT
════════════════════════════════════════════════════════════════════════════ */
interface HeroSectionProps {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  isMobile: boolean;
  projectCount: number;
  featuredCount: number;
  techCount: number;
}



const FloatingOrb: React.FC<{
  x: string; y: string; size: number;
  color: string; delay: number; duration: number;
}> = ({ x, y, size, color, delay, duration }) => (
  <motion.div
    aria-hidden
    className="absolute rounded-full pointer-events-none"
    style={{ left: x, top: y, width: size, height: size, background: color, filter: 'blur(60px)' }}
    animate={{ y: [0, -28, 0], x: [0, 12, -8, 0], scale: [1, 1.12, 0.95, 1], opacity: [0.45, 0.7, 0.45] }}
    transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
  />
);

const HeroSection: React.FC<HeroSectionProps> = ({
  heroY, heroOpacity, isMobile, projectCount, featuredCount, techCount,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const glowX = useMotionValue(0.5);
  const glowY = useMotionValue(0.5);
  const smoothGlowX = useSpring(glowX, { stiffness: 80, damping: 22 });
  const smoothGlowY = useSpring(glowY, { stiffness: 80, damping: 22 });
  const glowLeft = useTransform(smoothGlowX, [0, 1], ['0%', '100%']);
  const glowTop  = useTransform(smoothGlowY, [0, 1], ['0%', '100%']);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    glowX.set((e.clientX - rect.left) / rect.width);
    glowY.set((e.clientY - rect.top)  / rect.height);
  }, [glowX, glowY]);

  const handleMouseLeave = useCallback(() => {
    glowX.set(0.5);
    glowY.set(0.5);
  }, [glowX, glowY]);

  // Label letter stagger
  const labelVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
  };
  const charVariant = {
    hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: EASE_SMOOTH } },
  };

  // Headline word stagger
  const headlineVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.35 } },
  };
  const wordVariant = {
    hidden: { opacity: 0, y: 40, skewY: 5 },
    visible: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.65, ease: EASE_SMOOTH } },
  };

  // Sub-copy + stats stagger
  const bodyVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.75 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_SMOOTH } },
  };

  const stats = [
    { value: projectCount, label: 'Projects',     icon: <Code2 size={12} />,   target: 'all-projects' },
    { value: featuredCount, label: 'Featured',    icon: <Sparkles size={12} />, target: 'featured' },
    { value: techCount,     label: 'Technologies',icon: <Zap size={12} />,      target: 'technologies' },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      className="relative pt-20 sm:pt-28 pb-14 sm:pb-20 overflow-hidden"
    >
      {/* ── Floating ambient orbs ── */}
      <FloatingOrb x="8%"  y="10%" size={420} color="rgba(59,130,246,0.09)"  delay={0}   duration={9} />
      <FloatingOrb x="65%" y="-5%" size={320} color="rgba(139,92,246,0.07)"  delay={2}   duration={11} />
      <FloatingOrb x="40%" y="55%" size={260} color="rgba(20,184,166,0.06)"  delay={1}   duration={13} />
      <FloatingOrb x="85%" y="40%" size={200} color="rgba(245,158,11,0.05)"  delay={3}   duration={8} />

      {/* ── Cursor-follow glow ── */}
      {!isMobile && (
        <motion.div
          aria-hidden
          className="absolute pointer-events-none z-0"
          style={{
            left: glowLeft,
            top: glowTop,
            width: 560,
            height: 560,
            x: '-50%',
            y: '-50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 65%)',
            filter: 'blur(30px)',
          }}
        />
      )}

      {/* ── Static center glow ── */}
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: 640, height: 640,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        style={isMobile ? {} : { y: heroY, opacity: heroOpacity }}
        className="responsive-container relative z-10"
      >
        {/* ── ENGINEERING PORTFOLIO label — letter-by-letter ── */}
        <motion.div
          className="flex gap-0 mb-5"
          variants={labelVariants}
          initial="hidden"
          animate="visible"
        >
          {'ENGINEERING PORTFOLIO'.split('').map((ch, i) => (
            <motion.span
              key={i}
              variants={charVariant}
              className="font-mono text-[11px] text-blue-500 uppercase tracking-[0.38em]"
              style={{ display: ch === ' ' ? 'inline-block' : undefined, width: ch === ' ' ? '0.38em' : undefined }}
            >
              {ch}
            </motion.span>
          ))}
        </motion.div>

        {/* ── Headline — per-word stagger ── */}
        <motion.h1
          className="font-bold tracking-tighter leading-[0.88] mb-6"
          style={{ fontSize: 'clamp(2.2rem, 7.5vw, 6.5rem)' }}
          variants={headlineVariants}
          initial="hidden"
          animate="visible"
        >
          {/* "Solutions" with shimmer gradient */}
          <span className="block overflow-hidden">
            <motion.span
              variants={wordVariant}
              className="block"
              style={{
                background: 'linear-gradient(90deg, #fff 0%, #93c5fd 40%, #c4b5fd 65%, #fff 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear', delay: 1.2 }}
            >
              Solutions
            </motion.span>
          </span>
          {/* "Repository" — muted, slide in from below */}
          <span className="block overflow-hidden">
            <motion.span
              variants={wordVariant}
              className="block text-[var(--text-subtle)]"
            >
              Repository
            </motion.span>
          </span>
        </motion.h1>

        {/* ── Sub-copy + stats: staggered body ── */}
        <motion.div
          variants={bodyVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          {/* Sub-copy */}
          <motion.p
            variants={fadeUp}
            className="text-[var(--text-dim)] text-sm sm:text-[15px] leading-relaxed max-w-3xl font-light"
          >
            Data engineering pipelines, machine learning models, and analytics
            solutions&nbsp;— crafted for real-world scale.
            {/* Blinking cursor */}
            <motion.span
              className="inline-block ml-1 w-[2px] h-[1em] bg-blue-400 align-middle rounded-sm"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.p>

          {/* Divider line */}
          <motion.div
            variants={fadeUp}
            className="h-px w-0 bg-gradient-to-r from-blue-500/40 via-violet-500/30 to-transparent rounded-full"
            animate={{ width: '100%' }}
            transition={{ duration: 1.2, delay: 1.0, ease: EASE_SMOOTH }}
          />

          {/* Stat chips */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {stats.map(({ value, label, icon, target }) => (
              <StatChip
                key={label}
                value={value}
                label={label}
                icon={icon}
                onClick={() => {
                  document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════════════════ */
const Solutions: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDevice();
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [selectedAIProject, setSelectedAIProject] = useState<(typeof PROJECTS_DATA)[0] | null>(null);

  const featuredProjects = PROJECTS_DATA.filter(p => p.pinned);
  const filteredProjects = activeCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeCategory);

  /* Derived stats */
  const techSet = new Set(PROJECTS_DATA.flatMap(p => p.tags ?? []));

  /* Hero parallax */
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -70]);
  const heroOpacity = useTransform(scrollY, [0, 280], [1, 0]);



  /* SEO */
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    document.title = "Project Solutions | Ankit Abhishek - Data Engineer Portfolio";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', "Explore Ankit Abhishek's technical solutions, including ETL pipelines, Big Data systems, Machine Learning models, and scalable architectures.");
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc) metaDesc.setAttribute('content', originalDescription);
    };
  }, []);

  /* Track slider position */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      const cardW = el.scrollWidth / (featuredProjects.length || 1);
      setSliderIndex(Math.min(
        featuredProjects.length - 1,
        Math.round(el.scrollLeft / cardW),
      ));
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, [featuredProjects.length]);

  /* Scroll slider */
  const scrollFeatured = useCallback((dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.88;
    el.scrollTo({
      left: el.scrollLeft + (dir === 'right' ? step : -step),
      behavior: 'smooth',
    });
  }, []);

  /* Jump to specific dot */
  const goToSlide = useCallback((i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardW = el.scrollWidth / (featuredProjects.length || 1);
    el.scrollTo({ left: cardW * i, behavior: 'smooth' });
  }, [featuredProjects.length]);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <HeroSection
        heroY={heroY}
        heroOpacity={heroOpacity}
        isMobile={isMobile}
        projectCount={PROJECTS_DATA.length}
        featuredCount={featuredProjects.length}
        techCount={techSet.size}
      />

      {/* ══ TECHNOLOGIES SECTION ══════════════════════════════════════════ */}
      <section id="technologies" className="pb-20 sm:pb-28">
        <div className="responsive-container">
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold tracking-tighter text-[var(--text-primary)] mb-5">
              Technologies Used
            </h2>
            <p className="text-[var(--text-dim)] text-sm sm:text-base max-w-2xl">
              A quick glance at the unique tech stack across all showcased projects.
            </p>
          </div>
          {/* Animated badge grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07 },
              },
            }}
          >
            {Array.from(techSet).map((tech, i) => (
              <motion.span
                key={tech}
                className="inline-flex items-center px-3 py-1.5 rounded-full bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-medium border border-[var(--border-color)]"
                custom={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: (custom: number) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: custom * 0.04, ease: EASE_SMOOTH },
                  }),
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══ FEATURED SLIDER ═══════════════════════════════════════════════ */}
      <section id="featured" className="pb-14 sm:pb-20">
        {/* Header */}
        <div className="responsive-container mb-7 sm:mb-9
          flex items-center justify-between gap-4">
          <div>
            <span className="block font-mono text-[11px] text-blue-500
              uppercase tracking-[0.38em] mb-1.5">
              Top Selection
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold
              tracking-tighter text-[var(--text-primary)]">
              Featured
            </h2>
          </div>

          {/* Arrows */}
          <div className="flex gap-2 flex-shrink-0">
            {(['left', 'right'] as const).map(dir => (
              <button
                key={dir}
                onClick={() => scrollFeatured(dir)}
                aria-label={dir === 'left' ? 'Previous project' : 'Next project'}
                className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12
                  rounded-full border border-[var(--border-color)] bg-[var(--bg-card)]
                  text-[var(--text-secondary)]
                  hover:border-blue-500/40 hover:text-blue-400 hover:bg-blue-500/5
                  active:scale-90 transition-all duration-200"
              >
                {dir === 'left' ? <ChevronLeft size={17} /> : <ChevronRight size={17} />}
              </button>
            ))}
          </div>
        </div>

        {/* Track */}
        <div className="relative">
          {/* Edge fade masks (desktop) */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-20 z-10 pointer-events-none
            bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-20 z-10 pointer-events-none
            bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory
              no-scrollbar px-[var(--space-unit)] pb-1"
            style={{ scrollPaddingLeft: 'var(--space-unit)' }}
          >
            {featuredProjects.map((p, i) => (
              <FeaturedCard
                key={p.id}
                project={p}
                index={i}
                onExplain={setSelectedAIProject}
              />
            ))}
          </div>
        </div>

        {/* Dots */}
        <SliderDots
          total={featuredProjects.length}
          current={sliderIndex}
          onDot={goToSlide}
        />
      </section>

      {/* ══ ALL PROJECTS ══════════════════════════════════════════════════ */}
      <section id="all-projects" className="pb-24 sm:pb-36">
        <div className="responsive-container">

          {/* Section header */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-[2.4rem] font-bold
              tracking-tighter text-[var(--text-primary)] mb-5">
              All Projects
            </h2>

            {/* Filter strip — horizontally scrollable on mobile */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
              {CATEGORIES.map(({ label, value, Icon }) => {
                const isActive = activeCategory === value;
                return (
                  <button
                    key={value}
                    onClick={() => setActiveCategory(value)}
                    className={`relative flex items-center gap-1.5
                      px-3.5 py-2 rounded-full whitespace-nowrap flex-shrink-0
                      text-[11px] sm:text-xs font-semibold tracking-wide
                      border transition-all duration-250 active:scale-95
                      ${isActive
                        ? 'bg-blue-500 text-white border-blue-500 shadow-md shadow-blue-500/20'
                        : 'bg-transparent text-[var(--text-dim)] border-[var(--border-color)] hover:text-[var(--text-primary)] hover:border-blue-500/25'
                      }`}
                  >
                    <Icon size={11} />
                    {label}
                    {/* Spring-animated indicator — always mounted */}
                    {isActive && (
                      <motion.span
                        layoutId="cat-indicator"
                        className="absolute inset-0 rounded-full bg-blue-500 -z-10"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                gap-5 sm:gap-6 lg:gap-7"
            >
              {filteredProjects.map((project, i) => (
                <GridCard
                  key={project.id}
                  project={project}
                  index={i}
                  isMobile={isMobile}
                  onExplain={setSelectedAIProject}
                />
              ))}

              {filteredProjects.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center
                  py-24 gap-4 text-[var(--text-muted)]">
                  <Code2 size={36} strokeWidth={1} className="opacity-20" />
                  <p className="text-sm font-light">No projects in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>



          {/* ── GitHub CTA banner ── */}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="mt-20 sm:mt-28"
          >
            {/* Glowing border via gradient wrapper */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated gradient border layer */}
              <div
                aria-hidden
                className="absolute inset-0 animate-gradient"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, rgba(59,130,246,0.35), rgba(139,92,246,0.25), rgba(59,130,246,0.35))',
                  backgroundSize: '200% 100%',
                  padding: 1,
                }}
              />
              {/* Inner card */}
              <div
                className="relative m-px rounded-[1.42rem] overflow-hidden
                  bg-[var(--bg-card)]
                  px-8 py-10 sm:py-14
                  flex flex-col sm:flex-row items-center
                  justify-between gap-7 sm:gap-12"
              >
                {/* Left */}
                <div className="text-center sm:text-left">
                  <p className="font-mono text-[11px] uppercase tracking-[0.32em]
                    text-blue-500 mb-2">
                    Open Source
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight
                    text-[var(--text-primary)] mb-2">
                    More projects on GitHub
                  </h3>
                  <p className="text-[var(--text-dim)] text-xs sm:text-sm
                    font-light leading-relaxed max-w-[34ch]">
                    Explore all repositories, forks, and open-source contributions.
                  </p>
                </div>

                {/* Right */}
                <a
                  href="https://github.com/ANKIT21111"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-2.5
                    px-7 py-4 rounded-2xl min-h-[52px]
                    bg-[var(--text-primary)] text-[var(--bg-primary)]
                    text-[11px] font-bold uppercase tracking-[0.14em]
                    hover:bg-blue-500 hover:text-white
                    active:scale-95 transition-all duration-250
                    shadow-xl shadow-black/20"
                >
                  <Github size={15} />
                  View Profile
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ══ AI EXPLANATION OVERLAY ═══════════════════════════════════════ */}
      <AnimatePresence>
        {selectedAIProject && (
          <AIExplanationOverlay
            project={selectedAIProject}
            onClose={() => setSelectedAIProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Solutions;
