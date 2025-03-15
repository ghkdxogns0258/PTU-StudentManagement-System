import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  useEffect(() => {
    const code = searchParams.get('code');
    const provider = window.location.pathname.includes('google') ? 'google' : 'kakao';

    if (code) {
      const sendCodeToBackend = async () => {
        try {
          const response = await axios.post(`http://localhost:5000/auth/${provider}`, { code });
          const { user, token } = response.data;
          
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', token);
          setUser(user);
          
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
