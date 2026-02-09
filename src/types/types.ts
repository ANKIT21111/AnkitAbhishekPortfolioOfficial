
export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  type: 'work' | 'education' | 'life';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  pinned: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  time: string;
}
