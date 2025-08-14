import { createContext, useContext, useEffect, useState } from 'react';
import axios from '../services/api'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setUser(res.data))
      .catch(() => logout());
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
  };

  const signup = async (data) => {
    await axios.post('/api/auth/signup', data);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const ForgotPassword = async (email) => {
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      return res.data.message;
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, signup, ForgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
