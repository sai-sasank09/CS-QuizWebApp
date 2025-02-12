export interface Topic {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  topicId: string;
}

export interface QuizResult {
  id: string;
  topicId: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  totalScore: number;
}

export interface LeaderboardEntry {
  user: User;
  score: number;
  rank: number;
}