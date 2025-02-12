import axios from 'axios';

// This should be updated with your actual backend URL when deployed
const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const topicsApi = {
  getAll: () => api.get('/topics'),
  getById: (id: string) => api.get(`/topics/${id}`),
  getQuestions: (topicId: string) => api.get(`/topics/${topicId}/questions`),
};

export const quizApi = {
  submit: (topicId: string, answers: Record<string, string>) => 
    api.post(`/quiz/${topicId}/submit`, { answers }),
  getResults: (quizId: string) => api.get(`/quiz/${quizId}/results`),
};

export const authApi = {
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),
  register: (email: string, password: string, name: string) => 
    api.post('/auth/register', { email, password, name }),
  getProfile: () => api.get('/auth/profile'),
};

export const leaderboardApi = {
  getGlobal: () => api.get('/leaderboard'),
  getByTopic: (topicId: string) => api.get(`/leaderboard/${topicId}`),
};