import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
    {
        id: "1",
        title: "The Future of Distributed Systems",
        date: "Feb 2, 2026",
        readTime: "5 min read",
        snippet: "Exploring the next generation of neural distributed architectures and their impact on global computing scales.",
        category: "Architecture",
        content: `
      <h1>The Future of Distributed Systems</h1>
      <p>As we move towards more complex computational needs, distributed systems are evolving...</p>
      <h2>Neural Architectures</h2>
      <p>The concept of neural architectures in distributed systems allows for self-healing and auto-scaling...</p>
    `
    },
    {
        id: "2",
        title: "Optimizing React Performance",
        date: "Jan 28, 2026",
        readTime: "3 min read",
        snippet: "Deep dive into advanced patterns for optimizing React application performance in high-frequency trading dashboards.",
        category: "Optimization",
        content: `
      <h1>Optimizing React Performance</h1>
      <p>React's virtual DOM is fast, but handling thousands of updates per second requires special care...</p>
    `
    }
];
