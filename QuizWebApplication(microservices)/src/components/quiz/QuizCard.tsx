import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizCardProps {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string;
  isCorrect?: boolean;
}

export function QuizCard({ question, options, onSelect, selectedOption, isCorrect }: QuizCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(option)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedOption === option
                ? isCorrect
                  ? 'bg-green-100 border-green-500'
                  : 'bg-red-100 border-red-500'
                : 'bg-gray-50 hover:bg-gray-100'
            } border ${selectedOption === option ? 'border-2' : 'border'}`}
          >
            <div className="flex items-center justify-between">
              <span>{option}</span>
              {selectedOption === option && (
                isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}