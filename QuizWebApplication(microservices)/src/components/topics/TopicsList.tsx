import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { topicsApi } from '../../services/api';
import { TopicCard } from './TopicCard';
import { Topic } from '../../types';

export function TopicsList() {
  const navigate = useNavigate();
  const { data: topics, isLoading, error } = useQuery<Topic[]>('topics', () => 
    topicsApi.getAll().then(res => res.data)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Failed to load topics. Please try again later.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics?.map((topic) => (
          <TopicCard
            key={topic.id}
            {...topic}
            onStart={() => navigate(`/topics/${topic.id}`)}
          />
        ))}
      </div>
    </div>
  );
}