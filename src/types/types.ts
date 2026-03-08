
export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  period: string;
  type: 'work' | 'education' | 'life';
  tags?: string[];
  achievement?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  pinned: boolean;
  tags?: string[];
  category?: 'ETL' | 'ML' | 'Analytics' | 'BigData' | 'Web' | 'Learning';
  architecture?: string;
  techExplanation?: string;
  problemSolved?: string;
}

export interface HeroStat {
  label: string;
  value: string[];
  color: string;
  icon: 'database' | 'layers' | 'shield' | 'zap';
}
