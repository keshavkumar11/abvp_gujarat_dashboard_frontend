// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// This interceptor runs before every request
api.interceptors.request.use((config) => {
  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // If a user and token exist, add the Authorization header
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

export default api;