// src/api/api.js
import axios from 'axios';

const api = axios.create({
  // Make sure this matches your backend's address and port
  baseURL: 'http://localhost:5000/api',
});

// We will use this interceptor later for admin requests
api.interceptors.request.use((config) => {
  // Logic to add auth token will go here
  return config;
});

export default api;