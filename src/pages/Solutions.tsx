
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

  // Helper to get smaller version of placeholder images for grid thumbnails
  const getThumbnailUrl = (url: string) => {
    if (url.includes('loremflickr.com')) {
      return url.replace('800/600', '500/375'); // 25% smaller dimensions, ~56% fewer pixels
    }
    return url;
  };

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Featured Slider */}
      <section className="px-6 max-w-7xl mx-auto mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-blue-500 font-mono text-xs uppercase tracking-widest mb-2 block">Top Selection</span>
            <h2 className="text-4xl font-bold">Featured Solutions</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={() => scroll('left')} className="p-3 rounded-full border border-[var(--border-color)] hover:bg-[var(--nav-hover)] transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full border border-[var(--border-color)] hover:bg-[var(--nav-hover)] transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8"
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="min-w-[85%] md:min-w-[60%] lg:min-w-[45%] snap-center"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden group">
                <OptimizedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/90 via-transparent to-transparent p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">{project.title}</h3>
                  <p className="text-[var(--text-dim)] line-clamp-2 max-w-lg mb-6">{project.description}</p>
                  <a href={project.link} className="w-fit px-6 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full font-bold flex items-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-lg">
                    Exploration <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Grid */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Solutions Repository</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gridProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-20px" : "-100px" }}
              whileHover={isMobile ? {} : { y: -8 }}
              className="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-color)] overflow-hidden group shadow-sm hover:shadow-xl transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <OptimizedImage
                  src={getThumbnailUrl(project.imageUrl)}
                  alt={project.title}
                  className={`w-full h-full transition-all duration-500 ${isMobile ? '' : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'}`}
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-[var(--text-primary)]">{project.title}</h3>
                <p className="text-[var(--text-muted)] text-sm mb-6 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--text-primary)] hover:text-blue-400 transition-colors"
                >
                  View Solution <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Solutions;
