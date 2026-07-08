
import { TimelineItem, Project, HeroStat } from '../types/types';

// REPLACE THESE URLS WITH YOUR ACTUAL IMAGES
import G12 from '../assets/G12.webp';
import G19 from '../assets/G19.webp';

import cvplLogo from '../assets/cvpl_logo.png';
import ljmuLogo from '../assets/ljmu_logo.png';
import techmLogo from '../assets/techm_logo.png';
import jagannathLogo from '../assets/jagannath_logo.jpg';
import iiitbLogo from '../assets/iiitb_logo.png';

export const AVATAR_URL = G12;
export const PORTRAIT_URL = G19;


export const TIMELINE_DATA: TimelineItem[] = [
    {
        id: 'today',
        title: 'Data Engineer | AI Engineer',
        subtitle: 'Cloud-Native Data Platforms & AI Solutions',
        description: 'Today, I focus on designing scalable, cloud-native data platforms that transform raw data into reliable, business-ready insights. My expertise spans data engineering, analytics engineering, distributed computing, and cloud technologies, with a growing interest in integrating AI capabilities. Alongside professional experience and formal education, I invest significant time in developing hands-on projects that simulate real-world data engineering scenarios to strengthen my understanding of distributed systems, streaming architectures, and cloud-native ETL design.',
        period: 'Present',
        type: 'work',
        tags: ['Cloud-Native Data Platforms', 'AI Integration', 'ETL Pipelines', 'Large-Scale Processing', 'Cloud Services'],
        tagsLabel: 'Focus Areas',
        secondaryTags: [
            'Real-Time Data Pipelines',
            'Apache Kafka',
            'Apache Spark & PySpark',
            'Spark Streaming',
            'AWS EMR',
            'Amazon S3',
            'Amazon Redshift',
            'Amazon RDS',
            'Apache Hive',
            'HBase',
            'Data Warehousing',
            'Star Schema Design',
            'Batch & Streaming ETL Pipelines'
        ],
        secondaryTagsLabel: 'Project Areas'
    },
    {
        id: 'ljmu',
        title: 'Master of Science in Data Science',
        subtitle: 'Liverpool John Moores University',
        description: 'Pursued advanced studies in Data Science to deepen my understanding of modern data engineering, machine learning, cloud computing, and analytics. The program expanded both theoretical knowledge and practical implementation skills, strengthening my ability to design scalable data solutions.',
        period: '2025 – 2026',
        type: 'education',
        tags: ['Advanced Data Science', 'Statistical Analysis', 'Machine Learning', 'Big Data Analytics', 'Data Engineering', 'Research Methodology'],
        tagsLabel: 'Focus Areas',
        achievement: 'Graduated with Merit',
        logo: ljmuLogo
    },
    {
        id: 'cvpl',
        title: 'Data Analyst / Analytics Engineer',
        subtitle: 'Competence Virtual Pvt. Ltd.',
        description: 'Transitioned into the data domain by working on survey data processing, analytics automation, ETL workflows, and reporting solutions for large-scale development sector projects. Designed automated data processing workflows that improved reporting accuracy, reduced manual effort, and enabled stakeholders to make faster, data-driven decisions.',
        period: 'August 2024 – October 2025',
        type: 'work',
        highlights: [
            'Built automated ETL workflows.',
            'Processed and validated large survey datasets.',
            'Improved reporting efficiency through automation.',
            'Worked with SurveyCTO and KoboToolbox.',
            'Developed Python- and SQL-based data processing solutions.',
            'Collaborated with research and consulting teams on data-driven projects.'
        ],
        tags: ['Python', 'SQL', 'SurveyCTO', 'KoboToolbox', 'Excel', 'Data Validation', 'ETL'],
        tagsLabel: 'Primary Technologies',
        logo: cvplLogo
    },
    {
        id: 'iiitb',
        title: 'Executive Post Graduate Programme in Data Science',
        subtitle: 'IIIT Bangalore',
        description: 'While working full-time as a Software Engineer, I pursued an Executive Post Graduate Programme specializing in Data Science with a focus on Data Engineering. This marked the beginning of my transition from software development toward modern data platforms, distributed computing, cloud technologies, and analytics engineering.',
        period: 'July 2023 – July 2024',
        type: 'education',
        tags: ['SQL', 'Python', 'Data Engineering', 'Machine Learning Fundamentals', 'Apache Spark', 'Big Data Ecosystem', 'Data Warehousing', 'ETL Design', 'Cloud Data Platforms'],
        tagsLabel: 'Major Learning Areas',
        logo: iiitbLogo
    },
    {
        id: 'techm',
        title: 'Software Engineer',
        subtitle: 'Tech Mahindra',
        description: 'Started my professional career as a Software Engineer, developing enterprise-grade mobile applications using React Native. Collaborated with cross-functional teams to deliver scalable, user-centric solutions while gaining valuable experience in agile development, production support, and software delivery. During this phase, I strengthened my engineering mindset by focusing on writing maintainable code, debugging complex issues, optimizing application performance, and delivering reliable software at scale.',
        period: 'September 2021 – March 2024',
        type: 'work',
        highlights: [
            'Delivered 40+ production features and enhancements.',
            'Managed 50+ production change requests.',
            'Improved application efficiency by approximately 30%.',
            'Reduced production incidents by over 70%.',
            'Contributed to applications serving more than 5,000 active users.',
            'Worked in Agile and Scrum environments.'
        ],
        tags: ['React Native', 'JavaScript', 'REST APIs', 'Git', 'Jira'],
        tagsLabel: 'Primary Technologies',
        logo: techmLogo
    },
    {
        id: 'btech',
        title: 'Bachelor of Technology in Computer Science & Engineering',
        subtitle: 'Jagannath Institute of Management and Science | Jagannath University',
        description: 'Built a strong foundation in computer science through programming, algorithms, databases, operating systems, networking, and software engineering. During this period, I developed a deep interest in solving real-world problems using technology, laying the groundwork for my future career in software development and data engineering.',
        period: '2017 – 2021',
        type: 'education',
        tags: ['Programming Fundamentals', 'Data Structures & Algorithms', 'Database Management Systems', 'Software Engineering', 'Computer Networks'],
        tagsLabel: 'Key Focus',
        logo: jagannathLogo
    }
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
        architecture: 'Distributed event-driven architecture using Kafka for ingestion, Spark Streaming for processing, and HBase for storage.',
        techExplanation: 'Leverages Apache Kafka for high-throughput messaging, Spark Structured Streaming for stateful processing, and HBase for low-latency lookups.',
        problemSolved: 'Enables real-time monitoring of hospital IoT vitals with automated alerting, significantly reducing response time for critical medical events.',
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
        architecture: 'Batch ETL pipeline with Sqoop for RDS extraction, HDFS/Hive for data lake processing, and Redshift for BI warehousing.',
        techExplanation: 'Utilizes PySpark for distributed transformations and Airflow for orchestration of multi-step financial data workflows.',
        problemSolved: 'Optimized cash management and logistics for Spar Nord Bank by accurately predicting ATM refilling schedules across European branches.',
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
        architecture: 'Relational data modelling with complex multi-table analytical querying for business intelligence insights.',
        techExplanation: 'Employs advanced SQL (window functions, subqueries) and Excel-based visualization for strategic talent and genre performance metrics.',
        problemSolved: 'Transformed raw global cinema data into actionable production strategies, identifying high-ROI genres and talent for RSVP Movies.',
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
        architecture: 'Supervised learning pipeline featuring robust feature engineering, scaling, and regularization for predictive accuracy.',
        techExplanation: 'Implements Ridge and Linear Regression models with comprehensive outlier management and correlation analysis.',
        problemSolved: 'Provides a highly accurate vehicle valuation engine (R²=0.84), helping consumers and dealerships determine fair market prices.',
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
        architecture: 'MapReduce-based distributed processing framework designed for terabyte-scale historical trip records.',
        techExplanation: 'Uses Hadoop for distributed storage and HBase for fast retrieval of aggregated urban mobility metrics.',
        problemSolved: 'Gained operational and customer behavior insights from millions of taxi trips, identifying profitable zones and peak usage patterns.',
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
        architecture: 'Distributed computing design patterns implemented via Python-based Hadoop Streaming jobs.',
        techExplanation: 'Focuses on teaching Data Engineering core concepts: Shuffle, Sort, Combiner, and Partitioning logic in distributed environments.',
        problemSolved: 'Educational resource that bridges the gap between theoretical Big Data concepts and practical MapReduce implementation.',
    },
    {
        id: 'p6',
        title: 'Portfolio Website',
        description: 'This very portfolio — built with React 18, Vite, TypeScript, and Tailwind CSS. Features premium glassmorphism UI, Framer Motion animations, Developer Portfolio Chatbot, and a full SEO stack.',
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial',
        pinned: false,
        category: 'Web',
        tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
        architecture: 'Component-driven frontend architecture with integrated AI assistance and high-performance asset optimization.',
        techExplanation: 'Built on React 18 with Vite for blazing-fast builds, Tailwind for premium styling, and Framer Motion for desktop-level interactivity.',
        problemSolved: 'Professional showcase engine that combines technical depth with high-fidelity visual aesthetics to communicate complex engineering project value.',
    },
];

export const HERO_STATS: HeroStat[] = [
    {
        label: "Experience",
        value: ["3+ Years", "Enterprise Experience"],
        color: "blue",
        icon: 'database'
    },
    {
        label: "Delivery Record",
        value: ["10+ Large-Scale", "Data Pipelines"],
        color: "purple",
        icon: 'layers'
    },
    {
        label: "Education",
        value: ["M.Sc. Data Science", "LJMU"],
        color: "emerald",
        icon: 'shield'
    },
    {
        label: "Tech Ecosystem",
        value: ["Hadoop & Spark", "Cloud Architecture"],
        color: "blue",
        icon: 'zap'
    }
];


