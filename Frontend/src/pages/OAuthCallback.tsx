// src/pages/OAuthCallback.tsx
import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { googleLogin, kakaoLogin } from '../api/auth'; 

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    // URL 경로로부터 'google', 'kakao' 중 어떤 provider인지 판별
    const provider = window.location.pathname.includes('google') ? 'google' : 'kakao';

    if (code) {
      const sendCodeToBackend = async () => {
        try {
          // provider에 따라 각기 다른 함수 호출
          const responseData = provider === 'google' 
            ? await googleLogin(code)
            : await kakaoLogin(code);

          // 백엔드가 { user, token, isNewUser } 등으로 응답한다고 가정
          const { user, token, isNewUser } = responseData;

          // 응답 값 localStorage, AuthContext 등에 저장
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          setUser(user);

          // 새 유저면 '/usersetting', 기존 유저면 홈('/') 등 분기 가능
          // 일단 '/usersetting'으로 이동
          navigate('/usersetting');

        } catch (error) {
          console.error('OAuth 로그인 실패:', error);
          navigate('/login'); 
        }
      };

      sendCodeToBackend();
    }
  }, [searchParams, navigate, setUser]);

  return <p>로그인 중...</p>;
}
