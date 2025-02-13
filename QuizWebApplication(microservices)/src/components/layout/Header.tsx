import React from 'react';
import { BookOpen, User, Trophy, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">CS Quiz Master</h1>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link to="/" className="hover:text-indigo-200 transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-indigo-200 transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </nav>
          {user ? (
            <div className="flex items-center space-x-6">
              <Link to="/profile" className="flex items-center space-x-2 hover:text-indigo-200 transition-colors">
                <User className="h-5 w-5" />
                <span>{user.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 hover:text-indigo-200 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}