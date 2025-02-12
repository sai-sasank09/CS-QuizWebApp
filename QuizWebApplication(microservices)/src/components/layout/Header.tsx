import React from 'react';
import { BookOpen } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">CS Quiz Master</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li><a href="/" className="hover:text-indigo-200">Home</a></li>
              <li><a href="/topics" className="hover:text-indigo-200">Topics</a></li>
              <li><a href="/leaderboard" className="hover:text-indigo-200">Leaderboard</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}