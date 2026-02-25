import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { PROJECTS_DATA } from '../constants/constants';
import {
  ExternalLink, ChevronRight, ChevronLeft,
  Github, Code2, Database, BarChart3, Cpu, Globe, BookOpen, Layers,
} from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';

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
}> = ({ project, index }) => {
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
        hover:border-blue-500/15 hover:shadow-blue-500/5 transition-all duration-500"
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
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} repository`}
          className="mt-0.5 self-start inline-flex items-center gap-2
            px-5 py-2.5 rounded-xl min-h-[44px]
            bg-[var(--text-primary)] text-[var(--bg-primary)]
            text-[11px] font-bold uppercase tracking-[0.12em]
            hover:bg-blue-500 hover:text-white
            active:scale-95 transition-all duration-250 shadow-lg"
        >
          <Github size={13} />
          View Repository
          <ExternalLink size={11} />
        </a>
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
}> = ({ project, index, isMobile }) => {
  const grad = project.category ? CAT_GRAD[project.category] : 'from-blue-500 to-purple-500';

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial={isMobile ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={isMobile ? {} : { y: -6 }}
      transition={isMobile ? {} : { duration: 0.3 }}
      className="bg-[var(--bg-card)] rounded-[2rem] border border-[var(--border-color)]
        overflow-hidden shadow-sm hover:shadow-xl hover:shadow-black/20
        hover:border-blue-500/10 transition-all duration-400 flex flex-col group"
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

        {/* Footer link */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} on GitHub`}
          className="inline-flex items-center gap-1.5 min-h-[40px]
            text-[11px] font-bold uppercase tracking-[0.13em]
            text-[var(--text-secondary)] hover:text-blue-400
            transition-colors duration-200 group/lnk"
        >
          <Github size={12} />
          View on GitHub
          <ChevronRight
            size={12}
            className="group-hover/lnk:translate-x-0.5 transition-transform duration-200"
          />
        </a>
      </div>
    </motion.article>
  );
};

/* ─── Hero stat chip ────────────────────────────────────────────────────── */
const StatChip: React.FC<{ value: string | number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center sm:items-start gap-0.5 px-5 py-3
    rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
    <span className="text-base sm:text-xl font-bold text-[var(--text-primary)] tracking-tight leading-none">
      {value}
    </span>
    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--text-dim)]">
      {label}
    </span>
  </div>
);

/* ════════════════════════════════════════════════════════════════════════════
   PAGE COMPONENT
════════════════════════════════════════════════════════════════════════════ */
const Solutions: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sliderIndex, setSliderIndex] = useState(0);

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

  /* Responsive */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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
      <section className="relative pt-20 sm:pt-28 pb-14 sm:pb-20 overflow-hidden">
        {/* Ambient glow */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 640, height: 640,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <motion.div
          style={isMobile ? {} : { y: heroY, opacity: heroOpacity }}
          className="responsive-container relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: EASE_SMOOTH }}
          >
            {/* Label */}
            <span className="inline-block font-mono text-[11px] text-blue-500
              uppercase tracking-[0.38em] mb-5">
              Engineering Portfolio
            </span>

            {/* Headline */}
            <h1
              className="font-bold text-[var(--text-primary)] tracking-tighter
                leading-[0.88] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)' }}
            >
              Solutions<br />
              <span className="text-[var(--text-subtle)]">Repository</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-[var(--text-dim)] text-sm sm:text-[15px] leading-relaxed
              max-w-[42ch] font-light mb-9">
              Data engineering pipelines, machine learning models, and analytics
              solutions&nbsp;— crafted for real-world scale.
            </p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: EASE_SMOOTH }}
              className="flex flex-wrap gap-3"
            >
              <StatChip value={PROJECTS_DATA.length} label="Projects" />
              <StatChip value={featuredProjects.length} label="Featured" />
              <StatChip value={techSet.size} label="Technologies" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ FEATURED SLIDER ═══════════════════════════════════════════════ */}
      <section className="pb-14 sm:pb-20">
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
              <FeaturedCard key={p.id} project={p} index={i} />
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
      <section className="pb-24 sm:pb-36">
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
    </div>
  );
};

export default Solutions;
