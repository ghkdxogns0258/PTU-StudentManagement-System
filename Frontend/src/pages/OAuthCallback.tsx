import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { kakaoLogin } from '../api/auth';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = window.location.pathname.includes('google') ? 'google' : 'kakao';

    if (!code) return;

    const sendCodeToBackend = async () => {
      try {
        if (provider === 'google') {
          console.error('Google OAuth는 아직 구현되지 않았습니다.');
          navigate('/login');
          return;
        }

        const { user, jwt, isNewUser } = await kakaoLogin(code);

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', jwt);
        setUser(user);

        navigate(isNewUser ? '/usersetting' : '/');
      } catch (error) {
        console.error('OAuth 로그인 실패:', error);
        navigate('/login');
      }
    };

    sendCodeToBackend();
  }, [searchParams, navigate, setUser]);

  return <p>로그인 중입니다...</p>;
}
