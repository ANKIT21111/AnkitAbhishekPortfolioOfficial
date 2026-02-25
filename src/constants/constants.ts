
import { TimelineItem, Project } from '../types/types';

// REPLACE THESE URLS WITH YOUR ACTUAL IMAGES
import G12 from '../assets/G12.jpg';
import G19 from '../assets/G19.png';

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
        title: 'Patient Alert ETL',
        description: 'Real-time streaming pipeline monitoring vital health parameters from hospital IoT devices. Processes data via Apache Kafka → Spark Structured Streaming → HBase, firing Amazon SNS alerts when vitals breach thresholds.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/Patient-Alert-ETL',
        pinned: true,
        category: 'ETL',
        tags: ['Apache Kafka', 'Spark', 'HBase', 'AWS SNS', 'Python'],
    },
    {
        id: 'p2',
        title: 'SparNord ATM Analytics',
        description: 'End-to-end ETL pipeline for Spar Nord Bank analyzing ATM refilling frequency across Europe. Data flows from RDBMS via Sqoop → HDFS → Hive, with Redshift for BI reporting and optimized cash management insights.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/SparNordETL',
        pinned: true,
        category: 'ETL',
        tags: ['PySpark', 'Sqoop', 'Hive', 'Redshift', 'Airflow'],
    },
    {
        id: 'p3',
        title: 'Filmytics',
        description: 'Strategic analytics for RSVP Movies using SQL & Excel to analyse global film performance, genre popularity, and talent trends — delivering data-backed production recommendations.',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/filmytics',
        pinned: true,
        category: 'Analytics',
        tags: ['SQL', 'Excel', 'Data Analysis', 'ER Diagram'],
    },
    {
        id: 'p4',
        title: 'Car Price Prediction',
        description: 'ML model predicting car prices using Simple, Multiple, and Ridge Linear Regression. Achieved R² = 0.84 by performing thorough feature engineering, data acquisition and model optimization.',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/CarPredict',
        pinned: false,
        category: 'ML',
        tags: ['Python', 'Scikit-learn', 'Pandas', 'Seaborn', 'Ridge Regression'],
    },
    {
        id: 'p5',
        title: 'NYC Taxi Analytics',
        description: 'Scalable Big Data pipeline analysing millions of NYC Taxi trips using Hadoop MapReduce & HBase to generate revenue, operational, and customer behaviour insights from raw trip records.',
        imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/NewYorkTaxi-MapReduce-Jobs',
        pinned: false,
        category: 'BigData',
        tags: ['Hadoop', 'MapReduce', 'HBase', 'Python', 'Big Data'],
    },
    {
        id: 'p7',
        title: 'MapReduce Explained',
        description: 'Hands-on learning repository for distributed data processing using Python & Hadoop Streaming. Showcases real-world MapReduce patterns, optimization techniques, and scalable data engineering practices.',
        imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/MapReduce_Explained',
        pinned: false,
        category: 'Learning',
        tags: ['Python', 'Hadoop Streaming', 'MapReduce', 'Big Data'],
    },
    {
        id: 'p6',
        title: 'Portfolio Website',
        description: 'This very portfolio — built with React 18, Vite, TypeScript, and Tailwind CSS. Features premium glassmorphism UI, Framer Motion animations, AI bot assistant, and a full SEO stack.',
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial',
        pinned: false,
        category: 'Web',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    },
];


