import React from 'react';
import { ArrowRight } from 'lucide-react';

interface TopicCardProps {
  title: string;
  description: string;
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  onStart: () => void;
}

export function TopicCard({ title, description, questionCount, difficulty, onStart }: TopicCardProps) {
  const difficultyColor = {
    Beginner: 'bg-green-100 text-green-800',
    Intermediate: 'bg-yellow-100 text-yellow-800',
    Advanced: 'bg-red-100 text-red-800'
  }[difficulty];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{questionCount} questions</span>
        <span className={`px-3 py-1 rounded-full text-sm ${difficultyColor}`}>
          {difficulty}
        </span>
      </div>
      <button
        onClick={onStart}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Start Quiz</span>
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}