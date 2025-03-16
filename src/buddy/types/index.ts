export interface BuilderSession {
  builderId: string;
  startTime: Date;
  responses: BuilderResponse[];
}

export interface BuilderResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  tags: string[];
  platforms: PublishPlatform[];
}

export interface BuddyQuestion {
  id: string;
  text: string;
  type: 'open' | 'progress' | 'reflection';
  context?: string;
}

export type PublishPlatform = 'mdx' | 'bluesky' | 'twitter' | 'linkedin';

export interface PublishResult {
  platform: PublishPlatform;
  status: 'success' | 'failed';
  url?: string;
  error?: string;
}
