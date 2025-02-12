import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { quizApi, topicsApi } from '../../services/api';
import { QuizCard } from './QuizCard';
import { Question } from '../../types';

export function QuizView() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const { data: questions, isLoading } = useQuery<Question[]>(
    ['questions', topicId],
    () => topicsApi.getQuestions(topicId!).then(res => res.data)
  );

  const submitQuizMutation = useMutation(
    (answers: Record<string, string>) => quizApi.submit(topicId!, answers),
    {
      onSuccess: () => {
        navigate('/leaderboard');
      },
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="text-center text-red-600 p-4">
        No questions available for this topic.
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    submitQuizMutation.mutate(answers);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <div className="text-sm text-gray-600">
          {Math.round((currentQuestion / questions.length) * 100)}% Complete
        </div>
      </div>

      <div className="mb-8 w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
        ></div>
      </div>

      <QuizCard
        question={questions[currentQuestion].text}
        options={questions[currentQuestion].options}
        onSelect={handleAnswer}
        selectedOption={answers[questions[currentQuestion].id]}
      />

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={submitQuizMutation.isLoading}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            disabled={!answers[questions[currentQuestion].id]}
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}