import React, { createContext, useContext, useState, useEffect } from 'react';
import { kakaoLogin } from '../api/auth';
import { UserInfo } from '../api/types/auth'; // 타입 가져오기

interface AuthContextProps {
  user: UserInfo | null;
  setUser: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  loginWithKakao: (code: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const jwt = localStorage.getItem('jwt');

    if (storedUser && jwt) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ 카카오 로그인
  const loginWithKakao = async (code: string): Promise<void> => {
    try {
      const { user, jwt, isNewUser } = await kakaoLogin(code);

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('jwt', jwt);

      // 추가적으로 isNewUser를 사용해서 분기 가능
      console.log('isNewUser:', isNewUser);
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginWithKakao, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth는 AuthProvider 안에서 사용해야 합니다');
  return context;
};
