
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
        description: 'Real-time data pipeline to monitor vital health parameters from IoT devices using Apache Kafka, Spark, and HBase for timely medical interventions.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/Patient-Alert-ETL',
        pinned: true,
    },
    {
        id: 'p2',
        title: 'SparNord ATM Analytics',
        description: 'ETL Pipeline for Spar Nord Bank to analyze ATM refilling frequency across Europe utilizing PySpark and Airflow for optimized cash management.',
        imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/SparNordETL',
        pinned: true,
    },
    {
        id: 'p3',
        title: 'Filmytics',
        description: 'Data-driven analytics project for RSVP Movies leveraging SQL & Excel to derive strategic insights on global film performance and talent trends.',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/filmytics',
        pinned: true,
    },
    {
        id: 'p4',
        title: 'Car Price Prediction',
        description: 'Machine learning project predicting car prices using Linear Regression techniques with 84% accuracy, featuring comprehensive data analysis.',
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/CarPredict',
        pinned: false,
    },
    {
        id: 'p5',
        title: 'NYC Taxi Analytics',
        description: 'MapReduce implementation for processing large-scale New York Taxi dataset to uncover trip patterns and urban mobility insights.',
        imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/NewYorkTaxi-MapReduce-Jobs',
        pinned: false,
    },
    {
        id: 'p6',
        title: 'Portfolio Website',
        description: 'Personal portfolio built with React, Vite, and Tailwind CSS, featuring high-end animations and a responsive design.',
        imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&q=80',
        link: 'https://github.com/ANKIT21111/AnkitAbhishekPortfolioOfficial',
        pinned: false,
    },
];


