// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import api from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On initial app load, check localStorage for existing user info
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    const data = response.data;
    if (data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
    }
    return data;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;