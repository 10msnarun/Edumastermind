/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: 'Computer Science' | 'Physics & Quantum' | 'Artificial Intelligence' | 'Mathematics' | 'Cloud & DevOps';
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Mastermind';
  duration: string;
  rating: number;
  studentsCount: number;
  progress: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  thumbnailUrl?: string;
  accentColor?: string;
  modules: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Standard' | 'Challenging' | 'Mastermind';
}

export interface Flashcard {
  id: string;
  deck: string;
  term: string;
  definition: string;
  conceptDeepDive: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
}

export interface MetricCard {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
}
