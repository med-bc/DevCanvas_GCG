export interface Project {
  id: string;
  title: string;
  version?: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    role?: string;
    isOnline?: boolean;
  };
  description: string;
  longDescription?: string;
  tags: string[];
  category: 'Machine Learning' | 'Web' | 'Backend' | 'Desktop' | 'Mobile' | 'DevOps' | 'UI' | 'Serverless';
  stars: number;
  forks: number;
  commits?: number;
  contributors?: number;
  views?: number;
  githubUrl: string;
  isAvailableForCollab?: boolean;
  isPublic?: boolean;
  isDraft?: boolean;
  isPrivate?: boolean;
  updatedAt: string;
  isStarred?: boolean;
  readme?: {
    lastUpdated: string;
    content: string;
  };
}

export interface ContactMessage {
  id: string;
  projectId: string;
  projectTitle: string;
  creatorUsername: string;
  creatorName: string;
  creatorAvatar: string;
  status: 'replied' | 'sent' | 'collaborating';
  timeAgo: string;
  tags: string[];
  lastMessage: string;
  chatHistory: {
    id: string;
    sender: 'user' | 'creator';
    text: string;
    timestamp: string;
  }[];
}

export interface UserProfile {
  name: string;
  username: string;
  role: string;
  avatar: string;
  bio: string;
  projectsCount: number;
  contributionsCount: number;
  followingCount: number;
  skills: string[];
  website?: string;
  github?: string;
}

export type ActiveTab = 'explore' | 'upload' | 'projects' | 'profile' | 'search' | 'detail' | 'contacts';
