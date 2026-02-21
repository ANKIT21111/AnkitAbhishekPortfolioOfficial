
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { PROJECTS_DATA } from '../constants/constants';
import { ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';
import OptimizedImage from '../components/ui/OptimizedImage';


const Solutions: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const featuredProjects = PROJECTS_DATA.filter(p => p.pinned);
  const gridProjects = PROJECTS_DATA;

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const getThumbnailUrl = (url: string) => {
    if (url.includes('loremflickr.com')) {
      return url.replace('800/600', '500/375');
    }
    return url;
  };

  return (
    <div className="min-h-screen">
      {/* Featured Slider */}
      <section className="section-padding bg-transparent">
        <div className="responsive-container mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="space-y-2">
            <span className="text-blue-500 font-mono text-xs uppercase tracking-[0.3em] block">Top Selection</span>
            <h2 className="tracking-tighter">Featured Solutions</h2>
          </div>
          <div className="flex gap-3">
            <button onClick={() => scroll('left')} className="p-4 rounded-full border border-[var(--border-color)] hover:bg-blue-500 hover:text-white transition-all glass shadow-lg group">
              <ChevronLeft size={20} className="group-active:scale-90 transition-transform" />
            </button>
            <button onClick={() => scroll('right')} className="p-4 rounded-full border border-[var(--border-color)] hover:bg-blue-500 hover:text-white transition-all glass shadow-lg group">
              <ChevronRight size={20} className="group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-12 px-[var(--space-unit)]"
          >
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                className="min-w-[90%] md:min-w-[65%] lg:min-w-[45%] snap-center"
              >
                <div className="relative aspect-[16/10] sm:aspect-video rounded-[32px] overflow-hidden group glass border-[var(--border-color)]">
                  <OptimizedImage
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    priority={index < 2}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-transparent to-transparent p-6 sm:p-10 flex flex-col justify-end">
                    <h3 className="mb-2 text-[var(--text-primary)] tracking-tight">{project.title}</h3>
                    <p className="text-[var(--text-dim)] line-clamp-2 max-w-lg mb-8 text-sm sm:text-base font-light">{project.description}</p>
                    <a href={project.link} className="w-fit px-8 py-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-2xl font-bold flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all shadow-2xl active:scale-95 text-xs uppercase tracking-widest">
                      Exploration <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Edge Gradients for Desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none z-10"></div>
          <div className="hidden lg:block absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none z-10"></div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-padding pt-0 relative overflow-hidden">
        <div className="responsive-container">
          <h2 className="mb-12 tracking-tighter">Solutions Repository</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {gridProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
                whileHover={isMobile ? {} : { y: -10 }}
                className="bg-[var(--bg-card)] rounded-[2.5rem] border border-[var(--border-color)] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <OptimizedImage
                    src={getThumbnailUrl(project.imageUrl)}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-700 ${isMobile ? '' : 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[var(--bg-card)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 sm:p-10 flex-grow flex flex-col">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-[var(--text-primary)] tracking-tight group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm sm:text-base mb-8 leading-relaxed line-clamp-3 font-light flex-grow">
                    {project.description}
                  </p>
                  <a
                    href={project.link}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[var(--text-primary)] hover:text-blue-400 transition-colors uppercase tracking-[0.2em] group/link"
                  >
                    View Solution <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
