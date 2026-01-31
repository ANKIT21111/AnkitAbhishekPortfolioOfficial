
import { TimelineItem, Project, BlogPost } from './types';

// REPLACE THESE URLS WITH YOUR ACTUAL IMAGES
import G12 from './components/pics/G12.jpg';
import G19 from './components/pics/G19.png';

export const AVATAR_URL = G12;
export const PORTRAIT_URL = G19;

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: '1',
    title: 'M.Sc. in Data Science',
    subtitle: 'Liverpool John Moores University',
    description: 'Currently completing my Masters of Science in Data Science, focusing on advanced analytical techniques and data-driven insights.',
    period: '2024 - Present',
    type: 'education',
  },
  {
    id: '2',
    title: 'Executive Post-Graduation',
    subtitle: 'IIIT Bangalore',
    description: 'Completed Executive Post-Graduation in the field of Data Science with a specialization in Data Engineering.',
    period: '2023 - 2024',
    type: 'education',
  },
  {
    id: '3',
    title: 'Software Engineer',
    subtitle: 'Tech Mahindra',
    description: 'Worked as an Application Developer, contributing to various software solutions and enterprise applications.',
    period: '2021 - 2024',
    type: 'work',
  },
  {
    id: '4',
    title: 'Undergraduate Studies',
    subtitle: 'Bachelor of Technology',
    description: 'Developed a strong foundation in data structures, algorithms, and software engineering.',
    period: '2017 - 2021',
    type: 'education',
  },
  {
    id: '5',
    title: 'School Life',
    subtitle: 'Early Education',
    description: 'Formative years focusing on academic excellence and early interest in technology.',
    period: '2005 - 2017',
    type: 'life',
  },
  {
    id: '6',
    title: 'Early Life & Background',
    subtitle: 'Curiosity Unleashed',
    description: 'Raised with a passion for problem-solving and dismantling electronic gadgets to see how they worked.',
    period: 'Early Years',
    type: 'life',
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Aurora AI',
    description: 'A cutting-edge generative AI dashboard with real-time analytics and predictive modeling for enterprise users.',
    imageUrl: 'https://picsum.photos/seed/aurora/800/600',
    link: '#',
    pinned: true,
  },
  {
    id: 'p2',
    title: 'Nebula Commerce',
    description: 'High-performance e-commerce engine built for scale, featuring headless CMS integration and edge rendering.',
    imageUrl: 'https://picsum.photos/seed/nebula/800/600',
    link: '#',
    pinned: true,
  },
  {
    id: 'p3',
    title: 'Quant Flow',
    description: 'Financial visualization tool for tracking crypto market movements with sub-second latency updates.',
    imageUrl: 'https://picsum.photos/seed/quant/800/600',
    link: '#',
    pinned: true,
  },
  {
    id: 'p4',
    title: 'Zenith CRM',
    description: 'Next-gen customer relationship management platform focused on automation and minimalist user interfaces.',
    imageUrl: 'https://picsum.photos/seed/zenith/800/600',
    link: '#',
    pinned: false,
  },
  {
    id: 'p5',
    title: 'Eco Trace',
    description: 'Supply chain tracking application that helps companies monitor and reduce their overall carbon footprint.',
    imageUrl: 'https://picsum.photos/seed/eco/800/600',
    link: '#',
    pinned: false,
  },
  {
    id: 'p6',
    title: 'Nexus OS',
    description: 'A simulated web-based operating system built to showcase browser-based virtualization capabilities.',
    imageUrl: 'https://picsum.photos/seed/nexus/800/600',
    link: '#',
    pinned: false,
  },
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'Architecting Scalable Data Lakes',
    date: 'Oct 12, 2024',
    readTime: '5 min read',
    snippet: 'Exploring how to design robust data lake architectures using Delta Lake and Iceberg for modern storage needs.',
    category: 'Architecture',
  },
  {
    id: 'b2',
    title: 'Real-time Stream Processing with Apache Flink',
    date: 'Sep 28, 2024',
    readTime: '8 min read',
    snippet: 'A deep dive into building low-latency data pipelines and handling late-arriving events in high-throughput environments.',
    category: 'Streaming',
  },
  {
    id: 'b3',
    title: 'Optimizing Spark Jobs for Performance',
    date: 'Aug 15, 2024',
    readTime: '12 min read',
    snippet: 'Why understanding shuffle partitions and memory management is essential for building efficient ETL processes at scale.',
    category: 'Optimization',
  },
];