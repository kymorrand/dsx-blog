import type { BuilderResponse, BlogPost } from '../types';

export function generateMDXContent(responses: BuilderResponse[]): string {
  const today = new Date().toISOString().split('T')[0];
  
  // Extract key information from responses
  const mainFocus = responses.find(r => r.question.includes('main focus'))?.answer || '';
  const challenges = responses.find(r => r.question.includes('challenges'))?.answer || '';
  const achievements = responses.find(r => r.question.includes('achievements'))?.answer || '';
  const learnings = responses.find(r => r.question.includes('learnings'))?.answer || '';
  const nextSteps = responses.find(r => r.question.includes('next'))?.answer || '';

  return `---
title: "DSX Development Log - ${today}"
date: ${new Date().toISOString()}
author: "Lab3 Builder"
tags: ["dsx", "development", "log"]
---

# DSX Development Log - ${today}

## Today's Focus
${mainFocus}

## Key Achievements
${achievements}

## Challenges & Solutions
${challenges}

## Insights & Learnings
${learnings}

## Next Steps
${nextSteps}

---
*This post was generated through The Builders Log, documenting the development of The Digital Sunshine Exchange.*
`;
}

export function generateSocialContent(post: BlogPost, platform: 'twitter' | 'bluesky' | 'linkedin'): string {
  const title = post.title;
  const achievements = post.content.split('## Key Achievements')[1]?.split('##')[0]?.trim() || '';
  const nextSteps = post.content.split('## Next Steps')[1]?.split('---')[0]?.trim() || '';

  switch (platform) {
    case 'twitter':
      return `🚀 ${title}\n\n🎯 Key Win: ${truncate(achievements, 180)}\n\n👉 Next: ${truncate(nextSteps, 50)}\n\n#DSX #BuildInPublic`;
    
    case 'bluesky':
      return `🌟 ${title}\n\n${truncate(achievements, 250)}\n\n📋 Read the full log: [link]\n\n#DSX #BuildInPublic #Lab3`;
    
    case 'linkedin':
      return `🔆 ${title}\n\n${achievements}\n\n🔜 What's Next:\n${nextSteps}\n\n#DSX #BuildInPublic #Lab3 #DigitalSunshineExchange`;
    
    default:
      return '';
  }
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}
