import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>; 
  loginWithGoogle: (code: string) => Promise<void>;
  loginWithKakao: (code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginWithGoogle = async (code: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/google', { code });
      const { user, token } = response.data;
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Google 로그인 실패:', error);
    }
  };

  const loginWithKakao = async (code: string) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/kakao', { code });
      const { user, token } = response.data;
      
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Kakao 로그인 실패:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithGoogle, loginWithKakao, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext)!;
