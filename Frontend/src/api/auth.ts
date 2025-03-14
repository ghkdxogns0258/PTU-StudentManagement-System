import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/auth'; // 백엔드 주소

export const googleLogin = async (code: string) => {
  const response = await axios.post(`${API_BASE_URL}/google`, { code });
  return response.data;
};

export const kakaoLogin = async (code: string) => {
  const response = await axios.post(`${API_BASE_URL}/kakao`, { code });
  return response.data;
};